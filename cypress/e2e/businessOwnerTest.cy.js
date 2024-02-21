describe('Business Owner Test', () => {

  beforeEach(() => {
    cy.eyesOpen({
      appName: 'DashboardKPI !',
      browser: { width: 1920, height: 1080 },
    });
  });

  afterEach(() => {
    cy.eyesClose();
  });
    
  it('Business Owner Dashboard Header Check Test', function() { 
    cy.viewport(1920, 1080); 
    
    cy.visit('http://localhost:5173')
   //Login
    cy.get('input[type="email"]').type('vedant-pravin.yerpude@capgemini.com');
     cy.get('input[type="password"]').type('Pass@1234'); 
     // Click the login button 
     cy.get('button[type="submit"]').click();
      cy.wait(10000); 
      cy.eyesCheckWindow('BUsiness Owner Main Page');
      cy.get('h2.getHeading').contains('Business_Owner').should('exist');
  })


     it('Defect By Type Test', function() { cy.viewport(1920, 1080);
       cy.visit('http://localhost:5173');

      // Login
       cy.get('input[type="email"]').type('vedant-pravin.yerpude@capgemini.com'); 
       cy.get('input[type="password"]').type('Pass@1234'); 
       
       // Click the login button
       
       cy.get('button[type="submit"]').click(); cy.wait(10000); 

       // Verify pie diagram legends 
       
       cy.get('.defectbytype').should('exist').within(() => { cy.contains('Performance Error').should('exist'); 

       // Adjust 'Legend1' to match the expected legend text
        cy.contains('Security').should('exist'); 

        // Adjust 'Legend2' to match the expected legend text 
        cy.contains('Functionality Error').should('exist'); 

        // Adjust 'Legend3' to match the expected legend text 
      });
     });

     it('Access Denied Test', function() {
      cy.viewport(1920, 1080);
      cy.visit('http://localhost:5173');
    
      // Login
      cy.get('input[type="email"]').type('vedant-pravin.yerpude@capgemini.com');
      cy.get('input[type="password"]').type('Pass@1234');
    
      // Click the login button
      cy.get('button[type="submit"]').click();
    
      cy.wait(10000);
    
      // Click on the "Program Manager" option
      
      cy.get('.admindash').click();
      cy.eyesCheckWindow('Click!');
    
      // Verify the "Access Denied" message on the next page
      cy.contains('Access to this page is restricted').should('exist');
    });

    it('Project and Board Table Test', function() {
      cy.viewport(1920, 1080);
      cy.visit('http://localhost:5173');
    
      // Login
      cy.get('input[type="email"]').type('vedant-pravin.yerpude@capgemini.com');
      cy.get('input[type="password"]').type('Pass@1234');
    
      // Click the login button
      cy.get('button[type="submit"]').click();
    
      cy.wait(10000);
  
    
      // Check for the table with specified column names
      cy.get('table.projecttable') // Adjust the selector to match your table element
        .should('exist')
        .within(() => {
          cy.contains('Project Id').should('exist'); // Adjust 'Column1' to match the expected column name
          cy.contains('Project Name').should('exist'); // Adjust 'Column2' to match the expected column name
          cy.contains('Project Status').should('exist'); // Adjust 'Column3' to match the expected column name
          // Add more assertions for other column names if needed
        });
    
      // Click on the first row of the specified column
      cy.get('.getboards').click();
      cy.eyesCheckWindow('Clicked on Project Id !');
      // Verify the condition for the specified column names in the loaded table
      cy.get('table.boardtable') // Adjust the selector to match the loaded table element
        .should('exist')
        .within(() => {
          cy.contains('Board Id').should('exist'); // Adjust 'Column1Data' to match the expected data in the specified column
          cy.contains('Board Name').should('exist'); // Adjust 'Column2Data' to match the expected data in the specified column
          cy.contains('Project Name').should('exist');
          cy.contains('Board Type').should('exist'); // Adjust 'Column3Data' to match the expected data in the specified column
          // Add more assertions for other data in the specified columns if needed

          cy.wait(10000);
        });
    });

    // it('Feature Status Drilldown Test', function() {
    //   cy.viewport(1920, 1080);
    //   cy.visit('http://localhost:5173');
      
    //   // Login
    //   cy.get('input[type="email"]').type('vedant-pravin.yerpude@capgemini.com');
    //   cy.get('input[type="password"]').type('Pass@1234');
      
    //   // Click the login button
    //   cy.get('button[type="submit"]').click();
    //   cy.wait(10000);
      

    //   cy.get('table.featuretable') // Adjust the selector to match your table element
    //     .should('exist')
    //     .within(() => {
    //       cy.contains('Feature Name').should('exist'); // Adjust 'Column1' to match the expected column name
    //       cy.contains('Feature Key').should('exist'); // Adjust 'Column2' to match the expected column name
    //       cy.contains('Status').should('exist'); // Adjust 'Column3' to match the expected column name
    //       // Add more assertions for other column names if needed
    //     });
    //   // Click on the <a> element inside the component with class name 'getfeaturekey'
    //   cy.get('.getfeaturekey').click();
      
    //   cy.wait(10000);
      
    //   // Verify the redirected URL
    //   cy.url().should('include', '/featurestatusdrilldown');
    // });

    it('Should check if the bar chart is visible', () => {
      cy.viewport(1920, 1080);
      cy.visit('http://localhost:5173');
      
      // cy.eyesOpen({
      //   appName: 'businessOwnerTest',
      //   batchName: 'Bar-chart'
      // });
    
      // Login
      cy.get('input[type="email"]').type('vedant-pravin.yerpude@capgemini.com');
      cy.get('input[type="password"]').type('Pass@1234');
    
      // Click the login button
      cy.get('button[type="submit"]').click();
    
      cy.wait(10000);
      
      // Assuming the bar chart has a specific identifier or class name, use it to select the chart element
      cy.get('.defectbytype') // Replace '.bar-chart' with the actual selector for the bar chart element
        .should('be.visible')
        .then((chartElement) => {
          cy.eyesCheckWindow({
            tag: 'Bar Chart',
            target: 'region',
            selector: chartElement,
          });
        });

        cy.wait(5000);
        
        cy.get('.defectbytype').matchImageSnapshot('pieChart');
    });
    
  });