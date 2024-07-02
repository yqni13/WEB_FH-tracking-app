import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TrackingComponent } from './tracking/tracking.component';
import { OverviewComponent } from './overview/overview.component';
import { FaqComponent } from './faq/faq.component';
// other additional imports
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi }from '@angular/common/http';
// angular material
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSortModule} from '@angular/material/sort';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTreeModule} from '@angular/material/tree';

@NgModule({ declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        TrackingComponent,
        OverviewComponent,
        FaqComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        // additional imports
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonToggleModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatNativeDateModule,
        MatRippleModule,
        MatSidenavModule,
        MatSortModule,
        MatToolbarModule,
        MatTreeModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
