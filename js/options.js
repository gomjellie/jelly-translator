$(document).ready(function() {
    $('select').niceSelect();
});

jQuery(document).ready(function ($) {
    $('.toggleswitch').toggleSwitch();
});

$("#saveBtn").click(function(){
    alert("saveBtn clicked");
});

$("#resetBtn").click(function(){
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
})
