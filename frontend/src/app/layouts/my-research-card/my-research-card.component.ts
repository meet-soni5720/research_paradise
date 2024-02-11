import { Component, NgModule, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxScrollViewModule }  from 'devextreme-angular/ui/scroll-view';
import { DxButtonModule } from 'devextreme-angular';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'my-app-research-card',
  templateUrl: './my-research-card.component.html',
  styleUrls: ['./my-research-card.component.scss']
})
export class MyResearchCardComponent {
  @Input()
  title!: string;

  @Input()
  description!: string;

  @Input()
  postId!: String;

  constructor(private router: Router) { }

  // onSubmit(e : Event){
  //   e.preventDefault();
  //   this.router.navigate([`/viewResearchPost/${this.postId}`]);
  // }
  onviewApplications = () => {
    this.router.navigate([`/viewApplications/${this.postId}`]);
  }
  

}

@NgModule({
  imports: [ CommonModule, DxScrollViewModule, DxButtonModule],
  exports: [ MyResearchCardComponent ],
  declarations: [ MyResearchCardComponent ]
})
export class MyResearchCardModule {
  
}
