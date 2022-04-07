let score=0;
let fullScreen=false;
const audio=document.createElement("audio");
audio.src="audio1.wav";
 const audio1=document.createElement("audio");
 audio1.src="audio.wav";
audio.autoplay=true
audio.type="audio/x-wav";
audio1.type="audio/x-wav"
onclick=()=>{
  if(!fullScreen){
    document.body.requestFullscreen();
    fullScreen=true
  }
  
 // if(audio.ended){
  //  audio.play()
  //}
}

let random=(max)=>Math.floor(Math.random()*max);
let colors=["blue", "orange","purple","yellow","green","white"];
let color=colors[random(colors.length-1)];

function createElement(x,len=0){
  let index=0;
  do{
    index++
  const el=document.createElement("div");
  el.setAttribute("id","enemy");
  el.style.marginLeft=x+"px";
  el.style.marginTop="-150px"
  el.style.background=color;
  el.y=-150;
  el.addEventListener("click",(e)=>{
    if(!gameOver)
    e.target.remove();
    audio1.play()
    score++;
  });
  
  document.body.appendChild(el);
  }
  while(index<len);
}

let gameOver=false;
let speed=1;
let createIndex=0;
 speed+=0.005;
 if(createIndex>360){
   createIndex=Math.floor(Math.random()*180);
   addEnemy();
 }
 
function addEnemy(){
  return createElement(Math.floor(Math.random()*(innerWidth-100)));
}
let animation=null;
function animate(){
    createIndex+=speed*2;
  const all=document.querySelectorAll("body #enemy")
  if(speed>3.5 && all.length <= 0){
    gameOver=true
cancelAnimationFrame(animation)
    return swal({
      allowOutsideClick: false,
      title:"You won! | score : "+score,
      text:"You rock , your score is "+score,
      buttons:"Play Next"
    }).then((e)=>{
      gameOver=false
      animate();
      speed+=1;
      color=colors[random(colors.length-1)];
      score=0;
      audio.play();
    })
  }
 for(let i=0;i<all.length;i++){
   const e=all[i];
   e.y+=speed;
   e.style.marginTop=e.y+"px";
   if(Number(e.y)> (innerHeight -170)){
     e.setAttribute("class","gameOver")
     gameOver=true;
     swal({
       allowOutsideClick: false,
       title:"Game Over | score : "+score,
       text:"You fail the game , your score is "+score,
       buttons:"Play again"
       
     }).then(()=>{
       if (audio.readyState >= 4) {
         audio.play();
       
       }
       e.remove();
       gameOver=false
       speed=speed > 1 ? speed=1:speed
       all.forEach((e)=>{
         e.remove();
       })
       animate();
       color=colors[random(colors.length-1)];
       score=0;
     })
     return cancelAnimationFrame(animation);
   }
  // console.log(getComputedStyle(e).getPropertyValue("marginTop"),e.style.marginTop);
 }
 speed+=0.005;
 if(createIndex>360){
   createIndex=Math.floor(Math.random()*180);
   addEnemy();
 }
animation=requestAnimationFrame(animate);
}

function tryAgain(){
  createElement(2);
  animate();
}

const start=document.querySelector(".start");

start.addEventListener("click",(e)=>{
  start.remove();
  animate()
})
