import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const API_CAR = 'http://localhost:8080/car';
const API_LOCATION = 'http://localhost:8080/location';
@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(public httpClient: HttpClient) {
  }

  getAllCar(page: number): Observable<any> {
    return this.httpClient.get<any>(API_CAR + '?page=' + page);
  }

  save(car): Observable<any> {
    return this.httpClient.post<any>(API_CAR, car);
  }

  edit(id: number, car): Observable<any> {
    return this.httpClient.put<any>(API_CAR + '/' + id, car);
  }
  getAllLocation(): Observable<any> {
    return this.httpClient.get<any>(API_LOCATION);
  }

  findById(id: number): Observable<any> {
    return this.httpClient.get<any>(API_CAR + '/' + id);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(API_CAR + '/' + id);
  }

}
