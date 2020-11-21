import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { RouteReuseStrategy } from '@angular/router';



@NgModule({
  imports: [
    IonicModule.forRoot()
  ],
  exports:[
    BrowserModule,
    IonicModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
})
export class CoreModule { }
