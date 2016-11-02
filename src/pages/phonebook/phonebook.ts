import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {Inject} from '@angular/core'
import {NavController, NavParams, LoadingController} from 'ionic-angular';
// import {Storage, SqlStorage} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {SocialSharing} from 'ionic-native';

import {PbListing} from '../pblisting/pblisting';
import {PhoneBookService} from '../../providers/phone-book-service/phone-book-service';
import {ConnectivityService} from '../../providers/connectivity-service/connectivity-service';
import {BookmarkService} from '../../providers/bookmark-service/bookmark-service';


@Component({
  templateUrl: 'phonebook.html',
  providers: []
})
export class PhoneBookPage {
  public posts: Array<any> = [];
  public posts2: any;
  public pageLoading: any;
  public loadSpinner: any;
  public pbSearch: string = '';

  // public storage: Storage = null; 

  constructor(
     public bookmarkService: BookmarkService,
    public phoneBookService: PhoneBookService, 
    public nav: NavController, 
    navParams: NavParams, 
    public load: LoadingController,
    public connectivity: ConnectivityService,
    public storage: Storage
    ) {
  //  this.storage = new Storage(SqlStorage);
  //  this.loadPosts();
  this.loadPage();
  }

loadPage() {
      setTimeout(() => {
          this.loadPosts();
        }, 325);
  }

  ngOnInit() {
  this.openLoader()
  // this.loadPosts();
}

ngAfterContentInit() {
  this.closeLoader()
}

ngAfterViewChecked() {
}

openLoader() {
  this.loadSpinner = true;
  console.log('opened')
this.pageLoading = this.load.create({ content: 'Loading...' });
    this.pageLoading.present(this.pageLoading);
  }

closeLoader() {
  this.loadSpinner = false;
    console.log('closed')
setTimeout(() => {
          this.pageLoading.dismiss();
        }, 1);
}

loadPosts(){
  if (this.phoneBookService.phbposts.length == 0) {
    this.callPosts();
  } else { this.posts = this.phoneBookService.phbposts }
}

callPosts() {
// let loading = this.load.create({ content: 'Loading...' });
//     loading.present(loading);
console.log(this.posts)
  this.phoneBookService.get()
  .then(data => { 
    console.log(data)
    this.posts2 = data;
    if (this.posts2.length == 0) {console.log('hit'); this.syncPosts() }
    this.posts = this.posts.concat(data);
    // if (this.phoneBookService.data.length == 100) this.callPosts();
    // this.posts.sort((a, b) => {
    //   a = a.title.rendered.toLowerCase();
    //   b = b.title.rendered.toLowerCase();
    //   return b > a ? -1 : b < a ? 1 : 0;
    // });
    this.phoneBookService.phbposts = this.posts;
    // setTimeout(() => {
    //       loading.dismiss();
    //     }, 1);
    console.log(this.posts);
  });
}


openPost(post) {
  console.log('hit');
    this.nav.push(PbListing, {
      post: post
    });
    }

    public parsect(content: string): string {
    return content.replace(/<\/?[^>]+(>|$)/g, "");
  }

  searchbar(arr, i) {
  var value;
  if (this.phoneBookService.searched) { value = this.phoneBookService.searched.toLowerCase() }
  if ((arr[i].content.rendered.toLowerCase().indexOf(value) > -1 && value != '') ||
  (arr[i].title.rendered.toLowerCase().indexOf(value) > -1 && value != '')) {
  return true;
    } else {
      return false;
    }
}

syncPosts(){
  if(this.connectivity.isOnline()){
    let loading = this.load.create({ content: 'Sync...' });
    loading.present(loading);
    if (this.phoneBookService.page == 0) this.posts = [];
  this.phoneBookService.load()
  .then(data => {
    this.posts = this.posts.concat(data);
    if (this.phoneBookService.data.length == 100) this.syncPosts();
    else {
      this.phoneBookService.page = 0;
      this.phoneBookService.loadDate = new Date;
    }
    this.phoneBookService.organizePosts(this.posts);
      this.phoneBookService.phbposts = this.posts;
       this.storage.set ("phoneBook", JSON.stringify(this.posts));
      setTimeout(() => {
          loading.dismiss();
        }, 500);
    console.log(this.posts);
  });
  } else {alert('sorry... no internet, no update')}
}

bookmark(post) {
  post.format = 'phonebook';
  this.bookmarkService.add(post)
}

share(post) {
  SocialSharing.share(null, post.title.rendered, null, post.link)
}

  }
