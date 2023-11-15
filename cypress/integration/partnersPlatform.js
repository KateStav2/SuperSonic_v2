/// <reference types="cypress" />

import {
    submitLoginFormWithEmailAndPassword,
    requestForgotPasswordByEmail,
    openMainMenu,
    openGameOptimizationMenu,
    openPublishedGamesMenu,
    MainMenuNavigator,
    showAndHideGameOptimizationMenuSublist,
    showAndHidePublishedGamesMenuSublist,
    notificationsOpenHaveTwoTabsClose,
    userDropdownCheckNameEmailAndLogout,
    goThroughLanguageSwitcherAndCheckTitlesOnEachPage
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

    it('login with empty email, invalid email and request for change password', () => {
        requestForgotPasswordByEmail()
    })

    it('login with correct email', () => {
        submitLoginFormWithEmailAndPassword()
    })

    it('open main menu, game optimization menu and published games menu', () => {
        
        submitLoginFormWithEmailAndPassword()
        openMainMenu()
        openGameOptimizationMenu()
        openPublishedGamesMenu()
    })
    
    it('go through main menu and verify all pages', () => {
        submitLoginFormWithEmailAndPassword()
        const mainMenuNavigateTo = new MainMenuNavigator()
        mainMenuNavigateTo.visitAllGamesPage()
        mainMenuNavigateTo.visitNewGamePage()
        mainMenuNavigateTo.visitPrototypesReportsPage()
        mainMenuNavigateTo.visitABTestsPage()
        mainMenuNavigateTo.visitLevelAnalyticsPage()
        mainMenuNavigateTo.visitCrashCenterPage()
        mainMenuNavigateTo.visitAnalyticsPage()
        mainMenuNavigateTo.visitTopCreativesPage()
        mainMenuNavigateTo.visitKnowledgeHubPage()
        mainMenuNavigateTo.visitHelpCenterPage()
    })

    it('sublists open/close by click on arrow', () => {
        submitLoginFormWithEmailAndPassword()
        showAndHideGameOptimizationMenuSublist()
        showAndHidePublishedGamesMenuSublist()
    })

    it('account menu', () => {
        submitLoginFormWithEmailAndPassword()
        notificationsOpenHaveTwoTabsClose()
        userDropdownCheckNameEmailAndLogout()
        goThroughLanguageSwitcherAndCheckTitlesOnEachPage()
    })

})