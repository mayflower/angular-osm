import {TestBed, inject} from '@angular/core/testing';

import {APILoader} from '../../src/core/services/api-loader';
import {
  DOCUMENT_GLOBAL,
  WINDOW_GLOBAL
} from '../../src/core/utils/browser-globals';

export function main() {
  describe('Service: LazyMapsAPILoader', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers : [
          APILoader, {provide : WINDOW_GLOBAL, useValue : {}}, {
            provide : DOCUMENT_GLOBAL,
            useValue :
                jasmine.createSpyObj<Document>('Document', [ 'createElement' ])
          }
        ]
      });
    });

    it('should create the default script URL',
       inject([ APILoader, DOCUMENT_GLOBAL ], (loader: APILoader,
                                               doc: Document) => {
         interface Script {
           src?: string;
           async?: boolean;
           defer?: boolean;
           type?: string;
         }

         const scriptElementOSM: Script = {};
         const scriptElementOL: Script = {};

         (<jasmine.Spy>doc.createElement)
             .and.returnValues(scriptElementOL, scriptElementOSM);
         doc.body = jasmine.createSpyObj('body', [ 'appendChild' ]);
         loader.load();

         expect(doc.createElement).toHaveBeenCalled();
         expect(scriptElementOL.type).toEqual('text/javascript');
         expect(scriptElementOL.async).toEqual(true);
         expect(scriptElementOL.src).toBeDefined();
         expect(scriptElementOL.defer).toEqual(true);
         expect(scriptElementOL.src)
             .toContain('http://www.openlayers.org/api/OpenLayers.js');
         expect(doc.body.appendChild).toHaveBeenCalledWith(scriptElementOL);

         expect(doc.createElement).toHaveBeenCalled();
         expect(scriptElementOSM.type).toEqual('text/javascript');
         expect(scriptElementOSM.async).toEqual(true);
         expect(scriptElementOSM.defer).toEqual(true);
         expect(scriptElementOSM.src).toBeDefined();
         expect(scriptElementOSM.src)
             .toContain(
                 'http://www.openstreetmap.org/openlayers/OpenStreetMap.js');
         expect(doc.body.appendChild).toHaveBeenCalledWith(scriptElementOSM);
       }));
  });
}
