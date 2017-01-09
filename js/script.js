var languageDict = {
    'afrikaans': 'af',
    'albanian': 'sq',
    'arabic': 'ar',
    'azerbaijani': 'az',
    'basque': 'eu',
    'bengali': 'bn',
    'belarusian': 'be',
    'bulgarian': 'bg',
    'catalan': 'ca',
    'chinese' : 'zh-CN',
    'chinese simplified': 'zh-CN',
    'chinese traditional': 'zh-TW',
    'croatian': 'hr',
    'czech': 'cs',
    'danish': 'da',
    'dutch': 'nl',
    'english': 'en',
    'esperanto': 'eo',
    'estonian': 'et',
    'filipino': 'tl',
    'finnish': 'fi',
    'french': 'fr',
    'galician': 'gl',
    'georgian': 'ka',
    'german': 'de',
    'greek': 'el',
    'gujarati': 'gu',
    'haitian creole': 'ht',
    'hebrew': 'iw',
    'hindi': 'hi',
    'hungarian': 'hu',
    'icelandic': 'is',
    'indonesian': 'id',
    'language name': 'Language Code',
    'irish': 'ga',
    'italian': 'it',
    'japanese': 'ja',
    'kannada': 'kn',
    'korean': 'ko',
    'latin': 'la',
    'latvian': 'lv',
    'lithuanian': 'lt',
    'macedonian': 'mk',
    'malay': 'ms',
    'maltese': 'mt',
    'norwegian': 'no',
    'persian': 'fa',
    'polish': 'pl',
    'portuguese': 'pt',
    'romanian': 'ro',
    'russian': 'ru',
    'serbian': 'sr',
    'slovak': 'sk',
    'slovenian': 'sl',
    'spanish': 'es',
    'swahili': 'sw',
    'swedish': 'sv',
    'tamil': 'ta',
    'telugu': 'te',
    'thai': 'th',
    'turkish': 'tr',
    'ukrainian': 'uk',
    'urdu': 'ur',
    'vietnamese': 'vi',
    'welsh': 'cy',
    'yiddish': 'yi'
};


function translatePopup(src) {
    translate(src);
}

function isCommands(cmd) {
    if (cmd == 'help' ||
        cmd == 'option' ||
        cmd == "who made this?" ||
        cmd == "reset" ||
        cmd == "donate" ||
        cmd == "manual" ||
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
        chrome.storage.sync.set({
            tar_lang: 'ko'
        });
        document.querySelector('#result').innerText = "tar_lang: ko";
    } else if (cmd == "donate") {
        document.querySelector('#result').innerText = "개발자에게 커피한잔의 여유를....\n우리은행 1002-887-373373 오인규";
    } else if (cmd == "manual") {
        chrome.tabs.create({ "url": "https://gomjellie.github.io/jelly-translator", "selected": true }, function(tab) {});
    } else if (cmd.includes(">>")) {
        var change_tar_lang = cmd.split(">>")[1].replace(/ /g, "").toLowerCase();
        if (change_tar_lang in languageDict) {
            chrome.storage.sync.set({
                tar_lang: languageDict[change_tar_lang]
            });
            translatePopup(cmd.split(">>")[0]);
        }else {
            document.querySelector('#result').innerText = change_tar_lang + "is not in languageDict";
        }
    }
}

//팝업 페이지의 #src 입력된 값이 변경 되었을때
if (document.querySelector("#src")) {
    $("#src").on('keyup', function() {
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
        translatePage();
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