$(document).ready(function() {
    $('.post').click(function() {
        window.location.href = $(this).find('a')[1].href;
    })
});