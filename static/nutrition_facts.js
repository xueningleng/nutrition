var label_data = {
    "1": {
    "descriptions": ["Serving sizes are standardized in familiar units, such as cups or pieces, followed by the metric amount, e.g., the number of grams (g)",
        "It is not a recommendation of how much you should eat or drink but an indicator of the amount that people typically eat or drink"]
    },
    "2": {
        "descriptions": ["Calories provide a measure of how much energy you get from a serving of this food.",
            "Remember: The number of servings you consume determines the number of calories you actually eat. Eating too many calories per day is linked to overweight and obesity."]
    },
    "3": {
        "descriptions": ["Cholesterol: waxy, fat-like substance found in all cells of the body. Higher in dietary cholesterol ~= higher in saturated fat. Should keep this as low as possible",
            "Sodium: ~=Salt. Higher in sodium ~= Increased risk of developing high blood pressure. It's an essential nutrient that the human body needs in relatively small amounts"]
    },
    "4": {
        "descriptions": ["Tells you the percentage of the Daily value for each nutrient in a serving of the food.",
            "They refer to the amounts of nutrients to consume or not to exceed daily Helps you determine if a serving of food is high or low in a nutrient.",
            "Helps you determine if a serving of food is high or low in a nutrient.",
            "5% DV -> Low",
            "20% DV -> High"]
    },
    "5": {
        "descriptions": ["Fat: 1 g fat = 9 cals",""]
    }
}
$(document).ready(function(){
    $('.map').maphilight();
    let j = label_data
    var map_areas = ['#daily-value-rec', "#calories-rec", "#serving-info-rec", "#nutrients1-rec", "#nutrients2-rec"];
    $('#daily-value-rec').mouseout(function(){
        $('#description-text').html( ('<div id="description-text"></div>') );
    })
    $('#daily-value-rec').mouseover(function(){
        $.each(j["4"]["descriptions"], function() {
            $('#description-text').append($('<li>').text(this));
        });
        // var s = '<div id="description-text">' + j["4"]["descriptions"] + '</div>'
        // console.log(s)
        // $("#description-text").html(s);
    })

    $('#calories-rec').mouseout(function(){
        $('#description-text').html( ('<div id="description-text"></div>') );
    })
    $('#calories-rec').mouseover(function(){
        $.each(j["2"]["descriptions"], function() {
            $('#description-text').append($('<li>').text(this));
        });
        // var s = '<div id="description-text">' + j["2"]["descriptions"] + '</div>'
        // $("#description-text").html(s);
    })

    $('#serving-info-rec').mouseout(function(){
        $('#description-text').html( ('<div id="description-text"></div>') );
    })
    $('#serving-info-rec').mouseover(function(){
        $.each(j["1"]["descriptions"], function() {
            $('#description-text').append($('<li>').text(this));
        });
        // var s = '<div id="description-text">' +  j["1"]["descriptions"] + '</div>'
        // $("#description-text").html(s);
    })
    
    $('#nutrients1-rec-fat').mouseout(function(){
        $('#description-text').html( ('<div id="description-text"></div>') );
    })
    $('#nutrients1-rec-fat').mouseover(function(){
        var fat = 'Fat<br>1 g fat = 9 cals <ul type="disc"><li>Saturated Fat: Bad fat <ul type="circle"> <li>Most saturated fats are animal fats</li> <li>Too much saturated fat ~= increase blood cholesterol levels and bad cholesterol levels.</li><li>higher saturated fat intake ~= increased heart disease risks</li> </ul></li><li>Saturated Fat: Bad fat <ul type="circle"> <li>Byproduct of hydrogenation that is used to turn healthy oils into solids</li> <li>Most Found in fried foods and baked goods</li><li>Trans fats ~= increased risk of inflammation</li> </ul></li><li>Nutrients to get less of: both</li></ul>  '
        var s = '<div id="description-text">' +  fat + '</div>'
        $("#description-text").html(s);
    })

    $('#nutrients1-rec-carb').mouseout(function(){
        $('#description-text').html( ('<div id="description-text"></div>') );
    })
    $('#nutrients1-rec-carb').mouseover(function(){
        var carb = 'Carbs<br>1 g carb = 4 cals <ul type="disc"><li>Total Sugars: natural sugars + added sugars<ul type="circle"> <li>Natural sugars: sugars in fruits</li> <li>Added Sugars: cane sugars</li></ul></li><li>Dietary Fiber: Indigestible part = healthy<ul type="circle"><li>Protect against heart disease</li><li>Better gut health</li></ul></li><li>Nutrients to get more of: Dietary Fiber</li><li>Nutrients to get less of: Added sugars</li></ul>  '
        var s = '<div id="description-text">' +  carb + '</div>'
        $("#description-text").html(s);
    })

    $('#nutrients1-rec-protein').mouseout(function(){
        $('#description-text').html( ('<div id="description-text"></div>') );
    })
    $('#nutrients1-rec-protein').mouseover(function(){
        var carb = 'Protein<br>1 g protein = 4 cals <ul type="disc"><li>Found in beans peas, dairy products, meat, nuts seafood, whole grains and vegetables etc</li><li>Necessary for proper growth and development</li><li>Build and repairs body tissues</li><li>Important for many body processes</li><li>Nutrients to get more of: Protein</li></ul>'
        var s = '<div id="description-text">' +  carb + '</div>'
        $("#description-text").html(s);
    })

    $('#nutrients1-rec-chol-sodium').mouseout(function(){
        $('#description-text').html( ('<div id="description-text"></div>') );
    })
    $('#nutrients1-rec-chol-sodium').mouseover(function(){
        $.each(j["3"]["descriptions"], function() {
            $('#description-text').append($('<li>').text(this));
        });
        // var carb = 'Protein<br>1 g protein = 4 cals <ul type="disc"><li>Found in beans peas, dairy products, meat, nuts seafood, whole grains and vegetables etc</li><li>Necessary for proper growth and development</li><li>Build and repairs body tissues</li><li>Important for many body processes</li><li>Nutrients to get more of: Protein</li></ul>'
        // var s = '<div id="description-text">' +  carb + '</div>'
        // $("#description-text").html(s);
    })
    $('#nutrients1-vit-min').mouseout(function(){
        $('#description-text').html( ('<div id="description-text"></div>') );
    })
    $('#nutrients1-vit-min').mouseover(function(){
        var vit_min = 'Vitamins and minerals<br><ul><li>Diets rich in vitamins and minerals promote growth, development, and normal body functioning</li><li>Reduce the risk of developing osteoporosis, anemia, and high blood pressure, respectively</li></ul'
        var s = '<div id="description-text">' +  vit_min + '</div>'
        $("#description-text").html(s);
    })

    $('#nutrients2-rec').mouseout(function(){
        $('#description-text').html( ('<div id="description-text"></div>') );
    })
    $('#nutrients2-rec').mouseover(function(){
        var nutrient_breakdown = 'Nutrients breakdowns<br><ul><li>Now, lets focus on understanding the significance of these numbers and how each macro contribute to the total calories!</li></ul>'
        var s = '<div id="description-text">' + nutrient_breakdown + '</div>'
        $("#description-text").html(s);
    })
});