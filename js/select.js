$(document).ready(function() {
    $(document).mouseup(function(mouseEvent) {
        var txt = '';
        if (window.getSelection) {
            txt = window.getSelection();
        } else if (document.getSelection) {
            txt = document.getSelection();
        } else if (document.selection) {
            txt = document.selection.createRange().text;
        } else {
            return;
        }
        txt = String(txt); // Type Casting
        if (txt != "") {
            console.log(txt);

            //insert dialog
            if (!document.querySelector("#dialog")) {
                $(function() {
                    var dialog_html = "<div id='dialog' title='jelly Translator'><p>THIS IS DIALOG</p></div>";
                    document.body.innerHTML += dialog_html;
                    $("#dialog").dialog({
                        dialogClass: 'fixed-dialog',
                        modal: false,
                        buttons: {
                            "x": function() {
                                $(this).dialog("close");
                            }
                        },
                        show: {
                            effect: "blind",
                            duration: 1000
                        },
                        hide: {
                            effect: "explode",
                            duration: 1000
                        },
                        position: [mouseEvent.clientX, mouseEvent.clientY]
                    });
                });
            } else {
                console.log("dialog is already exists");
            }

            //edit dialog text
            $("#dialog").text(txt);
        }



        // chrome.extension.sendMessage(
        // 	{command: "openPopup"},
        // 	function(response) {});

    });
});

// $(document).ready(function() {
//     $(document).mouseup(function() {

//         var txt = '';
//         if (window.getSelection) {
//             txt = window.getSelection();
//         } else if (document.getSelection) {
//             txt = document.getSelection();
//         } else if (document.selection) {
//             txt = document.selection.createRange().text;
//         } else {
//             return;
//         }
//         txt = String(txt); // Type Casting
//         console.log(txt);
//         if (txt != "") {
//             //insert dialog
//             if (!document.querySelector("#dialog")) {
//                 $(function() {
//                     var dialog_html = "<div id='dialog' title='Basic dialog'><p>THIS IS DIALOG</p></div>";
//                     document.body.innerHTML += dialog_html;
//                     $("#dialog").dialog();
//                 });
//             } else {
//                 console.log("dialog is already exists");
//             }

//             //edit dialog text
//             $("#dialog").text(txt);
//         }
//     });
// });