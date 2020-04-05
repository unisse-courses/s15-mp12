$(document).ready(function() {
    
    //utilities
    function checkField(field) {
        if(field.value != "") {
            $(field).css('border', '');
            return true;
        }
        else {
            $(field).css('border', '2px solid #fd3c3c');
            return false;
        }
    }

    $('#submit').click(function() {
        var valid = true;
        var nameFields = $('input[type="text"]');
        var passwordFields = $('input[type="password"]');
        

        for(var i = 0; i < nameFields.length; i++) {
            valid = checkField(nameFields[i]) && valid;
        }

        for(var i = 0; i < nameFields.length; i++) {
            valid = checkField(passwordFields[i]) && valid;
        }

        if(!valid) {
            $('#errorMessage').text('Fill up missing fields.');
        }
        else
        {
            if(passwordFields[0].value != passwordFields[1].value) {
                $('#errorMessage').text('Passwords does not match.');
                $(passwordFields[0]).css('border', '2px solid #fd3c3c');
                $(passwordFields[1]).css('border', '2px solid #fd3c3c');
            }
            else
            {
                $('#errorMessage').text('');

                var user = {
                    username: nameFields[0].value,
                    name: nameFields[1].value,
                    password: passwordFields[0].value
                }

                $.post('editUser', user, function(data, status) {
                    if(data.user != null) {
                        $('.modal-title').text('Profile updated ' + data.user.name + '!');
                        $('.modal-body').children().text('Redirecting to profile page.');
                        $('#notifModal').modal('show');
                        setTimeout(function (){
                            window.location.href = '/user/' + data.user._id;
                        }, 3000)
                    }
                    else
                    {
                        $('.modal-title').text('Profile update failed');
                        $('.modal-body').children().text('Try again.');
                        $('#notifModal').modal('show');
                    }
                });
            }
        }
        
    });
})