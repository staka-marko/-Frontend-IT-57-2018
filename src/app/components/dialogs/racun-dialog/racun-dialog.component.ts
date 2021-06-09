import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Racun } from 'src/app/models/racun';
import { TipRacuna } from 'src/app/models/tipRacuna';
import { RacunService } from 'src/app/services/racun.service';
import { TipRacunaService } from 'src/app/services/tip-racuna.service';

@Component({
  selector: 'app-racun-dialog',
  templateUrl: './racun-dialog.component.html',
  styleUrls: ['./racun-dialog.component.css']
})
export class RacunDialogComponent implements OnInit {

  tipRacuna: TipRacuna[];
  public flag: number;

  constructor(public snackBar: MatSnackBar,
            public dialogRef: MatDialogRef<RacunDialogComponent>,
            @Inject (MAT_DIALOG_DATA) public data: Racun,
            public racunService: RacunService,
            public tipRacunaService: TipRacunaService) { }

  ngOnInit(): void {
    this.tipRacunaService.getAllTipoviRacuna()
    .subscribe(tipRacuna => {
      this.tipRacuna = tipRacuna;
    }),
    (error: Error) => {
      console.log(error.name + ' --> ' + error.message);
      this.snackBar.open('Dogodila se greška. Pokusajte ponovo!', 'Zatvori',
      {duration: 2500});
    };
  }

  compareTo(a, b) {
    return a.id == b.id;
  }

  public add(): void{
    this.racunService.addRacuna(this.data)
    .subscribe(() => {
      this.snackBar.open('Uspješno dodat račun: ' + this.data.naziv, 'U redu',
      {duration: 2500});
    }),
    (error: Error) => {
      console.log(error.name + ' --> ' + error.message);
      this.snackBar.open('Dogodila se greška. Pokusajte ponovo!', 'Zatvori',
      {duration: 2500});
    };
  }

  public update(): void{
    this.racunService.updateRacuna(this.data)
      .subscribe(() =>{
        this.snackBar.open('Uspješno modifikovan račun: ' + this.data.naziv, 'U redu',
        {duration: 2500});
      }),
      (error: Error) => {
        console.log(error.name + ' --> ' + error.message);
        this.snackBar.open('Dogodila se greška. Pokušajte ponovo!', 'Zatvori',
        {duration: 2500});
      };
    }

    public delete(): void {
      this.racunService.deleteRacuna(this.data.id)
      .subscribe(() =>{
        this.snackBar.open('Uspješno obrisan račun', 'U redu',
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
