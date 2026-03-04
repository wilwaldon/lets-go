export interface ServiceArea {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  displayOrder: number;
}

export interface ServiceOffering {
  id: string;
  serviceAreaId: string;
  name: string;
  description: string;
  features: string[];
  displayOrder: number;
}

export interface Professional {
  id: string;
  name: string;
  title: string;
  bio?: string;
  imageUrl?: string;
  specialties: string[];
  credentials: string[];
  email?: string;
  phone?: string;
}

export interface Consultation {
  id: string;
  userId: string;
  professionalId: string;
  serviceAreaId: string;
  date: string;
  time: string;
  duration: number; // in minutes
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  meetingType: 'in_person' | 'video' | 'phone';
  createdAt: string;
  updatedAt: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  description: string;
  challenge?: string;
  solution?: string;
  results?: string;
  imageUrl?: string;
  isFeatured: boolean;
}

export interface ConsultationFormData {
  professionalId: string;
  serviceAreaId: string;
  date: string;
  time: string;
  meetingType: 'in_person' | 'video' | 'phone';
  notes?: string;
}
