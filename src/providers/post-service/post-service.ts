// import {Storage, SqlStorage} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers, RequestOptions, RequestMethod, Request } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PostProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PostService {
  data: any;
  page: number;
  headers: any;
  options: any;
  public loadDate: any;
  // public storage: Storage = null;

  constructor(public http: Http, public storage: Storage) {
    this.data = null;
    this.page = 0;
    this.loadDate = Date.now();
    // this.storage = new Storage(SqlStorage);

  //   this.headers = new Headers();
  //   // this.headers.append('Cache-Control', 'max-age=10');
  //   this.headers.append('Cache-Control', 'max-age=31536000');

  //     // this.headers.append('Cache-Control', 'no-cache, no-store, must-revalidate');
  //     // this.headers.append('Pragma',  'no-cache');
  //     // this.headers.append('Expires',  '0');

  //      this.options = new RequestOptions({
  //         method: RequestMethod.Get,
  //         url: 'http://southernutahcares.com/wp-json/wp/v2/posts?filter[category_name]=newsfeed&page=' + this.page + '#' + new Date(),
  //         headers: this.headers
  //     });
  }

  reload() {
    this.loadDate = Date.now();
    this.page=0;
    return this.load()
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
      this.http.get('http://southernutahcares.com/wp-json/wp/v2/posts?filter[category_name]=newsfeed&page=' + this.page + "&ts=" +  this.loadDate)
      // this.http.request(new Request(this.options))
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });
  }

  get() {
    return new Promise(resolve => {
    this.storage.get("newsFeed").then((value) => {
      if (value != null) {
      this.data = JSON.parse(value)
      this.data.forEach(function (arrayItem) {
      arrayItem.start = new Date(arrayItem.start);
      });
      }
      resolve(this.data);
    });
    });
  }

  cleanPosts(data) {
  data.forEach(function (post) {
    post.article = post.content.rendered.match(/http:[^"]+"/i);
    post.article[0] = post.article[0].slice(0, -1);
  post.content.rendered = post.content.rendered.replace(/<a\b[^>]*>(.*?)<\/a>/i,"");
  console.log(post.article[0]);
});
}

}

