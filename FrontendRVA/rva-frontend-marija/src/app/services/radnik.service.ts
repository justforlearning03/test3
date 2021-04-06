import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Radnik } from '../models/radnik';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RadnikService {

  private readonly API_URL = 'http://localhost:8083/radnik/';
  private readonly API_URL_BYID = 'http://localhost:8083/RadniciZaSektorId/';



  dataChange: BehaviorSubject<Radnik[]> = new BehaviorSubject<Radnik[]>([]);

  constructor(private httpClient: HttpClient) { }

  public getAllRadnik(): Observable<Radnik[]> {
    this.httpClient.get<Radnik[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    });

    return this.dataChange.asObservable();
  }

  public addRadnik(radnik: Radnik): void{
    radnik.id = 0;
    this.httpClient.post(this.API_URL, radnik).subscribe();
    console.log('Dodat je radnik: ' + radnik.ime + ' ' + radnik.prezime);
  }

  public updateRadnik(radnik: Radnik): void {
    this.httpClient.put(this.API_URL, radnik).subscribe();
  }

  public deleteRadnik(id: number): void {
    console.log(this.API_URL + id); //da vidimo na konzoli sta se brise
    this.httpClient.delete(this.API_URL + id).subscribe();

  }

public getRadniciZaSektorId(idSektor: number): Observable<Radnik[]> {
  this.httpClient.get<Radnik[]>(this.API_URL_BYID + idSektor).subscribe(data => {
    this.dataChange.next(data);
  },
    (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    });
  return this.dataChange.asObservable();
}





}
