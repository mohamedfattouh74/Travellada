import { Component } from '@angular/core';
import * as L from 'leaflet';

import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ElementRef, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getListingByID,
  setSelectedListing,
} from '../../../store/listings/listing.actions';
import { getListingsSelector } from '../../../store/listings/listings.selectors';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import 'leaflet.markercluster';

@Component({
  standalone: true,
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
  imports: [
    HttpClientModule,
    RouterModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
  ],
})
export class MapComponent {
  countries = [
    'United States',
    'Greece',
    'United Kingdom',
    'Australia',
    'Germany',
    'Canada',
  ];

  countriesMap = {
    'United States': [-73.93991967698112, 40.66025585645294],
    Greece: [37.999333818956316, 23.738618131424346],
    'United Kingdom': [51.490519996544386, -0.2538381456451268],
    Australia: [-33.77578435569907, 151.2810177244561],
    Germany: [52.47209791846379, 13.449581662689727],
    Canada: [43.66763060347233, -79.38814019943453],
  };
  listings: any;
  map: any;
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit() {
    this.listings = this.store.selectSignal(getListingsSelector);

    this.initializeMap();
  }

  initializeMap() {
    let markers: any = L.markerClusterGroup({
      iconCreateFunction: function (cluster) {
        return L.divIcon({
          html:
            '<div><p style="padding-inline:4px;">' +
            cluster.getChildCount() +
            '</p></div>',
          iconSize: L.point(20, 20),
        });
      },
    });
    const baseMapURl = 'https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
    this.map = L.map('map', { attributionControl: false }).setView(
      [40.65802264775616, -73.95594503691517],
      13
    );
    this.listings().forEach((listing: any) => {
      let leafletMarker = L.divIcon({
        className: 'custom-div-icon',
        html: `<div class='marker-pin' style='background-color:#e8e8e8; font-weight:bold; border:1px solid #A9A9A9; border-radius:15px; padding:8px;'>$${listing.price}</div>`,
        iconSize: [40, 54],
        iconAnchor: [15, 42],
      });

      L.tileLayer(baseMapURl).addTo(this.map);
      const marker: any = L.marker([listing.latitude, listing.longitude], {
        icon: leafletMarker,
      })
        .bindPopup(
          L.popup({
            maxWidth: 340,
            minWidth: 240,
            autoClose: false,
            closeOnClick: false,
          })
        )
        .setPopupContent(
          `<div class='cursor-pointer'>
            <img
        id='listing-image'
        class="w-[300px] h-[200px] rounded-2xl"
        id="listing-image"
        src=${listing?.xl_picture_url}
        onerror="this.src='assets/image-placeholder.png'"
        
      />
      <div class="card-text" [routerLink]="['/listings/grid']">
        
          <p class="text-[#052B32] font-semibold text-lg">
            ${listing.smart_location}
          </p>            
        <p class="text-[#898989] text-sm font-medium">${listing.name}</p>
        <p class="text-[#052B32]  font-medium">
          <strong>$${listing.price}</strong> night
        </p>
      </div>
      </div>`
        );

      marker.on('click', (e: any) => {
        this.handlePopupClick(e, listing.id);
      });

      markers.addLayer(marker);
    });

    console.log(markers);
    this.map.addLayer(markers);
  }
  zoomCountry(event: any) {
    for (const [name, coordinates] of Object.entries(this.countriesMap)) {
      if (name == event.value) {
        this.map.setView([coordinates[0], coordinates[1]]);
      }
    }
  }
  handlePopupClick(event: L.LeafletEvent, id: string) {
    const selectedID = id;
    const popupContentElement = this.el.nativeElement.querySelector(
      '.leaflet-popup-content'
    );

    this.renderer.listen(popupContentElement, 'click', () => {
      this.store.dispatch(getListingByID({ id: selectedID }));
      this.store.dispatch(setSelectedListing({ id: selectedID }));
      this.router.navigate(['/listing-details']);
    });
  }
}
