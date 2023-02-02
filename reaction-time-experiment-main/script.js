// register onclick event listener for the box on the page
document.getElementById("box").onclick = onDivClick;

// keep track of how many times the box has been clicked
var index = 0;

// stores the "current time"
var timenow  = 0; 

// stores the time the first click happens and the second click happens respectively
var firstClickTime = 0;
var secondClickTime = 0;
var thirdClickTime=0;

let scores_red;
let scores_green;
let scores_blue
var trials =10;
var trialCounter =0;
hasChanged = false;

document.addEventListener("keydown", onKeyPressed);


function onDivClick(e) {
  var div2 = document.createElement("div");

  // style our newly created div
  div2.style.height = "200px";
  div2.style.width = "200px";

  // cycles every 3 clicks
  if (index%3 == 0) {
    //incorporated the counter to keep track of the
    trialCounter++;
    div2.style.backgroundColor = "red";
    const d = new Date();  // make a new date
    timenow = d.getMilliseconds(); // get current time from date
    firstClickTime = timenow; // set firstClickTime
    var reactionTime = document.createElement("p"); 
    reactionTime.innerHTML = firstClickTime;
    document.body.appendChild(reactionTime); 
 

  } else if (index%3 == 1) {
      trialCounter++;
      div2.style.backgroundColor = "green";
      const d = new Date(); 
     
      timenow = d.getMilliseconds(); 
      secondClickTime = timenow;
      var reactionTime = document.createElement("p"); 
      reactionTime.innerHTML = secondClickTime;
      document.body.appendChild(reactionTime); 
    

  } else {
      trialCounter++;
      div2.style.backgroundColor = "blue";
      const d = new Date();
      timenow=d.getMilliseconds();
      thirdClickTime=timenow; 
      // make a new element for the diff to go into
      var reactionTime = document.createElement("p"); 
      reactionTime.innerHTML = thirdClickTime; // put diff in <p>
      document.body.appendChild(reactionTime); // put on page
      
    
  }

  index = index + 1; // increment index on every click
  div2.onclick = onDivClick; // new div also can be clicked on
  document.body.appendChild(div2); // put new div on page
  e.target.remove(); // remove old div
  console.log("clicked!");
}
