// geometry/junction_geometry.js

import { Path } from "./path.js";
import { bezier } from "./curve.js";

export class JunctionGeometry {
  constructor(centerX, centerY) {
    this.cx = centerX;
    this.cy = centerY;
    this.paths = [];
  }

  createStraightPath(angle, length = 400) {
    const path = new Path();

    const rad = angle * Math.PI / 180;
    const dx = Math.cos(rad);
    const dy = Math.sin(rad);

    path.addPoint(this.cx - dx * length, this.cy - dy * length);
    path.addPoint(this.cx + dx * length, this.cy + dy * length);

    this.paths.push(path);
    return path;
  }

  createSlipLane(entryAngle, exitAngle, radius = 120) {
    const path = new Path();

    const start = {
      x: this.cx + Math.cos(entryAngle * Math.PI / 180) * radius,
      y: this.cy + Math.sin(entryAngle * Math.PI / 180) * radius
    };

    const end = {
      x: this.cx + Math.cos(exitAngle * Math.PI / 180) * radius,
      y: this.cy + Math.sin(exitAngle * Math.PI / 180) * radius
    };

    const control1 = {
      x: this.cx + Math.cos(entryAngle * Math.PI / 180) * (radius + 80),
      y: this.cy + Math.sin(entryAngle * Math.PI / 180) * (radius + 80)
    };

    const control2 = {
      x: this.cx + Math.cos(exitAngle * Math.PI / 180) * (radius + 80),
      y: this.cy + Math.sin(exitAngle * Math.PI / 180) * (radius + 80)
    };

    for (let t = 0; t <= 1; t += 0.05) {
      path.addPoint(
        ...Object.values(bezier(start, control1, control2, end, t))
      );
    }

    this.paths.push(path);
    return path;
  }
}
