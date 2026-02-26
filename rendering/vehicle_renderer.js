export class VehicleRenderer {
  constructor(ctx) {
    this.ctx = ctx;
  }

  draw(vehicle) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(vehicle.x, vehicle.y);
    ctx.rotate(vehicle.angle);

    ctx.fillStyle = vehicle.color || "#fbbf24";
    ctx.fillRect(-6, -3, 12, 6);

    ctx.restore();
  }
}
