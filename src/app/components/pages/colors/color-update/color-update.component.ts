import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ColorService } from 'src/app/services/color.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { timer } from 'rxjs';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css'],
})
export class ColorUpdateComponent implements OnInit {
  colorUpdateForm = new FormGroup({
    id: new FormControl(0, [Validators.required]),
    name: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });
  constructor(
    public servis: DataService,
    private _colorService: ColorService,
    private _activatedRoute: ActivatedRoute,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getColorById();
  }
  getColorById() {
    this._activatedRoute.params.subscribe((params) => {
      if (params['id'])
        this._colorService.getColorById(params['id']).subscribe((data) => {
          this.colorUpdateForm.controls['id'].setValue(data.id);
          this.colorUpdateForm.controls['name'].setValue(data.name);
          this.colorUpdateForm.controls['image'].setValue(data.image);
        });
    });
  }
  update() {
    const source = timer(1000);
    if (this.colorUpdateForm.valid) {
      this._colorService
        .updateColor(this.colorUpdateForm.value)
        .subscribe((data) => {
          this._toastrService.warning(data.name + ' başarıyla güncellendi');
          source.subscribe(() => {
            window.location.reload();
          });
        });
    }
  }
}
