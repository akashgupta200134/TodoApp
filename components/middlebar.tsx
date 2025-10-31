import { DatePickerIcon } from "./ui/DatePicker";
import getTodos from "@/components/todos/TodoList"; // ✅ import getTodos

export default async function Middlebar() {
  const todos = await getTodos(); // ✅ Fetch todos here

  return (
    <div>
      <div className="flex flex-row items-center justify-start gap-6">
        <DatePickerIcon />
      </div>

      <p className="font-normal mt-4 text-[18px]">Remaining task:</p>

      <div className="mt-2">
        {todos}
      </div>
    </div>
  );
}
