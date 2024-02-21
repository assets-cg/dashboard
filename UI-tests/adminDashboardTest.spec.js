const { test, expect } = require('@playwright/test');

test('Update/Forgot Password Test', async ({ page }) => {
  await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');

  await page.getByRole('link', { name: 'Forgot Password ?' }).click();
  await page.getByPlaceholder('Registered Email').fill('vivek-sunil.pawar@capgemini.com');
  await page.getByRole('button', { name: 'Send OTP' }).click();
  await page.waitForTimeout(8000)
  await page.getByRole('link', { name: 'Cancel' }).click();

});

test('User Login Test', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });

  // Location Details Widget test
  await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');
  await page.fill('input[type="email"]', 'thulsi.doss-krishnan@capgemini.com');
  await page.fill('input[type="password"]', 'Welcome123');
  await page.click('button[type="submit"]');
  await page.waitForNavigation();
  await page.waitForTimeout(8000)
  await expect(page.url()).toContain('/admin');

});

// test('Generate Token Test', async ({ page }) => {
//   await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');
//   await page.fill('input[type="email"]', 'thulsi.doss-krishnan@capgemini.com');
//   await page.fill('input[type="password"]', 'Welcome123');
//   await page.click('button[type="submit"]');
//   await page.waitForNavigation();
//   await page.waitForTimeout(8000)
//   //Generate Token
//   await page.getByRole('button', { name: 'Generate Token' }).click();
//   await page.getByPlaceholder('username').fill('admin@admin.com');
//   await page.getByPlaceholder('password', { exact: true }).fill('Admin@123');
//   await page.getByRole('button', { name: 'Generate', exact: true }).click();
// });

// test('Set Prometheus URL Test', async ({ page }) => {
//   await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');
//   await page.fill('input[type="email"]', 'thulsi.doss-krishnan@capgemini.com');
//   await page.fill('input[type="password"]', 'Welcome123');
//   await page.click('button[type="submit"]');
//   await page.waitForNavigation();
//   await page.waitForTimeout(8000)
//   //Set URL
//   await page.getByRole('button', { name: 'Set Prometheus URL' }).click();
//   await page.getByPlaceholder('e.g. ec2-44-200-131-926.compute-1.amazonaws.com').fill('ec2-44-211-198-233.compute-1.amazonaws.com');
//   await page.getByRole('button', { name: 'Submit' }).click();
//   // await page.locator('span').filter({ hasText: 'Admin Dashboard Generate TokenSet Prometheus URLSet Prometheus URLSubmitPromethe' }).getByRole('button').nth(2).click();
// });


// test('Verify Location Table Test', async ({ page }) => {

//   await page.setViewportSize({ width: 1920, height: 1080 });

//   // Location Details Widget test
//   await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');
//   await page.fill('input[type="email"]', 'thulsi.doss-krishnan@capgemini.com');
//   await page.fill('input[type="password"]', 'Welcome123');
//   await page.click('button[type="submit"]');
//   await page.waitForNavigation();
//   await page.waitForTimeout(8000)

//   const rows = await page.$$('table.location-table tr');
//   let found = false;
//   for (const row of rows) {
//     const cells = await row.$$('td');
//     for (const cell of cells) {
//       const text = await cell.innerText();
//       if (text.toLowerCase() === 'mumbai' || text.toLowerCase() === 'pune' || text.toLowerCase() === 'bangalore') {
//         found = true;
//         break;
//       }
//     }
//     if (found) {
//       break;
//     }
//   }

//   expect(found).toBe(true);
// });

// test('Add New City Test', async ({ page }) => {
//   await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');
//   await page.fill('input[type="email"]', 'thulsi.doss-krishnan@capgemini.com');
//   await page.fill('input[type="password"]', 'Welcome123');
//   await page.click('button[type="submit"]');
//   await page.waitForNavigation();
//   await page.waitForTimeout(8000)
// // Add new City
//   await page.getByRole('button', { name: 'Add City' }).click();
//   await page.getByPlaceholder('Enter city name').fill('Aurangabad');
//   await page.getByPlaceholder('Enter state name').fill('Maharashtra');
//   await page.getByPlaceholder('Enter alias name').fill('AU:MH');
//   page.once('dialog', dialog => {
//     console.log(`Dialog message: ${dialog.message()}`);
//     dialog.dismiss().catch(() => {});
//   });
//   await page.getByRole('button', { name: 'Save' }).click();

// });

// test('Add New User Test', async ({ page }) => {
//   await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');
//   await page.fill('input[type="email"]', 'thulsi.doss-krishnan@capgemini.com');
//   await page.fill('input[type="password"]', 'Welcome123');
//   await page.click('button[type="submit"]');
//   await page.waitForNavigation();
//   await page.waitForTimeout(8000)
// //Add new user
//   await page.getByPlaceholder('Email').fill('testUser@testing.com');
//   await page.getByPlaceholder('Password').fill('Pass@1234');
//   await page.locator('label').filter({ hasText: 'Select User RoleAdminBusiness_OwnerProgram_ManagerService_Delivery_ManagerTest' }).getByRole('combobox').selectOption('Test');
//   await page.getByRole('button', { name: 'Sign Up' }).click();

// });

// test('User Role Dropdown Test', async ({ page }) => {
//   // Add User Widget test
//   await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');
//   await page.fill('input[type="email"]', 'thulsi.doss-krishnan@capgemini.com');
//   await page.fill('input[type="password"]', 'Welcome123');
//   await page.click('button[type="submit"]');
//   await page.waitForNavigation();
//   await page.waitForTimeout(8000)

//   await page.selectOption('select.roledropdown', 'Service_Delivery_Manager');
//   const selectedValue = await page.$eval('select.roledropdown', (select) => select.value);
//   expect(selectedValue).toBe('Service_Delivery_Manager');

//   await page.selectOption('select.roledropdown', 'Admin');
//   const selectedValueAdmin = await page.$eval('select.roledropdown', (select) => select.value);
//   expect(selectedValueAdmin).toBe('Admin');

//   console.log('All test cases passed!');


// });

// test('Verify Threshold Table Test', async ({ page }) => {

//   // Threshold Details Widget test-1
//   await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');
//   await page.fill('input[type="email"]', 'thulsi.doss-krishnan@capgemini.com');
//   await page.fill('input[type="password"]', 'Welcome123');
//   await page.click('button[type="submit"]');
//   await page.waitForNavigation();
//   await page.waitForTimeout(8000)

//   const columnNames = await page.$$eval('table.thresholdtable tr:first-child th', (ths) =>
//     ths.map((th) => th.textContent.trim())
//   );
//   const expectedColumnNames = ['Id', 'Graph Name', 'Min Value', 'Max Value', 'Unit'];

//   expect(columnNames).toEqual(expectedColumnNames);
// });

// test('Add New Threshold Test', async ({ page }) => {
//   // Threshold Details Widget test-2
//   await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');
//   await page.fill('input[type="email"]', 'thulsi.doss-krishnan@capgemini.com');
//   await page.fill('input[type="password"]', 'Welcome123');
//   await page.click('button[type="submit"]');
//   await page.waitForNavigation();
//   await page.waitForTimeout(8000)

//   await page.click('button[type="addthreshold"]');
//   await page.fill('input[type="graphname"]', 'GraphTest');
//   await page.fill('input[type="minval"]', '10');
//   await page.fill('input[type="maxval"]', '100');
//   await page.fill('input[type="unit"]', 'MB');
//   await page.click('button[type="thresholdsubmit"]');

// });


// test('Update Threshold Test', async ({ page }) => {
//   await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');
//   await page.fill('input[type="email"]', 'thulsi.doss-krishnan@capgemini.com');
//   await page.fill('input[type="password"]', 'Welcome123');
//   await page.click('button[type="submit"]');
//   await page.waitForNavigation();
//   await page.waitForTimeout(8000)
//   //Update Threshold
//   await page.getByRole('button', { name: 'Update Threshold' }).click();
//   await page.locator('form').filter({ hasText: 'GraphName: Select Graph Name:Eden Space (Heap)Survivor Space (Heap)Tenured Gen (' }).getByRole('combobox').selectOption('GraphTest-1');
//   await page.getByPlaceholder('Enter Min Value').fill('30');
//   await page.getByPlaceholder('Enter Max Value').fill('80');
//   await page.getByPlaceholder('Enter unit').fill('MB');
//   await page.getByRole('button', { name: 'Save' }).click();
//   await page.waitForTimeout(3000)
//   await page.getByRole('button', { name: 'Page 8' }).click();

// });

// test('Update Time Interval Test', async ({ page }) => {
//   await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');
//   await page.fill('input[type="email"]', 'thulsi.doss-krishnan@capgemini.com');
//   await page.fill('input[type="password"]', 'Welcome123');
//   await page.click('button[type="submit"]');
//   await page.waitForNavigation();
//   await page.waitForTimeout(8000)
//   //Time Interval
// await page.locator('#units').selectOption('30');
// await page.locator('form').filter({ hasText: '5 Minutes15 Minutes30 Minutes1 Hour Apply' }).getByRole('button', { name: 'Apply' }).click();

// });

// test('Custom Time Interval Test', async ({ page }) => {
//   await page.goto('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');
//   await page.fill('input[type="email"]', 'thulsi.doss-krishnan@capgemini.com');
//   await page.fill('input[type="password"]', 'Welcome123');
//   await page.click('button[type="submit"]');
//   await page.waitForNavigation();
//   await page.waitForTimeout(8000)
//   //Custom Time Interval
// await page.getByPlaceholder('Add Interval').fill('60');
// await page.locator('#interval').click();
// });