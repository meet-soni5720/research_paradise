import { Component, NgModule, Input, OnInit, AfterViewInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxScrollViewModule }  from 'devextreme-angular/ui/scroll-view';
import { DxButtonModule } from 'devextreme-angular';
import {  ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DataService } from 'src/app/shared/services';

@Component({
  selector: 'app-research-info',
  templateUrl: './viewOneResearchPost.component.html',
  styleUrls: ['./viewOneResearchPost.component.scss']
})
export class viewOneResearchPostComponent implements OnInit{
  researchPostData : any = null;
  postId : any;
  isProf : Boolean;
  isHiringStudents : any;

  constructor(private route: ActivatedRoute, private router: Router, private dataService : DataService) {
    if(sessionStorage["isProfessor"] == "false"){
      this.isProf = false;
    }
    else{
      this.isProf = true;
    }
    console.log(this.isProf);
  }

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('Id');
    console.log(this.postId);
    this.fetchData(this.postId);
  }

  async fetchData(postId: any) {
    try{
    this.researchPostData = await this.dataService.fetchOneResearchPost(postId);
    }
    catch(err){
      console.log(err);
    }
  }

  onApplyPost = () => {
    this.router.navigate([`/applyResearchPost/${this.postId}`]);
  }
}

@NgModule({
  imports: [ CommonModule, DxScrollViewModule, DxButtonModule],
  exports: [ viewOneResearchPostComponent ],
  declarations: [ viewOneResearchPostComponent ]
})
export class viewOneResearchPostModule {
  
}
