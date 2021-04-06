import { SektorService } from './../../../services/sektor.service';
import { ObrazovanjeService } from './../../../services/obrazovanje.service';
import { Radnik } from './../../../models/radnik';
import { RadnikService } from './../../../services/radnik.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Obrazovanje } from 'src/app/models/obrazovanje';
import { Sektor } from 'src/app/models/sektor';
import {isNumeric} from 'src/app/functions/functions';
import {hasNumber} from 'src/app/functions/functions';

@Component({
  selector: 'app-radnik-dialog',
  templateUrl: './radnik-dialog.component.html',
  styleUrls: ['./radnik-dialog.component.css']
})
export class RadnikDialogComponent implements OnInit {
  obrazovanja: Obrazovanje[];
  sektori: Sektor[];
  public flag: number;
  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<RadnikDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Radnik,
              public radnikService: RadnikService,
              public obrazovanjeService: ObrazovanjeService,
              public sektorService: SektorService
  ) { }

  ngOnInit() {
    this.obrazovanjeService.getAllObrazovanje().subscribe(obrazovanja =>
      this.obrazovanja = obrazovanja);

    this.sektorService.getAllSektor().subscribe(sektori =>
      this.sektori = sektori);
  }


  public add(): void{

    if (isNumeric(this.data.brojLk) && !hasNumber(this.data.ime) && !hasNumber(this.data.prezime))
    {
    this.radnikService.addRadnik(this.data);
    this.snackBar.open('Uspešno dodat radnik: ' + this.data.ime + ' ' + this.data.prezime, 'U redu', {
      duration: 2500
    });
    }
    else{
      this.snackBar.open('Podaci koje ste uneli nisu validni. Br. lk. treba da bude ceo broj, ime i prezime ne treba da sadrze brojeve. ', 'U redu', {
        duration: 3500
      });
    }
  }

  public update(): void{
    this.radnikService.updateRadnik(this.data);
    this.snackBar.open('Uspešno modifikovan radnik: ' + this.data.ime + ' ' + this.data.prezime, 'U redu', {
      duration: 1500
    });
  }

  public delete(): void{
    console.log('Brisanje radnika koji ima id: ' + this.data.id);
    this.radnikService.deleteRadnik(this.data.id);
    this.snackBar.open('Uspešno obrisan radnik: ' + this.data.ime + ' ' + this.data.prezime, 'U redu', {
      duration: 1500
    });
  }

  public cancel(): void{
    this.dialogRef.close();
    this.snackBar.open('Odustali ste.', 'U redu', {
      duration: 500
    });
  }


  compareTo(a, b) {
    return a.id == b.id;
  }

}
