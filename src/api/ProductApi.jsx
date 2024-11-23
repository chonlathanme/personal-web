import axios from "axios";

export const createProduct = async (token, data) => {
    return await axios.post("http://localhost:8000/product/create", data, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const getProducts = async (count = 20) => {
    return await axios.get("http://localhost:8000/product/get-products/"+count);
}

export const updateProduct = async (token, id, data) => {
    return await axios.patch(`http://localhost:8000/product/product-update/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const deleteProduct = async (token, id) => {
    return await axios.delete(`http://localhost:8000/product/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
}

export const uploadFiles = async (token, data) => {
    return await axios.post("http://localhost:8000/product/image-upload", {
        image: data
    }, {
        headers: { Authorization: `Bearer ${token}` },
    });
}

export const removeFiles = async (token, public_id) => {
    return await axios.post("http://localhost:8000/product/image-delete", {
        public_id
    }, {
        headers: { Authorization: `Bearer ${token}` },
    });
}