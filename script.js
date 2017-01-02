// function query(src) {
//     //컨텐츠 페이지를 대상으로 코드를 실행해주세요.
//     chrome.tabs.executeScript({
//         code: "document.querySelector('body').innerText"
//     }, function(result) {

//         var res = translate(document.querySelector('#src').value);

//     });
// }

function query(src) {
    translate(document.querySelector("#src").value);
}

//팝업 페이지의 #src 입력된 값이 변경 되었을때
if (document.querySelector("#src")) {
    document.querySelector('#src').addEventListener('input', function() {
        var src = document.querySelector('#src').value;
        query(src);
    });
}
//automatic resize text area using jQuery

//$('textarea').autoResize();

// $("textarea").keyup(function(e) {
//     $(this).height(30);
//     $(this).height(this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth")));
// });