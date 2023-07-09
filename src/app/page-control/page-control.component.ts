import { Component, Input,OnInit } from '@angular/core';
import { trigger, transition, style, animate, state, keyframes } from '@angular/animations';


@Component({
  selector: 'app-page-control',
  templateUrl: './page-control.component.html',
  styleUrls: ['./page-control.component.scss'],
  animations: [
    trigger('animateArc', [
      transition('false => true',[
        style({ opacity: 0 }),
        animate('2ms', style({ opacity: 1 }))
      ]),
      transition('true => false', [
        style({ opacity: 0 }),
        animate('2ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class PageControlComponent implements OnInit {
  arc: string = 'false';
  @Input() page_control_route: string
  @Input() direction: string
  @Input() route: string
  @Input() text: string

  ngOnInit(): void {
    
  }

  handleClick(route: string) {
    // Perform any actions based on the clicked route value
    console.log('Clicked route:', route);
    const projectSpan = document.querySelector('.project_class_home span');
    if (projectSpan) {
      projectSpan.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 800 });
    }
  }

}
