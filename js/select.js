var click_in_vane_count = 0;
var Dismiss4aWhile = false;
var dialog_html = "<div id='translate_dialog'><p></p></div>";
// document.body.innerHTML += dialog_html;
$("body").append(dialog_html);

$(document).ready(function() {
    document.addEventListener('mouseup', show_dialog);
});

var show_dialog = function(mouseEvent) {
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
    //console.log(txt);
    if (txt != "") {
        //insert dialog
        if (Dismiss4aWhile == true)
            return;
        if (document.querySelector("#translate_dialog")) {
            $(function() {
                // var dialog_html = "<div id='dialog'><p>" + txt + "</p></div>";
                // document.body.innerHTML += dialog_html;
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
                        text: 'Dismiss4aWhile',
                        open: function() {
                            $(this).addClass('cancelcls')
                        },
                        click: function() {
                            Dismiss4aWhile = true;
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
                        duration: 500
                    },
                    hide: {
                        effect: "size",
                        duration: 500
                    }
                    //position: "top right"//[mouseEvent.clientX, mouseEvent.clientY]
                });
            });
        } else {
            //console.log("there's no dialog");
        }

        selectionTranslate(txt, $("#translate_dialog"));
    } else if (txt == "") {
        click_in_vane_count++;
        if (click_in_vane_count == 3) {
            $("#translate_dialog").each(function() {
                if ($(this).dialog()) {
                    $(this).dialog('destroy').remove();
                }
            });
            click_in_vane_count = 0;
            var dialog_html = "<div id='translate_dialog'><p></p></div>";
            $("body").append(dialog_html);
        }
    }

    // chrome.extension.sendMessage(
    //  {command: "openPopup"},
    //  function(response) {});
}
