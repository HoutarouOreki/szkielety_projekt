import { Component, OnInit } from '@angular/core';
import { AccidentStatisticDto } from 'src/app/models/accident-statistic-dto';
import { AccidentStatisticService } from 'src/app/services/accident-statistic.service';

@Component({
  selector: 'app-add-statistic',
  templateUrl: './add-statistic.component.html',
  styleUrls: ['./add-statistic.component.css']
})
export class AddStatisticComponent implements OnInit {

  statistic: AccidentStatisticDto = new AccidentStatisticDto();

  submitted = false;

  constructor(private accidentsService: AccidentStatisticService) { }

  ngOnInit(): void {
  }

  saveStatistic(): void {
    this.accidentsService.add(this.statistic)
      .subscribe({
        next: (res) => {
          this.submitted = true;
        },
        error: (e) => {
        }
      })
  }

}
