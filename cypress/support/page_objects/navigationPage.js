
function openMainMenu(){
    cy.get('.logo')
        .find('button')
        .invoke('attr', 'class')
        .then( attr => {
            if( attr.includes('collapsed')){
                cy.get('.logo > .toggle').click()
            }
        })
}

function showGameOptimizationMenu(){
    cy.contains('Game Optimization')
        .parent()
        .invoke('attr','aria-expanded')
        .then( attr => {
            if( attr.includes('false')){
                cy.contains('Game Optimization').click()
            }
    })
}

function openPublishedGamesMenu(){
    cy.contains('Published Games')
    .parent()
    .invoke('attr','aria-expanded')
    .then( attr => {
        if( attr.includes('false')){
            cy.contains('Published Games').click()
        }
})
}

export class NavigationPage{

    allGamesPage(){
        openMainMenu()
        cy.get('li[role="menuitem"]').contains('All Games').click()
        //cy.get('.sidebar__menu-item').contains('All Games').click() // does the same
        
        //cy.url().should('include', '/prototypes/games')
        //cy.get('.title-partners').should('contain', 'New Game') //
    }

    prototypesReportsPage(){
        openMainMenu()
        cy.contains('Prototypes Reports').click()
        cy.get('.title-partners').should('contain', 'Reports')
        cy.url().should('include', '/reports')
    }

    aBTestsPage(){
        openMainMenu()
        showGameOptimizationMenu()
        cy.contains('A/B Tests').click()
        cy.get('.title-partners').should('contain', 'A/B Tests')
        cy.url().should('include', '/ab-tests')
    }

    levelAnalyticsPage(){
        openMainMenu()
        showGameOptimizationMenu()
        cy.contains('Level Analytics').click()
        cy.get('.title-partners').should('contain', 'Level Analytics')
        cy.url().should('include', '/level-analytics')
    }
    
    crashCenterPage(){
        openMainMenu()
        showGameOptimizationMenu()
        cy.contains('Crash Center').click()
        cy.get('.title-partners').should('contain', 'Crash Center')
        cy.url().should('include', '/crash-center')
    }

    analyticsPage(){
        openMainMenu()
        openPublishedGamesMenu()
        cy.contains('Published Games').parent().parent().contains('Analytics').click()
        cy.get('.title-partners').should('contain', 'Analytics')
        cy.url().should('include', '/cohorts')
    }

    topCreativesPage(){
        openMainMenu()
        openPublishedGamesMenu()
        cy.contains('Top Creatives').click()
        cy.get('.title-partners').should('contain', 'Top Creatives')
        cy.url().should('include', '/top-creatives')
    }

    paymentsPage(){
        openMainMenu()
        cy.contains('Payments').click()
        cy.get('.title-partners').should('contain', 'Payments')
        cy.url().should('include', '/payments')
    }

    knowledgeHubPage(){
        openMainMenu()
        cy.contains('Knowledge Hub').click()
        cy.get('.title-partners').should('contain', 'Knowledge Hub')
        cy.url().should('include', '/knowledge-hub')
    }

    helpCenterPage(){
        openMainMenu()
        //cy.contains('Help Center').openNewTab()
        
        // cy.contains('Help Center').parent().parent().parent()
        // .should('have.attr', 'rel', 'noopener').click();
        
        // cy.contains('Help Center').parent().parent().parent()
        // .should('have.attr', 'target', '_blank').click();

        cy.contains('Help Center').parent().parent().parent()
        .invoke('removeAttr','target').click({force: true})

        cy.wait(20000)
        cy.url().should('include', 'support')

        // cy.get('your-element-selector').then(($element) => {
        //     $element[0].removeAttribute('target');
        //     $element.click();
        //   });
          
    }

}

export const navigateTo = new NavigationPage()