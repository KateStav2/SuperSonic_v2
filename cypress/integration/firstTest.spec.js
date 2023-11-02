/// <reference types="cypress" />

const { onLoginPage } = require("../support/page_objects/loginPage")
const { navigateTo } = require("../support/page_objects/navigationPage")

describe('Login and navigation', () => {

    beforeEach('open application', () => {
        cy.openHomePage()
    })

    it('new password request', () => {
  
        cy.contains('Forgot Password?').click()

        cy.get('form').submit()
        cy.get('#email_help').should('contain','Mandatory field')

        onLoginPage.requestForgotPasswordByEmail('ddd')
        cy.get('#email_help').should('contain','Please enter a valid email address')

        onLoginPage.requestForgotPasswordByEmail('k.stavytska@gmail.com')
        cy.get('h2').should('contain','Help is on the Way!')

    })

    it('login', () => {

        onLoginPage.submitLoginFormWithEmailAndPassword('k.stavytska@gmail.com','Kate0707')

    })

    it('verify navigations across the main menu', () => {
        
        onLoginPage.submitLoginFormWithEmailAndPassword('k.stavytska@gmail.com','Kate0707')

        navigateTo.prototypesReportsPage()
        navigateTo.aBTestsPage()
        navigateTo.levelAnalyticsPage()
        navigateTo.crashCenterPage()
        navigateTo.analyticsPage()
        navigateTo.topCreativesPage()
        navigateTo.paymentsPage()
        navigateTo.knowledgeHubPage()
        
        navigateTo.allGamesPage()
        //navigateTo.helpCenterPage()

    })

    it('verify that Game Optimization menu opens and closes by click', () => {
        onLoginPage.submitLoginFormWithEmailAndPassword('k.stavytska@gmail.com','Kate0707')

        cy.contains('Game Optimization')
        .click()
        .parent()
        .invoke('attr','aria-expanded')
        .should('be.equal','true')
        cy.contains('Game Optimization')
        .click()
        .parent()
        .invoke('attr','aria-expanded')
        .should('be.equal','false')
      
    })

    it('verify that Published Games menu opens and closes by click', () => {
        onLoginPage.submitLoginFormWithEmailAndPassword('k.stavytska@gmail.com','Kate0707')

        cy.contains('Published Games')
        .click()
        .parent()
        .invoke('attr','aria-expanded')
        .should('be.equal','true')
        cy.contains('Published Games')
        .click()
        .parent()
        .invoke('attr','aria-expanded')
        .should('be.equal','false')
      
    })

 })

