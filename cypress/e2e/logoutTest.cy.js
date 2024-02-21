describe('User Logout Test', () => {
    it('Visits the dashboard', () => {
      cy.visit('https://dev.d1c49lzgs2u0p4.amplifyapp.com/')
      cy.viewport(1920, 1080);

    //Correct Login
  
    cy.get('input[type="email"]').type('vivek-sunil.pawar@capgemini.com');
      cy.get('input[type="password"]').type('Pass@1234');
  
    // Click the login button
    cy.get('button[type="submit"]').click({timeout: 10000});

    cy.wait(5000);

    cy.get('button[type="signOut"]').click({timeout: 2000});
    
  
      
    })
  })