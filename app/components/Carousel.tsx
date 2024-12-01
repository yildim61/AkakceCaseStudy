/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { FC, useState } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "@remix-run/react";

import { Product } from "~/routes/_index";

interface CarouselProps {
  slides: Product[];
}

const Carousel: FC<CarouselProps> = ({ slides }) => {
  const [current, setCurrent] = useState(0);

  const previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  const nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  return (
    <div className="overflow-hidden relative">
      <div
        className={`flex transition ease-out duration-1000`}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides?.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

      <div className="absolute top-1/2 left-0  justify-between items-center flex text-3xl">
        <button onClick={previousSlide}>
          <BsFillArrowLeftCircleFill />
        </button>
      </div>
      <div className="absolute top-1/2 right-0 justify-between items-center flex text-3xl">
        <button onClick={nextSlide}>
          <BsFillArrowRightCircleFill />
        </button>
      </div>

      <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
        {slides.map((s, i) => {
          return (
            <div
              onClick={() => {
                setCurrent(i);
              }}
              key={"circle" + i}
              className={`rounded-full w-2 h-2 cursor-pointer border  ${
                i == current ? "bg-white" : "bg-blue-500"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};
export function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  return (
    <div
      className="w-full flex-shrink-0 flex justify-center items-center p-4 cursor-pointer z-10"
      onClick={() => {
        navigate(`product/${product.code}`);
      }}
    >
      <img
        src={product?.imageUrl}
        alt={product?.name}
        className="!h-32 !object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-gray-800">{product?.name}</h3>
        <p className="text-gray-500 mt-2">
          Price: ₺{product?.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
export default Carousel;
