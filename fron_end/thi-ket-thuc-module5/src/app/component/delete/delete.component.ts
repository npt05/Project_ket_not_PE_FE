import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CarService} from "../../service/car.service";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  name;
  id;

  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private matSnackBar: MatSnackBar,
              private carService: CarService) {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.name = this.data.car.name;
    this.id = this.data.car.id;
  }

  delete() {
    this.carService.delete(this.id).subscribe(data => {
      this.dialogRef.close();
      this.matSnackBar.open("Delete thành công", "OK", {
        duration: 3500,
        panelClass: "red-snackbar",
        verticalPosition: 'top'
      })
    });
  }
}
