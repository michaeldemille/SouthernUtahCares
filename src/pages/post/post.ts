import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { InAppBrowser, SocialSharing } from 'ionic-native';

import {BookmarkService} from '../../providers/bookmark-service/bookmark-service';

@Component({
  templateUrl: 'post.html',
})
export class PostPage {
 post: any;

  constructor(public nav: NavController, public bookmarkService: BookmarkService, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    // this.post = navParams.get('post');
        this.post = navParams.get('post');

}

openLink(url) {
  console.log('hit2');
    // InAppBrowser.open(url, "_self");
    let browser = new InAppBrowser(url, "_blank", "location=true&clearcache=true");
        // InAppBrowser.open(url, "_self", "location=true");
  }

// openLink(url) {
//   window.open(url)
//   }

bookmark(post) {
  post.format = 'newsfeed';
  this.bookmarkService.add(post)
}
  share(post) {
  SocialSharing.share(null, post.title.rendered, null, post.link)
}
  
}
