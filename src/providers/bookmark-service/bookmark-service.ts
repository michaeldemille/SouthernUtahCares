// import {Storage, SqlStorage} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the BookmarkService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BookmarkService {
  
  public data: any;
  // public storage: Storage = null; 
  public bookmarks: Array<any> = [];
  public posts: any;
  public filtersList: Array<{title: string, toggle: boolean, format: any}> = [];
  public listeners: Array<any> =[]


  constructor(public storage: Storage, public alertCtrl: AlertController) {
    //  this.storage = new Storage(SqlStorage);
    this.posts =  this.get();
    this.filtersList = [
      // { title: 'Newsfeed', toggle: false, format: '0' },
      { title: 'Calendar', toggle: false, format: '0' },
      { title: 'Opportunities', toggle: false, format: '0'},
      { title: 'Directory', toggle: false, format: '0' },
      { title: 'Phone Book', toggle: false, format: '0' }
    ];  
  }

subscribe(cb: any) {
    if (cb) this.listeners.push(cb);
  }

  publish(data: any) {
         this.listeners.forEach((cb: any, i)=>{
             cb(data);
         });
  }

  filterToggle(i) {
  if (this.filtersList[i].toggle) {
    switch (this.filtersList[i].title) {
    // case 'Newsfeed':
    //   this.filtersList[i].format = "newsfeed";
    //   break;
    case 'Calendar':
      this.filtersList[i].format = "calendar";
      break;
      case 'Directory':
      this.filtersList[i].format = "directory";
      break;
      case 'Phone Book':
      this.filtersList[i].format = "phonebook";
      break;
      case 'Opportunities':
      this.filtersList[i].format = "giving";
      break;
    }
    } else {
      this.filtersList[i].format = "0";
    }
    this.publish(this.filtersList);
  }

get() {
  return new Promise(resolve => {
    this.storage.get("bookmarks").then((value) => {
      if (value != null) {
      this.data = JSON.parse(value)
      } else this.data = []
      this.bookmarks = this.data
      resolve(this.data);
    });
    });
  }

add(post) {
  console.log(post);
  this.bookmarks = this.bookmarks.concat(post)
  this.storage.set ("bookmarks", JSON.stringify(this.bookmarks));
  let alert = this.alertCtrl.create({
      title: 'Bookmark',
      subTitle: 'Your Bookmoark has been saved!',
      buttons: ['OK']
    });
    alert.present();
}

remove(index) {
this.bookmarks.splice(index,1)
// this.bookmarks = [];
this.storage.set ("bookmarks", JSON.stringify(this.bookmarks));
console.log(this.bookmarks);
}

}

