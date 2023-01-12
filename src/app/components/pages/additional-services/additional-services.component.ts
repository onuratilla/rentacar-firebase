import { CartItems } from './../../../models/cartItems';
import { CartItem } from 'src/app/models/cartItem';
import { ActivatedRoute } from '@angular/router';
import { Car } from './../../../models/car';
import { CartService } from './../../../services/cart.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdditionalServiceService } from './../../../services/additional-service.service';
import { AdditionalService } from './../../../models/additionalService';
import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-additional-services',
  templateUrl: './additional-services.component.html',
  styleUrls: ['./additional-services.component.css'],
})
export class AdditionalServicesComponent implements OnInit {
  additionalServices: AdditionalService[];
  selectedCarId: number;
  cars: Car[];
  addedAdditionalServices: AdditionalService[] = [];
  deleteId: 0;
  constructor(
    private _additionalServiceService: AdditionalServiceService,
    private _toastrService: ToastrService,
    private _modalService: NgbModal,
    private _activatedRoute: ActivatedRoute,
    private _carService: CarService
  ) {}

  ngOnInit(): void {
    this.getAdditionalService();
    this.getCarById();
  }

  getAdditionalService() {
    this._additionalServiceService.getAdditionalServices().subscribe((data) => {
      this.additionalServices = data;
    });
  }

  deleteAdditionalServiceById(additionalServiceId: number) {
    const source = timer(1000);
    this._additionalServiceService
      .deleteAdditionalService(additionalServiceId)
      .subscribe((response) => {
        this.getAdditionalService();
        this._toastrService.error(
          'Ek hizmet başarıyla silindi.'
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

  getCarById() {
    this._carService.getCars().subscribe((data) => {
      this._activatedRoute.params.subscribe((param) => {
        if (param['id']) {
          this.cars = data.filter((x) => x.id == param['id']);
          this.selectedCarId = param['id'];
          this.getAdditionalServiceItems();
        }
      });
    });
  }
  getAdditionalServiceItems() {
    this.addedAdditionalServices = CartItems.filter(
      (item) => item.car.id == this.selectedCarId
    )[0].additionalService;
  }

  addToCart(additionalService: AdditionalService) {
    this._additionalServiceService.addToCart(
      additionalService,
      this.selectedCarId
    );
    this.getAdditionalServiceItems();
  }

  isAdded(additionalServiceId: number): boolean {
    if (this.addedAdditionalServices != undefined) {
      let additionalServiceList = this.addedAdditionalServices.filter(
        (item) => item.id == additionalServiceId
      );
      if (additionalServiceList.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  removeAdditionalService(additioanlServiceId: number) {
    this._additionalServiceService.removeAdditionalService(
      this.selectedCarId,
      additioanlServiceId
    );
    this.getAdditionalServiceItems();
  }
}
