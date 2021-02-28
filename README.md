# 📷 Basic Video Capture Tool!
### 🎥 A basic Electron video capture tool that allows you to capture and save desktop video footage in MPEG-4 (mp4) file format.
---
### 📜 Setup
### This is Project is running on Electron and Electron Forge. You also need to have NodeJS installed on your computer. Once that is done you can create an Electron project like this: 
```
npx create-electron-app recorder
```
### When the project has been created, all you need to do is switch the default "src" folder to the folder included in this repository.
### You can launch it using this command:
```
npm start
```
---
### 😀 How it works
### When you first open the application you will be greeted with a screen looking like this: 
![Screenshot 2021-02-28 172535](https://user-images.githubusercontent.com/60985540/109425740-1b2a5780-79ea-11eb-81ad-4b655527851e.png)
### You can select a window or display to capture on the select bar found above the preview. Note that you must select one these in order to record video!
![image](https://user-images.githubusercontent.com/60985540/109425769-4ad95f80-79ea-11eb-99b8-6209de274dce.png)
### After that is done you can press the Start button below to preview to start capturing footage.
![image](https://user-images.githubusercontent.com/60985540/109425896-e539a300-79ea-11eb-8271-0ebcd9c3bd31.png)
By default the program captures desktop audio too, you can turn that off in the code here:
### Change the this part of code on line 25 inside render.js
```
  audio: {
      mandatory: {
          chromeMediaSource: 'desktop'
      }
  },
```
### To false to disable it: 
```
audio: false,
```
I will add an audio switch button in a later update
### Once your recording has started, the program will indicate it on the bottom left corner.
![image](https://user-images.githubusercontent.com/60985540/109425947-32b61000-79eb-11eb-8224-b8773804bcc8.png)
While you are recording, you cannot change windows. I will work on a fix for this too on a later update.
### To stop the recording you can press the stop button, this will pull up a window to store your footage.
![image](https://user-images.githubusercontent.com/60985540/109426003-7ad53280-79eb-11eb-8980-a7740cef9696.png)
---
### 👋 Contributing
### This repository accepts contributions! If you have any ideas of what to add, you can do it!
---
### Credits
### by kamalyaka, kamalyaka Projects. You are free to use the code in whatever form you would like, and you are free to distribute the code in commercial ways.



