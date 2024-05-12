import 'expect-puppeteer';
import path from 'node:path';
import url from 'node:url';

const dirname = url.fileURLToPath(new URL('.', import.meta.url));
const webpage = `file://${path.join(dirname, '../index.html')}`;

beforeEach(async () => {
  await page.goto(webpage);
});

describe('index.html', () => {
  describe('Global styles', () => {
    test('should have a black background', async () => {
      const bodyBgColor = await page.evaluate(() => {
        const body = document.querySelector('body');
        return window.getComputedStyle(body).backgroundColor;
      });
      expect(bodyBgColor).toBe('rgb(0, 0, 0)');
    });

    test('should have white text', async () => {
      const bodyColor = await page.evaluate(() => {
        const body = document.querySelector('body');
        return window.getComputedStyle(body).color;
      });
      expect(bodyColor).toBe('rgb(255, 255, 255)');
    });

    test('should use a sans-serif font', async () => {
      const bodyFontFamily = await page.evaluate(() => {
        const body = document.querySelector('body');
        return window.getComputedStyle(body).fontFamily;
      });
      expect(bodyFontFamily).toMatch(/sans-serif/);
    });
  });

  describe('HTML form', () => {
    test('the page should have a form element', async () => {
      await expect(page).toMatchElement('form');
    });

    test('the form should have a text input field', async () => {
      await expect(page).toMatchElement('form input[type="text"]');
    });

    test('the form should have radio buttons for "Jedi" and "Sith" options', async () => {
      await expect(page).toMatchElement('form input[type="radio"][value="jedi"]');
      await expect(page).toMatchElement('form input[type="radio"][value="sith"]');
    });

    test('the form should have a dropdown menu for selecting colors Blue, Green, Red, and Purple', async () => {
      await expect(page).toSelect('select[name*="lightsaber"]', 'Blue');
      await expect(page).toSelect('select[name*="lightsaber"]', 'Green');
      await expect(page).toSelect('select[name*="lightsaber"]', 'Red');
      await expect(page).toSelect('select[name*="lightsaber"]', 'Purple');
    });

    test('the form should have a submit button', async () => {
      await expect(page).toMatchElement('form *[type="submit"]');
    });
  });

  describe('Table with character data', () => {
    test('the page should have a table element', async () => {
      await expect(page).toMatchElement('table');
    });

    test('all cells in the table should have a 1px white border', async () => {
      const tableCellBorders = await page.evaluate(() => {
        const tableCells = Array.from(document.querySelectorAll('table td'));
        return tableCells.map((cell) => window.getComputedStyle(cell).border);
      });

      tableCellBorders.forEach((border) => {
        expect(border).toBe('1px solid rgb(255, 255, 255)');
      });
    });

    test('all cells in the table should 5px of padding on all sides', async () => {
      const tableCellPadding = await page.evaluate(() => {
        const tableCells = Array.from(document.querySelectorAll('table td'));
        return tableCells.map((cell) => window.getComputedStyle(cell).padding);
      });

      tableCellPadding.forEach((padding) => {
        expect(padding).toBe('5px');
      });
    });

    test('should have 50px of space above the table', async () => {
      const tableMarginTop = await page.evaluate(() => {
        const table = document.querySelector('table');
        return window.getComputedStyle(table).marginTop;
      });

      expect(tableMarginTop).toBe('50px');
    });
  });
});
