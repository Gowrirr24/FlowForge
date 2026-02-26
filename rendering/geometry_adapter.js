// rendering/geometry_adapter.js

import { Path } from "../geometry/path.js";

export function convertMasterGeometryToPaths(masterGeometry) {
  const paths = [];

  // CHANNELIZED: draw main approaches + slip lanes
  if (masterGeometry.approaches) {
    masterGeometry.approaches.forEach(app => {
      const p = new Path();
      p.addPoint(app.entry.x, app.entry.y);
      p.addPoint(app.exit.x, app.exit.y);
      paths.push(p);
    });
  }

  if (masterGeometry.slipLanes) {
    masterGeometry.slipLanes.forEach(slip => {
      const p = new Path();
      p.addPoint(slip.start.x, slip.start.y);
      p.addPoint(slip.end.x, slip.end.y);
      paths.push(p);
    });
  }

  // CONTINUOUS FLOW: draw crossover points
  if (masterGeometry.crossovers) {
    masterGeometry.crossovers.forEach(cross => {
      const p = new Path();
      p.addPoint(0, 0); // junction center
      p.addPoint(cross.point.x, cross.point.y);
      paths.push(p);
    });
  }

  return paths;
}
