import { Box, Grid, Rating, TextField, Typography } from "@mui/material";
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const handleImageNavigation = (direction) => {
    if (direction === "left") {
      setCurrentImageIndex(
        (
          prevIndex //prevIndex จะถูกกำหนดค่าทุกครั้งที่ผู้ใช้กดปุ่มเปลี่ยนรูปภาพ
        ) => (prevIndex > 0 ? prevIndex - 1 : product.images.length - 1) //โดยลดค่าลง 1 ถ้าค่า prevIndex ยังไม่ถึง 0 ให้ลดลง 1 ถ้าถึง 0 ให้กลับมาที่ค่าสูงสุดที่อาร์เรย์
      );
    } else if (direction === "right") {
      setCurrentImageIndex(
        (prevIndex) =>
          prevIndex < product.images.length - 1 ? prevIndex + 1 : 0 // โดยเพิ่มค่าลง 1 ถ้าค่า prevIndex ยังไม่ถึงค่าสูงสุดที่อาร์เรย์ ถ้าถึงค่าสูงสุด ให้กลับมาที่ 0
      );
    }
  };

  const handleQuantityChange = (event) => {
  const value = parseInt(event.target.value); // แปลงค่าที่รับเข้ามาให้เป็นตัวเลข

  // ตรวจสอบว่าค่าที่รับเข้ามาเกินค่าสูงสุดที่เป็นไปได้หรือไม่
  if (value > product.stock) {
    setQuantity(product.stock); // กำหนดค่าใน state เป็นค่าสูงสุดที่เป็นไปได้
  } else {
    setQuantity(value); // กำหนดค่าใน state เป็นค่าที่รับเข้ามา
  }
};

  const handleDecreaseQuantity = () => {
    if (parseInt(quantity) > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    if (parseInt(quantity) < product.stock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

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
            <Grid sm={1}>
              <Box
                sx={{ display: "flex", justifyContent: "right", marginTop: 20 }}
              >
                <button
                  onClick={() => handleImageNavigation("left")}
                  className={styles.btnPrevIndexImg}
                >
                  {"◀"}
                </button>
              </Box>
            </Grid>
            <Grid sm={3} sx={{ padding: 3 }}>
              <Box
                sx={{ m: 1 }}
                marginTop={5}
                display="flex"
                justifyContent="center"
                height={"300px"}
              >
                <Avatar
                  src={product.images[currentImageIndex]}
                  alt={product.title}
                  sx={{ width: "300px", height: "auto" }}
                  variant="square"
                  className={styles.fitImg}
                />
              </Box>
            </Grid>
            <Grid sm={1}>
              <Box
                sx={{ display: "flex", justifyContent: "left", marginTop: 20 }}
              >
                <button
                  onClick={() => handleImageNavigation("right")}
                  className={styles.btnPrevIndexImg}
                >
                  {"▶"}
                </button>
              </Box>
            </Grid>

            <Grid sm={7}>
              <Grid container spacing={1} m={1}>
                <Grid sm={12}>
                  <Box>
                    <h2 className={styles.textOverflow}>
                      {product.title} : {product.description}
                    </h2>
                  </Box>
                </Grid>
                <Grid sm={12}>
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
                <Grid sm={2}>
                  <p> Brand: {product.brand}</p>
                </Grid>
                <Grid sm={10}>
                  <p> Category: {product.category}</p>
                </Grid>
                <Grid sm={11}>
                  <Box sx={{ backgroundColor: "black" }} height={1.4}></Box>
                </Grid>
                <Grid sm={10}>
                  <Box>
                    <Grid container>
                      <Grid sm={1.3}>
                        <h1 className={styles.price}>$ {product.price}</h1>
                      </Grid>
                      <Grid sm={2.1}>
                        <h2 className={styles.discountPercentage}>
                          ได้ส่วนลด {product.discountPercentage} %
                        </h2>
                      </Grid>
                      <Grid sm={0.5}></Grid>
                      <Grid sm={3} sx={{ marginTop: 1.8 }}>
                        <p className={styles.fontStock}>
                          มีสินค้าทั้งหมด {product.stock} ชิ้น
                        </p>
                      </Grid>
                    </Grid>

                    <Grid sm={12}>
                      <Box
                        marginLeft={7}
                        sx={{
                          display: "flex",
                          justifyContent: "left",

                          height: "40px",
                        }}
                      >
                        <Box
                          sx={{
                            marginRight: 5,
                            marginBottom: 5,
                            display: "flex",
                            justifyContent: "left",
                          }}
                        >
                          <p className={styles.fontStock}>จำนวน</p>
                        </Box>
                        <button
                          onClick={handleDecreaseQuantity}
                          className={styles.btnQuantity}
                        >
                          -
                        </button>
                        <Box width={80}>
                          <TextField
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            size="small"
                            inputProps={{
                              max: product.stock, // กำหนดค่าสูงสุดในการใส่ได้ให้เป็นค่า product.stock
                            }}
                          />
                        </Box>

                        <button
                          onClick={handleIncreaseQuantity}
                          className={styles.btnQuantity}
                        >
                          +
                        </button>
                      </Box>
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
