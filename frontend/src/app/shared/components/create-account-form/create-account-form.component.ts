import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ValidationCallbackData } from 'devextreme-angular/common';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxSwitchModule } from 'devextreme-angular';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import { AuthService } from '../../services';
import { UserID } from '../../models/userdata.model';


@Component({
  selector: 'app-create-account-form',
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.scss']
})
export class CreateAccountFormComponent {
  loading = false;
  formData: any = {};

  constructor(private authService: AuthService, private router: Router) { }

  async onSubmit(e: Event) {
    e.preventDefault();
    console.log(this.formData);
    // const { email, password } = this.formData;
    // const userID = new UserID(this.formData.email, this.formData.password);
    const userData : UserID = {
      email: this.formData.email,
      password: this.formData.password,
      name: this.formData.name,
      isProfessor: this.formData.isProfessor,
      googleScholarId: this.formData.googleScholarId? this.formData.googleScholarId : null,
      githubId: this.formData.githubId? this.formData.githubId : null,
      additionalLinks: this.formData.additionalLinks? this.formData.additionalLinks : null
    }

    this.loading = true;

    const result = await this.authService.createAccount(userData);
    console.log(result);
    this.loading = false;

    if (result?.isOk) {
      this.router.navigate(['/login-form']);
    } else {
      notify(result?.message, 'error', 2000);
    }
  }

  confirmPassword = (e: ValidationCallbackData) => {
    return e.value === this.formData.password;
  }
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule,
    DxSwitchModule
  ],
  declarations: [ CreateAccountFormComponent ],
  exports: [ CreateAccountFormComponent ]
})
export class CreateAccountFormModule { }
