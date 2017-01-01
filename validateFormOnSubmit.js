
$("#target").submit(function(event) {
    var lang_selected = $("input:first").val();
    if (lang_selected) {
        alert("Handler for .submit() called." + lang_selected);
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