
var url = "https://translate.google.com/translate_a/single?client=t&sl=en&tl=ko&hl=ko&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&ie=UTF-8&oe=UTF-8&otf=1&srcrom=0&ssel=0&tsel=0&kc=1&tk=693132.842370&q=if%20i%20were%20you";
var base_url = "https://translate.google.com/translate_a/single?client=t&sl=auto&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&ie=UTF-8&oe=UTF-8&otf=1&ssel=0&tsel=0&kc=7&";

function translatePopup(what_to_search) {
  chrome.storage.sync.get(function (data) {
    var tar_lang = "ko";
    if (data)
      tar_lang = data.tar_lang;
    else
      tar_lang = "ko";
    req = new XMLHttpRequest();
    url = base_url + "tl=" + tar_lang + "&hl=" + tar_lang + "&tk=" + vM(what_to_search) + "&q=" + encodeURIComponent(what_to_search);
    req.open("GET", url, true);

    req.onreadystatechange = function (aEvt) {
      if (req.readyState === 4) {
        if (req.status === 200) { //status code 200 means OK
          var res_arr = req.responseText;
          //alert(res_arr[0][0][0]);
          var len = res_arr[0].length - 1;
          ret = "";
          for (var i = 0; i < len; i++) {
            ret += res_arr[0][i][0];
          }
          document.querySelector('#result').innerText = beautify_result_text(ret);
          return ret;
        } else {
          chrome.tabs.create({
            "url": req.responseURL,
            "selected": true
          }, function (tab) {
          });
          document.querySelector('#result').innerText = "error occured o_O";
          return req.responseURL;
        }
      }
    };
    req.send();
  });

}

var page_base_url = "https://translate.google.com/translate?sl=auto&js=y&prev=_t&ie=UTF-8&edit-text=&act=url";

function translatePage() {
  var current_url;
  chrome.storage.sync.get(function (data) {
    if (data)
      tar_lang = data.tar_lang;
    else
      tar_lang = "en";
  });
  chrome.tabs.query({
    'active': true,
    'currentWindow': true
  }, function (tabs) {
    current_url = tabs[0].url;

    // req = new XMLHttpRequest();
    var translated_url = page_base_url + "&tl=" + tar_lang + "&hl=" + tar_lang + "&u=" + encodeURIComponent(current_url);

    chrome.tabs.update({
      url: translated_url
    });
  });
}

function translate(src_string, tar_lang, success, fail) {
  req = new XMLHttpRequest();
  url = base_url + "tl=" + tar_lang + "&hl=" + tar_lang + "&tk=" + vM(src_string) + "&q=" + encodeURIComponent(selected_string);
  req.open("GET", url, true);

  req.onreadystatechange = function (aEvt) {
    if (req.readyState === 4) {
      if (req.status === 200) {
        var res_arr = eval(req.responseText); // convert string to array-like object
        var len = res_arr[0].length - 1;
        var ret = "";
        for (var i = 0; i < len; i++) {
          ret += res_arr[0][i][0];
        }

        var stored_value = localStorage.getItem(src_string) || "{}";
        stored_value = JSON.parse(stored_value);
        stored_value[tar_lang] = ret;
        localStorage.setItem(src_string, JSON.stringify(stored_value));

        if (ret.replace(/\n/g, "") === src_string.replace(/\n/g, "")) {
          /*
          * if result is same with original text, do nothing
          */
        } else {
          if (ret.trim() === "") {
            return ""
          }

          console.log(ret);
          success(ret);
        }
      } else {
        /*
        if response is not okay
         */
        fail();
      }
    }
  }
}

function selectionTranslate(selected_string) {
  chrome.storage.sync.get(function (data) {
    var tar_lang = "ko";
    if (data !== undefined) {
      tar_lang = data.tar_lang;
    }
    else
      tar_lang = "ko";
    req = new XMLHttpRequest();
    url = base_url + "tl=" + tar_lang + "&hl=" + tar_lang + "&tk=" + vM(selected_string) + "&q=" + encodeURIComponent(selected_string);
    req.open("GET", url, true);

    req.onreadystatechange = function (aEvt) {
      if (req.readyState === 4) {
        if (req.status === 200) {
          var res_arr = eval(req.responseText);
          var len = res_arr[0].length - 1;
          ret = "";
          for (var i = 0; i < len; i++) {
            ret += res_arr[0][i][0];
          }

          var stored_value = localStorage.getItem(selected_string) || "{}";
          stored_value = JSON.parse(stored_value);
          stored_value[tar_lang] = ret;
          localStorage.setItem(selected_string, JSON.stringify(stored_value));

          if (ret.replace(/\n/g, "") === selected_string.replace(/\n/g, "")) {
            /*
             if result is same with original text, do nothing
             */
          } else {

            if (ret.trim() === "") {
              return ""
            }

            console.log(ret);
            nhpup.popup(beautify_result_html(ret));

            if (ret.length < 15) {
              nhpup.pup.width(150);
            } else if (ret.length < 26) {
              nhpup.pup.width(300);
            } else if (ret.length > 100) {
              nhpup.pup.width(750);
            } else {
              nhpup.pup.width(550);
            }
          }
        } else {
          window.open(req.responseURL, "_self");
          return req.responseURL;
        }
      }
    };
    if (localStorage.getItem(selected_string) === null) {
      /*
       if not cached
       */
      req.send();
    } else {
      console.log("cached");

      var stored_value = localStorage.getItem(selected_string);
      stored_value = JSON.parse(stored_value);
      if (stored_value.hasOwnProperty(tar_lang)) {
        var stored_text = stored_value[tar_lang];
        if (stored_text.replace(/\n/g, "") === selected_string.replace(/\n/g, "")) {
          return;
        }
        nhpup.popup(beautify_result_html(stored_value[tar_lang]));

        if (stored_text.length < 15) {
          nhpup.pup.width(150);
        } else if (stored_text.length < 26) {
          nhpup.pup.width(300);
        } else if (stored_text.length > 100) {
          nhpup.pup.width(750);
        } else {
          nhpup.pup.width(550);
        }
      } else {
        req.send();
      }
    }
  });
}

function beautify_result_html(ret) {
  return ret.replace(/(\n)/g, '<br/>').replace(/\. /g, '.<br/>');
}

function beautify_result_text(ret) {
  return ret.replace(/(\n)/g, '\n').replace(/\. /g, '.\n');
}
