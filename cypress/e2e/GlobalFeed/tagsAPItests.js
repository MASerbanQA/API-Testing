const { withTagList } = require("../../support/pageObjects/tagsListApi")

describe('Testing tags api behabior',()=>{

    beforeEach(()=>{
        withTagList.mockTagsList()
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