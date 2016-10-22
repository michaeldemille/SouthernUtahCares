// import {Component} from '@angular/core';
// import {NavController, NavParams} from 'ionic-angular';
// import {ConnectivityService} from '../../providers/connectivity-service/connectivity-service';

// @Component({
//   templateUrl: 'map.html',
// })
// export class MapPage {
 
//   map: any;
//   mapInitialised: boolean = false;
//   apiKey: any = 'AIzaSyCUonbTmem1RQlvIi9Vy4du_dhuBcKlOIU';  
//   post: any;


//   constructor(public nav: NavController, public connectivity: ConnectivityService, navParams: NavParams) {
//     this.post = navParams.get('post');
//     this.loadGoogleMaps();
//   }
 
//   loadGoogleMaps(){
//     this.addConnectivityListeners();
 
//     if(typeof google == "undefined" || typeof google.maps == "undefined"){
 
//         console.log("Google maps JavaScript needs to be loaded.");
//         this.disableMap();
 
//         if(this.connectivity.isOnline()){
//             console.log("online, loading map");
 
//             //Load the SDK
//             window['mapInit'] = () => {
//                 this.initMap();
//                 this.enableMap();
//             }
 
//             let script = document.createElement("script");
//             script.id = "googleMaps";
 
//             if(this.apiKey){
//                 script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
//             } else {
//                 script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';               
//             }
 
//             document.body.appendChild(script);  
 
//         }   
//     }
//     else {
 
//         if(this.connectivity.isOnline()){
//             console.log("showing map");
//             this.initMap();
//             this.enableMap();
//         }
//         else {
//             console.log("disabling map");
//             this.disableMap();
//         }
 
//     }
 
//   }
 
//   initMap(){
 
//     this.mapInitialised = true;
 
//     navigator.geolocation.getCurrentPosition( (position) => {
 
//         let latLng = new google.maps.LatLng(this.post.latitude, this.post.longitude);
 
//         let mapOptions = {
//           center: latLng,
//           zoom: 15,
//           mapTypeId: google.maps.MapTypeId.ROADMAP
//         }
 
//         this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
//         this.addMarker();
 
//     }, (error) => {
//         console.log(error);
//     });
 
//   }

//   addMarker(){
 
//   let marker = new google.maps.Marker({
//     map: this.map,
//     animation: google.maps.Animation.DROP,
//     position: this.map.getCenter()
//   });

//   let content = '<b>' + this.post.venue + '</b>' + '<br>' + this.post.address;          
 
//   this.addInfoWindow(marker, content);
// }

// addInfoWindow(marker, content){
 
//   let infoWindow = new google.maps.InfoWindow({
//     content: content
//   });

//   infoWindow.open(this.map, marker);

//   google.maps.event.addListener(marker, 'click', function(){
//     infoWindow.open(this.map, marker);
//   });
 
// }
 
//   disableMap(){
//     console.log("disable map");
//   }
 
//   enableMap(){
//     console.log("enable map");
//   }
 
//   addConnectivityListeners(){
//     var me = this;
 
//     var onOnline = () => {
//         setTimeout(() => {
//             if(typeof google == "undefined" || typeof google.maps == "undefined"){
//                 this.loadGoogleMaps();
//             } else {
//                 if(!this.mapInitialised){
//                     this.initMap();
//                 }
 
//                 this.enableMap();
//             }
//         }, 2000);
//     };
 
//     var onOffline = () => {
//         this.disableMap();
//     };
 
//     document.addEventListener('online', onOnline, false);
//     document.addEventListener('offline', onOffline, false);
 
//   }
 
// }
