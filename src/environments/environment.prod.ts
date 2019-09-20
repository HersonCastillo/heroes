import { API } from './api';
export const environment = {
    production: true,
    ...API.rest
};
