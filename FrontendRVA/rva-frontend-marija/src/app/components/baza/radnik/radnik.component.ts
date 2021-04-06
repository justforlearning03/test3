import { SektorService } from './../../../services/sektor.service';
import { Sektor } from './../../../models/sektor';
import { RadnikDialogComponent } from './../../dialogs/radnik-dialog/radnik-dialog.component';
import { RadnikService } from './../../../services/radnik.service';
import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Radnik } from './../../../models/radnik';
import { Obrazovanje } from './../../../models/obrazovanje';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { BindingFlags } from '@angular/compiler/src/core';

@Component({
  selector: 'app-radnik',
  templateUrl: './radnik.component.html',
  styleUrls: ['./radnik.component.css']
})
export class RadnikComponent implements OnInit, OnChanges {

  displayedColumns = ['id', 'ime', 'prezime', 'brojLk', 'obrazovanje', /*'sektor',*/ 'actions'];

  dataSource: MatTableDataSource<Radnik>;

  @Input() selektovanSektor: Sektor;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public radnikService: RadnikService,
              public dialog: MatDialog) { }

  ngOnInit() {

  }

  ngOnChanges() {
    if (this.selektovanSektor.id) {
      debugger;
      this.loadData();
    }
  }

  public loadData() {
    this.radnikService.getRadniciZaSektorId(this.selektovanSektor.id)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        // pretraga po nazivu ugnježdenog objekta
        this.dataSource.filterPredicate = (data, filter: string) => {
          const accumulator = (currentTerm, key) => {
            return key === 'obrazovanje' ? currentTerm + data.obrazovanje.naziv : currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

        // sortiranje po nazivu ugnježdenog objekta
        this.dataSource.sortingDataAccessor = (data, property) => {
          switch (property) {
            case 'obrazovanje': return data.obrazovanje.naziv.toLocaleLowerCase();
            default: return data[property];
          }
        };

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

  }

  public openDialog(flag: number, id?: number, ime?: string, prezime?: string, brojLk?: number,cena?: number, obrazovanje?: Obrazovanje, sektor?: Sektor) {
    const dialogRef = this.dialog.open(RadnikDialogComponent, {
      data: { id, ime, prezime, brojLk, obrazovanje, sektor}
    });
    dialogRef.componentInstance.flag = flag;
    if (flag === 1) {
      dialogRef.componentInstance.data.sektor = this.selektovanSektor;
    }

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }
}
