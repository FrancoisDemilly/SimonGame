
//js files
window.onload = function(){

var green, red, blue, yellow;
var color = ['green', 'red', 'blue', 'yellow'];
var sequenceComp = [];
var sequencePlayer = [];
var display = document.getElementById('display');
var strictMode = false;
var toggleSwitch = 'off';



//////////////////////////////

//function to display the length of the computer sequence
function displayLength(){
  display.innerHTML = sequenceComp.length;
}

var toggle = document.querySelector('.toggle');
toggle.addEventListener('click', function(){
  if(toggleSwitch === 'off'){
    toggleSwitch = 'on';
    console.log("toggleSwitch = 'on'")
  }else{
    toggleSwitch = 'off';
    console.log("toggleSwitch = 'off'")
  }
  disableColorButton();
});

//reset the game
var reset = document.querySelector('#reset');
reset.addEventListener('click', function(){
  //checking if the game is on
  if(toggleSwitch === 'on'){
    display.innerHTML = " - - ";
    sequenceComp = [];
    computerPick();
    highlightSequenceComp();
    console.log('reset has been pressed');
    //display the length of the sequence to reperform
    displayLength();
  }
});

//enable strict mode

var strict = document.querySelector('#strict');
strict.addEventListener('click', function(){
  // make a little red dot appear ==> to do
  if (strictMode === false){
    strictMode = true;
  } else {
    strictMode = false;
  }
  console.log("from addvent strictMode", strictMode);
});

// starting the game

var start = document.querySelector('#start');
start.addEventListener('click', function(){
  console.log('start');
  //checking if the game is on
  if(toggleSwitch === 'on'){
    computerPick();
    highlightSequenceComp();

    //display the length of the sequence to reperform
    displayLength();
  }
});


//computer randomly pick a color
function computerPick(){
  //since the computer is very fast to pick up color
  //we consider the risk of the player clicking on color button during this time
  //is null, consequently we do not deactivate button ad it creates error with strict mode
  var picked = color[Math.floor(Math.random() * color.length)];
  sequenceComp.push(picked);
  console.log("sequenceComp", sequenceComp);
}


//collecting the seqence of color from the player
 green = document.getElementById('green');
 red = document.getElementById('red');
 blue = document.getElementById('blue');
 yellow = document.getElementById('yellow');


 green.addEventListener('click', addToSequencePlayerThenCompare);
 red.addEventListener('click', addToSequencePlayerThenCompare);
 blue.addEventListener('click', addToSequencePlayerThenCompare);
 yellow.addEventListener('click', addToSequencePlayerThenCompare);

 function disableColorButton(){
    green.disabled = true;
    red.disabled = true;
    blue.disabled = true;
    yellow.disabled = true;
 }

 function enableColorButton(){
    green.disabled = false;
    red.disabled = false;
    blue.disabled = false;
    yellow.disabled = false;
 }


function addToSequencePlayerThenCompare (){
  sequencePlayer.push(this.dataset.color);
  console.log('sequencePlayer', sequencePlayer);
  compare();
}

//reworking the compare function
function compare(){
  console.log("from compare disableColorButton()")
  disableColorButton();
if (sequenceComp.length > sequencePlayer.length){
  if(sequencePlayer.every(function(element, index){
        return element === sequenceComp[index];
    })){
    //the player is imputing the color in the right order
    //true do nothing let it check until false or lenght are equal
    //return true
    enableColorButton();
  }else{
    //console.log("seqC > SeqP and 1 false")
    //if false
      if(strictMode === false){
          // reset sequencePlayer to empty as plater picked the wrong color
          sequencePlayer = [];
          //send an error bip and replay the sequence
          setTimeout(function delayedResponse(){
            highlightSequenceComp();
          }, 2000);
      }else if(strictMode === true){
          //console.log("strictMode", strictMode);
          var tempLength = sequenceComp.length;
          sequenceComp = [];
          sequencePlayer =[];
          for (var j=0; j<tempLength; j++){
            computerPick();
          }
          displayLength();
          setTimeout(function delayedResponse(){
            highlightSequenceComp();
            }, 2000);
        }

  }
}else if(sequenceComp.length === sequencePlayer.length){
  if(sequencePlayer.every(function(element, index){
        return element === sequenceComp[index];
    })){
    //console.log("seqC === SeqP and all true")
    //if true
    computerPick()
    //display the length of the sequence to reperform
    displayLength();
    //play the new computer sequence
    highlightSequenceComp()
    //reset sequencePlayer to [] so he can play angain
    sequencePlayer = [];
  }else{
    //console.log("seqC === SeqP and 1 false")
    //if false
      if(strictMode === false){
        //display the length of the sequence to reperform
        displayLength();
        // reset sequencePlayer to empty as plater picked the wrong color
        sequencePlayer = [];
        //send an error bip and replay the sequence
        setTimeout(function delayedResponse(){
          highlightSequenceComp();
        }, 2000);
      }
      else if(strictMode === true){
        var tempLength = sequenceComp.length;
        sequenceComp = [];
        sequencePlayer =[];
        for (var j=0; j<tempLength; j++){
          computerPick();
        }
        displayLength();
        setTimeout(function delayedResponse(){
          highlightSequenceComp();
          }, 2000);
      }
    }
  }
}//end of compare


function highlightSequenceComp(){
  disableColorButton()
  for(var i = 0; i<sequenceComp.length ; i++){
      (function(){
          var j = i;
          var dom = document.getElementById(sequenceComp[j])
          setTimeout(function delaySetAtt (){
            dom.setAttribute("style", "opacity: 0.5" /*"background: black"*/);
            choseSound(dom);
          },(j+1)*1500);
          setTimeout(function delayRemov (){
            dom.removeAttribute("style");
            if(j+1 === sequenceComp.length){
              enableColorButton();
            }
          }, (j+1)*1650);
      })();
  }//end of for
}//end of highlight

//sound effect
function choseSound(elt){
  if(elt.dataset.color === 'green' || elt === 'a'){
    var greenSound = new Audio();
    greenSound.src = 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'
    greenSound.play();
  }
  else if(elt.dataset.color === 'red'){
    var redSound = new Audio();
    redSound.src = 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'
    redSound.play();
  }
  else if(elt.dataset.color === 'blue'){
    var blueSound = new Audio();
    blueSound.src = 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'
    blueSound.play();
  }
  else if(elt.dataset.color === 'yellow'){
  var yellowSound = new Audio();
  yellowSound.src = 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'
  yellowSound.play();
  }
}





}//end of window.onload
