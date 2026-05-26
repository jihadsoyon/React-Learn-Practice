import React, { createContext, useState } from 'react';
import { toast } from 'react-toastify';
import { addReadListToLocalDB, addWishListToLocalDB, getAllReadListFromLocalDB, getAllWishListFromLocalDB } from '../utils/localDB';


export const BookContext = createContext();

const BookProvider = ({children}) => {

     const [storedBooks, setStoredBooks] = useState(() => getAllReadListFromLocalDB());
     const [wishList, setWishList] = useState(() => getAllWishListFromLocalDB());

    //  useEffect(() => {
    //  const getReadListFromLocalDB = getAllReadListFromLocalDB();
    //  console.log(getReadListFromLocalDB)
    //  setStoredBooks(getReadListFromLocalDB)

    //  }, [])


    const handleMarkAsRead = (currentBook) => {
        // step 1: store book id or store book object
        // step 2: where to store
        //step 3: array or collection
        //step 4: If the book already exist then show a alert or toast
        //step 5: if not then add the book in the array of collection
        // console.log(currentBook, "bookId");

        addReadListToLocalDB(currentBook)



        const isExistBook = storedBooks.find(book => book.bookId === currentBook.bookId)
        if(isExistBook){
            toast.error('The book is already exist')
        } else{
            setStoredBooks([...storedBooks, currentBook]);
            toast.success(`${currentBook.bookName} is added to read list`)
        }


    }
    
     const handleWishList = (currentBook) => {
        // step 1: store book id or store book object
        // step 2: where to store
        //step 3: array or collection
        //step 4: If the book already exist then show a alert or toast
        //step 5: if not then add the book in the array of collection

        addWishListToLocalDB(currentBook)

        const isExistinReadList = storedBooks.find((book) => book.bookId === currentBook.bookId);

        if(isExistinReadList){
            toast.error("This book in already in read list");
            return;
        }
        
        const isExistBook = wishList.find(book => book.bookId === currentBook.bookId)

        if(isExistBook){
            toast.error('The book is already exist')
        } else{
            setWishList([...wishList, currentBook]);
            toast.success(`${currentBook.bookName} is added to wish list`)
        }

        console.log(currentBook, storedBooks, "book")
    }

    const data = {
       storedBooks, setStoredBooks, handleMarkAsRead, wishList, setWishList, handleWishList
    }
    return <BookContext.Provider value={data}>
        {children}
    </BookContext.Provider>
};

export default BookProvider;