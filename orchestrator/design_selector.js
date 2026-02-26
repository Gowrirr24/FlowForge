export class DesignSelector {
  select(conflictReport) {
    const { conflictScore, complexity } = conflictReport;

    if (complexity <= 3 && conflictScore < 800) {
      return "CHANNELIZED_FREE_FLOW";
    }

    if (complexity >= 4 && conflictScore >= 800 && conflictScore < 1800) {
      return "CONTINUOUS_FLOW_INTERSECTION";
    }

    return "MERGE_DIVERGE_ARTERIAL";
  }
}
