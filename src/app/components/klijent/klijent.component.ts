import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Klijent } from 'src/app/models/klijent';
import { Kredit } from 'src/app/models/kredit';
import { KlijentService } from 'src/app/services/klijent.service';
import { KlijentDialogComponent } from '../dialogs/klijent-dialog/klijent-dialog.component';

@Component({
  selector: 'app-klijent',
  templateUrl: './klijent.component.html',
  styleUrls: ['./klijent.component.css']
})
export class KlijentComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'ime', 'prezime', 'brojLk', 'kredit', 'actions'];
  dataSource: MatTableDataSource<Klijent>;
  selektovaniKlijent: Klijent;
  klijentSubscription: Subscription;
  @ViewChild(MatSort, {static:false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private klijentService: KlijentService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void{
    this.klijentSubscription.unsubscribe();
  }

  compareTo(a,b) {
    return a.id = b.id;
  }

  public loadData() {
    this.klijentSubscription = this.klijentService.getAllKlijenti()
    .subscribe((data) => {
       this.dataSource = new MatTableDataSource(data);

        this.dataSource.filterPredicate = (data, filter: string) => {
          const accumulator = (currentTerm, key) => {
            return key === 'kredit' ? currentTerm + data.kredit.naziv : currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

        this.dataSource.sortingDataAccessor = (data, property) => {
          switch (property) {
            case 'kredit': return data.kredit.naziv.toLocaleLowerCase();
            default: return data[property];
          }
        };

       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
    }),
    (error:Error) => {
      console.log(error.name + ' ' + error.message);
    }
  }

  public openDialog(flag: number, id?: number, ime?: string, prezime?: string, brojLk?: number, kredit?:Kredit){
    const dialogRef = this.dialog.open(KlijentDialogComponent, {data: {id, ime, prezime, brojLk, kredit}});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed()
      .subscribe(result => {
        if(result===1) {
          this.loadData();
        }
      })
  }

  selectRow(row: any){
    this.selektovaniKlijent = row;
    console.log(this.selektovaniKlijent);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

}

