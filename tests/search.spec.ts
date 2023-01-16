import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.getByText("Search").click();
});

test('Realizar una busqueda que no tenga resultados', async ({ page }) => {
  const inputContent = "hasnocontent"

  await page.type("#docsearch-input", inputContent)

  // await page.getByPlaceholder('Search docs').click();
  // await page.getByPlaceholder('Search docs').fill('hascontent');

  const messageParagraph = page.locator('p.DocSearch-Title > strong')

  await expect(messageParagraph).toBeVisible();
  await expect(messageParagraph).toHaveText(inputContent);

})

test('Limpiar el input de busqueda', async ({ page }) => {
  const inputContent = "somerandomtext"
  const inputBox = page.locator("#docsearch-input")

  await inputBox.type(inputContent)

  await expect(inputBox).toHaveAttribute('value', inputContent);

  await page.click("button[title='Clear the query']");

  await expect(inputBox).toHaveAttribute('value', '');
});

test('Realizar una busqueda que genere al menos tenga un resultado', async ({ page }) => {
  const searchBox = page.getByPlaceholder('Search docs');

  await searchBox.click();

  await page.getByPlaceholder('Search docs').fill('havetext');

  expect(searchBox).toHaveText('havetext');

  // Verity there are sections in the results
  await page.locator('.DocSearch-Dropdown-Container section').nth(1).waitFor();
  const numberOfResults = await page.locator('.DocSearch-Dropdown-Container section').count();
  await expect(numberOfResults).toBeGreaterThan(0);

});