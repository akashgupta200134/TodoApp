"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function AddUserDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] mt-16">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>Update task details below.</DialogDescription>
        </DialogHeader>

        <form className="grid gap-4 py-3">
          <div className="grid grid-cols-2 items-center gap-4">
            {/* <label htmlFor="task" className="text-right ">
              Task
            </label> */}
            <input
              id="task"
              className="col-span-3 border rounded px-2 py-2"
              placeholder="Edit the task "
            />
          </div>
        </form>

        <Button onClick={() => onOpenChange(false)}>Save</Button>
      </DialogContent>
    </Dialog>
  )
}
