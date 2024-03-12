"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import MenuOne from "@/components/Header/Menu/MenuOne";
import ShopBreadCrumbImg from "@/components/Shop/ShopBreadCrumbImg";
import productData from "@/data/Product.json";
import Footer from "@/components/Footer/Footer";
import NavHoverMenu from "@/components/Header/Menu/NavHoverMenu";
import NavTwo from "@/components/Header/TopNav/NavTwo";

export default function Default() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const category = searchParams.get("category");

  return (
    <>
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <NavTwo props="style-three bg-white" />
      <div id="header" className="relative w-full">
        <NavHoverMenu props="bg-white" />
      </div>
      <ShopBreadCrumbImg
        data={productData}
        productPerPage={12}
        dataType={type}
      />
      <Footer />
    </>
  );
}
