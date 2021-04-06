import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Obrazovanje } from '../models/obrazovanje';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ObrazovanjeService {

  private readonly API_URL = 'http://localhost:8083/obrazovanje/';

  dataChange: BehaviorSubject<Obrazovanje[]> = new BehaviorSubject<Obrazovanje[]>([]);

  constructor(private httpClient: HttpClient) { }

  public getAllObrazovanje(): Observable<Obrazovanje[]> {
    this.httpClient.get<Obrazovanje[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    });

    return this.dataChange.asObservable();
  }

  public addObrazovanje(obrazovanje: Obrazovanje): void{
    obrazovanje.id = 0;
    this.httpClient.post(this.API_URL, obrazovanje).subscribe();
    console.log('Dodato je obrazovanje: ' + obrazovanje.naziv + ', opis: ' + ' ' + obrazovanje.opis);
  }

  public updateObrazovanje(obrazovanje: Obrazovanje): void {
    this.httpClient.put(this.API_URL, obrazovanje).subscribe();
  }

  public deleteObrazovanje(id: number): void {
    console.log(this.API_URL + id); //da vidimo na konzoli sta se brise
    this.httpClient.delete(this.API_URL + id).subscribe();
  }

}
