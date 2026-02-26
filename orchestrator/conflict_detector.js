export class ConflictDetector {
  detect(trafficData) {
    let conflicts = 0;

    trafficData.forEach(r => {
      conflicts += r.totalFlow * r.ratios.left * 1.5;
      conflicts += r.totalFlow * r.ratios.straight;
    });

    return {
      conflictScore: conflicts,
      complexity: trafficData.length
    };
  }
}
