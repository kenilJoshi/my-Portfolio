import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss'],
})
export class ContactMeComponent implements OnInit {

  contact_form: FormGroup

  constructor(
    private fb: FormBuilder
  ){
    this.createForm()
  }

  ngOnInit(): void {
  }

  createForm() {
    this.contact_form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.required]],
    });
  }

  submitForm(){
    console.log(this.contact_form);
    
  }
  

}
