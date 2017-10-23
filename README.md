# AppWorks Example - AWPage

## Contents
1. [About appworks.js](#about-appworksjs)
2. [About this example app](#about-this-example)
3. [Usage](#usage)
4. [Installation](#installation)

## About appworks.js

appworks.js is a javascript (TypeScript) library for building feature rich, hybrid enterprise apps. The OpenText AppWorks platform provides mobile and desktop clients that support apps that utilize appworks.js.

In a mobile environment the library provides access to on-device technology, and in the desktop environment some features of the underlying host OS (operating system) are exposed.

For more information, see the appworks.js repository: https://github.com/opentext/appworks-js

## About this example

The purpose of the AWPage plugin is to open modal webviews for either external use, e.g. your companies homepage, or a contact form etc, or a limited appworks enabled webview for another html file in your app.

## Usage

#### openModalAppWebView

```javascript
openModalAppWebView(url: string, title: string, closeTitle: string)
```

Open a modal webview of a html file in your app which is appworks enabled with query params such as __modal.html?myproperty=myvalue__
This cannot be an external webpage.

+ __url__: the filename and querystring to be opened
+ __title__: the title to be displayed in the header
+ __closeTitle__: the text on the close button

Examples
```javascript
var page = new Appworks.AWPage();
var url = "modal.html" + "?property=demonstration";
var title = "My Page Title";
var closeTitle = "Done";
page.openModalAppWebView(url, title, closeTitle);
```

#### setActionButtonCallback

```javascript
setActionButtonCallback(callback: any, title: string)
```

Used by the ModalAppWebView which has just popped open. Add a button to the left side of the header bar with text and a callback.

+ __callback__: The a javascript callback to be called when the button is tapped
+ __title__: the text which appears on the button

Examples
```javascript
var page = new Appworks.AWPage();
page.setActionButtonCallback(function() {
  console.log("Action pressed!");
}, "Submit");
```

#### closeModalAppWebView

```javascript
closeModalAppWebView()
```
Used by the ModalAppWebView which has just popped open. This allows the modal to close itself.

Examples
```javascript
  var page = new Appworks.AWPage();
  page.closeModalAppWebView();
```

#### openModalExternalWebView

```javascript
openModalExternalWebView(url: string, title: string, closeText: string, options?: object)
```

This will open an external webview which is not appworks enabled. Use case: opening your companies website within the app.

+ __url__: the web URL to be opened
+ __title__: the title to be displayed in the header
+ __closeText__: the title to be displayed on the close button
+ __options__: (optional) a JSON object with a header property and JSON object value to be applied to the web request

Examples
```javascript
var page = new Appworks.AWPage();
var url = "http://mywebsite.com/mypage";
var title = "My Web Page";
var closeTitle = "Dismiss";

var headers = {};
    headers["myKey"] = "myValue";

var options = {"headers" : headers};

page.openModalExternalWebView(url, title, closeTitle, options);
```

## Installation

This example app contains 3 important objects:
1. app.properties
2. icon.png
3. mobile.zip

#### app.properties
This files defines the app, with the following properties:
+ __displayName__: The display name of the app
+ __description__: A description of the app
+ __version__: The version of the app, e.g. 0.0.1 or 3.4.5 etc
+ __type__: This can be either app or desktop, or both (app,desktop)
+ __awgPlatformVersion__: The target appworks platform, this should be 16
+ __isAvailableOffline__: Allow this app to be used offline, can be true or false

#### icon.png
An icon that represents the app. This will appear in the gateway and on the device. 48x48px is ideal.

#### mobile.zip

This is your web content, such as html, js, css, images and any other assets.
The only essential file in your mobile.zip is index.html, which will be loaded by the appworks webview. Any other files or structure is up to the developer.

##### index.html

When your app is downloaded and installed in an appworks client, the client will place appworks.js, cordova.js and the cordova plugins in the root of your app.

In your html file, please include the following tags before any other javascript tags:

```html
<script type="text/javascript" src="cordova.js"></script>
<script type="text/javascript" src="appworks.js"></script>
```

#### Zipping and Deploying
1. Zip up the web content into a file named mobile.zip
2. Zip up the following files:
  + app.properties
  + icon.png
  + mobile.zip
3. Name this file in the format:
  + AppName_Version.zip
  + e.g. MyGreatApp_0.0.1.zip
  + __The version number in the filename must match the version number in app.properties__
4. Install the app on the gateway
  + Go to your gateway in a browser
  + sign in
  + go to app installation tab
  + drag and drop MyGreatApp_0.0.1.zip into the box.
  + Once fully deployed, enable the app.
