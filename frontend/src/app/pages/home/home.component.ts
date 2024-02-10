import { Component, NgModule } from '@angular/core';
import { CardComponent, CardModule } from 'src/app/shared/components/card/card.component';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: [ './home.component.scss' ]
})

export class HomeComponent {
  card: CardComponent;
  text: string;
  constructor() {
    this.card = new CardComponent();
    this.text = this.card.longText;
  }

}

@NgModule({
  imports: [CardModule],
  declarations: [ HomeComponent ],
  exports: [ HomeComponent ]
})
export class HomeModule { }

