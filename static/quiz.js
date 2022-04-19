var correct = true;

var drop_lists = {
    'High Protein' : [],
    'High Carbs' : [],
    'High Fat' : [],
    'Healthy' : [],
    'Unhealthy' : [],
}

const correct_dict = {
    "Chicken": 'High Protein',
    "Beef": 'High Protein',
    "Fish": 'High Protein',
    "Rice": 'High Carbs',
    "Oats": 'High Carbs',
    "Pork Belly": 'High Fat',

    "Air-fried chicken strips": 'Healthy' ,
    "Matcha Boba tea with 25% sweetness": 'Healthy' ,
    "Strawberry smoothies": 'Healthy' ,
    "Whole-grained protein bars": 'Healthy' ,

    "Triple deep-fried pork belly": 'Unhealthy',
    "French Fries": 'Unhealthy',
    "Donuts": 'Unhealthy',
}

function end_template(q_score){
    $('#quiz-section-title').remove();
    $('#quiz-header').remove();
    $('#reset-btn').remove();
    $('#check-btn').remove();
    $('#q-container').empty();
    $('#q-container').append($("<div class='end-quiz-rect'>  "+q_score+" / 7 </div>"))
    $('#q-container').append($("<div class='end-quiz-title'>"+"CONGRATULATIONS"+"</div>"))

    let s = "You have graduated from<br>" +
        'READING-FOOD-LABEL-&-MAKING-HEALTHY-CHOICES<br>' +
        'University with honors!'
    $('#q-container').append($("<div class='end-quiz-hint'>"+s+"</div>"))

     let retake_btn = $("<button class='retake-btn'>Retake</button>")
     $(retake_btn).appendTo($('#q-container'));
}

function drag_template(q_info){
    let choice_block = $("<div class='row choices' id='choices'>")
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
            let wrong_str = ""
            wrong_str += "<span class=wrong-answer>["+item+"] </span> "
            wrong_str += "&nbsp should be in &nbsp<span class='wrong-answer'> ["+correct_dict[item]+"]</span> <br>"
            let result_text = $("<div class='result-text' > "+wrong_str+"</div>")
            $("#choices").prepend(result_text)
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
            $.each(v, function(i, item){
                if (correct_dict[item] != k){
                        // wrong field
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
        let result_text = $("<div class='result-text'> <span class='correct-answer'> Excellent! </span> &nbsp Click next</div>")
        $("#choices").prepend(result_text)
    }
}

function choice_template(q_info){
    let container = $("<div class=row>")

    let image_block = $("<div class=col-md-5>")
    $(image_block).addClass('image-container')
    console.log(q_info['image'])
    let img = $("<img id='question-img' src='"+q_info['image']+"' alt='question image'>")
    $(img).appendTo(image_block)
    $(image_block).appendTo(container)

    let prompt_block = $("<div class=col-md-7 id='prompt-block'>")
    $(prompt_block).addClass('prompt-block')
    let question_block = $("<div class=question-block>"+q_info['question']+"</div>")
    $(question_block).appendTo(prompt_block);

    // hint block
    if("hints" in q_info) {
        let hint_block = $("<div class=hint-block>View Hint</div>")
        $(hint_block).appendTo(prompt_block);
    }
    // prompt answers
    let choice_block = $("<form id='choice-form' class=choice-block>")
    // let form = $("<form id='choice-form'>")
    let choices = q_info['answers']
    for (let i=0; i<choices.length; i++){
        let choice = choices[i]
        let small_div = $("<div class='radio-wrap'>")
        let new_input = $("<input class='radio-input' type='radio' name='q-choice' id='choice"+i+"' value='"+choice+"'>")
        let new_label = $("<label class='radio-label' id='choice-"+choice+"' htmlFor='choice"+i+"'>"+choice+"</label>")
        $(new_input).appendTo(small_div);
        $(new_label).appendTo(small_div);

        $(small_div).appendTo(choice_block);
    }
    // $(form).appendTo(choice_block);
    $(choice_block).appendTo(prompt_block);
    $(prompt_block).appendTo(container);
    $(container).appendTo($("#q-container"))

}

function check_choice(q_info, selected){
    let correct_choice = q_info['correct']
    let right_choice= document.getElementById('choice-'+correct_choice)
    $(right_choice).addClass('correct-answer')

    if (selected == correct_choice) {
        let result_text = $("<div class='result-text-mc'> <span class='correct-answer'> Excellent! </span> &nbsp Click next</div>")
        $("#prompt-block").append(result_text)
    }
    else{
        let result_text = $("<div class='result-text-mc wrong-answer'> "+"The correct answer is "+correct_choice+"</div>")
        $("#prompt-block").append(result_text)
        let wrong_choice = document.getElementById('choice-'+selected)
        $(wrong_choice).addClass('wrong-answer')
        correct = false
    }
}

$(document).ready(function(){
    let q_num = quiz['quiz_progress']
    let questions = quiz['quiz_questions']
    let q_info = questions[q_num-1]
    if (q_num<=7){
        if (q_info['question-type'] == 'drag-n-drop'){
            drag_template(q_info)
        }
        else{
            choice_template(q_info)
        }
    }
    else{
        let score = quiz['quiz_score']
        end_template(score)
    }


    $(".check-btn").click(function() {
        if (q_info['question-type'] == 'drag-n-drop'){
            check_drag(q_info)
            $(this).remove()
            let next_btn = $("<button class='next-btn'>Next Question</button>")
            $(next_btn).appendTo($('#q-container'));
        }
        else{
            let selected = $('input[name=q-choice]:checked', '#choice-form').val();
            check_choice(q_info,selected)
            $(this).remove()

            let next_btn = $("<button class='next-btn'>Next Question</button>")
            $(next_btn).appendTo($('#q-container'));

        }
    })

    $(document).on('click', ".hint-block", function(){
        let d = $("<div id='dialog'>"+q_info['hints']+"</div>")
        $(d).dialog();
    })
    $(document).on('click', ".retake-btn", function(){
        $.ajax({
            type: "POST",
            url: "/retake",
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            success: function(result){
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

    $(document).on('click',".next-btn", function(){

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

    $('#choice-form input').on('change', function() {
        let selected = $('input[name=q-choice]:checked', '#choice-form').val();
        console.log(selected)
        if (selected){
            let check_btn = document.getElementsByClassName('check-btn')
            $(check_btn).prop('disabled', false);
        }
    });
})