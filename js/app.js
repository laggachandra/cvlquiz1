let allQuestions = [];

async function loadQuestions() {

    try {

        const response =
        await fetch("data/questions.json");

        allQuestions =
        await response.json();

        populateSubjects();
        populateChapters();

    }
    catch(error){

        console.error(
            "Error loading questions:",
            error
        );

        alert(
            "Unable to load questions.json"
        );
    }
}

function populateSubjects(){

    const subjectSelect =
    document.getElementById("subject");

    let subjects =
    [...new Set(
        allQuestions.map(
            q => q.subject
        )
    )];

    subjects.forEach(subject => {

        let option =
        document.createElement("option");

        option.value = subject;
        option.textContent = subject;

        subjectSelect.appendChild(option);

    });

}

function populateChapters(){

    const chapterSelect =
    document.getElementById("chapter");

    let chapters =
    [...new Set(
        allQuestions.map(
            q => q.chapter
        )
    )];

    chapters.forEach(chapter => {

        let option =
        document.createElement("option");

        option.value = chapter;
        option.textContent = chapter;

        chapterSelect.appendChild(option);

    });

}

function shuffleArray(array){

    for(
        let i=array.length-1;
        i>0;
        i--
    ){

        let j =
        Math.floor(
            Math.random()*(i+1)
        );

        [array[i],array[j]] =
        [array[j],array[i]];
    }

    return array;
}

function startQuiz(){

    let subject =
    document.getElementById(
        "subject"
    ).value;

    let chapter =
    document.getElementById(
        "chapter"
    ).value;

    let difficulty =
    document.getElementById(
        "difficulty"
    ).value;

    let count =
    parseInt(
        document.getElementById(
            "questionCount"
        ).value
    );

    let timeLimit =
    parseInt(
        document.getElementById(
            "timeLimit"
        ).value
    );

    let shuffle =
    document.getElementById(
        "shuffle"
    ).checked;

    let filtered =
    [...allQuestions];

    if(subject !== "All"){

        filtered =
        filtered.filter(
            q =>
            q.subject === subject
        );

    }

    if(chapter !== "All"){

        filtered =
        filtered.filter(
            q =>
            q.chapter === chapter
        );

    }

    if(difficulty !== "All"){

        filtered =
        filtered.filter(
            q =>
            q.difficulty === difficulty
        );

    }

    if(filtered.length === 0){

        alert(
            "No questions found."
        );

        return;
    }

    if(shuffle){

        filtered =
        shuffleArray(filtered);

    }

    filtered =
    filtered.slice(0,count);

    localStorage.setItem(
        "quizQuestions",
        JSON.stringify(filtered)
    );

    localStorage.setItem(
        "quizTime",
        timeLimit * 60
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
    "quiz.html";
}

document
.getElementById(
    "startQuizBtn"
)
.addEventListener(
    "click",
    startQuiz
);

loadQuestions();