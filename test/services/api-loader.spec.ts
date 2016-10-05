import {TestBed, inject} from '@angular/core/testing';

import {APILoader} from '../../src/core/services/api-loader';
import {DOCUMENT_GLOBAL, WINDOW_GLOBAL} from '../../src/core/utils/browser-globals';

export function main() {
    describe('Service: LazyMapsAPILoader', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [
                    APILoader,
                    {provide: WINDOW_GLOBAL, useValue: {}}, {
                        provide: DOCUMENT_GLOBAL,
                        useValue: jasmine.createSpyObj<Document>('Document', ['createElement'])
                    }
                ]
            });
        });

        it('should create the default script URL',
            inject([APILoader, DOCUMENT_GLOBAL], (loader: APILoader, doc: Document) => {
                interface Script {
                    src?: string;
                    async?: boolean;
                    defer?: boolean;
                    type?: string;
                }

                const OSMScriptElement: Script = {};
                const OLScriptElement: Script = {};

                (<jasmine.Spy>doc.createElement).and.returnValues(OLScriptElement, OSMScriptElement);
                doc.body = jasmine.createSpyObj('body', ['appendChild']);

                loader.load();

                expect(doc.createElement).toHaveBeenCalled();
                expect(OLScriptElement.type).toEqual('text/javascript');
                expect(OLScriptElement.async).toEqual(true);
                expect(OLScriptElement.src).toBeDefined();
                expect(OLScriptElement.defer).toEqual(true);
                expect(OLScriptElement.src).toContain('http://www.openlayers.org/api/OpenLayers.js');
                expect(doc.body.appendChild).toHaveBeenCalledWith(OLScriptElement);

                expect(doc.createElement).toHaveBeenCalled();
                expect(OSMScriptElement.type).toEqual('text/javascript');
                expect(OSMScriptElement.async).toEqual(true);
                expect(OSMScriptElement.defer).toEqual(true);
                expect(OSMScriptElement.src).toBeDefined();
                expect(OSMScriptElement.src).toContain('http://www.openstreetmap.org/openlayers/OpenStreetMap.js');
                expect(doc.body.appendChild).toHaveBeenCalledWith(OSMScriptElement);
            }));
    });
}
