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

        $.post('user/unfollow/' + str, function(data, status) {
            if(data != null) {
                //animation hide element
                userPosts.hide();

                //change image to followed
                userPosts.each((index, element) => {
                    element.src = '/img/follow.png';
                });

                //fade in animation
                userPosts.fadeIn(500);
            }
        })
    });
});