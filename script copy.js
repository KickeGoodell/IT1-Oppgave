var quizBoks = document.getElementById('quiz');
var resultatBoks = document.getElementById('results');
var svarKnapp = document.getElementById('submit');
var diagramKnapp = document.getElementById('showDiagram')

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


var statistikk = []

for( var i = 0; i < mineSporsmal.length; i++){
statistikk.push(0)
}

var sporsmalNavn = []

for( var i = 0; i < mineSporsmal.length; i++){
sporsmalNavn.push(mineSporsmal[i]["question"])
}


function generateQuiz(questions, quizBoks, resultatBoks, svarKnapp){


    function showQuestions(questions, quizBoks)
    {
        var output = [];
        var answers;
        for(var i=0; i < questions.length; i++){
            answers = [];
            for(letter in questions[i].answers){
                answers.push(
                    '<label>'
                        + '<input type = "radio" name="question'+i+'" value="'+letter+'">'
                        + letter + ': '
                        + questions[i].answers[letter]
                    + '</label>'
                );
            }
            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }
        quizBoks.innerHTML= output.join('');
    }

    showQuestions(questions, quizBoks);

    function showResults(questions, quizBoks, resultatBoks)
    {
        var answerContainers = quizBoks.querySelectorAll('.answers');
        var userAnswer = '';
        var numCorrect = 0;

        for (var i = 0; i < questions.length; i++){

            userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
    
            if(userAnswer=== "enig"){
                numCorrect++;
                statistikk[i]++;
                answerContainers[i].style.color = 'lightgreen';
            }

            else{
                answerContainers[i].style.color = 'red';
            }
        }

        resultatBoks.innerHTML = 'Du har svart ' + numCorrect + ' av ' + questions.length;
    
        console.log(statistikk)
    }

    svarKnapp.onclick = function(){

        showResults(questions, quizBoks, resultatBoks);

    }  
}

generateQuiz(mineSporsmal, quizBoks, resultatBoks, svarKnapp);

diagramKnapp.onclick = function(){
    var barColors = ["red", "green","blue","orange"];
    
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
