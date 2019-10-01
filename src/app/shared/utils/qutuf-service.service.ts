import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from './api-service.service';
import { qutufData } from '../helpers/qutufData';
import { catchError, map } from "rxjs/operators";
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class QutufService {
  //phraseRegex = /^([\u0621-\u064A\u0660-\u0669]+\s[\u0621-\u064A\u0660-\u0669]+)*$/g
  constructor(private apiService: ApiService) {

  }
  getDataByText(text: string) {
    let url = environment.BASE_URL_TEXT;
    let phrase = text.split(' ').length > 1;
    if (phrase) {
      url = environment.BASE_URL_PHRASE;
    }
    return this.apiService.getListOfGroup(url + text).pipe(
      map((data) => {
        return {
          wordData: data,
          isPhrase: phrase
        };
      })
    ).toPromise();
  }
}

