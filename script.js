const questions = [
  {
    question: "Which of the following correctly declares a list in Python?",
    answers: [
      { text: "list = (1, 2, 3)", correct: false },
      { text: "list = [1, 2, 3]", correct: true },
      { text: "list = {1, 2, 3}", correct: false },
      { text: "list = 's1, 2, 3'", correct: false },
    ],
  },
  {
    question: "What is the result of 5 divided by 2 using floor division in Python?",
    answers: [
      { text: "2.5", correct: false },
      { text: "3", correct: false },
      { text: "2", correct: true },
      { text: "2.0", correct: false },
    ],
  },
  {
    question: "What is the output of the comparison 10 > 5 in Python?",
    answers: [
      { text: "0 is greater than 5", correct: false },
      { text: "5 is greater than 10", correct: false },
      { text: "5 is greater than 10", correct: true },
      { text: "True", correct: false },
    ],
  },
  {
    question: 'Which statement about Python functions is true?',
    answers: [
      { text: "Functions in Python cannot return multiple values.", correct: false },
      { text: "Python functions can accept a variable number of arguments.", correct: true },
      { text: "The return statement is mandatory in Python functions.", correct: false },
      { text: "Default arguments must always be placed before non-default arguments.", correct: false },
    ],
  },
  {
    question: "Which is the correct mode to open a file 'data.txt' in Python for writing?",
    answers: [
      { text: "'w+'(write and read)", correct: true },
      { text: "'r' (read)", correct: false },
      { text: "'a' (append)", correct: false },
      { text: "'x' (exclusive creation)", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;



function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}


function showQuestion() {
  resetstate();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetstate() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}


function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}


function showScore() {
  resetstate();
  questionElement.innerHTML = `You Scored ${score} Out Of ${questions.length} !`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function hadleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    hadleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
