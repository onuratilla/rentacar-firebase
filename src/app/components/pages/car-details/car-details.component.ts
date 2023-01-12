import { Car } from './../../../models/car';
import { ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  cars: Car[];
  constructor(
    private _carService: CarService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCarDetailById();
  }
  getCarDetailById() {
    this._carService.getCars().subscribe((data) => {
      this._activatedRoute.params.subscribe((param) => {
        if (param['id']) {
          this.cars = data.filter((item) => item.id == param['id']);
        }
      });
    });
  }
}
