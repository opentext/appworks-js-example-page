/***********************
** index.html methods **
***********************/

/**
 * Open a new appworks enabled webview using another html file in the local filesystem
 */
function openModalAppWebView() {
  // The file to open along with any query parameters
  var url = "modal.html" + "?property=demonstration";
  // The title that will appear in the header bar
  var title = "My Page Title";
  // The title of the close button
  var closeTitle = "Done";

  // Create a new AWPage instance
  var page = new Appworks.AWPage();
  // Call AWPage.openModalAppWebView passing in the filename+querystring, title and close button title
  page.openModalAppWebView(url, title, closeTitle);
}

/**
 * Open a exernal webview using which is not appworks enabled
 */
function openModalExternalWebView() {
  // The URL to open
  var url = document.getElementById('url').value;
  // The title that will appear in the header bar
  var title = "My Web Page";
  // The title of the close button
  var closeTitle = "Dismiss";

  // Pass in any custom header parameters for the URL request such as specific authentication for your service
  var headers = {};
  if(document.getElementById('header1key').value != "") {
      headers[document.getElementById('header1key').value] = document.getElementById('header1value').value;
  }
  if(document.getElementById('header2key').value != "") {
      headers[document.getElementById('header2key').value] = document.getElementById('header2value').value;
  }

  // Create an options object with the headers property, containing the headers
  // This was created this way to match another part of the system...
  var options = {"headers" : headers};

  // Create a new AWPage instance
  var page = new Appworks.AWPage();
  // Call AWPage.openModalExternalWebView passing in the URL, title and close button title and the options
  page.openModalExternalWebView(url, title, closeTitle, options);
}

/***********************
** modal.html methods **
***********************/

/**
 * Extract the URL querystring and parse into a JSON object
 */
function getParams () {
   var queryString = window.location.search || '';
   var keyValPairs = [];
   var params      = {};
   queryString     = queryString.replace(/.*?\?/,"");

   if (queryString.length)
   {
      keyValPairs = queryString.split('&');
      for (pairNum in keyValPairs)
      {
         var key = keyValPairs[pairNum].split('=')[0];
         if (!key.length) continue;
         if (typeof params[key] === 'undefined')
         params[key] = [];
         params[key].push(keyValPairs[pairNum].split('=')[1]);
      }
   }
   return params;
}

/**
 * The appworks enabled modal webview can have an action button in the top left corner
 * Set the javascript function to be called when it is tapped
 * Also set the title of it
 */
function setActionButtonCallback() {
  var page = new Appworks.AWPage();
  page.setActionButtonCallback(function() {
    out("Action pressed!");
  }, "Submit");
}

/**
 * Allow the appworks enabled modal webview to be closed via a javascript call
 */
function closeModalAppWebView() {
  var page = new Appworks.AWPage();
  page.closeModalAppWebView();
}

/********************
** Utility methods **
********************/
function out(message) {
  var el = document.getElementById("result");
  el.innerHTML = message;
}

function toggle(elementName) {
  var el = document.getElementById(elementName);
  if (el.style.display != "block") {
    el.style.display = "block";
  } else {
    el.style.display = "none";
  }
}

/******************
** Video methods **
******************/
function showVideo(url) {
  // Create AWPage instance
  var page = new Appworks.AWPage();
  // Call AWPage.video, pass in success function, error function and URL of video
  page.video(function () {
    // Success
  }, function (error) {
    // Error
    out(error);
  }, url);
}
