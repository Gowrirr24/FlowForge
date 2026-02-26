// simulation/traffic_simulator.js

import { Vehicle } from "./vehicle.js";
import { PathFollower } from "./path_follower.js";

export class TrafficSimulator {
  constructor(paths) {
    this.paths = paths;
    this.vehicles = [];
  }

  spawnVehicle(pathIndex, speed = 1) {
    const vehicle = new Vehicle(this.paths[pathIndex], speed);
    this.vehicles.push(vehicle);
  }

  step() {
    this.vehicles.forEach(v => {
      PathFollower.step(v);
    });

    // remove finished vehicles
    this.vehicles = this.vehicles.filter(v => !v.finished);
  }
}
