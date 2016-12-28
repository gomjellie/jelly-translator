function matching(user) {
    //컨텐츠 페이지를 대상으로 코드를 실행해주세요.
    chrome.tabs.executeScript({
        code: "document.querySelector('body').innerText"
    }, function(result) {
        var bodyText = result[0];
        var bodyNum = bodyText.split(' ').length;
        var myNum = bodyText.match(new RegExp('\\b(' + user + ')\\b', 'gi')).length;

        var per_prec2 = (myNum / bodyNum * 100).toFixed(2);
        var ret = myNum + '/' + bodyNum + '   (' + per_prec2 + '%)';
        document.querySelector('#result').innerText = ret; //#이 붙으면 id값
    });
}

//컨텐츠 페이지의 #user 입력된 값이 변경 되었을때
//컨텐츠 페이지에 등장하는 몇개의 단어가 등장하는지 계산해주세요
document.querySelector('#user').addEventListener('change', function() {
    var user = document.querySelector('#user').value;

    //크롬 스토리지에 입력값을 저장한다.
    chrome.storage.sync.set({
        userWords: user
    });

    matching(user);
})