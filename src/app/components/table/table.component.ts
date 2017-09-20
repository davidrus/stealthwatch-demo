import { Component, Inject, Input } from 'ng-metadata/core';
import { HireSchema } from '../../app.component';

@Component( {
  selector: 'np-table',
  template: `
    <div>
      <table>
        <thead>
          <tr>
            <!-- It will be better to use some directive to show ordering type... -->
            <th ng-click="$ctrl.setOrder('name')">Name</th>
            <th ng-click="$ctrl.setOrder('jobTitle')">Job Title</th>
            <th ng-click="$ctrl.setOrder('tenure')">Tenure</th>
            <th ng-click="$ctrl.setOrder('gender')">Gender</th>
          </tr>
        </thead>
        <tr ng-repeat="row in $ctrl.hireData | orderBy:$ctrl.predicate:$ctrl.reverse">
          <td>{{ row.name }}</td>
          <td>{{ row.jobTitle }}</td>
          <td>{{ row.tenure }}</td>
          <td>{{ row.gender }}</td>
        </tr>
      </table>
      <h4 ng-if=$ctrl.predicate>
        Ordering by: {{ $ctrl.predicate }} 
        <a href="#" ng-click=$ctrl.setOrder()>(reset X)</a>
      </h4>
    </div>
  `
} )

export class TableComponent {

  @Input() hireData: HireSchema;

  predicate: string;
  reverse: boolean;

  setOrder( orderBy: string ): void {
    if ( this.predicate === orderBy ) {
      this.reverse = !this.reverse
      return
    }
    this.predicate = orderBy
  }

}
