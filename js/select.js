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
                            "close": function() {
                                //$(this).dialog('close');
                                $(this).dialog("destroy").remove();
                            }
                        },
                        position: {
                            my: "left",
                            at: "right",
                            of: $(mouseEvent)
                        },
                        show: {
                            effect: "blind",
                            duration: 1000
                        },
                        hide: {
                            effect: "blind",
                            duration: 1000
                        }
                        //position: "top right"//[mouseEvent.clientX, mouseEvent.clientY]
                    });
                });
            } else {
                console.log("dialog already exists");
            }

            //edit dialog text
            $("#dialog").text(txt);
        }



        // chrome.extension.sendMessage(
        // 	{command: "openPopup"},
        // 	function(response) {});

    });
});
