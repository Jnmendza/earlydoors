import { EventWithVenue } from "@/store/event-store";
import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";
import { formatDate, formatTime } from "@/lib/dateUtils";
import { bebasFont, robotoFont } from "@/lib/font";

interface EventCardProps {
  event: EventWithVenue;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { name, date, start_time, description } = event;
  return (
    <Accordion type='single' collapsible className={`${bebasFont.className}`}>
      <AccordionItem value='item-1'>
        <AccordionTrigger>
          <div>
            <p className='text-2xl w-full text-ellipsis'>{name}</p>
            <p className='text-edorange text-md'>
              {formatDate(date)} @ {formatTime(start_time)}
            </p>
          </div>
        </AccordionTrigger>
        <AccordionContent className={`${robotoFont.className}`}>
          {description}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default EventCard;
