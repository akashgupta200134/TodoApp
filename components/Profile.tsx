"use client"
// import Image from "next/image";
// import Avatar from "@/public/avatar.png";
import { useRouter } from "next/navigation";
import { User } from "@deemlol/next-icons";



export default function Profile() {
  
  const router = useRouter();
 
 function handler(){
     router.push("/");

  }


  return (
    <div onClick={handler} className="rounded-full overflow-hidden border-2  cursor-pointer flex flex-row items-center justify-center w-12 h-12 ml-10">
     
     <User size={32}  className=" text-red-600"/>
      
     
      {/* <Image  onClick={handler}
        src={Avatar} 
        alt="User avatar" 
        className="object-cover" 
        width={128}
        height={128}
      /> */}
    </div>
  );
}


