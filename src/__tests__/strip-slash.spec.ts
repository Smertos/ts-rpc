jest.mock('../environment.ts', () => ({
    IS_DEV: true,
    IS_PROD: false,
}));

import { stripEndingSlash, stripSlash, stripStarterSlash } from '../utils/strip-slash';

const performTest = (func: (input: string) => string, input: string, expected: string): any => {
    expect(func(input)).toBe(expected);
};

const testEndingStrip = performTest.bind(null, stripEndingSlash);
const testStrip = performTest.bind(null, stripSlash);
const testStarterStrip = performTest.bind(null, stripStarterSlash);

describe('stripStarterSlash', () => {
    it('strips only the beginning slash', () => testStarterStrip('/hello/', 'hello/'));
    it("doesn't strip anything", () => testStarterStrip('hello/', 'hello/'));

    it('handles edge case - string with no slashes', () => testStarterStrip('', ''));
    it('handles edge case - string with one slash', () => testStarterStrip('/', ''));
    it('handles edge case - string with two slashes', () => testStarterStrip('//', '/'));
    it('handles edge case - string with three slashes', () => testStarterStrip('///', '//'));
});

describe('stripEndingSlash', () => {
    it('strips only the ending slash', () => testEndingStrip('/hello/', '/hello'));
    it("doesn't strip anything", () => testEndingStrip('/hello', '/hello'));

    it('handles edge case - string with no slashes', () => testEndingStrip('', ''));
    it('handles edge case - string with one slash', () => testEndingStrip('/', ''));
    it('handles edge case - string with two slashes', () => testEndingStrip('//', '/'));
    it('', () => testEndingStrip('///', '//'));
});

describe('stripSlash', () => {
    it('strips both beginning and ending slashes', () => testStrip('/hello/', 'hello'));
    it('strips the beginning slash', () => testStrip('/hello', 'hello'));
    it('strips the ending slash', () => testStrip('hello/', 'hello'));
    it("doesn't strip anything", () => testStrip('hello', 'hello'));

    it('handles edge case - string with no slashes', () => testStrip('', ''));
    it('handles edge case - string with one slash', () => testStrip('/', ''));
    it('handles edge case - string with two slashes', () => testStrip('//', ''));
    it('handles edge case - string with three slashes', () => testStrip('///', '/'));
});
