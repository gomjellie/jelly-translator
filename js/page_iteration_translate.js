
function setAjaxAtHead() {
  loader = document.createElement('script');
  loader.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js";
  document.getElementsByTagName('head')[0].appendChild(loader);
  document.getElementsByTagName('body')[0].appendChild(loader);
}


function iterateTranslate() {
  setAjaxAtHead();
  var form = "<div style='background-color: #E5E5EA; width: inherit; color: #333333; border:none; border-radius: 4px; inset #808080; padding:1px; vertical-align:middle;'>";

  function on_success(res) {
    var translate_result = res.translate_result;
    var context = res.context;
    if (context === undefined) {
      console.log("context undefined");
      return;
    }
    context.append(form + translate_result + "</div>");
    return translate_result;
  }

  function on_fail(req) {
    window.location.href = req.responseURL;
  }

  chrome.storage.sync.get(function (data) {
    var tar_lang = "ko";
    if (data)
      tar_lang = data.tar_lang;
    else
      tar_lang = "ko";

    $('p, h1, h2 ,h3, h4').each(function () {
      var $this = $(this);

      if ($this === undefined) {
        console.log("cut off $this is undefined");
        return ;
      }
      var text = $this.text();

      var tidy_text = text.trim();
      tidy_text = tidy_text.replace(/\s{2,}/g, '');

      var stored_string = translate_cache.get(tidy_text, tar_lang);
      if (stored_string === undefined) {
        if (tidy_text.replace(/\s/g, '') === '') return;
        translate(tidy_text, tar_lang, $this).then(on_success).catch(on_fail);
      } else {
        if (stored_string.replace(/\n/g, "") === tidy_text.replace(/\n/g, "")) {
          return;
        }

        on_success({translate_result: stored_string, context: $this});
      }

    });
  });
}
