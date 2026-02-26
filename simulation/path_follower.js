// simulation/path_follower.js

export class PathFollower {
  static step(vehicle) {
    if (vehicle.finished) return;

    vehicle.position += vehicle.speed;

    if (vehicle.position >= vehicle.path.points.length) {
      vehicle.finished = true;
      vehicle.position = vehicle.path.points.length - 1;
    }
  }
}
