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
    "<h1 style='text-align: center; color:#F4EEE0;'>Hello, I'm Kenil Joshi</h1>",
    "<p id='intro_para' style='color:#F4EEE0; text-align:center;'>Kenil is a skilled full stack developer proficient in HTML, CSS, JavaScript, Angular, Node.js, and MongoDB. He creates dynamic user interfaces, builds scalable web applications, and develops efficient server-side functionalities using these technologies.</p>"
  );

  iSpeed = 25;
  iIndex = 0;
  iArrLength = this.aText[0].length;
  iScrollAt = 20;
  cursor:any
  iTextPos = 0;
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
    this.canvas = document.getElementById('canvas1') as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d')
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    requestAnimationFrame(this.animate);
    this.typewriter()
    
  }

  ngAfterViewInit(): void {
    console.log('herer');

    // anime({
    //   targets: '.cursor',
    //   opacity:[1,0],
    //   loop:true,
    //   easing: "easeOutExpo",
    //   duration: 950,
    //   delay: (el, i) => 70*i,
    // });
  }

  typewriter() {
    this.sContents = ' ';
    this.iRow = Math.max(0, this.iIndex - this.iScrollAt);
    console.log('hi', this.iIndex)
    let destination = document.getElementById("typedtext");
    this.cursor=document.getElementsByClassName('cursor')

    while (this.iRow < this.iIndex) {
      console.log('br tag');
      if (this.iIndex !== this.aText.length){
        this.sContents += this.aText[this.iRow++] + '<br />';
      }
    }
    destination.innerHTML = this.sContents + this.aText[this.iIndex].substring(0, this.iTextPos) + this.dotAnimation();
    
    if (this.iTextPos++ == this.iArrLength) {
      this.iTextPos = 0;
      this.iIndex++;
      if (this.iIndex === this.aText.length) {
        console.log('joo');
        let intro_para=document.getElementById('intro_para')
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
        this.y = rect.top; 
        this.animate()
        destination.removeChild(this.cursor)
      }
      if (this.iIndex != this.aText.length) {
        this.iArrLength = this.aText[this.iIndex].length;
        setTimeout(() => 
          this.typewriter()
          , 500);
      }
    } else {
      console.log('hii ho',this.aText)
      console.log(this.iSpeed)
      setTimeout(() => 
        this.typewriter()
        , this.iSpeed);
    }
  }

  dotAnimation(){
    console.log('kenil');
    
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
          
          this.particleArray[j].fall(this.ctx)
        }
        setTimeout(()=>{
          this.particleArray = [];
        },10)
      }else{
        console.log('here');
        
        cancelAnimationFrame(this.animationId);
        return
      }
    }else{
      this.particleArray.push(new Particle(this.x, this.y))
      this.particleArray.push(new Particle(this.x, this.y))
      for (let i = 0; i < this.particleArray.length; i++) {
        this.particleArray[i].fall(this.ctx)
      }
    }
    
    if(this.iIndex === this.aText.length){
      this.animationId=requestAnimationFrame(this.animate);
    }
  }

}
