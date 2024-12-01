/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Button } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { CiStar } from "react-icons/ci";
import { useNavigate } from "@remix-run/react";

interface ProductItemProps {
  code: string;
}
interface ProductModel {
  badge: string;
  countOfPrices: number;
  freeShipping: boolean;
  imageUrl: string;
  lastUpdate: string;
  mkName: string;
  price: number;
  productName: string;
  rating: number;
  storageOptions: string[];
}

const ProductItem: FC<ProductItemProps> = ({ code }) => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState<ProductModel>();
  const [selectedStorage, setselectedStorage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://mock.akakce.dev/product${code}.json`
        );

        if (response.ok) {
          const data = await response.json();
          setProductData(data);
        }
      } catch (error) {
        console.error("API error:", error);
      }
    };

    fetchData();
  }, [code]);

  const handleStorageChange = (index: number) => {
    setselectedStorage(index);
  };

  return (
    <div className="w-full flex flex-col justify-center align-middle items-center">
      <div className="w-1/3 flex flex-col border shadow-md relative p-5 gap-y-3">
        <div className="text-blue-500">{productData?.mkName}</div>
        <div>{productData?.productName}</div>
        <div className="w-auto bg-yellow-200">{productData?.badge}</div>
        <img
          className="!h-32 !object-cover mx-auto my-10"
          src={productData?.imageUrl}
          alt=""
        />
        <span className="w-full text-center">Kapasite Seçenekleri</span>
        <div className="flex justify-between">
          {productData?.storageOptions.map((storageOption, index) => (
            <div
              className={`${
                selectedStorage === index ? "bg-blue-200" : ""
              } border cursor-pointer rounded-md p-2`}
              key={index}
              onClick={() => handleStorageChange(index)}
            >
              {storageOption}
            </div>
          ))}
        </div>
        <div className="w-full text-center">
          {productData?.price.toLocaleString()}TL
        </div>
        <div className="text-green-600 w-full text-center">
          {productData?.freeShipping ? "Ücretsiz Kargo" : null}
        </div>
        <span className="w-full text-center">
          Last Update : {productData?.lastUpdate}
        </span>
        <div className="absolute flex items-center align-middle top-5 right-5">
          <CiStar />
          {`${productData?.rating}/5`}
        </div>
      </div>
      <div className="my-5 z-30 relative">
        <Button
          className="border rounded-md bg-blue-400 text-white p-3"
          onClick={() => navigate("/")}
        >
          Anasayfa
        </Button>
      </div>
    </div>
  );
};

export default ProductItem;
