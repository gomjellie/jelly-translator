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

function translatePopup(src) {
    translate(document.querySelector("#src").value);
}

function isCommands(cmd) {
    if (cmd == 'help' ||
        cmd == 'option' ||
        cmd == "who made this?" ||
        cmd == "reset") {

        return true;
    }
    return false;
}

function handleCommand(cmd) {
    if (cmd == 'help') {
        document.querySelector('#result').innerText = "command list:\n  /help /option /who made this? /reset";
        return true;
    } else if (cmd == 'option') {
        chrome.tabs.create({ "url": "/options.html", "selected": true }, function(tab) {
            console.log(tab.id);
        });
    } else if (cmd == 'who made this?') {
        chrome.tabs.create({ "url": "https://gomjellie.github.io", "selected": true }, function(tab) {});
    }else if (cmd == "reset"){
        chrome.storage.sync.set({
            tar_lang: 'ko'
        });
        document.querySelector('#result').innerText = "tar_lang: ko";
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
//automatic resize text area using jQuery

//$('textarea').autoResize();

// $("textarea").keyup(function(e) {
//     $(this).height(30);
//     $(this).height(this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth")));
// });