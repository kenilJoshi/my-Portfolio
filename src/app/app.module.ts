import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxUiLoaderConfig, NgxUiLoaderModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { ContactMeComponent } from './contact-me/contact-me.component';
import { PageControlComponent } from './page-control/page-control.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes:Routes=[
  {path:'', component:HomeComponent,data: { animation: 'AboutPage' }},
  {path:'project', component:ProjectComponent,data: { animation: 'ProjectPage' }},
  {path:'contact-me', component:ContactMeComponent,data: { animation: 'ContactPage' }}
]

const loaderConfig: NgxUiLoaderConfig = {
  bgsColor: "#ff0000",
  bgsOpacity: 0,
  bgsPosition: "bottom-right",
  fgsType: "folding-cube",
  fgsColor: "#F4EEE0",
  pbDirection: "ltr",
  pbThickness: 8,
  overlayColor: "#393646",
  pbColor: "#938794",
  text: "Loading...",
  textColor: "#F4EEE0",
  textPosition: "center-center",
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProjectComponent,
    ContactMeComponent,
    PageControlComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgxUiLoaderModule.forRoot(loaderConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
