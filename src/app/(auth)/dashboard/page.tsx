import ActivityLogContainer from "@/components/ActivityLogsContainer";
import EventsCalendar from "@/components/EventsCalendar";
import PendingApprovals from "@/components/PendingApprovals";

export default function DashboardPage() {
  return (
    <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
      <div className='grid auto-rows-[250px] gap-4 md:grid-cols-3'>
        {/* Placeholder */}
        <div className='rounded-xl bg-muted/50 flex justify-center items-center'>
          <p className='text-muted-foreground'>Coming Soon</p>
        </div>

        {/* Pending Approvals */}
        <div className='rounded-xl bg-muted/50 p-4 flex flex-col'>
          <h3 className='text-2xl mb-4'>Pending Approvals</h3>
          <PendingApprovals />
        </div>

        {/* Recent Activity */}
        <div className='rounded-xl bg-muted/50 p-4 flex flex-col'>
          <h3 className='text-2xl mb-4'>Recent Activity</h3>
          <ActivityLogContainer />
        </div>
      </div>

      {/* Calendar stays full width */}
      <EventsCalendar />
    </div>
  );
}
