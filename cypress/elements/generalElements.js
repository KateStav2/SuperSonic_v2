
const getTitle = function () {
  return cy.get('[aria-label="header-title"]')
}

export default getTitle;

// const getTitle = (options = {}) => cy.get('[aria-label="header-title"]', options);
// const allGamesElements = {
//     getTitle
//   };
// export default allGamesElements;



