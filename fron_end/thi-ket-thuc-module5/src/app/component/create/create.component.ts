import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Place} from "../../model/Place";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CarService} from "../../service/car.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  createForm: FormGroup;
  placeList: Place[];
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              private carService: CarService,
              private toasts: ToastrService) { }

  ngOnInit(): void {
    this.createForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      starTime: new FormControl('', [Validators.required]),
      endTime: new FormControl('', [Validators.required]),
      carType: new FormControl('', [Validators.required]),
      startingPoint: new FormControl('', [Validators.required]),
      destination: new FormControl('', [Validators.required]),
    });
    this.getPlaceList();
  }

  compareC(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.placeId === c2.placeId : c1 === c2;
  }

  compareFnG(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.placeId === c2.placeId : c1 === c2;
  }

  private getPlaceList() {
    this.carService.getAllLocation().subscribe(data => {
      this.placeList = data;
    });
  }

  onSubmit() {
    // if (this.createForm.valid) {
      const car = this.createForm.value;
      this.carService.save(car).subscribe(() => {
        this.snackBar.open("New car created.", "Close", {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: 'blue-snackbar'
        } )
        this.createForm.reset();
        this.router.navigateByUrl("/");
      }, e => {
        console.log(e);
      });
    // }
  }
}
