// All possible quiz questions
const allQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
      { text: "Berlin", correct: false },
      { text: "Lisbon", correct: false }
    ]
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false }
    ]
  },
  {
    question: "Which language is used to style web pages?",
    answers: [
      { text: "HTML", correct: false },
      { text: "CSS", correct: true },
      { text: "Python", correct: false },
      { text: "Java", correct: false }
    ]
  },
  {
    question: "What does CPU stand for?",
    answers: [
      { text: "Central Processing Unit", correct: true },
      { text: "Computer Personal Unit", correct: false },
      { text: "Control Panel Unit", correct: false },
      { text: "Central Power Unit", correct: false }
    ]
  },
  {
    question: "What is 10 + 5?",
    answers: [
      { text: "15", correct: true },
      { text: "10", correct: false },
      { text: "5", correct: false },
      { text: "20", correct: false }
    ]
  }
];

// Shuffle function to randomize question order
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  shuffledQuestions = shuffle([...allQuestions]); // random order
  currentQuestionIndex = 0;
  score = 0;
  nextButton.textContent = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    if (answer.correct) button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  answerButtons.innerHTML = "";
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) score++;

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.style.backgroundColor = "green";
    } else {
      button.style.backgroundColor = "red";
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.textContent = `You scored ${score} out of ${shuffledQuestions.length}!`;
  nextButton.textContent = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < shuffledQuestions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < shuffledQuestions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
