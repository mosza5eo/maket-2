import styles from "@/styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import debug from "./products/debug";
import { Box } from "@mui/material";
import Layout from "@/components/Layout";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useHistory from "react-router-dom";
import Login from "./login";

export default function Home() {
  // const {user} = useSelector((state => state.auth))
  // const history = useHistory()

  // useEffect(() => {
  //   if(!user) history.push('/login/login')
  //   else history.push("/");
  // }, [user])

  return (
    <>
      <Login/>
    </>
  );
}
