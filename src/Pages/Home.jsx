import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Buttons from "../Components/Buttons";

function Home() {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); 

  const changeFavState = async (id) => {
    try {
      const item = items.find((item) => item.id === id);
      if (!item) return;

      const newFavState = !item.item_is_favourite;

      const { error } = await supabase
        .from("items")
        .update({ item_is_favourite: newFavState })
        .eq("id", id);

      if (error) {
        console.error("Error updating favorite state:", error);
        return;
      }

      setItems((prev) =>
        prev.map((it) =>
          it.id === id ? { ...it, item_is_favourite: newFavState } : it
        )
      );
    } catch (err) {
      console.error("Unexpected error in changeFavState:", err);
    }
  };

  // 👇 Fetch items based on selected category
  const fetchItems = async () => {
    try {
      let query = supabase.from("items").select("*");
      if (selectedCategory) {
        query = query.ilike("item_category", selectedCategory); // filter
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching items:", error);
      } else {
        const itemsWithImages = data.map((item) => {
          const { data: imageData } = supabase.storage
            .from("pictures")
            .getPublicUrl(`item/${item.item_image}`);
          return { ...item, item_image: imageData.publicUrl || "" };
        });
        setItems(itemsWithImages);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [selectedCategory]); // 👈 refetch when category changes

  return (
    <div>
      <Buttons onCategorySelect={setSelectedCategory} 
      selectedCategory={selectedCategory}
      /> {/* pass callback */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-2xl p-4 flex flex-col relative"
          >
            {/* Image + badge */}
            <div className="relative">
              <img
                src={item.item_image}
                alt={item.item_name}
                className="w-full h-40 object-cover rounded-xl"
              />
              <span
                className={`absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-semibold ${
                  item.item_is_available
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {item.item_is_available ? "Available" : "Out of Stock"}
              </span>
            </div>

            <h2 className="text-xl font-bold mt-3">{item.item_name}</h2>
            <p className="text-gray-600 text-sm">{item.item_description}</p>
            <p className="text-sm mt-1">
              <span className="font-semibold">Category:</span>{" "}
              {item.item_category}
            </p>
            <div className="mt-2 flex justify-between items-center">
              <span
                className="text-xl hover:cursor-pointer"
                onClick={() => changeFavState(item.id)}
              >
                {item.item_is_favourite ? "❤️" : "🤍"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
