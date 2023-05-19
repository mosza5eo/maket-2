import React from "react";
import { Box, Card, Grid } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Product.module.css";

export default function ProductCard({ products }) {
  return (
    <Box className={styles.containerdiv}>
      <Card className={styles.BoxShadow}>
        <Box sx={{ backgroundColor: "#fefefe" }} borderRadius={4}>
          <Link
            href={"/products/" + products.id}
            as={`/products/${products.id}`}
          >
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
              <Grid sm={1.5}>
                <h1 className={styles.price} key={products.category}>
                  $
                </h1>
              </Grid>
              <Grid sm={8}>
                <h1 className={styles.price}>{products.price}</h1>
              </Grid>

              {/* <h1 className={styles.price}>${item.price}</h1> */}
            </Grid>
          </Link>
        </Box>
      </Card>
    </Box>
  );
}
