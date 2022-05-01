var label_data = {
    "1": {
    "descriptions": ["<span class='text-bold'>Serving sizes are standardized in familiar units</span>, such as cups or pieces, followed by the metric amount, e.g., the number of grams (g)",
        "It is not a recommendation of how much you should eat or drink but an <span class='text-bold'>indicator of the amount that people typically eat or drink</span>"]
    },
    "2": {
        "descriptions": ["<span class='text-bold'>Calories</span> provide a measure of how much <span class='text-bold'>energy you get from a serving of this food</span>.",
            "<span class='text-bold'>Remember</span>: The number of servings you consume determines the number of calories you actually eat. <span class='text-bold'>Eating too many calories per day is linked to overweight and obesity</span>."]
    },
    "3": {
        "descriptions": ["<span class='text-bold'>Cholesterol: waxy, fat-like substance</span> found in all cells of the body. <span class='text-bold'>Higher in dietary cholesterol ~= higher in saturated fat</span>. Should keep this as low as possible",
            "<span class='text-bold'>Sodium: ~=Salt. Higher in sodium ~= Increased risk of developing high blood pressure</span>. It's an essential nutrient that the human body needs in relatively small amounts"]
    },
    "4": {
        "descriptions": ["Tells you the <span class='text-bold'>percentage of the Daily value for each nutrient</span> in a serving of the food.",
            "They refer to the <span class='text-bold'>amounts of nutrients to consume or not</span> to exceed daily Helps you determine if a serving of food is high or low in a nutrient.",
            "Helps you determine if a serving of food is <span class='text-bold'>high or low in a nutrient</span>.",
            "<span class='text-bold'>5% DV -> Low</span>",
            "<span class='text-bold'>20% DV -> High</span>"]
    },
    "5": {
        "descriptions": ["Fat: <span class='text-bold'>1 g fat = 9 cals</span>",""]
    }
}
$(document).ready(function(){
    $('.map').maphilight({
        fillColor: 'fff9c2',
        fillOpacity: 0.5,
        strokeColor: '5cb25d',
    });
    $('.map').css('background-color','yellow')
    
    let j = label_data
    var map_areas = ['#daily-value-rec', "#calories-rec", "#serving-info-rec", "#nutrients1-rec", "#nutrients2-rec"];
    $('#daily-value-rec').mouseout(function(){
        $('#description-text').html( ('<div id="description-text"></div>') );
    })
    $('#daily-value-rec').mouseover(function(){
        $.each(j["4"]["descriptions"], function() {
            $('#description-text').append($('<li>').html(this));
        });
        $(".text-bold").css("color", "black");
        // var s = '<div id="description-text">' + j["4"]["descriptions"] + '</div>'
        // console.log(s)
        // $("#description-text").html(s);
    })

    $('#calories-rec').mouseout(function(){
        $('#description-text').html( ('<div id="description-text"></div>') );
    })
    $('#calories-rec').mouseover(function(){
        $.each(j["2"]["descriptions"], function() {
            $('#description-text').append($('<li>').html(this));
        });
        $(".text-bold").css("color", "black");
        // var s = '<div id="description-text">' + j["2"]["descriptions"] + '</div>'
        // $("#description-text").html(s);
    })

    $('#serving-info-rec').mouseout(function(){
        $('#description-text').html( ('<div id="description-text"></div>') );
    })
    $('#serving-info-rec').mouseover(function(){
        $.each(j["1"]["descriptions"], function() {
            $('#description-text').append($('<li>').html(this));
        });
        $(".text-bold").css("color", "black");
        // var s = '<div id="description-text">' +  j["1"]["descriptions"] + '</div>'
        // $("#description-text").html(s);
    })
    
    $('#nutrients1-rec-fat').mouseout(function(){
        $('#description-text').html( ('<div id="description-text"></div>') );
    })
    $('#nutrients1-rec-fat').mouseover(function(){
        var fat = '<span class="text-bold">Fat<br>1 g fat = 9 cals</span> <ul type="disc"><li><span class="text-bold">Saturated Fat: Bad fat</span> <ul type="circle"> <li>Most saturated fats are animal fats</li> <li>Too much saturated fat ~= increase blood cholesterol levels and bad cholesterol levels.</li><li>higher saturated fat intake ~= increased heart disease risks</li> </ul></li><li><span class="text-bold">Saturated Fat: Bad fat</span> <ul type="circle"> <li>Byproduct of hydrogenation that is used to turn healthy oils into solids</li> <li>Most Found in fried foods and baked goods</li><li>Trans fats ~= increased risk of inflammation</li> </ul></li><li><span class="text-bold">Nutrients to get less of: both</span></li></ul> '
        var s = '<div id="description-text">' +  fat + '</div>'
        $("#description-text").html(s);
        $(".text-bold").css("color", "black");
    })

    $('#nutrients1-rec-carb').mouseout(function(){
        $('#description-text').html( ('<div id="description-text"></div>') );
    })
    $('#nutrients1-rec-carb').mouseover(function(){
        var carb = '<span class="text-bold">Carbs<br>1 g carb = 4 cals</span> <ul type="disc"><li><span class="text-bold">Total Sugars: natural sugars + added sugars</span><ul type="circle"> <li>Natural sugars: sugars in fruits</li> <li>Added Sugars: cane sugars</li></ul></li><li><span class="text-bold">Dietary Fiber: Indigestible part = healthy</span><ul type="circle"><li>Protect against heart disease</li><li>Better gut health</li></ul></li><li><span class="text-bold">Nutrients to get more of: Dietary Fiber</span></li><li><span class="text-bold">Nutrients to get less of: Added sugars</span></li></ul>  '
        var s = '<div id="description-text">' +  carb + '</div>'
        $("#description-text").html(s);
        $(".text-bold").css("color", "black");
    })

    $('#nutrients1-rec-protein').mouseout(function(){
        $('#description-text').html( ('<div id="description-text"></div>') );
    })
    $('#nutrients1-rec-protein').mouseover(function(){
        var carb = '<span class="text-bold">Protein<br>1 g protein = 4 cals</span> <ul type="disc"><li>Found in <span class="text-bold">beans peas, dairy products, meat, nuts seafood, whole grains and vegetables</span> etc</li><li>Necessary for <span class="text-bold">proper growth and development</span></li><li>Build and repairs body tissues</li><li>Important for many body processes</li><li>Nutrients to get more of: Protein</li></ul>'
        var s = '<div id="description-text">' +  carb + '</div>'
        $("#description-text").html(s);
        $(".text-bold").css("color", "black");
    })

    $('#nutrients1-rec-chol-sodium').mouseout(function(){
        $('#description-text').html( ('<div id="description-text"></div>') );
    })
    $('#nutrients1-rec-chol-sodium').mouseover(function(){
        $.each(j["3"]["descriptions"], function() {
            $('#description-text').append($('<li>').html(this));
        });
        $(".text-bold").css("color", "black");
        // var carb = 'Protein<br>1 g protein = 4 cals <ul type="disc"><li>Found in beans peas, dairy products, meat, nuts seafood, whole grains and vegetables etc</li><li>Necessary for proper growth and development</li><li>Build and repairs body tissues</li><li>Important for many body processes</li><li>Nutrients to get more of: Protein</li></ul>'
        // var s = '<div id="description-text">' +  carb + '</div>'
        // $("#description-text").html(s);
    })
    $('#nutrients1-vit-min').mouseout(function(){
        $('#description-text').html( ('<div id="description-text"></div>') );
    })
    $('#nutrients1-vit-min').mouseover(function(){
        var vit_min = '<span class="text-bold">Vitamins and minerals</span><br><ul><li>Diets rich in vitamins and minerals <span class="text-bold">promote growth, development, and normal body functioning</span></li><li><span class="text-bold">Reduce the risk of developing osteoporosis</span>, anemia, and high blood pressure, respectively</li></ul'
        var s = '<div id="description-text">' +  vit_min + '</div>'
        $("#description-text").html(s);
        $(".text-bold").css("color", "black");
    })

    $('#nutrients2-rec').mouseout(function(){
        $('#description-text').html( ('<div id="description-text"></div>') );
    })
    $('#nutrients2-rec').mouseover(function(){
        var nutrient_breakdown = '<span class="text-bold">Nutrients breakdowns</span><br><ul><li>Now, lets focus on understanding the significance of these numbers and <span class="text-bold">how each macro contribute to the total calories!</span></li></ul>'
        var s = '<div id="description-text">' + nutrient_breakdown + '</div>'
        $("#description-text").html(s);
        $(".text-bold").css("font-weight", "100");
        // $(".text-bold").css("font-style", "italic");
        $(".text-bold").css("color", "black");
    })
});