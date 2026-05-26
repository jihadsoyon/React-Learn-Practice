import React, { useContext, useEffect, useState } from 'react';
import { BookContext } from '../../context/BookContext';
import BookCard from '../ui/BookCard';

const ListedReadList = ({sortingType}) => {

    const { storedBooks } = useContext(BookContext)
        // console.log(storedBooks);

        const [filteredReadList, setFilteredReadList] = useState(storedBooks)

        useEffect(() => {
         if(sortingType){
            if(sortingType === 'pages'){
             const sortedData = [...storedBooks].sort((a,b) => a.totalPages - b.totalPages)
             console.log(sortedData);
             setFilteredReadList(sortedData);
            }else if(sortingType === 'rating'){
              const sortedData = [...storedBooks].sort((a,b) => a.rating - b.rating)
             console.log(sortedData);
             setFilteredReadList(sortedData);
            }
         }
        }, [sortingType, storedBooks])

    if(filteredReadList.length === 0){
        return <div className='h-[50vh] bg-gray-100 flex items-center justify-center'>
            <h2 className='font-bold text-3xl'>No read list data found</h2>
        </div>
    }

    return (
        <div>
           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {
            filteredReadList.map((book, ind) => <BookCard key={ind} book={book}></BookCard>)
           }
           </div>
        </div>
    );
};

export default ListedReadList;