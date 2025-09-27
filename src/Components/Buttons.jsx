import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function Buttons() {
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
      <button className="bg-black px-4 py-2 text-white font-bold rounded-lg hover:cursor-pointer hover:bg-slate-500">
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          className="bg-black px-4 py-2 text-white font-bold rounded-lg hover:cursor-pointer hover:bg-slate-500"
        >
          {cat.category_name}
        </button>
      ))}
    </div>
  );
}

export default Buttons;
