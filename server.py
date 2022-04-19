from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import json
app = Flask(__name__)

# Snacks
imgs_and_labels = {
    "vegetable_based": {
        "mini_carrots": {
            "image": "https://static.onecms.io/wp-content/uploads/sites/19/2017/04/04/GettyImages-121088095-2000.jpg",
            "label": "https://www.crystalvalleyfoods.com/wp-content/uploads/2017/05/Baby-Carrots-Nutrition-Label.png"
        },
        "crunch_dried_veggies": {
            "image": "https://nuts.com/images/rackcdn/ed910ae2d60f0d25bcb8-80550f96b5feb12604f4f720bfefb46d.ssl.cf1.rackcdn.com/382df9245a0a225b-dpcS2YMa-large.jpg",
            "label": "https://m.media-amazon.com/images/I/71mDjaYJDJL._SL1500_.jpg"
        },
    },
    "fruit_based": {
        "fruits": {
            "image": "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/assortment-of-colorful-ripe-tropical-fruits-top-royalty-free-image-995518546-1564092355.jpg",
            "label": "https://usapears.org/wp-content/uploads/2020/09/Nutrition-Facts-2020-340x533-1.png"
        },

        "fruit_bites": {
            "image": "https://cdn.shopify.com/s/files/1/0048/8544/6759/files/Home_VeggieFruitBites-Hero_1800x.jpg?v=1642701183",
            "label": "https://cdn.shopify.com/s/files/1/0048/8544/6759/products/CherrySweetPotato_Nutrition_1400x.jpg?v=1642735223"
        },
        "fruit_chips": {
            "image": "https://i5.walmartimages.com/asr/40173714-0d5c-4db4-9b03-2e02d0d0a500_2.e6a71418e7460e49afffccf196428098.jpeg",
            "label": "https://images-na.ssl-images-amazon.com/images/I/51R2aIQfJ4L.jpg"
        }
    },
    "high_fiber": {
        "oats_with_protein_powder": {
            "image": "https://skinnyfitalicious.com/wp-content/uploads/2017/12/protein-oatmeal-img3.jpg",
            "label": "https://cdn.shopify.com/s/files/1/0052/6657/1334/files/Banana.png?v=1602691258"
        },
        "nuts": {
            "image": "https://www.verywellhealth.com/thmb/45PJfywZmkzbmoi3CpiA8aPlRS4=/2560x1920/smart/filters:no_upscale()/the-tree-nut-allergy-diet-guide-1324280-selects-25c863756406496d8796feacd58461c7.jpg",
            "label": "https://najlas.com/wp-content/uploads/2018/11/Gone-Nuts-4-oz-Nutrition-Label.jpg"
        },
        "oats_bar": {
            "image": "https://marisamoore.com/wp-content/uploads/2020/04/GF-Vegan-Oat-Bars-Recipe-1.jpg",
            "label": "https://chocolatecoveredkatie.com/wp-content/uploads/2016/02/image-1.png"
        },
        "protein_bar": {
            "image": "https://m.media-amazon.com/images/I/71A7mTrAaRS._SL1500_.jpg",
            "label": "https://proteinpowder.com/wp-content/uploads/2019/02/PureBarChocPeaButt.png"
        }
    }
}


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

@app.route('/snacks', methods=['GET', 'POST'])
def snack():
    return render_template('snacks.html')

@app.route('/snacks/<snack_type>', methods=['GET', 'POST'])
def snack_info(snack_type):
    f = open('snack_data.json')
    snack_data = json.load(f)
    return render_template('snack_details.html', data=snack_data[snack_type])

if __name__ == '__main__':
    app.run(debug = True)




