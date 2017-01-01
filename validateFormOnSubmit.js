$("#target").submit(function(event) {
    if ($("input:first").val()) {
        alert("Handler for .submit() called." + $("input:first").val());
    }
    event.preventDefault();
});