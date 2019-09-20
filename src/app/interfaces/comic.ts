import { Thumbnail, ItemProperty, Url } from './properties';

export interface Comic {
    id?: number;
    digitalId?: number;
    title: string;
    issueNumber: number;
    variantDescription: string;
    description: string;
    modified: string;
    isbn: string;
    format: string;
    pageCount: number;
    textObjects?: TextObjects;
    resourceURI: string;
    urls: Url[],
    series: Serie[];
    dates: rDate[];
    prices: Price[];
    thumbnail: Thumbnail;
    images: Thumbnail[];
    creators: ItemProperty;
    characters: ItemProperty;
    stories: ItemProperty;
    events: ItemProperty;
}
interface Serie {
    resourceURI: string;
    name: string;
}
interface rDate {
    type: string;
    date: Date | string;
}
interface Price {
    type: string;
    price: number;
}
interface TextObjects {
    type: string;
    language: string;
    text: string;
}