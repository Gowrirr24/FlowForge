// core/traffic_model.js

export class TrafficModel {
  constructor() {
    this.roads = [];
  }

  addRoad({ id, lanes, volume }) {
    this.roads.push({
      id,
      lanes,
      volume, // vehicles per hour
      movements: []
    });
  }

  addMovement(roadId, movement) {
    const road = this.roads.find(r => r.id === roadId);
    if (!road) throw new Error("Road not found");
    road.movements.push(movement);
  }

  totalVolume() {
    return this.roads.reduce((sum, r) => sum + r.volume, 0);
  }
}
