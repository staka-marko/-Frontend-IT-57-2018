import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Klijent } from 'src/app/models/klijent';
import { Kredit } from 'src/app/models/kredit';
import { KlijentService } from 'src/app/services/klijent.service';
import { KreditService } from 'src/app/services/kredit.service';

@Component({
  selector: 'app-klijent-dialog',
  templateUrl: './klijent-dialog.component.html',
  styleUrls: ['./klijent-dialog.component.css']
})
export class KlijentDialogComponent implements OnInit, OnDestroy {

  krediti: Kredit[];
  public flag: number;
  kreditSubscription: Subscription;

  constructor(public snackBar: MatSnackBar,
             public dialogRef: MatDialogRef<KlijentDialogComponent>,
             @Inject (MAT_DIALOG_DATA) public data: Klijent,
             public klijentService: KlijentService,
             public kreditService: KreditService) { }

  ngOnInit(): void {
    this.kreditSubscription = this.kreditService.getAllKrediti()
    .subscribe(krediti =>{
      this.krediti = krediti
    }),
    (error: Error) => {
      console.log(error.name + ' --> ' + error.message);
    };
  }

  ngOnDestroy(): void {
    this.kreditSubscription.unsubscribe();
  }

  compareTo(a, b) {
    return a.id == b.id;
  }

  public add(): void{
    this.klijentService.addKlijent(this.data)
    .subscribe(() => {
      this.snackBar.open('Uspješno dodat klijent: ' + this.data.ime + ' ' + this.data.prezime, 'U redu',
      {duration: 2500});
    }),
    (error: Error) => {
      console.log(error.name + ' --> ' + error.message);
      this.snackBar.open('Dogodila se greška. Pokusajte ponovo!', 'Zatvori',
      {duration: 2500});
    };
  }

  public update(): void{
    this.klijentService.updateKlijent(this.data)
      .subscribe(() =>{
        this.snackBar.open('Uspješno modifikovan klijent: ' + this.data.ime + ' ' + this.data.prezime, 'U redu',
        {duration: 2500});
      }),
      (error: Error) => {
        console.log(error.name + ' --> ' + error.message);
        this.snackBar.open('Dogodila se greška. Pokušajte ponovo!', 'Zatvori',
        {duration: 2500});
      };
    }

    public delete(): void {
      this.klijentService.deleteKlijent(this.data.id)
      .subscribe(() =>{
        this.snackBar.open('Uspješno obrisan klijent', 'U redu',
        {duration: 2500});
      }),
      (error: Error) => {
        console.log(error.name + ' --> ' + error.message);
        this.snackBar.open('Dogodila se greška. Pokušajte ponovo!', 'Zatvori',
        {duration: 2500});
      };
    }

    public cancel(): void {
      this.dialogRef.close();
      this.snackBar.open('Odustali ste od ove aktivnosti', 'U redu',
      {duration: 1000});
    }

}
