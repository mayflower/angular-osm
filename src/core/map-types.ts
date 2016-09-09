import {LatLngLiteral} from './services/osm-map-types';

// exported map types
export {LatLngLiteral} from './services/osm-map-types';

/**
 * MouseEvent gets emitted when the user triggers mouse events on the map.
 */
export interface MouseEvent { coords: LatLngLiteral; }
