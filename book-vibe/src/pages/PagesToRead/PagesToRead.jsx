import React, { useContext } from 'react';
import PagesChart from '../../components/Charts/PagesChart';
import { BookContext } from '../../context/BookContext';

const PagesToRead = () => {
    const { readList } = useContext(BookContext);

    const totalPages = readList.reduce((sum, book) => sum + book.totalPages, 0);
    const avgPages = readList.length > 0 ? Math.round(totalPages / readList.length) : 0;

    return (
        <div className='container mx-auto my-10'>
            {/* Header Section */}
            <div className='mb-10'>
                <h1 className='font-bold text-4xl mb-2'>Pages to Read</h1>
                <p className='text-gray-600'>Visualize your reading journey</p>
            </div>

            {/* Stats Section */}
            {readList.length > 0 && (
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
                    <div className='bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200'>
                        <h3 className='text-gray-600 text-sm font-semibold mb-1'>Total Books</h3>
                        <p className='text-3xl font-bold text-green-700'>{readList.length}</p>
                    </div>
                    <div className='bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200'>
                        <h3 className='text-gray-600 text-sm font-semibold mb-1'>Total Pages</h3>
                        <p className='text-3xl font-bold text-blue-700'>{totalPages}</p>
                    </div>
                    <div className='bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200'>
                        <h3 className='text-gray-600 text-sm font-semibold mb-1'>Avg Pages</h3>
                        <p className='text-3xl font-bold text-purple-700'>{avgPages}</p>
                    </div>
                    <div className='bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-lg border border-amber-200'>
                        <h3 className='text-gray-600 text-sm font-semibold mb-1'>Longest Book</h3>
                        <p className='text-3xl font-bold text-amber-700'>
                            {Math.max(...readList.map(b => b.totalPages))}
                        </p>
                    </div>
                </div>
            )}

            {/* Chart Section */}
            <div className='bg-white rounded-lg shadow-md p-6'>
                <PagesChart />
            </div>
        </div>
    );
};

export default PagesToRead;