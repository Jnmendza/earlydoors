"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useState } from "react";
import { ModelType } from "@/types/types";
interface DeleteDialogProps {
  id: string;
  name: string;
  type: ModelType;
  onDeleteSuccess: () => void;
}

export const DeleteDialog = ({
  id,
  name,
  type,
  onDeleteSuccess,
}: DeleteDialogProps) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const isMatch = input.trim() === name;
  const displayType = type === "supportersGroup" ? "supporters group" : type;

  const handleDelete = async () => {
    setLoading(true);

    const promise = async () => {
      const res = await fetch(`/api/${type}s/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.message || `Failed to delete ${type}`);
      }

      await onDeleteSuccess();
      setOpen(false);
      setInput("");

      return { name };
    };

    toast.promise(promise, {
      loading: `Deleting ${type}...`,
      success: (data) => {
        setLoading(false);
        return `${data.name} was successfully deleted`;
      },
      error: (err) => {
        setLoading(false);
        return err.message || `An error occurred while deleting the ${type}.`;
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='destructive' className='cursor-pointer'>
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Please type the name of the{" "}
            {displayType} to confirm.
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-2'>
          <Label htmlFor='confirm-name'>
            Please enter <Badge>{name}</Badge>
          </Label>
          <Input
            id='confirm-name'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Type ${displayType} name...`}
          />
        </div>
        <DialogFooter>
          <Button
            variant='destructive'
            onClick={handleDelete}
            disabled={!isMatch || loading}
            className='cursor-pointer'
          >
            {loading
              ? `Deleting ${displayType}...`
              : `Yes, delete ${displayType}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
