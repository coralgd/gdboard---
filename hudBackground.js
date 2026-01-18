const c = document.getElementById("hud-bg");
const ctx = c.getContext("2d");

function resize() {
  c.width = innerWidth;
  c.height = innerHeight;
}
resize();
addEventListener("resize", resize);

let t = 0;

function draw() {
  ctx.clearRect(0,0,c.width,c.height);
  ctx.strokeStyle = "rgba(0,180,255,0.08)";
  ctx.lineWidth = 1;

  for (let x=0;x<c.width;x+=40){
    ctx.beginPath();
    ctx.moveTo(x + Math.sin(t+x)*2,0);
    ctx.lineTo(x + Math.sin(t+x)*2,c.height);
    ctx.stroke();
  }

  for (let y=0;y<c.height;y+=40){
    ctx.beginPath();
    ctx.moveTo(0,y + Math.cos(t+y)*2);
    ctx.lineTo(c.width,y + Math.cos(t+y)*2);
    ctx.stroke();
  }

  t += 0.01;
  requestAnimationFrame(draw);
}
draw();
