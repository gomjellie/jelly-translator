var click_in_vane_count = 0;
var Dismiss4aWhile = false;
var dialog_html = "<div id='translate_dialog'><p></p></div>";
$("body").append(dialog_html);

$(document).ready(function() {
   chrome.storage.sync.get(function(data) {
      if (!data.selection_translate) {
         return;
      }
      document.addEventListener('mouseup', show_dialog);
   });
});

var show_dialog = function(mouseEvent) {
   chrome.storage.sync.get(function(data) { // function which get selected text
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
         //insert dialog
         if (Dismiss4aWhile == true)
            return;
         if (document.querySelector("#translate_dialog")) {
            $(make_dialog);
         }

         selectionTranslate(txt, $("#translate_dialog"));
      } else if (txt === "") {
         click_in_vane_count++;
         if (click_in_vane_count == 3) { // when user clicks non-dialog area 3 times
            $("#translate_dialog").each(function() { // destroy showing dialog
               if ($(this).dialog()) {
                  $(this).dialog('destroy').remove();
               }
            });
            click_in_vane_count = 0;
            $("body").append(dialog_html);
         }
      }
   });
}

var make_dialog = function() {
   $("#translate_dialog").dialog({
      autoOpen: true,
      draggable: true,
      dialogClass: 'fixed-dialog',
      overflow: 'hidden',
      width: '27em',
      modal: false,
      close: function(event, ui) {
         ("#translate_dialog").each(function() {
            $(this).dialog('destroy').remove();
         });
      },
      buttons: [{
         text: 'Copy to Clipboard',
         click: function() {
            copyToClipboard("#translate_dialog");
         }
      }, {
         text: 'option',
         open: function() {
            $(this).addClass('color')
         },
         click: function() {
            chrome.extension.sendMessage({
                  command: "openOption"
               },
               function(response) {});
         }
      }, {
         text: 'Turn Off',
         open: function() {
            $(this).addClass('cancelcls')
         },
         click: function() {
            chrome.storage.sync.set({
               selection_translate: false
            });
            $(this).dialog('destroy').remove();
         }
      }],
      position: {
         my: "left",
         at: "right top",
         //of: $(mouseEvent)
      },
      show: {
         effect: "size",
         duration: 0
      },
      hide: {
         effect: "size",
         duration: 0
      }
      //position: "top right"//[mouseEvent.clientX, mouseEvent.clientY]
   });
};

function copyToClipboard(element) {
   var $temp = $("<input>");
   $("body").append($temp);
   $temp.val($(element).text()).select();
   document.execCommand("copy");
   $temp.remove();
}
