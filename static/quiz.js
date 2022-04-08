const questions = [
    {
        'question-type':"drag-n-drop",
        'prompt':"Drag each item into their category",
        'categories': [
            'High Protein',
            'High Carbs',
            'High Fat',
        ],
        'choices':[
            "Chicken",
            "Rice",
            "Beef",
            "Pork Belly",
            "Oats",
            "Fish",
        ],
        'correct_answer':{
            'High Protein' : ["Chicken","Beef","Fish",],
            'High Carbs' : ["Rice", "Oats",],
            'High Fat' : ["Pork Belly",],
        }

    },
    {
        'question-type':"drag-n-drop",
        'prompt':"Drag each item into their category",
        'categories': [
            'Healthy',
            'Unhealthy',
        ],
        'choices':[
            "Triple deep-fried pork belly",
            "French Fries",
            "Air-fried chicken strips",
            "Donuts",
            "Whole-grained protein bars",
            "Strawberry smoothies",
            "Matcha Boba tea with 25% sweetness",
        ],
        'correct_answer': {
            'Healthy' : [
                "Air-fried chicken strips",
                "Matcha Boba tea with 25% sweetness",
                "Strawberry smoothies",
                "Whole-grained protein bars",
            ],
            'Unhealthy' : [
                "Triple deep-fried pork belly",
                "French Fries",
                "Donuts",
            ],
        }
    },
    {
        'question-type':"multiple-choice",
        'prompt':"Select the best answer",
        'question':"Ricky has consumed 45 grams of unsaturated fats,"+
            "213 grams of sugars, " +
            "40 grams of fibers, 80 grams of " +
            "protein. How much calories has Ricky " +
            "consumed?",
        'answers': [1737, 1576, 1720, 1832],
    },
    {
        'question-type':"multiple-choice",
        'prompt':"Select the best answer",
        'question':"Jane just finished her workout and " +
            "according to her fitbit, she has burnt 670 " +
            "calories! To celebrate this achievement, " +
            "she decides to order McDonald's. She " +
            "wants to order a customized burger " +
            "which has 60 grams of protein, 20 " +
            "grams of fat, and 40 grams of carbs. " +
            "After this meal, how many effective calories are" +
            " actually burnt from her workout?",
        'answers': [82, 95, 97, 100],
    },
    {
        'question-type':"multiple-choice",
        'prompt':"Select the best answer",
        'question': "Given this food label, what is the total\n" +
            "calories in 2.5 servings?",
        'answers':[1012.5, 1022.5, 409, 818]
    }
]
var correct = true;

var drop_lists = {
    'High Protein' : [],
    'High Carbs' : [],
    'High Fat' : [],
    'Healthy' : [],
    'Unhealthy' : [],
}

function drag_template(q_info){
    let choice_block = $("<div class='row choices'>")
    choices = q_info['choices']
    for (let i = 0; i < choices.length; i++) {
        let choice = choices[i];
        let c = $("<div class='drag-choice'>"+choice+"</div>")
        $(c).draggable({
            cursor: "move",
            revert: "invalid",
        });
        $(c).appendTo(choice_block);
    }
    $("#q-container").append(choice_block);
    let category_block = $("<div class='row categories'>")
    cates = q_info['categories']
    for (let i = 0; i < cates.length; i++) {
        let cate = cates[i]
        let sub_block = $("<div>")
        if (cates.length == 3){
            $(sub_block).addClass('col-md-4');
        }
        else{
            $(sub_block).addClass('col-md-6');
        }
        let title = $("<div class='row drop-box-title'>"+cate+"</div>")
        $(title).appendTo(sub_block)

        let c = $("<div class='row drop-box'>")
        $(c).attr('id', cate);
        $(c).droppable({
            accept: function(n){if (n.hasClass('drag-choice')){return true;}},
            classes: {
                "ui-droppable-active": "ui-state-active",
                "ui-droppable-hover": "ui-state-hover"
            },
            drop: function(event, ui){
                dropping(this, ui.draggable)
            }
        })
        $(c).appendTo(sub_block);
        $(sub_block).appendTo(category_block);
    }
    $("#q-container").append(category_block);
}

function dropping(drop_block, drag_block){
    // console.log($(drop_block).attr('id'), $(drag_block).text())
    let cate = $(drop_block).attr('id')
    let item =  $(drag_block).text()
    drop_lists[cate].push(item)
    // console.log(drop_lists);
    $(drag_block).draggable({disabled: true});
    $(drag_block).remove();
    let choices= document.getElementsByClassName('choices')
    if ($(choices).is(':empty')){
        let check_btn = document.getElementsByClassName('check-btn')
        $(check_btn).prop('disabled', false);
    }

    display_drop($(drop_block),[]);

}

function display_drop(drop_block, wrong_answer){
    let cate = $(drop_block).attr('id')
    $(drop_block).empty()
    let drop_list = drop_lists[cate]
    for (let i=0; i<drop_list.length; i++){
        let item = drop_list[i]

        let block = $("<div class='drop-fix'>"+item+"</div>")

        if ($.inArray(item, wrong_answer)>=0){
            console.log(item, "is wrong")
            $(block).addClass('wrong-answer')
            let result_text = $("<div class='result-text wrong-answer'> "+item+" is in the wrong category "+"</div>")
            $("#q-container").prepend(result_text)
        }
        $(block).attr('val',item)
        $(drop_block).append(block)
    }
}

function check_drag(q_info){
    let correct_answer = q_info['correct_answer']
    $.each(drop_lists, function(k,v){
        if (k in correct_answer){
            let wrong = []
            let a = correct_answer[k]
            $.each(v, function(i, item){
                if ($.inArray(item, a)<0){
                    // wrong field
                    console.log(item+" in the wrong field")
                    wrong.push(item)
                }
            })
            let drop_block = document.getElementById(k);
            display_drop(drop_block, wrong)
            if (wrong.length > 0){
                correct = false;
            }
        }


    })
    if (correct){
            let result_text = $("<div class='result-text'> Excellent! Click next</div>")
            $("#q-container").prepend(result_text)
    }
}

function choice_template(){

}

function check_choice(q_info){

}
$(document).ready(function(){
    let q_num = quiz['quiz_progress']
    let q_info = questions[q_num-1]
    if (q_info['question-type'] == 'drag-n-drop'){
        drag_template(q_info)
    }
    else{
        choice_template(q_info)
    }

    $(".check-btn").click(function() {
        if (q_info['question-type'] == 'drag-n-drop'){
            check_drag(q_info)
            $(this).remove()
            let next_btn = $("<button class='next-btn'>Next Question</button>")
            $(next_btn).appendTo($('#q-container'));

        }
        else{
            check_choice(q_info)
        }
    })

    $(document).on('click',".next-btn", function(){
        console.log("next clicked")
        console.log("correct?", correct)
        let data_to_save = {"result": correct}
        $.ajax({
            type: "POST",
            url: "/next_question",
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            data : JSON.stringify(data_to_save),
            success: function(result){
                let all_data = result["data"]
                data = all_data
                // q_num = data['quiz_progress']
                // q_score = data['quiz_score']
                setInterval('location.reload()', 500);
            },
            error: function(request, status, error){
                console.log("Error");
                console.log(request)
                console.log(status)
                console.log(error)
            }
        });
    });
     $(document).on('click',".reset-btn", function(){
         setInterval('location.reload()', 500);
     })

})