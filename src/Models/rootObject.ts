import { IFeatures } from './features';
import { IField } from './Field';
import { IFieldAliases } from './FieldAliases';
import { ISpatialReference } from './SpatialReference';

export interface IRootObject {
    displayFieldName: string;
    fieldAliases: IFieldAliases;
    geometryType: string;
    spatialReference: ISpatialReference;
    fields: IField[];
    features: IFeatures[];
}