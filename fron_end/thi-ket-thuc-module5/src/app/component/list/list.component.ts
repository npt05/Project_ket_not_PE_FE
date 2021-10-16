import {Component, OnInit} from '@angular/core';
import {CarService} from "../../service/car.service";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {DeleteComponent} from "../delete/delete.component";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  page: number;
  totalPage = 0;

  cars: any;

  constructor(private carService: CarService,
              public dialog: MatDialog,
              private toast: ToastrService,) {
  }

  ngOnInit(): void {
    this.page = 0;
    this.getAllCar(this.page);
  }



  getAllCar(page: number) {
    this.carService.getAllCar(page).subscribe(value => {
      this.cars = value.content;
      this.totalPage = value.totalPages;
    }, error => {
      this.toast.error('No data found', 'message error');
    });
  }

  toPage(page: number) {
    if (page < this.totalPage && page >= 0) {
      this.page = page;
    } else {
      if (page != -1) {
        this.toast.warning('Request to enter the number of pages in the list', 'massage search page');
        this.getAllCar(this.page);
      }
    }
  }

  nextPage() {
    if (this.page < this.totalPage - 1) {
      this.page++;
    }
    console.log(this.page);
    this.getAllCar(this.page);
  }

  previousPage() {
    if (this.page > 0) {
      this.page--;
    } else {
      this.page = 0;
    }
    console.log(this.page);
    this.getAllCar(this.page);
  }
  firstPage() {
    this.page = 0;
    this.getAllCar(this.page);
  }
  lastPage() {
    if (this.page == this.totalPage - 1) {
      this.toast.info('You are on the last page', 'message last page');
    } else {
      this.page = this.totalPage - 1;
      this.getAllCar(this.page);
    }
  }

  deleteDialog(id: any): void {
    this.carService.findById(id).subscribe(data => {
      const dialogRef = this.dialog.open(DeleteComponent, {
        width: '500px',
        data: {car: data},
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.ngOnInit();
      });
    });
  }
}
