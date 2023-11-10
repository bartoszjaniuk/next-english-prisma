// WITHOUT A DEFINED MATCHER, THIS ONE LINE APPLIES NEXT-AUTH TO THE ENTIRE PROJECT
export { default } from 'next-auth/middleware'

// 
export const config = { matcher: ['/'] }