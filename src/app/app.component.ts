import { Component, Inject, OnInit } from 'ng-metadata/core';

const API = 'api';

export type HireSchema = {
  name: string,
  jobTitle: string,
  tenure: number,
  gender: 'Male' | 'Female' | 'Jedi' /// there will be more than these... this is just for example :)
}

@Component({
  selector: 'np-app',
  styles: [ require( './app.scss' ) ],
  template: `
    <div>
      <np-table [hire-data]="$ctrl.hireData"></np-table>
      <np-charts [hire-data]="$ctrl.hireData"></np-charts>
    </div>
  `
})
export class AppComponent implements OnInit {

  hireData: HireSchema[]

  constructor(
    @Inject('$http') private $http: ng.IHttpService
  ) {}

  ngOnInit() {
    this._fetchData()
  }

  private _fetchData(): void {
    this.$http.get<HireSchema[]>(`${API}/hire.json`).then((request) => {
      this.hireData = request.data
    }).catch(() => console.error('Cannot fetch data'))
  }

}
