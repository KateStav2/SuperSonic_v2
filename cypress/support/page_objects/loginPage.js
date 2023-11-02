export class LoginPage{

    submitLoginFormWithEmailAndPassword(email, password){
        cy.get('.title-login').should('contain','Welcome Back')
        cy.get('#login_email').clear().type(email)
        cy.get('#login_password').clear().type(password)
        cy.get('form').submit()
        //cy.wait(10000)
        cy.get('.title-partners').should('contain','All Games')
    }

    requestForgotPasswordByEmail(email){
        cy.get('form h2').should('contain','Reset Password')
        cy.get('form [class="text"]').should('contain','Enter your email')
        cy.get('#email').clear().type(email)
        cy.get('form').submit()
    }  

} 

export const onLoginPage = new LoginPage
