import {ModuleWithProviders, NgModule, Provider} from '@angular/core';

import {OsmMap} from './directives/osm-map';
import {APILoaderConfigLiteral, provideAPILoaderConfig, APILoader} from './services/api-loader';

const CORE_DIRECTIVES: any[] = [OsmMap];

/**
 * The angular2-google-maps core module. Contains all Directives/Services/Pipes
 * of the core module. Please use `AgmCoreModule.forRoot()` in your app module.
 */
@NgModule({declarations: CORE_DIRECTIVES, exports: CORE_DIRECTIVES})
export class AgmCoreModule {
  /**
   * Please use this method when you register the module at the root level.
   */
  static forRoot(lazyMapsAPILoaderConfig?: APILoaderConfigLiteral): ModuleWithProviders {
    const providers: Provider[] =
        [{provide: APILoader, useClass: APILoader}]; // @Todo: Do we need that?
    if (lazyMapsAPILoaderConfig) {
      providers.push(provideAPILoaderConfig(lazyMapsAPILoaderConfig));
    }
    return {
      ngModule: AgmCoreModule,
      providers: providers,
    };
  }
}
