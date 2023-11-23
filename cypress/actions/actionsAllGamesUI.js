import {
  textToTypeInSearch,
  allGamesTableTabs,
  newGamesTableTabs,
  initialTestsTableTabs
} from "../const/generalConsts.js"

import getTitle from "../../cypress/elements/generalElements.js"

const openSearch = () => {
  cy.get('.super-search-input').click()
    .should('have.class', 'ant-input-affix-wrapper-focused')
}  

const typeToSearch = (text) => {
  cy.get('[aria-label="toolbar-search-input"]').type(text)
  cy.get('input').should('have.value', text)
}

const clearSearch = () => {
  cy.get('[aria-label="close-circle"]').click()
  cy.get('input').should('have.value', '')
}

const closeOpenedEmptySearch = () => {

  cy.get('[aria-label="toolbar-title"]').click()
  cy.get('.super-search-input')
    .should('not.have.class', 'ant-input-affix-wrapper-focused')
}

const searchAreaFunctionalityValidation = () => {
  openSearch()
  typeToSearch(textToTypeInSearch)
  clearSearch()
  closeOpenedEmptySearch()
  }

const correctFilterCheck = (textToCompare) => {
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

const manualSearchFilterValidation = function (textInSearch, textInGameName) {
  openSearch()
  typeToSearch(textInSearch)
  correctFilterCheck(textInGameName)
}

const randomNumFrom0To24 = () => {
  return (Math.floor(Math.random() * 25))
}

const searchFilterValidation = function () {

  openSearch()
  cy.get('tbody .ant-table-row')
    .eq(randomNumFrom0To24())
    .find('.title-cell')
    .invoke('text')
    .as('randomTitleText')
    .then(() => {
      cy.get('@randomTitleText').then((text) => {
        const threeSymb = text.slice(-3)
        typeToSearch(threeSymb)
        correctFilterCheck(threeSymb.toLowerCase())
      })
    })
}

const checkAllGamesTabs = () => {
  Object.keys(allGamesTableTabs).forEach((index) => {
    cy.get('.ant-tabs-nav-list')
      .find('[data-node-key]')
      .eq(index)
      .should('contain',allGamesTableTabs[index])
  }) 
}

const checkNewGamesTabs = () => {
  Object.keys(newGamesTableTabs).forEach((index) => {
    cy.get('.gamesTable thead th')
    .eq(index)
    .should('contain',newGamesTableTabs[index])
  }) 
}

const checkGamesTableNavigation = () => {
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

const tablesStructureCheck = () => {
  checkAllGamesTabs()
  checkNewGamesTabs()
  checkGamesTableNavigation()
}

const getSecondNumberFromString = (string) => {
  const words = string.split(' ')
  const secondNumberFromToolbar = parseInt(words[4], 10)
  cy.log(secondNumberFromToolbar)
  return secondNumberFromToolbar
}

const numberMatchingCheck = () => {
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

const manualNumbersMatchingCheck = (textForFilter) => {
  openSearch()
  typeToSearch(textForFilter)
  cy.get('.gamesTable').should('be.visible')
  cy.wait(3000)
  numberMatchingCheck()
}

const autoNumbersMatchingCheck = function () {
  openSearch()
  cy.get('tbody .ant-table-row')
    .eq(randomNumFrom0To24())
    .find('.title-cell')
    .invoke('text')
    .as('randomTitleText')
    .then(() => {
      cy.get('@randomTitleText').then((text) => {
        const threeSymb = text.slice(-3)
        typeToSearch(threeSymb)
        cy.wait(3000)
        numberMatchingCheck()
      })
    })
}

// const openActionsMenu = () => {
//   cy.get('[aria-label="game-actions-menu"]').first().click()
// }

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
            .get('[aria-label="game-actions-menu"]').click()
        })
        .then(() => {
            cy.get('[aria-label="edit"]').click()
            .get('[aria-label="edit-game-drawer-game-name"]')
            .invoke('text')
            .then((text) => {
                expect(gameTitle).to.equal(text)
                cy.get('[aria-label="edit-game-drawer-close-button"]')
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
      .get('[aria-label="game-actions-menu"]').click()
      })
    .then(() => {
      if (actualGameStatus === 'Pending Approval'){
      cy.get('[aria-label="game-actions-manage-creatives"]')
        .invoke('attr', 'class')
        .should('include','ant-dropdown-menu-item-disabled')
      } else {
      openActionsMenu()
      cy.get('[aria-label="game-actions-manage-creatives"]')
        .click()
      cy.get('[aria-label="manage-creatives-title"]')
        .invoke('text')
        .should('contain','Creatives Library')
      cy.get('[aria-label="manage-creatives-cancel-button"]')
        .contains('Cancel')
        .click()  
      }
    }) 
}

const actionsMenuValidation = () => {
  gameDetailsWindow()
  manageCreativesWindow()
}

const dateSortingValidation = () => {
  cy.get('[aria-label="caret-down"]').invoke('attr', 'class')
    .then((classNames) => {
      if (classNames.includes('active')) {
        cy.log('from new to old')
        datesSortedDescending()
      } else {
        cy.log('from old to new')
        datesSortedAscending()
      }
    })
}

const datesSortedDescending = () => {
  const dates = []
  cy.get('tbody .ant-table-row')
    .find('[aria-label="creation-date-cell"]')
    .each(($dateCell) => {
      const dateStr = $dateCell.text()
      cy.log(dateStr)
      dates.push(new Date(dateStr))
      })
      .then(() => {
        const sortedDates = [...dates].sort((a, b) => b - a)
        const isSortedDescending = dates.every((date, i) => date === sortedDates[i])
        expect(isSortedDescending).to.be.true
      })
    }

const datesSortedAscending = () => {
  const dates = []
  cy.get('tbody .ant-table-row')
    .find('[aria-label="creation-date-cell"]')
    .each(($dateCell) => {
      const dateStr = $dateCell.text()
      cy.log(dateStr, 'from old to new')
      dates.push(new Date(dateStr))
      cy.log(dates)
      })
      .then(() => {
        const sortedDates = [...dates].sort((a, b) => a - b)
        const isSortedDescending = dates.every((date, i) => date === sortedDates[i])
        expect(isSortedDescending).to.be.true
      })
    }

const playConceptVideo = () => {  //when it exists for the first game
  //cy.get('.preview-wrapper').first().click()
  cy.get('[aria-label="all-games-concept-video-cell"]').first().click()
  .wait(2000)
  .get('.video-container')
  .find('.video-react-control-bar button.video-react-play-control')//.click().wait(2000) // to check first if
  .invoke('attr', 'class').then((classNames) => { 
          if (classNames.includes('video-react-paused')) {
              cy.log('video paused')
              .get('.video-container')
              .find('.video-react-control-bar button.video-react-play-control')
              .click()
            } else {
                if (classNames.includes('video-react-playing')) {
                    cy.log('video playing')
                  }
            }
      })
} 

const videoPreview = () => {
  openSearch()
  typeToSearch('Managed notLive Monday')
  playConceptVideo()

  cy.get('.video-container')
    // to pause video:
    
    .find('.video-react-control-bar button.video-react-play-control').click()
    .invoke('attr', 'class').should('include','video-react-paused')
    // to close window:

    //.get('[class="super-icon preview-top-bar-arrow-icon"]').first().click()
    .get('[aria-label="video-preview-back-button"]').click()
}

let gameName = ''
let gameStatus = ''

const gameStatusValidation = () => {
  cy.get('tbody .ant-table-row').first().within(() => {
    cy.get('[aria-label="game-name-cell"]').invoke('text')
      .then((text) => {
        gameName = text
        cy.log(gameName)
      })
     cy.get('[aria-label="game-status-cell"]').invoke('text')
      .then((text) => {
        gameStatus = text
        cy.log(gameStatus)
      })
    cy.get('[aria-label="game-status-cell"]').click()
  })
  cy.log(`Game Name: ${gameName}, Status: ${gameStatus}`) // why don't see from here?
  cy.url().should('include', '/prototypes/wizard')
  cy.get('[aria-label="wizard-header-game-title"]').invoke('text')
    .then((text) => {
      cy.log(text)
      expect(text).to.be.equal(gameName)
    })
  cy.get('[aria-label="wizard-header-back-arrow"]').click()
  getTitle().should('contain', 'All Games')
}
// const gameStatusValidation = () => {
//   cy.get('tbody .ant-table-row')
//   .each(($row) => {
//     let gameName = $row.find('[aria-label="game-name-cell"]').text()
//     let gameStatus = $row.find('[aria-label="game-status-cell"]').text()
//     cy.log(`Game Name: ${gameName}, Status: ${gameStatus}`)
//     $row.find('[aria-label="game-status-cell"]').click()
//       cy.url().should('include', '/prototypes/wizard')
//       cy.get('[aria-label="wizard-header-game-title"]').invoke('text')
//         .then((text) => {
//           expect(text).to.be.equal(gameName)
//         })
//     })
// }

let currentColumnsNumber = ''

const chooseAllColumnsFromAnyStateInsideMenu = () => {
  //determine current number
  cy.get('.super-picker-body-list-item-header').invoke('text')
  .then((text) => {
    let numberMatch = text.match(/\((\d+)\)/)
    currentColumnsNumber = parseInt(numberMatch[1], 10)
    cy.log(`currentColumnsNnmber: ${currentColumnsNumber}`)

    if (currentColumnsNumber === 0) {
      // choose all
      cy.get('.super-picker-body-list-item-header-check-btn').click()
      // apply
      cy.get('.super-picker-footer').find('button').eq(1).click()
    } else {
      if (currentColumnsNumber < 30) {
        // choose nothing
        cy.get('.super-picker-body-list-item-header-check-btn').click()
        .wait(2000)
        // choose all
        cy.get('.super-picker-body-list-item-header-check-btn').click()
        .wait(2000)
        // apply
        cy.get('.super-picker-footer').find('button').eq(1).click()
      } else {
        // just cancel
        cy.get('.super-picker-footer').find('button').eq(1).click()
      }
    }

  })
}

const checkInitialTestsAllTabs = () => {
  Object.keys(initialTestsTableTabs).forEach((index) => {
    cy.get('.gamesTable thead th')
    .eq(index)
    .should('contain',initialTestsTableTabs[index])
  }) 
}

const initTestsTableStructure = () => {

  // cy.get('div [data-node-key="initialTests"]')
  //   .should('contain','Initial Tests')
  //   .click()
  // cy.contains('Initial Tests').click()

    cy.get('.gamesTable').should('be.visible')
    // open init tests tab
    cy.get('.ant-tabs-nav-list')
      .find('div[data-node-key]')
      .eq(1)
      .click()
    // open columns menu
    cy.get('.gameColumnsFilter')
    .should('be.visible')
    .click()
    cy.get('.super-picker-header-title').should('contain','Columns')
    chooseAllColumnsFromAnyStateInsideMenu()
    checkInitialTestsAllTabs()

    const lenght = () => {
      cy.get('.super-picker-body-list-item-options')
    }

}

  export { 
    searchAreaFunctionalityValidation,
    manualSearchFilterValidation,
    searchFilterValidation,
    clearSearch,
    tablesStructureCheck,
    openSearch,
    typeToSearch,
    manualNumbersMatchingCheck,
    autoNumbersMatchingCheck,
    actionsMenuValidation,
    dateSortingValidation,
    videoPreview,
    gameStatusValidation,
    initTestsTableStructure

  }