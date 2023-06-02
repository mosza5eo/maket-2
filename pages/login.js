import { Box, Button, Grid, TextField } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { saveAs } from "file-saver";
import styles from "@/styles/Login.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // อ่านไฟล์ JSON
  //   const jsonData = require("@/data/saveData.json");

  const onSubmit = (data) => {
    

    const { Username, Email, Password } = data;
    const storedData = localStorage.getItem(Username);

    if (storedData) {
      const { Email: storedEmail, Password: storedPassword } =
        JSON.parse(storedData);

      if (Email === storedEmail && Password === storedPassword) {
        // alert("สามารถ login ได้ ");
        //router.push("/")
        router.push("/home");
        
      } else {
        alert("ไม่สามารถ login ได้ ");
        
      }
    } else {
      alert("ยังไม่ได้ Register");
      
    }
    // console.log(data);
    // localStorage.clear();

    // const a = data;
    // localStorage.setItem(data.User, JSON.stringify(a));

    // const { User, Email, Password } = data;
    // const jsonData = {
    //   User,
    //   Email,
    //   Password,
    // };
    // const jsonDataUser = JSON.stringify(jsonData, null, 2);
    // const blob = new Blob([jsonDataUser], { type: "application/json" });
    // const fileName = "@/data/user.json";
    // saveAs(blob, fileName);

    // const fileData = new Blob([JSON.stringify(jsonData, null, 2)], {//save .json
    //   type: "application/json",
    // });
    // const url = URL.createObjectURL(fileData);
    // const link = document.createElement("a");
    // link.href = url;
    // link.download = `${User}.json`;
    // link.click();

    // เข้าถึงข้อมูลใน localStorage
    // const username = localStorage.getItem(data);
    // for (let i = 0; i < localStorage.length; i++) {
    //   const key = localStorage.key(i);
    //   const value = localStorage.getItem(key);
    //   console.log(key, value);
    // }
  };

  //   console.log(watch("example"));

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: 10,
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#ffffff",
              borderRadius: 2,
            }}
            height={456}
            width={906}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* register your input into the hook by invoking the "register" function */}
              <Grid container>
                <Grid sm={12}>
                  <Box className={styles.cardHeader}>
                    <h1>Login</h1>
                  </Box>
                </Grid>
                <Grid sm={12} sx={{ marginLeft: 1.4, marginTop: 1 }}>
                  <Box>Username</Box>
                </Grid>
                <Grid
                  sm={12}
                  sx={{ m: 1, display: "flex", justifyContent: "center" }}
                >
                  <input
                    type="text"
                    placeholder="Username"
                    {...register("Username", { required: true, maxLength: 80 })}
                    className={styles.formControl}
                  />
                </Grid>
                <Grid sm={12} sx={{ marginLeft: 1.4, marginTop: 1 }}>
                  <Grid container>
                    <Grid sm={1}>
                      <Box>Email</Box>
                    </Grid>
                    <Grid sm={8} sx={{ display: "flex" }}>
                      {errors.Email && (
                        <Box sx={{ color: "#FF4500" }}>Email ไม่ถูกต้อง</Box>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  sm={12}
                  sx={{ m: 1, display: "flex", justifyContent: "center" }}
                >
                  <input
                    type="text"
                    placeholder="Email"
                    {...register("Email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                    className={styles.formControl}
                  />
                </Grid>
                <Grid sm={12} sx={{ marginLeft: 1.4, marginTop: 1 }}>
                  <Grid container>
                    <Grid sm={1.2}>
                      <Box>Password</Box>
                    </Grid>
                    <Grid sm={8} sx={{ display: "flex" }}>
                      {errors.password && (
                        <Box sx={{ color: "#FF4500" }}>
                          กรุณาใส่รหัสผ่านอย่างน้อย 8 ตัวอักษร
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  sm={12}
                  sx={{ m: 1, display: "flex", justifyContent: "center" }}
                >
                  <input
                    type="password"
                    placeholder="Password"
                    {...register("Password", { required: true })}
                    className={styles.formControl}
                  />
                </Grid>

                <Grid sm={12} sx={{ m: 1 }}>
                  <Grid container>
                    <Grid sm={1.3}>
                      <Button variant="contained" type="submit">
                        Login
                      </Button>
                    </Grid>
                    <Grid sm={1} sx={{ marginTop: 1.5 }}>
                      <Link href="/register" color="inherit">
                        Register
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  sm={12}
                  sx={{ m: 1, display: "flex", justifyContent: "center" }}
                ></Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
}
