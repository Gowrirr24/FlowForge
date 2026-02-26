// core/movement.js

export class Movement {
  constructor({ from, to, type, ratio }) {
    this.from = from;     // incoming road ID
    this.to = to;         // outgoing road ID
    this.type = type;     // left | right | straight | merge
    this.ratio = ratio;   // % of traffic using this movement
  }

  volume(roadVolume) {
    return roadVolume * this.ratio;
  }
}
