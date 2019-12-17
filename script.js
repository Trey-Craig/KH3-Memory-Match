//Card data
const cards_array = [
    {
    name: 'Sora',
    img: 'img/Sora.png'
    },
    { name: 'Riku',
      img:  'img/Riku.png',
    },
    {
      name: 'Kairi',
      img:  'img/Kairi.png',
    },
    {
      name: 'Roxas',
      img:  'img/Roxas.png',
    },
    {
      name: 'Lea',
      img:  'img/Lea.png',
    },
    {
      name: 'Xion',
      img:  'img/Xion.png',
    },
    {
      name: 'Terra',
      img:  'img/Terra.png',
    },
    {
      name: 'Aqua',
      img:  'img/Aqua.png',
    },
    {
      name: 'Ventus',
      img:  'img/Ventus.png',
    },
    {
      name: 'Xehanort',
      img:  'img/Xehanort.png',
    },
    {
      name: 'Xemnas',
      img:  'img/Xemnas.png',
    },
    {
      name: 'Ansem',
      img:  'img/Ansem.png',
    },
];
//Duplicate and shuffle the cards
const gameGrid = cards_array
.concat(cards_array)
.sort(() => 0.5 - Math.random());

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;

//Grab the div with an id of root
const game = document.getElementById('game');

//Create a section with a class of grid
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');

//Append the grid section to the game div
game.appendChild(grid);

//For each item in the gameGrid array...
gameGrid.forEach(item => {
    //Create a div
    const card = document.createElement('div');

    //Apply a card class to that div
    card.classList.add('card');

    //Set the data-name attribute of the div to the cards_array name
    card.dataset.name = item.name;

    const front = document.createElement('div');
    front.classList.add('front')

    const back = document.createElement('div');
    back.classList.add('back');

    back.style.backgroundImage = `url(${item.img})`;
    //Apply the background image of the div to the cards_array name
    

    //Append the div to the grid section
    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
});

//Add event listener to grid
grid.addEventListener('click', function(event){
    const clicked = event.target;

    if(clicked.nodeName === 'SECTION' || 
        clicked === previousTarget || 
        clicked.parentNode.classList.contains('selected') ||
        clicked.parentNode.classList.contains('match')) {
        return;
    }
    if(count < 2){
        count++;
        if (count === 1) {
            //Assign first guess
            firstGuess = clicked.parentNode.dataset.name;
            console.log(firstGuess);
            clicked.parentNode.classList.add('selected')
        } else {
            //Assign second guess
            secondGuess = clicked.parentNode.dataset.name;
            console.log(secondGuess)
            clicked.parentNode.classList.add('selected');
        }
        //If both guesses are not empty...
        if(firstGuess && secondGuess){
            //and the first guess matches the second match...
            if (firstGuess === secondGuess) {
                //run the match function
                setTimeout(match, delay);
        }
        setTimeout(resetGuesses, delay);
      }
        previousTarget = clicked;
    }
});

//Add match CSS
const match = () => {
    var selected = document.querySelectorAll('.selected')
    selected.forEach(card => {
        card.classList.add('match');
    })
};
//function to reset guesses and undo selected cards
const resetGuesses = () => {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    var selected = document.querySelectorAll('.selected')
    selected.forEach(card => {
        card.classList.remove('selected')
    })
}

display = document.querySelector('#time');
var interval = null;

//TIMER CODE
function startTimer(duration, display) {
  var timer = duration, minutes, seconds;
  console.log(timer)
  interval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    
    display.textContent = minutes + ":" + seconds;
    
    timer -= 1;
  }, 1000);
}

const time_start = document.getElementById('timer_button');
time_start.onclick = function () {
  
    var fourMinutes = 60 * 4,//<-----  change # of min here
      display = document.querySelector('#time');
    startTimer(fourMinutes, display);
  
};
//END TIMER CODE

//RESET TIMER CODE
const time_stop = document.getElementById('stop_timer');
time_stop.onclick = function() {
    display = document.querySelector('#time');
    clearInterval(interval);
    
};

time_stop.ondblclick = function() {
  display.textContent = "04:00";
}
//AUDIO CODE
const play = document.getElementById('play_button');
const stop = document.getElementById('stop_button');

var music = new Audio('Scala_Ad_Caelum.mp3');

function playAudio(){
  music.play();
  music.loop = true;
  music.muted = false;
}

function stopAudio(){
  music.pause();
}
