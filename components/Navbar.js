import Link from "next/link";
import Image from "next/image";
import { Box } from "@mui/material";
export default function Navbar() {
  return (
    <nav>
      <Box className="logo">
        <Link href={"/"}>
          <Image src="/logo.png" width={50} height={50} alt="logo" />
        </Link>
      </Box>
      <Link href={"/"}>หน้าแรก</Link>
      <Link href={"/about"}>เกี่ยวกับเรา</Link>
      <Link href={"/products"}>สินค้าทั้งหมด</Link>
    </nav>
  );
}
