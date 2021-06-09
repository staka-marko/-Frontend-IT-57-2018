import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/core/home/home.component';
import { AuthorComponent } from './components/core/author/author.component';
import { AboutComponent } from './components/core/about/about.component';
import { TipRacunaComponent } from './components/tip-racuna/tip-racuna.component';
import { KreditComponent } from './components/kredit/kredit.component';
import { KlijentComponent } from './components/klijent/klijent.component';
import { RacunComponent } from './components/racun/racun.component';
import { TipRacunaDialogComponent } from './components/dialogs/tip-racuna-dialog/tip-racuna-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { KreditDialogComponent } from './components/dialogs/kredit-dialog/kredit-dialog.component';
import { KlijentDialogComponent } from './components/dialogs/klijent-dialog/klijent-dialog.component';
import { RacunDialogComponent } from './components/dialogs/racun-dialog/racun-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthorComponent,
    AboutComponent,
    TipRacunaComponent,
    KreditComponent,
    KlijentComponent,
    RacunComponent,
    TipRacunaDialogComponent,
    KreditDialogComponent,
    KlijentDialogComponent,
    RacunDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatTableModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
    MatNativeDateModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
