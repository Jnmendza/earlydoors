"use client";
import React, { useState, useMemo, useEffect } from "react";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, Views, momentLocalizer, View } from "react-big-calendar";
import { useEventStore } from "@/store/event-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { CalendarEvent } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

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
  const { calendarEvents, fetchCalendarEvents } = useEventStore();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  useEffect(() => {
    fetchCalendarEvents();
  }, [fetchCalendarEvents]);

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
    <Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
            <div className='space-y-2'>
              <DialogDescription>
                <strong>When:</strong>{" "}
                {moment(selectedEvent?.start).format("MMMM Do YYYY, h:mm a")}
              </DialogDescription>
              <DialogDescription>
                <strong>Where:</strong> {selectedEvent?.venueName}
              </DialogDescription>
              {selectedEvent?.desc && (
                <DialogDescription>
                  <strong>Description:</strong> {selectedEvent?.desc}
                </DialogDescription>
              )}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <CardContent className='min-h-[500px] overflow-scroll' {...props}>
        <CardHeader>
          <CardTitle className='-ml-5 mb-4'>Upcoming Events</CardTitle>
        </CardHeader>
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
      </CardContent>
    </Card>
  );
}
