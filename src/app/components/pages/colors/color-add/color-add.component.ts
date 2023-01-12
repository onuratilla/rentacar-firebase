import { DataService } from 'src/app/services/data.service';
import { Color } from './../../../../models/color';
import { Component, OnInit } from '@angular/core';
import { ColorService } from 'src/app/services/color.service';
import { ToastrService } from 'ngx-toastr';
import { timer } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css'],
})
export class ColorAddComponent implements OnInit {
  color: Color = new Color();
  constructor(
    public servis: DataService,
    private _colorService: ColorService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {}
  add(form: NgForm) {
    const source = timer(1000);
    this._colorService.addColor(this.color).subscribe((data) => {
      this._toastrService.success(data.name + ' başarıyla eklendi');
      source.subscribe(() => {
        window.location.reload();
      });
    });
  }
}
