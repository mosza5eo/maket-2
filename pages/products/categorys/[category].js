import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Product.module.css";
import Link from "next/link";
import { Box, Grid } from "@mui/material";

export async function getServerSideProps() {
  const response = await fetch("https://dummyjson.com/products?limit=30");
  const data = await response.json();

  return {
    props: {
      products: data.products,
    },
  };
}

export default function Test({ products }) {
  const router = useRouter();
  const { category } = router.query; //เอาpathมาใช้
  const filteredProducts = products.filter(
    (product) => product.category === category
  );

  // สร้างตัวแปรเพื่อเก็บค่า category ที่เคยแสดงไปแล้ว
  let displayedCategories = [];

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
        {/* <Box marginLeft={7}>
          {filteredProducts.map((item) => (
            <p className={styles.fontH}>{item.category}</p>
          ))}
        </Box> */}
        <Box className={styles.container}>
          {filteredProducts.map((item) => (
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
