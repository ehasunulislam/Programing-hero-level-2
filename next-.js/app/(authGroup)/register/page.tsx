import React from 'react'
import RegisterFrom from '../_components/RegisterFrom'

const registerPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Create an Account</h1>
            <p className="text-sm text-muted-foreground">
              Please enter your details to create a new account.
            </p>
          </div>
          
        <RegisterFrom />
      </div>

    </div>
  )
}

export default registerPage
