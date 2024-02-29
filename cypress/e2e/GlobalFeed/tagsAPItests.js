const { withTagsList } = require("../../support/pageObjects/tagsListAPI")

describe('Testing tags api behabior',()=>{

    beforeEach(()=>{
        withTagsList.mockTagsList()
        cy.loginToApplication()
    })

    

    it('Assert the stubbed tag list',()=>{
        cy.fixture('tags.json').then(data =>{
            const expectedTags = data.tags.join(' ')
            cy.get('.tag-list').invoke('text').then(tagsList=>{
                const cleanExpectedTags = expectedTags.replace(/\s+/g, ' ');
                const cleanTagsList = tagsList.trim().replace(/\s+/g, ' ');

                expect(cleanTagsList).to.equal(cleanExpectedTags);
            })
        })
        
    })

    



})