"use client";

import React, { useState } from "react";
import { UserTable } from "@/components/users/UserTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddUserModal } from "@/components/modals/AddUserModal";
import { EditUserModal } from "@/components/modals/EditUserModal";
import { DeleteUserModal } from "@/components/modals/DeleteUserModal";
import { useAddUserModal } from "@/hooks/useAddUserModal";
import { Card } from "@/components/ui/card";
import Header from "@/components/header";

export default function UsersPage() {
  const { openAddUser } = useAddUserModal();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div>
      <Header title="Users" />

      <Card className="p-6 border-t-4 border-t-[#026FB4]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-lg font-semibold sm:text-xl">Users</h2>
          <Button
            className="flex w-full items-center justify-center gap-2 bg-[#026FB4] hover:bg-[#026FB4]/90 sm:w-auto"
            onClick={openAddUser}
          >
            <Plus className="h-4 w-4" />
            Add User
          </Button>
        </div>

        <div className="rounded-md border overflow-hidden">
          <UserTable refreshUsers={handleRefresh} />
        </div>
      </Card>

      {/* Modals */}
      <AddUserModal refreshUsers={handleRefresh} />
      <EditUserModal refreshUsers={handleRefresh} />
      <DeleteUserModal refreshUsers={handleRefresh} />
    </div>
  );
}
