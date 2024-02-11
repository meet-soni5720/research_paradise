import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxSwitchModule } from 'devextreme-angular';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import { ResearchCardModule } from 'src/app/layouts/research-card/research-card.component';
import { DataService } from 'src/app/shared/services';

@Component({
  selector: 'view-research-posts',
  templateUrl: 'researchPosts.component.html',
  styleUrls: [ './researchPosts.component.scss' ]
})
export class viewResearchPostComponent implements OnInit{
    loading = false;
    fetchedData : any;
    constructor(private router: Router, private http : HttpClient, private dataService : DataService) {
    }

    ngOnInit(): void {
        this.fetchData();
    }

    fetchData() {
        this.dataService.fetchResearchPosts().subscribe(
          () => {
            this.fetchedData = this.dataService.getData();
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
      ResearchCardModule
    ],
    declarations: [ viewResearchPostComponent ],
    exports: [ viewResearchPostComponent ]
  })
  export class viewResearchPostModule { }
