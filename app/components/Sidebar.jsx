import React from 'react';

const Sidebar = () => {
    return (
        <div className='sticky top-0 h-full w-[10rem] p-4 bg-white border rounded-sm overflow-y-auto'>
            <button className='flex items-center gap-2 bg-gray-100 p-2 rounded-md w-full'>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" viewBox="0 0 12 12" fill="#616161">
                    <path d="M1.5 6H10.5H1.5Z" fill="#616161" />
                    <path d="M1.5 6H10.5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 1.5V10.5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className='text-[1rem]'>Create Space</span>
            </button>

            {/* Following categories with notifications */}
            <div className='mt-4 space-y-3'>
                <span className='block'>Mathematics</span>
                <span className='block'>English</span>
                <span className='block'>Finance</span>
                <span className='block'>Business</span>
                <span className='block'>Something</span>
                <span className='block'>Nothing</span>
                <span className='block'>Another Category</span>
                <span className='block'>Yet Another Category</span>
                <span className='block'>More Categories</span>
                <span className='block'>Even More Categories</span>
            </div>
        </div>
    );
};

export default Sidebar;
