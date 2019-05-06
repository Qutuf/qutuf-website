import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from './api-service.service';
import { qutufData } from '../helpers/qutufData';
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class QutufService {

  constructor(private apiService: ApiService) {

  }
  getDataByText(text) {
    return this.apiService.getListOfGroup(environment.BASE_URL_TEXT + text).pipe(
      map((data) => data)
    ).toPromise();
  }
}

