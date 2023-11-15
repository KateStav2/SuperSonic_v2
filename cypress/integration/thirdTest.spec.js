/// <reference types="cypress" />

import { onAllGamesPage } from "../support/page_objects/allGamesPage"
import { onLoginPage } from "../support/page_objects/loginPage"

import {compareTypedTextToFilteredRows,
        getLastThreeSymbolsFromRandomTitleAndCompareToFilteredRows}
from "../support/page_objects/allGamesPage"

describe('Search and All Games UI', {"retries": 1}, () => {

    beforeEach('open application', () => {
        cy.openHomePage()
        onLoginPage.submitLoginFormWithEmailAndPassword('lia+14@supersonic.com','Qa042021')
        //onLoginPage.submitLoginFormWithEmailAndPassword('k.stavytska@gmail.com','Kate0707')
    })

   

  
   

    it('only for practice', () => {
        // cy.get('tbody .ant-table-row')
        // .should('be.visible')
        // .should('have.length', 25)

        // cy.get('tbody .ant-table-row').should(($listOfElements) => {
        //    expect($listOfElements).to.have.length(25)
        //    // any other assertions, for example the below one
        //    // expect($listOfElements).to.have.any.keys('key1', 'key2')
        // })        
    })

    it('check by attr if tab is chosen', () => {
        cy.waitUntil(function () {
            return cy.get('#supersonic-ui-loader-new', { timeout: 50000 }).should($loader => {
              expect($loader).to.have.length(0);
            })
        })
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

   

    it('quantity', () => {   
        cy.get('.super-search-input')
            .click()
            .find('[placeholder="Search by game name"]')
            .type('mm')
        cy.get('.gamesTable').should('be.visible')
        cy.wait(5000)

        //get number from search bar
        cy.get('[data-testid="super-table-title"]')
        .invoke('text').then((text) => {
            const words = text.split(' ')
            const numberInSearch = parseInt(words[4], 10)
            cy.log(numberInSearch)
            //get number from tab
            cy.get('[aria-label="games-stage-count-newGames"]')
            .invoke('text').then((text) => {
                const numberOnTab = parseInt(text, 10)
                cy.log(numberOnTab)
                //get number of rows
                cy.get('tbody .ant-table-row')
                .should('be.visible')
                .then(($rows) => {
                    const numberOfRows = $rows.length
                    cy.log(numberOfRows) // always 25 or less

                    cy.expect(numberOnTab).to.equal(numberInSearch)
                    cy.expect(numberOnTab).to.equal(numberOfRows)
                 })
            })
        })
    })
})