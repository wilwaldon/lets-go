export interface ClassType {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  maxCapacity: number;
  imageUrl?: string;
  category: string;
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  bio?: string;
  imageUrl?: string;
  specialties: string[];
  certifications: string[];
}

export interface ClassSession {
  id: string;
  classTypeId: string;
  instructorId: string;
  startTime: string;
  endTime: string;
  dayOfWeek: number; // 0 = Sunday, 6 = Saturday
  currentCapacity: number;
  maxCapacity: number;
  isActive: boolean;
}

export interface ClassBooking {
  id: string;
  userId: string;
  classSessionId: string;
  bookingDate: string;
  status: 'confirmed' | 'cancelled' | 'completed' | 'no_show';
  createdAt: string;
  updatedAt: string;
}

export interface Membership {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  isPopular?: boolean;
  displayOrder: number;
}

export interface BookingFormData {
  classSessionId: string;
  bookingDate: string;
}
