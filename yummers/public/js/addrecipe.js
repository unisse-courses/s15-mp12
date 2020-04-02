$(document).ready(function() {
    $('#addIngredient').click(function() {
        $('#ingredientContainer').append(
            '<div class="row mx-4 mt-1">' +
            '<input class="col-lg-1 form-control mr-2" type="number">' +
            '<input class="col-lg-9 form-control mr-5" type="text" placeholder="Ingredient">' +
            '</div>'
        )
    });

    $('#addStep').click(function() {
        $('#stepsContainer').append(
            '<div class="row mx-4 mt-1"> ' +
            '<input class="col-lg-10 form-control mr-5 ml-2" type="text" placeholder="Step">' +
            '</div>'
        )
    });

    //utilities
    function checkField(field, value) {
        if(value != "") {
            $(field).css('border', '');
            return true;
        }
        else {
            $(field).css('border', '2px solid #fd3c3c');
            return false;
        }
    }

    $('#submit').click(function() {
        const elements = $('input[type=text], input[type=number]');
        const elementsVal = elements.map(function() {
            return $(this).val();
        }).get();

        console.log(elements);

        var valid = true;
        
        elements.each(function(index) {
            valid = checkField(this, elementsVal[index]) && valid;
        });

        if(valid)
        {

        }
        else
        {
            $('#errorMessage').text('Fill up missing fields.');
        }

    })
});