// geometry/continuous_flow_generator.js

import { GeometryMath } from "./geometry_math.js";

export function generateContinuousFlowJunction({
  centerX,
  centerY,
  approaches,
  crossoverOffset = 180
}) {
  const angles = GeometryMath.computeApproachAngles(approaches.length);

  const geometry = {
    mainApproaches: [],
    crossovers: [],
    leftTurnExits: []
  };

  approaches.forEach((road, index) => {
    const angle = angles[index];
    const flow = road.totalFlow;

    // main straight lanes
    geometry.mainApproaches.push({
      id: road.id,
      angle,
      lanes: Math.max(1, Math.round(flow / 800)),
      type: "straight"
    });

    // left‑turn crossover (CFI core)
    if (road.left > 15) {
      const crossoverPoint = {
        x:
          centerX +
          Math.cos(((angle - 45) * Math.PI) / 180) * crossoverOffset,
        y:
          centerY +
          Math.sin(((angle - 45) * Math.PI) / 180) * crossoverOffset
      };

      geometry.crossovers.push({
        from: road.id,
        angle: angle - 45,
        point: crossoverPoint,
        lanes: Math.max(1, Math.round(road.left / 20)),
        type: "left-crossover"
      });

      geometry.leftTurnExits.push({
        from: road.id,
        exitAngle: angle + 180,
        mergeAfter: true
      });
    }
  });

  return geometry;
}
