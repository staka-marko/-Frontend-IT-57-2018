import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Kredit } from 'src/app/models/kredit';
import { KreditService } from 'src/app/services/kredit.service';

@Component({
  selector: 'app-kredit-dialog',
  templateUrl: './kredit-dialog.component.html',
  styleUrls: ['./kredit-dialog.component.css']
})
export class KreditDialogComponent implements OnInit {


  public flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<KreditDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Kredit,
              public kreditService: KreditService) { }

  ngOnInit(): void {
  }

  public add(): void{
    this.kreditService.addKredit(this.data)
    .subscribe(() => {
      this.snackBar.open('Uspješno dodat kredit: ' + this.data.naziv, 'U redu',
      {duration: 2500});
    }),
    (error: Error) => {
      console.log(error.name + ' --> ' + error.message);
      this.snackBar.open('Dogodila se greška. Pokusajte ponovo!', 'Zatvori',
      {duration: 2500});
    };
  }

  public update(): void{
    this.kreditService.updateKredit(this.data)
      .subscribe(() =>{
        this.snackBar.open('Uspješno modifikovan kredit: ' + this.data.naziv, 'U redu',
        {duration: 2500});
      }),
      (error: Error) => {
        console.log(error.name + ' --> ' + error.message);
        this.snackBar.open('Dogodila se greška. Pokušajte ponovo!', 'Zatvori',
        {duration: 2500});
      };
    }

    public delete(): void {
      this.kreditService.deleteKredit(this.data.id)
      .subscribe(() =>{
        this.snackBar.open('Uspješno obrisan kredit', 'U redu',
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
