import { test, expect } from '@playwright/test';

test.describe('Mukund Polymers Website E2E', () => {
  test('should have correct title and main sections', async ({ page }) => {
    await page.goto('http://localhost:5173');

    // Check title
    await expect(page).toHaveTitle(/Mukund Polymers India/);

    // Check Hero section
    const heroHeading = page.locator('#hero h1');
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText('Welcome to Mukund Polymers India');

    // Check products section and categories
    const productsHeading = page.locator('#products h2');
    await expect(productsHeading).toHaveText('Our Products');

    // Check the 5 new product categories
    const product1 = page.locator('text=Rubber Crumb Powder & Granules').first();
    await expect(product1).toBeVisible();

    const product2 = page.locator('text=Rubber Mats').first();
    await expect(product2).toBeVisible();

    const product3 = page.locator('text=Artificial Grass').first();
    await expect(product3).toBeVisible();

    const product4 = page.locator('text=Rubber Tiles').first();
    await expect(product4).toBeVisible();

    const product5 = page.locator('text=Other Services').first();
    await expect(product5).toBeVisible();

    // Check catalogue download buttons
    const downloadBtn1 = page.locator('text=📄 S&T Rubber Catalogue');
    await expect(downloadBtn1).toBeVisible();
    await expect(downloadBtn1).toHaveAttribute('href', '/documents/S & T RUBBER CATALOGUE.pdf');

    const downloadBtn2 = page.locator('text=📄 EPDM Specules Photos');
    await expect(downloadBtn2).toBeVisible();
    await expect(downloadBtn2).toHaveAttribute('href', '/documents/S%26T%20Rubber%20Flooring%20EPDM%20SPECULES%20Photos.pdf');

    const downloadBtn3 = page.locator('text=📄 Rubber Flooring Photos');
    await expect(downloadBtn3).toBeVisible();
    await expect(downloadBtn3).toHaveAttribute('href', '/documents/S%26T%20Rubber%20Flooring%20Photos.pdf');

    // Check contact section
    const contactHeading = page.locator('#contact h3');
    await expect(contactHeading).toHaveText('Get In Touch');
    
    const contactName = page.locator('text=P.N. Saravanan').first();
    await expect(contactName).toBeVisible();
  });
});
