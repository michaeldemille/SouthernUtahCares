import {Component, ViewChild} from '@angular/core';
import {Http} from '@angular/http';
import {Inject} from '@angular/core'
import {NavController, NavParams, LoadingController, Content} from 'ionic-angular';
// import {Storage, SqlStorage} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {SocialSharing, Keyboard} from 'ionic-native';

import {GivingPostPage} from '../givingpost/givingpost';
import {GivingService} from '../../providers/giving-service/giving-service';
import {HomePage} from '../home/home';
import {CalendarPage} from '../calendar/calendar'
import {ConnectivityService} from '../../providers/connectivity-service/connectivity-service';
import {BookmarkService} from '../../providers/bookmark-service/bookmark-service';


@Component({
  templateUrl: 'giving.html',
})
export class Giving {

  @ViewChild(Content) content: Content;

  public posts: any;
  public pageLoading: any;
  public loadSpinner: any;
  public givingSearch: string = '';
  public kShow: any = Keyboard.onKeyboardShow();

  // public storage: Storage = null; 

  constructor(
    public bookmarkService: BookmarkService,
    public givingService: GivingService, 
    public nav: NavController, 
    public navParams: NavParams, 
    public load: LoadingController,
    public connectivity: ConnectivityService,
    public storage: Storage
    ) {
    // this.storage = new Storage(SqlStorage);
    this.getPosts();
    // this.loadPage();
  }

  ngAfterViewInit() {
    this.content.ionScroll.subscribe(($event: any) => {
      if(this.kShow) {
    Keyboard.close();
      }
    });
  }

  loadPage() {
      setTimeout(() => {
          this.getPosts();
        }, 325);
  }

//   ngOnInit() {
//   this.openLoader()
//   // this.loadPosts();
// }

// ngAfterContentInit() {
//   this.closeLoader()
// }

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

  searchbar(arr, i) {
  var value;
  if (this.givingService.searched) { value = this.givingService.searched.toLowerCase() }
  if ((arr[i].content.rendered.toLowerCase().indexOf(value) > -1 && value != '') ||
  (arr[i].title.rendered.toLowerCase().indexOf(value) > -1 && value != '')) {
  return true;
    } else {
      return false;
    }
}

  syncPosts() {
    let loading = this.load.create({ content: 'Loading...' });
    loading.present(loading);
    this.givingService.reload()
      .then(data => {
        this.cleanPosts(data)
        this.posts = data;
        this.storage.set ("giving", JSON.stringify(this.posts));
        console.log(this.posts);
        setTimeout(() => {
          loading.dismiss();
        }, 100);
      });
  }

  getPosts() {
    // let loading = this.load.create({ content: 'Loading...' });
    // loading.present(loading);
    this.givingService.get()
      .then(data => {
        if (data == null) this.syncPosts()
        this.posts = data;
        console.log(this.posts);
        // setTimeout(() => {
        //   loading.dismiss();
        // }, 100);
      });
  }

cleanPosts(data) {
  data.forEach(function (post) {
    post.article = '';
    post.article = post.content.rendered.match(/http:[^"]+"/i);
    if (post.article) post.article[0] = post.article[0].slice(0, -1);
   /* post.content.rendered = post.content.rendered.replace(/<a\b[^>]*>(.*?)<\/a>/i,"");
    post.content.rendered = post.content.rendered.replace('website:' ,"");
    post.content.rendered = post.content.rendered.replace('Website:' ,""); */


  // console.log(post.article[0]);
});
}

  openPost(post) {
    this.nav.push(GivingPostPage, {
      post: post
    });
  }

// openPost(post) {
//     this.nav.push(HomePage);
//   }

  doRefresh(refresher) {
    this.givingService.reload()
      .then(data => {
        this.cleanPosts(data)
        this.posts = data;
        this.storage.set ("giving", JSON.stringify(this.posts));
      });
      setTimeout(() => {
    refresher.complete();
        }, 500);
  }

  doInfinite(infinitescroll) {
    this.givingService.load()
      .then(data => {
        // this.posts = data;
        this.cleanPosts(data)
        this.posts = this.posts.concat(data);
        this.storage.set ("giving", JSON.stringify(this.posts));
      });
      setTimeout(() => {
    infinitescroll.complete();
        }, 500);

  }
 
  bookmark(post) {
  post.format = 'giving';
  this.bookmarkService.add(post)
}

share(post) {
  SocialSharing.share('Check out this cool service opportunity', post.title.rendered, null, post.link)
}

}

