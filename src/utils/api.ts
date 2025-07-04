/* eslint-disable @typescript-eslint/no-explicit-any */

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface RequestOptions {
  pathParams?: Record<string, string | number>;
  queryParams?: Record<string, string | number>;
  body?: any;
  headers?: HeadersInit;
}

export class api {
  static baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8787';

  private static buildUrl(path: string, pathParams?: Record<string, string | number>, queryParams?: Record<string, string | number>) {
    if (pathParams) {
      for (const [key, val] of Object.entries(pathParams)) {
        path = path.replace(`:${key}`, encodeURIComponent(String(val)));
      }
    }

    const url = new URL(this.baseUrl + path);
    if (queryParams) {
      for (const [key, val] of Object.entries(queryParams)) {
        url.searchParams.append(key, String(val));
      }
    }
    return url.toString();
  }

  private static async request<T>(method: HttpMethod, path: string, options?: RequestOptions): Promise<T> {
    const url = this.buildUrl(path, options?.pathParams, options?.queryParams);

    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
      body: method !== 'GET' && options?.body ? JSON.stringify(options.body) : undefined,
    };

    const res = await fetch(url, fetchOptions);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Error ${res.status}`);
    }

    return res.json() as Promise<T>;
  }

  static get<T>(path: string, options?: Omit<RequestOptions, 'body'>) {
    return this.request<T>('GET', path, options);
  }

  static post<T>(path: string, options?: RequestOptions) {
    return this.request<T>('POST', path, options);
  }

  static patch<T>(path: string, options?: RequestOptions) {
    return this.request<T>('PATCH', path, options);
  }

  static delete<T>(path: string, options?: Omit<RequestOptions, 'body'>) {
    return this.request<T>('DELETE', path, options);
  }
}
