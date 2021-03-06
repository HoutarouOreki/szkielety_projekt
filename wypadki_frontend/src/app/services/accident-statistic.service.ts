import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { AccidentStatistic } from '../models/accident-statistic';
import { AccidentStatisticDto } from '../models/accident-statistic-dto';
import { IdNameModel } from '../models/id_name_model';

import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { SubFieldsValues } from '../models/sub-fields';

const apiUrl = "http://localhost:8000/api";
const baseUlr = apiUrl + "/AccidentStatistics";

@Injectable({
  providedIn: 'root'
})
export class AccidentStatisticService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<AccidentStatisticDto[]> {
    return this.http.get<AccidentStatisticDto[]>(baseUlr);
  }

  get(id: number): Observable<AccidentStatisticDto> {
    return this.http.get<AccidentStatisticDto>(baseUlr + "/" + id);
  }

  add(data: AccidentStatisticDto): Observable<any> {
    return this.http.post(baseUlr, data, {responseType: 'text'});
  }

  getByData(data: AccidentStatisticDto): Observable<AccidentStatisticDto[]> {

    let params = new HttpParams();
    if (data.IdTerytWojewodztwo != null) {
      params.append("IdTerytWojewodztwo", data.IdTerytWojewodztwo);
    }
    if (data.IdTypPodmiotu != null) {
      params.append("IdTypPodmiotu", data.IdTypPodmiotu);
    }
    if (data.IdRodzajWypadku != null) {
      params.append("IdRodzajWypadku", data.IdRodzajWypadku);
    }
    if (data.IdPrzyczynaWypadku != null) {
      params.append("IdPrzyczynaWypadku", data.IdPrzyczynaWypadku);
    }
    if (data.IdMiejsceWypadku != null) {
      params.append("IdMiejsceWypadku", data.IdMiejsceWypadku);
    }
    if (data.IdRodzajZajec != null) {
      params.append("IdRodzajZajec", data.IdRodzajZajec);
    }
    return this.http.get<AccidentStatisticDto[]>(baseUlr + '/find', { params });
  }

  async getSubfieldsValues(): Promise<SubFieldsValues> {
    const miejscaWypadkuReq = this.http.get<IdNameModel[]>(apiUrl + "/MiejsceWypadku");
    const przyczynyWypadkuReq = this.http.get<IdNameModel[]>(apiUrl + "/PrzyczynaWypadku");
    const rodzajeWypadkuReq = this.http.get<IdNameModel[]>(apiUrl + "/RodzajWypadku");
    const rodzajeZajecReq = this.http.get<IdNameModel[]>(apiUrl + "/RodzajZajec");
    const typyPodmiotuReq = this.http.get<IdNameModel[]>(apiUrl + "/TypPodmiotu");
    const wojewodztwaReq = this.http.get<IdNameModel[]>(apiUrl + "/Wojewodztwo");

    const requests = [
      lastValueFrom(miejscaWypadkuReq),
      lastValueFrom(przyczynyWypadkuReq),
      lastValueFrom(rodzajeWypadkuReq),
      lastValueFrom(rodzajeZajecReq),
      lastValueFrom(typyPodmiotuReq),
      lastValueFrom(wojewodztwaReq)
    ];

    const [
      miejscaWypadku,
      przyczynyWypadku,
      rodzajeWypadku,
      rodzajeZajec,
      typyPodmiotu,
      wojewodztwa
    ] = await Promise.all(requests);

    let sfv = new SubFieldsValues;
    sfv.miejscaWypadku = miejscaWypadku;
    sfv.przyczynyWypadku = przyczynyWypadku;
    sfv.rodzajeWypadku = rodzajeWypadku;
    sfv.rodzajeZajec = rodzajeZajec;
    sfv.typyPodmiotu = typyPodmiotu;
    sfv.wojewodztwa = wojewodztwa;
    return sfv;
  }

  async makeReadable(dto: AccidentStatisticDto[]): Promise<AccidentStatistic[]> {
    let sfv = await this.getSubfieldsValues();

    return dto.map(dto => {
      let as = new AccidentStatistic();
      as.IdStatystyki = dto.IdStatystyki;
      as.Wojewodztwo = sfv.wojewodztwa.find(x => x.Id == dto.IdTerytWojewodztwo)?.Name ?? "??";
      as.TypPodmiotu = sfv.typyPodmiotu.find(x => x.Id == dto.IdTypPodmiotu)?.Name ?? "??";
      as.RodzajWypadku = sfv.rodzajeWypadku.find(x => x.Id == dto.IdRodzajWypadku)?.Name ?? "??";
      as.PrzyczynaWypadku = sfv.przyczynyWypadku.find(x => x.Id == dto.IdPrzyczynaWypadku)?.Name ?? "??";
      as.MiejsceWypadku = sfv.miejscaWypadku.find(x => x.Id == dto.IdMiejsceWypadku)?.Name ?? "??";
      as.RodzajZajec = sfv.rodzajeZajec.find(x => x.Id == dto.IdRodzajZajec)?.Name ?? "??";
      as.LiczbaWypadkow = dto.LiczbaWypadkow;
      return as;
    });
  }
}
