import React, { useEffect, useState } from "react";

const CreateShop = ({ id }) => {
  const productCategory = ["Clothes", "Art and Artitecture", "Pottery"];

  const [img, setImg] = useState(null);
  const [shopData, setShopData] = useState({
    shopImage: "",
    shopName: "",
    shopDescription: "",
  });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImg(URL.createObjectURL(e.target.files[0]));
      setShopData((prev) => ({
        ...prev,
        photo: e.target.files[0].name,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShopData((prev) => ({
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
    formData.append("shopImage", document.getElementById("shopImage").files[0]);
    formData.append("shopName", shopData.productName);
    formData.append("shopDescription", shopData.productDescription);

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
        setImg(null);
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
        <form
          method="POST"
          action="/"
          id="form"
          enctype="multipart/form-data"
          className="border border-[#d4a373] rounded-lg p-10"
        >
          {/**Shop Image */}
          <div
            onClick={() => document.getElementById("productImage").click()}
            className="text-center border-2 m-1 w-[35%] min-h-[150px] border-dotted hover:scale-101 transition-all ease-in-out cursor-pointer flex items-center justify-center overflow-hidden"
          >
            {img ? (
              <img
                src={img}
                alt="Preview"
                className="w-full h-full object-cover rounded"
              />
            ) : (
              "Choose Shop Image"
            )}
          </div>
          <input
            hidden
            type="file"
            name="shopImage"
            id="shopImage"
            required
            onChange={handleFileChange}
          />
          {/** shop Name */}
          <div className="mt-3">
            <label className="block text-[#5a3e2b] text-md font-medium m-1">
              Shop Name
            </label>
            <input
              type="text"
              onChange={handleChange}
              placeholder="Shop Name"
              name="shopName"
              maxLength={100}
              className="w-[95%] px-4 py-2 border border-[#d4a373] rounded-lg bg-[#fdfaf6] ml-1"
            />
          </div>

          {/** shop Description */}
          <div className="mt-3">
            <label className="block text-[#5a3e2b] text-md font-medium m-1">
              Shop Description
            </label>
            <textarea
              name="shopDescription"
              id=""
              cols="30"
              rows="5"
              maxLength={300}
              onChange={handleChange}
              placeholder="Shop Description"
              className="w-[95%] px-4 py-2 border border-[#d4a373] rounded-lg bg-[#fdfaf6] ml-1"
            ></textarea>
          </div>
          <div>
            <button
              className="w-[95%] ml-1 mb-1 py-2 bg-orange-600 text-white rounded-lg"
              type="button"
              onClick={sendData}
            >
              Create Shop
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateShop;
