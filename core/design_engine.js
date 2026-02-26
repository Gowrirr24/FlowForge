// core/design_engine.js

export class DesignEngine {
  constructor(conflicts, movements) {
    this.conflicts = conflicts;
    this.movements = movements;
  }

  decide() {
    const decisions = [];

    const crossingConflicts = this.conflicts.filter(
      c => c.type === "crossing"
    );

    const opposingConflicts = this.conflicts.filter(
      c => c.type === "opposing"
    );

    // Rule 1: Crossing conflicts must be eliminated
    crossingConflicts.forEach(c => {
      decisions.push({
        action: "separate_levels",
        reason: "crossing_conflict",
        movements: [c.m1, c.m2]
      });
    });

    // Rule 2: Opposing left turns → channelize
    opposingConflicts.forEach(c => {
      decisions.push({
        action: "channelize_turns",
        reason: "opposing_left_turns",
        movements: [c.m1, c.m2]
      });
    });

    // Rule 3: High-volume movements deserve priority paths
    this.movements.forEach(m => {
      if (m.volume > 1500) {
        decisions.push({
          action: "priority_flow",
          reason: "high_volume",
          movement: m
        });
      }
    });

    return decisions;
  }
}
