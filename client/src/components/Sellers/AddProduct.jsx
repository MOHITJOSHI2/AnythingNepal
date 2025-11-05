import React, { useEffect, useState } from "react";

const AddProduct = ({ id }) => {
  const productCategory = ["Clothes", "Art and Artitecture", "Pottery"];

  const [img, setImg] = useState(null);
  const [productData, setProductData] = useState({
    photo: "",
    productName: "",
    productPrice: 0,
    productQuantity: "1",
    productCategory: "",
    productDescription: "",
  });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImg(URL.createObjectURL(e.target.files[0]));
      setProductData((prev) => ({
        ...prev,
        photo: e.target.files[0].name,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!id) {
      console.log("Error occured");
      return;
    }
  });

  async function sendData() {
    const formData = new FormData();
    formData.append(
      "productImage",
      document.getElementById("productImage").files[0]
    );
    formData.append("productName", productData.productName);
    formData.append("productPrice", productData.productPrice);
    formData.append("productQuantity", productData.productQuantity);
    formData.append("productCategory", productData.productCategory);
    formData.append("productDescription", productData.productDescription);

    try {
      const req = await fetch(
        `${import.meta.env.VITE_localhost}/seller/addProduct/${id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const res = await req.json();
      if (req.ok) {
        console.log(res.message);
        document.getElementById("form").reset();
      } else {
        console.log(res.err);
      }
    } catch (err) {
      console.log("Error:", err);
    }
  }

  return (
    <div className="m-5 min-h-[600px] max-w-md ">
      <div>
        <form method="POST" action="/" id="form" enctype="multipart/form-data">
          <div
            onClick={() => document.getElementById("productImage").click()}
            className="text-center border-2 m-1 w-[35%] min-h-[150px] border-dashed hover:scale-101 transition-all ease-in-out cursor-pointer flex items-center justify-center overflow-hidden"
          >
            {img ? (
              <img
                src={img}
                alt="Preview"
                className="w-full h-full object-cover rounded"
              />
            ) : (
              "Choose Image"
            )}
          </div>
          <input
            hidden
            type="file"
            name="productImage"
            id="productImage"
            required
            onChange={handleFileChange}
          />
          {/** Product Name */}
          <div className="mt-3">
            <label className="block text-[#5a3e2b] text-md font-medium m-1">
              Product Name
            </label>
            <input
              type="text"
              onChange={handleChange}
              placeholder="Product Name"
              name="productName"
              maxLength={100}
              className="w-[95%] px-4 py-2 border border-[#d4a373] rounded-lg bg-[#fdfaf6] ml-1"
            />
          </div>

          {/** Product Price */}
          <div className="mt-3">
            <label className="block text-[#5a3e2b] text-md font-medium m-1">
              Product Price
            </label>
            <input
              type="text"
              maxLength={6}
              name="productPrice"
              onChange={handleChange}
              placeholder="Product Price"
              className="w-[95%] px-4 py-2 border border-[#d4a373] rounded-lg bg-[#fdfaf6] ml-1"
            />
          </div>
          {/** Product Quantity */}

          <div className="mt-3">
            <label className="block text-[#5a3e2b] text-md font-medium m-1">
              Product Quantity
            </label>
            <input
              type="number"
              onChange={handleChange}
              placeholder="Product Quantity"
              name="productQuantity"
              className="w-[95%] px-4 py-2 border border-[#d4a373] rounded-lg bg-[#fdfaf6] ml-1"
            />
          </div>
          {/* Product Category */}
          <div className="mt-3">
            <label className="block text-[#5a3e2b] text-md font-medium m-1">
              Product Category
            </label>
            <select
              name="productCategory"
              value={productData.productCategory}
              onChange={handleChange}
              className="w-[95%] px-4 py-2 border border-[#d4a373] rounded-lg bg-[#fdfaf6] ml-1"
            >
              <option value="">--Select Category--</option>
              {productCategory?.map((elem, index) => (
                <option key={index} value={elem}>
                  {elem}
                </option>
              ))}
            </select>
          </div>
          {/** Product Description */}
          <div className="mt-3">
            <label className="block text-[#5a3e2b] text-md font-medium m-1">
              Product Description
            </label>
            <textarea
              name="productDescription"
              id=""
              cols="30"
              rows="5"
              maxLength={300}
              onChange={handleChange}
              placeholder="Product Description"
              className="w-[95%] px-4 py-2 border border-[#d4a373] rounded-lg bg-[#fdfaf6] ml-1"
            ></textarea>
          </div>
          <div>
            <button
              className="w-[95%] ml-1 mb-1 py-2 bg-green-600 text-white rounded-lg"
              type="button"
              onClick={sendData}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
