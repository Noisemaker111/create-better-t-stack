import { api } from "@btgwebsite-new/backend/convex/_generated/api";
import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { Image, Lock, Palette } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";

import { Button } from "./ui/button";

export default function UserMenu() {
  const navigate = useNavigate();
  const user = useQuery(api.auth.getCurrentUser);
  const access = useQuery(api.adminAccess.isCurrentUserAllowed);
  const canAccessAdmin = access?.allowed ?? false;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        {user?.name}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-card">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Content Manager</DropdownMenuLabel>
          {canAccessAdmin ? (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  navigate({ to: "/admin" });
                }}
              >
                <Lock className="mr-2 h-4 w-4" />
                Admin Login
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  navigate({ to: "/admin/section" });
                }}
              >
                <Palette className="mr-2 h-4 w-4" />
                Slot Manager
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  navigate({ to: "/admin/gallery" });
                }}
              >
                <Image className="mr-2 h-4 w-4" />
                Gallery Manager
              </DropdownMenuItem>
            </>
          ) : null}
          <DropdownMenuSeparator />
          <DropdownMenuItem>{user?.email}</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    navigate({ to: "/" });
                  },
                },
              });
            }}
            variant="destructive"
          >
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
