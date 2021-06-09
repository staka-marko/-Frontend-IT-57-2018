import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipRacuna } from 'src/app/models/tipRacuna';
import { TipRacunaService } from 'src/app/services/tip-racuna.service';

@Component({
  selector: 'app-tip-racuna-dialog',
  templateUrl: './tip-racuna-dialog.component.html',
  styleUrls: ['./tip-racuna-dialog.component.css']
})
export class TipRacunaDialogComponent implements OnInit {

  public flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<TipRacunaDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: TipRacuna,
              public tipRacunaService: TipRacunaService) { }

  ngOnInit(): void {
  }

  public add(): void{
    this.tipRacunaService.addTipRacuna(this.data)
    .subscribe(() => {
      this.snackBar.open('Uspješno dodat tip računa: ' + this.data.naziv, 'U redu',
      {duration: 2500});
    }),
    (error: Error) => {
      console.log(error.name + ' --> ' + error.message);
      this.snackBar.open('Dogodila se greška. Pokusajte ponovo!', 'Zatvori',
      {duration: 2500});
    };
  }

  public update(): void{
    this.tipRacunaService.updateTipRacuna(this.data)
      .subscribe(() =>{
        this.snackBar.open('Uspješno modifikovan tip računa: ' + this.data.naziv, 'U redu',
        {duration: 2500});
      }),
      (error: Error) => {
        console.log(error.name + ' --> ' + error.message);
        this.snackBar.open('Dogodila se greška. Pokušajte ponovo!', 'Zatvori',
        {duration: 2500});
      };
    }

    public delete(): void {
      this.tipRacunaService.deleteTipRacuna(this.data.id)
      .subscribe(() =>{
        this.snackBar.open('Uspješno obrisan tip računa', 'U redu',
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
