import React, { useEffect, useState } from "react";
import productBanner from "../assets/product-banner3.jpeg";
import { SearchBarIcon } from "../icons";
import useProductStore from "../stores/productStore";
import { Heart } from "lucide-react";
import { Plus } from "lucide-react";
import useCategoryStore from "../stores/categoryStore";

const Shop = () => {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const getProduct = useProductStore((state) => state.getProduct);
  const products = useProductStore((state) => state.products);
  const getCategory = useCategoryStore((state) => state.getCategory);
  const categories = useCategoryStore((state) => state.categories);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  useEffect(() => {
    getCategory();
  }, [getCategory]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (productId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(productId)) {
        return prevFavorites.filter((id) => id !== productId);
      } else {
        return [...prevFavorites, productId];
      }
    });
  };

  const isFavorite = (productId) => {
    return favorites.includes(productId);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFavorite = showFavoritesOnly ? isFavorite(product.id) : true;
    const matchesCategory = selectedCategory
      ? product.categoryId !== null && product.categoryId.toString() === selectedCategory
      : true;
    return matchesSearch && matchesFavorite && matchesCategory;
  });

  return (
    <div className="flex flex-col items-center justify-start h-auto w-full">
      <h1 className="text-3xl font-bold p-8">สินค้า</h1>
      <img src={productBanner} alt="" className="w-full rounded-lg" />
      <div className="flex flex-col text-center p-8 gap-4">
        <p>
          ในการผลิต เราใช้ข้าวหอมมะลิและข้าวไรซ์เบอร์รี่อย่างดี
          ผ่านการอบโดยไม่ใช้วิธีการทอด...
        </p>
        <p className="font-bold">
          ข้อมูลเกี่ยวกับสารก่อภูมิแพ้: สามารถบริโภคได้โดยผู้ที่แพ้ไข่ นม
          และเนย.
        </p>
      </div>
      <div className="flex flex-col justify-start items-start w-full my-10">
        <div className="flex flex-row items-center justify-between w-full gap-2">
          <label className="input input-bordered flex items-center gap-2 rounded-full px-4">
            <input
              type="text"
              className="grow"
              placeholder="ค้นหา"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchBarIcon className="h-4 w-4 opacity-70" />
          </label>
          <div>
            <select
              className="select select-bordered w-full"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">เลือกหมวดหมู่</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center mx-4">
            <input
              type="checkbox"
              id="showFavoritesOnly"
              checked={showFavoritesOnly}
              onChange={(e) => setShowFavoritesOnly(e.target.checked)}
              className="checkbox checkbox-error [--chkfg:white]"
            />
            <label htmlFor="showFavoritesOnly" className="mx-2">
              เฉพาะรายการโปรด
            </label>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 my-10">
        {filteredProducts.map((product) => (
          <div key={product.id} className="card bg-base-100 w-full shadow-xl">
            <figure>
              <img
                src={product.images[0].url}
                alt={product.title}
                className="w-full h-64 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.title}</h2>
              <p>{product.description}</p>
              <div className="flex flex-row card-actions justify-between">
                <p>{product.price}</p>
                <Heart
                  className={`cursor-pointer transition duration-100 ${
                    isFavorite(product.id)
                      ? "text-red-500 fill-red-500 animate-[favorite_0.2s_ease-in]"
                      : ""
                  }`}
                  onClick={() => toggleFavorite(product.id)}
                />
                <button>
                  <Plus />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h1 className="font-bold p-8">ตะกร้าสินค้า</h1>
      </div>
    </div>
  );
};

export default Shop;
