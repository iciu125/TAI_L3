(function() {
    const myQuestions = [
        {
            question: "Wynik 10*1?",
            answers: {
                a: '3',
                b: '10',
                c: '115'
            },
            correctAnswer: 'b'
        },
        {
            question: "Wynik 10*2?",
            answers: {
                a: '3',
                b: '5',
                c: '20'
            },
            correctAnswer: 'c'
        },
        {
            question: "Wynik 10*3?",
            answers: {
                a: '3',
                b: '5',
                c: '30'
            },
            correctAnswer: 'c'
        },
        {
            question: "Wynik 10*4?",
            answers: {
                a: '3',
                b: '5',
                c: '40'
            },
            correctAnswer: 'c'
        },
        {
            question: "Wynik 10*5?",
            answers: {
                a: '3',
                b: '5',
                c: '50'
            },
            correctAnswer: 'c'
        },
        {
            question: "Wynik 10*6?",
            answers: {
                a: '3',
                b: '60',
                c: '10'
            },
            correctAnswer: 'b'
        },
        {
            question: "Wynik 10*7?",
            answers: {
                a: '70',
                b: '5',
                c: '10'
            },
            correctAnswer: 'a'
        },
        {
            question: "Wynik 10*8?",
            answers: {
                a: '3',
                b: '80',
                c: '10'
            },
            correctAnswer: 'b'
        },
        {
            question: "Wynik 10*9?",
            answers: {
                a: '3',
                b: '5',
                c: '90'
            },
            correctAnswer: 'c'
        },
        {
            question: "Wynik 10*10?",
            answers: {
                a: '100',
                b: '5',
                c: '10'
            },
            correctAnswer: 'a'
        }
    ];

    function buildQuiz() {
        // we'll need a place to store the HTML output
        const output = [];

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {
            // we'll want to store the list of answer choices
            const answers = [];

            // and for each available answer...
            for (letter in currentQuestion.answers) {
                // ...add an HTML radio button
                answers.push(
                    `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
                );
            }

            // add this question and its answers to the output
            output.push(
                `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
            );
        });

        // finally combine our output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join("");
    }

    function showResults() {
        // gather answer containers from our quiz
        const answerContainers = quizContainer.querySelectorAll(".answers");

        // keep track of user's answers
        let numCorrect = 0;

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {
            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // if answer is correct
            if (userAnswer === currentQuestion.correctAnswer) {
                // add to the number of correct answers
                numCorrect++;

                // color the answers green
                answerContainers[questionNumber].style.color = "lightgreen";
            } else {
                // if answer is wrong or blank
                // color the answers red
                answerContainers[questionNumber].style.color = "red";
            }
        });

        // show number of correct answers out of total
        resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;

        if (localStorage.getItem("scoresList") === null) {
            var scores = [numCorrect];
            localStorage.setItem("scoresList", JSON.stringify(scores));
        } else {
            var scoresString = localStorage.getItem("scoresList");
            var scores = JSON.parse(scoresString);
            document.getElementById("scores").innerHTML = "Twoje poprzednie wyniki: " + scores;
            scores.push(numCorrect);
            localStorage.setItem("scoresList", JSON.stringify (scores));
        }
    }

    function showSlide(n) {
        slides[currentSlide].classList.remove("active-slide");
        slides[n].classList.add("active-slide");
        currentSlide = n;

        if (currentSlide === 0) {
            previousButton.style.display = "none";
        } else {
            previousButton.style.display = "inline-block";
        }

        if (currentSlide === slides.length - 1) {
            nextButton.style.display = "none";
            submitButton.style.display = "inline-block";
        } else {
            nextButton.style.display = "inline-block";
            submitButton.style.display = "none";
        }
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }

    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    const submitButton = document.getElementById("submit");

    // display quiz right away
    buildQuiz();

    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    showSlide(0);

    // on submit, show results
    submitButton.addEventListener("click", showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);


})();

var width = 10;

function move() {
    var elem = document.getElementById("myBar");
    if (width < 100) {
        width+=10;
        elem.style.width = width + '%';
        elem.innerHTML = width * 1 + '%';
    }
}

function moveBack() {
    var elem = document.getElementById("myBar");
    if (width < 100) {
        width = width - 10;
        elem.style.width = width + '%';
        elem.innerHTML = width * 1 + '%';
    }
}

