import { Component,OnInit } from '@angular/core';
import { ChildrenOutletContexts, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavigationService } from './service/navigation.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { fader } from './animaion';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fader
  ]
})
export class AppComponent implements OnInit {
  
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
    // this.ngxService.start(); 
    // setTimeout(() => {
    //   this.ngxService.stop();     
    // }, 5000);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }


}
