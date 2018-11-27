import { IHttpClient } from './http-client';
import { IRpcProcessor } from './processor';

export interface IRpcServiceConfig {
    apiServerUrl: string;
    httpClient: IHttpClient;
    postprocessors: IRpcProcessor | IRpcProcessor[];
    preprocessors: IRpcProcessor | IRpcProcessor[];
    requestParams?: object;
}

export interface IRpcMethodConfig {
    requestParams?: object;
}
