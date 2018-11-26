import { IHttpClient, IRpcMethodConfig, IRpcPostprocessors, IRpcPreprocessors, IRpcServiceConfig } from './interfaces';
import { compressPipeline, stripEndingSlash, stripStarterSlash } from './utils';

export type AnyDescriptor = TypedPropertyDescriptor<any>;
export type Decorator = (target: any, propertyKey: string | symbol, descriptor: AnyDescriptor) => AnyDescriptor;
export type ExecutableDecorator<T> = (input: T) => Decorator;

export class TSRpc {
    private static makeUrl(apiServerUrl?: string, endpoint?: string): string {
        return [apiServerUrl ? stripEndingSlash(apiServerUrl) : void 0, endpoint ? stripStarterSlash(endpoint) : void 0]
            .filter(v => v)
            .join('/');
    }

    static makeClassDecorator<TServiceConfig extends IRpcServiceConfig>(
        config: TServiceConfig,
    ): (endpoint?: string) => any {
        const { httpClient, apiServerUrl, postprocessors, preprocessors } = config;
        const servicePreprocessor = compressPipeline<any, any, TServiceConfig, any>(preprocessors);
        const servicePostprocessor = compressPipeline<any, any, TServiceConfig, any>(postprocessors);

        return (endpoint?: string): any => {
            return (target: any): void =>
                Object.assign(target, {
                    apiUrl: TSRpc.makeUrl(apiServerUrl, endpoint),
                    httpClient,
                    serviceConfig: config,
                    servicePostprocessor,
                    servicePreprocessor,
                });
        };
    }

    static makeMethodDecorator<TRequest, TMethodConfig extends IRpcMethodConfig>(
        preprocessors: IRpcPreprocessors<TRequest>,
        postprocessors: IRpcPostprocessors<any, TMethodConfig>,
        transportFactory?: () => IHttpClient,
    ): ExecutableDecorator<TMethodConfig> {
        return (config: TMethodConfig): Decorator => {
            const methodPreprocessor = compressPipeline<any, any, any, TMethodConfig>([].concat(preprocessors as any));
            const methodPostprocessor = compressPipeline<any, any, any, TMethodConfig>(
                [].concat(postprocessors as any),
            );

            return (target: any, propertyKey: string | symbol, descriptor: AnyDescriptor): AnyDescriptor => {
                // Декоратор метода работает раньше декоратора конструктора, поэтому execute будем получать в рантайме
                const targetConstructor = typeof target === 'function' ? target : target.constructor;

                descriptor.value = (request: TRequest) => {
                    const {
                        apiUrl,
                        httpClient,
                        serviceConfig,
                        servicePostprocessor,
                        servicePreprocessor,
                    } = targetConstructor;
                    const transport = transportFactory ? transportFactory() : httpClient;

                    if (!transport) throw Error('No HTTP client presented');

                    return [
                        (input: any) => methodPreprocessor(input, serviceConfig, config),
                        (input: any) => servicePreprocessor(input, serviceConfig, config),
                        (input: any) => transport.post(apiUrl, input, serviceConfig, config),
                        (input: any) => servicePostprocessor(input, serviceConfig, config),
                        (input: any) => methodPostprocessor(input, serviceConfig, config),
                    ].reduce((input, func) => func(input), request);
                };

                return descriptor;
            };
        };
    }
}
