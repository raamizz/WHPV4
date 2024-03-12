"use client";

import React, { useState, useEffect } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { ProductType } from "@/type/ProductType";
// import Products from "@/data/Products.json";
import Product from "../Product/Product";
import "rc-slider/assets/index.css";
import Checkbox from "@/components/Other/CheckBox";
import ReactPaginate from "react-paginate";
import SortBy from "../Other/SortBy";
import MobileFilters from "../Other/MobileFilters";
import axios from "axios";
import DownloadAppBanner from "../Other/DownloadAppBanner";

interface Props {
  // data: Array<ProductType>;
  productPerPage: number;
  dataType: string | null | undefined;
  gender: string | null;
  category: string | null;
}

const Filter = [
  {
    title: "Price",
    options: ["Less than 10K", "10k to 20K", "20k to 30k", "30k and Above"],
  },
  {
    title: "Karat",
    options: ["14k", "22k", "24k"],
  },
  {
    title: "Weight",
    options: ["0-2 g", "2-5 g", "5-10 g", "10-20 g"],
  },
  {
    title: "Gender",
    options: ["Men", "Women", "Kids"],
  },
  { title: "Type", options: [] },
  {
    title: "Style",
    options: [],
  },
  {
    title: "Occasion",
    options: [
      "Everyday",
      "Work Wear",
      "Wedding",
      "Desk to Dinner",
      "Evening",
      "Party Wear",
    ],
  },
  { title: "Colours", options: [] },
  { title: "Delivery", options: ["Fast Delivery", "Cash On Delivery", "EMI"] },
  { title: "Categories", options: ["Gold Earrings", "Diamond Earrings"] },
];
const ShopBreadCrumb1: React.FC<Props> = ({}) => {
  const [showOnlySale, setShowOnlySale] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [sortOption, setSortOption] = useState<boolean>(false);
  const [mobileFilter, setMobileFilter] = useState<boolean | null>(false);
  const [color, setColor] = useState<string | null>();
  const [selectedOptions, setSelectedOptions] = useState<any>([]);
  const [checkedOptions, setCheckedOptions] = useState<any>({});
  const [brand, setBrand] = useState<string | null>();
  const [dropdown, setDropdown] = useState<boolean | null>(false);
  const [filterDropDown, setFilterDropDown] = useState<string | null>("Price");
  const [header, setHeader] = useState<boolean | null>(true);
  const [filters, setFilters] = useState<any>([]);
  const [data, setData] = useState<ProductType[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 100,
  });
  const [length, setLength] = useState<number | null>(null);
  // const [currentPage, setCurrentPage] = useState(0);
  // const productsPerPage = 5;
  // const offset = currentPage * productsPerPage;

  // const handleShowOnlySale = () => {
  //   setShowOnlySale((toggleSelect) => !toggleSelect);
  // };

  // const handleSortChange = (option: string) => {
  //   setSortOption(option);
  //   setCurrentPage(0);
  // };

  // const handleType = (type: string | null) => {
  //   setType((prevType) => (prevType === type ? null : type));
  //   setCurrentPage(0);
  // };

  // const handleSize = (size: string) => {
  //   setSize((prevSize) => (prevSize === size ? null : size));
  //   setCurrentPage(0);
  // };

  // const handlePriceChange = (values: number | number[]) => {
  //   if (Array.isArray(values)) {
  //     setPriceRange({ min: values[0], max: values[1] });
  //     setCurrentPage(0);
  //   }
  // };

  // const handleColor = (color: string) => {
  //   setColor((prevColor) => (prevColor === color ? null : color));
  //   setCurrentPage(0);
  // };

  // const handleBrand = (brand: string) => {
  //   setBrand((prevBrand) => (prevBrand === brand ? null : brand));
  //   setCurrentPage(0);
  // };

  // Filter product
  // let filteredData = data.filter((product) => {
  //   let isShowOnlySaleMatched = true;
  //   if (showOnlySale) {
  //     isShowOnlySaleMatched = product.sale;
  //   }

  //   let isDatagenderMatched = true;
  //   if (gender) {
  //     isDatagenderMatched = product.gender === gender;
  //   }

  //   let isDataCategoryMatched = true;
  //   if (category) {
  //     isDataCategoryMatched = product.category === category;
  //   }

  //   let isDataTypeMatched = true;
  //   if (dataType) {
  //     isDataTypeMatched = product.type === dataType;
  //   }

  //   let isTypeMatched = true;
  //   if (type) {
  //     dataType = type;
  //     isTypeMatched = product.type === type;
  //   }

  //   let isSizeMatched = true;
  //   if (size) {
  //     isSizeMatched = product.sizes.includes(size);
  //   }

  //   let isPriceRangeMatched = true;
  //   if (priceRange.min !== 0 || priceRange.max !== 100) {
  //     isPriceRangeMatched =
  //       product.price >= priceRange.min && product.price <= priceRange.max;
  //   }

  //   let isColorMatched = true;
  //   if (color) {
  //     isColorMatched = product.variation.some((item) => item.color === color);
  //   }

  //   let isBrandMatched = true;
  //   if (brand) {
  //     isBrandMatched = product.brand === brand;
  //   }

  //   return (
  //     isShowOnlySaleMatched &&
  //     isDatagenderMatched &&
  //     isDataCategoryMatched &&
  //     isDataTypeMatched &&
  //     isTypeMatched &&
  //     isSizeMatched &&
  //     isColorMatched &&
  //     isBrandMatched &&
  //     isPriceRangeMatched
  //   );
  // });

  // Create a copy array filtered to sort
  // let sortedData = [...filteredData];

  // if (sortOption === "soldQuantityHighToLow") {
  //   filteredData = sortedData.sort((a, b) => b.sold - a.sold);
  // }

  // if (sortOption === "discountHighToLow") {
  //   filteredData = sortedData.sort(
  //     (a, b) =>
  //       Math.floor(100 - (b.price / b.originPrice) * 100) -
  //       Math.floor(100 - (a.price / a.originPrice) * 100)
  //   );
  // }

  // if (sortOption === "priceHighToLow") {
  //   filteredData = sortedData.sort((a, b) => b.price - a.price);
  // }

  // if (sortOption === "priceLowToHigh") {
  //   filteredData = sortedData.sort((a, b) => a.price - b.price);
  // }

  // const totalProducts = filteredData.length;
  // const selectedType = type;
  // const selectedSize = size;
  // const selectedColor = color;
  // const selectedBrand = brand;

  // if (filteredData.length === 0) {
  //   filteredData = [
  //     {
  //       id: "no-data",
  //       category: "no-data",
  //       type: "no-data",
  //       name: "no-data",
  //       gender: "no-data",
  //       new: false,
  //       sale: false,
  //       rate: 0,
  //       price: 0,
  //       originPrice: 0,
  //       brand: "no-data",
  //       sold: 0,
  //       quantity: 0,
  //       quantityPurchase: 0,
  //       sizes: [],
  //       variation: [],
  //       thumbImage: [],
  //       images: [],
  //       description: "no-data",
  //       action: "no-data",
  //       slug: "no-data",
  //     },
  //   ];
  // }

  // // Find page number base on filteredData
  // const pageCount = Math.ceil(filteredData.length / productsPerPage);
  // const pageCount=3;

  // If page number 0, set current page = 0
  // if (pageCount === 0) {
  //   setCurrentPage(0);
  // }

  // Get product data for current page
  let currentProducts: ProductType[];

  // if (filteredData.length > 0) {
  //   currentProducts = filteredData.slice(offset, offset + productsPerPage);
  // } else {
  //   currentProducts = [];
  // }

  // const handlePageChange = (selected: number) => {
  //   setCurrentPage(selected);
  // };

  // const handleClearAll = () => {
  //   dataType = null;
  //   setShowOnlySale(false);
  //   setSortOption("");
  //   setType(null);
  //   setSize(null);
  //   setColor(null);
  //   setBrand(null);
  //   setPriceRange({ min: 0, max: 100 });
  //   setCurrentPage(0);
  //   handleType(null);
  // };

  const productsPerPage = 9;
  const pagesVisited = pageNumber * productsPerPage;

  const pageCount = Math.ceil(data.length / productsPerPage);
  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };
  const handleFilterDropdown = (item: any) => {
    setFilterDropDown(item);
  };
  const handleCloseMobileFilters = () => {
    setMobileFilter(false);
  };
  const handleOnClose = () => {
    setSortOption(false);
  };
  const handleOptionSelect = (option: any) => {
    const newCheckedOptions = {
      ...checkedOptions,
      [option]: !checkedOptions[option],
    };
    setCheckedOptions(newCheckedOptions);

    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      setSelectedOptions(
        selectedOptions.filter(
          (selectedOption: any) => selectedOption !== option
        )
      );
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await axios.get<ProductType[]>(
          "http://164.92.120.19/api/getall-products"
        );
        setData(response.data);
      } catch (error) {
        console.log("data is unable to fetch");
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   window.addEventListener("scroll", scrollHeader);

  //   return () => {
  //     window.removeEventListener("scroll", scrollHeader);
  //   };
  // }, []);
  return (
    <>
      <div className="shop-product breadcrumb1 sm:py-10 lg:py-0">
        <div className="container">
          <div className="flex max-md:flex-wrap max-md:flex-col-reverse gap-y-8 ">
            <div
              className={`sidebar lg:w-4/3 md:w-1/3 w-full md:pr-12 lg:block hidden`}
            >
              <div
                className={`filter-type pb-8 border-line h-[550px] no-scrollbar overflow-y-auto `}
              >
                <div className="heading6 border-b-2">FILTER BY</div>
                <div className="mt-5">
                  <p className="heading7">Applied Filters</p>
                </div>
                <div>
                  {filters.map((filter: any) => (
                    <div key={1} className="bg-red">
                      {filter}
                    </div>
                  ))}
                </div>

                <div className="list-type mt-4">
                  {Filter.map((item, index) => (
                    <div
                      key={index}
                      className={`item cursor-pointer`}
                      onClick={() => handleFilterDropdown(item.title)}
                    >
                      <div className="text-secondary flex justify-between has-line-before cursor-pointer hover:text-black  capitalize">
                        <p className="text-lg font-semibold">{item.title}</p>

                        <p className="mt-1">
                          <Icon.CaretDown weight="fill" />
                        </p>
                      </div>
                      {/* <div className='text-secondary2'>
                                                ({data.filter(dataItem => dataItem.type === item && dataItem.category === 'fashion').length})
                       </div> */}
                      {filterDropDown === item.title ? (
                        <div>
                          {item.options.map((option, index) => (
                            <div key={option}>
                              <input
                                type="checkbox"
                                id={option}
                                checked={checkedOptions[option]}
                                onChange={() => handleOptionSelect(option)}
                              />
                              <label className="ml-2" htmlFor={option}>
                                {option}
                              </label>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                  <div></div>
                </div>
              </div>
              {/* <div className="filter-size pb-8 border-b border-line mt-8">
                                <div className="heading6">Size</div>
                                <div className="list-size flex items-center flex-wrap gap-3 gap-y-4 mt-4">
                                    {
                                        ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'].map((item, index) => (
                                            <div
                                                key={index}
                                                className={`size-item text-button w-[44px] h-[44px] flex items-center justify-center rounded-full border border-line ${size === item ? 'active' : ''}`}
                                                onClick={() => handleSize(item)}
                                            >
                                                {item}
                                            </div>
                                        ))
                                    }
                                    <div
                                        className={`size-item text-button px-4 py-2 flex items-center justify-center rounded-full border border-line ${size === 'freesize' ? 'active' : ''}`}
                                        onClick={() => handleSize('freesize')}
                                    >
                                        Freesize
                                    </div>
                                </div>
                            </div>
                            <div className="filter-price pb-8 border-b border-line mt-8">
                                <div className="heading6">Price Range</div>
                                <Slider
                                    range
                                    defaultValue={[0, 100]}
                                    min={0}
                                    max={100}
                                    onChange={handlePriceChange}
                                    className='mt-5'
                                />
                                <div className="price-block flex items-center justify-between flex-wrap mt-4">
                                    <div className="min flex items-center gap-1">
                                        <div>Min price:</div>
                                        <div className='price-min'>$
                                            <span>{priceRange.min}</span>
                                        </div>
                                    </div>
                                    <div className="min flex items-center gap-1">
                                        <div>Max price:</div>
                                        <div className='price-max'>$
                                            <span>{priceRange.max}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="filter-color pb-8 border-b border-line mt-8">
                                <div className="heading6">colors</div>
                                <div className="list-color flex items-center flex-wrap gap-3 gap-y-4 mt-4">
                                    <div
                                        className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line ${color === 'pink' ? 'active' : ''}`}
                                        onClick={() => handleColor('pink')}
                                    >
                                        <div className="color bg-[#F4C5BF] w-5 h-5 rounded-full"></div>
                                        <div className="caption1 capitalize">pink</div>
                                    </div>
                                    <div
                                        className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line ${color === 'red' ? 'active' : ''}`}
                                        onClick={() => handleColor('red')}
                                    >
                                        <div className="color bg-red w-5 h-5 rounded-full"></div>
                                        <div className="caption1 capitalize">red</div>
                                    </div>
                                    <div
                                        className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line ${color === 'green' ? 'active' : ''}`}
                                        onClick={() => handleColor('green')}
                                    >
                                        <div className="color bg-green w-5 h-5 rounded-full"></div>
                                        <div className="caption1 capitalize">green</div>
                                    </div>
                                    <div
                                        className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line ${color === 'yellow' ? 'active' : ''}`}
                                        onClick={() => handleColor('yellow')}
                                    >
                                        <div className="color bg-yellow w-5 h-5 rounded-full"></div>
                                        <div className="caption1 capitalize">yellow</div>
                                    </div>
                                    <div
                                        className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line ${color === 'purple' ? 'active' : ''}`}
                                        onClick={() => handleColor('purple')}
                                    >
                                        <div className="color bg-purple w-5 h-5 rounded-full"></div>
                                        <div className="caption1 capitalize">purple</div>
                                    </div>
                                    <div
                                        className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line ${color === 'black' ? 'active' : ''}`}
                                        onClick={() => handleColor('black')}
                                    >
                                        <div className="color bg-black w-5 h-5 rounded-full"></div>
                                        <div className="caption1 capitalize">black</div>
                                    </div>
                                    <div
                                        className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line ${color === 'white' ? 'active' : ''}`}
                                        onClick={() => handleColor('white')}
                                    >
                                        <div className="color bg-[#F6EFDD] w-5 h-5 rounded-full"></div>
                                        <div className="caption1 capitalize">white</div>
                                    </div>
                                </div>
                            </div> */}
              {/* <div className="filter-brand mt-8">
                                <div className="heading6">Brands</div>
                                <div className="list-brand mt-4">
                                    {['adidas', 'hermes', 'zara', 'nike', 'gucci'].map((item, index) => (
                                        <div key={index} className="brand-item flex items-center justify-between">
                                            <div className="left flex items-center cursor-pointer">
                                                <div className="block-input">
                                                    <input
                                                        type="checkbox"
                                                        name={item}
                                                        id={item}
                                                        checked={brand === item}
                                                        onChange={() => handleBrand(item)} />
                                                    <Icon.CheckSquare size={20} weight='fill' className='icon-checkbox' />
                                                </div>
                                                <label htmlFor={item} className="brand-name capitalize pl-2 cursor-pointer">{item}</label>
                                            </div>
                                            <div className='text-secondary2'>
                                                ({data.filter(dataItem => dataItem.brand === item && dataItem.category === 'fashion').length})
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div> */}
            </div>
            <div className="fixed bg-[#e26178] bottom-0 left-0 z-10 w-[100%] lg:hidden block h-[52px]">
              <div className="flex justify-center align-middle mt-4 text-white">
                <div
                  className="mr-5"
                  onClick={() => setSortOption(!sortOption)}
                >
                  SortBy
                </div>
                <div
                  className="flex"
                  onClick={() => setMobileFilter(!mobileFilter)}
                >
                  <p>Filter </p>
                </div>
              </div>
            </div>
            {sortOption && (
              <SortBy visible={sortOption} onClose={handleOnClose} />
            )}
            {mobileFilter && (
              <div className="fixed inset-0 bg-white z-10 h-[100vh] ">
                <div className="mt-24 p-4">
                  <Icon.X size={25} onClick={() => setMobileFilter(false)} />
                  <div className="h-[700px] overflow-y-auto no-scrollbar">
                    <div className="mt-5">
                      <p className="heading7">Filter</p>
                    </div>
                    <div className="list-type mt-4">
                      {Filter.map((item, index) => (
                        <div
                          key={index}
                          className={`item cursor-pointer`}
                          onClick={() => handleFilterDropdown(item.title)}
                        >
                          <div className="text-secondary flex justify-between has-line-before cursor-pointer hover:text-black  capitalize">
                            <p className="text-lg font-semibold">
                              {item.title}
                            </p>

                            <p className="mt-1">
                              <Icon.CaretDown weight="fill" />
                            </p>
                          </div>
                          {filterDropDown === item.title ? (
                            <div>
                              {item.options.map((option, index) => (
                                <div key={option}>
                                  <input
                                    type="checkbox"
                                    id={option}
                                    checked={checkedOptions[option]}
                                    onChange={() => handleOptionSelect(option)}
                                  />
                                  <label className="ml-2" htmlFor={option}>
                                    {option}
                                  </label>
                                </div>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="list-product-block lg:w-3/4 md:w-2/3 w-full md:pl-3 h-[650px] overflow-y-auto no-scrollbar">
              {/* <div className="filter-heading flex items-center justify-between gap-5 flex-wrap">
                                 <div className="left flex has-line items-center flex-wrap gap-5">
                                    <div className="choose-layout flex items-center gap-2">
                                        <div className="item three-col w-8 h-8 border border-line rounded flex items-center justify-center cursor-pointer active">
                                            <div className='flex items-center gap-0.5'>
                                                <span className='w-[3px] h-4 bg-secondary2 rounded-sm'></span>
                                                <span className='w-[3px] h-4 bg-secondary2 rounded-sm'></span>
                                                <span className='w-[3px] h-4 bg-secondary2 rounded-sm'></span>
                                            </div>
                                        </div>
                                        <Link href={'/shop/sidebar-list'} className="item row w-8 h-8 border border-line rounded flex items-center justify-center cursor-pointer">
                                            <div className='flex flex-col items-center gap-0.5'>
                                                <span className='w-4 h-[3px] bg-secondary2 rounded-sm'></span>
                                                <span className='w-4 h-[3px] bg-secondary2 rounded-sm'></span>
                                                <span className='w-4 h-[3px] bg-secondary2 rounded-sm'></span>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="check-sale flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            name="filterSale"
                                            id="filter-sale"
                                            className='border-line'
                                            onChange={handleShowOnlySale}
                                        />
                                        <label htmlFor="filter-sale" className='cation1 cursor-pointer'>Show only products on sale</label>
                                    </div>
                                </div> 
                                <div className="right flex items-center gap-3">
                                    <div className="select-block relative">
                                        <select
                                            id="select-filter"
                                            name="select-filter"
                                            className='caption1 py-2 pl-3 md:pr-20 pr-10 rounded-lg border border-line'
                                            onChange={(e) => { handleSortChange(e.target.value) }}
                                            defaultValue={'Sorting'}
                                        >
                                            <option value="Sorting" disabled>Sorting</option>
                                            <option value="soldQuantityHighToLow">Best Selling</option>
                                            <option value="discountHighToLow">Best Discount</option>
                                            <option value="priceHighToLow">Price High To Low</option>
                                            <option value="priceLowToHigh">Price Low To High</option>
                                        </select>
                                        <Icon.CaretDown size={12} className='absolute top-1/2 -translate-y-1/2 md:right-4 right-2' />
                                    </div>
                                </div>
                            </div> */}

              {/* <div className="list-filtered flex items-center gap-3 mt-4">
                <div className="total-product">
                                    {totalProducts}
                                    <span className='text-secondary pl-1'>Products Found</span>
                </div>
                <div>
                    <p className="text-2xl">Earring</p>
                </div>
                {(selectedType ||
                  selectedSize ||
                  selectedColor ||
                  selectedBrand) && (
                  <>
                    <div className="list flex items-center gap-3">
                      <div className="w-px h-4 bg-line"></div>
                      {selectedType && (
                        <div
                          className="item flex items-center px-2 py-1 gap-1 bg-linear rounded-full capitalize"
                          onClick={() => {
                            setType(null);
                          }}
                        >
                          <Icon.X className="cursor-pointer" />
                          <span>{selectedType}</span>
                        </div>
                      )}
                      {selectedSize && (
                        <div
                          className="item flex items-center px-2 py-1 gap-1 bg-linear rounded-full capitalize"
                          onClick={() => {
                            setSize(null);
                          }}
                        >
                          <Icon.X className="cursor-pointer" />
                          <span>{selectedSize}</span>
                        </div>
                      )}
                      {selectedColor && (
                        <div
                          className="item flex items-center px-2 py-1 gap-1 bg-linear rounded-full capitalize"
                          onClick={() => {
                            setColor(null);
                          }}
                        >
                          <Icon.X className="cursor-pointer" />
                          <span>{selectedColor}</span>
                        </div>
                      )}
                      {selectedBrand && (
                        <div
                          className="item flex items-center px-2 py-1 gap-1 bg-linear rounded-full capitalize"
                          onClick={() => {
                            setBrand(null);
                          }}
                        >
                          <Icon.X className="cursor-pointer" />
                          <span>{selectedBrand}</span>
                        </div>
                      )}
                    </div>
                    <div
                      className="clear-btn flex items-center px-2 py-1 gap-1 rounded-full border border-red cursor-pointer"
                      onClick={handleClearAll}
                    >
                      <Icon.X
                        color="rgb(219, 68, 68)"
                        className="cursor-pointer"
                      />
                      <span className="text-button-uppercase text-red">
                        Clear All
                      </span>
                    </div>
                  </>
                )}
              </div> */}

              <div className="">
                <p className="text-5xl font-bold">Earring</p>
              </div>
              <div className="flex justify-between mt-5">
                <div className="lg:w-[70%] sm:w-[100%]">
                  Earrings are a form of self-expression. They effortlessly
                  transform an outfit, framing the face with style and grace.
                </div>
                <div className="hidden lg:block">
                  <span
                    className="flex cursor-pointer font-semibold"
                    onClick={() => {
                      setDropdown(!dropdown);
                    }}
                  >
                    <p>Sort By</p>
                    <p className="mt-1 ml-2 cursor-pointer">
                      <Icon.CaretDown weight="fill" />
                    </p>
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap lg:hidden">
                {selectedOptions.map((option: string, index: React.Key) => (
                  <div
                    key={index}
                    className="border border-[#e26178] bg-[#fcf4f6] text-[#e26178] px-[10px] py-[5px] mr-1 mt-1"
                  >
                    {option}
                    <button
                      className="ml-2 align-middle mb-1"
                      onClick={() => handleOptionSelect(option)}
                    >
                      <Icon.X size={20} />
                    </button>
                  </div>
                ))}
              </div>
              {dropdown && (
                <div className="lg:flex justify-between mt-3 hidden">
                  <p className="text-lg font-semibold cursor-pointer mr-2">
                    Hoops
                  </p>
                  <p className="text-lg font-semibold cursor-pointer mr-2">
                    Studs
                  </p>
                  <p className="text-lg font-semibold cursor-pointer mr-2">
                    Drops
                  </p>
                  <p className="text-lg font-semibold cursor-pointer mr-2">
                    Jhumkas
                  </p>
                  <p className="text-lg font-semibold cursor-pointer mr-2">
                    Danglers
                  </p>
                  <p className="text-lg font-semibold cursor-pointer mr-2">
                    EarCuffs
                  </p>
                  <p className="text-lg font-semibold cursor-pointer mr-2">
                    Pearls
                  </p>
                  <p className="text-lg font-semibold cursor-pointer mr-2">
                    Chandbali
                  </p>
                </div>
              )}

              <div className="list-product hide-product-sold grid lg:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[40px] mt-7">
                {/*   <div key={item.ProductID} className="no-data-product">
                     No products match the selected criteria.
                  </div> */}

                {data
                  .slice(pagesVisited, pagesVisited + productsPerPage)
                  .map((item: any) => (
                    <Product key={item.productId} data={item} />
                  ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            {pageCount > 1 && (
              <div className="list-pagination flex items-center md:mt-10 mt-7">
                <ReactPaginate
                  previousLabel={"<"}
                  nextLabel={">"}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"pagination"}
                  activeClassName={"active"}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopBreadCrumb1;
