// Example starter JavaScript for disabling form submissions if there are invalid fields
$(function () {

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function valid(el) {
        el.removeClass('is-invalid').addClass('is-valid');
    }

    function invalid(el) {
        el.removeClass('is-valid').addClass('is-invalid');
    }

    function validate() {
        let email = $("#email");
        let username = $('#username');
        let pass = $('#password');
        let pass2 = $('#password2');
        let flag = true;

        if (username.val() === '') {
            invalid(username);
            flag = false
        } else
            valid(username);


        if (!validateEmail(email.val())) {
            invalid(email);
            flag = false
        } else
            valid(email);

        if (pass.val().length < 8) {
            invalid(pass);
            flag = false
        } else
            valid(pass);

        if (pass.val() !== pass2.val()) {
            invalid(pass2);
            flag = false
        } else
            valid(pass2);

        if (!flag)
            return false
    }

    $("#validate").bind("click", validate);
});