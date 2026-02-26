// geometry/geometry_math.js

export class GeometryMath {
  // evenly distribute N roads around junction
  static computeApproachAngles(n) {
    const angles = [];
    const step = 360 / n;

    for (let i = 0; i < n; i++) {
      angles.push(i * step);
    }

    return angles;
  }

  // determine dominant road (highest flow)
  static dominantApproach(trafficData) {
    return trafficData.reduce((max, r) =>
      r.totalFlow > max.totalFlow ? r : max
    );
  }

  // compute slip lane radius based on traffic volume
  static slipRadius(flow) {
    if (flow > 2000) return 200; // heavy → wide smooth curve
    if (flow > 1000) return 150;
    return 110; // low → tighter
  }

  // lane width scaling based on total flow
  static laneWidth(flow) {
    if (flow > 2500) return 20;
    if (flow > 1500) return 16;
    return 12;
  }
}
