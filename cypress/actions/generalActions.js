
// const validateNotification = () => {
//   absoluteRoot().find('.ant-notification-notice:visible').should('exist');
// };

import {
  loginEmail, 
  loginPassword,
  invalidPassword,
  userName,
  languages
} from "../../cypress/const/generalConsts.js"

import getTitle from "../../cypress/elements/generalElements.js"

const submitLoginFormWithEmailAndPassword = () => {
  cy.get('.title-login').should('contain','Welcome Back')
  cy.get('#login_email').clear().type(loginEmail)
  cy.get('#login_password').clear().type(loginPassword)
  cy.get('form').submit()
}

const requestForgotPasswordByEmail = () => {
  function submitEmailToRestorePassword () {
    cy.get('form h2').should('contain','Reset Password')
    cy.get('form [class="text"]').should('contain','Enter your email')
    cy.get('#email').clear().type(loginEmail)
    cy.get('form').submit()
  }
  cy.contains('Forgot Password?').click()
  cy.get('form').submit()
  cy.get('#email_help').should('contain','Mandatory field')
  submitEmailToRestorePassword(invalidPassword)
  cy.get('#email_help').should('contain','Please enter a valid email address')
  submitEmailToRestorePassword(loginEmail)
  cy.get('h2').should('contain','Help is on the Way!')  
}

const openMainMenu = () => {
  cy
  .get('.logo button').invoke('attr', 'class')
  .then( attr => {
    if( attr.includes('collapsed')){
      cy.get('.logo button').click()
    }
  })
}

const openGameOptimizationMenu = () => {
  cy.get('[aria-label="gameOptimization"]')
  .find('div')
  .invoke('attr','aria-expanded')
  .then( attr => {
    if( attr.includes('false')){
      cy.get('[aria-label="gameOptimization"]').click()
    }
  })
}

const openPublishedGamesMenu = () => {
  cy.get('[aria-label="publishedGames"]')
  .find('div')
  .invoke('attr','aria-expanded')
  .then( attr => {
    if( attr.includes('false')){
      cy.get('[aria-label="publishedGames"]').click()
    }
  })
}

class MainMenuNavigator {

  visitAllGamesPage(){
    openMainMenu()
    cy.get('[aria-label="/prototypes/games"]')
      .click()      
    getTitle()
      .should('contain', 'All Games')
    cy.url()
      .should('include', '/prototypes/games')
  }

  visitNewGamePage(){
    openMainMenu()
    cy.get('[aria-label="sidebar-new-game-button"]').click()
    getTitle().should('contain', 'New Game')
    cy.url().should('include', '/prototypes/games/new')
  }

  visitPrototypesReportsPage(){
    openMainMenu()
    cy.get('[aria-label="/prototypes/reports"]').click() 
    getTitle().should('contain', 'Reports')
    cy.url().should('include', '/prototypes/reports')
  }

  visitABTestsPage(){
    openMainMenu()
    openGameOptimizationMenu()
    cy.get('[aria-label="/live-games/ab-tests-new"]').click()
    getTitle().should('contain', 'A/B Tests')
    cy.url().should('include', '/ab-tests')
    }

  visitLevelAnalyticsPage(){
      openMainMenu()
      openGameOptimizationMenu()
      cy.get('[aria-label="/live-games/level-analytics"]').click()
      getTitle().should('contain', 'Level Analytics')
      cy.url().should('include', '/level-analytics')
  }
  
  visitCrashCenterPage(){
      openMainMenu()
      openGameOptimizationMenu()
      cy.get('[aria-label="/live-games/crash-center"]').click()
      getTitle().should('contain', 'Crash Center')
      cy.url().should('include', '/crash-center')
  }

  visitAnalyticsPage(){
      openMainMenu()
      openPublishedGamesMenu()
      cy.get('[aria-label="/live-games/cohorts"]').click()
      getTitle().should('contain', 'Analytics')
      cy.url().should('include', '/cohorts')
  }

  visitTopCreativesPage(){
      openMainMenu()
      openPublishedGamesMenu()
      cy.get('[aria-label="/live-games/top-creatives"]').click()
      getTitle().should('contain', 'Top Creatives')
      cy.url().should('include', '/top-creatives')
  }

  visitKnowledgeHubPage(){
      openMainMenu()
      cy.get('[aria-label="/prototypes/knowledge-hub"]').click()
      getTitle().should('contain', 'Knowledge Hub')
      cy.url().should('include', '/knowledge-hub')
  }

  visitHelpCenterPage(){
      openMainMenu()
      cy.get('[aria-label="/help-center"]').click()
  }

}

const showAndHideGameOptimizationMenuSublist = () => {
  cy.get('[aria-label="gameOptimization"] div')
    .click()
    .invoke('attr','aria-expanded')
    .should('be.equal','true')
  cy.get('[aria-label="gameOptimization"] div')
    .click()
    .invoke('attr','aria-expanded')
    .should('be.equal','false')
}

const showAndHidePublishedGamesMenuSublist = () => {
  cy.get('[aria-label="publishedGames"] div')
    .click()
    .invoke('attr','aria-expanded')
    .should('be.equal','true')
  cy.get('[aria-label="publishedGames"] div')
    .click()
    .invoke('attr','aria-expanded')
    .should('be.equal','false')
}

const notificationsOpenHaveTwoTabsClose = () => {
  cy.get('[aria-label="notification-center"]')
    .children()
    .click()
    .invoke('attr','class')
    .should('include','ant-popover-open')

  cy.get('[aria-label="notification-center-title"]').should('contain','Notifications')
  cy.get('.ant-tabs-nav-list').should('have.length', 2)

  cy.get('[aria-label="notification-center"]')
    .children()
    .click()
    .invoke('attr','class')
    .should('not.include','ant-popover-open')
}

const userDropdownCheckNameEmailAndLogout = () => {
  cy.get('[aria-label="user-dropdown"]')
    .click()
    .invoke('attr','class')
    .should('include','ant-dropdown-open')
  cy.get('[aria-label="user-dropdown-item-name"]')
    .should('contain', userName)
  cy.get('[aria-label="user-dropdown-item-email"]')
    .should('contain', loginEmail)
  cy.get('[aria-label="user-dropdown-item-logout"]')
    .click()
  cy.url()
    .should('include', '/login')  
  submitLoginFormWithEmailAndPassword()
  cy.get('[aria-label="user-dropdown"]')
    .invoke('attr','class')
    .should('not.include','ant-dropdown-open')
}

const goThroughLanguageSwitcherAndCheckTitlesOnEachPage = () => {
  cy.get('[aria-label="language-switcher"]').click()
  Object.keys(languages).forEach((language) => {
    const title = languages[language]
    cy.get('[aria-label="language-switcher"]').click()
    cy.get('[aria-label="language-switcher-menu"]').contains(language).click()
    getTitle().should('contain',(title))
    cy.log(language, title, "!!!FOUND!!!")
  })
  cy.get('[aria-label="language-switcher"]').click()
  cy.get('[aria-label="language-switcher-menu"]').contains('English').click()
}



export { 
  submitLoginFormWithEmailAndPassword,
  requestForgotPasswordByEmail,
  openMainMenu,
  openGameOptimizationMenu,
  openPublishedGamesMenu,
  MainMenuNavigator,
  showAndHideGameOptimizationMenuSublist,
  showAndHidePublishedGamesMenuSublist,
  notificationsOpenHaveTwoTabsClose,
  userDropdownCheckNameEmailAndLogout,
  goThroughLanguageSwitcherAndCheckTitlesOnEachPage
}