// *********************
// Role of the component: products section intended to be on the home page
// Name of the component: ProductsSection.tsx
// Developer: Rajan Singh
// Version: 1.0
// Component call: <ProductsSection slug={slug} />
// Input parameters: no input parameters
// Output: products grid
// *********************

import React from "react";
import ProductItem from "./ProductItem";
import Heading from "./Heading";

const ProductsSection = async () => {
  let products: any[] = [];
  let debugError = "";

  const apiUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://singhtronic-ecommerce.onrender.com";

  try {
    const res = await fetch(`${apiUrl}/api/products`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      debugError = `HTTP ${res.status}: ${res.statusText} from ${apiUrl}/api/products`;
    } else {
      const result = await res.json();
      products = Array.isArray(result) ? result : [];
    }
  } catch (error: any) {
    debugError = `${error?.message || String(error)} (URL: ${apiUrl}/api/products)`;
  }

  return (
    <div className="bg-blue-500 border-t-4 border-white">
      <div className="max-w-screen-2xl mx-auto pt-20">
        <Heading title="FEATURED PRODUCTS" />
        <div className="grid grid-cols-4 justify-items-center max-w-screen-2xl mx-auto py-10 gap-x-2 px-10 gap-y-8 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {products.length > 0 ? (
            products.map((product: any) => (
              <ProductItem key={product.id} product={product} color="white" />
            ))
          ) : (
            <div className="col-span-full text-center text-white py-10">
              <p>No products available at the moment.</p>
              {debugError && (
                <p className="text-sm mt-2 bg-red-800/60 p-2 rounded">
                  Debug: {debugError}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;