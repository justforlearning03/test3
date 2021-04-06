  import { RadnikService } from './services/radnik.service';
  import { ObrazovanjeService } from './services/obrazovanje.service';

  import { AppRoutingModule } from './app-routing.module';
  import { BrowserModule } from '@angular/platform-browser';
  import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
  import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


  import { MatButtonModule } from '@angular/material/button';
  import { MatIconModule } from '@angular/material/icon';
  import { MatSidenavModule } from '@angular/material/sidenav';
  import { MatListModule } from '@angular/material/list';
  import { MatGridListModule } from '@angular/material/grid-list';
  import { MatExpansionModule } from '@angular/material/expansion';
  import { MatTableModule } from '@angular/material/table';
  import { MatInputModule } from '@angular/material/input';
  import { MatPaginatorModule } from '@angular/material/paginator';
  import { MatSortModule } from '@angular/material/sort';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatToolbarModule } from '@angular/material/toolbar';
  import { MatCheckboxModule } from '@angular/material/checkbox';
  import { MatDatepickerModule } from '@angular/material/datepicker';
  import { HttpClientModule } from '@angular/common/http';
  import { MatSelectModule } from '@angular/material/select';
  import { MatDialogModule } from '@angular/material/dialog';
  import { MatNativeDateModule } from '@angular/material/core';
  import { MatSnackBarModule } from '@angular/material/snack-bar';
  import { FormsModule } from '@angular/forms';
  import { AppComponent } from './app.component';

  import { HomeComponent } from './components/core/home/home.component';
  import { AuthorComponent } from './components/core/author/author.component';
  import { AboutComponent } from './components/core/about/about.component';

import { ObrazovanjeComponent } from './components/baza/obrazovanje/obrazovanje.component';
import { PreduzeceComponent } from './components/baza/preduzece/preduzece.component';
import { SektorComponent } from './components/baza/sektor/sektor.component';
import { RadnikComponent } from './components/baza/radnik/radnik.component';
import { RadnikDialogComponent } from './components/dialogs/radnik-dialog/radnik-dialog.component';
import { ObrazovanjeDialogComponent } from './components/dialogs/obrazovanje-dialog/obrazovanje-dialog.component';
import { PreduzeceDialogComponent } from './components/dialogs/preduzece-dialog/preduzece-dialog.component';
import { SektorDialogComponent } from './components/dialogs/sektor-dialog/sektor-dialog.component';


  @NgModule({
    declarations: [
      AppComponent,
      HomeComponent,
      AuthorComponent,
      AboutComponent,
      ObrazovanjeComponent,
      PreduzeceComponent,
      SektorComponent,
      RadnikComponent,
      RadnikDialogComponent,
      ObrazovanjeDialogComponent,
      PreduzeceDialogComponent,
      SektorDialogComponent

    ],
    imports: [
      AppRoutingModule,
      BrowserModule,
      BrowserAnimationsModule,
      MatButtonModule,
      MatIconModule,
      MatSidenavModule,
      MatListModule,
      MatGridListModule,
      MatExpansionModule,
      MatToolbarModule,
      MatNativeDateModule,
      MatFormFieldModule,
      MatInputModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatSnackBarModule,
      MatCheckboxModule,
      MatDialogModule,
      MatDatepickerModule,
      MatSelectModule,
      HttpClientModule,
      FormsModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
