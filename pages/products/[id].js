import {
  Box,
  Button,
  Grid,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { Avatar } from "@mui/material";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "@/styles/Detail.module.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CustomPopup from "@/components/CustomPopup";
import Layout from "@/components/Layout";

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
///////////////////////////////////////////
export default function ProductDetail({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1); //เริ่มต้นจำนวนชิ้นของสินค้าที่1ชิน
  const [open, setOpen] = React.useState(false);
  const [visibility, setVisibility] = useState(false);
  ////
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

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
    if (parseInt(quantity) > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    if (parseInt(quantity) < product.stock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };
  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    setOpen(true);
    setVisibility(false);
  };

  const popupOpenHandler = () => {
    setVisibility(true);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const popupCloseHandler = () => {
    setVisibility(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Layout>
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
                  sx={{
                    display: "flex",
                    justifyContent: "right",
                    marginTop: 20,
                  }}
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
                  {currentImageIndex === 0 && (
                    <Avatar
                      src="/img/FD.png"
                      alt={product.title}
                      variant="square"
                      style={{
                        width: "60px",
                        height: "50px",
                        position: "absolute",
                        top: "54.02%",
                        left: "13.68%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 1,
                      }}
                      className={styles.fitImg}
                    />
                  )}
                </Box>
              </Grid>
              <Grid sm={1}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    marginTop: 20,
                  }}
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
                        <Grid sm={2.3}>
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
                          <Button
                            variant="contained"
                            onClick={handleDecreaseQuantity}
                            color="warning"
                          >
                            -
                          </Button>
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

                          <Button
                            variant="contained"
                            onClick={handleIncreaseQuantity}
                            color="warning"
                          >
                            +
                          </Button>
                        </Box>
                      </Grid>
                      <Grid sm={12}>
                        <Box padding={5}>
                          <Button
                            color="warning"
                            variant="outlined"
                            onClick={popupOpenHandler}
                          >
                            เพิ่มสินค้าไปยังรถเข็น
                          </Button>
                          <Snackbar
                            open={open}
                            autoHideDuration={6000}
                            onClose={handleClose}
                          >
                            <Alert
                              onClose={handleClose}
                              severity="success"
                              sx={{ width: "100%" }}
                            >
                              สินค้าอยู่ในตะกร้าแล้ว
                            </Alert>
                          </Snackbar>

                          <CustomPopup
                            onClose={popupCloseHandler}
                            show={visibility}
                            title="ยืนยันการซื้อ"
                          >
                            <h1>{product.title}</h1>
                            <Box
                              sx={{
                                // justifyContent: "end",
                                display: "flex",
                                backgroundColor: "#009933",
                                marginLeft: "85.3%",
                                borderRadius: 4,
                                boxShadow: "0 2px 10px 0 #33CC66",
                              }}
                            >
                              <Button
                                sx={{
                                  backgroundColor: "#33CC00",
                                  borderRadius: 4,
                                  color: "#DCDCDC",
                                }}
                                onClick={handleAddToCart}
                              >
                                ตกลง
                              </Button>
                            </Box>
                          </CustomPopup>
                        </Box>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Layout>
    </>
  );
}
