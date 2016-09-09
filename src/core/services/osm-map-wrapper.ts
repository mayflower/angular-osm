import {Injectable, Inject} from "@angular/core";
import {ol, olx} from "openlayers";
import {DOCUMENT_GLOBAL, WINDOW_GLOBAL} from '../utils/browser-globals';
import {APILoader} from "./api-loader";

/**
 * Todo: Remove the dependencies, do it in a kind of wrapper.
 */
@Injectable()
export class OsmMapWrapper {
    private _window: Window;
    private _document: Document;
    private _map: ol.Map;

    constructor (private _loader: APILoader, @Inject(WINDOW_GLOBAL) w: Window, @Inject(DOCUMENT_GLOBAL) d: Document) {
        this._window = w;
        this._document = d;
    }

    createMap(el: HTMLElement, options: olx.MapOptions): void {
        this._loader.load().then(() => {
            this._map = new ol.Map(options);
        });
    }
}
