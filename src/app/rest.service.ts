import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RestService {

  constructor(private httpClient: HttpClient) {
  }

  checkWallet() {
    return this.httpClient.get('https://35.204.34.37:3000/api/wallet', {withCredentials: true}).toPromise();
  }

  signUp(data) {
    const member = {
      $class: 'org.example.mynetwork.Member',
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      ownerId: data.ownerId

    };
     

    return this.httpClient.post('https://35.204.34.37:3000/api/org.example.mynetwork.Member', member).toPromise()
      .then(() => {
        const identity = {
          participant: 'org.example.mynetwork.Member#' + data.firstName,
          userID: data.email,
          options: {}
        };

        return this.httpClient.post('https://35.204.34.37:3000/api/system/identities/issue', identity, {responseType: 'blob'}).toPromise();
      })
      .then((cardData) => {
      console.log('CARD-DATA', cardData);
      let happy = new Blob();
        const file = new File([happy], 'myCard.card', {lastModified: Date.now()});
       
        const formData = new FormData();
        formData.append('card', file);

        const headers = new HttpHeaders();
        headers.set('Content-Type', 'multipart/form-data');
        return this.httpClient.post('https://35.204.34.37:3000/api/wallet/import', formData,{ withCredentials: true, headers})
      });
  }

  getCurrentUser() {
    return this.httpClient.get('https://35.204.34.37:3000/api/system/ping', {withCredentials: true}).toPromise()
      .then((data) => {
        return data['participant'];
      });
  }
}
