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
  chip_element: any
  active_input: string
  contact_obj: {name:string, email:string, contact:string}

  constructor(
    private fb: FormBuilder
  ){
  }

  ngOnInit(): void {
    this.createForm()

    this.contact_form.valueChanges.subscribe({
      next:(data)=>{
        console.log(data);
    
        let active_class = document.getElementsByClassName('active')
        this.chip_element = active_class[0].getElementsByClassName('chip')
        let nameInput = document.getElementsByClassName('nameInput');
        this.chip_element[0].classList.add('chip-animation')
        console.log(nameInput);
        this.active_input = active_class[0].classList[0]
        this.contact_obj = data
        if(data){
          if(active_class[0].classList[0] == 'email'){
            if(this.contact_form.controls['email'].status == 'VALID'){
              this.next_disabled = true  
            }
          }else{
            if(data.name!=='' || data.contact!==''){
              this.next_disabled = true
            }else{
              this.next_disabled = false
              // chip_element[0].classList.add('chip-animation')
            }
          }
        }
      }
    })

  }

  onInputFocusOut() {
    console.log(this.contact_obj[this.active_input]);
    if(this.contact_obj[this.active_input] == ''){
      this.chip_element[0].classList.remove('chip-animation')
    }
    
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
