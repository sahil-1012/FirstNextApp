import React from 'react'

const UserProfile = ({ params }: any) => {

    return (
        <div className='flex items-center bg-black justify-center w-full h-screen'>
            <h2 className='font-semibold text-white text-3xl'>UserProfile </h2>
            <p className='bg-orange-500 text-3xl p-3 rounded-md ml-4'>
                {params.id}

            </p>
        </div>
    )
}

export default UserProfile