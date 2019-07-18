var languageDict = {
   'chinese': 'zh-CN',
   'chinese simplified': 'zh-CN',
   'chinese traditional': 'zh-TW',
   'english': 'en',
   'japanese': 'ja',
   'korean': 'ko',
   'malay': 'ms',
   'russian': 'ru',
   'spanish': 'es'
};


ClipBoard = {
  copy: function (data) {
    var copyFrom = $('<textarea/>');
    copyFrom.text(data);
    $('body').append(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    copyFrom.remove();
    $("#src").select();
  },
  paste: function () {
    return new Promise(function (resolve, reject) {
      var copyFrom = $('<textarea id="tmp"/>');
      $('body').append(copyFrom);
      copyFrom.select();
      document.execCommand('paste');
      var src = document.getElementById('tmp').value;
      copyFrom.remove();
      $("#src").select();
      resolve(src);
    });
  }
};

function getOs() {
  var OSName = "Unknown";
  if (window.navigator.userAgent.indexOf("Windows NT 10.0")!== -1) OSName="Windows 10";
  if (window.navigator.userAgent.indexOf("Windows NT 6.2") !== -1) OSName="Windows 8";
  if (window.navigator.userAgent.indexOf("Windows NT 6.1") !== -1) OSName="Windows 7";
  if (window.navigator.userAgent.indexOf("Windows NT 6.0") !== -1) OSName="Windows Vista";
  if (window.navigator.userAgent.indexOf("Windows NT 5.1") !== -1) OSName="Windows XP";
  if (window.navigator.userAgent.indexOf("Windows NT 5.0") !== -1) OSName="Windows 2000";
  if (window.navigator.userAgent.indexOf("Mac")            !== -1) OSName="Mac/iOS";
  if (window.navigator.userAgent.indexOf("X11")            !== -1) OSName="UNIX";
  if (window.navigator.userAgent.indexOf("Linux")          !== -1) OSName="Linux";
  return OSName;
}

function isCommands(cmd) {
   if (cmd === 'help' ||
      cmd === 'option' ||
      cmd === "who made this?" ||
      cmd === "reset" ||
      cmd === "donate" ||
      cmd === "manual" ||
      cmd === "flush"  ||
      cmd.includes(">>")) {

      return true;
   }
   return false;
}

function setShortCutHelp() {
   var os = getOs();
   if (os.indexOf("Windows") !== -1) {
      document.querySelector("#src").placeholder = "Windows short cut : Ctrl + Shift + K"
   }
   else if(os.indexOf("Mac/iOS") !== -1) {
      document.querySelector("#src").placeholder = "Mac short cut : Cmd + Shift + K"
   }
   else if(os.indexOf("Linux") !== -1) {
      document.querySelector("#src").placeholder = "Linux short cut : Ctrl + Shift + K"
   }
}

function handleCommand(cmd) {
   if (cmd === 'help') {
      document.querySelector('#result').innerText = "command list:\n[help, option, who made this?, reset, donate]";
      return true;
   } else if (cmd === 'option') {
      chrome.tabs.create({
         "url": "/options.html",
         "selected": true
      }, function(tab) {
         console.log(tab.id);
      });
   } else if (cmd === 'who made this?') {
      chrome.tabs.create({
         "url": "https://gomjellie.github.io",
         "selected": true
      }, function(tab) {});
   } else if (cmd === "reset") {
      chrome.storage.sync.set({
         tar_lang: 'ko'
      });
      document.querySelector('#result').innerText = "tar_lang: ko";
   } else if (cmd === "donate") {
      document.querySelector('#result').innerText = "Woori Bank 1002-887-373373 Oh inkyu";
   } else if (cmd === "manual") {
      chrome.tabs.create({
         "url": "https://gomjellie.github.io/jelly-translator",
         "selected": true
      }, function(tab) {});
   } else if (cmd === "flush") {
      ClipBoard.copy("\0");
     document.querySelector('#result').innerText = "flushed!!";
   }else if (cmd.includes(">>")) {
      var change_tar_lang = cmd.split(">>")[1].replace(/ /g, "").toLowerCase();
      if (change_tar_lang in languageDict) {
         chrome.storage.sync.set({
            tar_lang: languageDict[change_tar_lang]
         });
         translatePopup(cmd.split(">>")[0]);
      } else {
         document.querySelector('#result').innerText = change_tar_lang + " is not in languageDict";
      }
   }
}

//팝업 페이지의 #src 입력된 값이 변경 되었을때
if (document.querySelector("#src")) {
   $("#src").on('keydown', function() {
      var src = document.querySelector('#src').value;
      if (isCommands(src)) {
         handleCommand(src);
      } else {
         translatePopup(src);
      }
   });
}

// when translate page button clicked
$(function() {
   $("#pasteBtn").click(function(e) {
      chrome.storage.sync.get(function(data) {
         fill_src_from_clipboard();
         console.log(document.querySelector('#src').value);
         translatePopup(document.querySelector('#src').value);

         return;
        // chrome 72version 부터 CORS정책 회피가 불가해져서 부득이하게 off함
        if (!data.page_translate) {
            executeScripts(null, [{
                  file: "lib/jquery-3.1.1.min.js"
               },
               {
                  file: "translate.js"
               },
               {
                  code: "iterateTranslate();"
               }
            ]);
        }
      });
   });
});

function executeScripts(tabId, injectDetailsArray) {
   function createCallback(tabId, injectDetails, innerCallback) {
      return function() {
         chrome.tabs.executeScript(tabId, injectDetails, innerCallback);
      };
   }

   var callback = null;

   for (var i = injectDetailsArray.length - 1; i >= 0; --i)
      callback = createCallback(tabId, injectDetailsArray[i], callback);

   if (callback !== null)
      callback(); // execute outermost function
}

$(document).ready(function () {
  setShortCutHelp();
});


function fill_src_from_clipboard() {
  document.getElementById('src').select();
  document.execCommand('paste');
}
//
// fill_src_from_clipboard();

function copyTextToClipboard(text) {
  /*
   you can use this function to flush Clipboard
   ex ) copyTextToClipboard('\0')
   */
  var copyFrom = $('<textarea/>');
  copyFrom.text(text);
  $('body').append(copyFrom);
  copyFrom.select();
  document.execCommand('copy');
  copyFrom.remove();
}

