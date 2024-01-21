'use server'
 
import { cookies } from 'next/headers'
 
export async function HandleLogin(sessionData) {
  cookies().set('session', sessionData.username , {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // One week
    path: '/',
  })
  // Redirect or handle the response after setting the cookie
  console.log('hello0')
  
}

export async function getSessionData(req) {
    const encryptedSessionData = cookies().get('session')?.value
    return(encryptedSessionData) 
  }