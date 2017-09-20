import { Component, Inject, Input } from 'ng-metadata/core';
import { HireSchema } from '../../app.component';

@Component( {
  selector: 'np-charts',
  template: `
    <div>
     <highchart ng-if=$ctrl.employessByGenderChartConfig config=$ctrl.employessByGenderChartConfig></highchart>
     <highchart ng-if=$ctrl.employessByJobChartConfig config=$ctrl.employessByJobChartConfig></highchart>
    </div>
  `
} )

export class ChartsComponent {

  @Input() hireData: HireSchema[];

  employessByGenderChartConfig;
  employessByJobChartConfig;

  constructor(
    @Inject( '$filter' ) private $filter: ng.IFilterService,
    @Inject( '$scope' ) private $scope: ng.IScope,
  ) {
    this.setWatchers()
  }

  private setWatchers() {
    this.$scope.$watch( () => this.hireData, ( newValue ) => {
      if ( newValue === undefined ) return;
      this.regenerateData( newValue )
    } )
  }

  private regenerateData( data: HireSchema[] ) {
    this.setEmployeesByGender( data );
    this.setEmployeesByJob( data );
  }

  private setEmployeesByGender( data ) {

    const maleCount = this.$filter( 'filter' )( data, ( item: HireSchema ) => item.gender === 'Male' ).length;
    const femaleCount = this.$filter( 'filter' )( data, ( item: HireSchema ) => item.gender === 'Female' ).length;

    this.employessByGenderChartConfig = {
      chart: {
        type: 'pie'
      },
      series: [
        {
          name: 'Employees',
          data: [
            {
              name: `Male ${maleCount}`,
              y: maleCount,
              drilldown: 'Male'
            },
            {
              name: `Female ${femaleCount}`,
              y: femaleCount,
              drilldown: 'Female'
            }
          ],
          id: 'employees'
        }
      ],
      title: {
        text: 'Employees by Gender'
      }
    }
  }

  private setEmployeesByJob( data ) {

    let differentJobs = [];
    data.map( ( hire ) => {
      const uniqueJob = differentJobs.find( ( item ) => item.name === hire.jobTitle );
      if ( uniqueJob ) {
        uniqueJob.name = `${uniqueJob.name}`
        uniqueJob.y++;
        return;
      }
      differentJobs.push( {
        name: hire.jobTitle,
        y: 0
      } )
    } );


    this.employessByJobChartConfig = {
      chart: {
        type: 'pie'
      },
      series: [
        {
          name: 'Job Title',
          data: differentJobs,
          id: 'jobTitle'
        }
      ],
      title: {
        text: 'Employees by Job Title'
      }
    }
  }

}
