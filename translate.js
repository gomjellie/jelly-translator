var url = "https://translate.google.com/translate_a/single?client=t&sl=en&tl=ko&hl=ko&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&ie=UTF-8&oe=UTF-8&otf=1&srcrom=0&ssel=0&tsel=0&kc=1&tk=693132.842370&q=if%20i%20were%20you"

function translate() {
    req = new XMLHttpRequest();
    req.open("GET", url , true);

    req.send();
    req.onreadystatechange = function(aEvt) {
        if (req.readyState == 4) {
            if (req.status == 200) {
                var res_arr = eval(req.responseText);
                alert(res_arr[0][0][0]);
            }
        }
    }

    alert(arr[0][0][0]);
}