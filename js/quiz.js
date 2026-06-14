let questions =
JSON.parse(
localStorage.getItem(
"quizQuestions"
)
) || [];

let answers =
JSON.parse(
localStorage.getItem(
"quizAnswers"
)
) || {};

let reviewFlags =
JSON.parse(
localStorage.getItem(
"quizReview"
)
) || {};

let currentQuestion = 0;

let totalTime =
parseInt(
localStorage.getItem(
"quizTime"
)
) || 1800;

let timerInterval;

/* ---------------------- */
/* INITIALIZE QUIZ */
/* ---------------------- */

if(questions.length === 0){

    alert(
    "No quiz loaded."
    );

    window.location.href =
    "index.html";

}

document.getElementById(
"totalQuestions"
).textContent =
questions.length;

createPalette();

loadQuestion();

startTimer();

/* ---------------------- */
/* TIMER */
/* ---------------------- */

function startTimer(){

    updateTimerDisplay();

    timerInterval =
    setInterval(()=>{

        totalTime--;

        updateTimerDisplay();

        if(totalTime <= 0){

            clearInterval(
            timerInterval
            );

            alert(
            "Time Over! Quiz Submitted."
            );

            submitQuiz();
        }

    },1000);

}

function updateTimerDisplay(){

    let hours =
    Math.floor(
    totalTime / 3600
    );

    let minutes =
    Math.floor(
    (totalTime % 3600) / 60
    );

    let seconds =
    totalTime % 60;

    document.getElementById(
    "timer"
    ).textContent =

    String(hours)
    .padStart(2,"0")

    + ":"

    +

    String(minutes)
    .padStart(2,"0")

    + ":"

    +

    String(seconds)
    .padStart(2,"0");

}

/* ---------------------- */
/* LOAD QUESTION */
/* ---------------------- */

function loadQuestion(){

    let q =
    questions[
    currentQuestion
    ];

    document.getElementById(
    "questionNumber"
    ).textContent =

    "Question "

    +

    (currentQuestion+1)

    +

    " of "

    +

    questions.length;

    document.getElementById(
    "questionText"
    ).textContent =

    q.question;

    let container =
    document.getElementById(
    "optionsContainer"
    );

    container.innerHTML = "";

    q.options.forEach(
    (option,index)=>{

        let div =
        document.createElement(
        "div"
        );

        div.className =
        "option";

        let checked =

        answers[
        currentQuestion
        ] == index

        ?

        "checked"

        :

        "";

        div.innerHTML =

        `<label>

        <input
        type="radio"
        name="answer"
        value="${index}"
        ${checked}
        >

        ${option}

        </label>`;

        container.appendChild(
        div
        );

    });

    updatePalette();

}

/* ---------------------- */
/* SAVE ANSWER */
/* ---------------------- */

function saveAnswer(){

    let selected =

    document.querySelector(
    'input[name="answer"]:checked'
    );

    if(selected){

        answers[
        currentQuestion
        ] =

        parseInt(
        selected.value
        );

    }

    localStorage.setItem(
    "quizAnswers",
    JSON.stringify(
    answers
    )
    );

}

/* ---------------------- */
/* PALETTE */
/* ---------------------- */

function createPalette(){

    let palette =
    document.getElementById(
    "paletteGrid"
    );

    palette.innerHTML = "";

    questions.forEach(
    (q,index)=>{

        let btn =
        document.createElement(
        "button"
        );

        btn.textContent =
        index + 1;

        btn.className =
        "palette-btn not-visited";

        btn.onclick =
        ()=>{

            saveAnswer();

            currentQuestion =
            index;

            loadQuestion();

        };

        palette.appendChild(
        btn
        );

    });

}

function updatePalette(){

    let buttons =

    document.querySelectorAll(
    ".palette-btn"
    );

    let answered = 0;
    let review = 0;

    buttons.forEach(
    (btn,index)=>{

        btn.className =
        "palette-btn";

        if(
        reviewFlags[index]
        ){

            btn.classList.add(
            "review"
            );

            review++;

        }

        else if(

        answers[index]
        !== undefined

        ){

            btn.classList.add(
            "answered"
            );

            answered++;

        }

        else{

            btn.classList.add(
            "not-answered"
            );

        }

        if(
        index === currentQuestion
        ){

            btn.classList.add(
            "current"
            );

        }

    });

    document.getElementById(
    "answeredCount"
    ).textContent =
    answered;

    document.getElementById(
    "reviewCount"
    ).textContent =
    review;

}

/* ---------------------- */
/* BUTTON EVENTS */
/* ---------------------- */

document.getElementById(
"saveNextBtn"
).addEventListener(
"click",
()=>{

    saveAnswer();

    if(
    currentQuestion <
    questions.length - 1
    ){

        currentQuestion++;

        loadQuestion();

    }

}
);

document.getElementById(
"prevBtn"
).addEventListener(
"click",
()=>{

    saveAnswer();

    if(
    currentQuestion > 0
    ){

        currentQuestion--;

        loadQuestion();

    }

}
);

document.getElementById(
"reviewBtn"
).addEventListener(
"click",
()=>{

    reviewFlags[
    currentQuestion
    ] = true;

    localStorage.setItem(
    "quizReview",
    JSON.stringify(
    reviewFlags
    )
    );

    updatePalette();

}
);

document.getElementById(
"clearBtn"
).addEventListener(
"click",
()=>{

    delete answers[
    currentQuestion
    ];

    localStorage.setItem(
    "quizAnswers",
    JSON.stringify(
    answers
    )
    );

    loadQuestion();

}
);

document.getElementById(
"submitBtn"
).addEventListener(
"click",
()=>{

    let confirmSubmit =
    confirm(

    "Submit Quiz?"

    +

    "\n\nYou can review answers before submission."

    );

    if(
    confirmSubmit
    ){

        submitQuiz();

    }

}
);

/* ---------------------- */
/* SUBMIT QUIZ */
/* ---------------------- */

function submitQuiz(){

    clearInterval(
    timerInterval
    );

    saveAnswer();

    let correct = 0;
    let wrong = 0;

    questions.forEach(
    (q,index)=>{

        if(
        answers[index]
        !== undefined
        ){

            if(

            answers[index]

            ===

            q.answer

            ){

                correct++;

            }
            else{

                wrong++;

            }

        }

    });

    let result = {

        total:
        questions.length,

        correct:
        correct,

        wrong:
        wrong,

        attempted:
        Object.keys(
        answers
        ).length,

        notAttempted:
        questions.length
        -
        Object.keys(
        answers
        ).length,

        score:
        (
        correct
        /
        questions.length
        *
        100
        ).toFixed(2)

    };

    localStorage.setItem(
    "quizResult",
    JSON.stringify(
    result
    )
    );

    window.location.href =
    "result.html";

}