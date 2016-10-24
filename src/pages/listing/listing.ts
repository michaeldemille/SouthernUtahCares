import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {SocialSharing} from 'ionic-native';

import {MapsPage} from '../maps/maps';
import {BookmarkService} from '../../providers/bookmark-service/bookmark-service';


@Component({
  templateUrl: 'listing.html',
})
export class Listing {
 post: any;

  constructor(public nav: NavController, public bookmarkService: BookmarkService, navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.post = navParams.get('post');
    

}

openMap(post) {
        document.getElementById("content").hidden = true
      this.nav.push(MapsPage, {
        post: post
      })
        .then(() => {
          const subscription = this.nav.viewWillEnter.subscribe(() => {
            document.getElementById("content").hidden = false;
            subscription.unsubscribe();
          });
    });
  }
bookmark(post) {
  post.format = 'directory';
  this.bookmarkService.add(post)
}
share(post) {
  SocialSharing.share(null, post.title.rendered, null, post.link)
}

}
