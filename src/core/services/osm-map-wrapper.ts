import {Inject, Injectable} from '@angular/core';
import {DOCUMENT_GLOBAL, WINDOW_GLOBAL} from '../utils/browser-globals';
import {APILoader} from './api-loader';

/**
 * Todo: Remove the dependencies, do it in a kind of wrapper.
 */
@Injectable()
export class OsmMapWrapper {
  private _window: Window;
  private _document: Document;
  private _map: ol.Map;
  private _el: HTMLElement;

  constructor(private _loader: APILoader, @Inject(WINDOW_GLOBAL) w: Window,
              @Inject(DOCUMENT_GLOBAL) d: Document) {
    this._window = w;
    this._document = d;
  }

  createMap(el: HTMLElement, options: olx.MapOptions): void {
    this._el = el;
    this._loader.load().then(() => { this._map = new ol.Map(options); });
  }
}
