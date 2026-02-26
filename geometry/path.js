// geometry/path.js

export class Path {
  constructor() {
    this.points = [];
  }

  addPoint(x, y) {
    this.points.push({ x, y });
  }

  length() {
    let len = 0;
    for (let i = 1; i < this.points.length; i++) {
      const dx = this.points[i].x - this.points[i - 1].x;
      const dy = this.points[i].y - this.points[i - 1].y;
      len += Math.sqrt(dx * dx + dy * dy);
    }
    return len;
  }
}
