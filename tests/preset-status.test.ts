import { describe, expect, test } from 'bun:test';

import { parsePresetStatus } from '@/lib/presets/registry';

import { getBundle } from './utils/bundle';

describe('parsePresetStatus', () => {
    test('defaults to enabled for missing or invalid values', () => {
        expect(parsePresetStatus(null)).toBe('enabled');
        expect(parsePresetStatus('')).toBe('enabled');
        expect(parsePresetStatus('enabled')).toBe('enabled');
        expect(parsePresetStatus('anything else')).toBe('enabled');
        expect(parsePresetStatus(42)).toBe('enabled');
    });

    test('parses disabled', () => {
        expect(parsePresetStatus('disabled')).toBe('disabled');
    });
});

describe('Bundle preset statuses', () => {
    test('bundled preset configs only use valid raw status values', () => {
        const bundle = getBundle();
        if (!bundle) expect.unreachable('Bundle should exist');

        const presetConfigs = bundle.files.filter((f) =>
            /^public\/presets\/[^/]+\/config\.json$/.test(f.path)
        );

        expect(presetConfigs.length).toBeGreaterThan(0);

        for (const file of presetConfigs) {
            const parsed = JSON.parse(file.data) as {
                status?: string;
            };
            if (parsed.status !== undefined) {
                // Catch typos like "disabeld" — parsePresetStatus would
                // silently coerce them to enabled, so assert the raw value.
                expect(['enabled', 'disabled']).toContain(parsed.status);
            }
        }
    });
});
