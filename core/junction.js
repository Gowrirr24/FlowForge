// core/junction.js

export class Junction {
  constructor(trafficModel) {
    this.model = trafficModel;
  }

  getAllMovements() {
    const moves = [];
    this.model.roads.forEach(road => {
      road.movements.forEach(m => {
        moves.push({
          ...m,
          volume: m.volume(road.volume)
        });
      });
    });
    return moves;
  }

  dominantRoad(threshold = 0.5) {
    const total = this.model.totalVolume();
    return this.model.roads.filter(
      r => r.volume / total > threshold
    );
  }
}
