import styles from "@/styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import debug from "./products/debug";
import { Box } from "@mui/material";
import Layout from "@/components/Layout";

export default function Home() {
  return (
    <>
      <Layout>
        <Head>
          <title>หน้าแรก | moss</title>
          <meta name="keywords" content="ขายของ,ร้านขายของ,ขายสินค้า" />
        </Head>
        <Box className={styles.container}>
          <h1 className={styles.title}>หน้าแรกของเว็บ</h1>
          <Image src="/shopping.svg" width={400} height={400} alt="logo" />
          <p>ยินดีตอนรับเข้าสู่ร้านค้าแห่งนี้</p>
          <Link href="/products" className={styles.btn}>
            ดูสินค้าทั้งหมด
          </Link>
        </Box>
      </Layout>
    </>
  );
}

