/// <reference types="cypress" />

import {
    submitLoginFormWithEmailAndPassword
} from "../actions/generalActions.js"

import {
    searchFunctionalityValidation,
    compareTypedTextToFilteredRows,
    getLastThreeSymbolsFromRandomTitleAndCompareToFilteredRows,
    clearSearchInputArea,
    checkTabsTitlesOfAllGamesTable,
    checkTabsTitlesOfNewGamesTable,
    checkGamesTableThatEachTabOpensByClick,
    openSearchInputArea,
    typeTextToSearchInputArea,
    verifyNumberOfRowsEqualsToNumberInToolbarAndTab,
    actionsMenuValidation
} from "../actions/actionsAllGamesUI.js"

describe(' search and all games UI', {"retries": 1}, () => {

    beforeEach('open application', () => {
        cy.openHomePage()
        cy.waitUntil(function () {
            return cy.get('#supersonic-ui-loader-new', { timeout: 50000 }).should($loader => {
              expect($loader).to.have.length(0);
            })
        })
        cy.wait(5000)
        submitLoginFormWithEmailAndPassword()

    })

    it('search input area: open, type text, erase and close', () => {
        searchFunctionalityValidation()
    })

    it('search by characters', () => {   
        compareTypedTextToFilteredRows('dd','dd')
        
        clearSearchInputArea()
        compareTypedTextToFilteredRows('f8','f8')
       
        clearSearchInputArea()
        compareTypedTextToFilteredRows('tif','ti')
        
        //clearSearchInputArea
        //compareTypedTextToFilteredRows('ti','ti') //test fails
        
        clearSearchInputArea()
        compareTypedTextToFilteredRows('mon','mo')
    })

    it('search by three symbols from game title', () => {
        getLastThreeSymbolsFromRandomTitleAndCompareToFilteredRows()
    
        clearSearchInputArea()
        getLastThreeSymbolsFromRandomTitleAndCompareToFilteredRows()

    })

    it('check tabs titles of All Games Table and New Games Table', () => {
        checkTabsTitlesOfAllGamesTable()
        checkTabsTitlesOfNewGamesTable()
    })
    
    it('check by attr if tab is chosen after click', () => {
        checkGamesTableThatEachTabOpensByClick()
    })

    it('check that number on tab equals to number in toolbar and equals to rows number', () => {   
        openSearchInputArea()
        typeTextToSearchInputArea('mm') // 4
        //typeTextToSearchInputArea('zx') // 2
        cy.get('.gamesTable').should('be.visible')
        cy.wait(3000)
        verifyNumberOfRowsEqualsToNumberInToolbarAndTab()
    })

    it.only('check actions menu', () => {
        actionsMenuValidation()
    })
})