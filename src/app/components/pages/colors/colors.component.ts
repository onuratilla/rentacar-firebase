import { ColorService } from './../../../services/color.service';
import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { timer } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css'],
})
export class ColorsComponent implements OnInit {
  colors: Color[];
  deleteId = 0;
  constructor(
    private _colorService: ColorService,
    private _modalService: NgbModal,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getColor();
  }
  getColor() {
    this._colorService.getColors().subscribe((data) => {
      this.colors = data;
    });
  }
  deleteColorById(colorId: number) {
    const source = timer(1000);
    this._colorService.deleteColor(colorId).subscribe((response) => {
      this.getColor();
      this._toastrService.error('Renk bilgileri başarıyla silindi.');
      source.subscribe(() => {
        window.location.reload();
      });
    });
  }
  open(content, deleteId) {
    this.deleteId = deleteId;
    this._modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
}
