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

function translate(what_to_search) {
	chrome.storage.sync.get(function(data) {
		var tar_lang = "ko";
		if (data)
			tar_lang = data.tar_lang;
		else
			tar_lang = "ko";
		req = new XMLHttpRequest();
		url = base_url + "tl=" + tar_lang + "&hl=" + tar_lang + "&tk=" + vM(what_to_search) + "&q=" + encodeURIComponent(what_to_search);
		req.open("GET", url, true);

		req.onreadystatechange = function(aEvt) {
			if (req.readyState == 4) {
				//readyState 는 0 ~ 4 까지 있는데 1은 send를 호출하기전,
				//3은 일부를 받은상태, 4는 데이터를 전부 받은상태이다.
				if (req.status == 200) { //status code 200 means OK
					var res_arr = eval(req.responseText);
					//alert(res_arr[0][0][0]);
					var len = res_arr[0].length - 1;
					ret = "";
					for (var i = 0; i < len; i++) {
						ret += res_arr[0][i][0];
					}
					document.querySelector('#result').innerText = ret;
					return ret;
				} else {
					chrome.tabs.create({
						"url": req.responseURL,
						"selected": true
					}, function(tab) {});
					document.querySelector('#result').innerText = "error occured o_O";
					return req.responseURL;
				}
			}
		}
		req.send();
	});

}

var page_base_url = "https://translate.google.com/translate?sl=auto&js=y&prev=_t&ie=UTF-8&edit-text=&act=url";

function translatePage() {
	var current_url;
	chrome.storage.sync.get(function(data) {
		if (data)
			tar_lang = data.tar_lang;
		else
			tar_lang = "en";
	});
	chrome.tabs.query({
		'active': true,
		'currentWindow': true
	}, function(tabs) {
		current_url = tabs[0].url;

		// req = new XMLHttpRequest();
		var translated_url = page_base_url + "&tl=" + tar_lang + "&hl=" + tar_lang + "&u=" + encodeURIComponent(current_url);

		chrome.tabs.update({
			url: translated_url
		});
	});

}

function selectionTranslate(selected_string, dialog) {
	chrome.storage.sync.get(function(data) {
		var tar_lang = "ko";
		if (data)
			tar_lang = data.tar_lang;
		else
			tar_lang = "ko";
		req = new XMLHttpRequest();
		url = base_url + "tl=" + tar_lang + "&hl=" + tar_lang + "&tk=" + vM(selected_string) + "&q=" + encodeURIComponent(selected_string);
		req.open("GET", url, true);

		req.onreadystatechange = function(aEvt) {
			if (req.readyState == 4) {
				//readyState 는 0 ~ 4 까지 있는데 1은 send를 호출하기전,
				//3은 일부를 받은상태, 4는 데이터를 전부 받은상태이다.
				if (req.status == 200) { //status code 200 means OK
					var res_arr = eval(req.responseText);
					//alert(res_arr[0][0][0]);
					var len = res_arr[0].length - 1;
					ret = "";
					for (var i = 0; i < len; i++) {
						ret += res_arr[0][i][0];
					}

					if (ret.replace(/\n/g, "") == selected_string.replace(/\n/g, "")) {
						dialog.dialog('destroy').remove();
						var dialog_html = "<div id='translate_dialog'><p></p></div>";
						$("body").append(dialog_html);
					} else {
						dialog.html(ret.replace(/\n/g, '<br/>'));
					}
				} else {
					chrome.tabs.create({
						"url": req.responseURL,
						"selected": true
					}, function(tab) {});
					document.querySelector('#result').innerText = "error occured o_O";
					return req.responseURL;
				}
			}
		}
		req.send();
	});
}

////////////////////////

var ajax_for_page_translate = function(what_to_search, section) {
	var base_url = "https://translate.google.com/translate_a/single?client=t&sl=auto&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&ie=UTF-8&oe=UTF-8&otf=1&ssel=0&tsel=0&kc=7&";

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
			} else if (req[what_to_search].status == 503) {
				//console.log(req[what_to_search].responseURL);
				throw req[what_to_search].responseURL;
			} else if (req[what_to_search].status == 403) {
				section.html(req[what_to_search].responseText);
				throw req[what_to_search].responseURL;
			}
		}
	}
	req[what_to_search].send();
}

function setAjaxAtHead() {
	loader = document.createElement('script');
	loader.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js";
	document.getElementsByTagName('head')[0].appendChild(loader);
	document.getElementsByTagName('body')[0].appendChild(loader);
}


/* SOFT   <=   p  a   h1 h2 h3 h4 li  div  =>   EXTREME */
function translatePage_unique() {
	setAjaxAtHead();

	$('p, a, h1, h2, h3, h4, li').each(function() {
		var text = $(this).text();
		console.log("text %s is translated", text);
		try {
			ajax_for_page_translate(text, $(this));
		} catch (err) {
			//chrome.tabs.create({ "url": err, "selected": true }, function(tab) {});
			return false;
		}
		//     $(this).html(text.replace($(this).text(), '번역된 문장'));
	});
}
