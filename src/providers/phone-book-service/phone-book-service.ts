// import {Storage, SqlStorage} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


/*
  Generated class for the PhoneBookService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PhoneBookService {
  data: any;
  public searched: string = '';
  public page: number;
  public phbposts: Array<any> = [];
  public loadDate: any;
  // public storage: Storage = null;  


  constructor(public http: Http, public storage: Storage) {
    this.data = null;
    this.page = 0;
    this.loadDate = new Date();
    // this.storage = new Storage(SqlStorage);

  }

reload() {
  this.page = 0;
  this.loadDate = new Date();
}

searching(val) {
    this.searched = val;
    console.log('pb: ', this.searched);
  }

  load() {
    this.page++
    // if (this.data) {
    //   // already loaded data
    //   return Promise.resolve(this.data);
    // }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get('http://searchsouthernutah.com/wp-json/wp/v2/listings?orderby=title&order=asc&per_page=100&page=' + this.page + "&ts=" +  this.loadDate)
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          console.log(this.page);
          this.storage.set ("phoneBook", JSON.stringify(this.data));
          resolve(this.data);
        });
    });
  }

  get() {

    return new Promise(resolve => {
    this.storage.get("phoneBook").then((value) => {
      if (value != null) {
      this.data = JSON.parse(value)
      } else this.data = []
      resolve(this.data);
    });
    });
  }
organizePosts(data) {
  data.sort((a, b) => {
      a = a.title.rendered.toLowerCase();
      b = b.title.rendered.toLowerCase();
      return b > a ? -1 : b < a ? 1 : 0;
    });
this.data.forEach(function (arrayItem) {
      
      var tmp = document.createElement("DIV");
      tmp.innerHTML = arrayItem.title.rendered;
      arrayItem.title.rendered = tmp.textContent;
});
// this.storage.set ("directory", JSON.stringify(this.data));
    return data;
}

}

