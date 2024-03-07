const { withArticleAPI } = require("../../support/pageObjects/articleAPI")

describe('Testing various APIs on global feed',()=>{

    beforeEach(()=>{
        cy.loginToApplication()
    })

    it('Verify Request and Response of createa article API',()=>{
        withArticleAPI.verifyRequestAndResponse()
    })

    it('Add comment through API',()=>{
        withArticleAPI.addCommentOnLastArticle()
        cy.get('.article-actions').contains('Delete Article').click()
       
    })

    it('Verify article likes count',()=>{
        withArticleAPI.verifyArticleLikes()


    })

    it('Create and Delete new article',()=>{
        withArticleAPI.deleteArticleThroughAPI()





    })

    

    



})