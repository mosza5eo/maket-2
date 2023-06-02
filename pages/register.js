import { Box, Button, Grid, TextField } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { saveAs } from "file-saver";
import styles from "@/styles/Login.module.css";
import Link from "next/link";
export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // อ่านไฟล์ JSON
  //   const jsonData = require("@/data/saveData.json");

  const onSubmit = (data) => {
    // console.log(data);
    //  localStorage.clear();

    const a = data;
    localStorage.setItem(data.Username, JSON.stringify(a));

    // const { Username, Email, Password, ConfirmPassword } = data;
    // const jsonData = {
    //   Username,
    //   Email,
    //   Password,
    //   ConfirmPassword,
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
    const username = localStorage.getItem(data);
    // console.log(data.Email); // ผลลัพธ์: 'john'
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      console.log(key, value);
    }
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
            height={550}
            width={906}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* register your input into the hook by invoking the "register" function */}
              <Grid container>
                <Grid sm={12}>
                  <Box className={styles.cardHeader}>
                    <h1>Register</h1>
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
                      {errors.Password && (
                        <Box sx={{ color: "#FF4500" }}>
                          กรุณาใช่รหัสผ่านอย่างน้อย 8 ตัวอักษร
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
                    {...register("Password", { required: true, minLength: 8 })}
                    className={styles.formControl}
                  />
                </Grid>

                <Grid sm={12} sx={{ marginLeft: 1.4, marginTop: 1 }}>
                  <Grid container>
                    <Grid sm={2}>
                      <Box>Confirm Password</Box>
                    </Grid>
                    <Grid sm={8} sx={{ display: "flex" }}>
                      {errors.ConfirmPassword && (
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
                    placeholder="Confirm Password"
                    {...register("ConfirmPassword", {
                      required: true,
                      minLength: 8,
                    })}
                    className={styles.formControl}
                  />
                </Grid>
                <Grid sm={12} sx={{ m: 1 }}>
                  <Grid container>
                    <Grid sm={1.7}>
                      <Button variant="contained" type="submit">
                        Register
                      </Button>
                    </Grid>
                    <Grid sm={1} sx={{ marginTop: 1.5 }}>
                      <Link href="/login" color="inherit">
                        Cancel
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
