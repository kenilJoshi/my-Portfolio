import { Component } from '@angular/core';
import { NavigationService } from '../service/navigation.service';
import { Router,NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  activeClass:string
  showSideNav:Observable<boolean>

  constructor(
    private navService:NavigationService,
    private _router:Router
  ){
    _router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        
        this.activeClass=val.url.split('/')[1];
        
      }
      
    })
  }

  ngOnInit():void{
    this.showSideNav=this.navService.getShowNav()
  }

  burgerButton(){
    
    if(!this.navService.showTheNav()){
      this.navService.setShowNav(true)
    }else if(this.navService.showTheNav()){
      this.navService.setShowNav(false)
    }
  }

}
