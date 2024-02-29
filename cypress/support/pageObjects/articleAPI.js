
export class ArticleApi {

    verifyRequestAndResponse(){
        cy.intercept('POST','https://conduit-api.bondaracademy.com/api/articles/').as('postArticles')

        cy.get('.navbar').contains('New Article').click()
        cy.get('[placeholder="Article Title"]').type('Title')
        cy.get('[formcontrolname="description"]').type('This is a description')
        cy.get('[formcontrolname="body"]').type('Body text 1')
        cy.get('button').click()

        cy.wait('@postArticles').then(xhrResponse =>{
            console.log(xhrResponse)
            expect(xhrResponse.response.statusCode).to.equal(201)
            expect(xhrResponse.request.body.article.body).to.equal('Body text 1')
            expect(xhrResponse.request.body.article.description).to.equal('This is a description')
            expect(xhrResponse.request.body.article.title).to.equal('Title')
        })




    }


}

export const withArticleAPI = new ArticleApi()