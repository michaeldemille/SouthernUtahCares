import { Component } from '@angular/core';
import {NavController, NavParams, MenuController, LoadingController, GestureController} from 'ionic-angular';
// import {Storage, SqlStorage} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {SocialSharing} from 'ionic-native';

import {CalendarDetailPage} from '../calendar-detail/calendar-detail';
import {Listing} from '../listing/listing';
import {PostPage} from '../post/post';
import {PbListing} from '../pblisting/pblisting';
import {GivingPostPage} from '../givingpost/givingpost';


import {BookmarkService} from '../../providers/bookmark-service/bookmark-service';


@Component({
  templateUrl: 'bookmarks.html',
})
export class BookmarksPage {
  
  posts: any;
  directory: string = "directory";
  calendar: string = "calendar";
  newsfeed: string = "newsfeed";
  phonebook: string = "phonebook";
  giving: string = "giving";
  public filtersList: Array<{title: string, toggle: boolean, format: any}> = [];

  constructor(
    public bookmarkService: BookmarkService, 
    public nav: NavController, 
    public navParams: NavParams, 
    public gestureControl: GestureController, 
    public load: LoadingController
    ) {
    
    this.getPosts()
    this.filtersList = [
      { title: 'Newsfeed', toggle: true, format: 'newsfeed' },
      { title: 'Calendar', toggle: true, format: 'calendar' },
      { title: 'Directory', toggle: true, format: 'directory' },
      { title: 'Phone Book', toggle: true, format: 'phonebook' },
      { title: 'Giving', toggle: true, format: 'giving'}
    ];  
     bookmarkService.subscribe((data)=>{
      this.filtersList = data;
     
    });
  }

getPosts() {
   
    this.bookmarkService.get()
      .then(data => {
        this.posts = data;
      });
  }

  removePosts(post) {
    let index = this.posts.indexOf(post);
    console.log(index);
    this.bookmarkService.remove(index)
    }

openPost(post) {
    console.log('hit');
    if (post.format == 'calendar') {
      this.nav.push(CalendarDetailPage, {
      post: post
    });
}
if (post.format == 'directory') {
      this.nav.push(Listing, {
      post: post
    });
}
if (post.format == 'newsfeed') {
      this.nav.push(PostPage, {
      post: post
    });
}
if (post.format == 'phonebook') {
      this.nav.push(PbListing, {
      post: post
    });
}
if (post.format == 'giving') {
      this.nav.push(GivingPostPage, {
      post: post
    });
}
}

share(post) {
  SocialSharing.share(null, post.title.rendered, null, post.link)
}

}
