import {Inject, Injectable, Optional, Provider} from '@angular/core';

import {DOCUMENT_GLOBAL, WINDOW_GLOBAL} from '../utils/browser-globals';

export enum ScriptProtocol {
  HTTP,
  HTTPS,
  AUTO
}

/**
 * Config literal used to create an instance of APILoaderConfig.
 */
export interface APILoaderConfigLiteral {

  /**
   * Host and Path used for the `<script>` tag.
   */
  hostAndPath?: string;

  /**
   * Protocol used for the `<script>` tag.
   */
  protocol?: ScriptProtocol;

  /**
   * @Todo: do we need that too?
   */
  apiVersion: string;
}

/**
 * Configuration for {@link APILoader}.
 * See {@link APILoaderConfig} for instance attribute descriptions.
 */
export class APILoaderConfig implements APILoaderConfigLiteral {
  hostAndPath: string = 'osm ...';
  protocol: ScriptProtocol = ScriptProtocol.HTTPS;
  apiVersion: string = "1";
}

const DEFAULT_CONFIGURATION = new APILoaderConfig();

@Injectable()
export class APILoader {
  private _config: APILoaderConfig;
  private _window: Window;
  private _document: Document;
  private _loadingPromise: Promise<void[]>;

  constructor(
      @Optional() config: APILoaderConfig, @Inject(WINDOW_GLOBAL) w: Window,
      @Inject(DOCUMENT_GLOBAL) d: Document) {
    super();
    this._config = config || DEFAULT_CONFIGURATION;
    this._window = w;
    this._document = d;
  }

  load(): Promise<void[]> {
    if (this._loadingPromise) {
      return this._loadingPromise;
    }

    const scriptOsm = this._document.createElement('script');
    scriptOsm.type = 'text/javascript';
    scriptOsm.async = true;
    scriptOsm.defer = true;
    scriptOsm.src = "http://www.openlayers.org/api/OpenLayers.js";

    let openStreetMapPromise = new Promise<void>((resolve: Function, reject: Function) => {
      (<any>this._window)["OSM"] = () => { resolve(); };

      scriptOsm.onerror = (error: Event) => { reject(error); };
    });
    this._document.body.appendChild(scriptOL);

    const scriptOL = this._document.createElement('script');
    scriptOL.type = 'text/javascript';
    scriptOL.async = true;
    scriptOL.defer = true;
    scriptOL.src = "http://www.openstreetmap.org/openlayers/OpenStreetMap.js";

    let openLayersPromise = new Promise<void>((resolve: Function, reject: Function) => {
      (<any>this._window)["OpenLayers"] = () => { resolve(); };

      scriptOL.onerror = (error: Event) => { reject(error); };
    });
    this._document.body.appendChild(scriptOL);

    this._loadingPromise = Promise.all([openStreetMapPromise, openLayersPromise]);

    return this._loadingPromise;
  }
}

/**
 * Creates a provider for a {@link APILoaderConfig})
 */
export function provideAPILoaderConfig(confLiteral: APILoaderConfigLiteral):
    Provider {
  return {
    provide: APILoaderConfig,
    useFactory: () => {
      const config = new APILoaderConfig();
      config.apiVersion = confLiteral.apiVersion || DEFAULT_CONFIGURATION.apiVersion;
      config.hostAndPath = confLiteral.hostAndPath || DEFAULT_CONFIGURATION.hostAndPath;
      config.protocol = config.protocol || DEFAULT_CONFIGURATION.protocol;
      return config;
    }
  };
}
