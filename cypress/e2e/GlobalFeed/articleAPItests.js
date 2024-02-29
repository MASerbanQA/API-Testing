const { withArticleAPI } = require("../../support/pageObjects/articleAPI")
const { withTagsList } = require("../../support/pageObjects/tagsListAPI")

describe('Testing various APIs on global feed',()=>{

    beforeEach(()=>{
        cy.loginToApplication()
    })

    it('Verify Request and Response of createa article API',()=>{
        withArticleAPI.verifyRequestAndResponse()
    })

    

    



})