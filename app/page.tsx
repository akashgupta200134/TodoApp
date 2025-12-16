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
    <div className="md:flex md:overflow-hidden overflow-x-hidden md:flex-row flex flex-col md:items-start md:justify-between md:gap-10 mb-5 mt-4"> 
    <Menubar/>
    <Middlebar/>
    <Rightbar/>
    </div>

    </>
   
  ); 
}