var click_in_vane_count = 0;
var Dismiss4aWhile = false;
var dialog_html = "<div id='dialog'><p>" + "</p></div>";
document.body.innerHTML += dialog_html;

$(document).ready(function() {
    $(document).mouseup(function(mouseEvent) {
        var txt = '';
        var button_state = true;
        if (window.getSelection) {
            console.log("window works");
            txt = window.getSelection().toString();
        } else if (document.getSelection) {
            console.log("2nd works");
            txt = document.getSelection();
        } else if (document.selection) {
            console.log("3rd works");
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
            if (document.querySelector("#dialog")) {
                $(function() {
                    // var dialog_html = "<div id='dialog'><p>" + txt + "</p></div>";
                    // document.body.innerHTML += dialog_html;
                    $("#dialog").dialog({
                        autoOpen: true,
                        draggable: true,
                        dialogClass: 'fixed-dialog',
                        overflow: 'hidden',
                        modal: false,
                        close: function(event, ui) {
                            //$(this).dialog('close');
                            $(this).dialog('destroy').remove();
                        },
                        buttons: [{
                            text: 'option',
                            open: function() { $(this).addClass('color') },
                            click: function() {
                                chrome.extension.sendMessage({ command: "openOption" },
                                    function(response) {});
                            }
                        }, {
                            text: 'Dismiss4aWhile',
                            open: function() { $(this).addClass('cancelcls') },
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
                console.log("there's no dialog");
            }

            //edit dialog text
            //$("#dialog").html(htmlForTextWithEmbeddedNewlines(txt));
            selectionTranslate(txt, $("#dialog"));
            //$("#dialog").html(txt.replace(/\n/g, '<br/>'));
            //console.log("transformed text :  " + $("#dialog").text());


            //$("#dialog").text(txt);
        } else if (txt == "") {
            click_in_vane_count++;
            if (click_in_vane_count == 3) {
                $("#dialog").each(function() {
                    $(this).dialog('destroy').remove();
                });
                click_in_vane_count = 0;
                var dialog_html = "<div id='dialog'><p>" + "</p></div>";
                document.body.innerHTML += dialog_html;
            }

        }

        // chrome.extension.sendMessage(
        //  {command: "openPopup"},
        //  function(response) {});

    });
});

function htmlForTextWithEmbeddedNewlines(text) {
    var htmls = [];
    var lines = text.split(/\n/);
    // The temporary <div/> is to perform HTML entity encoding reliably.
    //
    // document.createElement() is *much* faster than jQuery('<div></div>')
    // http://stackoverflow.com/questions/268490/
    //
    // You don't need jQuery but then you need to struggle with browser
    // differences in innerText/textContent yourself
    var tmpDiv = jQuery(document.createElement('div'));
    for (var i = 0; i < lines.length; i++) {
        htmls.push(tmpDiv.text(lines[i]).html());
    }
    return htmls.join("<br>");
}