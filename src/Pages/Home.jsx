import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Buttons from "../Components/Buttons";

function Home() {
  const [items, setItems] = useState([]);
const changeFavState = async (id) => {
  try {
    // Find the item to toggle
    const item = items.find((item) => item.id === id);
    if (!item) {
      console.error("Item not found:", id);
      return;
    }

    // Toggle the favorite status
    const newFavState = !item.item_is_favourite;

    // Update the item in Supabase
    const { error } = await supabase
      .from("items")
      .update({ item_is_favourite: newFavState })
      .eq("id", id);

    if (error) {
      console.error("Error updating favorite state:", error);
      return;
    }

    // Update the local state to reflect the change
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, item_is_favourite: newFavState } : item
      )
    );
  } catch (err) {
    console.error("Unexpected error in changeFavState:", err);
  }
};
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data, error } = await supabase.from("items").select("*");

        if (error) {
          console.error("Error fetching items:", error);
        } else {
          console.log("Raw fetched data:", data);
          const itemsWithImages = await Promise.all(
            data.map(async (item) => {
              console.log("Processing item_image:", item.item_image);
              const fullPath = `item/${item.item_image}`;
              const { data: imageData, error: storageError } = supabase.storage
                .from("pictures")
                .getPublicUrl(fullPath);
              if (storageError) {
                console.error("Storage error for", fullPath, storageError);
              } else {
                console.log("Generated URL:", imageData.publicUrl);

                try {
                  const response = await fetch(imageData.publicUrl);
                  if (!response.ok) {
                    console.error(
                      "Fetch error for",
                      imageData.publicUrl,
                      "Status:",
                      response.status,
                      "Status Text:",
                      response.statusText
                    );
                  }
                } catch (fetchError) {
                  console.error("Fetch failed for", item.item_image, fetchError);
                }
              }
              return { ...item, item_image: imageData.publicUrl || "" };
            })
          );
          setItems(itemsWithImages);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      <Buttons/>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white shadow-md rounded-2xl p-4 flex flex-col relative"
        >
          {/* Image with Availability Badge */}
          <div className="relative">
            <img
              src={item.item_image}
              alt={item.item_name}
              className="w-full h-40 object-cover rounded-xl"
              onError={(e) =>
                console.log("Image load error for", item.item_image, e)
              }
              onLoad={(e) => console.log("Image loaded:", item.item_image)}
            />
            <span
              className={`absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-semibold ${
                item.item_is_available
                  ? "bg-green-100 bg-opacity-70 text-green-800"
                  : "bg-red-100 bg-opacity-70 text-red-800"
              }`}
            >
              {item.item_is_available ? "Available" : "Out of Stock"}
            </span>
          </div>
          <h2 className="text-xl font-bold mt-3">{item.item_name}</h2>
          <p className="text-gray-600 text-sm">{item.item_description}</p>
          <p className="text-sm mt-1">
            <span className="font-semibold">Category:</span> {item.item_category}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Created At:</span>{" "}
            {new Date(item.item_created_at).toLocaleDateString()}
          </p>
          <div className="mt-2">
            <span className="font-semibold">Sizes: </span>
            {item.item_sizes
              ? JSON.stringify(item.item_sizes)
                  .replace(/[{}\[\]"]/g, "")
                  .split(",")
                  .join(", ")
              : "N/A"}
          </div>
          <div className="mt-2 flex justify-between items-center">

            <span className="text-xl hover:cursor-pointer" onClick={()=>changeFavState(item.id)}>
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