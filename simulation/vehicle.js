// simulation/vehicle.js

export class Vehicle {
  constructor(path, speed = 1) {
    this.path = path;
    this.speed = speed;
    this.position = 0; // index along path
    this.finished = false;
  }

  currentPoint() {
    return this.path.points[this.position];
  }
}
