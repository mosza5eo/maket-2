import styles from "@/styles/Product.module.css";
import Image from "next/image";
import Head from "next/head";
import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import ShoppingCard from "@/components/ShoppingCart";
import { yellow } from "@mui/material/colors";

export default function About() {
  const cart = useSelector((state) => state.cart);
  return (
    <>
      <Box>
        <Box
          sx={{ m: 5, backgroundColor: "#f7f7f7" }}
          height={"auto"}
          className={styles.container}
        >
          <Box sx={{ display: "flex", marginLeft: "47%" }}>
            <p>ตะกร้าสินค้า</p>
          </Box>
          <Box>
            <Box className={styles.container}>
              {cart.map((item) => (
                <ShoppingCard key={item.id} products={item} />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
