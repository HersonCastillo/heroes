import { Thumbnail, ItemProperty, Url } from './properties';

export interface Character {
    id?: number;
    name: string;
    description: string;
    modified: string;
    thumbnail: Thumbnail;
    resourceURI: string;
    comics: ItemProperty;
    series: ItemProperty;
    stories: ItemProperty;
    events: ItemProperty;
    urls: Url[];
}
