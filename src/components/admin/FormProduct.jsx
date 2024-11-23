import React, { useEffect, useState } from "react";
import useUserStore from "../../stores/userStore";
import useProductStore from "../../stores/productStore";
import ProductModal from "./modals/ProductModal";
import { Pencil, Trash2, Image } from "lucide-react";
import EditProductModal from "./modals/EditProductModal";
import { toast } from "react-toastify";
import { deleteProduct } from "../../api/ProductApi";

const FormProduct = () => {
  const token = useUserStore((state) => state.token);
  const getProduct = useProductStore((state) => state.getProduct);
  const products = useProductStore((state) => state.products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    getProduct(20);
  }, [getProduct]);

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedProduct(null);
    setEditModalOpen(false);
  };

  const openConfirmDeleteModal = (product) => {
    setProductToDelete(product);
    setConfirmDeleteOpen(true);
  };

  const closeConfirmDeleteModal = () => {
    setProductToDelete(null);
    setConfirmDeleteOpen(false);
  };

  const handleDelete = async () => {
    try {
      const result = await deleteProduct(token, productToDelete.id);
      toast.success(`Product ${productToDelete.title} deleted`);
      getProduct(20);
      closeConfirmDeleteModal();
    } catch (err) {
      const errMessage = err.response?.data?.error || err.message;
      toast.error(errMessage);
    }
  };

  return (
    <div className="container mx-auto p-4 shadow-xl rounded-xl">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold">Products Management</h1>
        <button
          className="btn bg-orange-500 text-white hover:scale-105 hover:bg-orange-600"
          type="button"
          onClick={() => document.getElementById("product-modal").showModal()}
        >
          Add Product
        </button>
      </div>
      <dialog id="product-modal" className="modal">
        <div className="modal-box bg-white rounded-lg shadow-lg">
          <ProductModal />
        </div>
      </dialog>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className="bg-white hover:bg-gray-200">
                <th>{index + 1}</th>
                <td className="w-16 h-16">
                  {product.images.length > 0 &&
                  product.images[0]?.secure_url ? (
                    <img
                      src={product.images[0].secure_url}
                      alt={product.title}
                      className="w-16 h-16 object-cover"
                    />
                  ) : (
                    <Image style={{ width: "100%", height: "100%" }} />
                  )}
                </td>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td className="flex flex-row gap-2 h-[89px] items-center">
                  <button
                    type="button"
                    onClick={() => openEditModal(product)}
                    className="transition-transform transform hover:scale-125"
                  >
                    <Pencil style={{ color: "steelblue" }} />
                  </button>
                  <button
                    type="button"
                    onClick={() => openConfirmDeleteModal(product)}
                    className="transition-transform transform hover:scale-125"
                  >
                    <Trash2 style={{ color: "red" }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isEditModalOpen && (
          <dialog open className="modal">
            <div className="modal-box bg-white rounded-lg shadow-lg">
              <EditProductModal
                product={selectedProduct}
                onClose={closeEditModal}
              />
            </div>
          </dialog>
        )}
        {isConfirmDeleteOpen && (
          <dialog open className="modal">
            <div className="modal-box bg-white rounded-lg shadow-lg">
              <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
              <p>Are you sure you want to delete {productToDelete?.title}?</p>
              <div className="flex justify-end mt-4">
                <button
                  className="btn bg-error text-white mr-2 hover:scale-105 hover:bg-red-600"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  className="btn btn-ghost mr-2"
                  onClick={closeConfirmDeleteModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </dialog>
        )}
      </div>
    </div>
  );
};

export default FormProduct;
