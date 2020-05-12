$(document).ready(function(){

    //comments
    $('#addComment').click(function() {

        var comment = {comment: $('#commentBox').val()};
        $('#commentBox').val('');
        $.post(location.pathname + '/addComment', comment, function(data, status) {
            if(data) {
                $('#recipeComments').prepend('<div class="row comment mx-5">' + 
                '<div class="col-lg-11 p-2 my-3">' + 
                '<h6 class="text-black"><a href="/user/' + data.user._id + '">' + data.user.name + '</a> said</h6>' + 
                '<p class="text-orange ml-5"><i>"' + data.comment + '"</i></p>' +
                '<p class="text-black text-right">posted now</p>' +
                '</div>' +
                '</div>');
            }
        });
    });

    $('body').on('click', 'img#like', function() {
        //get recipe id through src
        var image = $('.recipe-img')[0].src;
        var str = image.substring(image.lastIndexOf('_') + 1, image.lastIndexOf('.'));
        var likes = $(this);
    
        $.post('/recipes/like/'+ str, function(data, status){
            
            if(data != null) {
                likes.hide();
                
                likes.attr('src', '/img/liked.png');
                likes.attr('id', 'liked');
                likes.attr('title', 'Liked post');
    
                likes.fadeIn(500);

                //change like count
                var text = likes.next()[0];
                var num = parseInt( text.innerHTML.substring(0, text.innerHTML.indexOf(" "))) + 1;
                text.innerHTML = num + " people likes this recipe";
            }
        });
    });

    $('body').on('click', 'img#liked', function() {
        //get recipe id through src
        var image = $('.recipe-img')[0].src;
        var str = image.substring(image.lastIndexOf('_') + 1, image.lastIndexOf('.'));
        var liked = $(this);

        $.post('/recipes/unlike/'+ str, function(data, status) {
            if(data != null) {
                liked.hide();
    
                liked.attr('src', '/img/like.png');
                liked.attr('id', 'like');
                liked.attr('title', 'Like post');
                liked.fadeIn(500);

                //change like count
                var text = liked.next()[0];
                var num = parseInt( text.innerHTML.substring(0, text.innerHTML.indexOf(" "))) - 1;
                text.innerHTML = num + " people likes this recipe";
            }
            
        });

    });

    //like for public users
    $('body').on('click', 'img#like_public', function() {
        window.location.href = "/login";
    });
})