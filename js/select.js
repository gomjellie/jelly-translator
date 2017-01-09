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
        if (txt != "") {
            console.log(txt);

            //insert dialog
            if (!document.querySelector("#dialog")) {
                $(function() {
                    var dialog_html = "<div id='dialog' title='jelly Translator'><p>" + txt + "</p></div>";
                    document.body.innerHTML += dialog_html;
                    $("#dialog").dialog({
                        dialogClass: 'fixed-dialog',
                        modal: false,
                        close: function(event, ui) {
                            //$(this).dialog('close');
                            $(this).dialog('destroy').remove();
                        },
                        buttons: {
                            "color": function() {
                                if (button_state) {
                                    $(this).animate({
                                        backgroundColor: "#000",
                                        color: "#fff"
                                    }, 800);
                                } else {
                                    $(this).animate({
                                        backgroundColor: "#fff",
                                        color: "#000"
                                    }, 800);
                                }
                                button_state = !button_state;
                                //$(this).dialog('close');
                                //$(this).dialog("destroy").remove();
                            },
                            "translate": function() {
                                alert($(this).text());
                            }
                        },
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
                console.log("dialog already exists");
            }

            //edit dialog text
            $("#dialog").html(htmlForTextWithEmbeddedNewlines(txt));
            //$("#dialog").text(txt.replace(/\n/g, '<br/>'));
            //$("#dialog").text(txt);
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
    for (var i = 0 ; i < lines.length ; i++) {
        htmls.push(tmpDiv.text(lines[i]).html());
    }
    return htmls.join("<br>");
}