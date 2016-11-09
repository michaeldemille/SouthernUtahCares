import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {Inject} from '@angular/core'
import {NavController, NavParams, LoadingController, Platform} from 'ionic-angular';
// import {Storage, SqlStorage} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {SocialSharing} from 'ionic-native';


import {Listing} from '../listing/listing';
import {DirectoryService} from '../../providers/directory-service/directory-service';
import {ConnectivityService} from '../../providers/connectivity-service/connectivity-service';
import {BookmarkService} from '../../providers/bookmark-service/bookmark-service';


@Component({
  templateUrl: 'directory.html',
  providers: []
})
export class DirectoryPage {
  public posts: any;
  public posts2: any;
  public filterList: Array<{title: string, toggle: boolean, category: any}> =[];
  public pageLoading: any;
  public loadSpinner: any;
  public dtSearch: string = '';
  // public storage: Storage = null; 

  constructor(
    public platform: Platform,
    public bookmarkService: BookmarkService,
    public directoryService: DirectoryService, 
    public nav: NavController, 
    public navParams: NavParams, 
    public load: LoadingController,
    public connectivity: ConnectivityService,
    public storage: Storage
    ) {
  // this.storage = new Storage(SqlStorage);
   this.filterList = [
      { title: 'Abuse', toggle: true, category: '95' },
      { title: 'Animals', toggle: true, category: '56' },
      { title: 'Arts / Culture', toggle: true, category: '57' },
      { title: 'Child Services', toggle: true, category: '100' },
      { title: 'Courts & Programs', toggle: true, category: '101' },
      { title: 'Crisis & Disaster Services', toggle: true, category: '102' },
      { title: 'Disability Services', toggle: true, category: '103' },
      { title: 'Domestic Violence', toggle: true, category: '104' },
      { title: 'Education', toggle: true, category: '58' },
      { title: 'Employment', toggle: true, category: '105' },
      { title: 'Environment', toggle: true, category: '69' },
      { title: 'Family & Parenting Services', toggle: true, category: '106' },
      { title: 'Financial Services', toggle: true, category: '107' },
      { title: 'Food Services', toggle: true, category: '109' },
      { title: 'Health & Insurance Assistance', toggle: true, category: '110' },
      { title: 'Health Services', toggle: true, category: '59' },
      { title: 'Homelessness ', toggle: true, category: '112' },
      { title: 'Housing Assistance', toggle: true, category: '115' },
      { title: 'Human Services', toggle: true, category: '60' },
      { title: 'Legal Services', toggle: true, category: '116' },
      { title: 'Medical Facilities', toggle: true, category: '119' },
      { title: 'Mental Health', toggle: true, category: '121' },
      { title: 'Nutritional Education', toggle: true, category: '123' },
      { title: 'Religious ', toggle: true, category: '88' },
      { title: 'Senior Services Programs', toggle: true, category: '127' },
      { title: 'Substance Abuse', toggle: true, category: '128' },
      { title: 'Support Groups', toggle: true, category: '74' },
      { title: 'Veteran Services', toggle: true, category: '132' },
      { title: 'Volunteer Programs', toggle: true, category: '133' },
      { title: 'Five County AOG Programs', toggle: true, category: '108' },
      { title: 'Government Programs', toggle: true, category: '73' },
      { title: 'Nonprofit Organizations', toggle: true, category: '80' }
    ]; 
  // this.loadPage()
   this.loadPosts();
   directoryService.subscribe((data)=>{
      this.filterList = data;
    });
  }

loadPage() {
      setTimeout(() => {
          this.loadPosts();
        }, 325);
  }

// ngOnInit() {
//   this.openLoader()
//   // this.loadPosts();
// }

// ngAfterContentInit() {
//   this.closeLoader()
// }

ngAfterViewChecked() {
}

openLoader() {
  this.loadSpinner = true;
  console.log('opened')
this.pageLoading = this.load.create({ content: 'Loading...' });
    this.pageLoading.present(this.pageLoading);
  }

closeLoader() {
  this.loadSpinner = false;
    console.log('closed')
setTimeout(() => {
          this.pageLoading.dismiss();
        }, 1);
}

loadPosts(){
  if (this.directoryService.dirposts.length == 0) {
    this.callPosts();
  } else { this.posts = this.directoryService.dirposts; }
}

callPosts() {
// let loading = this.load.create({ content: 'Loading...' });
//     loading.present(loading);
  this.directoryService.get()
  .then(data => {
    this.posts2 = data;
    if (this.posts2.length == 0) {console.log('hit'); this.syncPosts() }
    this.posts = data;
    this.directoryService.dirposts = this.posts;
    // setTimeout(() => {
    //       loading.dismiss();
    //     }, 1);
    console.log(this.posts);
  });
}

openPost(post) {
  console.log('hit');
    this.nav.push(Listing, {
      post: post
    });
    }

public parseContent(content: string): string {
    return content.replace(/<\/?[^>]+(>|$)/g, "");
  }

  searchbar(arr, i) {
  var value;
  if (this.directoryService.searched) { value = this.directoryService.searched.toLowerCase() }
  if ((arr[i].content.rendered.toLowerCase().indexOf(value) > -1 && value != '') ||
  (arr[i].title.rendered.toLowerCase().indexOf(value) > -1 && value != '')) {
  return true;
    } else {
      return false;
    }
}


syncPosts(){
    if(this.connectivity.isOnline()){
    let loading = this.load.create({ content: 'Sync...' });
    loading.present(loading);
    if (this.directoryService.page == 0) this.posts = [];
  this.directoryService.load()
  .then(data => {
    this.posts = this.posts.concat(data);
    if (this.directoryService.data.length == 100) this.syncPosts();
    else {
      this.directoryService.page = 0;
      this.directoryService.loadDate = new Date;
    }
    this.directoryService.organizePosts(this.posts);
    this.directoryService.dirposts = this.posts;
      setTimeout(() => {
          loading.dismiss();
        }, 500);
        this.storage.set ("directory", JSON.stringify(this.posts));
    console.log(this.posts);
  });
  } else {alert('sorry... no internet, no update')}
}

bookmark(post) {
  post.format = 'directory';
  this.bookmarkService.add(post)
}

share(post) {
  SocialSharing.share(null, post.title.rendered, null, post.link)
}

  }
