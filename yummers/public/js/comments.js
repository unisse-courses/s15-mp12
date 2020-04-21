$(document).ready(function(){
    $('#addComment').click(function() {

        var comment = {comment: $('#commentBox').val()};
        $('#commentBox').val('');
        $.post(location.pathname + '/addComment', comment, function(data, status) {
            if(data) {
                $('#recipeComments').append('<div class="row comment mx-5">' + 
                '<div class="col-lg-11 p-2 my-3">' + 
                '<h6 class="text-black"><a href="/user/' + data.user._id + '">' + data.user.name + '</a> said</h6>' + 
                '<p class="text-orange ml-5"><i>"' + data.comment + '"</i></p>' +
                '</div>' +
                '</div>');
            }
        });
    });
})