export class RoadRenderer {
  constructor(ctx) {
    this.ctx = ctx;
  }

  drawLane(path, width = 14) {
    const ctx = this.ctx;
    ctx.strokeStyle = "#7dd3fc";
    ctx.lineWidth = width;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);

    for (let i = 1; i < path.length; i++) {
      ctx.lineTo(path[i].x, path[i].y);
    }

    ctx.stroke();
  }

  drawMultipleLanes(paths) {
    paths.forEach(p => this.drawLane(p.path, p.width));
  }
}
