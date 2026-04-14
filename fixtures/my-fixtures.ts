import { test as baseTest, expect } from '@playwright/test';
import { mkdtempSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

export const test = baseTest.extend<{ tmpDir: string }>({
  tmpDir: async ({}, use) => {
    const tmpDirPath = mkdtempSync(join(tmpdir(), 'playwright-'));
    await use(tmpDirPath);
  },
});