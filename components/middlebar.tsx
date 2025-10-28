import Tasklist from "./Tasklist";


export default function Middlebar(){
    return (    
   
    <div className="text-5xl font-bold">
     Today
     <p className="font-normal mt-4 text-[18px]">
      Remaning task : 0
     </p>
     <div className="mt-2">
        <Tasklist/>

     </div>
     
    </div>



       
    )
}