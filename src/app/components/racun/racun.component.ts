import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Klijent } from 'src/app/models/klijent';
import { Racun } from 'src/app/models/racun';
import { TipRacuna } from 'src/app/models/tipRacuna';
import { RacunService } from 'src/app/services/racun.service';
import { RacunDialogComponent } from '../dialogs/racun-dialog/racun-dialog.component';

@Component({
  selector: 'app-racun',
  templateUrl: './racun.component.html',
  styleUrls: ['./racun.component.css']
})
export class RacunComponent implements OnInit, OnChanges {

  displayedColumns = ['id', 'naziv', 'oznaka', 'opis', 'tipRacuna', 'klijent', 'actions'];
  dataSource: MatTableDataSource<Racun>;
  subscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() selektovaniKlijent: Klijent;

  constructor(private racunService : RacunService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    //console.log('Selektovani klijent: ' + this.selektovaniKlijent);
    //this.loadData();
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnChanges(): void {
    if(this.selektovaniKlijent.id) {
      this.loadData();
    }
  }

  public loadData() {
    this.subscription = this.racunService.getRacuniZaKlijenta(this.selektovaniKlijent.id)
    .subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

              // pretraga po nazivu ugnježdenog objekta
              this.dataSource.filterPredicate = (data, filter: string) => {
                const accumulator = (currentTerm, key) => {
                  return key === 'tipRacuna' ? currentTerm + data.tipRacuna.naziv : currentTerm + data[key];
                };
                const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
                const transformedFilter = filter.trim().toLowerCase();
                return dataStr.indexOf(transformedFilter) !== -1;
              };

              // sortiranje po nazivu ugnježdenog objekta
              this.dataSource.sortingDataAccessor = (data, property) => {
                switch (property) {
                  case 'tipRacuna': return data.tipRacuna.naziv.toLocaleLowerCase();
                  default: return data[property];
                }
              };

              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;

    }),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
    }
  }

  public openDialog(flag:number, id?: number, naziv?: string, oznaka?: string, opis?: string, tipRacuna?: TipRacuna, klijent?: Klijent) {
    const dialogRef = this.dialog.open(RacunDialogComponent, {
      data: {id, naziv, oznaka, opis, tipRacuna, klijent}
    });
    dialogRef.componentInstance.flag = flag;
    if(flag===1) {
      dialogRef.componentInstance.data.klijent = this.selektovaniKlijent;
    }
    dialogRef.afterClosed()
    .subscribe(result => {
      if(result === 1) {
        this.loadData();
      }
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }


}

