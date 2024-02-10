import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxSwitchModule } from 'devextreme-angular';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import { backendUrl } from 'src/app/app.component';

@Component({
  selector: 'app-add-research-post',
  templateUrl: 'addResearchPost.component.html',
  styleUrls: [ './addResearchPost.component.scss' ]
})

export class addResearchPostComponent {
    loading = false;
    formData: any = {};
    constructor(private router: Router, private http : HttpClient) {
    }

    async onSubmit(e: Event) {
        e.preventDefault();
        console.log(this.formData);
        // const { email, password } = this.formData;
        // const userID = new UserID(this.formData.email, this.formData.password);
        const researchPostData = {
          professorId : sessionStorage["userId"],
          title : this.formData.title,
          description : this.formData.description,
          teamMembers: this.formData.teamMembers? this.formData.teamMembers : null,
          isHiring : this.formData.isHiring,
          projectLink : this.formData.projectLink? this.formData.projectLink : null,
          requiredSkills : this.formData.requiredSkills? this.formData.requiredSkills : null
        }

        this.loading = true;

        const result = await this.createPost(researchPostData);
        console.log(result);
        this.loading = false;

        if (result?.isOk) {
        console.log("successfully added the post");
        } else {
        notify(result?.message, 'error', 2000);
        }
    }

    async createPost(researchPostData : any) {
        try {
          // Send request
          let isOk = false;
          this.http.post(`${backendUrl}/researchPosts`, researchPostData).subscribe((data) => {
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
    declarations: [ addResearchPostComponent ],
    exports: [ addResearchPostComponent ]
  })
  export class addResearchPostModule { }
