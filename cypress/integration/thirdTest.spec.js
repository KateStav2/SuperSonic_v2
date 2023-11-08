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

    it('type and erase text in search input area', () => {
        // open area and type some text
        cy.get('.super-search-input')
        .click()
        .find('[placeholder="Search by game name"]')
        .type('Mon')

        .invoke('attr', 'value')
        .then((classValue) => {
            expect(classValue).to.include('Mon')
        })    
        //cy.get('input').should('have.value', 'Mon') // also works but less specific
        
        // erase the text
        cy.get('[aria-label="close-circle"]').click()
        cy.get('input').should('have.value', '')
    })

    it('search input area opens/closes', () => {
        // area opens
        cy.get('.super-search-input')
            .click()
            .invoke('attr', 'class')
            .then((classValue) => {
                expect(classValue).to.include('ant-input-affix-wrapper-focused')
            })
        //click on text on the right
        cy.get('[data-testid="super-table-title"]').click()
        //area closes
        cy.get('.super-search-input')
            .invoke('attr', 'class')
            .then((classValue) => {
                expect(classValue).not.to.include('ant-input-affix-wrapper-focused');
            })
    })

    it('tabs titles of All Games table are correct', () => {
        let allGamesTabs = {
            '0': 'New Games',
            '1': 'Initial Tests',
            '2': 'Iterations',
            '3': 'Adv. Testing',
            '4': 'Soft Launch',
            '5': 'Published',
            '6': 'Concluded'
        }
        //each tab name compare to given value
        Object.keys(allGamesTabs).forEach((index) => {
            cy.get('.ant-tabs-nav-list')
            .find('[data-node-key]')
            .eq(index)
            .should('contain',allGamesTabs[index])
        }) 
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

    it('search works correct', () => {   
        compareTypedTextToFilteredRows('dd','dd')
        compareTypedTextToFilteredRows('f8','f8')
        compareTypedTextToFilteredRows('tif','ti')
        //compareTypedTextToFilteredRows('ti','ti') //test fails
        getLastThreeSymbolsFromRandomTitleAndCompareToFilteredRows()
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

    it('All games: New Games: table should have 6 columns with correct name', () => {
        //cy.get('.gamesTable thead th').eq(1).should('contain','Game Title')
        let innerTableTabs = {
            '0': '',
            '1': 'Game Title',
            '2': 'Promotion',
            '3': 'Game Status',
            '4': 'Concept Video',
            '5': 'Creation Date'
        }
        //each tab name compare to given value
        Object.keys(innerTableTabs).forEach((index) => {
            cy.get('.gamesTable thead th')
            .eq(index)
            .should('contain',innerTableTabs[index])
        }) 
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
        // //get number of rows
        // cy.get('tbody .ant-table-row')
        //     .should('be.visible')
        //     .then(($rows) => {
        //         const numberOfRows = $rows.length
        //         cy.log(numberOfRows) // always 25 or less
        //     })
        // //get number from tab
        // cy.get('[aria-label="games-stage-count-newGames"]')
        //     .invoke('text').then((text) => {
        //         const numberOnTab = text
        //         cy.log(numberOnTab)
        //     })
        // //get number from search bar
        // cy.get('[data-testid="super-table-title"]')
        // .invoke('text').then((text) => {
        //     const words = text.split(' ')
        //     const numberInSearch = parseInt(words[4], 10)
        //     cy.log(numberInSearch)
        // })
    })
})