import { Box, Grid, Rating, Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "@/styles/Detail.module.css";

export async function getStaticPaths() {
  const res = await fetch("https://dummyjson.com/products?limit=30");
  const data = await res.json();
  const paths = data.products.map((item) => {
    return {
      params: { id: String(item.id) },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const id = params.id;
  const res = await fetch("https://dummyjson.com/products/" + id);
  const data = await res.json();
  return {
    props: { product: data },
  };
}

export default function ProductDetail({ product }) {
  return (
    <>
      <Box
        sx={{ m: 5, backgroundColor: "#f7f7f7" }}
        height={450}
        className={styles.container}
      >
        <Head>
          <title>{product.title}</title>
        </Head>
        <Box className={styles.container}>
          <Grid container spacing={1}>
            <Grid sm={5} sx={{ padding: 3 }}>
              <Box
                sx={{ m: 1 }}
                marginTop={5}
                display="flex"
                justifyContent="center"
                className={styles.fitImg}
              >
                <Avatar
                  src={product.thumbnail}
                  alt={product.title}
                  sx={{ width: "300px", height: "auto" }}
                  variant="square"
                />
              </Box>
            </Grid>

            <Grid sm={7}>
              <Grid container spacing={1} m={1}>
                <Grid item sm={12}>
                  <Box>
                    <h2 className={styles.textOverflow}>
                      {product.title} : {product.description}
                    </h2>
                  </Box>
                </Grid>
                <Grid item sm={12}>
                  <Box>
                    <Typography component="legend">
                      คะแนน: {product.rating}
                    </Typography>
                    <Rating
                      name="half-rating-read"
                      defaultValue={product.rating}
                      precision={0.5}
                      readOnly
                    />
                  </Box>
                </Grid>
                <Grid item sm={2}>
                  <p> Brand: {product.brand}</p>
                </Grid>
                <Grid item sm={10}>
                  <p> Category: {product.category}</p>
                </Grid>
                <Grid item sm={11}>
                  <Box sx={{ backgroundColor: "black" }} height={1.4}></Box>
                </Grid>
                <Grid item sm={10}>
                  <Box>
                    <Grid container>
                      <Grid item>
                        <h1 className={styles.price}>$ {product.price}</h1>
                      </Grid>
                      <Grid item>
                        <h2 className={styles.discountPercentage}>
                          ได้ส่วนลด {product.discountPercentage} %
                        </h2>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
