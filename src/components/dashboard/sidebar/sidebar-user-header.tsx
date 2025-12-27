'use client';

import { useState, useTransition } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Building2, 
  Home, 
  ChevronDown, 
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { updateUserRole } from '@/actions/user';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useSidebar } from '@/components/ui/sidebar';

interface SidebarUserHeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role: string;
  };
}

const roleConfig = {
  PUBLIC: {
    label: 'Public User',
    icon: User,
    color: 'bg-blue-500',
    badgeVariant: 'default' as const,
  },
  OWNER: {
    label: 'Property Owner',
    icon: Home,
    color: 'bg-emerald-500',
    badgeVariant: 'default' as const,
  },
  BROKER: {
    label: 'Broker',
    icon: Building2,
    color: 'bg-amber-500',
    badgeVariant: 'default' as const,
  },
  ADMIN: {
    label: 'Admin',
    icon: CheckCircle2,
    color: 'bg-purple-500',
    badgeVariant: 'default' as const,
  },
};

export function SidebarUserHeader({ user }: SidebarUserHeaderProps) {
  const [isPending, startTransition] = useTransition();
  const [currentRole, setCurrentRole] = useState(user.role);
  const router = useRouter();
  const { state } = useSidebar();

  const currentRoleConfig = roleConfig[currentRole as keyof typeof roleConfig] || roleConfig.PUBLIC;
  const RoleIcon = currentRoleConfig.icon;

  const handleRoleChange = (newRole: 'PUBLIC' | 'OWNER' | 'BROKER') => {
    if (newRole === currentRole) return;

    startTransition(async () => {
      const result = await updateUserRole(newRole);
      
      if (result.success) {
        setCurrentRole(newRole);
        toast.success(`Role updated to ${roleConfig[newRole].label}`);
        router.refresh();
      } else {
        toast.error(result.error || 'Failed to update role');
      }
    });
  };

  const getInitials = (name?: string | null, email?: string | null) => {
    if (name) {
      return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    if (email) {
      return email.slice(0, 2).toUpperCase();
    }
    return 'U';
  };

  return (
    <div className="border-b p-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-auto w-full justify-start p-2 hover:bg-amber-100/50 group-data-[collapsible=icon]:justify-center"
            disabled={isPending}
          >
            <div className="flex w-full items-center gap-3 group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:gap-0">
              <Avatar className="h-10 w-10 border-2 border-amber-600/20 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8">
                <AvatarImage src={user.image || undefined} alt={user.name || 'User'} />
                <AvatarFallback className="bg-gradient-to-br from-amber-500 to-orange-500 text-sm font-semibold text-white">
                  {getInitials(user.name, user.email)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex flex-1 flex-col items-start overflow-hidden text-left group-data-[collapsible=icon]:hidden">
                <div className="flex w-full items-center gap-2">
                  <span className="truncate text-sm font-semibold">
                    {user.name || 'User'}
                  </span>
                  {isPending && <Loader2 className="h-3 w-3 animate-spin" />}
                </div>
                <span className="truncate text-xs text-muted-foreground">
                  {user.email}
                </span>
                <Badge 
                  variant={currentRoleConfig.badgeVariant}
                  className="mt-1 gap-1 text-xs"
                >
                  <RoleIcon className="h-3 w-3" />
                  {currentRoleConfig.label}
                </Badge>
              </div>

              <ChevronDown className="h-4 w-4 text-muted-foreground group-data-[collapsible=icon]:hidden" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="start" className="w-64">
          <DropdownMenuLabel>Switch Role</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem
            onClick={() => handleRoleChange('PUBLIC')}
            disabled={isPending || currentRole === 'PUBLIC'}
            className="gap-2"
          >
            <User className="h-4 w-4 text-blue-500" />
            <div className="flex flex-1 flex-col">
              <span className="font-medium">Public User</span>
              <span className="text-xs text-muted-foreground">
                Browse and favorite properties
              </span>
            </div>
            {currentRole === 'PUBLIC' && (
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            )}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => handleRoleChange('OWNER')}
            disabled={isPending || currentRole === 'OWNER'}
            className="gap-2"
          >
            <Home className="h-4 w-4 text-emerald-500" />
            <div className="flex flex-1 flex-col">
              <span className="font-medium">Property Owner</span>
              <span className="text-xs text-muted-foreground">
                List and manage your properties
              </span>
            </div>
            {currentRole === 'OWNER' && (
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            )}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => handleRoleChange('BROKER')}
            disabled={isPending || currentRole === 'BROKER'}
            className="gap-2"
          >
            <Building2 className="h-4 w-4 text-amber-500" />
            <div className="flex flex-1 flex-col">
              <span className="font-medium">Broker</span>
              <span className="text-xs text-muted-foreground">
                Manage listings and get leads
              </span>
            </div>
            {currentRole === 'BROKER' && (
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            )}
          </DropdownMenuItem>

          {currentRole === 'ADMIN' && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled className="gap-2">
                <CheckCircle2 className="h-4 w-4 text-purple-500" />
                <div className="flex flex-1 flex-col">
                  <span className="font-medium">Admin</span>
                  <span className="text-xs text-muted-foreground">
                    Full system access
                  </span>
                </div>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
