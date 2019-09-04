import { formatBytes, checkFileSize, checkFilePath, tenMbs } from './helpers';

describe('formatBytes(bytes, decimals = 2)', () => {
    it('formats 0 properly', () => {
        const formatted = formatBytes(0);
        expect(formatted).toBe('0bytes');
    });

    it('formats < 1024 properly', () => {
        const formatted = formatBytes(100);
        expect(formatted).toBe('100bytes');
    });

    it('formats 1kb properly', () => {
        const formatted = formatBytes(1024);
        expect(formatted).toBe('1kb');
    });

    it('formats 1mb properly', () => {
        const formatted = formatBytes(1024 * 1024);
        expect(formatted).toBe('1mb');
    });
});

describe('checkFileSize(filesize)', () => {
    it('returns false if file size > 10 mb', () => {
        const check = checkFileSize(tenMbs + 10);
        expect(check).toBe(false);
    });

    it('renders true if file size <= 10 mb', () => {
        const check = checkFileSize(tenMbs);
        expect(check).toBe(true);
    });
});

describe('checkFilePath(filename)', () => {
    it('returns false if file name contains /', () => {
        const check = checkFilePath('/hello.js');
        expect(check).toBe(false);
    });

    it('returns true if file name does not contain /', () => {
        const check = checkFilePath('hello.js');
        expect(check).toBe(true);
    });
});