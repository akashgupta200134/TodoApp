import Tasklist from "./Tasklist";
import { DatePickerIcon } from "./ui/DatePicker";



export default function Middlebar(){
    return (    
   
    <div>
    <div className="flex flex-row items-center justify-start gap-6">
    <DatePickerIcon/>
    </div>
   
     <p className="font-normal mt-4 text-[18px]">
      Remaning task : 0
     </p>
     <div className="mt-2">
        <Tasklist/>

     </div>
     
    </div>



       
    )
}