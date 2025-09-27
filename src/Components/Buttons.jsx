import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import {add} from '@mui/icons-material'
function Buttons({ onCategorySelect, selectedCategory }) {
  const [categories, setCategories] = useState([]);

  const fetchCategory = async () => {
    const { data, error } = await supabase.from("categories").select("*");
    if (error) {
      console.error(error);
    } else {
      setCategories(data);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className="flex flex-wrap gap-3 mt-7">
      <button
        onClick={() => onCategorySelect(null)}
        className="bg-black px-4 py-2 text-white font-bold rounded-lg hover:cursor-pointer hover:bg-slate-500"
      >
        All
      </button>

      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategorySelect(cat.category_name)}
          className={`px-4 py-2 font-bold rounded-lg hover:cursor-pointer shadow-lg 
            ${
              selectedCategory === cat.category_name
                ? "bg-slate-700 text-white shadow-xl"
                : "bg-black text-white hover:bg-slate-500"
                
            }`}
          
        >
          {cat.category_name}
        </button>
      ))}
    </div>
  );
}

export default Buttons;
