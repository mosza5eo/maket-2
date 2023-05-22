import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Product.module.css";
import Link from "next/link";
import { Box, Grid } from "@mui/material";

export async function getServerSideProps() {
  const response = await fetch("https://dummyjson.com/products?limit=30");
  const data = await response.json();

  const filteredProducts = data.products.filter(
    (product) => product.category === "smartphones"
  );

  return {
    props: {
      products: filteredProducts,
    },
  };
}

export default function Smartphones({ products }) {
  const [sortOrder, setSortOrder] = useState("asc");
  const toggleSortOrder = () => {
    if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder("asc"); // ฟังก์ชันเพื่อเปลี่ยนลำดับการเรียงราคา
    }
  };
  const sortedProducts = products.slice().sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else {
      return b.price - a.price; // ดำเนินการเรียงลำดับราคาของสินค้า
    }
  });
  return (
    <>
      <Box sx={{ m: 5, backgroundColor: "#f7f7f7" }} height={1550}>
        <Head>
          <title>สินค้าทั้งหมด | moss</title>
          <meta name="keywords" content="ขายของ,ร้านขายของ,ขายสินค้า" />
        </Head>
        <Grid>
          <Box height={15}></Box>
        </Grid>
        <Box marginLeft={7}>
          <Grid container>
            <Grid sm={4}>
              <p className={styles.fontH}>Smartphones</p>
            </Grid>
            <Grid sm={7} sx={{ display: "flex", justifyContent: "right" }}>
              <Box marginLeft={7}>
                <p className={styles.fontH}>จัดเรียง</p>
                <button onClick={toggleSortOrder}>
                  {sortOrder === "asc" ? "น้อยไปมาก" : "มากไปน้อย"}
                </button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className={styles.container}>
          {sortedProducts.map((item) => (
            <Box key={item.id} className={styles.containerdiv}>
              <Box className={styles.BoxShadow}>
                <Box sx={{ backgroundColor: "#fefefe" }} borderRadius={4}>
                  <Link href={"/products/" + item.id}>
                    <Box padding={0.7} className={styles.fitImg}>
                      <Image
                        src={item.thumbnail}
                        width={285}
                        height={285}
                        alt={item.title}
                      />
                    </Box>
                    <p className={styles.textOverflow}>{item.description}</p>
                    <Grid container>
                      <Grid sm={1.5}>
                        <h1 className={styles.price}>$</h1>
                      </Grid>
                      <Grid sm={8}>
                        <h1 className={styles.price}>{item.price}</h1>
                      </Grid>

                      {/* <h1 className={styles.price}>${item.price}</h1> */}
                    </Grid>
                  </Link>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
