export interface ServerResponse<T> {
    code: string;
    status: number;
    copyright: string;
    attributionText: string;
    attributionHTML: string;
    etag: string;
    data: Response<T>;
}
interface Response<T> {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: T[];
}