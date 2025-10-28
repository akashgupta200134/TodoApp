import Rightbar from "@/components/rightbar";
import Menubar from "./menubar/page";
import Middlebar from "@/components/middlebar";



export default function Home() {
  return (
    <> 
    <div className="flex flex-row items-start justify-between gap-10 "> 
    <Menubar/>
    <Middlebar/>
    <Rightbar/>
    </div>

    </>
   
  ); 
}
