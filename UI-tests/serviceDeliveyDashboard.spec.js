// const {test, expect} = require('@playwright/test');

// test('SD_Chart Dropdown test', async({page}) => {
//     await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');

//   const email = 'vivek-sunil.pawar@capgemini.com';
//   const password = 'Pass@1234';

//   await page.fill('input[type="email"]', email);
//   await page.fill('input[type="password"]', password);
//   await page.click('button[type="submit"]');

//   // Wait for navigation to complete
//   await page.waitForNavigation();
//   await page.waitForTimeout(5000);
//   await page.locator('header').filter({ hasText: 'Feature Stability Index3 Months6 Months1 Year' }).getByRole('combobox').selectOption('180');
//   await page.waitForTimeout(5000);
//   await page.locator('header').filter({ hasText: 'Service Delivery Tickets DaywiseTodayYesterdayLast MonthQuarterlyHalf YearlyYear' }).getByRole('combobox').selectOption('365');
// });


// test('SD2_Chart Dropdown test', async({page}) => {
//     await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');

//   const email = 'vivek-sunil.pawar@capgemini.com';
//   const password = 'Pass@1234';

//   await page.fill('input[type="email"]', email);
//   await page.fill('input[type="password"]', password);
//   await page.click('button[type="submit"]');

//   // Wait for navigation to complete
//   await page.waitForNavigation();
//   await page.waitForTimeout(5000);
// await page.getByRole('button', { name: 'Expand / collapse sidebar' }).click();
// await page.getByRole('link', { name: 'Service Now Ticket Details', exact: true }).click();
// await page.waitForTimeout(5000);
// await page.getByRole('combobox').selectOption('365');
// await page.getByRole('button', { name: 'Expand / collapse sidebar' }).click();
// });


// test('Feature Stability Index Chart test', async({page}) => {
//     await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');

//   const email = 'vivek-sunil.pawar@capgemini.com';
//   const password = 'Pass@1234';

//   await page.fill('input[type="email"]', email);
//   await page.fill('input[type="password"]', password);
//   await page.click('button[type="submit"]');

//   // Wait for navigation to complete
//   await page.waitForNavigation();
//   await page.waitForTimeout(5000);
// const graphsElement = await page.locator('foreignobject').filter({ hasText: 'DASH-15DASH-18DASH-16' })
//   expect(await graphsElement.screenshot()).toMatchSnapshot('SD_FeatureSability.png');
// });

// test('Service Delivery Ticket Chart test', async({page}) => {
//     await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');

//   const email = 'vivek-sunil.pawar@capgemini.com';
//   const password = 'Pass@1234';

//   await page.fill('input[type="email"]', email);
//   await page.fill('input[type="password"]', password);
//   await page.click('button[type="submit"]');

//   // Wait for navigation to complete
//   await page.waitForNavigation();
//   await page.waitForTimeout(5000);
//   await page.locator('header').filter({ hasText: 'Service Delivery Tickets DaywiseTodayYesterdayLast MonthQuarterlyHalf YearlyYear' }).getByRole('combobox').selectOption('365');
//   await page.waitForTimeout(5000);
// const graphElement = await page.locator('foreignobject').filter({ hasText: '2023-05-042022-10-152022-10-102022-10-122022-12-152022-12-04' })
// expect(await graphElement.screenshot()).toMatchSnapshot('SD_ServiceDeliveryTickets.png');
// });



// test('SD2_Table test', async({page}) => {
//     await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');

//   const email = 'vivek-sunil.pawar@capgemini.com';
//   const password = 'Pass@1234';

//   await page.fill('input[type="email"]', email);
//   await page.fill('input[type="password"]', password);
//   await page.click('button[type="submit"]');

//   // Wait for navigation to complete
//   await page.waitForNavigation();
//   await page.waitForTimeout(5000);
//   await page.getByRole('button', { name: 'Expand / collapse sidebar' }).click();
//   await page.getByRole('link', { name: 'Service Now Ticket Details', exact: true }).click();
//   await page.waitForTimeout(5000);
//   await page.getByRole('button', { name: 'Next page' }).click();
//   await page.getByRole('button', { name: 'Next page' }).click();
//   await page.getByRole('button', { name: 'Next page' }).click();
//   await page.getByRole('button', { name: 'Next page' }).click();
//   await page.getByRole('button', { name: 'Page 2' }).click();
// });

// test('No. of Ticket Per Epic Chart test', async({page}) => {
//     await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');

//   const email = 'vivek-sunil.pawar@capgemini.com';
//   const password = 'Pass@1234';

//   await page.fill('input[type="email"]', email);
//   await page.fill('input[type="password"]', password);
//   await page.click('button[type="submit"]');

//   // Wait for navigation to complete
//   await page.waitForNavigation();
//   await page.waitForTimeout(5000);
//   await page.getByRole('button', { name: 'Expand / collapse sidebar' }).click();
//   await page.getByRole('link', { name: 'Service Now Ticket Details', exact: true }).click();
//   await page.waitForTimeout(5000);
// const snapElement = await page.getByText('No. of Tickets Per EpicDASH-1DASH-1DASH-17DASH-17DASH-5DASH-5MULJIRA-51MULJIRA-5')
// expect(await snapElement.screenshot()).toMatchSnapshot('SD_TicketPerEpic.png');
// });


// test('Restricted Page Test', async({page}) => {
//     await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');

//   const email = 'vivek-sunil.pawar@capgemini.com';
//   const password = 'Pass@1234';

//   await page.fill('input[type="email"]', email);
//   await page.fill('input[type="password"]', password);
//   await page.click('button[type="submit"]');

//   // Wait for navigation to complete
//   await page.waitForNavigation();
//   await page.waitForTimeout(5000);
// await page.getByRole('button', { name: 'Expand / collapse sidebar' }).click();
// await page.getByRole('link', { name: 'Admin', exact: true }).click();
// await page.waitForTimeout(5000);
// const pageContent = await page.textContent('body');
// expect(pageContent).toContain('Access to this page is restricted');
// });