import { FirebaseServiceService } from 'src/app/services/FirebaseService.service';
import { Router } from '@angular/router';
import { User } from '@angular/fire/auth';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  uye = this.fbServis.AktifUyeBilgi;
  constructor(
    public fbServis: FirebaseServiceService,
    public router: Router,
    private _toastrService: ToastrService,
    public servis: DataService, public _translateService: TranslateService,
  ) {
    _translateService.addLangs(['en', 'tr']);
    _translateService.setDefaultLang('en');
  }
  translateLanguageTo(lang: string) {
    this._translateService.use(lang);
  }

  ngOnInit(): void {}
  OturumKapat() {
    this.fbServis.OturumKapat().subscribe(() => {
      this.router.navigate(['login']);
    });
  }
}
