import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormArray} from '@angular/forms';
import { FormGroup,FormControl } from '@angular/forms';
import { passwordValidator } from './Reactive_forms/password';
import { S2Service } from '../../services/s2.service';

@Component({
  selector: 'app-c1',
  templateUrl: './c1.component.html',
  styleUrls: ['./c1.component.scss']
})
export class C1Component implements OnInit { 
  
  registrationForm: FormGroup;
  
  get username()
  {
    return this.registrationForm.get('username');
  }
  get email()
  {
    return this.registrationForm.get('email');
  }
  get alternateEmails()
  {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }
  addAlternateEmail()
  {
    this.alternateEmails.push(this.fb.control(''));
  }
  constructor(private fb:FormBuilder,private s2service:S2Service) { }

  ngOnInit(){
  this.registrationForm=this.fb.group({
    username:['',[Validators.required,Validators.minLength(3)]],
    password:[''],
    email:[''],
    subscribe:[false],
    confirmPassword:[''],
    address:this.fb.group({
      city:[''],
      state:[''],
      postalCode:['']
    }),
    alternateEmails:this.fb.array([])
  },{validator:passwordValidator});
  
  this.registrationForm.get('subscribe').valueChanges.subscribe(checkedValue=>{
    const email=this.registrationForm.get('email');
    if(checkedValue){
      email.setValidators(Validators.required);
    }
    else{
      email.clearValidators();
    }
    email.updateValueAndValidity();
  })
}

  /*registrationForm=new FormGroup({
    username:new FormControl('harish'),
    password:new FormControl(''),
    confirmPassword:new FormControl(''),
    address:new FormGroup({
      city:new FormControl('city'),
      state:new FormControl(''),
      postalCode:new FormControl('')})
  })*/
  
  loadApiData()
  {
    this.registrationForm.patchValue({
      username:'hari',
      password:'test',
      confirmPassword:'test'
    })
  }

  onSubmit()
  {
    console.log(this.registrationForm.value);
    this.s2service.register(this.registrationForm.value).subscribe(response=>console.log('Success',response),error=>console.error('Error',error));
  }

  
  
  

}
