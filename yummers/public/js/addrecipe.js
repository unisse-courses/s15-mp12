$(document).ready(function() {
    //Add new field for ingredients
    $('body').on('click', 'button#addIngredient', function() {
        $('#addIngredient').parent().append(
            '<button class="col-lg-1 form-control btn btn-secondary remove">-</button>'
        );

        $('#addIngredient').remove();

        $('#ingredientContainer').append(
            '<div class="row mx-4 mt-1">' +
            '<input class="col-lg-1 form-control mr-2" name="quantity" type="number" min="0.0625" step="0.0625">' +
            '<input class="col-lg-9 form-control mr-5" name="ingredient" type="text" placeholder="Unit + Ingredient (Ex. tbsp of salt)">' +
            '<button class="col-lg-1 form-control btn btn-secondary" id="addIngredient">+</button>' +
            '</div>'
        )
    });

    //Add new field for steps
    $('body').on('click', 'button#addStep', function() {
        $('#addStep').parent().append(
            '<button class="col-lg-1 form-control btn btn-secondary remove">-</button>'
        );

        $('#addStep').remove();

        $('#stepsContainer').append(
            '<div class="row mx-4 mt-1"> ' +
            '<input class="col-lg-10 form-control mr-5 ml-2" name="step" type="text" placeholder="Step (Ex. Heat water to boiling level.)">' +
            '<button class="col-lg-1 form-control btn btn-secondary" id="addStep">+</button>' +
            '</div>'
        )
    });
    
    //Remove a row either from ingredients or step
    $('body').on('click', 'button.remove', function() {
        $(this).parent().remove();
    })

    $('body').on('click', 'img#foodImg', function() {
        var image = $('#foodImg').clone();
        window.open(image.attr('src'), '_blank');
    })

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

    //check empty inputs
    function checkValid(elements, elementsVal) {
        var valid = true;

        //check each field's input
        elements.each(function(index) {
            valid = checkField(this, elementsVal[index]) && valid;
        });

        return valid;
    }

    //SUBMIT NEW RECIPE
    $('#submit').click(function() {
        //get all fields
        const elements = $('input[type=text], input[type=number]');
        const elementsVal = elements.map(function() {
            return $(this).val();

        }).get();
        
        if(!checkValid(elements, elementsVal)) {
            $('#errorMessage').text('Fill up missing fields.');
            return false;
        }
        if($('#foodUp').val() == '') {
            $('#errorMessage').text('Recipe picture is required.');
            $(".custom-file-label").css('border', '2px solid #fd3c3c');   
            return false;
        }
        else {
            $(".custom-file-label").css('border', '');  
        }
    });

    //FOR UPDATING RECIPE
    $('#submitUpdate').click(function() {
        //get all fields
        const elements = $('input[type=text], input[type=number]');
        const elementsVal = elements.map(function() {
            return $(this).val();
        }).get();

        if(!checkValid(elements, elementsVal))
        {
            $('#errorMessage').text('Fill up missing fields.');
            return false;
        }
    });

    $(".custom-file-input").on("change", function() {
        var input = $('#foodUp');
        
        if(input[0].files && input[0].files[0]) {
            var fileName = $(this).val().split("\\").pop();
            $(this).siblings(".custom-file-label").addClass("selected").html(fileName);

            var reader = new FileReader();

            reader.onload = function(e) {
                $('#foodImg').attr('src', e.target.result);
            }

            reader.readAsDataURL(input[0].files[0]);
        }

      });
    
    //Set last button to +
    var lastIng = $('#ingredientContainer').children().last().children()[2];
    var lastStep = $('#stepsContainer').children().last().children()[1];

    lastIng.classList.remove("remove");
    lastIng.setAttribute('id', "addIngredient");
    lastIng.innerHTML = "+";
    
    lastStep.classList.remove("remove");
    lastStep.setAttribute('id', "addStep");
    lastStep.innerHTML = "+";
    
});