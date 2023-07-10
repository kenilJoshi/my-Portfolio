import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss'],
})
export class ContactMeComponent implements OnInit {

  contact_form: FormGroup
  isActiveElement: number = 1;
  next_disabled: boolean = false

  constructor(
    private fb: FormBuilder
  ){
  }

  ngOnInit(): void {
    this.createForm()
    this.contact_form.valueChanges.subscribe({
      next:(data)=>{
        let active_class = document.getElementsByClassName('active')
        console.log(active_class[0].classList[0]);
        
        if(data){
          if(active_class[0].classList[0] == 'email'){
            if(this.contact_form.controls['email'].status == 'VALID'){
              this.next_disabled = true  
            }
          }else{
            this.next_disabled = true
          }
        }
      }
    })

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

  nextElement(){
    if(this.isActiveElement < 3){
      this.next_disabled = false
      this.isActiveElement++
    }
  }
  

}
