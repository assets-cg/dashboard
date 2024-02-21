// const {test, expect} = require('@playwright/test');

// test('Visit Dashboard & take a screenshot', async({page}) => {
//     await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');

//   const email = 'shuchi.shubhangi@capgemini.com';
//   const password = 'Pass@1234';

//   await page.fill('input[type="email"]', email);
//   await page.fill('input[type="password"]', password);
//   await page.click('button[type="submit"]');

//   // Wait for navigation to complete
//   await page.waitForNavigation();
//   await page.waitForTimeout(5000);
//   await page.getByRole('link', { name: '10100' }).click();
//   await page.waitForTimeout(5000);
// //   await page.locator('header').filter({ hasText: 'Epic wise Effort ViewTo DoIn ProgressCompleted' }).getByRole('combobox').selectOption('In Progress');
// //   await page.waitForTimeout(5000);
//   expect(await page.screenshot({
//     fullPage: true
//    })).toMatchSnapshot('PM_mainPage.png');
// });


// test('Chart dropdown Test', async({page}) => {
//   await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');

//   const email = 'shuchi.shubhangi@capgemini.com';
//   const password = 'Pass@1234';

//   await page.fill('input[type="email"]', email);
//   await page.fill('input[type="password"]', password);
//   await page.click('button[type="submit"]');
//   // Wait for navigation to complete
//   await page.waitForNavigation();
//   await page.waitForTimeout(5000);
//   //Chart Dropdown
//   await page.getByRole('combobox').nth(1).selectOption('Oneclick-Sprint-1');
//   await page.waitForTimeout(5000);
//   await page.locator('header').filter({ hasText: 'Deployment Frequency Daywise All EnvironmentTodayYesterdayLast MonthQuarterlyHal' }).getByRole('combobox').selectOption('180');
//   await page.getByRole('link', { name: '10100' }).click();
//   await page.getByRole('button', { name: 'Sign Out' }).click();
// });

// test('Sprint Board View Test', async({page}) => {
//   await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');

//   const email = 'shuchi.shubhangi@capgemini.com';
//   const password = 'Pass@1234';

//   await page.fill('input[type="email"]', email);
//   await page.fill('input[type="password"]', password);
//   await page.click('button[type="submit"]');
//   // Wait for navigation to complete
//   await page.waitForNavigation();
//   await page.waitForTimeout(5000);
// await page.getByRole('link', { name: '10100' }).click();
// await page.waitForTimeout(3000);
// await page.getByRole('link', { name: '3', exact: true }).click();
// await page.waitForTimeout(3000);
// await page.getByRole('link', { name: 'Oneclick-Sprint-1' }).click();
// await page.waitForTimeout(3000);
// await page.getByRole('button', { name: 'Prev' }).click();
// await page.getByRole('button', { name: 'Sign Out' }).click();
// });


// test('Sprint Deepdive Test', async({page}) => {
//   await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');

//   const email = 'shuchi.shubhangi@capgemini.com';
//   const password = 'Pass@1234';

//   await page.fill('input[type="email"]', email);
//   await page.fill('input[type="password"]', password);
//   await page.click('button[type="submit"]');
//   // Wait for navigation to complete
//   await page.waitForNavigation();
//   await page.waitForTimeout(5000);
//   //deepdive
//   await page.getByRole('link', { name: '10100' }).click();
//   await page.waitForTimeout(3000);
//   await page.getByRole('link', { name: '3', exact: true }).click();
//   await page.waitForTimeout(3000);
//   await page.getByRole('link', { name: '4' }).click();
//   await page.waitForTimeout(3000);
//   await page.getByRole('link', { name: '11501' }).click();
//   await page.getByRole('button', { name: 'Prev', exact: true }).click();
//   // await page.getByRole('button', { name: 'Sign Out' }).click();
// });


// test('Story Summary Test', async({page}) => {
//   await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');

//   const email = 'shuchi.shubhangi@capgemini.com';
//   const password = 'Pass@1234';

//   await page.fill('input[type="email"]', email);
//   await page.fill('input[type="password"]', password);
//   await page.click('button[type="submit"]');
//   // Wait for navigation to complete
//   await page.waitForNavigation();
//   await page.waitForTimeout(5000);
//   //deepdive
//   await page.getByRole('link', { name: '10100' }).click();
//   await page.waitForTimeout(3000);
//   await page.getByRole('link', { name: '3', exact: true }).click();
//   await page.waitForTimeout(3000);
//   await page.getByRole('link', { name: '4' }).click();
//   await page.waitForTimeout(3000);
//   await page.getByRole('link', { name: '11501' }).click();
//   // await page.waitForTimeout(3000);
//   await page.getByRole('link', { name: 'MULJIRA-51' }).click();
//   await page.getByRole('button', { name: 'Expand / collapse sidebar' }).click();
//   await page.getByRole('link', { name: 'Program Manager', exact: true }).click();
// });


// test('Feature Drilldown Test', async({page}) => {
// await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');
// const email = 'vedant-pravin.yerpude@capgemini.com';
// const password = 'Pass@1234';

// await page.fill('input[type="email"]', email);
// await page.fill('input[type="password"]', password);
// await page.click('button[type="submit"]');
// // Wait for navigation to complete
// await page.waitForNavigation();
// await page.waitForTimeout(5000);
// //Feature Drilldown
// await page.getByRole('link', { name: '10000' }).click();
// await page.waitForTimeout(3000);
// await page.getByRole('link', { name: '2', exact: true }).click();
// await page.waitForTimeout(3000);
// await page.getByRole('link', { name: '1', exact: true }).click();
// await page.waitForTimeout(3000);
// await page.getByRole('link', { name: '10000' }).click();
// // await page.waitForTimeout(10000);
// await page.getByRole('link', { name: '10500' }).click();
// await page.getByRole('button', { name: 'Sign Out' }).click();
// });

// test('Task Summary Test', async({page}) => {
//   await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');
//   const email = 'vedant-pravin.yerpude@capgemini.com';
//   const password = 'Pass@1234';
  
//   await page.fill('input[type="email"]', email);
//   await page.fill('input[type="password"]', password);
//   await page.click('button[type="submit"]');
//   // Wait for navigation to complete
//   await page.waitForNavigation();
//   await page.waitForTimeout(5000);
//   //Feature Drilldown
//   await page.getByRole('link', { name: '10000' }).click();
//   await page.waitForTimeout(3000);
//   await page.getByRole('link', { name: '2', exact: true }).click();
//   await page.waitForTimeout(3000);
//   await page.getByRole('link', { name: '1', exact: true }).click();
//   await page.waitForTimeout(3000);
//   await page.getByRole('link', { name: '10000' }).click();
//   // await page.waitForTimeout(10000);
//   await page.getByRole('row', { name: '10001 Task-1 DASH-3 Done admin' }).getByRole('link', { name: '10001' }).click();
//   await page.getByRole('button', { name: 'Sign Out' }).click();
//   });


// test('Task By Status Legends Test', async({page}) => {
//   await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');
//   const email = 'vedant-pravin.yerpude@capgemini.com';
//   const password = 'Pass@1234';
  
//   await page.fill('input[type="email"]', email);
//   await page.fill('input[type="password"]', password);
//   await page.click('button[type="submit"]');
//   // Wait for navigation to complete
//   await page.waitForNavigation();
//   await page.waitForTimeout(5000);
//   //Feature Drilldown
//   await page.getByRole('link', { name: '10000' }).click();
//   await page.waitForTimeout(3000);
//   await page.getByRole('link', { name: '2', exact: true }).click();
//   await page.waitForTimeout(3000);
//   await page.getByRole('link', { name: '1', exact: true }).click();
//   await page.waitForTimeout(3000);
//   await page.getByRole('link', { name: '10000' }).click();
//   await page.getByRole('button', { name: 'Expand / collapse sidebar' }).click();
//   await page.getByRole('button', { name: 'Expand / collapse sidebar' }).click();
// const taskByStatusElement = await page.waitForSelector('.taskByStatus');

// // Get the text content of the element
// const textContent = await taskByStatusElement.textContent();

// // Perform assertions on the text content
// expect(textContent).toContain('Done');
// expect(textContent).toContain('Blocked');
// expect(textContent).toContain('To Do');
// expect(textContent).toContain('In Progress');

// await page.getByRole('button', { name: 'Expand / collapse sidebar' }).click();
// });


// test('Assignee View Test', async({page}) => {
//   await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');
//   const email = 'vedant-pravin.yerpude@capgemini.com';
//   const password = 'Pass@1234';
  
//   await page.fill('input[type="email"]', email);
//   await page.fill('input[type="password"]', password);
//   await page.click('button[type="submit"]');
//   // Wait for navigation to complete
//   await page.waitForNavigation();
//   await page.waitForTimeout(5000);
//   await page.getByRole('button', { name: 'Expand / collapse sidebar' }).click();
//   await page.getByRole('link', { name: 'Assignee View', exact: true }).click();
//   await page.waitForTimeout(5000);
//   await page.getByRole('link', { name: '4' }).click();
//   await page.locator('div').filter({ hasText: /^Prev12Next$/ }).getByRole('button', { name: 'Next page' }).click();
//   await page.getByRole('link', { name: 'akshay_Kumar_Patel' }).click();
//   await page.getByRole('button', { name: 'Prev', exact: true }).click();
//   await page.getByRole('link', { name: '1' }).nth(1).click();
//   await page.getByRole('row', { name: 'mneelapu 0 0 1' }).getByRole('link', { name: '1' }).click();
// });


// test('Jenkins View Test', async({page}) => {
//   await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');
//   const email = 'vedant-pravin.yerpude@capgemini.com';
//   const password = 'Pass@1234';
  
//   await page.fill('input[type="email"]', email);
//   await page.fill('input[type="password"]', password);
//   await page.click('button[type="submit"]');
//   // Wait for navigation to complete
//   await page.waitForNavigation();
//   await page.waitForTimeout(5000);
// await page.getByRole('button', { name: 'Expand / collapse sidebar' }).click();
// await page.getByRole('link', { name: 'Jenkins View', exact: true }).click();
// await page.locator('.w-20').first().selectOption('PROD');
// await page.locator('.w-32').first().selectOption('365');
// await page.locator('div:nth-child(2) > .px-5 > .mb-5 > .w-20').selectOption('DEV');
// await page.locator('div:nth-child(2) > .px-5 > .mb-5 > .w-32').selectOption('365');
// await page.locator('header').filter({ hasText: 'Release Pipeline TimeTodayYesterdayLast MonthQuarterlyHalf YearlyYearly' }).getByRole('combobox').selectOption('180');
// await page.locator('div').filter({ hasText: /^Prev12345Next$/ }).getByRole('button', { name: 'Next page' }).click();
// await page.locator('header').filter({ hasText: 'Environment Specific BuildTodayYesterdayLast MonthQuarterlyHalf YearlyYearly' }).getByRole('combobox').selectOption('180');
// });


// test('Deployment Frequency Graph Test', async({page}) => {
//   await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');
//   const email = 'vedant-pravin.yerpude@capgemini.com';
//   const password = 'Pass@1234';
  
//   await page.fill('input[type="email"]', email);
//   await page.fill('input[type="password"]', password);
//   await page.click('button[type="submit"]');
//   // Wait for navigation to complete
//   await page.waitForNavigation();
//   await page.waitForTimeout(5000);
//   await page.locator('header').filter({ hasText: 'Deployment Frequency Daywise All EnvironmentTodayYesterdayLast MonthQuarterlyHal' }).getByRole('combobox').selectOption('180');
//   await page.waitForTimeout(5000);
//   const widgetElement = await page.locator('foreignobject').filter({ hasText: 'QAPRODDEV' });
//   expect(await widgetElement.screenshot()).toMatchSnapshot('PM_DeploymentGraph.png');
// });

// test('Epic Wise Effort Graph Test', async({page}) => {
//   await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');
//   const email = 'vedant-pravin.yerpude@capgemini.com';
//   const password = 'Pass@1234';
  
//   await page.fill('input[type="email"]', email);
//   await page.fill('input[type="password"]', password);
//   await page.click('button[type="submit"]');
//   // Wait for navigation to complete
//   await page.waitForNavigation();
//   await page.waitForTimeout(5000);
//   const graphElement = await page.getByText('Epic wise Effort ViewTo DoIn ProgressCompleted Mean Effort per Epic : 0.54 cal D')
//   expect(await graphElement.screenshot()).toMatchSnapshot('PM_EpicWiseEffort.png');
// });

// test('Project Status Graph Test', async({page}) => {
//   await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');
//   const email = 'vedant-pravin.yerpude@capgemini.com';
//   const password = 'Pass@1234';
  
//   await page.fill('input[type="email"]', email);
//   await page.fill('input[type="password"]', password);
//   await page.click('button[type="submit"]');
//   // Wait for navigation to complete
//   await page.waitForNavigation();
//   await page.waitForTimeout(5000);
//   const graphsElement = await page.locator('div').filter({ hasText: /^DashboardProject=26\.59%$/ }).first();
//   expect(await graphsElement.screenshot()).toMatchSnapshot('PM_ProjectStatus.png');
// });

// test('Total Work Remaining in %age Graph Test', async({page}) => {
//   await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');
//   const email = 'vedant-pravin.yerpude@capgemini.com';
//   const password = 'Pass@1234';
  
//   await page.fill('input[type="email"]', email);
//   await page.fill('input[type="password"]', password);
//   await page.click('button[type="submit"]');
//   // Wait for navigation to complete
//   await page.waitForNavigation();
//   await page.waitForTimeout(5000);
//   await page.getByRole('link', { name: '10000' }).click();
//   await page.waitForTimeout(3000);
//   await page.getByRole('link', { name: '2', exact: true }).click();
//   await page.waitForTimeout(3000);
//   const graphsElement = await page.getByRole('main').locator('div').filter({ hasText: 'Total Work Remaining in %age Show More..025507510078.57% in Kpi_ProjSprint102550' }).nth(2);
//   expect(await graphsElement.screenshot()).toMatchSnapshot('PM_WorkRemainigGraph.png');
// });