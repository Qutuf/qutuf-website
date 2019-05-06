import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QutufService } from '../shared/utils/qutuf-service.service';
import { qutufData } from '../shared/helpers/qutufData'
import { log } from 'util';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  messageForm: FormGroup;
  submitted = false;
  success = false;
  data: qutufData;
  constructor(private formBuilder: FormBuilder, private qutufService: QutufService) { }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      name: ['', Validators.required],
      message: ['', Validators.required]
    });

  }
  onSubmit() {
    this.submitted = true;

    if (this.messageForm.invalid) {
      return;
    }
    //console.log(this.messageForm.controls.name.value );
    this.qutufService.test(this.messageForm.controls.name.value );
    
    console.log(this.data);
    this.success = true;
  }
}
