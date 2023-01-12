import { HttpClient } from '@angular/common/http';
import { Car } from './../models/car';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private _httpClient: HttpClient) {}

  getCars(): Observable<Car[]> {
    return this._httpClient.get<Car[]>('http://localhost:3000/cars');
  }
  addCar(car: Car): Observable<Car> {
    return this._httpClient.post<Car>('http://localhost:3000/cars/', car);
  }
  deleteCar(carId: number): Observable<Car> {
    return this._httpClient.delete<Car>('http://localhost:3000/cars/' + carId);
  }
  updateCar(car: Car): Observable<Car> {
    return this._httpClient.put<Car>(
      'http://localhost:3000/cars/' + car.id,
      car
    );
  }
  getCarById(carId: number): Observable<Car> {
    return this._httpClient.get<Car>('http://localhost:3000/cars/' + carId);
  }
}
