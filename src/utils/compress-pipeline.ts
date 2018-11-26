import { IRpcProcessor } from '../interfaces';

export const compressPipeline = <TIn, TOut, TServiceConfig, TMethodConfig>(
    processors: IRpcProcessor[],
): IRpcProcessor<TIn, TOut, TServiceConfig, TMethodConfig> => (
    input: TIn,
    serviceConfig?: TServiceConfig,
    config?: TMethodConfig,
): TOut => processors.reduce((lastResult, func) => func(lastResult, serviceConfig, config), input);
