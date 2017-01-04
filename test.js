function test_function() {
    $('a, li, p').each(function() {
        var text = $(this).text();
        console.log("text %s is translated", text);
        $(this).html(text.replace($(this).text(), '번역된 문장'));
    });
    alert("test_function_called");
}