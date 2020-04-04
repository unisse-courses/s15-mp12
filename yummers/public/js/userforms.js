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

        //if there are empty fields
        if(!valid) {
            $('#errorMessage').text('Fill up missing fields.');
        }
        else {
            $('#errorMessage').text('');

            var username = $('#loginUsername').val();
            var pass = $('#loginPass').val();

            var user = {
                username: username,
                password: pass
            }

            //send field data to server
            $.post('/login', user, function(data, status) {

                //If user was found
                if(data.user != null) {
                    $('.modal-title').text('Welcome ' + data.user.name + '!');
                    $('.modal-body').children().text('Redirecting to home page.');
                    $('#notifModal').modal('show');
                    setTimeout(function (){
                        window.location.href = '/';
                    }, 3000)
                }
                else $('#errorMessage').text('Invalid username or password.');
            })
        }

    })

    //signup
    $('#btnSignup').click(function() {
        var valid = checkField($('#signupUsername'));
        valid = checkField($('#signupName')) && valid;
        valid = checkField($('#signupEmail')) && valid;
        valid = checkField($('#signupPass')) && valid;
        valid = checkField($('#confirmPass')) && valid;

        //If there are no empty fields
        if(!valid) {
            $('#errorMessage').text('Fill up missing fields.');
        }
        else {
            $('#errorMessage').text('');
            
            //If mismatched password and confirm password
            if($('#signupPass').val() !== $('#confirmPass').val()) {
                $('#errorMessage').text('Password does not match.');
                $('#signupPass').css('border', '2px solid #fd3c3c');
                $('#confirmPass').css('border', '2px solid #fd3c3c');
            }
            else
            {
                var username = $('#signupUsername').val();
                var name = $('#signupName').val();
                var email = $('#signupEmail').val();
                var pass = $('#signupPass').val();
                var confirm = $('#confirmPass').val();

                var newUser = {
                    username: username,
                    name: name,
                    email: email,
                    pass: pass,
                    confirm: confirm
                }

                $.post('/signup', newUser, function(data, status) {
                    if(data.accepted) {
                        $('.modal-title').text('Welcome to Yummers ' + name + '!');
                        $('.modal-body').children().text('Redirecting to login page.');
                        $('#notifModal').modal('show');
                        setTimeout(function (){
                            window.location.href = '/form/0';
                        }, 3000)
                    }
                    else {
                        $('.modal-title').text('An error has occured!');
                        $('.modal-body').children().text('Please try again later.');
                        $('#notifModal').modal('show');
                    }
                })
            }
        }
        
    })

    $('#login_tab').click(function () {
        window.location.href = '/form/0';
    })

    $('#signup_tab').click(function () {
        window.location.href = '/form/1';
    })

})