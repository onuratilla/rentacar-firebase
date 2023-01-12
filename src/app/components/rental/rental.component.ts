import { ActivatedRoute } from '@angular/router';
import { Kategori } from './../../models/Kategori';
import { Sonuc } from './../../models/Sonuc';
import { MytoastService } from './../../services/mytoast.service';
import { Rental } from './../../models/Rental';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  rental!: Rental[];
  kategoriler!: Kategori[];
  modal!: Modal;
  modalBaslik: string = "";
  secRental!: Rental;
  katId: number = 0;
  secKat: Kategori = new Kategori();
  sonuc: Sonuc = new Sonuc();
  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    rentaladi: new FormControl(),
    rentalno: new FormControl(),
    categoryId: new FormControl(),
    kaytarih: new FormControl(),
    duztarih: new FormControl(),
  });
  constructor(
    public servis: DataService,
    public toast: MytoastService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((p: any) => {
      if (p.katId) {
        this.katId = p.katId;
        this.KategoriGetir();

      }
    });
    this.KategoriListele();
  }
  KatSec(katId: number) {
    this.katId = katId;
    this.KategoriGetir();

  }

  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.frm.patchValue({
      categoryId: this.katId
    });
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Kiralayan Ekle";
    this.modal.show();
  }
  Duzenle(rental: Rental, el: HTMLElement) {
    this.frm.patchValue(rental);
    this.modalBaslik = "Kiralayan Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(rental: Rental, el: HTMLElement) {
    this.secRental = rental;
    this.modalBaslik = "Kiralayan Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  RentalListele() {
    this.servis.RentalListeleByKatId(this.katId).subscribe(d => {
      this.rental = d;
    });
  }
  KategoriListele() {
    this.servis.KategoriListele().subscribe(d => {
      this.kategoriler = d;
    });
  }
  KategoriGetir() {
    this.servis.KategoriById(this.katId).subscribe(d => {
      this.secKat = d;
      this.RentalListele();
    });
  }
  RentalEkleDuzenle() {
    var rental: Rental = this.frm.value
    var tarih = new Date();
    if (!rental.id) {
      var filtre = this.rental.filter(s => s.rentaladi == rental.rentaladi);
      if (filtre.length > 0) {
        this.sonuc.islem = false;
        this.sonuc.mesaj = "Girilen Kiralayan Adı Kayıtlıdır!";
        this.toast.ToastUygula(this.sonuc);
      } else {
        rental.kaytarih = tarih.getTime().toString();
        rental.duztarih = tarih.getTime().toString();
        this.servis.RentalEkle(rental).subscribe(d => {
          this.sonuc.islem = true;
          this.sonuc.mesaj = "Kiralayan Eklendi";
          this.toast.ToastUygula(this.sonuc);
          this.RentalListele();
          this.modal.toggle();
        });
      }
    } else {
      rental.duztarih = tarih.getTime().toString();
      this.servis.RentalDuzenle(rental).subscribe(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Kiralayan Düzenlendi";
        this.toast.ToastUygula(this.sonuc);
        this.RentalListele();
        this.modal.toggle();
      });
    }

  }
  RentalSil() {
    this.servis.RentalSil(this.secRental.id).subscribe(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Kiralayan Silindi";
      this.toast.ToastUygula(this.sonuc);
      this.RentalListele();
      this.modal.toggle();
    });
  }
}
