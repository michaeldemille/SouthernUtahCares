import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {Inject} from '@angular/core'
import {NavController, NavParams, LoadingController} from 'ionic-angular';
// import {Storage, SqlStorage} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {SocialSharing} from 'ionic-native';

import {PostPage} from '../post/post';
import {PostService} from '../../providers/post-service/post-service';
import {HomePage} from '../home/home';
import {CalendarPage} from '../calendar/calendar'
import {ConnectivityService} from '../../providers/connectivity-service/connectivity-service';
import {BookmarkService} from '../../providers/bookmark-service/bookmark-service';


@Component({
  templateUrl: 'newsfeed.html',
  // providers: [PostService]
})
export class NewsFeed {
  public posts: any;
  // public storage: Storage = null; 

  constructor(
     public bookmarkService: BookmarkService,
    public postService: PostService, 
    public nav: NavController, 
    navParams: NavParams, 
    public load: LoadingController,
    public connectivity: ConnectivityService,
    public storage: Storage
    ) {
    // this.storage = new Storage(SqlStorage);
    this.getPosts();
  }

  syncPosts() {
    let loading = this.load.create({ content: 'Loading...' });
    loading.present(loading);
    this.postService.reload()
      .then(data => {
        this.cleanPosts(data)
        this.posts = data;
        console.log(this.posts + ' nfposts');
        this.storage.set ("newsFeed", JSON.stringify(this.posts));
        console.log(this.posts + ' sincp2');
        setTimeout(() => {
          loading.dismiss();
        }, 100);
      });
  }

  getPosts() {
    // let loading = this.load.create({ content: 'Loading...' });
    // loading.present(loading);
    this.postService.get()
      .then(data => {
        if (data == null) this.syncPosts()
        this.posts = data;
        console.log(this.posts + ' gtposts');
        // setTimeout(() => {
        //   loading.dismiss();
        // }, 100);
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

  openPost(post) {
    this.nav.push(PostPage, {
      post: post
    });
  }

// openPost(post) {
//     this.nav.push(HomePage);
//   }

  doRefresh(refresher) {
    this.postService.reload()
      .then(data => {
        this.cleanPosts(data)
        this.posts = data;
        this.storage.set ("newsFeed", JSON.stringify(this.posts));
      });
      setTimeout(() => {
    refresher.complete();
        }, 500);
  }

  doInfinite(infinitescroll) {
    this.postService.load()
      .then(data => {
        // this.posts = data;
        this.cleanPosts(data)
        this.posts = this.posts.concat(data);
        this.storage.set ("newsFeed", JSON.stringify(this.posts));
      });
      setTimeout(() => {
    infinitescroll.complete();
        }, 500);

  }
 
  bookmark(post) {
  post.format = 'newsfeed';
  this.bookmarkService.add(post)
}

share(post) {
  SocialSharing.share(null, post.title.rendered, null, post.link)
}

}

