$(document).ready(function() {
    //Add new field for ingredients
    $('body').on('click', 'button#addIngredient', function() {
        $('#addIngredient').parent().append(
            '<button class="col-lg-1 form-control btn btn-secondary remove">-</button>'
        );

        $('#addIngredient').remove();

        $('#ingredientContainer').append(
            '<div class="row mx-4 mt-1">' +
            '<input class="col-lg-1 form-control mr-2" type="number">' +
            '<input class="col-lg-9 form-control mr-5" type="text" placeholder="Ingredient">' +
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
            '<input class="col-lg-10 form-control mr-5 ml-2" type="text" placeholder="Step">' +
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

    $('#submit').click(function() {
        //get all fields
        const elements = $('input[type=text], input[type=number]');
        const elementsVal = elements.map(function() {
            return $(this).val();
        }).get();

        var valid = true;

        //check each field's input
        elements.each(function(index) {
            valid = checkField(this, elementsVal[index]) && valid;
        });

        if(valid)
        {
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

            $.post('/addRecipe', recipe, function(data, status) {
                if(data.recipe != null) {
                    $('.modal-title').text(data.recipe.name + " posted!");
                    $('.modal-body').children().text('You may now view your recipe!');
                    $('#notifModal').modal('show');
                    setTimeout(function (){
                        window.location.href = '/recipes/' + data.idString;
                    }, 3000)
                }
                else
                {
                    $('.modal-title').text('Error!');
                    $('.modal-body').children().text('Recipe was not posted! Try again.');
                    $('#notifModal').modal('show');
                }
            })
        }
        else
        {
            $('#errorMessage').text('Fill up missing fields.');
        }

    })
});