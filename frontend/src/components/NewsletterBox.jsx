import React from 'react'

function NewsletterBox() {
    const submithandler = ((event) => {
        event.preventDefault();
    })
  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-[#c2410c]'>Subscribe now & awail 20% off</p>
      <p className='text-gray-400 mt-3'>Receive important store related news, exclusive discounts, new product launches and more...</p>
      <form onSubmit={submithandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border border-gray-400 pl-3'>
      <input type="email" name="" className='w-full sm:flex-1 outline-none' placeholder='abc@email.com' required />
      <button type='submit' className='cursor-pointer bg-[#c2410c] text-white text-xs px-10 py-4'>SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsletterBox
