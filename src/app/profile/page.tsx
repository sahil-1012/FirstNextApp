"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const ProfilePage = () => {

  const router = useRouter();
  const [data, setData] = useState({
    userName: ''
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get('/api/users/me');
        setData(response.data.user);
        router.push('/profile/' + response.data.user._id)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUser();
  }, []);


  return (
    <div>{data.userName}</div>
  )
}

export default ProfilePage