"use client"
import React from "react";
import { UserProfile } from "@/components/users/UserProfile";
import { UserTable } from "./UserTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddUser } from "@/components/coordinator/AddUser";
import { EditUserModal } from "@/components/coordinator/EditUserModal";
import { DeleteUserModal } from "@/components/coordinator/DeleteUserModal";
import { ViewUserModal } from "@/components/coordinator/ViewUserModal";
import { useAddUserModal } from "@/hooks/useAddUserModal";

const Index = () => {
  const { openAddUser } = useAddUserModal();

  return (
    <div>
      <div className="mb-6 space-y-6 md:mb-8">
        <div className="flex gap-4 flex-row sm:items-center justify-end">          
          <UserProfile />
        </div>
        
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold sm:text-xl">Users</h2>
          <Button 
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#026FB4] hover:bg-[#025a91] sm:w-auto" 
            onClick={openAddUser}
          >
            <Plus className="h-4 w-4" /> 
            Add User
          </Button>
        </div>
      </div>
      
      <div className="overflow-hidden rounded-lg border bg-white">
        <UserTable />
      </div>
      
      {/* Modals */}
      <AddUser />
      <EditUserModal />
      <DeleteUserModal />
      {/* <AssignWorkshopModal /> */}
      <ViewUserModal />
    </div>
  );
};

export default Index;