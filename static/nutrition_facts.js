$(document).ready(function(){
    $('.map').maphilight();
    var map_areas = ['#daily-value-rec', "#calories-rec", "#serving-info-rec", "#nutrients1-rec", "#nutrients2-rec"];
    $('#daily-value-rec').mouseout(function(){
        $('#description-text').html( ('<div id="description-text">  Hover over something to learn about it  </div>') );
    })
    $('#daily-value-rec').mouseover(function(){
        var s = '<div id="description-text">' + '#daily-value-rec' + '</div>'
        console.log(s)
        $("#description-text").html(s);
    })
    $('#calories-rec').mouseout(function(){
        $('#description-text').html( ('<div id="description-text">  Hover over something to learn about it  </div>') );
    })
    $('#calories-rec').mouseover(function(){
        var s = '<div id="description-text">' + '#calories-rec' + '</div>'
        $("#description-text").html(s);
    })
    $('#serving-info-rec').mouseout(function(){
        $('#description-text').html( ('<div id="description-text">  Hover over something to learn about it  </div>') );
    })
    $('#serving-info-rec').mouseover(function(){
        var s = '<div id="description-text">' + '#serving-info-rec' + '</div>'
        $("#description-text").html(s);
    })
    $('#nutrients1-rec').mouseout(function(){
        $('#description-text').html( ('<div id="description-text">  Hover over something to learn about it  </div>') );
    })
    $('#nutrients1-rec').mouseover(function(){
        var s = '<div id="description-text">' + '#nutrients1-rec' + '</div>'
        $("#description-text").html(s);
    })
    $('#nutrients2-rec').mouseout(function(){
        $('#description-text').html( ('<div id="description-text">  Hover over something to learn about it  </div>') );
    })
    $('#nutrients2-rec').mouseover(function(){
        var s = '<div id="description-text">' + '#nutrients2-rec' + '</div>'
        $("#description-text").html(s);
    })
});