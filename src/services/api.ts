import Axios from './axios';
import { AxiosResponse } from 'axios';

export async function get<R>(path: string): Promise<AxiosResponse<R>> {
    return await Axios.get(path);
}

export async function getParams<P, R>(path: string, params: P): Promise<AxiosResponse<R>> {
    return await Axios.get(path, { params });
}

export async function post<T, R>(path: string, data: T): Promise<AxiosResponse<R>> {
    return await Axios.post(path, data);
}

export async function put<T, R>(path: string, data: T): Promise<AxiosResponse<R>> {
    return await Axios.put(path, data);
}