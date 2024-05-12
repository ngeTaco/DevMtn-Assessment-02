import 'expect-puppeteer';
import path from 'node:path';
import url from 'node:url';

describe('js-dom.js', () => {
  const dirname = url.fileURLToPath(new URL('.', import.meta.url));
  const webpage = `file://${path.join(dirname, '../js-dom.html')}`;

  beforeEach(async () => {
    await page.goto(webpage);
  });

  describe('Log in/log out button', () => {
    test('button text changes from "Log in" to "Log out" when clicked', async () => {
      await expect(page).toClick('button', { text: 'Log in' });
      await expect(page).toMatchElement('button', { text: 'Log out' });
    });

    test('button text changes from "Log out" to "Log in" when clicked', async () => {
      await expect(page).toClick('button', { text: 'Log in' });
      await expect(page).toClick('button', { text: 'Log out' });
      await expect(page).toMatchElement('button', { text: 'Log in' });
    });
  });

  describe('Send an alert', () => {
    test('sends an alert with text from the input on form submit', async () => {
      await expect(page).toFillForm('#send-alert', {
        alert: 'Hello!',
      });
      await expect(page).toDisplayDialog(async () => {
        await expect(page).toClick('#send-alert button');
      });
    });
  });

  describe('Add an item', () => {
    test('adds an item to the list after double-clicking the button', async () => {
      await page.click('#item-adder', { text: /Double-click.*/, clickCount: 2 });
      await expect(page).toMatchElement('#list > li:nth-child(4)');
    });
  });

  describe('Change colors', () => {
    test('clicking on the "Turn stuff blue" button changes the color of the .changes-color elements', async () => {
      await page.click('#blue');
      const changeColorEls = await page.evaluate(() => {
        const container = document.querySelector('#color-changer');
        return Array.from(container.querySelectorAll('.changes-colors')).map(
          (el) => window.getComputedStyle(el).color,
        );
      });

      changeColorEls.forEach((color) => {
        expect(color).toEqual('rgb(0, 0, 255)');
      });
    });

    test('clicking on the "Turn stuff red" button changes the color of the .changes-color elements', async () => {
      await page.click('#red');
      const changeColorEls = await page.evaluate(() => {
        const container = document.querySelector('#color-changer');
        return Array.from(container.querySelectorAll('.changes-colors')).map(
          (el) => window.getComputedStyle(el).color,
        );
      });

      changeColorEls.forEach((color) => {
        expect(color).toEqual('rgb(255, 0, 0)');
      });
    });

    test('clicking on the "Turn stuff blue/red" buttons leaves the color of other elements black', async () => {
      await page.click('button', { text: /Turn stuff red/ });
      await page.click('button', { text: /Turn stuff blue/ });

      const changeColorEls = await page.evaluate(() => {
        const container = document.querySelector('#color-changer');
        return Array.from(container.querySelectorAll('*:not(.changes-colors)')).map(
          (el) => window.getComputedStyle(el).color,
        );
      });

      changeColorEls.forEach((color) => {
        expect(color).toEqual('rgb(0, 0, 0)');
      });
    });
  });

  describe('Calculate factorial', () => {
    test('displays the factorial of the number entered into the form', async () => {
      await expect(page).toFillForm('#factorial-calculator', {
        number: '4',
      });
      await expect(page).toClick('button', { text: /Calculate/ });
      await expect(page).toMatchElement('#result', { text: /24/ });
    });
  });

  describe('Validate a form', () => {
    test('shows red feedback message "The word must be at least 4 characters long" when submitting an invalid word', async () => {
      await expect(page).toClick('#recommend-word button');
      await expect(page).toMatchTextContent('The word must be at least 4 characters long');
      const feedbackTextColor = await page.evaluate(() => {
        return window.getComputedStyle(document.querySelector('p.form-feedback')).color;
      });
      expect(feedbackTextColor).toEqual('rgb(255, 0, 0)');
    });

    test('shows green feedback message "Thanks for your submission!" when submitting a valid word', async () => {
      await expect(page).toFillForm('#recommend-word', {
        word: 'hellothisisalongword',
      });
      await expect(page).toClick('#recommend-word button[type="submit"]');
      await expect(page).toMatchTextContent('Thanks for your submission!');
      const feedbackTextColor = await page.evaluate(() => {
        return window.getComputedStyle(document.querySelector('p.form-feedback')).color;
      });
      expect(feedbackTextColor).toEqual('rgb(0, 128, 0)');
    });
  });
});
