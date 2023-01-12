import { CartItems } from './../models/cartItems';
import { AdditionalService } from './../models/additionalService';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdditionalServiceService {
  constructor(private _httpClient: HttpClient) {}

  getAdditionalServices(): Observable<AdditionalService[]> {
    return this._httpClient.get<AdditionalService[]>(
      'http://localhost:3000/additionalServices'
    );
  }

  addAdditionalService(
    additionalService: AdditionalService
  ): Observable<AdditionalService> {
    return this._httpClient.post<AdditionalService>(
      'http://localhost:3000/additionalServices',
      additionalService
    );
  }

  deleteAdditionalService(
    additionalServiceId: number
  ): Observable<AdditionalService> {
    return this._httpClient.delete<AdditionalService>(
      'http://localhost:3000/additionalServices/' + additionalServiceId
    );
  }

  updateAdditionalService(
    additionalService: AdditionalService
  ): Observable<AdditionalService> {
    return this._httpClient.put<AdditionalService>(
      'http://localhost:3000/additionalServices/' + additionalService.id,
      additionalService
    );
  }

  getAdditionalServiceById(
    additionalServiceId: number
  ): Observable<AdditionalService> {
    return this._httpClient.get<AdditionalService>(
      'http://localhost:3000/additionalServices/' + additionalServiceId
    );
  }

  addToCart(additionalService: AdditionalService, carId: number) {
    let cartItems = CartItems;
    let cartItem = cartItems.filter((item) => item.car.id == carId)[0];
    let additionalServiceItems = cartItem.additionalService;
    if (additionalServiceItems == undefined) {
      cartItem.additionalService = [];
    }
    cartItem.additionalService.push(additionalService);
    let additionalTotalPrice = 0;
    cartItem.additionalService.forEach((item) => {
      additionalTotalPrice = additionalTotalPrice + item.price;
    });
    cartItem.totalPrice = cartItem.car.dailyPrice + additionalTotalPrice;
  }

  removeAdditionalService(carId: number, additionalServiceId: number) {
    let cartItem = CartItems.filter((item) => item.car.id == carId)[0];
    cartItem.additionalService = cartItem.additionalService.filter(
      (item) => item.id != additionalServiceId
    );
    let additionalTotalPrice = 0;
    cartItem.additionalService.forEach((item) => {
      additionalTotalPrice = additionalTotalPrice + item.price;
    });
    cartItem.totalPrice = cartItem.car.dailyPrice + additionalTotalPrice;
  }
}
