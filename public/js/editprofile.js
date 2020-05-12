$(document).ready(function() {
    
    $('.confirm').hide();
    $('.cancel').hide();

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

    //Shows modal when password is clicked
    $('#editPassword').click(function() {
        $('.modal-title').text('Edit Password');
        //reset
        $('.modal-body').text('');
        $('.modal-footer').text('');
        
        //add fields
        $('.modal-body').append('<input class="form-control my-3" id="tempPass" type="password" placeHolder="New Password"/>' + 
                                '<input class="form-control" id="confirmTPass" type="password" placeHolder="Confirm Password"/>');
        $('.modal-footer').append('<p id="errorMessage"></p><p id="successMessage"></p><button id="save" class="btn btn-yellow">Save</button>' + '<button class="btn btn-secondary" data-dismiss="modal">Close</button>');
        $('#notifModal').modal('show');
    });

    //Button listeners for change password modal
    $('body').on('click', 'button#save', function() {
        if($('#tempPass').val() != $('#confirmTPass').val()) {
            $('#errorMessage').text('Passwords does not match.');
        }
        else {
            let valid = checkField($('#tempPass'));
            valid = checkField($('#confirmTPass')) && valid;
            if(valid){
                $('#errorMessage').text('');
                $('#successMessage').text('Password saved!');

                setTimeout(function() {
                    $('#notifModal').modal('hide');
                    $('#password').val($('#tempPass').val());
                }, 1000);
            }
            else {
                $('#errorMessage').text('Fill up empty fields!');
            }
        }
    });
    
    //delete recipe
    $('.delete').click(function() {
        //GET RECIPE ID THROUGH IMAGE FILE TYPE
        var image = $(this).parent().parent().parent().children()[0].src;
        var str = image.substring(image.indexOf('_') + 1, image.lastIndexOf('.'));

        var title = $(this).parent().parent().children()[0];
        
        //show cancel button
        $(this).prev().fadeIn(500);
        //show confirm button
        $(this).next().fadeIn(500);
        $(this).hide();
        var titleText = title.innerHTML;
        title.innerHTML = 'Delete this recipe?';

        //If canceled
        $(this).prev().click(function() {
            $(this).hide();
            $(this).next().next().hide();
            $(this).next().fadeIn(500);
            title.innerHTML = titleText;
        });

        $(this).next().click(function() {
            var card = $(this).parent().parent().parent();
            var extension = {
                ext: image.substring(image.indexOf('.') + 1, image.length)
            }
            $.post('/recipes/' + str + '/delete', extension, function(data, status) {
                if(data.ok == 1)
                {
                    title.innerHTML = 'Recipe Deleted!';

                    card.delay(500).fadeOut(1000);
                }
            });
        })
    });

    $(".custom-file-input").on("change", function() {
        var input = $('#profPicUp');
        
        if(input[0].files && input[0].files[0]) {
            var fileName = $(this).val().split("\\").pop();
            $(this).siblings(".custom-file-label").addClass("selected").html(fileName);

            var reader = new FileReader();

            reader.onload = function(e) {
                $('#profPic').attr('src', e.target.result);
            }

            reader.readAsDataURL(input[0].files[0]);
        }

      });
})