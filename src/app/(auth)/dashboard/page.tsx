import ActivityLog from "@/components/ActivityLog";
import EventsCalendar from "@/components/EventsCalendar";

export default function DashboardPage() {
  return (
    <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
      <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
        <div className='aspect-video rounded-xl bg-muted/50' />
        <div className='aspect-video rounded-xl bg-muted/50' />
        <div className='aspect-video rounded-xl bg-muted/50'>
          <ActivityLog />
        </div>
      </div>

      <EventsCalendar />
    </div>
  );
}
