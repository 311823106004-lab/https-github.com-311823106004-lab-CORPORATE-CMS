export interface Service {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDetails?: string;
  startingPrice?: string;
  imageUrl: string;
  iconName: string;
  isPublished: boolean;
  featured?: boolean;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDetails?: string;
  client: string;
  completionStatus: 'Completed' | 'In Progress' | 'Active';
  imageUrl: string;
  tags: string[];
  isPublished: boolean;
  featured?: boolean;
  completionYear: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  bio: string;
  profileImageUrl: string;
  linkedinUrl?: string;
  email?: string;
  isPublished: boolean;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientCompany: string;
  clientRole: string;
  avatarUrl: string;
  feedback: string;
  rating: number; // 1 to 5
  isPublished: boolean;
  projectCategory?: string;
  updatedAt: string;
}

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'New' | 'In Progress' | 'Contacted' | 'Closed';
  createdAt: string;
  internalNotes?: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  details: string;
  timestamp: string;
  entityType: 'service' | 'project' | 'team' | 'testimonial' | 'enquiry' | 'system';
}

export type PublicPage = 'home' | 'about' | 'services' | 'projects' | 'team' | 'testimonials' | 'contact';
export type AdminTab = 'dashboard' | 'services' | 'projects' | 'team' | 'testimonials' | 'enquiries';
export type ViewMode = 'website' | 'admin' | 'login';
