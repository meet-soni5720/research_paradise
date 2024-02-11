import { Component, NgModule, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxScrollViewModule }  from 'devextreme-angular/ui/scroll-view';
import { DxButtonModule } from 'devextreme-angular';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'application-card',
  templateUrl: './application-card.component.html',
  styleUrls: ['./application-card.component.scss']
})
export class applicationCardComponent {
  @Input()
  userName!: String;

  @Input()
  email!: String;

  @Input()
  relevantSkills!: string;

  @Input()
  researchStatement!: string;

  constructor(private router: Router) { }

}

@NgModule({
  imports: [ CommonModule, DxScrollViewModule, DxButtonModule],
  exports: [ applicationCardComponent ],
  declarations: [ applicationCardComponent ]
})
export class ApplicationCardModule {
  
}
