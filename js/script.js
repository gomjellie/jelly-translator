function translatePopup(src) {
    translate(src);
}

function isCommands(cmd) {
    if (cmd == 'help' ||
        cmd == 'option' ||
        cmd == "who made this?" ||
        cmd == "reset" ||
        cmd == "donate" ||
        cmd == "manual"||
        cmd.includes(">>")) {

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
    } else if (cmd == "manual") {
        chrome.tabs.create({ "url": "https://gomjellie.github.io/jelly-translator", "selected": true }, function(tab) {});
    }else if (cmd.includes(">>")) {
        chrome.storage.local.set({
            tar_lang: cmd.split(">>")[1].replace(/ /g, "")
        });
        translatePopup(cmd.split(">>")[0]);
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

$(function() {
    $("#translateBtn").click(function(e) {
        document.querySelector('#result').innerText = "There are too many bugs to stop \n'page-translate' service for a while. ʕ•ᴥ•ʔ\n Sorry ";
        // function executeScripts(tabId, injectDetailsArray) {
        //     function createCallback(tabId, injectDetails, innerCallback) {
        //         return function() {
        //             chrome.tabs.executeScript(tabId, injectDetails, innerCallback);
        //         };
        //     }

        //     var callback = null;

        //     for (var i = injectDetailsArray.length - 1; i >= 0; --i)
        //         callback = createCallback(tabId, injectDetailsArray[i], callback);

        //     if (callback !== null)
        //         callback(); // execute outermost function
        // }


        // executeScripts(null, [
        //     { file: "jquery-3.1.1.min.js" },
        //     { file: "translate_Page_exercise.js" },
        //     { code: "translatePage();" }
        // ]);
    });
});