import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { PanelComponent } from './components/panel/panel.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { MytoastService } from './services/mytoast.service';
import { DataService } from 'src/app/services/data.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './common/navi/navi.component';
import { BrandsComponent } from './components/pages/brands/brands.component';
import { BrandUpdateComponent } from './components/pages/brands/brand-update/brand-update.component';
import { BrandAddComponent } from './components/pages/brands/brand-add/brand-add.component';
import { ColorsComponent } from './components/pages/colors/colors.component';
import { CarsComponent } from './components/pages/cars/cars.component';
import { ColorAddComponent } from './components/pages/colors/color-add/color-add.component';
import { ColorUpdateComponent } from './components/pages/colors/color-update/color-update.component';
import { ErrorPageComponent } from './components/pages/error-page/error-page.component';
import { CarAddComponent } from './components/pages/cars/car-add/car-add.component';
import { CarUpdateComponent } from './components/pages/cars/car-update/car-update.component';
import { CartSummaryComponent } from './common/cart-summary/cart-summary.component';
import { AdditionalServicesComponent } from './components/pages/additional-services/additional-services.component';
import { AdditionalServiceAddComponent } from './components/pages/additional-services/additional-service-add/additional-service-add.component';
import { AdditionalServiceUpdateComponent } from './components/pages/additional-services/additional-service-update/additional-service-update.component';
import { CarDetailsComponent } from './components/pages/car-details/car-details.component';
import { ReservationComponent } from './components/pages/reservation/reservation.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import {DatePipe} from '@angular/common';

export function httpTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    PaymentSuccessComponent,
    PanelComponent,
    KategoriComponent,
    RentalComponent,
    LoginComponent,
    AppComponent,
    NaviComponent,
    BrandsComponent,
    BrandUpdateComponent,
    BrandAddComponent,
    ColorsComponent,
    CarsComponent,
    ColorAddComponent,
    ColorUpdateComponent,
    ErrorPageComponent,
    CarAddComponent,
    CarUpdateComponent,
    CartSummaryComponent,
    AdditionalServicesComponent,
    AdditionalServiceAddComponent,
    AdditionalServiceUpdateComponent,
    CarDetailsComponent,
    ReservationComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgbModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoaderFactory,
        deps: [HttpClient],
      },
    }),
    HotToastModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [ DatePipe, DataService, MytoastService, AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
