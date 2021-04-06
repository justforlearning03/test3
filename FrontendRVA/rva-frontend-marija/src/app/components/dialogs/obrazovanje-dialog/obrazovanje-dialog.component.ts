import { SektorService } from './../../../services/sektor.service';
import { Obrazovanje } from './../../../models/obrazovanje';
import { ObrazovanjeService } from './../../../services/obrazovanje.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {isNumeric} from 'src/app/functions/functions';
import {hasNumber} from 'src/app/functions/functions';

@Component({
  selector: 'app-obrazovanje-dialog',
  templateUrl: './obrazovanje-dialog.component.html',
  styleUrls: ['./obrazovanje-dialog.component.css']
})
export class ObrazovanjeDialogComponent implements OnInit {
  public flag: number;
  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ObrazovanjeDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Obrazovanje,
              public obrazovanjeService: ObrazovanjeService,

  ) { }

  ngOnInit() {

  }


  public add(): void{

    this.obrazovanjeService.addObrazovanje(this.data);
    this.snackBar.open('Uspešno dodato obrazovanje: ' + this.data.naziv, 'U redu', {
      duration: 2500
    });
  }

  public update(): void{
    this.obrazovanjeService.updateObrazovanje(this.data);
    this.snackBar.open('Uspešno modifikovano obrazovanje: ' + this.data.naziv, 'U redu', {
      duration: 1500
    });
  }

  public delete(): void{
    console.log('Brisanje obrazovanja koji ima id: ' + this.data.id);
    this.obrazovanjeService.deleteObrazovanje(this.data.id);
    this.snackBar.open('Uspešno obrisano obrazovanje: ' + this.data.naziv, 'U redu', {
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
