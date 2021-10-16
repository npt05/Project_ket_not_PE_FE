import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CarService} from "../../service/car.service";
import {ToastrService} from "ngx-toastr";
import {Car} from "../../model/Car";
import {Place} from "../../model/Place";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editForm: FormGroup;
  id: number;
  placeList: Place[];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              private carService: CarService,
              private toasts: ToastrService) {
    this.id = Number(this.activatedRoute.snapshot.params.id);
    this.editForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      starTime: new FormControl('', [Validators.required]),
      endTime: new FormControl('', [Validators.required]),
      carType: new FormControl('', [Validators.required]),
      startingPoint: new FormControl('', [Validators.required]),
      destination: new FormControl('', [Validators.required]),
    });
    this.getCar(this.id);
  }

  ngOnInit(): void {
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

  edit() {
    if (this.editForm.valid) {
      const car = this.editForm.value;
      this.carService.edit(car.id, car).subscribe(data => {
        console.log(data);
          this.router.navigateByUrl('/');
          this.toasts.success('Edit successfully.', 'Notify');
      }, error => {
        if(error.status === 400){
          console.log(error)
          this.toasts.error('Errors 1', 'Notify');
        }
        if(error.status === 500){
          this.toasts.error('Errors 2', 'Notify');
        }
      });
    }
  }

  getCar(id: number) {
    this.carService.findById(id).subscribe(data => {
      this.editForm.setValue(data);
    });
  }
}
