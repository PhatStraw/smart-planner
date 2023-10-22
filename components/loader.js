import React from 'react';
import ReactLoading from 'react-loading';
import Loaderr from "../public/Loading-modified.svg"
import Image from 'next/image';

const Loader = ({ type, color }) => (
    <div className='flex flex-col justify-center items-center max-w-[100%] h-[93%]'>
        <div className='w-[100%] h-[50%] flex flex-col justify-center items-center'>
            <h2 className='text-4xl'>Loading</h2>
            <Image src={Loaderr} height={100} width={100}/>
            <ReactLoading type={type} color={color} height={'50%'} width={'50%'} />
        </div>
    </div>
);

export default Loader;