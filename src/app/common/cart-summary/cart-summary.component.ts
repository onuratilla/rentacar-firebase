import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CartItem } from 'src/app/models/cartItem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css'],
})
export class CartSummaryComponent implements OnInit {
  cartItems: CartItem[] = [];
  constructor(
    private _cartService: CartService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCart();
  }
  getCart() {
    this.cartItems = this._cartService.list();
  }

  removeFromCart(car: Car) {
    this._cartService.removeFromCart(car);
    this._toastrService.error('Silindi', car.brandName + ' sepetten silindi.');
  }
}
