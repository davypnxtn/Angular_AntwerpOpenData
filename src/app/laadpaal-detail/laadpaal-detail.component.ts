import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LaadpalenService } from 'src/Services/laadpalen.service';
import { IFeatures } from 'src/Models/features';
import { IRootObject } from 'src/Models/rootObject';
//import { MapInfoWindow } from '@angular/google-maps';

@Component({
  selector: 'app-laadpaal-detail',
  templateUrl: './laadpaal-detail.component.html',
  styleUrls: ['./laadpaal-detail.component.css']
})
export class LaadpaalDetailComponent implements OnInit {

  //@ViewChild(MapInfoWindow, {static: false}) infoWindow: MapInfoWindow;
  public id: number;
  public feature: IFeatures;
  public errorMsg: string;
  public showRoute: boolean = false;
  
  public map: google.maps.Map<Element>; 
  public startLocation: google.maps.LatLngLiteral;

  public center: google.maps.LatLngLiteral;

  constructor(private route: ActivatedRoute, private _laadpalenService: LaadpalenService) { }

  async ngOnInit(): Promise<void> {

    await this.fetchData();
    if (this.errorMsg) {
      console.log("error", this.errorMsg);
    };

  }

  async fetchData() {

    return new Promise((resolve, reject) => {
      this.route.paramMap.subscribe((params: ParamMap) => {
        let id: number = parseInt(params.get('id'));
        this.id = id;
        console.log("id", this.id);

        this._laadpalenService.getLaadpalen().subscribe((data: IRootObject) => {
          this.feature = data.features.filter(item => item.attributes.OBJECTID === this.id).pop();
          this.center = {
            lat: this.feature.geometry.y,
            lng: this.feature.geometry.x
          };
          console.log("feature", this.feature);
          resolve({});
        }, (error: any) => {
          this.errorMsg = error;
          reject(error);
        });
      });
    });

  }

  // --------------------experimental----------------------
  initMap() {

    this.showRoute = true;
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: this.center,
      zoom: 17,
      zoomControl: true,
      scrollwheel: true,
      disableDoubleClickZoom: true,
      maxZoom: 20,
      minZoom: 10
    });

    let contentString: string = "<div>" + 
    this.feature.attributes.Straatnaam + " " + this.feature.attributes.Huisnummer + "<br>" +
    this.feature.attributes.Postcode + " " + this.feature.attributes.District + "</div>"

    let infowindow: google.maps.InfoWindow = new google.maps.InfoWindow({
      content: contentString
    })

    let marker: google.maps.Marker = new google.maps.Marker({
      map: this.map,
      draggable: false,
      animation: google.maps.Animation.DROP,
      position: this.center
    });

    marker.addListener('click', () => {
      infowindow.open(this.map, marker)
    });

    document.getElementById('directionsPanel').textContent = "";

  }

  async getUserLocation() {

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => {
        this.startLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.showRoute = true;
        resolve({});
      }, (error: any) => {
        this.errorMsg = error
        reject(error);
      });
    });

  }

  async calcRoute() {

    await this.getUserLocation();
    let directionService: google.maps.DirectionsService = new google.maps.DirectionsService();
    let directionsRenderer: google.maps.DirectionsRenderer = new google.maps.DirectionsRenderer();
    let routeMapOptions: google.maps.MapOptions = {
      center: this.startLocation,
      zoomControl: true,
      scrollwheel: true,
      disableDoubleClickZoom: true
    };

    this.map = new google.maps.Map(document.getElementById('map'), routeMapOptions);
    directionsRenderer.setMap(this.map);
    directionsRenderer.setPanel(document.getElementById('directionsPanel'));
    let start: google.maps.LatLngLiteral = this.startLocation;
    let end: google.maps.LatLngLiteral = this.center;
    let request: google.maps.DirectionsRequest = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.DRIVING
    };
    directionService.route(request, (result, status) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(result);
      };
    });
  }

}
