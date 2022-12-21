
/*Alle HTML elementene som hentes ifra index*/

var quizBoks = document.getElementById('quiz');
var resultatBoks = document.getElementById('results');
var svarKnapp = document.getElementById('submit');
var diagramKnapp = document.getElementById('showDiagram')


/*Array med spørsmålene som brukes i oppgaven*/

var mineSporsmal = [
    {
        question: "Enrique er eldst i klassen",
        answers: {
            enig: '',
            uenig: ''
        }
    },
    {
        question: "Jon elsker gitaren?",
        answers: {
            enig: '',
            uenig: ''
        }
    },
    {
        question: "August er høyest",
        answers: {
            enig: '',
            uenig: ''
        }
    },
    {
        question: "Viu er css kriger?",
        answers: {
            enig: '',
            uenig: ''
        }
    },
];

/* Variabel med en tom array som kjører gjennom en for loop som legger på verdiene fra spørsmål arrayen */

var statistikk = []

for( var i = 0; i < mineSporsmal.length; i++){
statistikk.push(0)
}

/* Variabel med en tom array som kjører gjennom en for loop som legger på hver enkelt spørsmål i den tomme arrayen */

var sporsmalNavn = []

for( var i = 0; i < mineSporsmal.length; i++){
sporsmalNavn.push(mineSporsmal[i]["question"])
}


/* Hoved funkjsonen som kjører og lager quizen i javascript*/

function generateQuiz(questions, quizBoks, resultatBoks, svarKnapp){

    /* Funksjonen som lager selve spørsmålene og legger inn "radio" knappene som er svarene */

    function showQuestions(questions, quizBoks)
    {
        var output = [];
        var answers;

        /* For hver spørsmål i arrayen...*/

        for(var i=0; i < questions.length; i++){

            /* Først nullstill listen med svar */

            answers = [];

            /* Deretter legge til en html radio knapp */

            for(letter in questions[i].answers){
                answers.push(
                    '<label>'
                        + '<input type = "radio" name="question'+i+'" value="'+letter+'">'
                        + letter + ': '
                        + questions[i].answers[letter]
                    + '</label>'
                );
            }

            /* Deretter legge til spørsmålet og sine svar alternativer til outputen som skal lages */

            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }

        /* Til slutt kombinere den lagde outputen, med den eksisterende html div */

        quizBoks.innerHTML= output.join('');
    }

    /* Kaller funksjonen */

    showQuestions(questions, quizBoks);

    /* Denne funksjonen skal finne valgte svar, gjøre det som kodes om de svarer "enig", "uenig" og vise hvor mange de har svart av totale spørsmål */

    function showResults(questions, quizBoks, resultatBoks)
    {

        /* Hente inn svar boksene fra quizen */

        var answerContainers = quizBoks.querySelectorAll('.answers');

        /* Holde kontroll på brukerens svar */ 

        var userAnswer = '';
        var numCorrect = 0;

        /* For løkke som skal finne hver svar */

        for (var i = 0; i < questions.length; i++){

            /* Den skal finne hver svar som ble valgt, eller returnere et tomt object med en udefinert verdi, dette er slik at quizen ikke blir ødelagt om uvalgt svar */

            userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
    
            /* Vis svar er "enig", legge til svarte spørsmål, statistikk og bytt farge til grønn */

            if(userAnswer=== "enig"){
                numCorrect++;
                statistikk[i]++;
                answerContainers[i].style.color = 'lightgreen';
            }

            /* Ikke så blir fargen rød */

            else{
                answerContainers[i].style.color = 'red';
            }
        }

        /* Viser svarte spørsmål av alle spørsmål */

        resultatBoks.innerHTML = 'Du har svart ' + numCorrect + ' av ' + questions.length;
    }

    /* Knapp som skal kjøre viseresultater funksjonen */

    svarKnapp.onclick = function(){

        showResults(questions, quizBoks, resultatBoks);

    }  
}

/* Kaller hovedfunksjonen */

generateQuiz(mineSporsmal, quizBoks, resultatBoks, svarKnapp);

/* Når knappen trykkes skal funksjonen kjøres, som lager en diagram */

diagramKnapp.onclick = function(){

    /* Variabel på søyle farger */

    var barColors = ["red", "green","blue","orange"];
    
    /* Kode som lager chart av en chart funksjon i javascript, bruker variabelen sporsmalNavn som sin x-verdi og statistikk data som sin y-verdi */

    new Chart("myChart", {
      type: "bar",
      data: {
        labels: sporsmalNavn,
        datasets: [{
          backgroundColor: barColors,
          data: statistikk
        }]
      },
      options: {
        legend: {display: false},
        title: {
          display: true,
          text: "Spørsmal Svar"
        }
      }
    });
}
