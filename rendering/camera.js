export class Camera {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.zoom = 1;
  }

  apply(ctx) {
    ctx.setTransform(
      this.zoom, 0,
      0, this.zoom,
      -this.x * this.zoom,
      -this.y * this.zoom
    );
  }
}
