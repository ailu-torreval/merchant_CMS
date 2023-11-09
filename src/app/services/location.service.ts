import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  apiKey: any = environment.mapsKey;


  constructor(private http: HttpClient) { }


  async getCoords(
    address1: string,
    address2: string,
    zip: string,
    city: string
  ) {
    //create the string
    // ADDRESS PATTERN = address1 address2 zip city country, no commas, spaces replaced by %20
    const addrStr: string = `${address1} ${address2} ${zip} ${city} Denmark`;
    const formattedAddress: string = addrStr.replace(/[\s,]+/g, '%20');
    console.log(formattedAddress);
    //make the request, and return coords
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=${this.apiKey}`;
    // const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=Kagsåkollegiet%20163%202860%20Søborg%20Dinamarca&key=${apiKey}`;

    return new Promise<any>((resolve, reject) => {
      this.http.get(apiUrl).subscribe(
        (data: any) => {
          const coords = data.results[0].geometry.location;
          console.log('COORDS', coords);
          console.log(data.results);
          resolve(data.results[0]);
        },
        (error) => {
          console.error('Error:', error);
          reject(error);
        }
      );
    });

  }
}
