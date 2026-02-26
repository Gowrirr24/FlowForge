// geometry/channelized_generator.js

import {
  evenlySpacedAngles,
  polarToCartesian,
  computeCurveRadius
} from "./geometry_math.js";

export function generateChannelizedJunction({
  centerX,
  centerY,
  approaches,
  baseRadius = 120
}) {
  const angles = evenlySpacedAngles(approaches.length);
  const geometry = {
    approaches: [],
    slipLanes: []
  };

  approaches.forEach((road, index) => {
    const angle = angles[index];

    // main approach (straight)
    const entry = polarToCartesian(
      centerX,
      centerY,
      angle,
      baseRadius
    );

    const exit = polarToCartesian(
      centerX,
      centerY,
      angle + 180,
      baseRadius
    );

    geometry.approaches.push({
      id: road.id,
      angle,
      entry,
      exit,
      lanes: Math.max(1, Math.round(road.totalFlow / 900))
    });

    // right‑turn slip lane
    if (road.right > 25) {
      const radius = computeCurveRadius(40 + road.right);
      const slipStart = polarToCartesian(
        centerX,
        centerY,
        angle,
        baseRadius + 40
      );

      const slipEnd = polarToCartesian(
        centerX,
        centerY,
        angle + 90,
        baseRadius + 40
      );

      geometry.slipLanes.push({
        from: road.id,
        type: "right-slip",
        radius,
        start: slipStart,
        end: slipEnd
      });
    }
  });

  return geometry;
}
