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

import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'app/rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  private authenticated = false;
  private loggedIn = false;

  constructor (private route: ActivatedRoute,
                private router: Router,
                private restService: RestService) {
  }

  private signUpInProgress = false;
  private currentUser;
  @ViewChild('signupForm') signupForm;

  private signUp ={
    email : '',
    firstName: '',
    lastName:'',
    ownerId:''
  };

  ngOnInit(){
    this.route
    .queryParams
    .subscribe((queryParams)=>{
      const loggedIn = queryParams['loggedIn'];
      if(loggedIn){
        this.authenticated = true;
        return this.router.navigate(['/'])
        .then(() =>{
          return this.checkWallet();
        });
      }
    });
  }

  checkWallet(){
    return this.restService.checkWallet()
    .then((res) => {
      if(res['length']>0){
        this.loggedIn = true;
        return this.getCurrentUser();
      }
    });
  }

  onSignUp(){
    this.signUpInProgress = true;
    return this.restService.signUp(this.signUp)
    .then(() =>{
      return this.getCurrentUser();
    })
    .then(() =>{
      this.loggedIn = true;
      this.signUpInProgress = true;
    });
  }

  getCurrentUser(){
    return this.restService.getCurrentUser()
    .then((currentUser)=> {
      this.currentUser. currentUser;
    });
  }

  
}
