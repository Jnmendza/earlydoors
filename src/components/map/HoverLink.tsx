import React from "react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface HoverLinksProps {
  title: string;
  cardContent: string;
}

const HoverLink = ({ title, cardContent }: HoverLinksProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant='link'>{title}</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <p>{cardContent}</p>
      </HoverCardContent>
    </HoverCard>
  );
};

export default HoverLink;
