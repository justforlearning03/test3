import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Sektor } from '../models/sektor';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SektorService {

  private readonly API_URL = 'http://localhost:8083/sektor/';

  dataChange: BehaviorSubject<Sektor[]> = new BehaviorSubject<Sektor[]>([]);

  constructor(private httpClient: HttpClient) { }

  public getAllSektor(): Observable<Sektor[]> {
    this.httpClient.get<Sektor[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    },
    (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    });

    return this.dataChange.asObservable();
  }

  public addSektor(sektor: Sektor): void{
    sektor.id = 0;
    this.httpClient.post(this.API_URL, sektor).subscribe();
    console.log('Dodat je sektor: ' + sektor.naziv + ' oznaka:' + sektor.oznaka);
  }

  public updateSektor(sektor: Sektor): void {
    this.httpClient.put(this.API_URL, sektor).subscribe();
  }

  public deleteSektor(id: number): void {
    console.log(this.API_URL + id); //da vidimo na konzoli sta se brise
    this.httpClient.delete(this.API_URL + id).subscribe();
  }

}
