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
    userName: '',
    email: '',
    password: '',
  })
  const [disable, setDisable] = useState(true);

  const onSignup = async () => {
    try {
      const signupPromise = new Promise(async (resolve, reject) => {
        try {
          const resp = await axios.post("/api/users/signup", user);
          console.log("Signup successful", resp.data);

          if (resp.data.success) {
            toast.success('Signup successful', { position: 'top-center' });
            router.push("/login");
          }

          resolve(resp.data);
        } catch (error) {
          reject(error);
        }
      });

      toast.promise(signupPromise, {
        loading: 'Signing up...',
        success: 'Signup successful',
        error: 'Signup failed',
      });

      await signupPromise;

    } catch (err: any) {
      console.error(err.message);
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
          <h3 className="font-bold text-3xl text-center">SingUp Form</h3>
          <br className="bg-black text-black " />
          <TextField
            label="User Name"
            className="w-80 bg-transparent"
            type="text"
            value={user.userName}
            onChange={(e) => {
              setUser({ ...user, userName: e.target.value });
            }}
          />
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
            onClick={onSignup} disabled={disable}>
            SignUp Here
          </Button>
          <Link className="text-base text-blue-500 mt-2" href={'/login'}>Already have a Account. Login here...</Link>
        </div>
      </div>
    </>
  )
}

export default SignupPage