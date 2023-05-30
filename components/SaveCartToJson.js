import { useSelector } from "react-redux";
import { saveAs } from "file-saver";
import { Box, Button } from "@mui/material";

export default function SaveCartToJson() {
  const cart = useSelector((state) => state.cart);

  const saveCartToJson = () => {
    const jsonCart = JSON.stringify(cart, null, 2);
    const blob = new Blob([jsonCart], { type: "application/json" });
    saveAs(blob, "cart.json");
  };

  return (
    <Box
      sx={{
        display: "flex",
        marginLeft: "89.3%",
        backgroundColor: "#009933",
        borderRadius: 4,
        boxShadow: "0 2px 10px 0 #33CC66",
      }}
    >
      <Button
        onClick={saveCartToJson}
        sx={{
          backgroundColor: "#33CC00",
          color: "#DCDCDC",
          borderRadius: 4,
        }}
      >
        Save to JSON
      </Button>
    </Box>
  );
}
