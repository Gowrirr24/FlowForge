const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const cx = canvas.width / 2;
const cy = canvas.height / 2;

/* =========================
   BASIC DRAWING UTILITIES
========================= */

function drawGrid(){
  ctx.strokeStyle="#0f172a";
  ctx.lineWidth=1;
  for(let x=0;x<canvas.width;x+=30){
    ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,canvas.height); ctx.stroke();
  }
  for(let y=0;y<canvas.height;y+=30){
    ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(canvas.width,y); ctx.stroke();
  }
}

function road(x1,y1,x2,y2,w=14,color="#38bdf8"){
  ctx.strokeStyle=color;
  ctx.lineWidth=w;
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  ctx.stroke();
}

function island(x,y,r){
  ctx.fillStyle="#475569";
  ctx.beginPath();
  ctx.arc(x,y,r,0,Math.PI*2);
  ctx.fill();
}

function slipLane(cx,cy,r,start,end){
  ctx.strokeStyle="#fbbf24";
  ctx.lineWidth=8;
  ctx.beginPath();
  ctx.arc(cx,cy,r,start,end);
  ctx.stroke();
}

/* =========================
   MAIN DESIGN ENGINE
========================= */

function generateDesign(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawGrid();

  const N = +north.value;
  const S = +south.value;
  const E = +east.value;
  const W = +west.value;
  const LT = +leftTurn.value;
  const land = document.getElementById("land").value;

  const total = N+S+E+W;

  let designType = "Simple Signalized Junction";
  let length = 280;
  let width  = 14;

  if(land==="high") length = 360;
  if(land==="medium") length = 320;

  /* =========================
     DESIGN SELECTION LOGIC
  ========================= */

  if(total < 800){
    // SIMPLE 4 WAY
    road(cx,cy,cx,cy-length,width);
    road(cx,cy,cx,cy+length,width);
    road(cx,cy,cx-length,cy,width);
    road(cx,cy,cx+length,cy,width);
  }

  else if(total < 1400){
    // CHANNELIZED + DIVERSIONS
    designType="Channelized Junction with Diversions";
    width = 18;

    road(cx,cy,cx,cy-length,width);
    road(cx,cy,cx,cy+length,width);
    road(cx,cy,cx-length,cy,width);
    road(cx,cy,cx+length,cy,width);

    // Traffic islands
    island(cx-80,cy-80,30);
    island(cx+80,cy-80,30);
    island(cx-80,cy+80,30);
    island(cx+80,cy+80,30);

    // Left turn slip lane
    if(LT>30){
      slipLane(cx-100,cy-100,130,0,Math.PI/2);
    }
  }

  else{
    // HIGH CAPACITY / BYPASS DESIGN
    designType="High Capacity Junction with Bypass Lanes";
    width = 22;

    road(cx,cy,cx,cy-length-80,width);
    road(cx,cy,cx,cy+length+80,width);
    road(cx,cy,cx-length-80,cy,width);
    road(cx,cy,cx+length+80,cy,width);

    // Median
    ctx.setLineDash([18,18]);
    road(cx,cy-length-80,cx,cy+length+80,4,"#94a3b8");
    ctx.setLineDash([]);

    // Diversion islands
    island(cx-100,cy-100,36);
    island(cx+100,cy-100,36);
    island(cx-100,cy+100,36);
    island(cx+100,cy+100,36);

    // Free-flow slip lane
    slipLane(cx-130,cy-130,170,0,Math.PI/2);
  }

  /* =========================
     LABELS
  ========================= */

  ctx.fillStyle="white";
  ctx.font="20px Arial";
  ctx.fillText(`Total Traffic: ${total} PCU/hr`,30,40);
  ctx.fillText(`Selected Design: ${designType}`,30,75);
}

/* INITIAL DRAW */
generateDesign();
