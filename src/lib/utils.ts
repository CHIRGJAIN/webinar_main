import { format, formatDistanceToNow } from "date-fns";
import clsx, { type ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => clsx(inputs);

export const formatDateTime = (iso: string) => format(new Date(iso), "EEE, MMM d · h:mmaaa");

export const formatDate = (iso: string) => format(new Date(iso), "MMM d, yyyy");

export const timeUntil = (iso: string) => formatDistanceToNow(new Date(iso), { addSuffix: true });

export const formatDuration = (minutes: number) => `${minutes} min`;

