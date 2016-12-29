function query(src) {
    //컨텐츠 페이지를 대상으로 코드를 실행해주세요.
    chrome.tabs.executeScript({
        code: "document.querySelector('body').innerText"
    }, function(result) {
        var res = translate(document.querySelector('#src').value);
        document.querySelector('#result').innerText = res; //#이 붙으면 id값
    });
}

//저장되어있던 값 불러오기
chrome.storage.sync.get(function (data) {
  // #src의 값으로 data의 값을 입력해주세요.
  document.querySelector('#src').value = data.previousVal;

  //분석해서 그 결과를 #result에 넣어주세요.
  query(data.previousVal);
});

//컨텐츠 페이지의 #src 입력된 값이 변경 되었을때
document.querySelector('#src').addEventListener('change', function() {
    var src = document.querySelector('#src').value;

    //크롬 스토리지에 입력값을 저장한다.
    chrome.storage.sync.set({
        previousVal: src
    });

    query(src);

    chrome.storage.local.set({ 'active': true });
    chrome.extension.getBackgroundPage().reload();
    //alert("hello");
})
