
export class TagsList{

    mockTagsList(){
        cy.intercept('GET','https://conduit-api.bondaracademy.com/api/tags',{fixture:'tags.json'})




    }


}

export const withTagsList = new TagsList()