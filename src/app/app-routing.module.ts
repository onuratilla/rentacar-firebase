import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { SignupComponent } from './components/signup/signup.component';
import {
  canActivate,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';
import { PanelComponent } from './components/panel/panel.component';
import { RentalComponent } from './components/rental/rental.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './components/pages/error-page/error-page.component';
import { CarsComponent } from './components/pages/cars/cars.component';
import { CarAddComponent } from './components/pages/cars/car-add/car-add.component';
import { CarUpdateComponent } from './components/pages/cars/car-update/car-update.component';
import { CarDetailsComponent } from './components/pages/car-details/car-details.component';
import { BrandsComponent } from './components/pages/brands/brands.component';
import { BrandAddComponent } from './components/pages/brands/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/pages/brands/brand-update/brand-update.component';
import { ColorsComponent } from './components/pages/colors/colors.component';
import { ColorAddComponent } from './components/pages/colors/color-add/color-add.component';
import { ColorUpdateComponent } from './components/pages/colors/color-update/color-update.component';
import { AdditionalServicesComponent } from './components/pages/additional-services/additional-services.component';
import { AdditionalServiceAddComponent } from './components/pages/additional-services/additional-service-add/additional-service-add.component';
import { AdditionalServiceUpdateComponent } from './components/pages/additional-services/additional-service-update/additional-service-update.component';
import { ReservationComponent } from './components/pages/reservation/reservation.component';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['']);
const routes: Routes = [
  //canActive olayı admin güvenliğini sağlamak için eğer login işlemi yapılmamış ise add ve update işlemlerine gitmeyi engelle
  {path:"payment/success",component:PaymentSuccessComponent},
  {
    path: 'panel',
    component: PanelComponent,
    ...canActivate(redirectToLogin),
  },
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectToHome),
  },
  {
    path: 'signup',
    component: SignupComponent,
    ...canActivate(redirectToHome),
  },
  {
    path: 'kategoriler',
    component: KategoriComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'rental',
    component: RentalComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'rental/:katId',
    component: RentalComponent,
    canActivate: [AuthGuard]
  },
  { path: '', pathMatch: 'full', component: CarsComponent },
  { path: 'cars', component: CarsComponent },
  {
    path: 'carAdd',
    component: CarAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'carUpdate/:id',
    component: CarUpdateComponent,
    canActivate: [AuthGuard]
  },
  { path: 'carDetail/:id', component: CarDetailsComponent },
  { path: 'colors/:id', component: CarsComponent }, // renge göre araç getir
  { path: 'brands/:id', component: CarsComponent }, // markaya göre araç getir
  { path: 'brands', component: BrandsComponent },
  {
    path: 'brandAdd',
    component: BrandAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'brandUpdate/:id',
    component: BrandUpdateComponent,
    canActivate: [AuthGuard]
  },
  { path: 'colors', component: ColorsComponent },
  {
    path: 'colorAdd',
    component: ColorAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'colorUpdate/:id',
    component: ColorUpdateComponent,
    canActivate: [AuthGuard]
  },
  { path: 'additionalServices', component: AdditionalServicesComponent },
  {
    path: 'additionalServiceAdd',
    component: AdditionalServiceAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'additionalServiceUpdate/:id',
    component: AdditionalServiceUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
 
  { path: 'reservation', component: ReservationComponent },
  //{ path: 'login/:returnUrl', component: LoginComponent },
  { path: '**', component: ErrorPageComponent }, //bulamadığı tüm adresler için 404 ekranını göster
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
