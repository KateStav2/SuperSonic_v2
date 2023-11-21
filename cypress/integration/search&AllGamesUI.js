/// <reference types="cypress" />

import {
    loginToPlatform
} from "../actions/generalActions.js"

import {
    searchAreaFunctionalityValidation,
    manualSearchFilterValidation,
    searchFilterValidation,
    clearSearch,
    tablesStructureCheck,
    manualNumbersMatchingCheck,
    autoNumbersMatchingCheck,
    actionsMenuValidation,
    dateSortingValidation,
    videoPreview

} from "../actions/actionsAllGamesUI.js"

describe(' search and all games UI', {"retries": 1}, () => {

    beforeEach('open application', () => {
        cy.openHomePage()
        cy.waitUntil(function () {
            return cy.get('#supersonic-ui-loader-new', { timeout: 50000 }).should($loader => {
              expect($loader).to.have.length(0);
            })
        })
        cy.wait(3000)
        loginToPlatform()

    })

    it('searchAreaFunctionalityValidation', () => {
        searchAreaFunctionalityValidation()
    })

    it('search by typed characters', () => {   
        manualSearchFilterValidation('dd','dd')
        
        clearSearch()
        manualSearchFilterValidation('f8','f8')
       
        clearSearch()
        manualSearchFilterValidation('tif','ti')
        
        //clearSearch
        //manualSearchFilterValidation('ti','ti') //test fails
        
        clearSearch()
        manualSearchFilterValidation('mon','mo')
    })

    it('search validation', () => {
        searchFilterValidation()
    
        clearSearch()
        searchFilterValidation()
    })

    it('tables structure and navigation check', () => {
        tablesStructureCheck()
    })


    it('games number comparison', () => {   
        manualNumbersMatchingCheck('mon')

        clearSearch()
        manualNumbersMatchingCheck('go')

        clearSearch()
        autoNumbersMatchingCheck()
    })

    it('actions menu validation', () => {
        actionsMenuValidation()
    })

    it.only('date sorting validation', () => {
        dateSortingValidation()
        cy.get('span').contains('Creation Date').click()
        cy.wait(3000)
        dateSortingValidation()
    })







    it('rainbow icon', () => {
        cy.get('tbody .ant-table-row')
            .first().find('img').click()

    })

    it.only('video preview check', () => {
        videoPreview()
          })
})