import {
  textToTypeInSearch,
  allGamesTableTabs,
  newGamesTableTabs
} from "../const/generalConsts.js"

import getTitle from "../elements/generalElements.js"

const openSearchInputArea = () => {
  cy.get('.super-search-input').click()
    .should('have.class', 'ant-input-affix-wrapper-focused')
}  

const typeTextToSearchInputArea = (textToType) => {
  cy.get('[aria-label="toolbar-search-input"]').type(textToType)
  cy.get('input').should('have.value', textToType)
}

const clearSearchInputArea = () => {
  cy.get('[aria-label="close-circle"]').click()
  cy.get('input').should('have.value', '')
}

const closeOpenedSearchInputArea = () => {
  cy.get('[aria-label="toolbar-title"]').click()
  cy.get('.super-search-input')
    .should('not.have.class', 'ant-input-affix-wrapper-focused')
}

const openTypeEraseCloseSearchInputArea = () => {
  openSearchInputArea()
  typeTextToSearchInputArea(textToTypeInSearch)
  clearSearchInputArea()
  closeOpenedSearchInputArea()
  }

const compareEachGameTitleInTableToContainText = (textToCompare) => {
  cy.get('.gamesTable').should('be.visible')
  cy.wait(2000)
  cy.get('tbody .ant-table-row').each(($row) => {
  cy.wrap($row)
    .find('[aria-label="game-name-cell"]')
    .invoke('text')
    .then((text) => {
      const textInRow = text.toLowerCase()
      expect(textInRow).to.include(textToCompare)
    })
  })
}

const compareTypedTextToFilteredRows = function (typedText, textToCompare) {
  openSearchInputArea()
  typeTextToSearchInputArea(typedText)
  compareEachGameTitleInTableToContainText(textToCompare)
}

const getLastThreeSymbolsFromRandomTitleAndCompareToFilteredRows = function () {

  openSearchInputArea()
  const randomNum = Math.floor(Math.random() * 25) 

  cy.get('tbody .ant-table-row')
    .eq(randomNum)
    .find('.title-cell')
    .invoke('text')
    .as('randomTitleText')
    .then(() => {
      cy.get('@randomTitleText').then((text) => {
        const threeSymb = text.slice(-3)
        typeTextToSearchInputArea(threeSymb)
        compareEachGameTitleInTableToContainText(threeSymb.toLowerCase())
      })
    })
}

const checkTabsTitlesOfAllGamesTable = () => {
  Object.keys(allGamesTableTabs).forEach((index) => {
    cy.get('.ant-tabs-nav-list')
      .find('[data-node-key]')
      .eq(index)
      .should('contain',allGamesTableTabs[index])
  }) 
}

const checkTabsTitlesOfNewGamesTable = () => {
  Object.keys(newGamesTableTabs).forEach((index) => {
    cy.get('.gamesTable thead th')
    .eq(index)
    .should('contain',newGamesTableTabs[index])
  }) 
}

  export { 
    openTypeEraseCloseSearchInputArea,
    compareTypedTextToFilteredRows,
    getLastThreeSymbolsFromRandomTitleAndCompareToFilteredRows,
    clearSearchInputArea,
    checkTabsTitlesOfAllGamesTable,
    checkTabsTitlesOfNewGamesTable
  }