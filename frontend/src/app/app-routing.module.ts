import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ResetPasswordFormComponent, CreateAccountFormComponent, ChangePasswordFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { addResearchPostComponent } from './pages/addResearchPost/addResearchPost.component';
import { viewResearchPostComponent } from './pages/researchPosts/researchPosts.component';
import { viewOneResearchPostComponent } from './pages/viewOneResearchPost/viewOneResearchPost.component';
import { addApplicationFormComponent } from './pages/applicationForm/applicationForm.component';
import { myResearchComponent } from './pages/myResearch/myResearch.component';
import { ApplicationDashboardComponent } from './pages/applicationDashboard/applicationDashboard.component';

const routes: Routes = [
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'addResearchPost',
    component: addResearchPostComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'viewResearchPost',
    component: viewResearchPostComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'viewResearchPost/:Id',
    component: viewOneResearchPostComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'applyResearchPost/:Id',
    component: addApplicationFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'myResearchPost',
    component: myResearchComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'viewApplications/:researchId',
    component: ApplicationDashboardComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), DxDataGridModule, DxFormModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    ProfileComponent,
    TasksComponent
  ]
})
export class AppRoutingModule { }
