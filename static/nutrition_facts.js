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
        "descriptions": ["This section shows key nutrients that impact your health",
            "Use the label to support your personal dietary needs",
            "Nutrients to get less of: Saturated Fat, Sodium, and Added Sugars."]
    },
    "4": {
        "descriptions": ["Tells you the percentage of the Daily value for each nutrient in a serving of the food.",
            "They refer to the amounts of nutrients to consume or not to exceed daily Helps you determine if a serving of food is high or low in a nutrient.",
            "5% DV -> Low 20% DV -> High"]
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
        var s = '<div id="description-text">' + j["4"]["descriptions"] + '</div>'
        console.log(s)
        $("#description-text").html(s);
    })

    $('#calories-rec').mouseout(function(){
        $('#description-text').html( ('<div id="description-text"></div>') );
    })
    $('#calories-rec').mouseover(function(){
        var s = '<div id="description-text">' + j["2"]["descriptions"] + '</div>'
        $("#description-text").html(s);
    })

    $('#serving-info-rec').mouseout(function(){
        $('#description-text').html( ('<div id="description-text"></div>') );
    })
    $('#serving-info-rec').mouseover(function(){
        var s = '<div id="description-text">' +  j["1"]["descriptions"] + '</div>'
        $("#description-text").html(s);
    })
    
    $('#nutrients1-rec').mouseout(function(){
        $('#description-text').html( ('<div id="description-text"></div>') );
    })
    $('#nutrients1-rec').mouseover(function(){
        var s = '<div id="description-text">' +  j["3"]["descriptions"] + '</div>'
        $("#description-text").html(s);
    })

    $('#nutrients2-rec').mouseout(function(){
        $('#description-text').html( ('<div id="description-text"></div>') );
    })
    $('#nutrients2-rec').mouseover(function(){
        var s = '<div id="description-text">' +  j["3"]["descriptions"] + '</div>'
        $("#description-text").html(s);
    })
});