import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { InactivityWarningComponent } from './inactivity-warning/inactivity-warning.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';

@NgModule({
  declarations: [InactivityWarningComponent, ConfirmDialogComponent, MessageDialogComponent],
  exports: [InactivityWarningComponent, ConfirmDialogComponent],
  imports: [MaterialModule],
  providers: [],
})
export class CommonsModule {}
