
export const compareTypedTextToFilteredRows = function(typedText, textToCompare) {
    cy.get('.super-search-input')
        .should('be.visible')
        .click()
        .find('[placeholder="Search by game name"]')
        .clear()
        .type(typedText)
    
    cy.get('.gamesTable').should('be.visible')
    cy.wait(2000)
    
    cy.get('tbody .ant-table-row').each(($row) => {
      cy.wrap($row).find('[aria-label="game-name-cell"]').invoke('text').then((text) => {
        const textInRow = text.toLowerCase()
        //const textInSearch = typedText.toLowerCase()
        //expect(textInRow).to.include(textInSearch)
        expect(textInRow).to.include(textToCompare)

      })
    })
}

export const getLastThreeSymbolsFromRandomTitleAndCompareToFilteredRows = function () {

    cy.get('[aria-label="close-circle"]').click()
    const randomNum = Math.floor(Math.random() * 25) 

    cy.get('tbody .ant-table-row')
      .eq(randomNum)
      .find('.title-cell')
      .invoke('text')
      .as('randomTitleText')
      .then(() => {
        cy.get('@randomTitleText').then((text) => {
          const threeSymb = text.slice(-3)

            cy.get('.super-search-input')
                .should('be.visible')
                .click()
                .find('[placeholder="Search by game name"]')
                .clear()
                .type(threeSymb)
        
            cy.wait(2000)
            
            const textInSearch = threeSymb.toLowerCase() 
            cy.get('tbody .ant-table-row').each(($row) => {
                cy.wrap($row).find('.title-cell').invoke('text').then((text) => {
                    const textInRow = text.toLowerCase()
                    expect(textInRow).to.include(textInSearch)
                })
            })
        })
      })
    }
  
// export class allGamesPage{
    
//     applySearchByTypedTextAndTextToCompare(typedText, textToCompare){
//         compareTypedTextToFilteredRows(typedText, textToCompare)
//     }

//     applySearchByRandomThreeLastSymbols(){
//         getLastThreeSymbolsFromRandomTitleAndCompareToFilteredRows()
//     }
// } 

// export const onAllGamesPage = new allGamesPage
