export class TrafficAnalyzer {
  analyze(roadInputs) {
    return roadInputs.map(r => {
      const total = r.left + r.straight + r.right;
      return {
        id: r.id,
        totalFlow: total,
        ratios: {
          left: r.left / total,
          straight: r.straight / total,
          right: r.right / total
        }
      };
    });
  }
}
