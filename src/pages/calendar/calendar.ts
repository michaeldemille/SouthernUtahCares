import {Component, Input } from '@angular/core';
import {Http} from '@angular/http';
import {Inject} from '@angular/core'
import {NavController, NavParams, MenuController, LoadingController, AlertController, GestureController} from 'ionic-angular';
import {Subscription} from 'rxjs/Subscription';
import {SocialSharing} from 'ionic-native';


// import {MyApp} from '../../app';
import {CalendarDetailPage} from '../calendar-detail/calendar-detail';
import {CalendarService} from '../../providers/calendar-service/calendar-service';
import {ConnectivityService} from '../../providers/connectivity-service/connectivity-service';
import {BookmarkService} from '../../providers/bookmark-service/bookmark-service';


@Component({
  templateUrl: 'calendar.html',
  // directives: [MyApp],
  providers: [],
})
export class CalendarPage {
  public posts: any;
  public currentevents: any;
  public today: any;
  public month: any;
  public day: any;
  public todaydate: any;
  public filterList: Array<{title: string, toggle: boolean, category: any}> =[];
  public pageLoading: any;
  

  constructor(
    public alertCtrl: AlertController,
    public bookmarkService: BookmarkService, 
    public calendarService: CalendarService, 
    public nav: NavController, navParams: NavParams, 
    public gestureControl: GestureController, 
    public load: LoadingController,
    public connectivity: ConnectivityService
    ) {
    
    this.filterList = [
      { title: 'Charity', toggle: true, category: '71' },
      { title: 'Community', toggle: true, category: '70' },
      { title: 'Arts', toggle: true, category: '66' },
      { title: 'Classes', toggle: true, category: '90' }
    ];

    this.today = new Date();
    this.todaydate = this.today.setHours(0,0,0,0);
    this.month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
    this.day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    // this.getPosts();
    this.loadPage();
    calendarService.subscribe((data)=>{
      this.filterList = data;
    });
}

loadPage() {
      setTimeout(() => {
          this.getPosts();
        }, 325);
  }

ngOnInit() {
  this.openLoader()
}

ngAfterContentInit() {
  this.closeLoader()
}
 
  getPosts() {
   
    if (!this.calendarService.calposts) {
    let loading = this.load.create({ content: 'Loading...' });
    loading.present(loading);
    this.calendarService.get()
      .then(data => {
        if (data == null) this.syncPosts()
        this.posts = data;
        this.calendarService.calposts = this.posts
        setTimeout(() => {
          loading.dismiss();
        }, 1);
    console.log(this.posts);
      });
    } else { this.posts = this.calendarService.calposts; }
  }

openLoader() {
  console.log('opened')
this.pageLoading = this.load.create({ content: 'Loading...' });
    this.pageLoading.present(this.pageLoading);
  }

closeLoader() {
    console.log('closed')
setTimeout(() => {
          this.pageLoading.dismiss();
        }, 1);
}

  openPost(post) {
    console.log('hit');
    this.nav.push(CalendarDetailPage, {
      post: post
    });
    // this.nav.push(Event, {
    //   post: post
    // });
  }

  public parseContent(content: string): string {
    return content.replace(/<\/?[^>]+(>|$)/g, "");
  }

searchbar(arr, i) {
  var value;
  if (this.calendarService.searched) { value = this.calendarService.searched.toLowerCase() }
  if ((arr[i].content.rendered.toLowerCase().indexOf(value) > -1 && value != '') ||
  (arr[i].title.rendered.toLowerCase().indexOf(value) > -1 && value != '')) {
  return true;
    } else {
      return false;
    }
}

  headerDate(arr, i) {
    var findCard = true;
    var x = 1;
    while (findCard == true) { 
      if (arr[i-x]) {
      if ((arr[i-x].term_taxonomy_id==this.filterList[0].category || 
      arr[i-x].term_taxonomy_id==this.filterList[1].category || 
      arr[i-x].term_taxonomy_id==this.filterList[2].category ||
      arr[i-x].term_taxonomy_id==this.filterList[3].category) &&
      (this.calendarService.searched == '' || this.searchbar(arr, i-x))) {
        findCard = false;
      } else {
        x++;
      }
    } else {
      findCard = false;
    }
    }
    if ( 
      !arr[i-x] ||
       arr[i].start.getDate() !== arr[i-x].start.getDate() || 
       arr[i].start.getMonth() !== arr[i-x].start.getMonth()
       ) {
    return true;
    } else {
      return false;
    }
  }

syncPosts() {
    if(this.connectivity.isOnline()){
    let loading = this.load.create({ content: 'Sync...' });
    loading.present(loading);
    this.calendarService.load()
      .then(data => {
        this.calendarService.organize(data)
        this.posts = data;
        this.calendarService.calposts = this.posts
        console.log(this.posts);
        loading.dismiss()
        setTimeout(() => {
          loading.dismiss();
        }, 500);
      });
    } else {alert('sorry... no internet, no update')}
  }

bookmark(post) {
  post.format = 'calendar';
  this.bookmarkService.add(post)
}

share(post) {
  SocialSharing.share('Check out this cool event', post.title.rendered, null, post.link)
}

}
