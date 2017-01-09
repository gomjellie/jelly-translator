$(document).ready(function() {
    $(document).mouseup(function(mouseEvent) {
        var txt = '';
        var button_state = true;
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
                            "color": function() {
                                if (button_state) {
                                    $(this).animate({
                                        backgroundColor: "#000",
                                        color: "#fff",
                                        height: 500
                                    }, 1000);
                                } else {
                                    $(this).animate({
                                        backgroundColor: "#fff",
                                        color: "#000",
                                        height: 200
                                    }, 500);
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
                            effect: "Size",
                            duration: 500
                        },
                        hide: {
                            effect: "Size",
                            duration: 500
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
        //  {command: "openPopup"},
        //  function(response) {});

    });
});