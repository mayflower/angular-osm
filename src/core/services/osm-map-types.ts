
export interface LatLngLiteral {
    latitude: number;
    longitude: number;
}

export interface MapOptions {
    center: LatLngLiteral;
    zoom: number;
}

export interface MarkerOptions extends LatLngLiteral {
    label: string;
}
