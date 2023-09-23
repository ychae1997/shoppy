import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductType } from "../types/productTypes";
import {
  addOrUpdatedCart,
  deletedCart as deleted,
  getCart
} from "../api/firebase";
import { AuthType } from "../types/authTypes";
import { useAuthContext } from "../context/AuthContext";

type cartQueryType = ProductType[] | undefined;

export default function useCarts() {
  const { user } = useAuthContext() as AuthType;
  const uid = user && user.uid;

  const client = useQueryClient();
  const cartQuery = useQuery<cartQueryType>(
    ["carts", uid || ""],
    () => getCart(uid),
    { enabled: !!uid }
  );
  const updatedCart = useMutation(
    (product: ProductType) => addOrUpdatedCart(uid, product),
    { onSuccess: () => client.invalidateQueries(["carts", uid]) }
  );

  const deletedCart = useMutation((id: string) => deleted(uid, id), {
    onSuccess: () => client.invalidateQueries(["carts", uid])
  });

  return { cartQuery, updatedCart, deletedCart };
}
