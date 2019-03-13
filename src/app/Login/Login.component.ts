/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { mongoService } from '../services/index';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-login',
  templateUrl: './Login.html',
  styleUrls: ['./Login.css']
})
export class LoginComponent {

  myForm: FormGroup;

  private query;

  email = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  
  constructor(public mongo: mongoService, fb: FormBuilder){
    this.myForm = fb.group({
      email: this.email,
      password: this.password
    });
  };

  attemptLogin(form:any): Promise<any>{
    this.query ={
      'email':this.email.value,
      'password':this.password.value
    };

    this.myForm.setValue({
      'email':null,
      'password':null
    });

    return this.mongo.getUser(this.query)
  }
}

