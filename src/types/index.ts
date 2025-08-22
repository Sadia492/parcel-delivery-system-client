import type { ComponentType } from "react";

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}
export type TRole = "ADMIN" | "SENDER" | "RECEIVER";
export type TParcelStatus =
  | "REQUESTED"
  | "APPROVED"
  | "DISPATCHED"
  | "DELIVERED"
  | "CANCELED";

export interface IStatusLog {
  status: TParcelStatus;
  timestamp: string; // ISO date string
  note?: string;
  updatedBy: string; // userId
}

export interface IParcel {
  _id: string;
  trackingId: string;
  senderId: string;
  receiverId: string;
  parcelType: "PACKAGE" | "DOCUMENT" | "OTHER";
  weight: number;
  fee: number;
  status: TParcelStatus;
  statusLogs: IStatusLog[];
  isBlocked: boolean;
  isCanceled: boolean;
  fromAddress: string;
  toAddress: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
