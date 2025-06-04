"use client";
import { Fragment, useEffect } from "react";
import { AppSidebar } from "@/components/AdminSidebar";
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
import Link from "next/link";
import { isUUID } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const paths = usePathname();
  const supabase = createClientForBrowser();
  const pathNames = paths.split("/").filter((path) => path);
  const cleanPathNames = pathNames.filter((segment) => !isUUID(segment));

  const { user, setUser, lastChecked, setLastChecked } = useUserStore();

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
                {cleanPathNames.map((link, index) => {
                  const href = `/${cleanPathNames
                    .slice(0, index + 1)
                    .join("/")}`;
                  const isLastPath = index === cleanPathNames.length - 1;
                  const linkName = link[0].toUpperCase() + link.slice(1);

                  return (
                    <Fragment key={index}>
                      <BreadcrumbItem>
                        {!isLastPath ? (
                          <BreadcrumbLink asChild>
                            <Link href={href}>{linkName}</Link>
                          </BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage>{linkName}</BreadcrumbPage>
                        )}
                      </BreadcrumbItem>
                      {!isLastPath && <BreadcrumbSeparator />}
                    </Fragment>
                  );
                })}
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
