// WORKS!!!

k = "",
    cb = "&",
    Gf = "=",
    jd = ".",
    $b = "+-a^+6",
    t = "a",
    Yb = "+",
    Zb = "+-3^+b+-f";

// TKK was extracted from https://translate.google.com/
TKK = eval('((function(){var a\x3d2285686357;var b\x3d-372919212;return 406407+\x27.\x27+(a+b)})())');

sM = function(a) {
        return function() {
            return a
        }
    },
    tM = function(a, b) {
        for (var c = 0; c < b.length - 2; c += 3) {
            var d = b.charAt(c + 2),
                d = d >= t ? d.charCodeAt(0) - 87 : Number(d),
                d = b.charAt(c + 1) == Yb ? a >>> d : a << d;
            a = b.charAt(c) == Yb ? a + d & 4294967295 : a ^ d
        }
        return a
    },
    uM = null,
    vM = function(a) {
        var b;
        if (null !== uM) b = uM;
        else {
            b = sM(String.fromCharCode(84));
            var c = sM(String.fromCharCode(75));
            b = [b(), b()];
            b[1] = c();
            b = (uM = this[b.join(c())] || k) || k // Modified 1: Changed "window" to "this"
        }
        var d = sM(String.fromCharCode(116)),
            c = sM(String.fromCharCode(107)),
            d = [d(), d()];
        d[1] = c();
        c = cb + d.join(k) +
            Gf;
        d = b.split(jd);
        b = Number(d[0]) || 0;
        for (var e = [], f = 0, g = 0; g < a.length; g++) {
            var m = a.charCodeAt(g);
            128 > m ? e[f++] = m : (2048 > m ? e[f++] = m >> 6 | 192 : (55296 == (m & 64512) && g + 1 < a.length && 56320 == (a.charCodeAt(g + 1) & 64512) ? (m = 65536 + ((m & 1023) << 10) + (a.charCodeAt(++g) & 1023), e[f++] = m >> 18 | 240, e[f++] = m >> 12 & 63 | 128) : e[f++] = m >> 12 | 224, e[f++] = m >> 6 & 63 | 128), e[f++] = m & 63 | 128)
        }
        a = b;
        for (f = 0; f < e.length; f++) a += e[f], a = tM(a, $b);
        a = tM(a, Zb);
        a ^= Number(d[1]) || 0;
        0 > a && (a = (a & 2147483647) + 2147483648);
        a %= 1E6;
        return (a.toString() + jd + (a ^ b)) // Modified 2: Removed the beginning "c + ". Original code is "return c + (a.toString() + jd + (a ^ b))".
    };
//TK 값은 vM("string what you want to translate here"); 의 반환값을 가져다 쓰면된다!
var url = "https://translate.google.com/translate_a/single?client=t&sl=en&tl=ko&hl=ko&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&ie=UTF-8&oe=UTF-8&otf=1&srcrom=0&ssel=0&tsel=0&kc=1&tk=693132.842370&q=if%20i%20were%20you";
var base_url = "https://translate.google.com/translate_a/single?client=t&sl=auto&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&ie=UTF-8&oe=UTF-8&otf=1&ssel=0&tsel=0&kc=7&";

req = {};

function translate_for_page(what_to_search, section, tar_lang) {
    req[what_to_search] = new XMLHttpRequest();
    url = base_url + "tl=" + tar_lang + "&hl=" + tar_lang + "&tk=" + vM(what_to_search) + "&q=" + encodeURIComponent(what_to_search);
    req[what_to_search].open("GET", url, true);

    req[what_to_search].onreadystatechange = function(aEvt) {
        if (req[what_to_search].readyState == 4) {
            //readyState 는 0 ~ 4 까지 있는데 1은 send를 호출하기전,
            //3은 일부를 받은상태, 4는 데이터를 전부 받은상태이다.
            if (req[what_to_search].status == 200) { //status code 200 means OK
                var res_arr = eval(req[what_to_search].responseText);
                //alert(res_arr[0][0][0]);
                var len = res_arr[0].length - 1;
                var ret = "";
                for (var i = 0; i < len; i++) {
                    ret += res_arr[0][i][0];
                }
                section.html(what_to_search.replace(what_to_search, ret));
                //section.context.childNodes[0].textContent = ret;//testing
                //document.querySelector('#result').innerText = ret;
                console.log(ret);
                return ret;
            }
        }
    }
    req[what_to_search].send();
}
// loader = document.createElement('script');
// loader.src = "jquery-3.1.1.min.js";
// document.getElementsByTagName('head')[0].appendChild(loader);

function setAjaxAtHead() {
    loader = document.createElement('script');
    loader.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js";
    document.getElementsByTagName('head')[0].appendChild(loader);
}


/* SOFT   <=   p  a   h1 h2 h3 h4 li  div  =>   EXTREME */
function translatePage() {
    $('a, li, p').each(function() {
        var text = $(this).text();
        console.log("text %s is translated", text);
        var tar_lang = "ko";
        chrome.storage.sync.get(function(data) {
            if (data)   { tar_lang = data.tar_lang;}
            else{tar_lang = "ko";}
        });
        translate_for_page(text, $(this), tar_lang);
        //     $(this).html(text.replace($(this).text(), '번역된 문장'));
    });
}
