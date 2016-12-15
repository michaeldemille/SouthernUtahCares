// import {Storage, SqlStorage} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class CalendarService {
  data: any;
  public organized: boolean = false;
  public currentevents: any;
  public date: any;
  public filtersList: Array<{title: string, toggle: boolean, category: any}> = [];
  public listeners: Array<any> =[]
  public searched: string = '';
  public calposts: any;
  // public storage: Storage = null;  
  public loadDate: any;
  public clSearch: string = '';

  constructor(public http: Http, public storage: Storage) {

    // this.storage = new Storage(SqlStorage);

    this.data = null;
    this.loadDate = new Date();
    this.date = new Date();
    this.filtersList = [
      { title: 'Charity', toggle: false, category: '0' },
      { title: 'Community', toggle: false, category: '0' },
      { title: 'Arts', toggle: false, category: '0' },
      { title: 'Classes', toggle: false, category: '0' },
      { title: 'B2B', toggle: false, category: '0' }
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
    case 'Charity':
      this.filtersList[i].category = "71";
      break;
    case 'Community':
      this.filtersList[i].category = "70";
      break;
      case 'Arts':
      this.filtersList[i].category = "66";
      break;
      case 'Classes':
      this.filtersList[i].category = "90";
      break;
      case 'B2B':
      this.filtersList[i].category = "92";
      break;
    }
    } else {
      this.filtersList[i].category = "0";
    }
    this.publish(this.filtersList);
  }

  searching(val) {
    this.searched = val;
    console.log(this.searched);
  }

  load() {
    this.loadDate = new Date();
    // if (this.data) {
    //   return Promise.resolve(this.data);
    // }

    return new Promise(resolve => {
      this.http.get('http://southernutahcares.com/wp-json/wp/v2/events?per_page=100' + "&ts=" +  this.loadDate)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  get() {

    return new Promise(resolve => {
    this.storage.get("calendar").then((value) => {
      if (value) {
      this.data = JSON.parse(value)
      this.data.forEach(function (arrayItem) {
      arrayItem.start = new Date(arrayItem.start);
      });
      } else this.data = null
      resolve(this.data);
    });
    });
  }

  organize(data) {
    
    // if (!this.organized) {
    this.organized = true;
    var date = new Date();
    var date2 = date.setHours(0,0,0,0);
    let x = 0;

    this.data.forEach(function (arrayItem) {
      
      arrayItem.start = new Date(arrayItem.start * 1000);
      arrayItem.excerpt = arrayItem.content.rendered.replace(/<\/?[^>]+(>|$)/g, "").substring(0,150) + '...'; 
      
      var tmp = document.createElement("DIV");
      tmp.innerHTML = arrayItem.title.rendered;
      arrayItem.title.rendered = tmp.textContent;

      var tmp2 = document.createElement("DIV");
      tmp2.innerHTML = arrayItem.excerpt;
      arrayItem.excerpt = tmp2.textContent;

      arrayItem.start2 = arrayItem.start.toLocaleString()
      arrayItem.start2 = arrayItem.start2.substring(0, arrayItem.start2.length - 6) + arrayItem.start2.slice(-3);

      
      if (arrayItem.recurrence_dates != null) {
        var recurevents = arrayItem.recurrence_dates.split(",");
        recurevents.forEach(function (icalStr) {
          var time = arrayItem.start.toString()
          var strYear = icalStr.substr(0, 4);
          var strMonth = parseInt(icalStr.substr(4, 2), 10) - 1;
          var strDay = icalStr.substr(6, 2);
          var strHour = time.substr(16, 2);
          var strMin = time.substr(19, 2);
          var strSec = time.substr(22, 2);

          var oDate = new Date(strYear, strMonth, strDay, strHour, strMin, strSec)
          if (oDate.getTime() >= date2) {
          var newObject = Object.assign({}, arrayItem);
          newObject.start = oDate;
          newObject.start2 = oDate.toLocaleString()
          newObject.start2 = newObject.start2.substring(0, newObject.start2.length - 6) + newObject.start2.slice(-3);
          arrayItem.excerpt = arrayItem.content.rendered.replace(/<\/?[^>]+(>|$)/g, "").substring(0,150) + '...'; 
      
      var tmp = document.createElement("DIV");
      tmp.innerHTML = arrayItem.title.rendered;
      arrayItem.title.rendered = tmp.textContent;

      var tmp2 = document.createElement("DIV");
      tmp2.innerHTML = arrayItem.excerpt;
      arrayItem.excerpt = tmp2.textContent;
          data.push(newObject);
          }
        });
      }
      
    });

    

    this.data.sort((a, b) => {
      a = new Date(a.start);
      b = new Date(b.start);
      return b > a ? -1 : b < a ? 1 : 0;
    });


    this.data.forEach(function (arrayItem) {
      if (arrayItem.start.getTime() < date2) {
      x++;
}
    });
   data.splice(0,x);

    this.storage.set ("calendar", JSON.stringify(this.data));
    return this.data;
  // }
  }

}

