$(document).ready(function() {
    //Add new field for ingredients
    $('body').on('click', 'button#addIngredient', function() {
        $('#addIngredient').parent().append(
            '<button class="col-lg-1 form-control btn btn-secondary remove">-</button>'
        );

        $('#addIngredient').remove();

        $('#ingredientContainer').append(
            '<div class="row mx-4 mt-1">' +
            '<input class="col-lg-1 form-control mr-2" name="quantity" type="number">' +
            '<input class="col-lg-9 form-control mr-5" name="ingredient" type="text" placeholder="Ingredient">' +
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
            '<div class="row mx-3 mt-1"> ' +
            '<input class="col-lg-10 form-control mr-5 ml-2" name="step" type="text" placeholder="Step">' +
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

    //used to get fields content and return recipe
    function createRecipe(elementsVal) {
        //get input fields only inside recipe
        var ingredients = $('#ingredientContainer').children().children('input[type=text], input[type=number]');
            
        var ingredientString = [];
        
        //Get array of ingredients
        for(var i = 0; i < ingredients.length - 1; i++) {
            ingredientString.push(ingredients[i].value + " " + ingredients[i + 1].value);
            i++;
        }

        //get step fields
        var steps = $('#stepsContainer').children().children('input[type=text]');

        //get step fields input to string
        var stepsString = [];
        for(var i = 0; i < steps.length; i++) {
            stepsString.push(steps[i].value);
        }

        var recipe = {
            name: elementsVal[0],
            prepTime: elementsVal[1],
            cookTime: elementsVal[2],
            serveSize: elementsVal[3],
            source: null,
            ingredients: ingredientString,
            preparations: stepsString
        }

        return recipe;
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

        if(checkValid(elements, elementsVal))
        {
            //get input fields then create recipe
            var recipe = createRecipe(elementsVal);

            //send recipe
            $.post('editRecipe', recipe, function(data, status) {
                if(data.recipe != null) {
                    $('.modal-title').text(data.recipe.name + " updated!");
                    $('.modal-body').children().text('You may now view your recipe! Redirecting in 3 seconds.');
                    $('#notifModal').modal('show');
                    setTimeout(function (){
                        window.location.href = '/recipes/' + data.idString;
                    }, 3000)
                }
                else
                {
                    $('.modal-title').text('Error!');
                    $('.modal-body').children().text('Recipe was not updated! Try again.');
                    $('#notifModal').modal('show');
                }
            })
        }
        else
        {
            $('#errorMessage').text('Fill up missing fields.');
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
});