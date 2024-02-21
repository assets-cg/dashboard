describe('User Login Test', () => {
  it('Visits the dashboard', function() {
    cy.visit('https://dev.d1c49lzgs2u0p4.amplifyapp.com/')
    cy.viewport(1920, 1080);

    //check for invalid user
  
    // Enter an incorrect username and password
    cy.get('input[type="email"]').type('wronguser@mail.com');
      cy.get('input[type="password"]').type('wrongpass');

    // Click the login button
    cy.get('button[type="submit"]').click();
    

    // Assert that an error message is displayed
    cy.get('.error-message').should('contain', 'User does not exist');
  })

    //check for invalid password
    it('Login with incorect password', () => {
    cy.visit('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');

    cy.get('input[type="email"]').type('vivek-sunil.pawar@capgemini.com');
    cy.get('input[type="password"]').type('Pass@123');

  // Click the login button
  cy.get('button[type="submit"]').click();

  // Assert that an error message is displayed
  cy.get('.error-message').should('contain', 'Incorrect username or password');
    })

  //Correct Login
  it('Login with correct credentials', () => {
  cy.visit('https://dev.d1c49lzgs2u0p4.amplifyapp.com/');

  cy.get('input[type="email"]').type('vivek-sunil.pawar@capgemini.com');
    cy.get('input[type="password"]').type('Pass@1234');

  // Click the login button
  cy.get('button[type="submit"]').click();
  })

  // cy.on('window:console', (console) => { console.clear(); });
})