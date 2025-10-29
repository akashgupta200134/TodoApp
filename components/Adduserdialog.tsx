"use client"

import * as React from "react"
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>Update task details below.</DialogDescription>
        </DialogHeader>

        <form className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="task" className="text-right">
              Task
            </label>
            <input
              id="task"
              className="col-span-3 border rounded px-2 py-1"
              placeholder="Edit task name"
            />
          </div>
        </form>

        <Button onClick={() => onOpenChange(false)}>Save</Button>
      </DialogContent>
    </Dialog>
  )
}
