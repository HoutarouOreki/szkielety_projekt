import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStatisticComponent } from './components/add-statistic/add-statistic.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { StatisticsListComponent } from './components/statistics-list/statistics-list.component';

const routes: Routes = [
  { path: "", redirectTo: 'statistics', pathMatch: "full" },
  { path: "statistics", component: StatisticsListComponent },
  { path: "registerAccident", component: AddStatisticComponent },
  { path: "signup", component: SignUpComponent },
  { path: "signin", component: SignInComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
