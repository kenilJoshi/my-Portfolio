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
      
      fall(canvasClass, coord_of_button) { 
        this.x += this.speedX
        this.y += this.speedY
        if(this.x < coord_of_button.x + coord_of_button.width && this.y < coord_of_button.y + coord_of_button.height && this.x + this.size > coord_of_button.x && this.y + this.size > coord_of_button.y){
          this.y -= Math.floor(Math.random() * 21) + 20;
          this.x += Math.floor(Math.random() * 21) + 20;
          
          // this.x += this.speedX
          this.draw(canvasClass)
        }else{
          this.draw(canvasClass)
        }
      }
}