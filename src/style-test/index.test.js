/* eslint-disable jest/no-jasmine-globals */
/* globals jasmine */
// https://www.npmjs.com/package/puppeteer-screenshot-tester
import puppeteer from "puppeteer";
import { toMatchImageSnapshot } from "jest-image-snapshot";

expect.extend({ toMatchImageSnapshot });

// import ScreenshotTester from "puppeteer-screenshot-tester";

describe("styles.test", () => {
  let originalTimeout;

  // extend default interval to 10s because some image processing might take some time
  // we can do it beforeEach or once per test suite it's up to you
  // if you're running that on fast computer/server probably won't need to do that
  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  // set default interval timeout for jasmine
  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  [
    { width: 1920, height: 1080 },
    { width: 600, height: 1080 },
  ].forEach(({ width, height }) =>
    it(`index page should have proper view for ${width}x${height} params`, async () => {
      // setting up puppeteer
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      // set current view port size
      await page.setViewport({ width, height });
      // navigate to the page, served with webpack
      // IMPORTANT!: test assumes webpack is started

      let image;

      await page.goto("http://localhost:9000/index.html", { waitUntil: "networkidle0" });

      image = await page.screenshot();

      expect(image).toMatchImageSnapshot(
        process.env.CI
        ? {
          failureThreshold: 0.01,
          failureThresholdType: "percent",
        }
        : undefined
      );

      await page.goto("http://localhost:9000/postsPage.html", { waitUntil: "networkidle0" });

      image = await page.screenshot();

      expect(image).toMatchImageSnapshot(
        process.env.CI
        ? {
          failureThreshold: 0.01,
          failureThresholdType: "percent",
        }
        : undefined
      );

      await page.goto("http://localhost:9000/post.html", { waitUntil: "networkidle0" });

      image = await page.screenshot();

      expect(image).toMatchImageSnapshot(
        process.env.CI
        ? {
          failureThreshold: 0.01,
          failureThresholdType: "percent",
        }
        : undefined
      );

      await page.goto("http://localhost:9000/feedback.html", { waitUntil: "networkidle0" });

      image = await page.screenshot();

      await browser.close();

      expect(image).toMatchImageSnapshot(
        process.env.CI
        ? {
          failureThreshold: 0.01,
          failureThresholdType: "percent",
        }
        : undefined
      );
    })
  );
});