/// <reference types="cypress" />

import { onLoginPage } from "../support/page_objects/loginPage"

describe('All Games UI, game actions menu', {"retries": 1}, () => {
    
    let gameTitle
    //let gameTitleInForm
    let actualGameStatus

    beforeEach('open application', () => {
        cy.openHomePage()
        onLoginPage.submitLoginFormWithEmailAndPassword('lia+14@supersonic.com','Qa042021')
        //onLoginPage.submitLoginFormWithEmailAndPassword('k.stavytska@gmail.com','Kate0707')
        cy.get('tbody .ant-table-row').should('be.visible')
    })

    it.only('game actions menu: games details', () => {

        cy
        .get('tbody .ant-table-row')
        .first()
        .within(() => {
            cy
            .get('[aria-label="game-name-cell"]')
            .invoke('text')
            .then((text) => { 
                gameTitle = text 
            })
            cy
            .get('[aria-label="game-actions-menu"]')
            .click()
        })
        .then(() => {
            cy
            .get('[aria-label="edit"]')
            .click()
            cy
            .get('h4[class="ant-typography"]')
            .invoke('text')
            .then((text) => {
                expect(gameTitle).to.equal(text)
                cy
                .get('.ss-popup-container')
                .find('button')
                .should('contain','Close')
                .click()   
            })
        })
    })

    it.only('game actions menu: manage creatives', () => {

        cy
        .get('tbody .ant-table-row')
        .first()
        .within(() => {
            cy
            .get('[aria-label="game-status-cell"]')
            .invoke('text')
            .then((text) => {
                actualGameStatus = text
            })
            cy
            .get('[aria-label="game-actions-menu"]')
            .click()
        })
        .then(() => {
        if (actualGameStatus === 'Pending Approval'){
            cy
            .get('[aria-label="folder"]')
            .parent()
            .invoke('attr', 'class')
            .should('include','ant-dropdown-menu-item-disabled')
            } else {
                cy
                .get('[aria-label="folder"]')
                .click()
                cy.
                get('h3.wizard__drawer-title')
                .invoke('text')
                .should('contain','Creatives Library')
                cy
                .get('.ant-drawer-footer')
                .find('button')
                .contains('Cancel')
                .click()  
            }
        }) 
    })







    it('PRACTICE, actions menu: game details', () => {

        cy.get('tbody .ant-table-row').first().within(() => {
            // get the game title
            cy.get('[aria-label="game-name-cell"]')
            .invoke('text')
            .then((text) => {
                gameTitle = text
                cy.log(gameTitle)
            })
            // click on actions menu
            cy.get('[aria-label="game-actions-menu"]').click()
        })
        .then(() => {
            cy.log("second",gameTitle)
            // click on Game details
            cy.get('[aria-label="edit"]').click()

            //get game's title in form
            cy.get('h4[class="ant-typography"]').invoke('text').then((text) => {
            //cy.get('.ant-space-item h4]').invoke('text').then((text) => {
                gameTitleInForm = text
                cy.log(gameTitleInForm)
            }).then(() => {
                cy.log("third",gameTitleInForm)

            expect(gameTitle).to.equal(gameTitleInForm)
            
            // click on Cancel button
            cy.get('.ss-popup-container').find('button')
                .should('contain','Close').click()    
            })
        })     
    })

    it('PRACTICE, actions menu: manage creatives', () => {

        cy.get('tbody .ant-table-row').first().within(() => {
            // get game status
            cy.get('[aria-label="game-status-cell"]')
            .invoke('text')
            .then((text) => {
                actualGameStatus = text
                cy.log(actualGameStatus)
            })
            // click on actions menu
            cy.get('[aria-label="game-actions-menu"]').click()
        })

        .then(() => {

        cy.log(actualGameStatus)

        if (actualGameStatus === 'Pending Approval'){
            cy.get('[aria-label="folder"]')
                .parent()
                .invoke('attr', 'class')
                .should('include','ant-dropdown-menu-item-disabled')
                .then((attrValue) => {
                    cy.log(attrValue)
                }) 
        } else {
            // click on Manage creatives
            cy.get('[aria-label="folder"]').click()

            cy.get('h3.wizard__drawer-title').invoke('text')
                .should('contain','Creatives Library')
        
            // click on Cancel button
            cy.get('.ant-drawer-footer').find('button')
            .contains('Cancel').click()  
        }
    }) 
    })
})