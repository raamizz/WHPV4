import React from "react";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { ArrowRight } from "@phosphor-icons/react";

const GoldScheme = () => {
  return (
    <>
      <div className="mt-5 mb-12  text-rose-950">
        <div className="lg:pl-7 grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-6 ">
          <div className="px-2">
            <h2 className="font-semibold">GOLD SCHEME</h2>
            <h1 className="py-4 lg:text-6xl md:text-4xl text-2xl">
              It's time to invest <br /> in a Golden Future
            </h1>
            <p className="text-gray-400">
              Invest in timeless wealth with our Gold Scheme, catering to a wide
              range of budgets. Making gold investment accessible to everyone.
              Watch your savings grow as you accumulate one of the most enduring
              assets.
            </p>
            <a href="/product-page">
              <button
                type="button"
                className="text-white bg-gradient-to-br bg-pink-700 hover:bg-pink-600 focus:ring-4 focus:outline-none font-medium text-sm px-12 py-3.5 text-center mt-6 mb-20"
              >
                Know More
              </button>
            </a>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Image
                src={"/images/other/BenefitBangle.jpg"}
                alt="Benefit"
                width={400}
                height={100}
                className="w-full sm:w-1/2"
              />
              <div className="flex flex-col justify-between">
                <h1 className="text-xl font-semibold">GOLD ACCOUNT</h1>
                <p className="text-sm">
                  Open a WHP Gold Scheme account with an amount as low as ₹2000.
                  Make regular installments and get discounts.
                </p>
                <h1 className="text-red underline">Benefit Calculator</h1>
              </div>
            </div>
          </div>
          <Image
            src={"/images/other/GoldScheme.jpg"}
            width={1000}
            height={800}
            alt="goldscheme"
          />
        </div>
      </div>
    </>
  );
};

export default GoldScheme;

// import React from "react";
// import Image from "next/image";
// import * as Icon from "@phosphor-icons/react/dist/ssr";
// import { ArrowRight } from "@phosphor-icons/react";

// const GoldScheme = () => {
//   return (
//     <>
//       {/* <div className="flex flex-col lg:flex-row">
//         <div className="w-full lg:w-1/2 h-full lg:h-auto text-red-950">
//           <div className="flex flex-col justify-start h-full py-10 px-4 gap-32 ">
//             <div className="flex flex-wrap w-full justify-between">
//               <h3 className="font-semibold text-lg">Gold Schemes</h3>
//               <a
//                 href="/benefits"
//                 className="text-red-600 underline flex items-center"
//               >
//                 Benefit Calculator
//                 <Icon.ArrowRight />
//               </a>
//             </div>
//             <div className="flex flex-col gap-4">
//               <h1 className="text-5xl font-medium">
//                 Its time to invest in a Golden Future
//               </h1>
//               <p className="font-medium text-red-950">
//                 Invest in timeless wealth with our Gold Scheme, catering to a
//                 wide range of budgets, making gold investment accessible to
//                 everyone. Watch your savings grow as you accumulate one of the
//                 most enduring assets
//               </p>
//               <div className="bg-rose-500 mt-10 w-72 p-2 text-white rounded-3xl flex justify-center items-center">
//                 <button>Know More</button>
//                 <Icon.ArrowRight />
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="w-full lg:w-1/2 h-96 lg:h-auto">
//           <div className="">
//             <Image
//               src={"/images/other/GoldScheme2.jpg"}
//               width={1000}
//               height={400}
//               alt="gemstones"
//               className="object-fill w-full h-full "
//             />
//           </div>
//         </div>
//       </div> */}

//       <div className="flex flex-col lg:flex-row ">
//         <div className="w-full h-full lg:w-1/2 lg:h-auto text-red-950">
//           <div className="flex flex-col justify-center h-full py-10 px-4 gap-5">
//             <h2 className="font-semibold text-lg text-red-950">
//               Precious Gemstones
//             </h2>
//             <h1 className="text-5xl font-medium mb-5">
//               9Ratna, Unearth the elegant Radiance
//             </h1>
//             <p className="font-medium mb-5">
//               Discover the allure of gemstone jewellery, where nature`s vibrant
//               palette meets exquisite craftsmanship. Each piece tells a story,
//               adding a touch of color to your style.
//             </p>
//             <div className="flex gap-3">
//               <Image
//                 src={"/images/other/GemStone1.png"}
//                 width={100}
//                 height={200}
//                 className="object-cover rounded-[50px]"
//                 alt="gemtype"
//               />
//               <Image
//                 src={"/images/other/GemStone2.png"}
//                 width={100}
//                 height={200}
//                 className="object-cover rounded-[50px]"
//                 alt="gemtype"
//               />
//               <Image
//                 src={"/images/other/GemStone3.png"}
//                 width={100}
//                 height={200}
//                 className="object-cover rounded-[50px]"
//                 alt="gemtype"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="w-full lg:w-1/2 h-96 lg:h-auto relative ">
//           <Image
//             src={"/images/other/GoldScheme2.jpg"}
//             width={1000}
//             height={400}
//             alt="gemstones"
//             className="object-fill w-full h-full "
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default GoldScheme;
