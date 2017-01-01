// This js code was extracted from http://translate.google.com/translate/releases/twsfe_w_20160104_RC00/r/js/desktop_module_main.js
// The vM function is used to calculate the tk value.

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
/*
https://translate.google.com/translate_a/single?client=t&sl=en&tl=ko&hl=ko&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&ie=UTF-8&oe=UTF-8&source=btn&ssel=0&tsel=0&kc=8&tk=500733.125648&q=Note%20that%20encodeURI%20by%20itself%20cannot%20form%20proper%20HTTP%20GET%20and%20POST%20requests%2C%20such%20as%20for%20XMLHTTPRequests%2C%20because%20%22%26%22%2C%20%22%2B%22%2C%20and%20%22%3D%22%20are%20not%20encoded%2C%20which%20are%20treated%20as%20special%20characters%20in%20GET%20and%20POST%20requests.%20encodeURIComponent%2C%20however%2C%20does%20encode%20these%20characters.
*/
/*
client: 't',
            sl: source language, //auto = auto , en = english
            tl: target Language, //ko = korean,
            hl: target Language, //ko = korean
            dt: ['at', 'bd', 'ex', 'ld', 'md', 'qca', 'rw', 'rm', 'ss', 't'], // 그냥 t로 해두면 되는듯
            ie: 'UTF-8', // input encoding
            oe: 'UTF-8', // output encoding
            otf: 1,
            ssel: 0,
            tsel: 0,
            kc: 7,
            q: text

sl - source language code (auto for autodetection)
tl - translation language
q - source text / word
ie - input encoding (a guess)
oe - output encoding (a guess)
dt - may be included more than once and specifies what to return in the reply.
Here are some values for dt. If the value is set, the following data will be returned:

t - translation of source text
at - alternate translations
rm - transcription / transliteration of source and translated texts
bd - dictionary, in case source text is one word (you get translations with articles, reverse translations, etc.)
md - definitions of source text, if it's one word
ss - synonyms of source text, if it's one word
ex - examples
rw - See also list.
*/
/*
var url = "https://translate.google.com/translate_a/single?client=t&sl=en&tl=ko&hl=ko&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&ie=UTF-8&oe=UTF-8&otf=1&pc=1&ssel=0&tsel=0&kc=2&tk=252101.365024&q=The%20Montreal%20Laboratory%20in%20Montreal%2C%20Canada%2C%20was%20established%20by%20the%20National%20Research%20Council%20of%20Canada%20during%20World%20War%20II%20to%20undertake%20nuclear%20research%20in%20collaboration%20with%20the%20United%20Kingdom.%20After%20the%20Fall%20of%20France%2C%20some%20French%20scientists%20escaped%20to%20Britain%20with%20their%20stock%20of%20heavy%20water%2C%20and%20joined%20the%20British%20Tube%20Alloys%20project%20to%20build%20an%20atomic%20bomb.%20In%201942%2C%20it%20was%20decided%20to%20relocate%20the%20work%20to%20Canada."
*/

function translate(what_to_search) {
    chrome.storage.sync.get(function(data) {
        if (data)
            tar_lang = data.tar_lang;
        else
            tar_lang = "en";
    });
    req = new XMLHttpRequest();
    url = base_url + "tl=" + tar_lang + "&hl=" + tar_lang + "&tk=" + vM(what_to_search) + "&q=" + encodeURI(what_to_search);
    req.open("GET", url, true);

    req.onreadystatechange = function(aEvt) {
        if (req.readyState == 4) {
            //readyState 는 0 ~ 4 까지 있는데 1은 send를 호출하기전,
            //3은 일부를 받은상태, 4는 데이터를 전부 받은상태이다.
            if (req.status == 200) { //status code 200 means OK
                var res_arr = eval(req.responseText);
                //alert(res_arr[0][0][0]);
                document.querySelector('#result').innerText = res_arr[0][0][0];
                return res_arr[0][0][0];
            }
        }
    }
    req.send();
}

// document.getElementById("button").addEventListener('click', function(event) {
//     console.log("clicked");
//     alert("hello");
// });