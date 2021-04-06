import { ObrazovanjeService } from './../../../services/obrazovanje.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Obrazovanje } from './../../../models/obrazovanje';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';
import { ObrazovanjeDialogComponent } from '../../dialogs/obrazovanje-dialog/obrazovanje-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-obrazovanje',
  templateUrl: './obrazovanje.component.html',
  styleUrls: ['./obrazovanje.component.css']
})
export class ObrazovanjeComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'opis', 'stepenStrucneSpreme', 'actions'];
  dataSource: MatTableDataSource<Obrazovanje>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private obrazovanjeService: ObrazovanjeService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    this.obrazovanjeService.getAllObrazovanje().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
     //getObrazovanje veaca Observable //svaki data koji bude vracen, vracamo u dataSource
    //svaki put kad nam ovaj string vrati neki podatak, on se dodaje kao novi red u tabeli.

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  public openDialog(flag: number, id?: number, naziv?: string, opis?: string, stepenStrucneSpreme?: string){
    const dialogRef = this.dialog.open(ObrazovanjeDialogComponent,
      {data: {id: id, naziv: naziv, opis: opis, stepenStrucneSpreme: stepenStrucneSpreme}}
      );
  dialogRef.componentInstance.flag = flag;

  dialogRef.afterClosed().subscribe(result => {
    if (result ===1){
      this.loadData();
    }
   } );
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

}
