import { useLoaderData } from "@remix-run/react";
import ProductItem from "~/components/ProductItem";

export const loader = async ({ params }: { params: { code: string } }) => {
  return Response.json(params.code);
};

const Product = () => {
  const data = useLoaderData<string>();
  return <ProductItem code={data} />;
};

export default Product;
