"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { getToken } from "@/utils/token";
import { Workshop } from "@/components/workshops/WorkshopTable";
import { BACKEND_URL } from "@/lib/config";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  venue: z.string().min(2, "Venue must be at least 2 characters"),
  short_description: z.string().min(10, "Description must be at least 10 characters"),
  schedule: z.string().min(1, "Schedule is required"),
  capacity: z.number().min(1, "Capacity must be at least 1"),
});

type FormValues = z.infer<typeof formSchema>;

interface EditWorkshopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  workshop: Workshop;
}

export function EditWorkshopModal({ isOpen, onClose, onSuccess, workshop }: EditWorkshopModalProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: workshop.title,
      venue: workshop.venue,
      short_description: workshop.short_description || "",
      schedule: new Date(workshop.schedule).toISOString().slice(0, 16),
      capacity: workshop.capacity,
    },
  });

  useEffect(() => {
    if (workshop) {
      form.reset({
        title: workshop.title,
        venue: workshop.venue,
        short_description: workshop.short_description || "",
        schedule: new Date(workshop.schedule).toISOString().slice(0, 16),
        capacity: workshop.capacity,
      });
    }
  }, [form, workshop, form.reset]);

  const onSubmit = async (data: FormValues) => {
    try {
      const token = getToken();
      
      if (!token) {
        console.error('No token available');
        toast.error("Your session has expired. Please login again.");
        window.location.href = '/login';
        return;
      }

      const response = await fetch(`${BACKEND_URL}/workshops/${workshop.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          schedule: new Date(data.schedule).toISOString(),
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Your session has expired. Please login again.");
          window.location.href = '/login';
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Updated workshop:', responseData);

      toast.success("Workshop updated successfully!");
      form.reset();
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error updating workshop:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update workshop');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Workshop</DialogTitle>
          <DialogDescription>
            Update the workshop details below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter workshop title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="venue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Venue</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter workshop venue" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="short_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter a brief description of the workshop" 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="schedule"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Schedule</FormLabel>
                  <FormControl>
                    <Input 
                      type="datetime-local" 
                      {...field} 
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        field.onChange(date.toISOString());
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1"
                      {...field} 
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-[#026FB4] hover:bg-[#026FB4]/90">
                Update Workshop
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 