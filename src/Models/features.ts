import { IGeometry } from './geometry';
import { IAttributes } from './attributes';

export interface IFeatures {
    attributes: IAttributes,
    geometry: IGeometry
}