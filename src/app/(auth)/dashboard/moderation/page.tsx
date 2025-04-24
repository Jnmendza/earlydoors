"use client";
import ClubsTab from "@/components/tabs/ClubsTab";
import EventsTab from "@/components/tabs/EventsTab";
import GroupsTab from "@/components/tabs/GroupsTab";
import VenuesTab from "@/components/tabs/VenuesTab";
import { Tabs } from "@/components/ui/tabs";

const ModerationPage = () => {
  const tabs = [
    {
      title: "Events",
      value: "events",
      content: <EventsTab />,
    },
    {
      title: "Venues",
      value: "venue",
      content: <VenuesTab />,
    },
    {
      title: "Clubs",
      value: "clubs",
      content: <ClubsTab />,
    },
    {
      title: "Supporter Groups",
      value: "supporter-groups",
      content: <GroupsTab />,
    },
  ];

  return (
    <div className='h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-10'>
      <Tabs tabClassName='cursor-pointer' tabs={tabs} />
    </div>
  );
};

export default ModerationPage;
