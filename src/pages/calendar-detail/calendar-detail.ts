import {Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { InAppBrowser, SocialSharing } from 'ionic-native';

import {BookmarkService} from '../../providers/bookmark-service/bookmark-service';

import {MapsPage} from '../maps/maps';
// import {MapPage} from '../map/map';


@Component({
  templateUrl: 'calendar-detail.html',
})
export class CalendarDetailPage {
   post: any;

  constructor(public nav: NavController, public bookmarkService: BookmarkService, navParams: NavParams) {
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

  // openLink(url) {
  //   // InAppBrowser.open(url, "_self");
  //       // InAppBrowser.open(url, "_self", "location=true");
  //       console.log('inappbrowser hit');
  //       let browser = new InAppBrowser(url, "_self", "location=true");
  // }

openLink(url) {
  console.log('hit browser')
  window.open(url)
  }

bookmark(post) {
  post.format = 'calendar';
  this.bookmarkService.add(post)
}
  share(post) {
  SocialSharing.share(null, post.title.rendered, null, post.link)
}

}

