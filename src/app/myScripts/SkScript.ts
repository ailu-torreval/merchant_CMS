import { Injectable } from '@angular/core';
import { SKClientData, SkResponseData } from './Interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SkScript {
  skData: SKClientData = {
    categories: [],
    client: {},
    lister: [],
    products: [],
  };

  constructor( private http: HttpClient) {}

  populateClient() {
    const data1 = { skClientID: '35823' };
    try {
        this.http
          .request<SkResponseData>(
            'POST',
            'https://salgskernen.dk/sk_sync_foodapp',
            { body: data1 }
          )
          .subscribe((response) => {
            this.skData = response.success;
            console.log(response.success);
          });
      } catch (error) {
        console.log(error);
      }
  }
}
