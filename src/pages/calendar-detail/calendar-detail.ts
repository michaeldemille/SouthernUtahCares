import {Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { InAppBrowser } from 'ionic-native';

import {MapsPage} from '../maps/maps';
// import {MapPage} from '../map/map';


@Component({
  templateUrl: 'calendar-detail.html',
})
export class CalendarDetailPage {
   post: any;

  constructor(public nav: NavController, navParams: NavParams) {
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
        let browser = new InAppBrowser(url, "_self", "location=true");

  }
}

