import { Thumbnail, ItemProperty, Item } from './properties';

export interface Storie {
    id?: number;
    title: string;
    description: string;
    modified: string;
    thumbnail: Thumbnail;
    resourceURI: string;
    type: string;
    creators: ItemProperty;
    characters: ItemProperty;
    series: ItemProperty;
    comics: ItemProperty;
    events: ItemProperty;
    originalIssue: Item;
}
