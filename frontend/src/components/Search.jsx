import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useLocation } from 'react-router-dom';

const Search = () => {
  const location = useLocation();
  const { search, setsearch, setshowsearch, showsearch } = useContext(ShopContext);

  const visible = location.pathname.includes("collection");

  if (!showsearch || !visible) return null;

  return (
    <div className="pt-[100px] text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-3 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          type="text"
          placeholder="Search products..."
          aria-label="Search products"
          className="flex-1 outline-none bg-inherit text-sm"
        />
        <button aria-label="Search">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5" viewBox="0 -960 960 960" fill="#c2410c">
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
          </svg>
        </button>
      </div>
      <button onClick={() => setshowsearch(false)} aria-label="Close search">
        <svg xmlns="http://www.w3.org/2000/svg" className="inline w-5 cursor-pointer" viewBox="0 -960 960 960" fill="#c2410c">
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
        </svg>
      </button>
    </div>
  );
};

export default Search;
