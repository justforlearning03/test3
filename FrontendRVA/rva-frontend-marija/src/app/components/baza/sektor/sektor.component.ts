import { SektorService } from './../../../services/sektor.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Radnik } from './../../../models/radnik';
import { Obrazovanje } from './../../../models/obrazovanje';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';
import { Sektor } from 'src/app/models/sektor';
import { MatDialog } from '@angular/material/dialog';
import { SektorDialogComponent } from '../../dialogs/sektor-dialog/sektor-dialog.component';
import { Preduzece } from 'src/app/models/preduzece';

@Component({
  selector: 'app-sektor',
  templateUrl: './sektor.component.html',
  styleUrls: ['./sektor.component.css']
})
export class SektorComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'oznaka', 'preduzece', 'actions'];

  dataSource: MatTableDataSource<Sektor>;

  selektovanSektor: Sektor;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public sektorService: SektorService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
   this.sektorService.getAllSektor().subscribe(data => {
     this.dataSource = new MatTableDataSource(data);

     // pretraga po nazivu ugnježdenog objekta
     this.dataSource.filterPredicate = (data, filter: string) => {
       const accumulator = (currentTerm, key) => {
         return key === 'preduzece' ? currentTerm + data.preduzece.naziv : currentTerm + data[key];
       };
       const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
       const transformedFilter = filter.trim().toLowerCase();
       return dataStr.indexOf(transformedFilter) !== -1;
     };

      // sortiranje po nazivu ugnježdenog objekta
     this.dataSource.sortingDataAccessor = (data, property) => {
       switch (property) {
         case 'preduzece': return data.preduzece.naziv.toLocaleLowerCase();
         default: return data[property];
       }
     };

     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
   });

  }

  public openDialog(flag: number, id?: number, naziv?: string, oznaka?: string, preduzece?: Preduzece ) {
    const dialogRef = this.dialog.open(SektorDialogComponent,
       { data: { id, naziv, oznaka, preduzece  } });
    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1){
         this.loadData();
      }

    });
  }

  selectRow(row: any){
   this.selektovanSektor = row;
  }

  applyFilter(filterValue: string){
   filterValue = filterValue.trim();
   filterValue = filterValue.toLocaleLowerCase();
   this.dataSource.filter = filterValue;
 }
}
