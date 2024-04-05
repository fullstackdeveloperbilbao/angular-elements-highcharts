import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HighchartsChartModule } from 'highcharts-angular';
import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { ParentComponent } from './parent/parent.component';

@NgModule({
  declarations: [AppComponent, DemoComponent, ParentComponent],
  imports: [BrowserModule, HighchartsChartModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
