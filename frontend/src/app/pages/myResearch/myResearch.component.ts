import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxSwitchModule } from 'devextreme-angular';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import { MyResearchCardComponent, MyResearchCardModule } from 'src/app/layouts/my-research-card/my-research-card.component';
import { DataService } from 'src/app/shared/services';

@Component({
  selector: 'my-research-posts',
  templateUrl: 'myResearch.component.html',
  styleUrls: [ './myResearch.component.scss' ]
})
export class myResearchComponent implements OnInit{
    loading = false;
    fetchedData : any;
    constructor(private router: Router, private http : HttpClient, private dataService : DataService) {
    }

    ngOnInit(): void {
        this.fetchData();
        console.log(this.fetchedData);
    }

    fetchData() {
        this.dataService.fetchResearchPostsForUser(sessionStorage["userId"]).subscribe(
          () => {
            this.fetchedData = this.dataService.getResearchDataForUser();
          },
          (error) => {
            console.error('Error fetching data:', error);
          }
        );
      }

}

@NgModule({
    imports: [
      CommonModule,
      RouterModule,
      DxFormModule,
      DxLoadIndicatorModule,
      DxSwitchModule,
      MyResearchCardModule
    ],
    declarations: [ myResearchComponent ],
    exports: [ myResearchComponent ]
  })
  export class myResearchModule { }
