import { NgModule } from 'ng-metadata/core';
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component'
import { ChartsComponent } from './components/charts/charts.component'

@NgModule( {
  declarations: [
    AppComponent,
    TableComponent,
    ChartsComponent
  ],
  imports: [ 'highcharts-ng' ]
} )
export class AppModule {
}
