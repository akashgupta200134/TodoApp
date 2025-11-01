import Rightbar from "@/components/rightbar";
import Menubar from "./menubar/page";
import Middlebar from "@/components/middlebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export default async function Home() {

  const session = await getServerSession(authOptions);
  
  console.log("Logged-in user ID:", session?.user?.id);
  

  return (
    <> 
    <div className="flex flex-row items-start justify-between gap-10 mb-10 mt-4"> 
    <Menubar/>
    <Middlebar/>
    <Rightbar/>
    </div>

    </>
   
  ); 
}
