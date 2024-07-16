let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let mistakes = 0;
let timer;
let timeLeft = 3600; // 60 minutes for the quiz

// Retrieve selected year and type from local storage
const selectedYear = localStorage.getItem('selectedYear');
const selectedSubject = localStorage.getItem('selectedsubject');
const selectedMedium = localStorage.getItem('selectedmedium');

if (selectedYear && selectedSubject && selectedMedium) {
    loadQuestions(selectedSubject, selectedMedium, selectedYear);
} else {
    console.error('Year, subject, and medium not selected');
}

function loadQuestions(subject, medium, year) {
    const filePath = `${subject}_${medium}_${year}.json`; // Assuming your files are named like "subject_medium_year.json"
    fetch(filePath)
        .then(response => response.json())
        .then(data => {
            questions = data;
            console.log(questions); // Debugging: Check if questions are loaded correctly
            initializeQuestionNumbers();
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
            const div = document.createElement('div');
            div.className = 'answer';
            div.innerHTML = `
                <input type="radio" name="answer" value="${index}" id="answer${index}">
                <label for="answer${index}">${answer}</label>`;
            answersList.appendChild(div);
        });
        markAnsweredQuestions();
    } else {
        submitQuiz();
    }
}

function nextQuestion() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        const answerIndex = parseInt(selectedAnswer.value);
        questions[currentQuestionIndex].answered = true; // Mark as answered
        questions[currentQuestionIndex].correctAnswer = (answerIndex === questions[currentQuestionIndex].correct);
        if (questions[currentQuestionIndex].correctAnswer) {
            score++;
        } else {
            mistakes++;
        }
        currentQuestionIndex++;
        showQuestion();
    } else {
        alert('Please select an answer before proceeding.');
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

function updateTimer() {
    timeLeft--;
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    document.getElementById('time').innerText = `${hours}h : ${minutes}m : ${seconds}s`;
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
    timeLeft = 3600;
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('start-quiz').style.display = 'inline';
    document.getElementById('timer').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'none';
    initializeQuestionNumbers();
}

function initializeQuestionNumbers() {
    const questionNumbersContainer = document.getElementById('question-numbers');
    questionNumbersContainer.innerHTML = '';
    for (let i = 0; i < questions.length; i++) {
        const button = document.createElement('button');
        button.className = 'question-number bg-gray-200 text-gray-700 px-4 py-2 m-1 rounded hover:bg-gray-300';
        button.innerText = i + 1;
        button.addEventListener('click', () => {
            currentQuestionIndex = i;
            showQuestion();
        });
        questionNumbersContainer.appendChild(button);
    }
    markAnsweredQuestions();
}

function markAnsweredQuestions() {
    const questionNumbers = document.getElementsByClassName('question-number');
    for (let i = 0; i < questionNumbers.length; i++) {
        if (questions[i].answered) {
            questionNumbers[i].classList.add('answered');
            if (questions[i].correctAnswer === false) {
                questionNumbers[i].classList.add('locked');
            }
        } else {
            questionNumbers[i].classList.remove('answered');
        }
    }
}