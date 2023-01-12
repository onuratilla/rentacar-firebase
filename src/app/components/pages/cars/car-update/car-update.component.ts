import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm = new FormGroup({
    id: new FormControl(0, [Validators.required]),
    image: new FormControl('', [Validators.required]),
    brandId: new FormControl('', [Validators.required]),
    brandName: new FormControl('', [Validators.required]),
    colorId: new FormControl('', [Validators.required]),
    colorName: new FormControl('', [Validators.required]),
    dailyPrice: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  constructor(
    public servis: DataService,
    private _carService: CarService,
    private _activatedRoute: ActivatedRoute,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCarById();
  }
  getCarById() {
    this._activatedRoute.params.subscribe((params) => {
      if (params['id'])
        this._carService.getCarById(params['id']).subscribe((data) => {
          this.carUpdateForm.controls['id'].setValue(data.id);
          this.carUpdateForm.controls['image'].setValue(data.image);
          this.carUpdateForm.controls['brandId'].setValue(data.brandId);
          this.carUpdateForm.controls['brandName'].setValue(data.brandName);
          this.carUpdateForm.controls['colorId'].setValue(data.colorId);
          this.carUpdateForm.controls['colorName'].setValue(data.colorName);
          this.carUpdateForm.controls['dailyPrice'].setValue(data.dailyPrice);
          this.carUpdateForm.controls['description'].setValue(data.description);
        });
    });
  }
  update() {
    const source = timer(1000);
    if (this.carUpdateForm.valid) {
      this._carService.updateCar(this.carUpdateForm.value).subscribe((data) => {
        this._toastrService.warning(
          data.brandName + ' ' + data.colorName + ' ' + ' başarıyla güncellendi'
        );
        source.subscribe(() => {
          window.location.reload();
        });
      });
    }
  }
}
