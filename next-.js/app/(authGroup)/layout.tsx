import { Navbar } from '@/components/shared/Navbar'
import { getMe } from '@/service/getMe'
import React from 'react'

const authLayout = async ({children}: {children: React.ReactNode}) => {
  const user = await getMe()
  return (
    <div className="w-full mx-auto">
      <Navbar user={user} />
      {children}
    </div>
  )
}

export default authLayout
