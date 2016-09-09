import {Component, Input, ElementRef, OnInit} from '@angular/core';
import {OsmMapWrapper} from "../services/osm-map-wrapper";

@Component({
    selector: 'osm-map',
    host: {'[class.osm-map]': 'true'}
})
export class OsmMap implements OnInit{
    @Input('latitude') latitude: number = 0;
    @Input('longitude') longitude: number = 0;
    @Input('zoom') zoom: number = 0;

    constructor(private _elem: ElementRef, private _mapWrapper: OsmMapWrapper) {}

    ngOnInit() {
        const container = this._elem.nativeElement.querySelector('.osm-map');
        this._initMapInstance(container);
    }

    private _initMapInstance(el: HTMLElement): void {
        this._mapWrapper.createMap(el, {
            view: {
                center: [this.latitude, this.longitude],
                zoomFactor: this.zoom
            }
        });
    }
}

