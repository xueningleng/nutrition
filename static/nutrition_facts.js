$(document).ready(function(){
    $('.map').maphilight();
    map_areas = ['#daily-value-rec', "#calories-rec", "#serving-info-rec", "#nutrients1-rec", "nutrients2-rec"]
    for (var i = 0; i < 5; i++) {
        $(map_areas[i]).mouseout(function(){
            $("#description-text").replaceWith( ('<div class = "description-text">  </div>') );
        })
        $(map_areas[i]).mouseover(function(){
            $("#description-text").html( ('<div class = "description-text">' + map_areas[i] + '</div>') );
        })
        consonle.log(map_areas[i])
    }
});