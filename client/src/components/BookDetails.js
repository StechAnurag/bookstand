import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';


class BookDetails extends Component {

    displayBook(){
        const { book } = this.props.data;
        if(book){
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>Genre : {book.genre}</p>
                    <p>Author: {book.author.name}</p>
                    <p><b>Other books by this author : </b></p>
                    <ul className="other-books">
                        {
                            book.author.books.map(item => {
                                return (
                                    <li key={item.id}>{item.name}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            )
        }else{
            return (
                <div>
                    <p>No book selected ..</p>
                </div>
            )
        }
    }   
    
    render(){
        return (
            <div id="book-details">
                {this.displayBook()}
            </div>
        );
    }
}

export default graphql(getBookQuery, {
    options : props => {
        return {
            variables : {
                id : props.bookId
            }
        }
    }
})(BookDetails);
