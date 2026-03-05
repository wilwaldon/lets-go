export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  category: string;
  imageUrl?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  title: string;
  bio?: string;
  imageUrl?: string;
  specialties: string[];
  availability?: string[];
}

export interface TimeSlot {
  time: string;
  available: boolean;
  displayTime?: string; // 12-hour format for display
}

export interface AvailabilityWindow {
  id: string;
  staffId: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // "HH:MM"
  endTime: string; // "HH:MM"
  isAvailable: boolean;
}

export interface Appointment {
  id: string;
  serviceId: string;
  staffId: string;
  customerId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingFormData {
  serviceId: string;
  staffId: string;
  date: string;
  time: string;
  notes?: string;
}
