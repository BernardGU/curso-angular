import { TranslateLoader } from '@ngx-translate/core';
import { MyDatabaseService } from '../my-database/my-database.service';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, AppConfig } from 'src/assets/app-config';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslationServiceLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig,
    private db: MyDatabaseService
  ) { }

  getTranslation(lang: string):Observable<any> {
    const promise = this.http.get(this.config.apiEndpoint + '/api/translation?lang=' + lang)
                             .toPromise()
                             .then(a => {console.log(a); return a;});
    return from(promise);
  }
}
export function HttpLoaderFactory(
  http: HttpClient,
  db: MyDatabaseService
) {
  return new TranslationServiceLoader(http, {apiEndpoint: 'http://localhost:3000'}, db);
}
