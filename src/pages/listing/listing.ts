import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {MapsPage} from '../maps/maps';



@Component({
  templateUrl: 'listing.html',
})
export class Listing {
 post: any;

  constructor(public nav: NavController, navParams: NavParams) {
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

}
