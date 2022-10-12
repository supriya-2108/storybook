import { test, expect } from '@playwright/test';
import process from 'process';

const storybookUrl = process.env.STORYBOOK_URL || 'http://localhost:8001';

test.describe('JSON files', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(storybookUrl);
  });

  test('should have index.json', async ({ page }) => {
    // eslint-disable-next-line jest/valid-expect-in-promise
    const json = await page.evaluate(() => fetch('/index.json').then((res) => res.json()));

    expect(json).toEqual({
      v: 4,
      entries: expect.objectContaining({
        'example-button--primary': {
          id: 'example-button--primary',
          importPath: expect.stringMatching(/\/Button\.stories\.jsx$/),
          name: 'Primary',
          title: 'Example/Button',
          type: 'story',
        },
      }),
    });
  });
});
