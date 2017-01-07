$(document).ready(function() {
    $('select').niceSelect();
});



$("#target").submit(function(event) {
    var lang_selected = $("input:first").val();
    if (lang_selected) {
        alert("" + lang_selected + " have saved as target language");
        chrome.storage.local.set({
            tar_lang: lang_selected
        });
    }
    event.preventDefault();
});

$("select").change(function() {
    var lang_selected = $(this).val();
    if (lang_selected) {
        chrome.storage.local.set({
            tar_lang: lang_selected
        });
    }
})
