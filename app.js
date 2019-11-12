const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const thickRange = document.getElementById("jsRange");
const savePic = document.getElementById("jsSave");
const mode = document.getElementById("jsMode");

const INITIAL_COLOR = "2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle= INITIAL_COLOR;
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMounseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onMouseDown(event) {
  startPainting();
}

function onMouseUp(event) {
  stopPainting();
}

function changeColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function changeThick(event){
  const thick = event.target.value
  ctx.lineWidth = thick;
}

function downloadImg(event){
  let dataURL = canvas.toDataURL("image/png");

  var link = document.createElement('a');
  link.download = 'test.png';
  link.href = dataURL;
  link.click();
}

function changeMode(event){
  if(filling === true){
    filling = false;
    mode.innerText = "Fill";
  }else{
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick(event){
  if(filling){  
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleCM(event){
  event.preventDefault();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMounseMove);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color =>
  color.addEventListener("click", changeColor)
);

thickRange.addEventListener("change", changeThick);
mode.addEventListener("click", changeMode);
savePic.addEventListener("click", downloadImg);