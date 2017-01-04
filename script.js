// function translatePage(src) {
//     //컨텐츠 페이지를 대상으로 코드를 실행해주세요.
//     chrome.tabs.executeScript({
//         code: "document.querySelector('body').innerText"
//     }, function(result) {
//         if (result) {
//             alert(result);
//             //var res = translate(document.querySelector('#src').value);
//         }
//     });
// }
//document.body.innerText 이코드 먹히는지 확인해야됨.

/*
var theText;
$('p,h1,h2,h3,h4,h5').each(function(){
  console.log($(this).text());
  theText += $(this).text();
}); 이게 현재로써는 제일 좋은듯!!

$('p,h1,h2,h3,h4,h5,a').each(function(){
  console.log($(this).text());

  document.body.innerHTML = document.body.innerHTML.replace(/decodeURI/g, 'asdfqwer');
});
*/

function translatePopup(src) {
    translate(document.querySelector("#src").value);
}

function isCommands(cmd) {
    if (cmd == 'help' ||
        cmd == 'option' ||
        cmd == "who made this?" ||
        cmd == "reset" ||
        cmd == "donate"||
        cmd == "manual") {

        return true;
    }
    return false;
}

function handleCommand(cmd) {
    if (cmd == 'help') {
        document.querySelector('#result').innerText = "command list:\n[help, option, who made this?, reset, donate]";
        return true;
    } else if (cmd == 'option') {
        chrome.tabs.create({ "url": "/options.html", "selected": true }, function(tab) {
            console.log(tab.id);
        });
    } else if (cmd == 'who made this?') {
        chrome.tabs.create({ "url": "https://gomjellie.github.io", "selected": true }, function(tab) {});
    } else if (cmd == "reset") {
        chrome.storage.local.set({
            tar_lang: 'ko'
        });
        document.querySelector('#result').innerText = "tar_lang: ko";
    } else if (cmd == "donate") {
        document.querySelector('#result').innerText = "개발자에게 커피한잔의 여유를....\n우리은행 1002-887-373373 오인규";
    }else if (cmd == "manual"){
        chrome.tabs.create({ "url": "https://gomjellie.github.io/chrome_translator", "selected": true }, function(tab) {});
    }
}

//팝업 페이지의 #src 입력된 값이 변경 되었을때
if (document.querySelector("#src")) {
    document.querySelector('#src').addEventListener('input', function() {
        var src = document.querySelector('#src').value;
        if (isCommands(src)) {
            handleCommand(src);
        } else {
            translatePopup(src);
        }
    });
}


// $('#src').on('input', function(e) {
//     var src = document.querySelector('#src').value;
//     if (isCommands(src)) {
//         handleCommand(src);
//     } else {
//         translatePopup(src);
//     }
// });

// function clickHandler(e) {
//     chrome.runtime.sendMessage({directive: "popup-click"}, function(response) {
//         this.close(); // close the popup when the background finishes processing request
//     });
// }

// document.addEventListener('DOMContentLoaded', function () {
//     document.getElementById('translateBtn').addEventListener('click', clickHandler);
// })

// $(function() {
//     $("#src").on('input', function() {
//         var src = document.querySelector('#src').value;
//         if (isCommands(src)) {
//             handleCommand(src);
//         } else {
//             translatePopup(src);
//         }
//     });
// });

$(function() {
    $("#translateBtn").click(function(e) {
        //alert('clicked!');
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

        executeScripts(null, [
            { file: "jquery-3.1.1.min.js" },
            { file: "translate_Page_exercise.js"},
            { code: "translatePage();"}
            //{ file: "test.js" },
            //{ code: "test_function()" }
            ]);
        // chrome.tabs.executeScript({ code: 'document.querySelector("body").innerText;'}, function(result) {
        //     alert(result[0]);
        // });
    });
});
// if (document.querySelector("#translateBtn")) {
//     document.querySelector('#translateBtn').addEventListener('click', function() {
//         alert("");
//             chrome.tabs.executeScript({ code: 'document.querySelector("body").innerText' }, function(result) {
//                     result = "";
//                 }
//             });
//     }
// }
//automatic resize text area using jQuery

//$('textarea').autoResize();

// $("textarea").keyup(function(e) {
//     $(this).height(30);
//     $(this).height(this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth")));
// });