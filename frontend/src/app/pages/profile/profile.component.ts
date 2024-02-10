import { Component } from '@angular/core';
import { UserID } from 'src/app/shared/models/userdata.model';
import { DataService } from 'src/app/shared/services';

@Component({
  templateUrl: 'profile.component.html',
  styleUrls: [ './profile.component.scss' ]
})

export class ProfileComponent {
  colCountByScreen: object;
  userData : any;
  constructor(private dataService : DataService) {
    this.dataService.getOneUserData(sessionStorage["userId"]).subscribe(
      res => {
        this.userData = res;
      },
      error => {
        console.log(error);
      }
    );

    this.colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4
    };
  }
}
