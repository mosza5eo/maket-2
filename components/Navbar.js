import Link from "next/link";
import Image from "next/image";
import { Box } from "@mui/material";
import * as React from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { useSelector } from "react-redux";


const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function Navbar() {
  const cart = useSelector((state) => state.cart);
  const totalQuantity = cart.length;

  return (
    <nav>
      <Box className="logo">
        <Link href={"/about"}>
          <IconButton aria-label="cart">
            <StyledBadge badgeContent={totalQuantity} color="secondary">
              <Image src="/logo.png" width={50} height={50} alt="logo" />
            </StyledBadge>
          </IconButton>
        </Link>
      </Box>
      <Link href={"/home"}>หน้าแรก</Link>
      <Link href={"/about"}>ตะกร้าสินค้า</Link>
      <Link href={"/products"}>สินค้าทั้งหมด</Link>
    </nav>
  );
}
