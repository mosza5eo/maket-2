import React from "react";
import { Box, Button, Card, Grid } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/ShoppingCart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "@/store/slices/cartSlice";
/////////////////////////////////
export default function ShoppingCard({ products }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleRemoveFromCart = () => {
    const productId = products.id;
    const productIndex = cart.findIndex((item) => item.id === productId);
    if (productIndex !== -1) {
      dispatch(removeFromCart(productId));
    }
  };

  return (
    <Box className={styles.containerdiv}>
      <Card className={styles.BoxShadow}>
        <Box sx={{ backgroundColor: "#fefefe" }} borderRadius={4}>
          <Box padding={0.7} className={styles.fitImg}>
            <Image
              src={products.thumbnail}
              width={285}
              height={285}
              alt={products.title}
            />
          </Box>
          <p className={styles.textOverflow}>{products.description}</p>
          <Grid container>
            <Grid sm={3}>
              <h1 className={styles.price}>{products.price}</h1>
            </Grid>
            <Grid sm={3.5}>
              <h1 className={styles.price}>✘ {products.quantity}</h1>
            </Grid>
            <Grid sm={1}></Grid>
            <Grid sm={4}>
              <h1 className={styles.price}>
                {products.price * products.quantity} $
              </h1>
            </Grid>

            <Grid sm={12}>
              <Box sx={{ padding: 2.4, paddingLeft: 27 }}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleRemoveFromCart}
                >
                  X
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Box>
  );
}
