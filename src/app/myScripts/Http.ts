import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable()
export class Http {
  mainUrl = 'http://165.22.69.190/';



  interval = null;

  constructor(
    private alert: AlertController,
    private httpClient: HttpClient,
    // private storage: Storage
  ) {}

  async showErrorAlert(message?:string) {
    const alert = await this.alert.create({
      message: 'Please try again.',
      header: message || 'Something went wrong',
      buttons: ['Accept'],
      htmlAttributes: {
        'aria-label': 'alert dialog',
      },
    });
    await alert.present();
  }

  request = (
    url:any,
    req_type = 'GET',
    post_data:any = null,
    request_params: any = null,
    dataNext: any = null
  ) => {
    if(request_params === null)
    request_params = { pagesize: 1000, skippages: 0 };
    return new Promise(async (res, err) => {
      const finalUrl = this.mainUrl + url;

      const headers = {
        'content-type': 'application/json',
      };

      // console.log(headers);

      if (req_type == 'POST') {
        const ress = this.httpClient
          .post(finalUrl, JSON.stringify(post_data), { headers: headers })
          .toPromise()
          .then(
            (response) => {
              // console.log(response)
              res(response);
            },
            (error) => {
              console.log(error);

              try {
                if (error.status == 0) {
                  err(
                    'Du er ikke tilsluttet internettet. Check din internet forbindelse og prøv igen.'
                  );
                  return;
                } else {
                  console.log(error['error']);
                  const errors = error['error'];
                  if (
                    'errorCode' in errors &&
                    errors['errorCode'] === 'E02002'
                  ) {
                    err(
                      `Du skal have minimum PLUS abonoment hos E-conomic for at kunnde bruge denne integration. Kontakt din revisor og opgradere din E-conomic.`
                    );
                  }

                  if ('customer' in errors) {
                    const barredCustomer =
                      errors['customer']['errors'][0]['inputValue'];
                    // console.log(barredCustomer);
                    // console.log(this.CUSTOMERS);
                    // console.log(this.CUSTOMERS[i].customerNumber)
                    err(
                      `Kunden: <strong>${barredCustomer}</strong> er spærret. <br>Husk at opdatere.<br><br>Kontakt admin.`
                    );
                  } else if ('lines' in errors) {
                    const barredProduct =
                      errors['lines']['items'][0]['product']['errors'][0][
                        'inputValue'
                      ];
                    // console.log(barredProduct);
                    err(
                      `Produktet: <strong>${barredProduct}</strong> er spærret. <br>Husk at opdatere.<br><br>Slet produktet eller kontakt admin.`
                    );
                  }
                }
              } catch (error) {
                err(error);
                return;
              }

              // err(JSON.stringify(error));
              err(error);
            }
          );
      } else if (req_type == 'PUT') {
        const ress = this.httpClient
          .put(finalUrl, JSON.stringify(post_data), { headers: headers })
          .toPromise()
          .then(
            (response) => {
              console.log(response);
              res(response);
            },
            (error) => {
              console.log(error);

              try {
                if (error.status == 0) {
                  err(
                    'Du er ikke tilsluttet internettet. Check din internet forbindelse og prøv igen.'
                  );
                  return;
                } else {
                  console.log(error['error']);
                  const errors = error['error']['errors'];
                  err(errors);
                  return;
                }
              } catch (error) {
                err(error);
                return;
              }

              err(error);
            }
          );
      } else {
        //GET
        this.httpClient
          .get(finalUrl, { headers, params:request_params })
          .toPromise()
          .then((ddata) => {
            let data: any = ddata;

            if ('collection' in data) {
              if (dataNext === null) {
                dataNext = data['collection'];
              } else {
                dataNext = dataNext.concat(data['collection']);
              }
            } else {
              dataNext = data;
            }

            if ('pagination' in data && 'nextPage' in data['pagination']) {
              url = data['pagination']['nextPage'];
              res(this.request(url, '', null, null, dataNext));
            } else {
              res(dataNext);
            }
          })
          .catch((error) => {
            // console.log(error.status);
            // console.log(error.error); // error message as string
            // console.log(error.headers);

            console.log(error);
            // err(JSON.stringify(error))

            if (error.status && error.status == -3) {
              err(
                'Du er ikke tilsluttet internettet. Check din internet forbindelse og prøv igen.'
              );
              return;
            }
            err(error);
          });
      }
    });
  };

}
