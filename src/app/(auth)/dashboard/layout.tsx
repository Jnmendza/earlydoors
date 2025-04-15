"use client";
import { useEffect } from "react";
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
import { useUserStore } from "@/store/user-store";
import { createClientForBrowser } from "@/utils/supabase/client";
import { Separator } from "@radix-ui/react-separator";
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClientForBrowser();
  const router = useRouter();
  const pathname = usePathname();
  const { user, setUser, lastChecked, setLastChecked } = useUserStore();

  // 1. Check auth state on load
  useEffect(() => {
    const fetchUser = async () => {
      // Only check if no user or last check was > 5 minutes ago
      const shouldRefresh =
        !user || !lastChecked || Date.now() - lastChecked > 5 * 60 * 1000;

      if (shouldRefresh) {
        const { data, error } = await supabase.auth.getUser();

        if (error || !data.user || data.user.user_metadata?.role !== "ADMIN") {
          router.push("/portal");
          return;
        }

        setUser(data.user);
        setLastChecked(Date.now());
      }
    };

    fetchUser();
  }, [supabase, router, user, lastChecked, setUser, setLastChecked]);

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
      case "/dashboard/clubs":
        return "Create A Club ";
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
        <Toaster richColors position='bottom-right' />
      </SidebarInset>
    </SidebarProvider>
  );
}
