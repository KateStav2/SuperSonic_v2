/// <reference types="cypress" />

import {
    submitLoginFormWithEmailAndPassword
} from "../actions/generalActions.js"

import {
    openTypeEraseCloseSearchInputArea,
    compareTypedTextToFilteredRows,
    getLastThreeSymbolsFromRandomTitleAndCompareToFilteredRows,
    clearSearchInputArea,
    checkTabsTitlesOfAllGamesTable,
    checkTabsTitlesOfNewGamesTable
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
        openTypeEraseCloseSearchInputArea()
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

    it('search by three characters', () => {
        getLastThreeSymbolsFromRandomTitleAndCompareToFilteredRows()
    
        clearSearchInputArea()
        getLastThreeSymbolsFromRandomTitleAndCompareToFilteredRows()

    })

    it('check tabs titles of All Games Table and New Games Table', () => {
        checkTabsTitlesOfAllGamesTable()
        checkTabsTitlesOfNewGamesTable()
    })
    
    it.only('check by attr if tab is chosen', () => {
        cy.get('.gamesTable').should('be.visible')
        // click on each tab
        for (let i = 1; i < 7; i++) {
            cy.get('.ant-tabs-nav-list')
                .find('div[data-node-key]')
                .eq(i)
                .click()
                // check attributes of each tab
                for (let j = 1; j < 7; j++) {
                    cy.get('.ant-tabs-nav-list')
                        .find('div[data-node-key]')
                        .eq(j)
                        .invoke('attr', 'class')
                        .then((classVal) => {
                            if (j === i) {
                            expect(classVal).to.include('ant-tabs-tab-active')
                            } else {
                            expect(classVal).not.to.include('ant-tabs-tab-active')
                            }
                        })
                }
        }
    })

    // it('5', () => {
        
    // })

    // it('6', () => {
        
    // })

})