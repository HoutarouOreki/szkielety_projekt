import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStatisticComponent } from './components/add-statistic/add-statistic.component';
import { StatisticsListComponent } from './components/statistics-list/statistics-list.component';

const routes: Routes = [
  { path: "", redirectTo: 'statistics', pathMatch: "full" },
  { path: "statistics", component: StatisticsListComponent },
  { path: "registerAccident", component: AddStatisticComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
