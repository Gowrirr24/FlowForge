import { TrafficAnalyzer } from "./traffic_analyzer.js";
import { ConflictDetector } from "./conflict_detector.js";
import { DesignSelector } from "./design_selector.js";

export class Orchestrator {
  constructor() {
    this.analyzer = new TrafficAnalyzer();
    this.detector = new ConflictDetector();
    this.selector = new DesignSelector();
  }

  run(roadInputs) {
    const traffic = this.analyzer.analyze(roadInputs);
    const conflicts = this.detector.detect(traffic);
    const design = this.selector.select(conflicts);

    return {
      traffic,
      conflicts,
      design
    };
  }
}
