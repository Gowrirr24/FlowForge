// orchestrator/master_junction_orchestrator.js

import { generateChannelizedJunction } from "../geometry/channelized_generator.js";
import { generateContinuousFlowJunction } from "../geometry/continuous_flow_generator.js";

export class MasterJunctionOrchestrator {
  constructor(centerX = 0, centerY = 0) {
    this.centerX = centerX;
    this.centerY = centerY;
  }

  selectDesign(trafficData) {
    let totalFlow = 0;
    let leftTurnWeight = 0;

    trafficData.forEach(r => {
      totalFlow += r.totalFlow;
      leftTurnWeight += r.totalFlow * (r.left / 100);
    });

    const leftRatio = leftTurnWeight / totalFlow;

    if (leftRatio > 0.25 && trafficData.length >= 4) {
      return "CONTINUOUS_FLOW";
    }

    if (totalFlow > 3000) {
      return "HYBRID_MERGE_DIVERGE";
    }

    return "CHANNELIZED_FREE_FLOW";
  }

  generate(trafficData) {
    const design = this.selectDesign(trafficData);

    if (design === "CHANNELIZED_FREE_FLOW") {
      return {
        type: design,
        geometry: generateChannelizedJunction({
          centerX: this.centerX,
          centerY: this.centerY,
          approaches: trafficData
        })
      };
    }

    if (design === "CONTINUOUS_FLOW") {
      return {
        type: design,
        geometry: generateContinuousFlowJunction({
          centerX: this.centerX,
          centerY: this.centerY,
          approaches: trafficData
        })
      };
    }

    // Hybrid (future expansion hook)
    return {
      type: "HYBRID_MERGE_DIVERGE",
      geometry: generateChannelizedJunction({
        centerX: this.centerX,
        centerY: this.centerY,
        approaches: trafficData
      })
    };
  }
}
