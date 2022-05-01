from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import json
app = Flask(__name__)



# DATA
quiz_progress = 1
quiz_score = 0
quiz_questions = [
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
        'question-type': "multiple-choice",
        'prompt': "Select the best answer",
        'question': "Suppose that Jamie wants to consume 2500 calories today. " +
                    "Jamie has already consumed 49 grams of protein, " +
                    "214 grams of carbs, 40 grams of fats, and 6 cups of water. " +
                    "How many more calories does Jamie need to fulfill Jamie's 2500-cal-goal?",
        'answers': [1023, 1076, 696, 1088],
        'correct': 1088,
        # 'image': "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/newscms/2018_18/2084256/170725-better-cheat-day-hamburger-se-540p.jpg"
        'image': "https://i.ytimg.com/vi/GB1nq2R6OKM/maxresdefault.jpg",
        'hints': "1g protein = 1g carb = 4 cals, 1g fat = 9 cals"
    },
    {
        'question-type': "multiple-choice",
        'prompt': "Select the best answer",
        'question': "Given this food label, suppose that James ate 3.5 servings of this, "+
                    "what percentage of daily calories did James consumed "+
                    "if his daily recommended intake was 2000?",
        'answers': [0.365, 0.37, 0.34, 0.35],
        'correct': 0.35,
        'image': "https://images.squarespace-cdn.com/content/v1/5a61286cf6576e69273c7f7f/1518546346849-3IJ4FT7IQVKLIT494QRD/nutrition+label.png",
        'hints': "1g protein = 1g carb = 4 cals, 1g fat = 9 cals"
    },
    {
        'question-type':"multiple-choice",
        'prompt':"Select the best answer",
        'question':"Ricky has consumed 45 grams of unsaturated fats, "+
            "213 grams of sugars, " +
            "40 grams of fibers, 80 grams of " +
            "protein. How much calories has Ricky " +
            "consumed?",
        'answers': [1737, 1576, 1720, 1832],
        'correct':  1737,
        # 'image': "http://justfunfacts.com/wp-content/uploads/2021/03/junk-food.jpg"
        'image': "https://i.ytimg.com/vi/EPI5cuq3NPU/maxresdefault.jpg",
        'hints': "1g protein = 1g carb = 4 cals, 1g fat = 9 cals"

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
        'correct': 95,
        # 'image': "https://www.verywellfit.com/thmb/LOOS3DrPc3hC0ZaHMsd3GMfT-wI=/1500x1000/filters:fill(FFDB5D,1)/which-at-home-workout-options-are-right-for-you-5113667_static-4cfe40ec3ebe49a886353d25c4457886.png"
        'image': "https://static.onecms.io/wp-content/uploads/sites/35/2021/09/27/squat-GettyImages-1004449544-2000.jpg",
        'hints': "1g protein = 1g carb = 4 cals, 1g fat = 9 cals"
    },
    {
        'question-type':"multiple-choice",
        'prompt':"Select the best answer",
        'question': "Given this food label, what is the total\n" +
            "calories if Samantha ate two yogurts today as her dinner?",
        'answers':[70, 85, 170, 340],
        'correct': 340,
        'image':"https://sites.google.com/a/g.coppellisd.com/nutrition-p7-c-gonzalez/_/rsrc/1348173855890/food-label/Yoplait_Original_Strawberry_Lemonade.jpg",
    }
]


# ROUTES

@app.route('/')
def home():
   return render_template('home.html')


@app.route('/overview')
def overview():
    f = open('label_data.json')
    label_data = json.load(f)
    return render_template('overview.html', data=label_data)

@app.route('/quiz')
def quiz():
   return render_template('quiz.html', data={'quiz_progress':quiz_progress, 'quiz_score':quiz_score, 'quiz_questions':quiz_questions})



# AJAX FUNCTIONS
@app.route('/next_question', methods=['GET', 'POST'])
def next_question():
    global quiz_score
    global quiz_progress
    json_data = request.get_json()
    result = json_data["result"]

    if result:
        quiz_score += 1

    quiz_progress += 1
    return jsonify(data={'quiz_progress':quiz_progress, 'quiz_score':quiz_score})

@app.route('/retake', methods=['GET', 'POST'])
def retake():
    global quiz_score
    global quiz_progress

    quiz_score = 0
    quiz_progress = 1
    return jsonify(data={'quiz_progress':quiz_progress, 'quiz_score':quiz_score})


@app.route('/snacks/<snack_id>', methods=['GET', 'POST'])
def snack_info(snack_id):
    f = open('snack_data.json')
    prev_ind = int(snack_id) - 1
    if snack_id == 0:
        prev_ind = 0
    next_ind = int(snack_id) + 1
    if next_ind > 3:
        next_ind = 3
    snack_data = json.load(f)
    return render_template('snacks.html', data=snack_data[snack_id], prev_link="/"+str(prev_ind), next_link="/"+str(next_ind), cur_ind=int(snack_id))

if __name__ == '__main__':
    app.run(debug = True)




