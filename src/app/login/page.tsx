"use client"

import { Button, TextField, Typography } from "@mui/material"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Router } from "next/router"
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
const SignupPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [disable, setDisable] = useState(true);

  const onLogin = async () => {
    try {
      const login = new Promise((resolve, reject) => {
        axios.post("/api/users/login", user)
          .then(response => {
            resolve(response.data);
          })
          .catch(error => {
            reject(error);
          });
      });

      toast.promise(login, {
        loading: 'Loading',
        success: 'Login Successfully Done',
        error: 'Error while Logging',
      });

      const result = await login;
      console.log("Login successful", result);
      router.push("/profile");

    } catch (err: any) {
      console.error("Error during login", err.message);
      toast.error(err.message)
    }
  };


  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 5;
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      const allFieldsFilled =
        Object.values(user).every((field) => field.trim() !== "") &&
        validateEmail(user.email) &&
        validatePassword(user.password);

      setDisable(!allFieldsFilled);
    }, 300);

    return () => clearTimeout(delay);
  }, [user]);


  return (
    <>
      <Toaster />

      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-yellow-50">
        <div className="grid gap-y-3 bg-neutral-100 rounded-xl px-14 py-24 font-[poppins]">
          <h3 className="font-bold text-3xl text-center"> Welcome Back <br />Login</h3>
          <br className="bg-black text-black " />
          <TextField
            label="Email ID"
            type="email"
            id="email"
            placeholder="email"
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />

          <TextField
            label="Password"
            type="password"
            id="password"
            placeholder="password"
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
          <Button
            size="large" variant="contained" color="success" className="mt-6 bg-green-700"
            onClick={onLogin} disabled={disable}>
            Login Here
          </Button>
          <Link className="text-base text-blue-500 mt-2" href={'/signup'}>Already have a Account. Login here...</Link>
        </div>
      </div>
    </>
  )
}

export default SignupPage