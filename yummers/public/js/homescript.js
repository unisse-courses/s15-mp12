
$(document).ready(function() {
    $('.post').on('click', function(e) {
            //If click is in post is not an icon
            if($(e.target).attr('class') !== 'icon post_icon') {
                window.location.href = $(this).find('a')[1].href;
            }

    })

    $('body').on('click', 'img#follow', function() {
        //get post user id through image src
        image = $(this).parent().parent().find('.user')[0].src;
        var str = image.substring(image.lastIndexOf('/') + 1, image.indexOf('.'));
        
        //get all follow icons in the page with the specific user
        var userPosts = $('img[title="' + $(this).attr('title') + '"');
    

        $.post('user/follow/' + str, function(data, status) {
            if(data != null) {
                //animation hide element
                userPosts.hide();

                //change image to followed
                userPosts.each((index, element) => {
                    element.src = '/img/followed.png';
                    element.id = 'followed';
                });

                //fade in animation
                userPosts.fadeIn(500);
            }
        });
    });

    $('body').on('click', 'img#followed', function() {
        //get post user id through image src
        image = $(this).parent().parent().find('.user')[0].src;
        var str = image.substring(image.lastIndexOf('/') + 1, image.indexOf('.'));

        //get all follow icons in the page with the specific user
        var userPosts = $('img[title="' + $(this).attr('title') + '"');

        $.post('user/unfollow/'+ str, function(data, status) {
            if(data != null) {  
                //animation hide element
                userPosts.hide();

                //change image to followed
                userPosts.each((index, element) => {
                    element.src = '/img/follow.png';
                    element.id = 'follow';
                });

                //fade in animation
                userPosts.fadeIn(500);
            }
        })
    });

    $('body').on('click', 'img#bookmark', function() {
        //get recipe id through src
        var image = $(this).parent().parent().next().children()[0].src;
        var str = {
            id: image.substring(image.lastIndexOf('_') + 1, image.indexOf('.'))
        }

        var bookmark = $(this);
        
        $.post('cookbook/add/', str, function(data, status) {
            if(data != null) {
                bookmark.hide();

                bookmark.attr('src', '/img/bookmarked.png');
                bookmark.attr('id', 'bookmarked');
                bookmark.attr('title', 'Remove from Cookbook');

                bookmark.fadeIn(500);
            }
        });
    });

    $('body').on('click', 'img#bookmarked', function() {
         //get recipe id through src
        var image = $(this).parent().parent().next().children()[0].src;
        var str = {
            id: image.substring(image.lastIndexOf('_') + 1, image.indexOf('.'))
        }
    
        var bookmarked = $(this);
        $.post('cookbook/remove/', str, function(data, status) {
            if(data != null) {
                bookmarked.hide();

                bookmarked.attr('src', '/img/bookmark.png');
                bookmarked.attr('id', 'bookmark');
                bookmarked.attr('title', 'Add to Cookbook');

                bookmarked.fadeIn(500);
            }
        });
    });
    $('body').on('click', 'img#like', function() {
        //get recipe id through src
        var image = $(this).parent().parent().children().children()[4].src;
        var str = image.substring(image.lastIndexOf('_') + 1, image.indexOf('.'));
        var likes = $(this);
    
        $.post('recipes/like/'+ str, function(data, status){
            
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
        var image = $(this).parent().parent().children().children()[4].src;
        var str = image.substring(image.lastIndexOf('_') + 1, image.indexOf('.'));
        var liked = $(this);

        $.post('recipes/unlike/'+ str, function(data, status) {
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
});