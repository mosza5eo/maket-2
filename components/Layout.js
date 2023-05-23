import { Box } from "@mui/material";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { yellow } from "@mui/material/colors";
export default function Layout({ children }) {
  return (
    <Box>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </Box>
  );
}
