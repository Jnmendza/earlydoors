// This layout wraps only the dashboard section — no navbar or footer here
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className='min-h-screen bg-edcream p-4'>{children}</main>;
}
