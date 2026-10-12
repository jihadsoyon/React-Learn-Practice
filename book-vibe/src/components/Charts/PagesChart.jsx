import React, { useContext } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BookContext } from '../../context/BookContext';

const PagesChart = () => {
    const { readList } = useContext(BookContext);

    // Prepare data for chart
    const chartData = readList.map(book => ({
        name: book.bookName.length > 15 ? book.bookName.slice(0, 12) + '...' : book.bookName,
        pages: book.totalPages,
        fullName: book.bookName
    }));

    if (chartData.length === 0) {
        return (
            <div className='flex justify-center items-center h-[70vh]'>
                <h2 className='font-bold text-2xl text-gray-400'>
                    Add books to read list first
                </h2>
            </div>
        );
    }

    return (
        <div className='w-full h-[70vh] flex justify-center items-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-8'>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                >
                    <defs>
                        <linearGradient id="colorPages" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                        dataKey="name"
                        stroke="#6b7280"
                        style={{ fontSize: '12px' }}
                    />
                    <YAxis
                        stroke="#6b7280"
                        label={{ value: 'Pages', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1f2937',
                            border: 'none',
                            borderRadius: '8px',
                            color: '#fff'
                        }}
                        formatter={(value) => `${value} pages`}
                        labelFormatter={(label) => {
                            const book = chartData.find(b => b.name === label);
                            return book ? book.fullName : label;
                        }}
                    />
                    <Area
                        type="monotone"
                        dataKey="pages"
                        stroke="#059669"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorPages)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PagesChart;