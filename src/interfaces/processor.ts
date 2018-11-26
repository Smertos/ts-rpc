export type IRpcProcessor<TIn = any, TOut = any, TServiceConfig = any, TMethodConfig = any> = (
    input: TIn,
    serviceConfig: TServiceConfig,
    methodConfig: TMethodConfig,
) => TOut;

export type IRpcPreprocessors<TIn> = IRpcProcessor<TIn> | Array<IRpcProcessor<TIn>>;
export type IRpcPostprocessors<TServiceConfig, TMethodConfig> =
    | IRpcProcessor<any, any, TServiceConfig, TMethodConfig>
    | Array<IRpcProcessor<any, any, TServiceConfig, TMethodConfig>>;
