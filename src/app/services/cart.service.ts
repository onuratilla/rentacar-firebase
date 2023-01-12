import { CartItem } from 'src/app/models/cartItem';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Injectable } from '@angular/core';
import { CartItems } from '../models/cartItems';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _toastrService: ToastrService) {}

  addToCart(car: Car) {
    let item = CartItems.find((c) => c.car.id === car.id);
    if (item) {
      alert('araç zaten eklendi');
    } else {
      let cartItem = new CartItem();
      cartItem.car = car;
      cartItem.totalPrice = car.dailyPrice;
      CartItems.push(cartItem);
    }
  }

  removeFromCart(car: Car) {
    let item: CartItem = CartItems.find((c) => c.car.id === car.id);
    CartItems.splice(CartItems.indexOf(item), 1);
  }

  list(): CartItem[] {
    return CartItems;
  }
}
