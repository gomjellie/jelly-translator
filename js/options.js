//$('select').niceSelect();

jQuery(document).ready(function($) {
   chrome.storage.sync.get(function(data) {
      var isSelectionChecked = false;
      var isPageChecked = false;
      if (data) {
         isSelectionChecked = data.selection_translate;
         isPageChecked = data.page_translate;
      }
      $('#cmn-toggle-selection-translate').prop('checked', isSelectionChecked);
      $('#cmn-toggle-page-translate').prop('checked', isPageChecked);
   });
});

$("#cmn-toggle-selection-translate").change(function() {
   if ($(this).is(':checked')) {
      chrome.storage.sync.set({
         selection_translate: true
      });
   } else {
      chrome.storage.sync.set({
         selection_translate: false
      });
   }
});

$("#cmn-toggle-page-translate").change(function() {
   if ($(this).is(':checked')) {
      chrome.storage.sync.set({
         page_translate: true
      });
   } else {
      chrome.storage.sync.set({
         page_translate: false
      });
   }
});

$("#saveBtn").click(function() {
   alert("saveBtn clicked");
});

$("#resetBtn").click(function() {
   alert("resetBtn clicked");
});

$("#target").submit(function(event) {
   var lang_selected = $("input:first").val();
   if (lang_selected) {
      alert("" + lang_selected + " have saved as target language");
      chrome.storage.sync.set({
         tar_lang: lang_selected
      });
   }
   event.preventDefault();
});

$("select").change(function() {
   var lang_selected = $(this).val();
   if (lang_selected) {
      chrome.storage.sync.set({
         tar_lang: lang_selected
      });
   }
});
