export type IJsonRpcMethodConfigPayload<TMethodConfigPayload> = {
  [key in keyof TMethodConfigPayload]: TMethodConfigPayload[key];
}

export interface IJsonRpcMethodConfigBase {
  method: string;
}

export type IJsonRpcMethodConfig<TMethodConfigPayload> = IJsonRpcMethodConfigPayload<TMethodConfigPayload> & IJsonRpcMethodConfigBase;

export interface IJsonRpcServiceConfig {
  apiServerUrl: string;
  httpClient: IHttpClient;
}

export interface IJsonRpcRequest {
  id: string;
  jsonrpc: string;
  method: string;
  params?: object;
}

export interface IJsonRpcResponse {
  id: string;
  jsonrpc: string;
  // TODO мб дженерики? Но боюсь в них утонуть
  // tslint:disable-next-line
  result?: any;
  // tslint:disable-next-line
  error?: any;
}

export interface IHttpClient {
  // tslint:disable-next-line
  post(url: string, params: IJsonRpcRequest): any;
}

export class JsonRpcError {
  status!: number;
  statusText!: string;
  rpcError!: object;

  static makeHttpError(status: number, statusText: string): JsonRpcError {
    const retVal = new JsonRpcError();
    retVal.status = status;
    retVal.statusText = statusText;

    return retVal;
  }

  static makeRpcError(rpcError: any): JsonRpcError {
    const retVal = new JsonRpcError();
    retVal.rpcError = rpcError;

    return retVal;
  }

  get isNetworkError(): boolean {
    return !!this.status;
  }

  get isRpcError(): boolean {
    return !!this.rpcError;
  }
}
