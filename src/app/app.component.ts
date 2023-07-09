import { Component,OnInit } from '@angular/core';
import { ChildrenOutletContexts, NavigationEnd, NavigationStart, Router, RouterEvent, RouterOutlet } from '@angular/router';
import { NavigationService } from './service/navigation.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { fader } from './animaion';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fader
  ]
})
export class AppComponent implements OnInit {

  page_control_route: string = ''
  
  constructor(
    private _router: Router,
    private navService:NavigationService,
    private contexts: ChildrenOutletContexts,
    private ngxService: NgxUiLoaderService
    ) {
    _router.events.subscribe((val) => {
      
      if (val instanceof NavigationEnd) {
        this.navService.setShowNav(false)
      }
    });
  }
  ngOnInit(): void {
    console.log('hiiii');
    // this.ngxService.start(); // start foreground spinner of the master loader with 'default' taskId
    // // Stop the foreground loading after 5s
    // setTimeout(() => {
    //   this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId
    // }, 5000);
    
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }


}
