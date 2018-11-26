import { IRpcProcessor } from '../interfaces';
import { compressPipeline } from '../utils/compress-pipeline';

// tslint:disable:no-magic-numbers
describe('CompressPipeline', () => {
    const testPipeline = (
        expected: any,
        pipeline: IRpcProcessor[],
        input: any,
        serviceConfig: any = void 0,
        methodConfig: any = void 0,
    ) => {
        const compressedPipeline = compressPipeline(pipeline);
        const result = compressedPipeline(input, serviceConfig, methodConfig);
        expect(result).toBe(expected);
    };

    // TODO: learn how to write tests
    const repeatableDataSet = [void 0, null, 'test'];

    repeatableDataSet.forEach(data => it(`Пустой pipeline, input ${data}`, () => testPipeline(data, [], data)));

    repeatableDataSet.forEach(data =>
        it(`e => e pipeline, input ${data}`, () => testPipeline(data, [(e: any) => e], data)),
    );

    repeatableDataSet.forEach(data =>
        it(`(e, c) => c pipeline, input ${data}`, () => testPipeline(data, [(e: any, c: any) => c], null, data)),
    );
});
