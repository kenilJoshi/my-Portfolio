import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Particle } from './particle-class';
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})



export class HomeComponent implements OnInit, AfterViewInit {

  aText: Array<string> = new Array(
    "<h1 style='color:#F4EEE0;'>Hello, I'm Kenil Joshi</h1>",
    "<p style='color:#d7d3cbc7;'>Kenil is a skilled full stack developer proficient in HTML, CSS, JavaScript, Angular, Node.js, and MongoDB. He creates dynamic user interfaces, builds scalable web applications, and develops efficient server-side functionalities using these technologies.</p>"
  );
  
  destination: HTMLElement
  iSpeed = 25;
  iIndex = 0;
  iArrLength = this.aText[0].length;
  iScrollAt = 20;
  cursor:any
  cursorId:any
  iTextPos = 0;
  adding_style_para: any = ''
  game_start_button: any
  coord_of_button: object
  sContents = '';
  iRow;
  x:any
  y:any
  particleClass:Particle
  particleArray: Array<Particle>=[]
  canvas:HTMLCanvasElement
  ctx:any
  animationId: number;
  constructor() {

   }
  ngOnInit() {
    // console.log(this.aText);
    this.game_start_button = document.getElementsByClassName('game_start_button')[0]
    this.coord_of_button = this.game_start_button.getBoundingClientRect();
    
    this.canvas = document.getElementById('canvas1') as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d')
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    requestAnimationFrame(this.animate);
    this.typewriter()
    
  }

  ngAfterViewInit(): void {
  }

  typewriter() {
    this.sContents = ' ';
    this.iRow = Math.max(0, this.iIndex - this.iScrollAt);
    console.log(this.iRow);
    
    this.destination = document.getElementById("typedtext");
    this.cursor=document.getElementsByClassName('cursor')
    
    while (this.iRow < this.iIndex) {
      if (this.iIndex !== this.aText.length){
        this.sContents += this.aText[this.iRow++] + '<br />';
      }
    }
    this.destination.innerHTML = this.sContents + this.aText[this.iIndex].substring(0, this.iTextPos) + this.dotAnimation();
    
    
    if (this.iTextPos++ == this.iArrLength) {
      this.iTextPos = 0;
      this.iIndex++;
      if (this.iIndex === this.aText.length) {
        
        let intro_para=this.destination.querySelector('p')
        let cursor_element = document.createElement("span")
        cursor_element.innerHTML = "<svg class='cursor1' id='cursor1' width='10' height='2'><rect width='10' style=' fill:#F4EEE0;' height='2'></rect></svg>"
        intro_para.appendChild(cursor_element)
        anime({
          targets: '.cursor1',
          opacity: [1, 0],
          loop: true,
          easing: "easeOutExpo",
          duration: 950,
          delay: (el, i) => 70 * i,
        });
        const rect = this.cursor[0].getBoundingClientRect();
        this.x = rect.left;   // X-coordinate of the element's top-left corner
        this.y = rect.top - 10; 
        this.animate()
      }
      if (this.iIndex != this.aText.length) {
        this.iArrLength = this.aText[this.iIndex].length;
        setTimeout(() => 
          this.typewriter()
          , 500);
      }
    } else {
      setTimeout(() => 
        this.typewriter()
        , this.iSpeed);
    }
  }


  dotAnimation(){
    
    if(this.cursor.length!==0){
      const rect = this.cursor[0].getBoundingClientRect();
      this.x = rect.left;   // X-coordinate of the element's top-left corner
      this.y = rect.top; 
      this.animate()
    }
    return "<svg class='cursor' id='cursor' width='10' height='2'><rect width='10' style=' fill:#F4EEE0;' height='2'></rect></svg>"
  }

  //Animate the particle
  animate=()=>{
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    
    if (this.iIndex === this.aText.length) {
      if(this.particleArray.length!==0){
        
        for (let j = 0; j < this.particleArray.length; j++) {
          // console.log('in for loop');
          
          this.particleArray[j].fall(this.ctx, this.coord_of_button)
        }
        setTimeout(()=>{
          this.destination.removeChild(this.cursor[0]) 
          this.particleArray = [];
          
        },1)
      }else{
        cancelAnimationFrame(this.animationId);
        return
      }
    }else{
      this.particleArray.push(new Particle(this.x, this.y))
      this.particleArray.push(new Particle(this.x, this.y))
      for (let i = 0; i < this.particleArray.length; i++) {
        this.particleArray[i].fall(this.ctx, this.coord_of_button)
      }
    }
    
    if(this.iIndex === this.aText.length){
      this.animationId=requestAnimationFrame(this.animate);
    }
  }

}
