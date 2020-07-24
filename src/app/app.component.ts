import { Component } from '@angular/core';
import { User } from './user';
import { S1Service } from './services/s1.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  topics=['Angular','React','Vue'];
  usermodel=new User('harish','harish@1606.com',9514109259,'',false);
  constructor( private s1service:S1Service)
  {
  }
  topichaserror=true
  submitted=false; 
  errorMsg=''

  validateTopic(value)
  {
    if(value==="default")
    this.topichaserror=true
    else
    this.topichaserror=false
  }
  onsubmit()
  {
    this.submitted=true;
    this.s1service.enroll(this.usermodel).subscribe(data =>console.log('sucess',data),error=>this.errorMsg=error.statusText);
  }
}
