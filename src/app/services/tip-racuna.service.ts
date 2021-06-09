import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TIP_RACUNA_URL } from '../app.constants';
import { TipRacuna } from '../models/tipRacuna';

@Injectable({
  providedIn: 'root'
})
export class TipRacunaService {
  unsubscribe() {
    throw new Error('Method not implemented.');
  }

  constructor(private httpClient : HttpClient) { }

  public getAllTipoviRacuna(): Observable<any>{
    return this.httpClient.get(`${TIP_RACUNA_URL}`);
  }

  public addTipRacuna(tipRacuna : TipRacuna): Observable<any> {
    tipRacuna.id = 0;
    return this.httpClient.post(`${TIP_RACUNA_URL}`, tipRacuna);
  }

  public updateTipRacuna(tipRacuna : TipRacuna): Observable<any> {
    return this.httpClient.put(`${TIP_RACUNA_URL}`, tipRacuna);
  }

  public deleteTipRacuna(id: number): Observable<any>{
    return this.httpClient.delete(`${TIP_RACUNA_URL}/${id}`);
  }

}
