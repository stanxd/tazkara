
import React from 'react';

// Update the TicketProps interface to include all needed fields
export interface TicketProps {
  id: number;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  stadium: string;
  city: string;
  price: number;
  availableCount: number;
  isGift?: boolean;
  extraIcon?: React.ReactNode;
  isPriceFluctuating?: boolean;
}
