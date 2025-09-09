import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendurl } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {

  const [image1, setimage1] = useState(false);
  const [image2, setimage2] = useState(false);
  const [image3, setimage3] = useState(false);
  const [image4, setimage4] = useState(false);

  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [Category, setcategory] = useState("Laddu Gopal");
  const [material, setMaterial] = useState("Rose");
  const [size, setsize] = useState("");
  const [bestseller, setbestseller] = useState(false);

  const onSubmitHandler = async(e) => {
    e.preventDefault();

    try {
      const formData = new FormData()

      formData.append("name",name);
      formData.append("description",description);
      formData.append("price",price);
      formData.append("categories",Category);
      formData.append("material",material);
      formData.append("size",size);
      formData.append("bestseller",bestseller);

      image1 && formData.append("image1",image1);
      image2 && formData.append("image2",image2);
      image3 && formData.append("image3",image3);
      image4 && formData.append("image4",image4);

      const response = await axios.post(backendurl + "/api/product/add",formData, {headers: {token,"Content-Type": "multipart/form-data"}});
      if(response.data.success) {
        toast.success(response.data.message, {autoClose: 2000});
        setname('');
        setdescription('');
        setimage1(false);
        setimage2(false);
        setimage3(false);
        setimage4(false);
        setprice('');
        setsize('');
      }else{
        toast.error(response.data.message,{autoClose: 2000});
      }

    } catch (error) {
       console.log(error);
       toast.error(error.message,{autoClose: 2000});
    }
  }


  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20 cursor-pointer' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e) => setimage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img className='w-20 cursor-pointer' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e) => setimage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img className='w-20 cursor-pointer' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e) => setimage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img className='w-20 cursor-pointer' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e) => setimage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product Name</p>
        <input type="text" onChange={(e) => setname(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' placeholder='Type Here' required />
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product Description</p>
        <textarea onChange={(e) => setdescription(e.target.value)} value={description} type="text" className='w-full max-w-[500px] px-3 py-2' placeholder='Write Description Here' required />
      </div>
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product Category</p>
          <select onChange={(e) => setcategory(e.target.value)} value={Category} className='w-full px-3 py-2'>
            <option value="Laddu Gopal">Laddu Gopal</option>
            <option value="Ram Darbar">Ram Darbar</option>
            <option value="Key Rings">Key Rings</option>
            <option value="Khatu Shaym">Khatu Shaym</option>
            <option value="Dhup Batti">Dhup Batti</option>
            <option value="Durga Mata">Durga Mata</option>
            <option value="Khadau">Khadau</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Material</p>
          <select onChange={(e) => setMaterial(e.target.value)} value={material} className='w-full px-3 py-2'>
            <option value="Rose">Rose</option>
            <option value="Sandalwood">Sandalwood</option>
            <option value="Sheesham">Sheesham</option>
            <option value="Brass">Brass</option>
            <option value="Steel">Steel</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Product Price</p>
          <input className='w-full px-3 py-2 sm:w-[120px]' onChange={(e) => setprice(e.target.value)} value={price} type="number" placeholder='100' />
        </div>
      </div>
      <div>
        <p className='mb-2'>Product Sizes</p>
        <div>
          <input type="text" onChange={(e) => setsize(e.target.value)} value={size} className='w-full px-3 py-2 max-w-[500px]' placeholder='Add size (aXb cm)' required />
        </div>
      </div>
      <div className='flex gap-2 mt-2'>
        <input type="checkbox" id='bestseller' onChange={(e) => setbestseller(prev => !prev)} checked={bestseller} />
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
      </div>
      <button className='w-29 py-2 mt-4 cursor-pointer bg-[#c2410c] rounded-md text-white' type='submit'>Add Product</button>
    </form>
  )
}

export default Add
