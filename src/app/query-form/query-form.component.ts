import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QutufService } from '../shared/utils/qutuf-service.service';
import { qutufData, SurfaceFormMorpheme, Enclitic, Proclitc, Word } from '../shared/helpers/qutufData'

@Component({
  selector: 'app-query-form',
  templateUrl: './query-form.component.html',
  styleUrls: ['./query-form.component.scss']
})
export class QueryFormComponent implements OnInit {
  inputVar;
  messageForm: FormGroup;
  submitted = false;
  success = false;
  reveal = false;
  error = false;
  hasData = false;
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
    this.success=false;
    this.reveal = true;
    if (this.messageForm.invalid) {
      return;
    }

    this.qutufService.getDataByText(this.messageForm.controls.message.value)
      .then((result) => {
        if (result.wordData) {
          this.callSticky(result.isPhrase);
          /// Phrase Handling
          if (result.isPhrase) {
            this.reveal = false;
            this.data = result.wordData;
          }
          /// Single Word Handling
          else {
            this.success = true;
            this.reveal = false;
            this.hasData = result.wordData.Text.Sentence.Word['0']['@number_of_possibilities'] > 0;
            if (this.hasData) {
              this.morph = result.wordData.Text.Sentence.Word['0'].SurfaceFormMorphemes;
              this.text = result.wordData.Text.Sentence['@original_string'];
              console.log(this.morph);

              if (!this.morph.length) {
                this.morph = [result.wordData.Text.Sentence.Word['0'].SurfaceFormMorphemes];
              }
            }
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
  checkPhraseData(phraseData: qutufData) {
    return phraseData ? phraseData.Text.Sentence.Word.filter(item => item['@number_of_possibilities'] > 0) : [];
  }
  callSticky(Phrase) {
    var tableCont = document.querySelector('#table-cont')
    var tableContPhrase = document.querySelector('#table-cont-phrase')
    var mainCont = document.querySelector('#main-cont')
    var mainContPhrase = document.querySelector('#main-cont-phrase')


    /**
     * scroll handle
     * @param {event} e -- scroll event
     */
    function scrollHandle(e) {
      var scrollTop = this.scrollTop;
      this.querySelector('thead').style.transform = 'translateY(' + scrollTop + 'px)';
    }
    if(Phrase) {
      mainContPhrase.classList.remove('hidden');
      mainCont.classList.add('hidden');
      tableContPhrase.addEventListener('scroll', scrollHandle)
    }
    else {
      mainContPhrase.classList.add('hidden');
      mainCont.classList.remove('hidden');
      tableCont.addEventListener('scroll', scrollHandle)
    }
    
    
  }
}
