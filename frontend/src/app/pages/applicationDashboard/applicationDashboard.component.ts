import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxSwitchModule } from 'devextreme-angular';
import { DxButtonModule } from 'devextreme-angular';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import { MyResearchCardComponent, MyResearchCardModule } from 'src/app/layouts/my-research-card/my-research-card.component';
import { DataService } from 'src/app/shared/services';
import { ApplicationCardModule } from 'src/app/layouts/application-card/application-card.component';
import { backendUrl } from 'src/app/app.component';

@Component({
  selector: 'application-dashboard',
  templateUrl: './applicationDashboard.component.html',
  styleUrls: [ './applicationDashboard.component.scss' ]
})
export class ApplicationDashboardComponent implements OnInit{
    loading = false;
    fetchedData : any;
    researchId : any;
    recommendedData : any;
    constructor(private route: ActivatedRoute, private router: Router, private http : HttpClient, private dataService : DataService) {
    }

    ngOnInit(): void {
        this.researchId = this.route.snapshot.paramMap.get('researchId');
        this.fetchData(this.researchId);
      }

    fetchData(researchId : any) {
        this.dataService.fetchApplications(researchId).subscribe(
          () => {
            this.fetchedData = this.dataService.getApplicationData();
          },
          (error) => {
            console.error('Error fetching data:', error);
          }
        );
      }

      Recommend = () => {
        this.fetchRecommendation(this.researchId);
      }

     fetchRecommendation(researchId : any){
        this.dataService.fetchRecommendation(researchId).subscribe(
            () => {
                this.recommendedData = this.dataService.getRecommendationData();
            },
            (error) => {
                console.error("error getting recommendation:", error);
            }
        )
     }

}

@NgModule({
    imports: [
      CommonModule,
      RouterModule,
      DxFormModule,
      DxLoadIndicatorModule,
      DxSwitchModule,
      DxButtonModule,
      ApplicationCardModule
    ],
    declarations: [ ApplicationDashboardComponent ],
    exports: [ ApplicationDashboardComponent ]
  })
  export class ApplicationDashboardModule { }
