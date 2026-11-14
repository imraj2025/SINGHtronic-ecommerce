// *********************
// Role of the component: Showing products on the shop page with applied filter and sort
// Name of the component: Products.tsx
// Developer: Rajan Singh
// Version: 1.0
// Component call: <Products params={params} searchParams={searchParams} />
// Input parameters: { params, searchParams }: { params: { slug?: string[] }, searchParams: { [key: string]: string | string[] | undefined } }
// Output: products grid
// *********************

import React from "react";
import ProductItem from "./ProductItem";

const Products = async ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) => {
  // Support both Next.js 14 objects and Next.js 15/16 Promises
  const resolvedParams = await Promise.resolve(params);
  const resolvedSearchParams = await Promise.resolve(searchParams);

  const inStockNum = resolvedSearchParams?.inStock === "true" ? 1 : 0;
  const outOfStockNum = resolvedSearchParams?.outOfStock === "true" ? 1 : 0;
  const page = resolvedSearchParams?.page
    ? Number(resolvedSearchParams?.page)
    : 1;

  let stockMode: string = "lte";

  if (inStockNum === 1) {
    stockMode = "equals";
  }
  if (outOfStockNum === 1) {
    stockMode = "lt";
  }
if (inStockNum === 1) {
  stockMode = "gte";
}
if (inStockNum === 0 && outOfStockNum === 0) {
  stockMode = "gte";
}

  let products: any[] = [];
const apiUrl = (
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://singhtronic-ecommerce.onrender.com"
  ).replace(/\/+$/, "");

  try {
    const slugFilter =
      resolvedParams?.slug && resolvedParams.slug.length > 0
        ? `filters[category][$equals]=${resolvedParams.slug}&`
        : "";

    const url = `${apiUrl}/api/products?filters[price][$lte]=${
      resolvedSearchParams?.price || 200000
    }&filters[rating][$gte]=${
      Number(resolvedSearchParams?.rating) || 0
    }&filters[inStock][$${stockMode}]=1&${slugFilter}sort=${
      resolvedSearchParams?.sort || "defaultSort"
    }&page=${page}`;

    const res = await fetch(url, {
      cache: "no-store",
    });

    if (res.ok) {
      const result = await res.json();
      products = Array.isArray(result) ? result : [];
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    products = [];
  }

  return (
    <div className="grid grid-cols-3 justify-items-center gap-x-2 gap-y-5 max-[1300px]:grid-cols-3 max-lg:grid-cols-2 max-[500px]:grid-cols-1">
      {products.length > 0 ? (
        products.map((product: any) => (
          <ProductItem key={product.id} product={product} color="black" />
        ))
      ) : (
        <h3 className="text-3xl mt-5 text-center w-full col-span-full max-[1000px]:text-2xl max-[500px]:text-lg">
          No products found for specified query
        </h3>
      )}
    </div>
  );
};

export default Products;