import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccidentStatisticDto } from 'src/app/models/accident-statistic-dto';
import { EventTypes } from 'src/app/models/event-types';
import { SubFieldsValues } from 'src/app/models/sub-fields';
import { AccidentStatisticService } from 'src/app/services/accident-statistic.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-add-statistic',
  templateUrl: './add-statistic.component.html',
  styleUrls: ['./add-statistic.component.css']
})
export class AddStatisticComponent implements OnInit {

  statistic: AccidentStatisticDto = new AccidentStatisticDto();

  submitted = false;

  sfv?: SubFieldsValues;


  accidentFormGroup = new FormGroup({
    wojewodztwo: new FormControl('', [Validators.required]),
    typPodmiotu: new FormControl('', [Validators.required]),
    liczbaWypadkow: new FormControl(0, [Validators.required]),
    rodzajWypadku: new FormControl('', [Validators.required]),
    przyczynaWypadku: new FormControl('', [Validators.required]),
    miejsceWypadku: new FormControl('', [Validators.required]),
    rodzajZajec: new FormControl('', [Validators.required]),
  });

  constructor(private accidentsService: AccidentStatisticService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.accidentsService.getSubfieldsValues().then(sfv => this.sfv = sfv);
  }

  saveStatistic(): void {
    if (this.accidentFormGroup.invalid) {
      this.toastService.showToast("Błąd", "Nie można dodać - popraw wypełnione dane", EventTypes.Error);
      return;
    }
    this.accidentsService.add(this.statistic)
      .subscribe({
        next: (res) => {
          this.submitted = true;
          this.toastService.showToast("Dodano", res, EventTypes.Success)
        },
        error: (e) => {
          console.log(e);
          this.toastService.showToast("Błąd dodawania: " + e.message, e.error, EventTypes.Error)
        }
      })
  }
}
