import {
  textToTypeInSearch,
  allGamesTableTabs,
  newGamesTableTabs
} from "../const/generalConsts.js"

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

const searchFunctionalityValidation = () => {
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

const checkGamesTableThatEachTabOpensByClick = () => {
  cy.get('.gamesTable').should('be.visible')
  // click on each tab
  for (let i = 1; i < 7; i++) {
    cy.get('.ant-tabs-nav-list')
      .find('div[data-node-key]')
      .eq(i)
      .click()
      // check attribute of each tab
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
}

const getSecondNumberFromString = (string) => {
  const words = string.split(' ')
  const secondNumberFromToolbar = parseInt(words[4], 10)
  cy.log(secondNumberFromToolbar)
  return secondNumberFromToolbar
}

const verifyNumberOfRowsEqualsToNumberInToolbarAndTab = () => {
  cy.get('[aria-label="toolbar-title"]')
  .invoke('text')
  .then((text) => {
      const secondNumberFromToolbar = getSecondNumberFromString(text)
      cy.get('[aria-label="games-stage-count-newGames"]')
          .invoke('text').then((text) => {
              cy.wait(2000)
              const numberFromTab = parseInt(text, 10)
              cy.log(numberFromTab)
              cy.get('tbody .ant-table-row')
              .should('be.visible')
              .then(($rows) => {
                  const numberOfRowsInTable = $rows.length
                  cy.log(numberOfRowsInTable) // 25 or less
                  cy.wrap(numberFromTab).should('eq', secondNumberFromToolbar)
                  cy.wrap(numberFromTab).should('eq', numberOfRowsInTable)
                  // do the same
                  // cy.expect(numberFromTab).to.equal(secondNumberFromToolbar)
                  // cy.expect(numberFromTab).to.equal(numberOfRowsInTable)
              })
          })
  })
}

const openActionsMenu = () => {
  cy.get('[aria-label="more"]')
}

const gameDetailsWindow = () => {
  let gameTitle = ''
  cy.get('tbody .ant-table-row')
        .first()
        .within(() => {
            cy.get('[aria-label="game-name-cell"]')
            .invoke('text')
            .then((text) => { 
                gameTitle = text 
            })
            cy.get('[aria-label="game-actions-menu"]')
            .click()
        })
        .then(() => {
            cy.get('[aria-label="edit"]').click() //ask to add aria-lable for Game Detail
            cy.get('h4[class="ant-typography"]') //ask to add aria-lable
            .invoke('text')
            .then((text) => {
                expect(gameTitle).to.equal(text)
                cy.get('.ss-popup-container') //ask to add aria-lable
                .find('button')
                .should('contain','Close')
                .click()   
            })
        })
}

const manageCreativesWindow = () => {
  let actualGameStatus = ''
  cy.get('tbody .ant-table-row')
    .first()
    //.eq(1)
    .within(() => {
      cy.get('[aria-label="game-status-cell"]')
        .invoke('text')
        .then((text) => {
          actualGameStatus = text
        })
      cy.get('[aria-label="game-actions-menu"]')
        .click()
      })
    .then(() => {
      if (actualGameStatus === 'Pending Approval'){
      cy.get('[aria-label="folder"]')
        .parent()
        .invoke('attr', 'class')
        .should('include','ant-dropdown-menu-item-disabled')
      } else {
      cy.get('[aria-label="folder"]') //ask to add aria-lable for Manage creatives
        .click()
      cy.get('h3.wizard__drawer-title') //ask to add aria-lable
        .invoke('text')
        .should('contain','Creatives Library')
      cy.get('.ant-drawer-footer')
        .find('button')
        .contains('Cancel') //ask to add aria-lable
        .click()  
      }
    }) 
}

const actionsMenuValidation = () => {
  gameDetailsWindow()
  manageCreativesWindow()
}

  export { 
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
  }