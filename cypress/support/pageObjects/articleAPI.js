
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

    deleteArticleThroughAPI(){

        const userCredentials = {
            "user": {
                "email": "cy.apitest@mytest.ro",
                "password": "Parola123"
            }
        }

        const bodyRequest = {
            "article": {
                "title": "API Request 2",
                "description": "Am dat cu Postman In el",
                "body": "OsafiuQAAUT",
                "tagList": []
            }
        }

        cy.request('POST','https://conduit-api.bondaracademy.com/api/users/login',userCredentials).its('body').then(body=>{
            const token = body.user.token

            cy.request({
                url: 'https://conduit-api.bondaracademy.com/api/articles/',
                headers:{ 'Authorization': 'Token '+token},
                method: 'POST',
                body: bodyRequest
            }).then( response =>{
                expect(response.status).to.equal(201)
            })
            cy.contains('Global Feed').click().wait(500)
            cy.get('.article-preview').first().click()
            cy.get('.article-actions').contains('Delete Article').click()

            cy.request({
                url:'https://conduit-api.bondaracademy.com/api/articles/',
                method:'GET',
                headers:{'Authoriztaion':'Token '+token},
            }).its('body').then(articlesRetrieved=>{
                expect(articlesRetrieved.articles[0].title).not.to.equal("API Request 2")
            })


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