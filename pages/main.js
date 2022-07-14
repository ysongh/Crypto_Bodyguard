import React from 'react'
import { useRouter } from 'next/router';

function main() {
  const router = useRouter();

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 gap-20 mx-32 mt-10">
        <div className='col-6'>
          <div className="bg-white rounded shadow">
            <div className="p-3">
              <h2 className="text-4xl mb-2">
                For User
              </h2>
              <p className="text-gray-500 mb-3">
                Find a bodyguard who can protect you
              </p>
              <button className="py-2 px-4 text-white bg-blue-600 rounded baseline hover:bg-blue-400 w-full"  onClick={() => router.push(`/listofbodyguard`)}>
                Find 
              </button>
            </div>
          </div>
        </div>
        <div className='col-6'>
          <div className="bg-white rounded shadow">
            <div className="p-3">
            <h2 className="text-4xl mb-2">
                For BodyGuard
              </h2>
              <p className="text-gray-500 mb-3">
                Sign up to be a bodyguard and protect someone
              </p>
              <button className="py-2 px-4 text-white bg-blue-600 rounded baseline hover:bg-blue-400 w-full"  onClick={() => router.push(`/signup`)}>
                Sign Up 
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default main