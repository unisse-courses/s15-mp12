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
    })

    //signup
    $('#btnSignup').click(function() {
        var valid = checkField($('#signupUsername'));
        valid = checkField($('#signupName')) && valid;
        valid = checkField($('#signupEmail')) && valid;
        valid = checkField($('#signupPass')) && valid;
        valid = checkField($('#confirmPass')) && valid;

        //If mismatched password and confirm password
        if(valid && $('#signupPass').val() !== $('#confirmPass').val()) {
            $('#signupPass').css('border', '2px solid #fd3c3c');
            $('#confirmPass').css('border', '2px solid #fd3c3c');
        }
    })

    $('#login_tab').click(function () {
        window.location.href = '/form/0';
    })

    $('#signup_tab').click(function () {
        window.location.href = '/form/1';
    })

})