describe('User Login Test', () => {
    

    it('Location Details Widget test', function() {
      cy.viewport(1920, 1080);
      cy.visit('https://dev.d1c49lzgs2u0p4.amplifyapp.com/')

      //Login
      
        cy.get('input[type="email"]').type('thulsi.doss-krishnan@capgemini.com');
          cy.get('input[type="password"]').type('Welcome123');
       
          // Click the login button
        cy.get('button[type="submit"]').click();
      

    cy.wait(10000);

      // Get the table element and its rows
      cy.get('table.location-table').find('tr').then(rows => {
        // Loop through the rows and check if any of them contain specific city names
        let found = false
        rows.each((i, row) => {
          const cells = Cypress.$(row).find('td')
          cells.each((j, cell) => {
            const text = Cypress.$(cell).text().toLowerCase()
            if (text === 'mumbai' || text === 'pune' || text === 'bangalore') {
              found = true
            }
          })
        })
  
        // Assert that at least one row contains a specific city name
        expect(found).to.be.true
      })
    })
    it('Threshold Details Widget test-1', function() {
      cy.viewport(1920, 1080);
      cy.visit('https://dev.d1c49lzgs2u0p4.amplifyapp.com/')

      //Login
      
        cy.get('input[type="email"]').type('thulsi.doss-krishnan@capgemini.com');
          cy.get('input[type="password"]').type('Welcome123');
       
          // Click the login button
        cy.get('button[type="submit"]').click();
      

        cy.wait(10000);

 

    
      // Get the table element and its rows
      cy.get('table.thresholdtable').find('tr').then(rows => {
        // Get the column names from the first row
        const columnNames = Array.from(rows[0].querySelectorAll('th')).map(th => th.textContent.trim());
  
        // Define the expected column names
        const expectedColumnNames = ['Id', 'Graph Name', 'Min Value', 'Max Value', 'Unit'];
  
        // Assert that the expected column names match the actual column names
        expect(columnNames).to.deep.equal(expectedColumnNames);
      })
    })

    it('Threshold Details Widget test-2', function() {
      cy.viewport(1920, 1080);
      cy.visit('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');
    
      // Login
      cy.get('input[type="email"]').type('thulsi.doss-krishnan@capgemini.com');
      cy.get('input[type="password"]').type('Welcome123');
      cy.get('button[type="submit"]').click();
    
      cy.wait(10000);
    
      // Click on the "Add Threshold" button
      cy.get('button[type="addthreshold"]').click();
    
      // Provide input values
      cy.get('input[type="graphname"]').type('GraphTest-1');
      cy.get('input[type="minval"]').type('10');
      cy.get('input[type="maxval"]').type('100');
      cy.get('input[type="unit"]').type('MB');
    
      // Click on the submit button
      cy.get('button[type="thresholdsubmit"]').click();
      cy.wait(10000)
      // Check if the row is present in the table
      // cy.get('table.thresholdtable').find('tr', 'Graph Name').contains('td', 'GraphTest-1');

    });
   
  
    it('Add User Widget test', function() {
      cy.viewport(1920, 1080);
      cy.visit('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');
    
      // Login
      cy.get('input[type="email"]').type('thulsi.doss-krishnan@capgemini.com');
      cy.get('input[type="password"]').type('Welcome123');
      cy.get('button[type="submit"]').click();
    
      cy.wait(20000);
    
       // Click on the dropdown in the widget
  cy.get('select.roledropdown').select('Service_Delivery_Manager'); // Select the desired dropdown option

  // Get the selected value and assert
  cy.get('select.roledropdown').invoke('val').should('eq', 'Service_Delivery_Manager');

  
  cy.get('select.roledropdown').select('Admin'); // Select the desired dropdown option

  // Get the selected value and assert
  cy.get('select.roledropdown').invoke('val').should('eq', 'Admin');
   
  
});


it('Logs in, enters Interval value, and prints localStorage value', () => {
  // Visit the website
  cy.viewport(1920, 1080);
      cy.visit('http://localhost:5173/')

      //Login
      
        cy.get('input[type="email"]').type('thulsi.doss-krishnan@capgemini.com');
          cy.get('input[type="password"]').type('Welcome123');
       
          // Click the login button
        cy.get('button[type="submit"]').click();
      

    cy.wait(10000);


  const enteredValue = '5';
    cy.get('input.addnewinterval').type(enteredValue);

    // Click on the Apply button
    cy.get('button.applyinterval').click();

    // Check if entered value matches localStorage value
    cy.window().then((win) => {
      const localStorageValue = win.localStorage.getItem('intervals');
      const isValueMatch = localStorageValue === enteredValue;
      cy.wrap(isValueMatch).should('be.true');
    });
});

})