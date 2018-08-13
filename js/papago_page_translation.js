chrome.storage.sync.get(function(data) {
  if (data)
    tar_lang = data.tar_lang;
  else
    tar_lang = "en";
});

const PAPAGO_BASE_URL = "https://papago.naver.net/website?";

function translatePageViaPapago() {
  var current_url = window.location.href;
  console.log(current_url);
  if (tar_lang === undefined) {
    console.log("tar_lang is undefined, so i just set as korean")
    tar_lang = 'ko';
  }
  var translated_url = PAPAGO_BASE_URL + "locale=" + tar_lang + "&source=auto" + "&target=" + tar_lang + "&url=" + encodeURIComponent(current_url);
  window.location.href = translated_url;
  // chrome.tabs.query({
  //   'active': true,
  //   'currentWindow': true
  // }, function(tabs) {
  //   current_url = tabs[0].url;
  //
  //   // req = new XMLHttpRequest();
  //   var translated_url = PAPAGO_BASE_URL + "&locale=" + tar_lang + "&target=" + tar_lang + "&url=" + encodeURIComponent(current_url);
  //
  //   chrome.tabs.update({
  //     url: translated_url
  //   });
  // });

}
