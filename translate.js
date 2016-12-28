//TODO:
//현재 완성한부분까지는 쉬움.
//tk값, 현재 코드에서의 tk=693132.842370 이부분이 중요하다...!
//tk값 생성하는 코드 javascript로 만들기!

var url = "https://translate.google.com/translate_a/single?client=t&sl=en&tl=ko&hl=ko&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&ie=UTF-8&oe=UTF-8&otf=1&srcrom=0&ssel=0&tsel=0&kc=1&tk=693132.842370&q=if%20i%20were%20you"

function translate() {
    req = new XMLHttpRequest();
    req.open("GET", url , true);


    req.onreadystatechange = function(aEvt) {
        if (req.readyState == 4) {
        	//readyState 는 0 ~ 4 까지 있는데 1은 send를 호출하기전,
        	//3은 일부를 받은상태, 4는 데이터를 전부 받은상태이다.
            if (req.status == 200) {//status code 200 means OK
                var res_arr = eval(req.responseText);
                alert(res_arr[0][0][0]);
            }
        }
    }
    req.send();
}

document.getElementById("button").addEventListener('click', function(event) {
    console.log("clicked");
});
translate();