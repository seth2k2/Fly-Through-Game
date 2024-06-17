const ship=document.getElementById('ship');
const comet1=document.getElementById('comet1');
const comet2=document.getElementById('comet2');
const comet3=document.getElementById('comet3');
const comet4=document.getElementById('comet4');
const comet5=document.getElementById('comet5');
const playPos = document.getElementById('play_area').getBoundingClientRect(); 
const scoreOut=document.getElementsByTagName('section')[0];
const comets=document.getElementsByClassName("comet");
const fire= document.getElementById('fire');
const displayMsg=document.getElementById('display_message'); 
const startBtn=document.getElementById('startbuttn'); 
const restartBtn=document.getElementById('restartbuttn'); 
let controlUp=document.getElementById("control1");
let controlDown=document.getElementById("control2");

let score=-3;
let end=false;

function welcome(){
  displayMsg.style.display="none";
  startBtn.disabled = false;
  restartBtn.disabled = false;
  document.getElementById('top').style.opacity="100%"; 
  ship.style.opacity="100%";
  controlUp.disabled=false;
  controlDown.disabled = false;
}

function reset(){
  window.location.reload();
}

function crash(){
  sLeft=ship.getBoundingClientRect().left;
  sRight=ship.getBoundingClientRect().right;
  sTop=ship.getBoundingClientRect().top;
  sBottom=ship.getBoundingClientRect().bottom;

  for(let comet of comets){
    cLeft=comet.getBoundingClientRect().left;
    cRight=comet.getBoundingClientRect().right;
    cTop=comet.getBoundingClientRect().top;
    cBottom=comet.getBoundingClientRect().bottom;
      if(cLeft>sLeft && cRight<sRight && cTop>sTop && cBottom<sBottom){
        scoreOut.style.color="red";
        scoreOut.style.fontSize="3.3vw";
        scoreOut.style.animation="animate 1s linear infinite"; 
        fire.style.visibility="visible";
        end=true;
      }
  }

}

function displayComet(){
  for(let comet of comets){
      comet.style.visibility="visible";
  }
}

function shipMove(){
    let shipPos;
    const playTop = ship.getBoundingClientRect().top+10;
    document.onkeydown = function(event) {
       if(end){
        return;
       }
        let step=Math.floor(playPos.width/100);
        let y=ship.offsetTop;   
        switch (event.keyCode) {
            case 38:
                shipPos = ship.getBoundingClientRect(); 
                if(playTop<=shipPos.top){
                  y=y-step;
                  ship.style.top= y+"px";
                  fire.style.top=y+"px";
                }
             break;
             case 40:
                shipPos = ship.getBoundingClientRect(); 
                if(playPos.bottom>=shipPos.bottom+10){
                  y=y+step;
                  ship.style.top= y+"px";
                  fire.style.top= y+"px";
                }
             break;
        }
     }
}
 
let classItems=document.getElementsByClassName("comet");
let playWidth=document.getElementById('play_area').offsetWidth;
let playHeight=document.getElementById('play_area').offsetHeight;

  function setCometY(){
    let randomHeight;
    playHeight=document.getElementById('play_area').offsetHeight-document.getElementById('play_area').offsetHeight*0.05;
    for(let item of classItems){
        randomHeight = Math.floor(Math.random()*playHeight);
        item.style.top= randomHeight + "px";
        item.style.right=Math.floor(Math.random()*(playWidth/2));
    }
  }
  
  function cometMove(){
  let step=Math.floor(playPos.width/150);
  for (let item of classItems) {
      let x=item.offsetLeft;
      x= x -step;
      if(x<0){
          score++;
          scoreOut.innerText=score;
          x=playWidth;
          let randomElement = Math.floor(Math.random()*playHeight);
          item.style.top= randomElement + "px";
     }
      item.style.left= x + "px";
  }
}
  
  function mobileControls(){
    let shipPos;
    const playTop = ship.getBoundingClientRect().top+10;
    let step=Math.floor(playPos.width/100);
    let y=ship.offsetTop;  
    controlUp.addEventListener("click", function (){
      if(end){
        return;
      }
      shipPos = ship.getBoundingClientRect(); 
      if(playTop<=shipPos.top){
        y=y-step;
        ship.style.top= y+"px";
        fire.style.top=y+"px";
      }
    });
    controlDown.addEventListener("click", function (){
      if(end){
        return;
      }
      shipPos = ship.getBoundingClientRect(); 
      if(playPos.bottom>=shipPos.bottom+10){
        y=y+step;
        ship.style.top= y+"px";
        fire.style.top= y+"px";
      }
    });
 }

  function timer1(){
  if(end){
    return;
  }
  cometMove();
  setTimeout('timer1()',10);
  }

  function timer2(){
    if(end){
      return;
    }
    crash();
    setTimeout('timer2()',5);
  }

  

