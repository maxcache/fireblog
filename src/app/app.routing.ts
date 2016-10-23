import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './home/home.component';
export const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'settings', component: SettingsComponent }

];

export const routing = RouterModule.forRoot(appRoutes);