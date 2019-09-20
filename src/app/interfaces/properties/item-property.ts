import { Item } from '../properties';

export interface ItemProperty {
    available: number;
    collectionURI: string;
    items: Item[];
    returned: number;
}