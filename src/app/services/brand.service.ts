import { Brand } from './../models/brand';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private _httpClient: HttpClient) {}
  getBrands(): Observable<Brand[]> {
    return this._httpClient.get<Brand[]>('http://localhost:3000/brands');
  }
  addBrand(brand: Brand): Observable<Brand> {
    return this._httpClient.post<Brand>('http://localhost:3000/brands', brand);
  }
  deleteBrand(brandId: number): Observable<Brand> {
    return this._httpClient.delete<Brand>(
      'http://localhost:3000/brands/' + brandId
    );
  }
  updateBrand(brand: Brand): Observable<Brand> {
    return this._httpClient.put<Brand>(
      'http://localhost:3000/brands/' + brand.id,
      brand
    );
  }
  getBrandById(brandId: number): Observable<Brand> {
    return this._httpClient.get<Brand>(
      'http://localhost:3000/brands/' + brandId
    );
  }
}
