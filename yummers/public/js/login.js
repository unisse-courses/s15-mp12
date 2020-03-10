$('#login_tab').click(function () {
    $('#content').hide();
    $('#content').fadeIn(1000);
    $('#content').empty();
    
    var string =  '<div class="row mt-5">' +
            '<div class="col-xl-2"></div>' +
            '<div class="col-xl-8 mt-4">' +
                '<input class="form-control" type="text" placeholder="Username"/>' + 
            '</div></div>' + 
        '<div class="row mt-3">' + 
            '<div class="col-xl-2"></div>' + 
            '<div class="col-xl-8 mt-4">' +
                '<input class="form-control" type="password" placeholder="Password"/>' +
            '</div>' +
        '</div>' +
        '<div class="row mt-3">' + 
            '<div class="col-xl-4"></div>' + 
            '<div class="col-xl-4 mt-4">' +
                '<input class="form-control" type="submit"/>' + 
            '</div></div>';
    $('#content').append(string);
    $('#login_tab').removeClass("bg-black");
    $('#signup_tab').addClass("bg-black");
})

$('#signup_tab').click(function() {
    $('#content').hide();
    $('#content').fadeIn(1000);
    $('#content').empty();

    var string =  '<div class="row mt-3">' +
            '<div class="col-xl-2"></div>' +
            '<div class="col-xl-8 mt-2">' +
                '<input class="form-control" type="text" placeholder="Username"/>' + 
            '</div></div>' +
            '<div class="row mt-2">' +
            '<div class="col-xl-2"></div>' +
            '<div class="col-xl-8 mt-2">' +
                '<input class="form-control" type="text" placeholder="Email Address"/>' + 
            '</div></div>' + 
        '<div class="row mt-3">' + 
            '<div class="col-xl-2"></div>' + 
            '<div class="col-xl-8 mt-2">' +
                '<input class="form-control" type="password" placeholder="Password"/>' +
            '</div>' +
        '</div>' +
        '<div class="row mt-3">' + 
            '<div class="col-xl-2"></div>' + 
            '<div class="col-xl-8 mt-2">' +
                '<input class="form-control" type="password" placeholder="Confirm Password"/>' +
            '</div>' +
        '</div>' +
        '<div class="row mt-2">' + 
            '<div class="col-xl-4"></div>' + 
            '<div class="col-xl-4 mt-4">' +
                '<input class="form-control" type="submit"/>' + 
            '</div></div>';
    $("#content").append(string);
    $('#signup_tab').removeClass("bg-black");
    $('#login_tab').addClass("bg-black");
})