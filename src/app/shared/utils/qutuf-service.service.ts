import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from './api-service.service';
import { qutufData } from '../helpers/qutufData';


@Injectable({
  providedIn: 'root'
})
export class QutufService {

  constructor(private apiService: ApiService) {

  }
  test(text) {
    console.log('====================================');
    console.log(text);
    console.log('====================================');
  }
  getDataByText(text): qutufData {
    let data: qutufData;
    console.log(text);
    this.apiService.getListOfGroup(environment.BASE_URL_TEXT + text)
      .subscribe(
        (result: qutufData) => {
          data = result;
        },
        error => {
          console.log('====================================');
          console.log(error);
          console.log('====================================');
        },
        () => {
          // 'onCompleted' callback.
          // No errors, route to new page here
        }
      );
    return data;
  }
}

