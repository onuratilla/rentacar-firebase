import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  constructor(private _httpClient: HttpClient) {}
  getColors(): Observable<Color[]> {
    return this._httpClient.get<Color[]>('http://localhost:3000/colors');
  }
  addColor(color: Color): Observable<Color> {
    return this._httpClient.post<Color>('http://localhost:3000/colors', color);
  }
  deleteColor(colorId: number): Observable<Color> {
    return this._httpClient.delete<Color>(
      'http://localhost:3000/colors/' + colorId
    );
  }
  updateColor(color: Color): Observable<Color> {
    return this._httpClient.put<Color>(
      'http://localhost:3000/colors/' + color.id,
      color
    );
  }
  getColorById(colorId: number): Observable<Color> {
    return this._httpClient.get<Color>(
      'http://localhost:3000/colors/' + colorId
    );
  }
}
