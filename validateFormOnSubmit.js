function validateFormOnSubmit(theForm) {
    var reason = "";
    reason += validateName(theForm.name);
    reason += validatePhone(theForm.phone);
    reason += validateEmail(theForm.emaile);

    if (reason != "") {
        alert("Some fields need correction:\n" + reason);
    } else {
        simpleCart.checkout();
    }
    return false;
}