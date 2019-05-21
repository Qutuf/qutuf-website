import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QutufService } from '../shared/utils/qutuf-service.service';
import { qutufData, SurfaceFormMorpheme, Enclitic, Proclitc } from '../shared/helpers/qutufData'

@Component({
  selector: 'app-query-form',
  templateUrl: './query-form.component.html',
  styleUrls: ['./query-form.component.scss']
})
export class QueryFormComponent implements OnInit {
  messageForm: FormGroup;
  submitted = false;
  success = false;
  reveal = false;
  error = false;
  data: qutufData;
  morph: SurfaceFormMorpheme[];
  text: '';
  constructor(private formBuilder: FormBuilder, private qutufService: QutufService) { }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      message: ['', Validators.required]
    });

  }
  onSubmit() {
    this.submitted = true;
    this.reveal = true;
    if (this.messageForm.invalid) {
      return;
    }
    this.qutufService.getDataByText(this.messageForm.controls.message.value).then(data => {
      if (data) {
        this.success = true;
        this.callSticky();
        this.morph = data.Text.Sentence.Word['0'].SurfaceFormMorphemes;
        this.reveal = false;
        this.text = data.Text.Sentence['@original_string'];
        if (!this.morph.length) {
          this.morph = [data.Text.Sentence.Word['0'].SurfaceFormMorphemes];
        }

      }
      else {
        this.error = true;
      }

    });

  }
  checkPre(proclitcs: Proclitc[]) {
    return proclitcs ? [proclitcs['Proclitc']] : [];
  }
  checkEnc(enclitics: Enclitic[]) {
    return enclitics ? [enclitics['Enclitic']] : [];
  }
  callSticky() {
    var tableCont = document.querySelector('#table-cont')
    var mainCont = document.querySelector('#main-cont')
    /**
     * scroll handle
     * @param {event} e -- scroll event
     */
    function scrollHandle(e) {
      var scrollTop = this.scrollTop;
      this.querySelector('thead').style.transform = 'translateY(' + scrollTop + 'px)';
    }
    mainCont.classList.remove('hidden');
    tableCont.addEventListener('scroll', scrollHandle)
  }
}
