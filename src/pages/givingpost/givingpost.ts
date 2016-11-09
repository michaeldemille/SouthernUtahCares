import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { InAppBrowser, SocialSharing } from 'ionic-native';

import {BookmarkService} from '../../providers/bookmark-service/bookmark-service';



@Component({
  templateUrl: 'givingpost.html',
})
export class GivingPostPage {
 post: any;
 

  constructor(public nav: NavController, public navParams: NavParams, public bookmarkService: BookmarkService) {
    // If we navigated to this page, we will have an item available as a nav param
    // this.post = navParams.get('post');
        this.post = navParams.get('post');

}

openLink(url) {
  console.log('hit');
    // InAppBrowser.open(url, "_self");
    let browser = new InAppBrowser(url, "_blank", "location=true&clearcache=true");
        // InAppBrowser.open(url, "_self", "location=true");
  }

  openHTTPLink(url) {
    // InAppBrowser.open(url, "_self");
        // InAppBrowser.open(url, "_self", "location=true");
        console.log('inappbrowser http hit');
        let browser = new InAppBrowser("http://" + url, "_blank", "location=true&clearcache=true");
  }

  bookmark(post) {
  post.format = 'giving';
  this.bookmarkService.add(post)
}

share(post) {
  SocialSharing.share('Check out this cool service opportunity', post.title.rendered, null, post.link)
}
}
