// KAMALYAKA PROJECTS, SCRIPT, VIDEO CAPTURE TOOL 1.0.0
// Code by kamalyaka, free to use.

const srcs = document.querySelector("#srcs");
const { desktopCapturer } = require('electron');
rec = false;


desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
    for(let i = 0; i < sources.length; i++){
        srcs.innerHTML += `<option id="src${i}" style="color: green">${sources[i].name}</option>`;
    }
})

function changesrc(elem){
    var index = elem.selectedIndex;
    var src = elem.children[index].innerHTML.trim();
    console.log(src);
    desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
        for (const source of sources) {
            console.log(src)
            if (source.name === src) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    mandatory: {
                        chromeMediaSource: 'desktop'
                    }
                },
                video: {
                    mandatory: {
                    chromeMediaSource: 'desktop',
                    chromeMediaSourceId: source.id,
                    minWidth: 1280,
                    maxWidth: 1280,
                    minHeight: 720,
                    maxHeight: 720
                    }
                }
                })
                handleStream(stream)
            } catch (e) {
                handleError(e)
            }
            return
            }
        }
    })    
}

let mediaRecorder;
const recordedChunks = [];

function handleStream (stream) {
  const video = document.querySelector('video');
  video.srcObject = stream;
  video.onloadedmetadata = (e) => video.play();
  const options = {mimeType : 'video/webm; codecs=vp9'}
  mediaRecorder = new MediaRecorder(stream, options);
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.onstop = handleStop;
}

function handleDataAvailable(e) {
    recordedChunks.push(e.data);
    console.log("capturing");
}

const { dialog } = require('electron').remote; 
const { writeFile } = require('fs');

async function handleStop(e){
    const blob = new Blob(recordedChunks, {
        type : 'video/mpg4; codecs=vp9'
    });

    const buffer = Buffer.from(await blob.arrayBuffer());
    const { filePath } = await dialog.showSaveDialog({
        buttonLabel: 'Save video',
        defaultPath: `vid-${Date.now()}.mp4`
    });

    console.log(filePath);

    writeFile(filePath, buffer, () => {console.log("video saved successfully!")});
}

function handleError (e) {
  console.log(e)
}

function start(){
    rec = true;
    srcs.setAttribute("disabled", "true");
    console.log("recording started chief");
    mediaRecorder.start();
    document.getElementById("isrec").innerHTML = "Recording 🔴";
    const recstart = new Date();
    timer = setInterval(() => {
        if(rec){
            const now = new Date();
            const diffInMilliseconds = Math.abs(now - recstart);

            format = 0;
            diffInMilliseconds / 1000 / 60 / 60 / 24 < 1 ? format = 0 : format = 1;

            format == 0 ? document.getElementById("timespan").innerHTML = msToHMS(diffInMilliseconds)
            : document.getElementById("timespan").innerHTML =  `${Math.floor(diffInMilliseconds / 1000 / 60 / 60 / 24)} days`

            function msToHMS(duration) {

                var milliseconds = parseInt((duration % 1000) / 100),
                seconds = parseInt((duration / 1000) % 60),
                minutes = parseInt((duration / (1000 * 60)) % 60),
                hours = parseInt((duration / (1000 * 60 * 60)) % 24);

                hours = (hours < 10) ? "0" + hours : hours;
                minutes = (minutes < 10) ? "0" + minutes : minutes;
                seconds = (seconds < 10) ? "0" + seconds : seconds;

                if(hours > 0){
                    return hours + " hours " + minutes + " minutes " + seconds + " seconds";
                } else if(minutes > 0){
                    return minutes + " minutes " + seconds + " seconds";
                } else {
                    return seconds + " seconds";
                }
            }
        } else {
            clearInterval(timer);
            document.getElementById("timespan").innerHTML = "";
        }
    }, 1000);
}

function stop(){
    rec = false;
    srcs.removeAttribute("disabled")
    document.getElementById("isrec").innerHTML = "Not Recording ⚫";
    console.log("it stopped chief");
    mediaRecorder.stop();
}
