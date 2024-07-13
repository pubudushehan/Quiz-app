let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let mistakes = 0;
let timer;
let timeLeft = 60;

loadQuestions();

document.getElementById('start-quiz').addEventListener('click', startQuiz);

// Retrieve selected year and type from local storage
const selectedYear = localStorage.getItem('selectedYear');
const selectedsubject = localStorage.getItem('selectedsubject');
const selectedmedium = localStorage.getItem('selectedmedium');

if (selectedYear && selectedsubject && selectedmedium) {
    loadQuestions(selectedsubject, selectedmedium, selectedYear);
} else {
    console.error('Year and type not selected');
}

function loadQuestions(subject, medium, year) {
    const filePath = `${subject}_${medium}_${year}.json`; // Assuming your files are named like "pastpaper_2019.json"
    fetch(filePath)
        .then(response => response.json())
        .then(data => {
            questions = data;
            console.log(questions); // Debugging: Check if questions are loaded correctly
        })
        .catch(error => console.error('Error fetching questions:', error));
}

function startQuiz() {
    document.getElementById('start-quiz').style.display = 'none';
    document.getElementById('timer').style.display = 'block';
    document.getElementById('quiz-container').style.display = 'block';
    showQuestion();
    timer = setInterval(updateTimer, 1000); // Update timer every second
}

function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        document.getElementById('question-title').innerText = `Question ${currentQuestionIndex + 1}: ${question.title}`;
        const answersList = document.getElementById('answers-list');
        answersList.innerHTML = '';
        question.answers.forEach((answer, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<input type="radio" name="answer" value="${index}" id="answer${index}"> 
                            <label for="answer${index}">${answer}</label>`;
            answersList.appendChild(li);
        });
        document.getElementById('next-question').style.display = 'inline';
    } else {
        submitQuiz();
    }
}

function nextQuestion() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        const answerIndex = parseInt(selectedAnswer.value);
        if (answerIndex === questions[currentQuestionIndex].correct) {
            score++;
        } else {
            mistakes++;
        }
    }
    currentQuestionIndex++;
    showQuestion();
}

function updateTimer() {
    timeLeft--;
    document.getElementById('time').innerText = timeLeft;
    if (timeLeft <= 0) {
        submitQuiz();
    }
}

function submitQuiz() {
    clearInterval(timer);
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('timer').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    document.getElementById('score').innerText = `Score: ${score}/${questions.length}`;
    document.getElementById('mistakes').innerText = `Mistakes: ${mistakes}`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    mistakes = 0;
    timeLeft = 60;
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('start-quiz').style.display = 'inline';
    document.getElementById('timer').style.display = 'none';
}

document.getElementById('start-quiz').addEventListener('click', startQuiz);