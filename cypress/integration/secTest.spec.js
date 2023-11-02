/// <reference types="cypress" />

import { onLoginPage } from "../support/page_objects/loginPage"

describe('Account menu & Language menu', () => {

    beforeEach('open application', () => {
        cy.openHomePage()
        onLoginPage.submitLoginFormWithEmailAndPassword('k.stavytska@gmail.com','Kate0707')
    })

    it('New Game button', () => {
        cy.get('button[aria-label="new-game-header-button"]').click()
        cy.get('.title-partners').should('contain', 'New Game')
        cy.url().should('include', '/games/new')
    })

    it('bell icon functionality', () => {
        cy.get('span[aria-label="bell"]').click()
        .parent().parent().invoke('attr','class').should('include','ant-popover-open')

        cy.get('.title-block').should('contain','Notifications')
        cy.get('.ant-tabs-nav-list').should('have.length', 2)
        //cy.get('#rc-tabs-0-tab-1').should('contain','All')
        //cy.get('#rc-tabs-0-tab-2').should('contain','Unread')

        cy.get('span[aria-label="bell"]').click()
        .parent().parent().invoke('attr','class').should('not.include','ant-popover-open')
    })

    it('personal menu functionality', () => {
        cy.get('.user-dropdown').click()
        cy.get('.user-dropdown-item__username').should('contain','Katerina')
        cy.get('.user-dropdown-item__email').should('contain','k.stavytska@gmail.com')
       
        cy.get('.user-dropdown-item__logout').click()
        cy.url().should('include', '/login')   
        onLoginPage.submitLoginFormWithEmailAndPassword('k.stavytska@gmail.com','Kate0707')

        cy.get('.user-dropdown').click()
        cy.get('.user-dropdown-item__username').parent().parent()
        .invoke('attr','class').should('not.include','ant-dropdown-hidden')
        
        cy.get('.user-dropdown').click()
        cy.get('.user-dropdown-item__username').parents('.ant-dropdown')
        .invoke('attr','class').should('include','ant-dropdown-hidden')       
    })   

    it.only('language switcher dropdown', () => {
        cy.get('.language-switcher').click()

        let langs = {
            'English': 'All Games',
            'Chinese': '所有游戏',
            'Japanese': 'すべてのゲーム',
            'Turkish': 'Tüm Oyunlar',
            'Russian': 'Все игры'
        }

        Object.keys(langs).forEach((index) => {
            const val = langs[index]
            cy.get('.language-switcher').click()
            cy.get('.language-switcher-list').contains(index).click()
            cy.get('.title-partners').should('contain',(val))
            cy.log(index, val, "!!!FOUND!!!")
        })
        cy.get('.language-switcher').click()
        cy.get('.language-switcher-list').contains('English').click()
        })
    
}) 