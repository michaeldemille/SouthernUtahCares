import {Component} from '@angular/core';
import {NavController, Platform, NavParams} from 'ionic-angular';
import {GoogleMap, GoogleMapsEvent, GoogleMapsLatLng} from 'ionic-native';

/*
  Generated class for the MapsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'maps.html',
})
export class MapsPage {

    map: GoogleMap;
    post: any;
 
//     constructor(public navCtrl: NavController, public platform: Platform, public navParams: NavParams) {
//       this.post = navParams.get('post');
        

        
//     }
 
// ngAfterViewInit() {
// this.platform.ready().then(() => {
//             this.loadMap();
//         });
// }

//     loadMap(){

//       GoogleMap.isAvailable().then(() => {
 
//         let location = new GoogleMapsLatLng(this.post.latitude, this.post.longitude);
 
//         this.map = new GoogleMap('map', {
//           'backgroundColor': 'white',
//           'controls': {
//             'compass': true,
//             'myLocationButton': true,
//             'indoorPicker': true,
//             'zoom': true
//           },
//           'gestures': {
//             'scroll': true,
//             'tilt': true,
//             'rotate': true,
//             'zoom': true
//           },
//           'camera': {
//             'latLng': location,
//             'tilt': 30,
//             'zoom': 15,
//             'bearing': 50
//           }
//         });
//       });
 
//         this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
//             console.log('Map is ready!');
//         });
 
//     }
constructor(public _navController: NavController, public platform: Platform, public navParams: NavParams) {
  this.post = navParams.get('post');
    this.platform.ready().then(() => this.onPlatformReady());
  }


  public onPlatformReady(): void {

    GoogleMap.isAvailable().then(() => {
      
      this.map = new GoogleMap('map');
          
      // this.map.on(GoogleMapsEvent.MAP_READY).subscribe(
      //   () => this.onMapReady(),
      //   () => alert("Error: onMapReady")
      // );

      // this.map.on(GoogleMapsEvent.MAP_READY).subscribe(
      //   (data: any) => {
      //     alert("GoogleMap.onMapReady(): ");
      //   },
      //   () => alert("Error: GoogleMapsEvent.MAP_READY")
      // );

      this.map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {
        // alert("GoogleMap.onMapReady(): " + JSON.stringify(data));

        let myPosition = new GoogleMapsLatLng(this.post.latitude, this.post.longitude);
        console.log("My position is", myPosition);

        this.map.animateCamera({ target: myPosition, zoom: 15 });
        this.map.addMarker({ title: this.post.title.rendered, snippet: this.post.venue + "\n" + this.post.address, position: new GoogleMapsLatLng(this.post.latitude, this.post.longitude) });
      });
    });
  }
    public onMapReady(): void {
    // alert('Map ready');
    //this.map.setOptions(mapConfig);
  }
}
