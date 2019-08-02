const graphql = require('graphql');
const _ = require('lodash');
const Author = require('../models/author');
const Book = require('../models/book');
const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull 
} = graphql;


// dummy Data
/* const books = [
    {name : "Bhagvad Geeta as it is.", genre : "Religious", id : "1", authorId : "1" },
    {name : "An India girl", genre : "social", id : "2", authorId: "2"},
    {name : "Five point someone", genre : "Novel", id : "3", authorId: "2"},
    {name : "I do what I do.", genre : "Economics", id : "4", authorId: "3"},
    {name : "Rich Dad Poor Dad", genre : "Finance", id : "5", authorId: "4"},
    {name : "Cash Flow", genre : "Finance", id : "6", authorId: "4"},
];

const authors = [
    {name : "Prabhupad", age : 63, id : "1"},
    {name : "Chetan Bhagat", age : 44, id : "2"},
    {name : "Raghuram G. Rajan", age : 52, id : "3"},
    {name : "Robert T. kiosaki", age : 48, id : "4"}
]; */
  

// Book query endpoint
const BookType = new GraphQLObjectType({
    name : 'Book',
    fields : () => ({
        id : { type : GraphQLID},
        name : { type : GraphQLString},
        genre : { type : GraphQLString},
        // making relationship with the AuthorType
        author : {
            type : AuthorType,
            resolve(parent, args){
                // in this type of nested query, we have an access to the parent book object queried above
                //return _.find(authors, {id : parent.authorId});
                return Author.findById(parent.authorId);
            }
        }
    }) 
});
// Author query enpoint
const AuthorType = new GraphQLObjectType({
    name : 'Author',
    fields : () => ({
        id : { type : GraphQLID},
        name : { type : GraphQLString},
        age : { type : GraphQLInt},
        // Making relationship with the list of books by the author
        books : {
            type : new GraphQLList(BookType),
            resolve(parent, args){
                //return _.filter(books, {authorId : parent.id});
                return Book.find({authorId : parent.id});
            }
        }
    }) 
});

// Rootquery end point which calls book query as a root query
const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields : {
        book : {
            type : BookType,
            args : { id : { type : GraphQLID}},
            resolve(parent, args){
                // code to get data from db or other source
                //return _.find(books, { id : args.id });
                return Book.findById(args.id)
            }
        },
        author : {
            type : AuthorType,
            args : { id : { type : GraphQLID}},
            resolve(parent, args){
                // code to get data from db or other source
                //return _.find(authors, { id : args.id });
                return Author.findById(args.id);
            }
        },
        books : {
            type : new GraphQLList(BookType),
            resolve(parent, args){
                //return books;
                return Book.find();            
            }
        },
        authors : {
            type : new GraphQLList(AuthorType),
            resolve(parent, args){
                //return authors;
                return Author.find();            
            }
        }
    }
});

// Mutation end point to handle all mutations
const Mutation = new GraphQLObjectType({
    name : 'Mutation',
    fields : {
        addAuthor : {
            type : AuthorType,
            args : {
                name : {type : new GraphQLNonNull(GraphQLString) },
                age : {type : new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parent, args){
                let author = new Author({
                    name : args.name,
                    age : args.age
                });
                return author.save();
            }
        },
        addBook : {
            type : BookType,
            args : {
                name    : {type : new GraphQLNonNull(GraphQLString) },
                genre   : {type : new GraphQLNonNull(GraphQLString) },
                authorId: {type : new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let book = new Book({
                    name : args.name,
                    genre : args.genre,
                    authorId : args.authorId
                });
                return book.save();
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation : Mutation
});
