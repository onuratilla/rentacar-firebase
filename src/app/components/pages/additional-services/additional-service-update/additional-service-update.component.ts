import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';
import { AdditionalServiceService } from 'src/app/services/additional-service.service';

@Component({
  selector: 'app-additional-service-update',
  templateUrl: './additional-service-update.component.html',
  styleUrls: ['./additional-service-update.component.css'],
})
export class AdditionalServiceUpdateComponent implements OnInit {
  additionalServiceUpdateForm = new FormGroup({
    id: new FormControl(0, [Validators.required]),
    additional: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  constructor(
    public servis: DataService,
    private _additionalServiceService: AdditionalServiceService,
    private _activatedRoute: ActivatedRoute,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAdditionalServiceById();
  }
  getAdditionalServiceById() {
    this._activatedRoute.params.subscribe((params) => {
      if (params['id'])
        this._additionalServiceService
          .getAdditionalServiceById(params['id'])
          .subscribe((data) => {
            this.additionalServiceUpdateForm.controls['id'].setValue(data.id);
            this.additionalServiceUpdateForm.controls['additional'].setValue(
              data.additional
            );
            this.additionalServiceUpdateForm.controls['price'].setValue(
              data.price
            );
            this.additionalServiceUpdateForm.controls['description'].setValue(
              data.description
            );
          });
    });
  }
  update() {
    const source = timer(1000);
    if (this.additionalServiceUpdateForm.valid) {
      this._additionalServiceService
        .updateAdditionalService(this.additionalServiceUpdateForm.value)
        .subscribe((data) => {
          this._toastrService.warning(
            data.additional + ' başarıyla güncellendi'
          );
          source.subscribe(() => {
            window.location.reload();
          });
        });
    }
  }
}
