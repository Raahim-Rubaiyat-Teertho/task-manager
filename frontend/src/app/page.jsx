import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { buttonVariants } from "@/components/ui/button"


export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h1 className="text-4xl pb-8">Welcome To Your Task Manager</h1>
      <div>
        <Link href="/login" className={`${buttonVariants({ variant: "outline" })} p-5 mr-5`}>Login</Link>
        <Link href="/register" className={`${buttonVariants({ variant: "outline" })} p-5`}>Register</Link>
      </div>
    </div>
  )
}
