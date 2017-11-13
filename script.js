//WEB ID #: 0600089471234  http://www.thebay.com/webapp/wcs/stores/servlet/en/thebay/mens/zipped-hooded-duffle-coat-0600089471234--24

//prevent the player to click on more color than there is in the sequenceComp

//js files
window.onload = function(){

var green, red, blue, yellow;
var color = ['green', 'red', 'blue', 'yellow'];
var sequenceComp = [];
var sequencePlayer = [];
var display = document.getElementById('display');
var strictMode = false;


//////////////////////////////

//function todisplay the length of the computer sequence
function displayLength(){
  display.innerHTML = sequenceComp.length;
}

//reset the game
var reset = document.querySelector('#reset');
reset.addEventListener('click', function(){
  display.innerHTML = " - - ";
  sequenceComp = [];
  computerPick();
  highlightSequenceComp();
  console.log('reset has been pressed');
  //display the length of the sequence to reperform
  displayLength();
});

//enable strict mode

var strict = document.querySelector('#strict');
strict.addEventListener('click', function(){
  // make a little red dot appear ==> to do
  strictMode = true;
  console.log("from addvent strictMode", strictMode);
});

// starting the game

var start = document.querySelector('#start');
start.addEventListener('click', function(){
  computerPick();
  highlightSequenceComp();
  console.log('start');
  //display the length of the sequence to reperform
  displayLength();
});


//computer randomly pick a color
function computerPick(){
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


function addToSequencePlayerThenCompare (){
  sequencePlayer.push(this.dataset.color);
  console.log('sequencePlayer', sequencePlayer);
  compare();
}

//reworking the compare function
function compare(){
if (sequenceComp.length > sequencePlayer.length){
  if(sequencePlayer.every(function(element, index){
        return element === sequenceComp[index];
    })){
    console.log("seqC > SeqP and all true")
    //true do nothing let it check until false or lenght are equal
    console.log("sequencePlayer", sequencePlayer)
    console.log("sequenceComp", sequenceComp)
    //console.log("true")
    //return true
  }else{
    console.log("seqC > SeqP and 1 false")
    //if false
      if(strictMode === false){
          // reset sequencePlayer to empty as plater picked the wrong color
          sequencePlayer = [];
          //send an error bip and replay the sequence
          highlightSequenceComp();
          console.log("sequencePlayer", sequencePlayer)
          console.log("sequenceComp", sequenceComp)
          //console.log("false")
          //return false
      }else if(strictMode === true){
          console.log("strictMode", strictMode);
          var tempLength = sequenceComp.length;
          sequenceComp = [];
          sequencePlayer =[];
          console.log(tempLength);
          for (var j=0; j<tempLength; j++){
            computerPick();
          }
          displayLength();
          highlightSequenceComp();

        }

  }
}else if(sequenceComp.length === sequencePlayer.length){
  if(sequencePlayer.every(function(element, index){
        return element === sequenceComp[index];
    })){
    console.log("seqC === SeqP and all true")
    //if true
    computerPick()
    //display the length of the sequence to reperform
    displayLength();
    //play the new computer sequence
    highlightSequenceComp()
    //reset sequencePlayer to [] so he can play angain
    sequencePlayer = [];
  }else{
    console.log("seqC === SeqP and 1 false")
    //if false
      if(strictMode === false){
        //display the length of the sequence to reperform
        displayLength();
        // reset sequencePlayer to empty as plater picked the wrong color
        sequencePlayer = [];
        //send an error bip and replay the sequence
        highlightSequenceComp();
        console.log("sequencePlayer", sequencePlayer);
        console.log("sequenceComp", sequenceComp);
        console.log("false");
        console.log("strictMode", strictMode);
        //return false
      }
      else if(strictMode === true){
        console.log("strictMode", strictMode);
        var tempLength = sequenceComp.length;
        sequenceComp = [];
        sequencePlayer =[];
        console.log(tempLength);
        for (var j=0; j<tempLength; j++){
          computerPick();
        }
        displayLength();
        highlightSequenceComp();

      }
    }
  }
}//end of compare


function highlightSequenceComp(){
  for(var i = 0; i<sequenceComp.length ; i++){
      (function(){
          var j = i;
          var dom = document.getElementById(sequenceComp[j])
          setTimeout(function delaySetAtt (){
            dom.setAttribute("style", /*"opacity: 0.5"*/"background: black");
            choseSound(dom);
            console.log("from timeout set / var J", j , "dom", dom);
            console.log(dom.dataset.color, dom.dataset.color === "yellow" )
          },(j+1)*1500);
          setTimeout(function delayRemov (){
            dom.removeAttribute("style");
            console.log("from timeout remove / var J", j , "dom", dom);
          }, (j+1)*1750);
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
