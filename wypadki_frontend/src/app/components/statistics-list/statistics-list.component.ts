import { Component, OnInit, ViewChild } from '@angular/core';
import { AccidentStatistic } from 'src/app/models/accident-statistic';
import { AccidentStatisticDto } from 'src/app/models/accident-statistic-dto';
import { EventTypes } from 'src/app/models/event-types';
import { AccidentStatisticService } from 'src/app/services/accident-statistic.service';
import { ToastService } from 'src/app/services/toast.service';
import {MatTable} from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-statistics-list',
  templateUrl: './statistics-list.component.html',
  styleUrls: ['./statistics-list.component.css'],
})
export class StatisticsListComponent implements OnInit {

  statisticDtos?: AccidentStatisticDto[];
  displayedStatistics?: AccidentStatistic[];
  allStatistics?: AccidentStatistic[];

  @ViewChild(MatTable) table?: MatTable<AccidentStatistic>;

  displayedColumns = [
    "IdStatystyki",
    "Wojewodztwo",
    "TypPodmiotu",
    "RodzajWypadku",
    "PrzyczynaWypadku",
    "MiejsceWypadku",
    "RodzajZajec",
    "LiczbaWypadkow",
  ]
  pageSize: number = 10;
  pageIndex: number = 0;

  constructor(
    private statisticsService: AccidentStatisticService,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.statisticsService.getAll().subscribe(async res => {
      this.allStatistics = await this.statisticsService.makeReadable(res);
      this.toastService.showToast("Sukces", "Pobrano statystyki", EventTypes.Success);
      this.setDisplayedStatistics();
    });
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.setDisplayedStatistics();
  }

  setDisplayedStatistics() {
    this.displayedStatistics = [];
    const startIndex = this.pageIndex * this.pageSize;
    for (var i = startIndex; i < startIndex + this.pageSize; i++) {
      if (i >= this.allStatistics!.length) {
        break;
      }
      this.displayedStatistics.push(this.allStatistics![i]);
    }
    this.table?.renderRows();
  }
}
