import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage'
// import {InAppBrowser} from 'ionic-native';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {NewsFeed} from '../pages/newsfeed/newsfeed';
import {Giving} from '../pages/giving/giving';
import {GivingPostPage} from '../pages/givingpost/givingpost';
import {CalendarPage} from '../pages/calendar/calendar';
import {DirectoryPage} from '../pages/directory/directory';
import {PhoneBookPage} from '../pages/phonebook/phonebook';
import {MapsPage} from '../pages/maps/maps';
import {BookmarksPage} from '../pages/bookmarks/bookmarks';
import {CalendarDetailPage} from '../pages/calendar-detail/calendar-detail';
import {Listing} from '../pages/listing/listing';
import {PostPage} from '../pages/post/post';
import {PbListing} from '../pages/pblisting/pblisting';
import {HighlightPost} from '../pages/highlightpost/highlightpost';

import {PostService} from '../providers/post-service/post-service';
import {HighlightService} from '../providers/highlight-service/highlight-service';
import {GivingService} from '../providers/giving-service/giving-service';
import {CalendarService} from '../providers/calendar-service/calendar-service';
import {DirectoryService} from '../providers/directory-service/directory-service';
import {PhoneBookService} from '../providers/phone-book-service/phone-book-service';
import {ConnectivityService} from '../providers/connectivity-service/connectivity-service';
import {BookmarkService} from '../providers/bookmark-service/bookmark-service';
import {StateService} from '../providers/state-service/state-service';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NewsFeed,
    CalendarPage,
    DirectoryPage,
    PhoneBookPage,
    MapsPage,
    BookmarksPage,
    CalendarDetailPage,
    Listing,
    PostPage,
    PostPage,
    PbListing,
    Giving,
    GivingPostPage,
    HighlightPost
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NewsFeed,
    CalendarPage,
    DirectoryPage,
    PhoneBookPage,
    MapsPage,
    BookmarksPage,
    CalendarDetailPage,
    Listing,
    PostPage,
    Giving,
    GivingPostPage,
    PbListing,
    HighlightPost
  ],
  providers: [
  PostService,
  DirectoryService,
  CalendarService,
  PhoneBookService,
  ConnectivityService,
  BookmarkService,
  StateService,
  GivingService,
  HighlightService
  // InAppBrowser,
  ]
})
export class AppModule {}
