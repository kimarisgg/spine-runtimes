import { VertexEffect } from "../VertexEffect"
import { Color, MathUtils, PowOut, Vector2 } from "../Utils"
import { Skeleton } from "../Skeleton"

export class SwirlEffect implements VertexEffect {
  static interpolation = new PowOut(2)
  centerX = 0
  centerY = 0
  radius = 0
  angle = 0
  private worldX = 0
  private worldY = 0

  constructor(radius: number) {
    this.radius = radius
  }

  begin(skeleton: Skeleton): void {
    this.worldX = skeleton.x + this.centerX
    this.worldY = skeleton.y + this.centerY
  }

  transform(position: Vector2, uv: Vector2, light: Color, dark: Color): void {
    let radAngle = this.angle * MathUtils.degreesToRadians
    let x = position.x - this.worldX
    let y = position.y - this.worldY
    let dist = Math.sqrt(x * x + y * y)
    if (dist < this.radius) {
      let theta = SwirlEffect.interpolation.apply(0, radAngle, (this.radius - dist) / this.radius)
      let cos = Math.cos(theta)
      let sin = Math.sin(theta)
      position.x = cos * x - sin * y + this.worldX
      position.y = sin * x + cos * y + this.worldY
    }
  }

  end(): void {}
}
