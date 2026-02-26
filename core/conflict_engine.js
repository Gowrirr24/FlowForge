// core/conflict_engine.js

export class ConflictEngine {
  constructor(movements) {
    this.movements = movements;
  }

  detectConflicts() {
    const conflicts = [];

    for (let i = 0; i < this.movements.length; i++) {
      for (let j = i + 1; j < this.movements.length; j++) {
        const m1 = this.movements[i];
        const m2 = this.movements[j];

        const conflictType = this.classifyConflict(m1, m2);
        if (conflictType !== "none") {
          conflicts.push({
            m1: m1,
            m2: m2,
            type: conflictType
          });
        }
      }
    }

    return conflicts;
  }

  classifyConflict(a, b) {
    // Same origin road → no conflict (already separated by lanes)
    if (a.from === b.from) return "none";

    // Same destination merge → merge conflict (acceptable)
    if (a.to === b.to) return "merge";

    // Crossing movements (most dangerous)
    if (
      (a.type === "straight" && b.type === "left") ||
      (a.type === "left" && b.type === "straight")
    ) {
      return "crossing";
    }

    // Opposing left turns
    if (a.type === "left" && b.type === "left") {
      return "opposing";
    }

    return "none";
  }

  criticalConflicts() {
    return this.detectConflicts().filter(
      c => c.type === "crossing" || c.type === "opposing"
    );
  }
}
