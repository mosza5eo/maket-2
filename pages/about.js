import styles from "@/styles/Product.module.css";
import Image from "next/image";
import Head from "next/head";
import React from "react";
import { Box, Button, Grid } from "@mui/material";
import ShoppingCard from "@/components/ShoppingCart";
import { yellow } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "@/store/slices/cartSlice";
import SaveCartToJson from "@/components/SaveCartToJson";
import Layout from "@/components/Layout";


export default function About() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  
  return (
    <>
      <Layout>
        <Box>
          <Box
            sx={{ m: 5, backgroundColor: "#f7f7f7" }}
            height={"auto"}
            className={styles.container}
          >
            <Box sx={{ display: "flex", marginLeft: "47%" }}>
              <p>ตะกร้าสินค้า</p>
            </Box>
            <Grid container>
              <Grid sm={10} sx={{ margin: 2 }}>
                <SaveCartToJson />
              </Grid>
              <Grid sm={1} sx={{ margin: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    marginLeft: "44%",
                    backgroundColor: "#CC0000",
                    borderRadius: 4,
                    boxShadow: "0 2px 10px 0 #FF3300",
                  }}
                >
                  <Button
                    sx={{
                      backgroundColor: "#FF3333",
                      color: "#DCDCDC",
                      borderRadius: 4,
                    }}
                    onClick={handleClearCart}
                  >
                    clean
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Box>
              <Box className={styles.container}>
                {cart.map((item) => (
                  <ShoppingCard key={item.id} products={item} />
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Layout>
    </>
  );
}
