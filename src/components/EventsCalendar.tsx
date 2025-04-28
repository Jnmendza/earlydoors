"use client";
import React, { useState, useMemo, useEffect } from "react";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, Views, momentLocalizer, View } from "react-big-calendar";
import { useEventStore } from "@/store/event-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { CalendarEvent } from "@/types/types";

const mLocalizer = momentLocalizer(moment);

const ColoredDateCellWrapper: React.ComponentType<{
  children?: React.ReactNode;
}> = ({ children }) =>
  React.cloneElement(
    React.Children.only(children) as React.ReactElement<{
      style?: React.CSSProperties;
    }>,
    {
      style: {
        backgroundColor: "#FFA07A",
      },
    }
  );

export default function EventsCalendar({ localizer = mLocalizer, ...props }) {
  const [currentView, setCurrentView] = useState<View>(Views.MONTH);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const { calendarEvents, fetchCaledarEvents } = useEventStore();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  useEffect(() => {
    fetchCaledarEvents();
  }, [fetchCaledarEvents]);

  const { components } = useMemo(
    () => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
      },
    }),
    []
  );

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  // Only include these views
  const allowedViews = {
    month: true,
    week: true,
    day: true,
    agenda: false,
    work_week: false,
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
            <DialogDescription>
              <div className='space-y-2'>
                <p>
                  <strong>When:</strong>{" "}
                  {moment(selectedEvent?.start).format("MMMM Do YYYY, h:mm a")}
                </p>
                <p>
                  <strong>Where:</strong> {selectedEvent?.venueName}
                </p>
                {selectedEvent?.desc && (
                  <p>
                    <strong>Description:</strong> {selectedEvent?.desc}
                  </p>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className='min-h-[500px]' {...props}>
        <h1 className='text-2xl mb-4'>Upcoming Events</h1>
        <Calendar
          components={components}
          date={currentDate}
          onNavigate={(newDate) => setCurrentDate(newDate)}
          events={calendarEvents}
          localizer={localizer}
          onSelectEvent={handleSelectEvent}
          onView={setCurrentView}
          view={currentView}
          showMultiDayTimes
          step={60}
          popup
          views={
            Object.keys(allowedViews).filter(
              (v) => allowedViews[v as View]
            ) as View[]
          }
        />
      </div>
    </>
  );
}
