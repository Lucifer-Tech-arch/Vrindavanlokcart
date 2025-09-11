import React from 'react'
import { assets } from '../assets/assets'

const Title = ({text1, text2}) => {
    return (
    
        <div className='inline-flex gap-2 items-center mb-3'>
            <p className='text-[#c2410c]'>{text1} <span className='text-[#c2410c] font-medium'>{text2}</span></p>
            <p className='w-8 flex justify-center items-center sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'>
                <img src={assets.flute} alt="" />
            </p>
        </div>
        
    )
}

export default Title
