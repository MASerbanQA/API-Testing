
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

    verifyArticleLikes(){
        cy.intercept('GET','https://conduit-api.bondaracademy.com/api/articles/feed*',{"articles":[],"articlesCount":0})
        cy.intercept('GET','https://conduit-api.bondaracademy.com/api/articles*',{fixture:'articles.json'})
        cy.contains('Global Feed').click()
        cy.get('app-article-preview').find('button').then(likeButtons=>{
            cy.wrap(likeButtons).eq(0).should('contain',300)
            cy.wrap(likeButtons).eq(1).should('contain',99)
        })

        cy.fixture('articles.json').then(file =>{
            const articleLink = file.articles[1].slug
            file.articles[1].favoritesCount = 100
            cy.intercept('POST','https://conduit-api.bondaracademy.com/api/articles/'+articleLink+'/favorite', file)
        })

        cy.get('app-article-preview button').eq(1).click().should('contain','100')





    }


}

export const withArticleAPI = new ArticleApi()