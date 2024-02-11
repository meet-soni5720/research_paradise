import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, ResetPasswordFormModule, CreateAccountFormModule, ChangePasswordFormModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService, DataService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { addResearchPostModule } from './pages/addResearchPost/addResearchPost.component';
import { viewResearchPostModule } from './pages/researchPosts/researchPosts.component';
import { viewOneResearchPostComponent, viewOneResearchPostModule } from './pages/viewOneResearchPost/viewOneResearchPost.component';
import { addApplicationFormModule } from './pages/applicationForm/applicationForm.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    addResearchPostModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    viewResearchPostModule,
    viewOneResearchPostModule,
    addApplicationFormModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    ScreenService,
    AppInfoService,
    DataService,
    importProvidersFrom(HttpClientModule),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
