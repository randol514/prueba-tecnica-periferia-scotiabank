import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { Button } from "../../../../components/ui/Button";
import type { Product } from "../../../products/types";

interface AddToCartButtonProps {
  product: Product;
}

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  return <Button onClick={handleAdd}>Agregar al carrito</Button>;
};

export default AddToCartButton;
