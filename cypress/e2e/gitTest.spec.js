/// <reference types="cypress"/>


describe("using git",()=>{
    it("test git",()=>{

        cy.visit('/')
        cy.url().should('contain','pages')



    })

    



})