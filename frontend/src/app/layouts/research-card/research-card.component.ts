import { Component, NgModule, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxScrollViewModule }  from 'devextreme-angular/ui/scroll-view';
import { DxButtonModule } from 'devextreme-angular';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-research-card',
  templateUrl: './research-card.component.html',
  styleUrls: ['./research-card.component.scss']
})
export class ResearchCardComponent {
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
  onviewPost = () => {
    this.router.navigate([`/viewResearchPost/${this.postId}`]);
  }
  

}

@NgModule({
  imports: [ CommonModule, DxScrollViewModule, DxButtonModule],
  exports: [ ResearchCardComponent ],
  declarations: [ ResearchCardComponent ]
})
export class ResearchCardModule {
  
}
