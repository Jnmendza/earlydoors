import ActivityLogContainer from "@/components/ActivityLogsContainer";
import EventsCalendar from "@/components/EventsCalendar";
import { EventsPerMonthChart } from "@/components/EventsPerMonthChart";
import PendingApprovals from "@/components/PendingApprovals";

export default function DashboardPage() {
  return (
    <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
      <div className='grid auto-rows-[360px] gap-4 md:grid-cols-3'>
        <EventsPerMonthChart />

        <PendingApprovals />

        <ActivityLogContainer />
      </div>

      {/* Calendar stays full width */}
      <EventsCalendar />
    </div>
  );
}
