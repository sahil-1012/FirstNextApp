"use client"

import { Button, TextField, Typography } from "@mui/material"
import { Axios } from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const SignupPage = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    username: '',
  })
  const onSignup = async () => {

  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-yellow-50">
      <div className="grid gap-y-3 bg-neutral-100 rounded-xl px-14 py-24 font-[poppins]">
        <h3 className="font-bold text-3xl text-center">SingUp Form</h3>
        <br className="bg-black text-black " />
        <TextField
          label="User Name"
          className="w-80 bg-transparent"
          type="text"
          id="username"
          placeholder="username"
          value={user.username}
          onChange={(e) => {
            setUser({ ...user, username: e.target.value });
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
        <Button onClick={onSignup} size="large" variant="contained" color="success" className="mt-6 bg-green-700">
          SignUp Here
        </Button>
        <Link className="text-lg text-blue-500 mt-2" href={'/login'}>Already have a Account. Login here...</Link>
      </div>
    </div>
  )
}

export default SignupPage