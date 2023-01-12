import { Rental } from '../models/Rental';
import { Uye } from './../models/Uye';
import { Injectable } from '@angular/core';
import { Kategori } from '../models/Kategori';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  [x: string]: any;
  public apiUrl = "http://localhost:3000/";
  public aktifUye: Uye = new Uye();;
  constructor(
    public http: HttpClient
  ) { }
  

  OturumAc(mail: string, parola: string) {
    return this.http.get<Uye[]>(this.apiUrl + "users?mail=" + mail + "&parola=" + parola);
  }
  OturumKontrol() {
    if (localStorage.getItem("adsoyad")) {
      this.AktifUyeBilgi()
      return true;
    } else {
      return false;
    }
  }
  AktifUyeBilgi() {
    if (localStorage.getItem("adsoyad")) {
      this.aktifUye.adsoyad = localStorage.getItem("adsoyad") || "";
      var admin = localStorage.getItem("admin") || "0";
      this.aktifUye.admin = parseInt(admin);
    }
  }

  /* Uye servis başla*/
  UyeListele() {
    return this.http.get<Uye[]>(this.apiUrl + "users");
  }
  UyeById(id: number) {
    return this.http.get<Uye>(this.apiUrl + "users/" + id);
  }
  UyeEkle(uye: Uye) {
    return this.http.post(this.apiUrl + "users/", uye);
  }
  UyeDuzenle(uye: Uye) {
    return this.http.put(this.apiUrl + "users/" + uye.id, uye);
  }
  UyeSil(id: number) {
    return this.http.delete(this.apiUrl + "users/" + id);
  }
  /* Uye servis bitiş*/

  /* kategori servis başla*/
  KategoriListele() {
    return this.http.get<Kategori[]>(this.apiUrl + "categories");
  }
  KategoriById(id: number) {
    return this.http.get<Kategori>(this.apiUrl + "categories/" + id);
  }
  KategoriEkle(kat: Kategori) {
    return this.http.post(this.apiUrl + "categories/", kat);
  }
  KategoriDuzenle(kat: Kategori) {
    return this.http.put(this.apiUrl + "categories/" + kat.id, kat);
  }
  KategoriSil(id: number) {
    return this.http.delete(this.apiUrl + "categories/" + id);
  }
  /* kategori servis bitiş*/

   /* Rental servis başla*/

   RentalListele() {
    return this.http.get<Rental[]>(this.apiUrl + "rental");
  }
  RentalListeleByKatId(katId: number) {
    return this.http.get<Rental[]>(this.apiUrl + "categories/" + katId + "/rental");
  }
  RentalById(id: number) {
    return this.http.get<Rental>(this.apiUrl + "rental/" + id);
  }
  RentalEkle(rental: Rental) {
    return this.http.post(this.apiUrl + "rental/", rental);
  }
  RentalDuzenle(rental: Rental) {
    return this.http.put(this.apiUrl + "rental/" + rental.id, rental);
  }
  RentalSil(id: number) {
    return this.http.delete(this.apiUrl + "rental/" + id);
  }
  /* Rental servis bitiş*/
}

