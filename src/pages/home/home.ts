import {Component} from '@angular/core';
import { NavController, LoadingController, Platform, NavParams} from 'ionic-angular';
// import { InAppBrowser } from 'ionic-native';
// import {Storage, SqlStorage} from 'ionic-angular';
import { Storage } from '@ionic/storage';

import {MyApp} from '../../app/app.component';


import {NewsFeed} from '../newsfeed/newsfeed';
import {Giving} from '../giving/giving';
import {HighlightPost} from '../highlightpost/highlightpost';
import {CalendarPage} from '../calendar/calendar';
import {DirectoryPage} from '../directory/directory';
import {PhoneBookPage} from '../phonebook/phonebook';
import {BookmarksPage} from '../bookmarks/bookmarks';

import {PostService} from '../../providers/post-service/post-service';
import {GivingService} from '../../providers/giving-service/giving-service';
import {CalendarService} from '../../providers/calendar-service/calendar-service';
import {DirectoryService} from '../../providers/directory-service/directory-service';
import {PhoneBookService} from '../../providers/phone-book-service/phone-book-service';
import {BookmarkService} from '../../providers/bookmark-service/bookmark-service';
import {ConnectivityService} from '../../providers/connectivity-service/connectivity-service';
import {StateService} from '../../providers/state-service/state-service';
import {HighlightService} from '../../providers/highlight-service/highlight-service';



@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  pages: Array<{title: string, component: any, icon: any}>;
  public posts: any;
  public nfposts: any;
  public clposts: any;
  public dtposts: Array<any> = [];
  public pbposts: Array<any> = [];
  public newsFeed: any = {title: 'News Feed', component: NewsFeed};
  public giving: any = {title: 'Giving', component: Giving};
  public calendarPage: any = {title: 'Calendar', component: CalendarPage};
  public directoryPage: any = {title: 'Directory', component: DirectoryPage};
  public phoneBookPage: any = {title: 'Phone Book', component: PhoneBookPage};
  public bookmarksPage: any = {title: 'Bookmarks', component: BookmarksPage};
  // public storage: Storage = null;  

  constructor(
    // public myApp: MyApp,
    public bookmarkService: BookmarkService,
    public calendarService: CalendarService,
    public postService: PostService,
    public highlightService: HighlightService,
    public directoryService: DirectoryService,
    public phoneBookService: PhoneBookService,
    public stateService: StateService,
    public nav: NavController,
    public load: LoadingController,
    public platform: Platform,
    public connectivity: ConnectivityService,
    public storage: Storage,
    public navParams: NavParams
  ) {

    this.pages = [
      { title: 'Home', component: HomePage, icon: 'ios-home' },
      { title: 'Calendar', component: CalendarPage, icon: 'ios-calendar' },
      { title: 'Giving', component: Giving, icon: 'ios-heart-outline' },
      { title: 'Directory', component: DirectoryPage, icon: 'ios-people' },
      { title: 'Phone Book', component: PhoneBookPage, icon: 'ios-call' },
      { title: 'News Feed', component: NewsFeed, icon: 'ios-globe' },
      { title: 'Bookmarks', component: BookmarksPage, icon: 'ios-bookmark' }
    ];

    // this.initializeApp();
    
  // this.storage = new Storage(SqlStorage);
}

initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.getPosts();
    });
  }

loadnfPosts() {
    let loading = this.load.create({ content: 'Loading...' });
    loading.present(loading);
    this.postService.load()
      .then(data => {
        this.postService.cleanPosts(data)
        this.nfposts = data;
        this.storage.set ("newsFeed", JSON.stringify(this.nfposts));
        console.log(this.nfposts);
        setTimeout(() => {
          loading.dismiss();
        }, 100);
      });
  }


  loadclposts() {
    if(this.connectivity.isOnline()){
    let loading = this.load.create({ content: 'Sync...' });
    loading.present(loading);
    this.calendarService.load()
      .then(data => {
        this.calendarService.organize(data)
        this.clposts = data;
        this.calendarService.calposts = this.clposts
        console.log(this.clposts);
        loading.dismiss()
        setTimeout(() => {
          loading.dismiss();
        }, 500);
      });
    } else {alert('sorry... no internet, no update')}
  }

  loadlistings(){
    if(this.connectivity.isOnline()){
    let loading = this.load.create({ content: 'Sync...' });
    loading.present(loading);
    if (this.directoryService.page == 0) this.dtposts = [];
  this.directoryService.load()
  .then(data => {
    this.dtposts = this.dtposts.concat(data);
    if (this.directoryService.data.length == 100) this.loadlistings();
    else {
      this.directoryService.page = 0;
      this.directoryService.loadDate = new Date;
    }
    this.directoryService.organizePosts(this.dtposts);
    this.directoryService.dirposts = this.dtposts;
      setTimeout(() => {
          loading.dismiss();
        }, 500);
        this.storage.set ("directory", JSON.stringify(this.dtposts));
    console.log(this.dtposts);
  });
  } else {alert('sorry... no internet, no update')}
}

loadphonebook(){
  if(this.connectivity.isOnline()){
    let loading = this.load.create({ content: 'Sync...' });
    loading.present(loading);
    if (this.phoneBookService.page == 0) this.pbposts = [];
  this.phoneBookService.load()
  .then(data => {
    this.pbposts = this.pbposts.concat(data);
    if (this.phoneBookService.data.length == 100) this.loadphonebook();
    else {
      this.phoneBookService.page = 0;
      this.phoneBookService.loadDate = new Date;
    }
    // this.pbposts.sort((a, b) => {
    //   a = a.title.rendered.toLowerCase();
    //   b = b.title.rendered.toLowerCase();
    //   return b > a ? -1 : b < a ? 1 : 0;
    // });
    this.phoneBookService.organizePosts(this.pbposts);
      this.phoneBookService.phbposts = this.pbposts;
       this.storage.set ("phoneBook", JSON.stringify(this.pbposts));
      setTimeout(() => {
          loading.dismiss();
        }, 500);
    console.log(this.pbposts);
  });
  } else {alert('sorry... no internet, no update')}
}

openLink(url) {
    // InAppBrowser.open(url, "_blank");
        // InAppBrowser.open(url, "_self", "location=true");

  }

  openPage(url) {
    this.stateService.state = url.title;
    console.log(this.stateService.state);
  //   // Reset the content nav to have just this page
  //   // we wouldn't want the back button to show in this scenario
    // console.log(url)
    this.nav.setRoot(url.component);
  }

// openPage(page) {
//   console.log(page.component);
//     // this.menu.close();
//     // this.state = page.title;
//     // Reset the content nav to have just this page
//     // we wouldn't want the back button to show in this scenario
//     this.nav.setRoot(page.component);
//   }

syncPosts() {
    let loading = this.load.create({ content: 'Loading...' });
    loading.present(loading);
    this.highlightService.reload()
      .then(data => {
        console.log(data, 'sync1')
        // this.cleanPosts(data)
        this.posts = data;
        this.storage.set ("highlight", JSON.stringify(this.posts));
        console.log(this.posts + 'sync');
        setTimeout(() => {
          loading.dismiss();
        }, 100);
      });
  }

  getPosts() {
    // let loading = this.load.create({ content: 'Loading...' });
    // loading.present(loading);
    this.highlightService.get()
      .then(data => {
        if (data == null) this.syncPosts()
        this.posts = data;
        console.log(this.posts + 'get');
        // setTimeout(() => {
        //   loading.dismiss();
        // }, 100);
      });
  }

cleanPosts(data) {
  data.forEach(function (post) {
    // post.article = post.content.rendered.match(/http:[^"]+"/i);
    // post.article[0] = post.article[0].slice(0, -1);
  post.content.rendered = post.content.rendered.replace(/<a\b[^>]*>(.*?)<\/a>/i,"");
  // console.log(post.article[0]);
});
}

  openPost(post) {
    this.nav.push(HighlightPost, {
      post: post
    });
  }

// openPost(post) {
//     this.nav.push(HomePage);
//   }

  doRefresh(refresher) {
    this.highlightService.reload()
      .then(data => {
        this.cleanPosts(data)
        this.posts = data;
        this.storage.set ("highlight", JSON.stringify(this.posts));
      });
      setTimeout(() => {
    refresher.complete();
        }, 500);
  }

  doInfinite(infinitescroll) {
    this.highlightService.load()
      .then(data => {
        // this.posts = data;
        this.cleanPosts(data)
        this.posts = this.posts.concat(data);
        this.storage.set ("highlight", JSON.stringify(this.posts));
      });
      setTimeout(() => {
    infinitescroll.complete();
        }, 500);

  }
 
  bookmark(post) {
  post.format = 'highlight';
  this.bookmarkService.add(post)
}

}
