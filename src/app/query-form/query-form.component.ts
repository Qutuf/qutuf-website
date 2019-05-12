import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QutufService } from '../shared/utils/qutuf-service.service';
import { qutufData } from '../shared/helpers/qutufData'
import { log } from 'util';

@Component({
  selector: 'app-query-form',
  templateUrl: './query-form.component.html',
  styleUrls: ['./query-form.component.scss']
})
export class QueryFormComponent implements OnInit {
  messageForm: FormGroup;
  submitted = false;
  success = false;
  data: qutufData;
  text: '';
  constructor(private formBuilder: FormBuilder, private qutufService: QutufService) { }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      message: ['', Validators.required]
    });

  }
  onSubmit() {
    this.submitted = true;

    if (this.messageForm.invalid) {
      return;
    }
    //console.log(this.messageForm.controls.message.value);
    this.qutufService.getDataByText(this.messageForm.controls.message.value).then(data => {
      console.log(data.Text.Sentence['@original_string']);
      this.text = data.Text.Sentence['@original_string'];
      this.success = true;
    });

  }
}
