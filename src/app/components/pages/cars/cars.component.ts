import { CartService } from './../../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CarService } from './../../../services/car.service';
import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
})
export class CarsComponent implements OnInit {
  cars: Car[];
  deleteId = 0;
  selectedBrandId: number;
  constructor(
    private _carService: CarService,
    private _toastrService: ToastrService,
    private _modalService: NgbModal,
    private _activatedRoute: ActivatedRoute,
    private _brandService: BrandService,
    private _colorService: ColorService,
    private _cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getCar();
    this.getCarsByBrand();
  }
  getCar() {
    this._carService.getCars().subscribe((data) => {
      this.cars = data;
    });
  }
  deleteCarById(carId: number) {
    const source = timer(1000);
    this._carService.deleteCar(carId).subscribe((response) => {
      this.getCar();
      this._toastrService.error(
        ' Araç başarıyla silindi'
      );
      source.subscribe(() => {
        window.location.reload();
      });
    });
  }

  open(content, deleteId) {
    this.deleteId = deleteId;
    this._modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  getCarsByBrand() {
    this._carService.getCars().subscribe((data) => {
      this._activatedRoute.params.subscribe((param) => {
        if (param['id']) {
          this.cars = data.filter((item) => item.brandId == param['id']);
        } else {
          this.cars = data;
        }
      });
    });
  }

  getCarsByColor() {
    this._carService.getCars().subscribe((data) => {
      this._activatedRoute.params.subscribe((param) => {
        if (param['id']) {
          this.cars = data.filter((item) => item.colorId == param['id']);
        } else {
          this.cars = data;
        }
      });
    });
  }
  addToCart(car: Car) {
    this._cartService.addToCart(car);
    this._toastrService.success('Sepete eklendi');
  }
}
