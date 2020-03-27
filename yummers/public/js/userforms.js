$(document).ready(function () {

    $('#content').hide();
    $('#content').fadeIn(1000);

    //utilities
    function checkField(field) {
        if(field.val() != "") {
            $(field).css('border', '');
            return true;
        }
        else {
            $(field).css('border', '2px solid #fd3c3c');
            return false;
        }
    }

    //login
    $('#btnLogin').click(function() {
        var valid = checkField($('#loginUsername'));
        valid = checkField($('#loginPass')) && valid;
        if(!valid) {
            $('#errorMessage').text('Fill up missing fields.');
        }
        else {
            $('#errorMessage').text('');
        }

        return valid;
    })

    //signup
    $('#btnSignup').click(function() {
        var valid = checkField($('#signupUsername'));
        valid = checkField($('#signupEmail')) && valid;
        valid = checkField($('#signupPass')) && valid;
        valid = checkField($('#confirmPass')) && valid;
        if(!valid) {
            $('#errorMessage').text('Fill up missing fields.');
        }
        else {
            $('#errorMessage').text('');
            if($('#signupPass').val() !== $('#confirmPass').val()) {
                $('#errorMessage').text('Password does not match.');
            }
        }
        return valid;
    })

    $('#login_tab').click(function () {
        window.location.href = '/form/0';
    })

    $('#signup_tab').click(function () {
        window.location.href = '/form/1';
    })

})