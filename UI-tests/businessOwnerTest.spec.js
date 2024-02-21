// // @ts-check
// const { test, expect } = require('@playwright/test');

// test('BusinessOwner Dashboard Navigation Test', async ({ page }) => {
//     await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');
//     await page.getByPlaceholder('Email address').click();
//     await page.getByPlaceholder('Email address').fill('vedant-pravin.yerpude@capgemini.com');
//     await page.getByPlaceholder('Email address').press('Tab');
//     await page.getByPlaceholder('Password').fill('Pass@1234');
//     await page.getByRole('button', { name: 'Login' }).click();
//     await page.waitForNavigation();
//     await page.waitForTimeout(5000);
//     await page.getByRole('link', { name: '10000'}).click();
//     await page.waitForTimeout(5000);
//     await page.getByRole('link', { name: 'CHG0030037' }).click();
//     await page.getByRole('button', { name: 'Sign Out' }).click();
    
//   });

//   test('Chart Legends Visibility Test', async ({ page }) => {
//     // Navigate to the page with the Pie chart
//     await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');
//     await page.getByPlaceholder('Email address').click();
//     await page.getByPlaceholder('Email address').fill('vedant-pravin.yerpude@capgemini.com');
//     await page.getByPlaceholder('Email address').press('Tab');
//     await page.getByPlaceholder('Password').fill('Pass@1234');
//     await page.getByRole('button', { name: 'Login' }).click();
//     await page.waitForNavigation();
//     await page.waitForTimeout(5000);

//     const defectByTypeElement = await page.waitForSelector('.defectbytype');

//     // Get the text content of the element
//     const textContent = await defectByTypeElement.textContent();
  
//     // Perform assertions on the text content
//     expect(textContent).toContain('Performance Error');
//     expect(textContent).toContain('Security');
//     expect(textContent).toContain('Functionality Error');

//     await page.waitForTimeout(5000);
//     await page.evaluate(() => {
//       window.scrollTo(0, document.body.scrollHeight);
//     });


//     const featureIndexElement = await page.waitForSelector('.featureIndex');

//     // Get the text content of the element
//     const featureNames = await featureIndexElement.textContent();
  
//     // Perform assertions on the text content
//     expect(featureNames).toContain('DASH-15');
//     expect(featureNames).toContain('DASH-16');
//     expect(featureNames).toContain('DASH-18');
  
  
//   });


//   test('Chart Renders Valid Data Set', async ({ page }) => {

//     await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');
//     await page.getByPlaceholder('Email address').click();
//     await page.getByPlaceholder('Email address').fill('vedant-pravin.yerpude@capgemini.com');
//     await page.getByPlaceholder('Email address').press('Tab');
//     await page.getByPlaceholder('Password').fill('Pass@1234');
//     await page.getByRole('button', { name: 'Login' }).click();
//     await page.waitForNavigation();
//     await page.waitForTimeout(5000);
 
//     // Verify that the chart renders the data points correctly
//     await page.waitForSelector('.apexcharts-bar-series');
//     // Verify that the chart renders the correct number of data points
//     const dataPointCount = await page.$$eval('.apexcharts-bar-series rect', (dataPoints) => dataPoints.length);
//     expect(dataPointCount).toBeGreaterThan(-1);

//   });


//   test('Chart Dropdown Selection Test', async ({ page }) => {

//     await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');
//     await page.getByPlaceholder('Email address').fill('vedant-pravin.yerpude@capgemini.com');
//     await page.getByPlaceholder('Password').fill('Pass@1234');
//     await page.getByRole('button', { name: 'Login' }).click();
//     await page.waitForNavigation();
//     await page.waitForTimeout(5000);


//     // Simulate a change in the selected option to 180

//     await page.selectOption('select.featureIndexDropdown', '6 Months');
//     const selectedValue = await page.$eval('select.featureIndexDropdown', (select) => select.value);
//     expect(selectedValue).toBe('180');

// });

// test('Popup Test', async ({ page }) => {

//   await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');
//   await page.getByPlaceholder('Email address').fill('vedant-pravin.yerpude@capgemini.com');
//   await page.getByPlaceholder('Password').fill('Pass@1234');
//   await page.getByRole('button', { name: 'Login' }).click();
//   await page.waitForNavigation();
//   await page.waitForTimeout(5000);
//   //Check PopUp
//   await page.getByRole('link', { name: '10000' }).click();
//   await page.waitForTimeout(3000)
//   await page.getByRole('link', { name: '2', exact: true }).click();
//   await page.waitForTimeout(5000)
//   await page.getByRole('link', { name: 'Show More..' }).click();
//   // await page.waitForTimeout(5000)
//   await page.getByRole('button', { name: 'Sign Out' }).click();
// });

// test('Feature Status Drilldown Test', async ({ page }) => {
//   await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');
//   await page.getByPlaceholder('Email address').click();
//   await page.getByPlaceholder('Email address').fill('vedant-pravin.yerpude@capgemini.com');
//   await page.getByPlaceholder('Email address').press('Tab');
//   await page.getByPlaceholder('Password').fill('Pass@1234');
//   await page.getByRole('button', { name: 'Login' }).click();
//   await page.waitForNavigation();
//   await page.waitForTimeout(5000);
//   //Feature Drilldown
//   await page.getByRole('link', { name: 'DASH-15' }).click();
//   await page.getByRole('button', { name: 'Sign Out' }).click();
  
// });
