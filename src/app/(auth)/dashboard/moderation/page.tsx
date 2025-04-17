"use client";
import EventsTab from "@/components/EventsTab";
import { Tabs } from "@/components/ui/tabs";

const ModerationPage = () => {
  const tabs = [
    {
      title: "Events",
      value: "events",
      content: <EventsTab />,
    },
    // {
    //   title: "Venues",
    //   value: "venue",
    //   content: (
    //     <div className='w-full overflow-hidden relative h-auto rounded-2xl p-10 text-xl md:text-4xl font-bold text-black bg-white border-1 border-edorange border-solid space-y-2'>
    //       <p>Venues tab</p>
    //       <ModerationTable />
    //     </div>
    //   ),
    // },
    // {
    //   title: "Clubs",
    //   value: "clubs",
    //   content: (
    //     <div className='w-full overflow-hidden relative h-auto rounded-2xl p-10 text-xl md:text-4xl font-bold text-black bg-white border-1 border-edorange border-solid space-y-2'>
    //       <p>Clubs tab</p>
    //       <ModerationTable />
    //     </div>
    //   ),
    // },
    // {
    //   title: "Supporter Groups",
    //   value: "supporter-groups",
    //   content: (
    //     <div className='w-full overflow-hidden relative h-auto rounded-2xl p-10 text-xl md:text-4xl font-bold text-black bg-white border-1 border-edorange border-solid space-y-2'>
    //       <p>Supporter Groups tab</p>
    //       <ModerationTable />
    //     </div>
    //   ),
    // },
  ];

  return (
    <div className='h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-10'>
      <Tabs tabs={tabs} />
    </div>
  );
};

export default ModerationPage;
