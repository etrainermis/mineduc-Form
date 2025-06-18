export interface Workshop {
  id: string;
  name: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  capacity: number;
  registeredCount: number;
  imageUrl?: string;
  event?: string;
  presenters?: string[];
  presenterEmails?: string[];
  delegates?: number;
  venue: string;
  schedule: string;
  speakers: string[];
} 

export type User = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  role: string;
  assignedWorkshops: string[];
};