const QUIZDATA = [
    {
        question: 'What do Quoc like to do the most?',
        a: 'Watching anime',
        b: 'Playing game',
        c: 'Work out',
        d: 'Reading book',
        correct: 'c'
    }, {
        question: 'Which anime does Quoc like the most?',
        a: 'Dragon ball',
        b: 'Mushoku tensei',
        c: 'Naruto',
        d: 'Black Clover',
        correct: 'c'
    }, {
        question: 'Who is Quoc`s best friend?',
        a: 'Học',
        b: 'Hưng',
        c: 'Tú',
        d: 'All',
        correct: 'd'
    }, {
        question: 'Which type of girl does Quoc like the most?',
        a: 'Smart, agility',
        b: 'Hard working',
        c: 'Obedient',
        d: 'Kittenish',
        correct: 'a'
    }, {
        question: 'What does Quoc not like to do?',
        a: 'Fishing',
        b: 'Swimming',
        c: 'Learning English',
        d: 'Playing soccer',
        correct: 'a'
    }
];

const QUESTIONEL = document.getElementById('question');
const A_TEXT = document.getElementById('a_text');
const B_TEXT = document.getElementById('b_text');
const C_TEXT = document.getElementById('c_text');
const D_TEXT = document.getElementById('d_text');
const SUBMIT_BTN = document.getElementById('submit');
const answerELs = document.querySelectorAll('.answer'); 
const quiz = document.getElementById('quiz'); 

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    deSelectAnswers();
    const CURRENTQUIZDATA = QUIZDATA[currentQuiz];

    QUESTIONEL.innerText = CURRENTQUIZDATA.question;
    A_TEXT.innerText = CURRENTQUIZDATA.a;
    B_TEXT.innerText = CURRENTQUIZDATA.b;
    C_TEXT.innerText = CURRENTQUIZDATA.c;
    D_TEXT.innerText = CURRENTQUIZDATA.d;  
}

function getSelected() {
    let answer = undefined;
    
    answerELs.forEach((answerEL) => {
        if(answerEL.checked) {
            answer = answerEL.id;
        }
    });
    return answer;
}

function deSelectAnswers() {
    answerELs.forEach((answerEL) => {
        answerEL.checked = false; 
    });
}

SUBMIT_BTN.addEventListener('click', () => { 

    const answer = getSelected();
    
    if(answer) {
        if(answer === QUIZDATA[currentQuiz].correct) {
            score++;
        }
        currentQuiz++;
        if(currentQuiz < QUIZDATA.length) {
            loadQuiz();
        }
        else {
            quiz.innerHTML = `<h2 style="color: #e74c3c;">You have score answer ${score}/${QUIZDATA.length}</h2>
            <button onclick="location.reload()">Reload</button>`
        }
    } 
});