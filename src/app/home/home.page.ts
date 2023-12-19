import { Component, OnInit } from '@angular/core';
import { MerchantScript } from '../myScripts/MerchantScript';
import { SkScript } from '../myScripts/SkScript';
import { HttpClient } from '@angular/common/http';
import { SkResponseData } from '../myScripts/Interfaces';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userIsLoggedIn: boolean = false;
  data1 = { skClientID: '35823' };

  constructor(
    public skScript: SkScript,
    private http: HttpClient,
    private router: Router,
    alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    try {
      this.http
        .request<SkResponseData>(
          'POST',
          'https://salgskernen.dk/sk_sync_foodapp',
          { body: this.data1 }
        )
        .subscribe((response) => {
          this.userIsLoggedIn = true;
          this.skScript.skData = response.success;
          console.log(response.success);
        });
    } catch (error) {
      console.log(error);
    }
  }

  goToPage(endpoint: string) {
    if (endpoint === 'merchant-profile') {
      
    } else {
    }
    this.router.navigate([endpoint]);
  }
}
