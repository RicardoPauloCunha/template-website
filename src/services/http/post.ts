import { post, get, put } from '../api';

const root = 'posts/';

export type PostResponse = {
    id: number;
    title: string;
    body: string;
    userId: number;
}

export const getPostByIdHttp = async (postId: number): Promise<PostResponse> => {
    let { data } = await get<PostResponse>(root + postId);
    return data;
}

export const getPostsHttp = async (): Promise<PostResponse[]> => {
    let { data } = await get<PostResponse[]>(root);
    return data;
}

type PostRequest = {
    id?: number;
    title: string;
    body: string;
    userId: number;
}

export const postPostHttp = async (resquestData: PostRequest): Promise<PostResponse> => {
    let { data } = await post<PostRequest, PostResponse>(root, resquestData);
    return data;
}

export const putPostHttp = async (postId: number, resquestData: PostRequest): Promise<PostResponse> => {
    let { data } = await put<PostRequest, PostResponse>(root + postId, resquestData);
    return data;
}