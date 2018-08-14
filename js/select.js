var click_in_vane_count = 0;

$(document).ready(function () {
  chrome.storage.sync.get(function (data) {
    if (!data.selection_translate) {
      return;
    }
    document.addEventListener('mouseup', show_nhpup);
  });
});

var show_nhpup = function (mouseEvent) {
  chrome.storage.sync.get(function (data) { // function which get selected text
    if (!data.selection_translate) { // if option is off halt function
      return;
    }
    var txt = '';
    var button_state = true;
    if (window.getSelection) {
      txt = window.getSelection().toString();
    } else if (document.getSelection) {
      txt = document.getSelection();
    } else if (document.selection) {
      txt = document.selection.createRange().text;
    } else {
      return;
    }
    try {
      txt = txt.toString(); //String(txt); // Type Casting
    } catch (exception) {
      txt = String(txt);
    }
    if (txt !== "") {
      selectionTranslate(txt);
    } else if (txt === "") {
      click_in_vane_count++;
      if (click_in_vane_count > 1) { // when user clicks non-dialog area 3 times
        nhpup.hide();
        click_in_vane_count = 0;

      }
    }
  });
};

