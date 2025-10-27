import React from "react";
import ProductBox from "../../components/Users/Product";

const Product = () => {
  return (
    <div className="flex flex-wrap justify-center bg-gradient-to-br from-[#f7f1e3] to-[#f4ede1] px-2 py-2 border-2">
      <ProductBox src={""} name={"hello"} price={20} />
      <ProductBox src={""} name={"hello"} price={20} />
      <ProductBox src={""} name={"hello"} price={20} />
      <ProductBox src={""} name={"hello"} price={20} />
      <ProductBox src={""} name={"hello"} price={20} />
      <ProductBox src={""} name={"hello"} price={20} />
      <ProductBox src={""} name={"hello"} price={20} />
      <ProductBox src={""} name={"hello"} price={20} />
      <ProductBox src={""} name={"hello"} price={20} />
      <ProductBox src={""} name={"hello"} price={20} />
    </div>
  );
};

export default Product;
