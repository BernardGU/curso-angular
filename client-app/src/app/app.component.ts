import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth-service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-wishlist';
  time = new Observable(observer => {
    setInterval(
      () => observer.next((new Date).toString()),
      1000
    );
  })

  constructor(
    public translate: TranslateService,
    public auth: AuthService
  ) {
    this.translate.setDefaultLang('es');
  }

}
