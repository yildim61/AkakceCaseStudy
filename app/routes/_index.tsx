import type { MetaFunction } from "@remix-run/node";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Carousel from "../components/Carousel";
import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Akakce Study Case" },
    { name: "description", content: "Akakce Study Case" },
  ];
};

export type Product = {
  code: number;
  name: string;
  imageUrl: string;
  dropRatio: number;
  price: number;
  countOfPrices: number;
  followCount: number;
  url: string;
};

export type ProductList = {
  horizontalProductList: Product[];
  productList: Product[];
  nextUrl: string;
};

export const loader: LoaderFunction = async () => {
  const res = await fetch("https://mock.akakce.dev/page.json");
  const data = await res.json();

  return Response.json(data);
};

export default function Index() {
  const navigate = useNavigate();
  const data = useLoaderData<ProductList>();
  const [horizontalProductList, setHorizontalProductList] = useState<Product[]>(
    []
  );
  const [productList, setProductList] = useState<Product[]>([]);
  const [nextUrl, setNextUrl] = useState("");

  useEffect(() => {
    setHorizontalProductList(data.horizontalProductList);
    setProductList(data.productList);
    setNextUrl(data.nextUrl);
  }, [data]);

  const handleNextPage = async () => {
    const res = await fetch(nextUrl);
    const data = await res.json();
    setProductList(preview => [
      ...preview,
      ...data.productList.map((product: Product) => product),
    ]);
    setNextUrl(data?.nextUrl ?? null);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="max-w-[50%]">
        <Carousel slides={horizontalProductList}></Carousel>
      </div>
      <div className="w-1/2 grid grid-cols-2 shadow-lg p-10 gap-4">
        {productList.map((product, index) => (
          <div
            className="w-full mx-auto flex-shrink-0 flex-col justify-center items-center shadow-lg p-4 cursor-pointer"
            key={index}
            onClick={() => {
              navigate(`product/${product.code}`);
            }}
          >
            <div className="w-full flex items-center">
              <img
                src={product?.imageUrl}
                alt={product?.name}
                className="!h-32 !object-cover mx-auto"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">{product?.name}</h3>
              <p className="text-gray-500 mt-2">
                Price: ₺{product?.price?.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
        <div className="w-full flex justify-center col-span-2">
          {nextUrl !== "" ? (
            <button onClick={handleNextPage}>Daha fazla ürün</button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
