"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductType } from "@/type/ProductType";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useCart } from "@/context/CartContext";
import { useModalCartContext } from "@/context/ModalCartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useModalWishlistContext } from "@/context/ModalWishlistContext";
import { useCompare } from "@/context/CompareContext";
import { useModalCompareContext } from "@/context/ModalCompareContext";
import { useModalQuickviewContext } from "@/context/ModalQuickviewContext";
import { useRouter } from "next/navigation";
import { useProductContext } from "@/context/ProductContext";

interface ProductProps {
  data: ProductType;
}

const Product: React.FC<ProductProps> = ({ data }) => {
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const { addToCart, updateCart, cartState } = useCart();
  const { addToWishlist, removeFromWishlist, wishlistState } = useWishlist();
  const { products, fetchData } = useProductContext();

  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (!dataFetched) {
      fetchData();
      setDataFetched(true);
    }
  }, []);
  const router = useRouter();

  const sortedImages = data.imageDetails?.sort(
    (a: any, b: any) => parseInt(a.order) - parseInt(b.order)
  );

  const selected  = sortedImages?.[0];
  if (!selected || !selected.image_path) {
    return null; // or render a default image or fallback UI
  }

  const handleDetailProduct = (productId: string | number) => {
    console.log(productId, "productId");
    router.push(`/product/default?id=${productId}?query=${data.url}`);
  };
  const formattedDiscountedPrice = new Intl.NumberFormat("en-IN").format(
    Math.round(parseFloat(data.discountPrice))
  );
  const formattedOriginalPrice = new Intl.NumberFormat("en-IN").format(
    Math.round(parseFloat(data.productPrice))
  );

  return (
    <>
      <div className="product-item grid-type ">
        <div className="product-main cursor-pointer block">
          <div className="product-thumb bg-white relative overflow-hidden">
            <div
              className=" w-full h-full aspect-[4/3]"
              onMouseLeave={() => setShowVideo(false)}
            >
              {showVideo == true ? (
                <div className="mb-2">
                  <div
                    className="w-[100%] object-cover relative duration-700 product-img"
                    onClick={() => handleDetailProduct(data?.productId)}
                  >
                    <video loop autoPlay>
                      {" "}
                      <source
                        src="/products/GERD23021256.mp4"
                        type="video/mp4"
                      />
                    </video>
                  </div>
                  {/* <div className="flex justify-between">
                    <div className="" onClick={() => setShowVideo(!showVideo)}>
                      <Icon.Play size={25} weight="light" />
                    </div>
                    <div className="float-right">
                      <Icon.Heart size={25} weight="light" />
                    </div>
                  </div> */}
                </div>
              ) : (
                <>
                  <Image
                    onClick={() => handleDetailProduct(data?.productId)}
                    className="w-[95%] duration-700  m-auto"
                    src={selected.image_path}
                    width={400}
                    height={400}
                    alt="This image is temporarry"
                  />

                  <div className="flex justify-between">
                    <div className="" onClick={() => setShowVideo(!showVideo)}>
                      <Icon.Play size={25} weight="light" />
                    </div>
                    <div className="float-right">
                      <Icon.Heart size={25} weight="light" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div
            className=" mt-4 lg:mb-7"
            onClick={() => handleDetailProduct(data?.productId)}
          >
            <div className="product-name text-title duration-300 text-xl">
              <p>{data?.title}</p>
              {/* <p className="text-[#d8d8d8]">{data?.shortDesc}</p> */}
            </div>
            <div className="flex">
              <Icon.Star weight="fill" color="#FFD400" className="mr-1" />
              <Icon.Star weight="fill" color="#FFD400" className="mr-1" />
              <Icon.Star weight="fill" color="#FFD400" className="mr-1" />
              <Icon.Star weight="fill" color="#FFD400" className="mr-1" />
              <Icon.Star weight="fill" color="#FFD400" className="mr-1" />
            </div>

            <div className="product-price-block flex items-center gap-2 flex-wrap mt-1 duration-300 relative z-[1]">
              <div className="product-price text-title text-lg">
                ₹{formattedDiscountedPrice}
              </div>
              <div className="line-through text-[#beb3b3]">
                ₹{formattedOriginalPrice}
              </div>
              <p className="text-[#c95d71]">{data&&data?.discountValue}%OFF</p>
              {/* {percentSale > 0 && (
                  <>
                    <div className="product-origin-price caption1 text-secondary2">
                      <del>${data.originPrice}.00</del>

  const handleActiveSize = (item: string) => {
    setActiveSize(item);
  };

  const handleAddToCart = () => {
    if (!cartState.cartArray.find((item) => item.id === data.id)) {
      addToCart({ ...data });
      updateCart(data.id, data.quantityPurchase, activeSize, activeColor);
    } else {
      updateCart(data.id, data.quantityPurchase, activeSize, activeColor);
    }
    openModalCart();
  };

  const handleAddToWishlist = () => {
    // if product existed in wishlit, remove from wishlist and set state to false
    if (wishlistState.wishlistArray.some((item) => item.id === data.id)) {
      removeFromWishlist(data.id);
    } else {
      // else, add to wishlist and set state to true
      addToWishlist(data);
    }
    openModalWishlist();
  };

  const handleAddToCompare = () => {
    // if product existed in wishlit, remove from wishlist and set state to false
    if (compareState.compareArray.length < 3) {
      if (compareState.compareArray.some((item) => item.id === data.id)) {
        removeFromCompare(data.id);
      } else {
        // else, add to wishlist and set state to true
        addToCompare(data);
      }
    } else {
      alert("Compare up to 3 products");
    }

    openModalCompare();
  };

  const handleQuickviewOpen = () => {
    openQuickview(data);
  };

  const handleDetailProduct = (productId: string) => {
    // redirect to shop with category selected
    router.push(`/product/default?id= ${productId}`);
  };

  let percentSale = Math.floor(100 - (data.price / data.originPrice) * 100);
  let percentSold = Math.floor((data.sold / data.quantity) * 100);

  return (
    <>
      {type === "grid" ? (
        <div className="product-item grid-type">
          <div
            onClick={() => handleDetailProduct(data.id)}
            className="product-main cursor-pointer block"
          >
            <div className="product-thumb bg-gray relative overflow-hidden">
              {data.new && (
                <div className="product-tag text-button-uppercase bg-green px-3 py-0.5 inline-block rounded-full absolute top-3 left-1 z-[1]">
                  New
                </div>
              )}
              {data.sale && (
                <div className="product-tag text-button-uppercase text-white bg-red px-3 py-0.5 inline-block rounded-full absolute top-3 left-3 z-[1]">
                  Sale
                </div>
              )}
              <div className="list-action-right absolute top-3 right-3 max-lg:hidden">
                <div
                  className={`add-wishlist-btn w-[32px] h-[32px] flex items-center justify-center rounded-full bg-white duration-300 relative  ${
                    wishlistState.wishlistArray.some(
                      (item) => item.id === data.id
                    )
                      ? "active"
                      : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToWishlist();
                  }}
                >
                  <div className="tag-action bg-black text-white caption2 px-1.5 py-0.5 rounded-sm">
                    Add To Wishlist
                  </div>
                  {wishlistState.wishlistArray.some(
                    (item) => item.id === data.id
                  ) ? (
                    <>
                      <Icon.Heart
                        size={18}
                        weight="fill"
                        className="text-white"
                      />
                    </>
                  ) : (
                    <>
                      <Icon.Heart size={18} />
                    </>
                  )}
                </div>
                <div
                  className={`compare-btn w-[32px] h-[32px] flex items-center justify-center rounded-full bg-white duration-300 relative mt-2  ${
                    compareState.compareArray.some(
                      (item) => item.id === data.id
                    )
                      ? "active"
                      : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCompare();
                  }}
                >
                  <div className="tag-action bg-black text-white caption2 px-1.5 py-0.5 rounded-sm">
                    Compare Product
                  </div>
                  <Icon.ArrowsCounterClockwise
                    size={18}
                    className="compare-icon"
                  />
                  <Icon.CheckCircle size={20} className="checked-icon" />
                </div>
              </div>
              <div className="product-img w-full h-full aspect-[3/4]">
                {activeColor ? (
                  <>
                    {
                      <Image
                        src={
                          data.variation.find(
                            (item) => item.color === activeColor
                          )?.image ?? ""
                        }
                        width={500}
                        height={500}
                        alt={data.name}
                        className="w-full h-full object-contain duration-700"
                      />
                    }
                  </>
                ) : (
                  <>
                    {data.thumbImage.map((img, index) => (
                      <Image
                        key={index}
                        src={img}
                        width={500}
                        height={500}
                        alt={data.name}
                        className="w-full h-full object-contain duration-700"
                      />
                    ))}
                  </>
                )}
              </div>
              <div className="list-action grid grid-cols-2 gap-3 px-5 absolute w-full bottom-5 max-lg:hidden">
                <div
                  className="quick-view-btn w-full text-button-uppercase py-2 text-center rounded-full duration-300 bg-white hover:bg-black hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuickviewOpen();
                  }}
                >
                  Quick View
                </div>
                {data.action === "add to cart" ? (
                  <div
                    className="add-cart-btn w-full text-button-uppercase py-2 text-center rounded-full duration-500 bg-white hover:bg-black hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart();
                    }}
                  >
                    Add To Cart
                  </div>
                ) : (
                  <>
                    <div
                      className="quick-shop-btn text-button-uppercase py-2 text-center rounded-full duration-500 bg-white hover:bg-black hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenQuickShop(!openQuickShop);
                      }}
                    >
                      Quick Shop
                    </div>
                    <div
                      className={`quick-shop-block absolute left-5 right-5 bg-white p-5 rounded-[20px]  ${
                        openQuickShop ? "open" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <div className="list-size flex items-center justify-center flex-wrap gap-2">
                        {data.sizes.map((item, index) => (
                          <div
                            className={`size-item w-10 h-10 rounded-full flex items-center justify-center text-button bg-white border border-line  ${
                              activeSize === item ? "active" : ""
                            }`}
                            key={index}
                            onClick={() => handleActiveSize(item)}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                      <div
                        className="button-main w-full text-center rounded-full py-3 mt-4"
                        onClick={() => {
                          handleAddToCart();
                          setOpenQuickShop(false);
                        }}
                      >
                        Add To cart
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="product-infor mt-4 lg:mb-7">
              <div className="product-sold sm:pb-4 pb-2">
                <div className="progress bg-line h-1.5 w-full rounded-full overflow-hidden relative">
                  <div
                    className={`progress-sold bg-red absolute left-0 top-0 h-full`}
                    style={{ width: ` ${percentSold}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between gap-3 gap-y-1 flex-wrap mt-2">
                  <div className="text-button-uppercase">
                    <span className="text-secondary2 max-sm:text-xs">
                      Sold:{" "}
                    </span>
                    <span className="max-sm:text-xs">{data.sold}</span>
                  </div>
                  <div className="text-button-uppercase">
                    <span className="text-secondary2 max-sm:text-xs">
                      Available:{" "}
                    </span>
                    <span className="max-sm:text-xs">
                      {data.quantity - data.sold}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-title ">{data.name}</div>
              {/* {data.variation.length > 0 && data.action === "add to cart" && (
                <div className="list-color py-2 max-md:hidden flex items-center gap-3 flex-wrap duration-500">
                  {data.variation.map((item, index) => (
                    <div
                      key={index}
                      className={`color-item w-8 h-8 rounded-full duration-300 relative  ${
                        activeColor === item.color ? "active" : ""
                      }`}
                      style={{ backgroundColor: ` ${item.colorCode}` }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleActiveColor(item.color);
                      }}
                    >
                      <div className="tag-action bg-black text-white caption2 capitalize px-1.5 py-0.5 rounded-sm">
                        {item.color}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {data.variation.length > 0 && data.action === "quick shop" && (
                <div className="list-color-image max-md:hidden flex items-center gap-3 flex-wrap duration-500">
                  {data.variation.map((item, index) => (
                    <div
                      className={`color-item w-12 h-12 rounded-xl duration-300 relative  ${
                        activeColor === item.color ? "active" : ""
                      }`}
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleActiveColor(item.color);
                      }}
                    >
                      <Image
                        src={item.colorImage}
                        width={100}
                        height={100}
                        alt="color"
                        className="rounded-xl w-full h-full object-cover"
                      />
                      <div className="tag-action bg-black text-white caption2 capitalize px-1.5 py-0.5 rounded-sm">
                        {item.color}
                      </div>
                    </div>
                  ))}
                </div>
              )} */}

              {/* <div className=" flex items-center gap-2 flex-wrap mt-1 duration-300 relative z-[1]">
                <div className="product-price text-title">
                  {" "}
                  ${data.price}.00
                </div>
                {percentSale > 0 && (
                  <>
                    <div className="product-origin-price caption1 text-secondary2">
                      <del> ${data.originPrice}.00</del>
                    </div>
                    <div className="product-sale caption1 font-medium bg-green px-3 py-0.5 inline-block rounded-full">
                      -{percentSale}%
                    </div>
                  </>
                )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
  // );
};

export default Product;
