import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
} from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { CustomDateAdapter } from './custom-adapter';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextFieldModule } from '@angular/cdk/text-field';
import {
  MAT_CHIPS_DEFAULT_OPTIONS,
  MatChipsModule,
} from '@angular/material/chips';
import {
  RECAPTCHA_V3_SITE_KEY,
  RecaptchaModule,
  RecaptchaV3Module,
} from 'ng-recaptcha';
import { CustomMatPaginatorIntl } from './custom-paginator-intl';
import { CUSTOM_DATE_FORMATS } from './custom-date-formats';
import { COMMA, SPACE, ENTER } from '@angular/cdk/keycodes';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSortModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatListModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatCardModule,
    MatGridListModule,
    MatTabsModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    // RecaptchaV3Module,
    TextFieldModule,
    MatChipsModule,
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSortModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatListModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatCardModule,
    MatGridListModule,
    MatTabsModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    TextFieldModule,
    MatChipsModule,
    MatCheckboxModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: DateAdapter, useClass: CustomDateAdapter },
    // {
    //   provide: RECAPTCHA_V3_SITE_KEY,
    //   useValue: '6LcKTmQqAAAAAM32sqcrBAHE7beoUKhKV6-xmRHr',
    // }, // Proporciona la clave del sitio
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl },
    // { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },

    // { provide: DateAdapter, useClass: CustomDateAdapter },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: { date: 'dd/MM/yyyy' },
        display: { date: 'dd/MM/yyyy' },
      },
    },
    {
      provide: MAT_CHIPS_DEFAULT_OPTIONS,
      useValue: {
        separatorKeyCodes: [COMMA, SPACE, ENTER],
      },
    },
    // { provide: DateAdapter, useClass: CustomDateAdapter },
    // { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
  ],
})
export class MaterialModule {}
