
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


// chrome.storage.sync.get(function(data) {
//     if (data)
//         alert("" + data.tar_lang);
// });