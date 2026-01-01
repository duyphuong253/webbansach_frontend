import React from "react";
import BookProps from "./components/BookProps";
import Book from "../../models/Book";

const List: React.FC = () => {
    const books: Book[] = [
        {
            id: 1,
            title: 'Book 1',
            description: 'Việt Nam',
            originalPrice: 50000,
            price: 45000,
            imageUrl: './../../../image/books/1.jpg',
        },
        {
            id: 1,
            title: 'Book 1',
            description: 'Việt Nam',
            originalPrice: 50000,
            price: 45000,
            imageUrl: './../../../image/books/2.jpg',
        },
        {
            id: 1,
            title: 'Book 1',
            description: 'Việt Nam',
            originalPrice: 50000,
            price: 45000,
            imageUrl: './../../../image/books/3.jpg',
        },
        {
            id: 1,
            title: 'Book 1',
            description: 'Việt Nam',
            originalPrice: 50000,
            price: 45000,
            imageUrl: './../../../image/books/5.jpg',
        },
        {
            id: 1,
            title: 'Book 1',
            description: 'Việt Nam',
            originalPrice: 50000,
            price: 45000,
            imageUrl: './../../../image/books/1.jpg',
        },
        {
            id: 1,
            title: 'Book 1',
            description: 'Việt Nam',
            originalPrice: 50000,
            price: 45000,
            imageUrl: './../../../image/books/2.jpg',
        },
        {
            id: 1,
            title: 'Book 1',
            description: 'Việt Nam',
            originalPrice: 50000,
            price: 45000,
            imageUrl: './../../../image/books/3.jpg',
        },
        {
            id: 1,
            title: 'Book 1',
            description: 'Việt Nam',
            originalPrice: 50000,
            price: 45000,
            imageUrl: './../../../image/books/5.jpg',
        },

    ]
    return (
        <div className="container">
            <div className="row mt-4">
                {
                    books.map((book) => (
                        <BookProps book={book} />
                    ))
                }
            </div>
        </div>
    );
}

export default List;