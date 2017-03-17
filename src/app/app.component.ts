import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, LoadingController } from 'ionic-angular';
import { StatusBar, Splashscreen, Keyboard } from 'ionic-native';

import {HomePage} from '../pages/home/home';
import {NewsFeed} from '../pages/newsfeed/newsfeed';
import {Giving} from '../pages/giving/giving';
import {CalendarPage} from '../pages/calendar/calendar';
import {DirectoryPage} from '../pages/directory/directory';
import {PhoneBookPage} from '../pages/phonebook/phonebook';
import {MapsPage} from '../pages/maps/maps';
import {BookmarksPage} from '../pages/bookmarks/bookmarks';

import {PostService} from '../providers/post-service/post-service';
import {GivingService} from '../providers/giving-service/giving-service';
import {CalendarService} from '../providers/calendar-service/calendar-service';
import {DirectoryService} from '../providers/directory-service/directory-service';
import {PhoneBookService} from '../providers/phone-book-service/phone-book-service';
import {ConnectivityService} from '../providers/connectivity-service/connectivity-service';
import {BookmarkService} from '../providers/bookmark-service/bookmark-service';
import {StateService} from '../providers/state-service/state-service';
import {HighlightService} from '../providers/highlight-service/highlight-service';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{title: string, component: any, icon: any}>;
  search: string = '';
  dtSearch: string = '';
  pbSearch: string = '';
  givingSearch: string = '';
  resetFilter: boolean = true;
  public posts: any;
  


  constructor(public platform: Platform,
    public menu: MenuController,
    public postService: PostService,
    public highlightService: HighlightService,
    public calendarService: CalendarService,
    public directoryService: DirectoryService,
    public phoneBookService: PhoneBookService,
    public bookmarkService: BookmarkService,
    public givingService: GivingService,
    public stateService: StateService,
    public connectivity: ConnectivityService,
    public load: LoadingController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'ios-home-outline' },
      { title: 'Calendar', component: CalendarPage, icon: 'ios-calendar-outline' },
      { title: 'Opportunities', component: Giving, icon: 'ios-heart-outline' },
      { title: 'Directory', component: DirectoryPage, icon: 'ios-people-outline' },
      { title: 'Phone Book', component: PhoneBookPage, icon: 'ios-call-outline' },
      // { title: 'News Feed', component: NewsFeed, icon: 'ios-globe-outline' },
      { title: 'Bookmarks', component: BookmarksPage, icon: 'ios-bookmark-outline' }
    ];

    this.platform.registerBackButtonAction(() => {
    console.log('back button pressed')
    if (this.nav.canGoBack()) {
      console.log('nav can go back')
      this.nav.pop()
    } else if (this.nav.getActive().component.name != "HomePage") {
      this.nav.setRoot(HomePage)
    } else {this.platform.exitApp();}
  }, 100);

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      
      if(this.connectivity.isOnline()){
        this.syncPosts()
      }
    });
  }

  openPage(page) {
    this.menu.close();
    this.stateService.state = page.title;
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

syncPosts() {
    // let loading = this.load.create({ content: 'Loading...' });
    // loading.present(loading);
    this.highlightService.reload()
      .then(data => {
        console.log(data, 'sync1')
        // this.cleanPosts(data)
        this.posts = data;
        // this.storage.set ("highlight", JSON.stringify(this.posts));
        console.log(this.posts + 'sync');
        // setTimeout(() => {
        //   loading.dismiss();
        // }, 100);
      });
  }

  cleanPosts(data) {
  data.forEach(function (post) {
    post.article = ''
    post.article = post.content.rendered.match(/http:[^"]+"/i);
    if (post.article) post.article[0] = post.article[0].slice(0, -1);
  post.content.rendered = post.content.rendered.replace(/<a\b[^>]*>(.*?)<\/a>/i,"");
  // console.log(post.article[0]);
});
}

  // getPosts() {
  //   // let loading = this.load.create({ content: 'Loading...' });
  //   // loading.present(loading);
  //   this.highlightService.get()
  //     .then(data => {
  //       if (data == null) this.syncPosts()
  //       this.posts = data;
  //       console.log(this.posts + 'get');
  //       // setTimeout(() => {
  //       //   loading.dismiss();
  //       // }, 100);
  //     });
  // }


}
