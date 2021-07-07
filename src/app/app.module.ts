import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PieCustomDataComponent } from './components/pie-custom-data/pie-custom-data.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';

//Providers
import { PieDataService } from './services/pie-data.service';

@NgModule({
  declarations: [AppComponent, PieCustomDataComponent, PieChartComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [PieDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
