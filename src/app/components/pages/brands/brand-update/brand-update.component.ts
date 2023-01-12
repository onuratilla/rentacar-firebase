import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { BrandService } from './../../../../services/brand.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css'],
})
export class BrandUpdateComponent implements OnInit {
  brandUpdateForm = new FormGroup({
    id: new FormControl(0, [Validators.required]),
    name: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });
  constructor(
    public servis: DataService,
    private _brandService: BrandService,
    private _activatedRoute: ActivatedRoute,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getBrandById();
  }

  getBrandById() {
    this._activatedRoute.params.subscribe((params) => {
      if (params['id'])
        this._brandService.getBrandById(params['id']).subscribe((data) => {
          this.brandUpdateForm.controls['id'].setValue(data.id);
          this.brandUpdateForm.controls['name'].setValue(data.name);
          this.brandUpdateForm.controls['image'].setValue(data.image);
        });
    });
  }
  update() {
    const source = timer(1000);
    if (this.brandUpdateForm.valid) {
      this._brandService
        .updateBrand(this.brandUpdateForm.value)
        .subscribe((data) => {
          this._toastrService.warning(data.name + ' başarıyla güncellendi');
          source.subscribe(() => {
            window.location.reload();
          });
        });
    }
  }
}
