let result =
JSON.parse(
localStorage.getItem(
"quizResult"
)
) || {};

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

loadResult();

function loadResult(){

    document.getElementById(
    "totalQ"
    ).textContent =
    result.total || 0;

    document.getElementById(
    "attemptedQ"
    ).textContent =
    result.attempted || 0;

    document.getElementById(
    "notAttemptedQ"
    ).textContent =
    result.notAttempted || 0;

    document.getElementById(
    "correctQ"
    ).textContent =
    result.correct || 0;

    document.getElementById(
    "wrongQ"
    ).textContent =
    result.wrong || 0;

    document.getElementById(
    "scoreQ"
    ).textContent =
    result.score || 0;

    loadReview();
}

function loadReview(){

    let container =
    document.getElementById(
    "reviewContainer"
    );

    container.innerHTML = "";

    questions.forEach(
    (q,index)=>{

        let userAnswer =
        answers[index];

        let isCorrect =

        userAnswer === q.answer;

        let div =
        document.createElement(
        "div"
        );

        div.className =
        "explanation";

        div.innerHTML =

        `
        <h4>
        Question ${index+1}
        </h4>

        <p>
        ${q.question}
        </p>

        <br>

        <p>
        Your Answer:
        ${
        userAnswer !== undefined
        ?
        q.options[userAnswer]
        :
        "Not Attempted"
        }
        </p>

        <p>
        Correct Answer:
        ${q.options[q.answer]}
        </p>

        <p class="${
        isCorrect
        ?
        'correct'
        :
        'wrong'
        }">

        ${
        isCorrect
        ?
        'Correct'
        :
        'Wrong'
        }

        </p>

        <br>

        <p>
        <strong>
        Explanation:
        </strong>
        </p>

        <p>
        ${
        q.explanation ||
        "No explanation available."
        }
        </p>

        <hr>
        `;

        container.appendChild(
        div
        );

    });

}

document.getElementById(
"restartBtn"
).addEventListener(
"click",
()=>{

    localStorage.removeItem(
    "quizQuestions"
    );

    localStorage.removeItem(
    "quizAnswers"
    );

    localStorage.removeItem(
    "quizReview"
    );

    localStorage.removeItem(
    "quizResult"
    );

    window.location.href =
    "index.html";

});