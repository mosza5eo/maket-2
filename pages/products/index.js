import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Product.module.css";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { yellow } from "@mui/material/colors";
import debug from "./debug";
import ProductCard from "@/components/ProductCard";
//https://dummyjson.com/products?limit=12

export async function getStaticProps() {
  const res = await fetch("https://dummyjson.com/products?limit=30");
  const data = await res.json();
  //  console.log(data.products);
  // ดึง category ใหม่จากข้อมูลสินค้า
  const categories = [
    ...new Set(data.products.map((product) => product.category)), //ใช้ Set เพื่อกำจัดค่าซ้ำในอาร์เรย์ array และใช้ spread operator (...) เพื่อแปลง Set กลับเป็นอาร์เรย์
  ];

  return {
    props: { products: data.products, categories },
  };
}
///////////////////////////////////////////////////////////
export default function Index({ products, categories }) {
  const [sortOrder, setSortOrder] = useState("lowPrice");
  const [priceFilter, setPriceFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    handleSearch(); //เรียกใช้ก่อนเพื่อให้filteredProductsถูกเรียกใช้แล้วไปแสดงผล
  }, [priceFilter, searchTerm, sortOrder]); //เหมือนกัน

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    handleSearch(); // เรียกใช้ handleSearch เมื่อมีการเปลี่ยนแปลงค่าในช่องค้นหา
  };

  const handlePriceChange = (event) => {
    const input = event.target.value;
    const numericInput = input.replace(/\D/g, "");
    setPriceFilter(numericInput);
    handleSearch(); // เรียกใช้ handleSearch เมื่อมีการเปลี่ยนแปลงราคา
  };

  const toggleSortHighOrder = () => {
    setSortOrder("highPrice");
    console.log(sortOrder);
  };

  const toggleSortLowOrder = () => {
    setSortOrder("lowPrice");
    console.log(sortOrder);
  };

  const sortedProducts = products.slice().sort((a, b) => {
    if (sortOrder === "lowPrice") {
      //ถ้าน้อย
      return a.price - b.price;
    } else {
      return b.price - a.price; // ดำเนินการเรียงลำดับราคาของสินค้า
    }
  });

  const handleSearch = () => {
    const filteredProducts = sortedProducts.filter((product) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase(); //
      const lowerCaseTitle = product.title.toLowerCase();
      const lowerCaseCategory = product.category.toLowerCase();
      return (
        (lowerCaseTitle.includes(lowerCaseSearchTerm) ||
          lowerCaseCategory.includes(lowerCaseSearchTerm)) &&
        (!priceFilter ||
          (sortOrder === "lowPrice" &&
            product.price <= parseInt(priceFilter)) ||
          (sortOrder === "highPrice" && product.price >= parseInt(priceFilter)))
      );
    });
    setFilteredProducts(
      filteredProducts.length > 0 ? filteredProducts : sortedProducts
    );
  };

  return (
    <>
      <Box sx={{ m: 5, backgroundColor: "#f7f7f7" }} height={1550}>
        <Head>
          <title>สินค้าทั้งหมด | moss</title>
          <meta name="keywords" content="ขายของ,ร้านขายของ,ขายสินค้า" />
        </Head>

        <Box>
          <Grid container>
            <Grid sm={12}>
              <Box
                marginLeft={7}
                sx={{ display: "flex", justifyContent: "right" }}
                // className={styles.figSearchButton}
              >
                <p className={styles.fontH} sx={{ display: "flex" }}>
                  ค้นหาสินค้า
                </p>

                <Button onClick={handleSearch} className={styles.searchButton}>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="ค้นหาสินค้า"
                  />
                  <Image
                    src="https://cdn.icon-icons.com/icons2/1129/PNG/512/searchmagnifierinterfacesymbol1_79893.png"
                    alt="Search Icon"
                    className={styles.searchIcon}
                    width="16"
                    height="16"
                  />
                </Button>
              </Box>
            </Grid>
            <Grid container>
              {/* <Grid sm={12}>
                <Box height={60} sx={{backgroundColor:yellow[500]}}>

                </Box>
              </Grid> */}
              <Grid sm={12}>
                <Box
                  marginLeft={7}
                  sx={{ display: "flex", justifyContent: "right" }}
                >
                  <p className={styles.fontH}>ค้นหาด้วยราคา</p>
                  <Button
                    onClick={handleSearch}
                    className={styles.searchButton}
                  >
                    <input
                      type="text"
                      value={priceFilter}
                      height={200}
                      onChange={handlePriceChange}
                      placeholder="ราคา"
                      display="flex"
                    />
                    <Box onClick={handleSearch}>
                      <Box
                        onClick={toggleSortHighOrder}
                        width={20}
                        className={styles.actionHighAndLow}
                      >
                        ↑
                      </Box>
                      <Box
                        onClick={toggleSortLowOrder}
                        width={20}
                        className={styles.actionHighAndLow}
                      >
                        ↓
                      </Box>
                    </Box>
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Grid sm={12}>
              <Box sx={{ marginLeft: 2 }}>
                <h1 className={styles.fontHeadCategory}>หมวดหมู่</h1>
              </Box>
            </Grid>
            <Grid sm={12}>
              <Grid container>
                {categories.map((category) => (
                  <Grid key={category} sm={2} className={styles.buttonCategory}>
                    <Link href={`/products/categorys/${category}`}>
                      <Card sx={{ maxWidth: 250 }} className={styles.fitImg}>
                        {/* ... */}
                        <CardContent
                          sx={{ justifyContent: "center", display: "flex" }}
                        >
                          <Typography>{category}</Typography>
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Box className={styles.container}>
            {filteredProducts.map((item) => (
              <ProductCard key={item.id} products={item} />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
