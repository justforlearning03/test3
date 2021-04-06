import { PreduzeceService } from './../../../services/preduzece.service';
import { Preduzece } from './../../../models/preduzece';
import { Component, OnInit, Inject } from '@angular/core';
import { SektorService } from './../../../services/sektor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sektor } from 'src/app/models/sektor';
import {isNumeric} from 'src/app/functions/functions';
import {hasNumber} from 'src/app/functions/functions';

@Component({
  selector: 'app-sektor-dialog',
  templateUrl: './sektor-dialog.component.html',
  styleUrls: ['./sektor-dialog.component.css']
})
export class SektorDialogComponent implements OnInit {

  preduzeca: Preduzece[];

  public flag: number;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SektorDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Sektor,
    public sektorService: SektorService,
    public preduzeceService: PreduzeceService
) { }

  ngOnInit(): void {
    this.preduzeceService.getAllPreduzece().subscribe(preduzeca =>
      this.preduzeca = preduzeca);
  }


  public add(): void{
    this.sektorService.addSektor(this.data);
    this.snackBar.open('Uspešno dodat sektor: ' + this.data.naziv, 'U redu', {
      duration: 2500
    });
  }

  public update(): void{
    this.sektorService.updateSektor(this.data);
    this.snackBar.open('Uspešno modifikovan sektor: ' + this.data.naziv, 'U redu', {
      duration: 1500
    });
  }

  public delete(): void{
    console.log('Brisanje sektora koji ima id: ' + this.data.id);
    this.sektorService.deleteSektor(this.data.id);
    this.snackBar.open('Uspešno obrisan sektor: ' + this.data.naziv, 'U redu', {
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

