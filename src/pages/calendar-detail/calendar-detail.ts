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

  openLink(url) {
    // InAppBrowser.open(url, "_self");
        // InAppBrowser.open(url, "_self", "location=true");
        console.log('inappbrowser hit2');
        let browser = new InAppBrowser(url, "_blank", "location=true&clearcache=true");
  }

  openHTTPLink(url) {
    // InAppBrowser.open(url, "_self");
        // InAppBrowser.open(url, "_self", "location=true");
        console.log('inappbrowser http hit');
        let browser = new InAppBrowser("http://" + url, "_blank", "location=true&clearcache=true");
  }

openAddress(url) {
    // InAppBrowser.open(url, "_self");
        // InAppBrowser.open(url, "_self", "location=true");
        console.log('inappbrowser hit3');
        let browser = new InAppBrowser("http://www.google.com/maps/place/" + url, "_blank", "location=true&clearcache=true");
  }

// openLink(url) {
//   console.log('hit browser2')
//   window.open(url)
//   }

bookmark(post) {
  post.format = 'calendar';
  this.bookmarkService.add(post)
}
  share(post) {
  SocialSharing.share(null, post.title.rendered, null, post.link)
}

}

