"use client";
import { AppSidebar } from "@/components/AppSidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { createClientForBrowser } from "@/utils/supabase/client";
import { Separator } from "@radix-ui/react-separator";
import { User } from "@supabase/supabase-js";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClientForBrowser();
  const pathname = usePathname();
  console.log("Pathname", pathname);
  const router = useRouter();

  // 1. Check auth state on load
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.role === "ADMIN") {
        router.push("/portal"); // Kick non-admins
      } else {
        setUser(user);
      }
    };
    getUser();
  }, [router, supabase.auth]);

  const breadcrumbPageText = (() => {
    switch (pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/dashboard/events":
        return "Create An Event";
      case "/dashboard/venues":
        return "Create A Venue";
      case "/dashboard/supportersGroups":
        return "Create A Supporters Group ";
      case "/dashboard/teams":
        return "Create A Team ";
      default:
        return "Unknown Page";
    }
  })();

  if (!user) return <div>Loading...</div>;

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <Separator orientation='vertical' className='mr-2 h-4' />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className='hidden md:block'>
                  <BreadcrumbLink href='/dashboard'>Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                {pathname !== "/dashboard" && (
                  <>
                    <BreadcrumbSeparator className='hidden md:block' />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{breadcrumbPageText}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
