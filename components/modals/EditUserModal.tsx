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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditUserModal } from "@/hooks/useEditUserModal";
import { toast } from "sonner";
import { getToken } from "@/utils/token";
import { BACKEND_URL } from "@/lib/config";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  myGender: z.enum(["Male", "Female"]),
  role: z.enum(["COORDINATOR", "EVENT_ORGANIZER"]),
  national_id: z.string().min(16, "National ID must be 16 characters"),
  phonenumber: z.string().min(10, "Phone number must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

interface EditUserModalProps {
  refreshUsers: () => void;
}

export function EditUserModal({ refreshUsers }: EditUserModalProps) {
  const { isOpen, closeEditUser, user } = useEditUserModal();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      myGender: "Male",
      role: "COORDINATOR",
      national_id: "",
      phonenumber: "",
    },
    mode: "onChange",
  });

  // Convert numeric gender to string
  const getGenderString = (gender: number): "Male" | "Female" => {
    return gender === 0 ? "Male" : "Female";
  };

  // Convert string gender to numeric
  // const getGenderNumber = (gender: string): number => {
  //   return gender === "Male" ? 0 : 1;
  // };

  useEffect(() => {
    if (user) {
      console.log('Editing user:', user);
      const userRole = user.roles?.[0]?.role_name || "COORDINATOR";
      form.reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        username: user.username || "",
        myGender: getGenderString(+user.gender),
        role: userRole as "COORDINATOR" | "EVENT_ORGANIZER",
        national_id: user.national_id || "",
        phonenumber: user.phonenumber || "",
      });
    }
  }, [user, form]);

  const onSubmit = async (data: FormValues) => {
    try {
      const token = getToken();
      console.log('Token from localStorage:', token);
      
      if (!token) {
        console.error('No token available');
        toast.error("Your session has expired. Please login again.");
        window.location.href = '/login';
        return;
      }

      if (!user?.id) {
        toast.error("No user selected for editing");
        return;
      }

      // Prepare the request body with all user data
      const requestBody = {
        ...user, // Include all existing user data
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        username: data.username,
        gender: data.myGender, // Convert gender string to number
        roles: [{ role_name: data.role }], // Update the roles array
        national_id: data.national_id,
        phonenumber: data.phonenumber,
      };

      console.log('Update user request body:', requestBody);

      const response = await fetch(`${BACKEND_URL}/users/update/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      });

      console.log('Update user response status:', response.status);
      const responseData = await response.json();
      console.log('Update user response data:', responseData);

      if (response.ok) {
        toast.success("User updated successfully!");
        closeEditUser();
        form.reset();
        refreshUsers();
      } else if (response.status === 401) {
        toast.error("Your session has expired. Please login again.");
        window.location.href = '/login';
      } else {
        throw new Error(responseData.message || 'Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update user');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeEditUser}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update the user information below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="myGender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="COORDINATOR">Coordinator</SelectItem>
                      <SelectItem value="EVENT_ORGANIZER">Event Organizer</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="national_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>National ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter national ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phonenumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={closeEditUser}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                Update
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
