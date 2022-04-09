from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)
# DATA
quiz_progress = 1
quiz_score = 0
# ROUTES

@app.route('/')
def home():
   return render_template('home.html')


@app.route('/overview')
def overview():
   return render_template('overview.html')

@app.route('/quiz')
def quiz():
   return render_template('quiz.html', data={'quiz_progress':quiz_progress, 'quiz_score':quiz_score})



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




if __name__ == '__main__':
    app.run(debug = True)




