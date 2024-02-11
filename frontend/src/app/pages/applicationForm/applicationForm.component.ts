import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxSwitchModule } from 'devextreme-angular';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import { backendUrl } from 'src/app/app.component';

@Component({
  selector: 'app-add-application-form',
  templateUrl: 'applicationForm.component.html',
  styleUrls: [ './applicationForm.component.scss' ]
})

export class addApplicationFormComponent implements OnInit{
    loading = false;
    formData: any = {};
    postId : any;
    constructor(private route: ActivatedRoute, private router: Router, private http : HttpClient) {
    }

    ngOnInit(): void {
        this.postId = this.route.snapshot.paramMap.get('Id');
    }

    async onSubmit(e: Event) {
        e.preventDefault();
        console.log(this.formData);
        // const { email, password } = this.formData;
        // const userID = new UserID(this.formData.email, this.formData.password);
        const applicationData = {
          researchPostId : this.postId,
          userId : sessionStorage["userId"],
          userName : sessionStorage["userName"],
          email : sessionStorage["email"],
          relevantSkills : this.formData.relevantSkills,
          researchStatement : this.formData.researchStatement,
        }

        this.loading = true;

        const result = await this.createPost(applicationData);
        console.log(result);
        this.loading = false;

        if (result?.isOk) {
        console.log("successfully added the post");
        this.router.navigate(['home']);
        } else {
        notify(result?.message, 'error', 2000);
        }
    }

    async createPost(applicationData : any) {
        try {
          // Send request
          let isOk = false;
          this.http.post(`${backendUrl}/application/${this.postId}`, applicationData).subscribe((data) => {
            console.log(data);
          });
          return {
            isOk: true
          };
        }
        catch {
          return {
            isOk: false,
            message: "Failed to create account"
          };
        }
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
    declarations: [ addApplicationFormComponent ],
    exports: [ addApplicationFormComponent ]
  })
  export class addApplicationFormModule { }
