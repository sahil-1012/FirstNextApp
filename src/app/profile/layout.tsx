import React from 'react'
import Navbar from '../components/Navbar';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <main>{children}</main>
        </>
    )
}
export default ProfileLayout