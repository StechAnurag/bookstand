import { gql } from 'apollo-boost';

const getBooksQuery = gql`
    query{
        books{
            name,
            id
        }
    }
`;

const getAuthorsQuery = gql`
    query{
        authors{
            name,
            id
        }
    }
`;

const addBookMutation = gql`
    mutation($name : String!, $genre : String!, $authorId: ID!){
        addBook(name : $name, genre: $genre, authorId: $authorId){
            name,
            id
        }
    }
`;

export { getAuthorsQuery, getBooksQuery, addBookMutation };