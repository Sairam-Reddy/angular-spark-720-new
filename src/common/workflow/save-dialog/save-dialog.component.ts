import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "save-dialog",
  templateUrl: "save-dialog.component.html"
})
export class SaveDialogComponent {
  constructor(public dialogRef: MatDialogRef<SaveDialogComponent>) {}

  public onCancel(): void {
    this.dialogRef.close(false);
  }

  public onApply(): void {
    this.dialogRef.close(true);
  }
}
