import { DataService } from 'src/app/services/data.service';
import { ColorService } from './../../../../services/color.service';
import { BrandService } from './../../../../services/brand.service';
import { Car } from 'src/app/models/car';
import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { timer } from 'rxjs';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  car: Car = new Car();
  brands: Brand[];
  colors: Color[];
  carAddForm: FormGroup;
  createCarAddForm() {
    this.carAddForm = this._formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
      colorName: [''],
      brandName: [''],
      image: ['', Validators.required],
    });
  }
  constructor(
    public servis: DataService,
    private _carService: CarService,
    private _toastrService: ToastrService,
    private _formBuilder: FormBuilder,
    private _brandService: BrandService,
    private _colorService: ColorService
  ) {}

  ngOnInit(): void {
    this.createCarAddForm();
    this.getColors();
    this.getBrands();
  }
  add(form: NgForm) {
    const source = timer(1000);
    form.controls['brandName'].setValue(
      this.brands.filter((x) => x.id == form.value.brandId)[0].name
    );
    form.controls['colorName'].setValue(
      this.colors.filter((y) => y.id == form.value.colorId)[0].name
    );
    if (form.valid) {
      this.car = Object.assign({}, form.value);
    }
    this._carService.addCar(this.car).subscribe((data) => {
      this._toastrService.success(
        data.brandName + ' ' + data.colorName + ' başarıyla eklendi'
      );
      source.subscribe(() => {
        window.location.reload();
      });
    });
  }
  getBrands() {
    this._brandService.getBrands().subscribe((data) => {
      this.carAddForm.controls['brandId'].setValue('brandName');
      this.brands = data;
    });
  }
  getColors() {
    this._colorService.getColors().subscribe((data) => {
      this.carAddForm.controls['colorId'].setValue('colorName');
      this.colors = data;
    });
  }
}

// addCar() {

//     this.carAddForm.controls["brandName"].setValue(this.brands.filter(x => x.id == this.carAddForm.value.brandId)[0].name)
//     this.carAddForm.controls["colorName"].setValue(this.colors.filter(item => item.id == this.carAddForm.value.colorId)[0].colorName)
//     if (this.carAddForm.valid) {
//       this.car = Object.assign({}, this.carAddForm.value)
//     }
//     this.carService.addCar(this.car).subscribe(data => {
//       alert(data.description + " Başarıyla Eklendi.")
//       location.reload();
//     })

//   }
