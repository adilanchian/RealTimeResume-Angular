# RealTimeResume-Angular

## Introduction
Welcome to RealTimeResume! This Angular app is an attempt at creating a component that allows you to keep your resume update to date on 
any angular site by utilizing Github's webhook. Using Azure, Github Pages, Node.js, and Pusher I was able to creating a working version of this @ http://adilanchian.me/RealTimeResume
I will go through the technical stack and how to get started with RealTimeResume!

## Getting Started
RealTimeResume utilizes a server component that is hosted on Azure Cloud. This helps keep a central point for any site that you may be using
this component on. There are multiple parts that will be explained why and how to use them.

### Github Webhook
The first step of this component is to setup a Github repository that will hold your resume file. Now, I set this component up to convert .docx
files into HTML which is then displayed within the component. You will also use this repository to listen to push events that will eventually
be sent to the component.
#### Github Webhook Setup
- Go to the repository you just created and click the Settings tab at the top right.
- Select Webhooks from the left side menu
- Set a payload url (This will be the url where payload is supplied from the webhook's POST request)
  - For local testing this will be the ngrok url (Keep reading to see what this is)
  - For cloud testing you will use your azure web app url
- Finally, select just push events and press update webhook

### Ngrok
Ngrok allows you to receive and webhook events on your localhost without exposing your entire device. This tool is what you will use to 
do local tesing. The tool can be found here: https://ngrok.com/
Once you have setup ngrok, go ahead and add that to your webhook payload url

### Server
The server part of this component is the one that will be receiving webhooks, converting resume.docx to html, and sending pusher events.
Please see my other repository @ https://github.com/adilanchian/RealTimeResume-Server for more information and setup.

### Pusher
Pusher is a great tool that puts the "RealTime" in RealTimeResume. This component subscribes to events from pusher and when a certain event
is fired, all subscribed applications will receive a message whith a payload.

#### Setting Up Pusher
- Navigate to https://pusher.com/
- Signup for a free account and once sign in select "Create new app"
- Name it whatever you would like (I named mine RealTimeResume-Angular)
- Leave the cluster as the pre-selected option
- Select your front-end tech as Angular and your back-end tech as Node.js
- Once you select create app, you will see a section called app keys select that and those are all the keys you will need
to add to Angular's `enviornment.ts` & Node's `config.js`.

### Setting Up Angular Project
You will need to make sure you have all the pusher and webhook settings implented before you run the angular project for the first
time. Once you open the application navigate to `src -> enviornments -> enviornment.example.ts` This is where you will input your 
credentials. For the `ngrok_url` property, for local development you will be setting your ngrok produced url and for production
that will need to change to your Azure cloud web app url.

### Running RealTimeResume-Angular
After following this setup process you are ready to start your component! In this order run this commands in their respective
directories:

1. Run Server: `node server.js`
2. Run Angular: `ng serve`

Navigate to `localhost:4200` you should see something similar to what you see on the example site: http://adilanchian.me/RealTimeResume

### Questions/Concerns
Thanks for checking out this project! If you have any questions or cocerns about the Angular portion of this component, please
file a Github Issue in this repository.
If you have any questions or concerns in regards to the server component please file a Github Issue at the following repository
https://github.com/adilanchian/RealTimeResume-Server
