function query(src) {
    //컨텐츠 페이지를 대상으로 코드를 실행해주세요.
    chrome.tabs.executeScript({
        code: "document.querySelector('body').innerText"
    }, function(result) {
        var res = translate(document.querySelector('#src').value);
        //document.querySelector('#result').innerText = res; //#이 붙으면 id값
    });
}

//컨텐츠 페이지의 #src 입력된 값이 변경 되었을때
document.querySelector('#src').addEventListener('input', function() {
    var src = document.querySelector('#src').value;
    query(src);
});

var clickedEl = null;

document.addEventListener("mousedown", function(event){
    //right click
    if(event.button == 2) {
        clickedEl = event.target;
    }
}, true);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request == "getClickedEl") {
        sendResponse({value: clickedEl.value});
    }
});

//automatic resize text area using jQuery
//$('textarea').autoResize();
