export class Particle{
    x:number
    y:number
    size:number
    speedX:number
    speedY:number
    constructor(x, y) {
        this.x = x
        this.y = y
        this.size = 1
        this.speedX = Math.random() * 6 - 3
        this.speedY = Math.random() * 6 - -10
      }
      
      draw(ctx) {
        ctx.fillStyle = '#F4EEE0'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
      }
      
      fall(canvasClass) {
        // console.log('in particle',canvasClass);
        
        this.x += this.speedX
        this.y += this.speedY
        this.draw(canvasClass)
      }
}