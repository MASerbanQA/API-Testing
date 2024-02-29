const { withArticleAPI } = require("../../support/pageObjects/articleAPI")

describe('Testing various APIs on global feed',()=>{

    beforeEach(()=>{
        cy.loginToApplication()
    })

    it('Verify Request and Response of createa article API',()=>{
        withArticleAPI.verifyRequestAndResponse()
    })

    it.only('Verify article likes count',()=>{
        withArticleAPI.verifyArticleLikes()




    })

    

    



})