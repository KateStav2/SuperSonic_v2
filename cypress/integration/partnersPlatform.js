/// <reference types="cypress" />

import {
    loginToPlatform,
    passwordRecoveryValidation,
    mainMenuViewValidation,
    mainMenuNavigationValidation,
    notificationsWindowCheck,
    userMenuCheck,
    languageSwitcherCheck
 } from "../../cypress/actions/generalActions.js"

describe('partners Platform', {"retries": 1}, () => {

    beforeEach('open application', () => {
        cy.openHomePage()
        cy.waitUntil(function () {
            return cy.get('#supersonic-ui-loader-new', { timeout: 50000 }).should($loader => {
              expect($loader).to.have.length(0);
            })
        })
        cy.wait(5000)
    })

    it('password recovery', () => {
        passwordRecoveryValidation()
    })

    it('correct login', () => {
        loginToPlatform()
    })
    
    it('main menu validation', () => {
        loginToPlatform()
        mainMenuViewValidation()
        mainMenuNavigationValidation()
    })

    it('account menu validation', () => {
        loginToPlatform()
        notificationsWindowCheck()
        userMenuCheck()
        languageSwitcherCheck()
    })
})