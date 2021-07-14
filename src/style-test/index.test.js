import puppeteer from "puppeteer";
import { toMatchImageSnapshot } from "jest-image-snapshot";

expect.extend({ toMatchImageSnapshot });

describe("styles.test", () => {
  let originalTimeout;

  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jest.setTimeout(10000);
  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  [
    { width: 1920, height: 1080 },
    { width: 600, height: 1080 },
  ].forEach(({ width, height }) =>
    it(`index page should have proper view for ${width}x${height} params`, async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.setViewport({ width, height });

      let image;

      await page.goto("http://localhost:9000/index.html", {
        waitUntil: "networkidle0",
      });

      image = await page.screenshot();

      expect(image).toMatchImageSnapshot(
        process.env.CI
          ? {
              failureThreshold: 0.01,
              failureThresholdType: "percent",
            }
          : undefined
      );

      await page.goto("http://localhost:9000/postsPage.html", {
        waitUntil: "networkidle0",
      });

      image = await page.screenshot();

      expect(image).toMatchImageSnapshot(
        process.env.CI
          ? {
              failureThreshold: 0.01,
              failureThresholdType: "percent",
            }
          : undefined
      );

      await page.goto("http://localhost:9000/post.html", {
        waitUntil: "networkidle0",
      });

      image = await page.screenshot();

      expect(image).toMatchImageSnapshot(
        process.env.CI
          ? {
              failureThreshold: 0.01,
              failureThresholdType: "percent",
            }
          : undefined
      );

      await page.goto("http://localhost:9000/feedback.html", {
        waitUntil: "networkidle0",
      });

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
