import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../Shared/shared.module';
import { BodyComponent } from './body/body.component';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LiveCountersComponent } from './live-counters/live-counters.component';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations:[
        BodyComponent,
        HeaderComponent,
        SideBarComponent,
        DashboardComponent,
        LiveCountersComponent,
        DashboardContentComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule
    ],
    exports: [
        HeaderComponent,
        BodyComponent
    ],
    providers: []
})
export class CoreModule{
}