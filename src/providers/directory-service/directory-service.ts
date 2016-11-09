// import {Storage, SqlStorage} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DirectoryService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DirectoryService {
  data: any;
  public page: number;
  public dtSearch: string = '';

  public loadmore: boolean = true;
  public organized: boolean = false;

  public filtersList: Array<{ title: string, toggle: boolean, category: any }> = [];
  public filtersMasterList: Array<{ title: string, toggle: boolean, category: any }> = [];
  public resetFilter: boolean = true;

  public listeners: Array<any> = []
  public searched: string = '';
  public dirposts: Array<any> = [];
  public loadDate: any;
  // public storage: Storage = null;  

  constructor(public http: Http, public storage: Storage) {
    this.data = null;
    this.page = 0;
    this.loadDate = new Date();
    // this.storage = new Storage(SqlStorage);
    this.filtersList = [
         { title: 'Abuse', toggle: true, category: '95' },
      { title: 'Animals', toggle: true, category: '56' },
      { title: 'Arts / Culture', toggle: true, category: '57' },
      { title: 'Child Services', toggle: true, category: '100' },
      { title: 'Courts & Programs', toggle: true, category: '101' },
      { title: 'Crisis & Disaster Services', toggle: true, category: '102' },
      { title: 'Disability Services', toggle: true, category: '103' },
      { title: 'Domestic Violence', toggle: true, category: '104' },
      { title: 'Education', toggle: true, category: '58' },
      { title: 'Employment', toggle: true, category: '105' },
      { title: 'Environment', toggle: true, category: '69' },
      { title: 'Family & Parenting Services', toggle: true, category: '106' },
      { title: 'Financial Services', toggle: true, category: '107' },
      { title: 'Food Services', toggle: true, category: '109' },
      { title: 'Health & Insurance Assistance', toggle: true, category: '110' },
      { title: 'Health Services', toggle: true, category: '59' },
      { title: 'Homelessness ', toggle: true, category: '112' },
      { title: 'Housing Assistance', toggle: true, category: '115' },
      { title: 'Human Services', toggle: true, category: '60' },
      { title: 'Legal Services', toggle: true, category: '116' },
      { title: 'Medical Facilities', toggle: true, category: '119' },
      { title: 'Mental Health', toggle: true, category: '121' },
      { title: 'Nutritional Education', toggle: true, category: '123' },
      { title: 'Religious ', toggle: true, category: '88' },
      { title: 'Senior Services Programs', toggle: true, category: '127' },
      { title: 'Substance Abuse', toggle: true, category: '128' },
      { title: 'Support Groups', toggle: true, category: '74' },
      { title: 'Veteran Services', toggle: true, category: '132' },
      { title: 'Volunteer Programs', toggle: true, category: '133' },
      { title: 'Five County AOG Programs', toggle: true, category: '108' },
      { title: 'Government Programs', toggle: true, category: '73' },
      { title: 'Nonprofit Organizations', toggle: true, category: '80' }
    ];

    this.filtersMasterList = [
         { title: 'Abuse', toggle: true, category: '95' },
      { title: 'Animals', toggle: true, category: '56' },
      { title: 'Arts / Culture', toggle: true, category: '57' },
      { title: 'Child Services', toggle: true, category: '100' },
      { title: 'Courts & Programs', toggle: true, category: '101' },
      { title: 'Crisis & Disaster Services', toggle: true, category: '102' },
      { title: 'Disability Services', toggle: true, category: '103' },
      { title: 'Domestic Violence', toggle: true, category: '104' },
      { title: 'Education', toggle: true, category: '58' },
      { title: 'Employment', toggle: true, category: '105' },
      { title: 'Environment', toggle: true, category: '69' },
      { title: 'Family & Parenting Services', toggle: true, category: '106' },
      { title: 'Financial Services', toggle: true, category: '107' },
      { title: 'Food Services', toggle: true, category: '109' },
      { title: 'Health & Insurance Assistance', toggle: true, category: '110' },
      { title: 'Health Services', toggle: true, category: '59' },
      { title: 'Homelessness ', toggle: true, category: '112' },
      { title: 'Housing Assistance', toggle: true, category: '115' },
      { title: 'Human Services', toggle: true, category: '60' },
      { title: 'Legal Services', toggle: true, category: '116' },
      { title: 'Medical Facilities', toggle: true, category: '119' },
      { title: 'Mental Health', toggle: true, category: '121' },
      { title: 'Nutritional Education', toggle: true, category: '123' },
      { title: 'Religious ', toggle: true, category: '88' },
      { title: 'Senior Services Programs', toggle: true, category: '127' },
      { title: 'Substance Abuse', toggle: true, category: '128' },
      { title: 'Support Groups', toggle: true, category: '74' },
      { title: 'Veteran Services', toggle: true, category: '132' },
      { title: 'Volunteer Programs', toggle: true, category: '133' },
      { title: 'Five County AOG Programs', toggle: true, category: '108' },
      { title: 'Government Programs', toggle: true, category: '73' },
      { title: 'Nonprofit Organizations', toggle: true, category: '80' }
    ];


  }

  subscribe(cb: any) {
    if (cb) this.listeners.push(cb);
  }

  publish(data: any) {
    this.listeners.forEach((cb: any, i) => {
      cb(data);
    });
  }

  filterToggle(i) {
    if (this.filtersList[i].toggle) {
      this.filtersList[i].category = this.filtersMasterList[i].category;
    } else {
      this.filtersList[i].category = "0";
    }
    this.publish(this.filtersList);
  }

  reset() {
    var x;
    for (x in this.filtersList) {
      if (this.resetFilter) {
        this.filtersList[x].toggle = true;
        this.filtersList[x].category = this.filtersMasterList[x].category;
      } else {
        this.filtersList[x].toggle = false;
        this.filtersList[x].category = "0";
      }
    }
  }



  // filterToggle(i) {
  //   if (this.filtersList[i].toggle) {
  //     switch (this.filtersList[i].title) {
  //       case 'Abuse':
  //         this.filtersList[i].category = "95";
  //         break;
  //       case 'Animals':
  //         this.filtersList[i].category = "56";
  //         break;
  //       case 'Arts / Cultre':
  //         this.filtersList[i].category = "57";
  //         break;
  //       case 'Child Services':
  //         this.filtersList[i].category = "100";
  //         break;
  //       case 'Courts & Programs':
  //         this.filtersList[i].category = "101";
  //         break;
  //       case 'Crisis & Disaster Services':
  //         this.filtersList[i].category = "102";
  //         break;
  //       case 'Disability Services':
  //         this.filtersList[i].category = "103";
  //         break;
  //       case 'Domestic Violence':
  //         this.filtersList[i].category = "104";
  //         break;
  //       case 'Education':
  //         this.filtersList[i].category = "58";
  //         break;
  //       case 'Employment':
  //         this.filtersList[i].category = "105";
  //         break;
  //       case 'Environment':
  //         this.filtersList[i].category = "69";
  //         break;
  //       case 'Family & Parenting Services':
  //         this.filtersList[i].category = "106";
  //         break;
  //       case 'Financial Services':
  //         this.filtersList[i].category = "107";
  //         break;
  //       case 'Health Services':
  //         this.filtersList[i].category = "59";
  //         break;
  //     }
  //   } else {
  //     this.filtersList[i].category = "0";
  //   }
  //   this.publish(this.filtersList);
  // }

  searching(val) {
    this.searched = val;
    console.log('dt: ', this.searched);
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
      this.http.get('http://southernutahcares.com/wp-json/wp/v2/listings?orderby=title&order=asc&per_page=100&page=' + this.page + "&ts=" +  this.loadDate)
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
    this.storage.get("directory").then((value) => {
      if (value != null) {
      this.data = JSON.parse(value)
      } else this.data = []
      this.data.forEach(function (arrayItem) {      
      });
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

