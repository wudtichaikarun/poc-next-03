import getUser from "@/lib/getUser"
import getUserPosts from "@/lib/getUerPost"
import { Suspense, use } from "react"
import UserPosts from "./components/UserPost"
import { Metadata } from "next"
import getAllUsers from "@/lib/getAllUsers"
import { notFound } from "next/navigation"

type Params = {
  params: {
    userId: string
  }
}

export async function generateMetadata ({params: {userId}}: Params): Promise<Metadata> {
  const userData: Promise<User> = getUser(userId)
  const user: User = await userData

  if(!user?.name) {
    return {
      title: "User not found."
    }
  } 

  return {
    title: user.name,
    description: `This is the page of ${user.name}`
  }
}

export default async function UserPage({params:{ userId }}: Params) {
  const userPostsData: Promise<Post[]> = getUserPosts(userId)
  const user= await getUser(userId)

  if(!user?.name) return  notFound()

  return (
    <>
    <h2>{user.name}</h2>
    <br />
    <Suspense fallback={<h2>Loading...</h2>}>
      <UserPosts promise={userPostsData} />
    </Suspense>
    
    </>
  )
}

// providing these params in advance as 
// next.js will know what the prams are going to be
// it can actually statically generate those pages in advance without
// the server side rendering SSG so there'll be and rendering SSG not SSR
export async function generateStaticParams() {
  const users: User[] = await getAllUsers()
  return users.map(user =>  ({
    userId: `${user.id}`
  }))
}