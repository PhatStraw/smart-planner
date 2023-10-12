import React from 'react';
import ReactLoading from 'react-loading';

const Loader = ({ type, color }) => (
    <div className='flex flex-col justify-center items-center max-w-[60%] h-[93%]'>
        <div className='w-[50%] h-[50%] flex flex-col justify-center items-center'>
            <h2 className='text-4xl'>Loading</h2>
            <ReactLoading type={type} color={color} height={'50%'} width={'50%'} />
        </div>
    </div>
);

export default Loader;