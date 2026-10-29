import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Service,
  Project,
  TeamMember,
  Testimonial,
  ContactEnquiry,
  ActivityLog,
  PublicPage,
  AdminTab,
  ViewMode,
} from '../types';
import {
  INITIAL_SERVICES,
  INITIAL_PROJECTS,
  INITIAL_TEAM,
  INITIAL_TESTIMONIALS,
  INITIAL_ENQUIRIES,
  INITIAL_ACTIVITY_LOGS,
} from '../data/initialData';

interface AdminUser {
  username: string;
  name: string;
  role: string;
}

interface AppContextType {
  // Navigation & View State
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  activePublicPage: PublicPage;
  setActivePublicPage: (page: PublicPage) => void;
  activeAdminTab: AdminTab;
  setActiveAdminTab: (tab: AdminTab) => void;

  // Authentication State
  isAuthenticated: boolean;
  adminUser: AdminUser | null;
  login: (username: string, password: string) => boolean;
  demoLogin: () => void;
  logout: () => void;

  // Shared Data Collections
  services: Service[];
  projects: Project[];
  team: TeamMember[];
  testimonials: Testimonial[];
  enquiries: ContactEnquiry[];
  activityLogs: ActivityLog[];

  // Service Operations
  addService: (service: Omit<Service, 'id' | 'updatedAt'>) => void;
  updateService: (service: Service) => void;
  deleteService: (id: string) => void;
  togglePublishService: (id: string) => void;

  // Project Operations
  addProject: (project: Omit<Project, 'id' | 'updatedAt'>) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  togglePublishProject: (id: string) => void;

  // Team Operations
  addTeamMember: (member: Omit<TeamMember, 'id' | 'updatedAt'>) => void;
  updateTeamMember: (member: TeamMember) => void;
  deleteTeamMember: (id: string) => void;
  togglePublishTeamMember: (id: string) => void;

  // Testimonial Operations
  addTestimonial: (testimonial: Omit<Testimonial, 'id' | 'updatedAt'>) => void;
  updateTestimonial: (testimonial: Testimonial) => void;
  deleteTestimonial: (id: string) => void;
  togglePublishTestimonial: (id: string) => void;

  // Contact Enquiry Operations
  submitContactForm: (data: { name: string; email: string; phone: string; subject: string; message: string }) => boolean;
  updateEnquiryStatus: (id: string, status: ContactEnquiry['status']) => void;
  deleteEnquiry: (id: string) => void;
  updateEnquiryNotes: (id: string, notes: string) => void;

  // System & Reset
  restoreSampleData: () => void;
  logActivity: (action: string, details: string, entityType: ActivityLog['entityType']) => void;
}

const STORAGE_KEY = 'nexora_tech_corporate_demo_v1';
const AUTH_KEY = 'nexora_admin_auth_session';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [viewMode, setViewModeState] = useState<ViewMode>('website');
  const [activePublicPage, setActivePublicPage] = useState<PublicPage>('home');
  const [activeAdminTab, setActiveAdminTab] = useState<AdminTab>('dashboard');

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      if (localStorage.getItem(AUTH_KEY) === 'true') {
        return {
          username: 'admin@nexoratech.com',
          name: 'Executive Administrator',
          role: 'Platform Owner',
        };
      }
    } catch {
      // ignore
    }
    return null;
  });

  // Persistent Shared Collections
  const [services, setServices] = useState<Service[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_services`);
      if (saved) {
        const parsed: Service[] = JSON.parse(saved);
        // Merge in any missing service items from updated INITIAL_SERVICES list
        const existingIds = new Set(parsed.map((s) => s.id));
        const missing = INITIAL_SERVICES.filter((s) => !existingIds.has(s.id));
        return missing.length > 0 ? [...parsed, ...missing] : parsed;
      }
      return INITIAL_SERVICES;
    } catch {
      return INITIAL_SERVICES;
    }
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_projects`);
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  const [team, setTeam] = useState<TeamMember[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_team`);
      return saved ? JSON.parse(saved) : INITIAL_TEAM;
    } catch {
      return INITIAL_TEAM;
    }
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_testimonials`);
      return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
    } catch {
      return INITIAL_TESTIMONIALS;
    }
  });

  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_enquiries`);
      return saved ? JSON.parse(saved) : INITIAL_ENQUIRIES;
    } catch {
      return INITIAL_ENQUIRIES;
    }
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_activity`);
      return saved ? JSON.parse(saved) : INITIAL_ACTIVITY_LOGS;
    } catch {
      return INITIAL_ACTIVITY_LOGS;
    }
  });

  // Auto-sync state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_services`, JSON.stringify(services));
    } catch (e) {
      console.error('Failed saving services to localStorage', e);
    }
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_projects`, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed saving projects to localStorage', e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_team`, JSON.stringify(team));
    } catch (e) {
      console.error('Failed saving team to localStorage', e);
    }
  }, [team]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_testimonials`, JSON.stringify(testimonials));
    } catch (e) {
      console.error('Failed saving testimonials to localStorage', e);
    }
  }, [testimonials]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_enquiries`, JSON.stringify(enquiries));
    } catch (e) {
      console.error('Failed saving enquiries to localStorage', e);
    }
  }, [enquiries]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_activity`, JSON.stringify(activityLogs));
    } catch (e) {
      console.error('Failed saving activities to localStorage', e);
    }
  }, [activityLogs]);

  const logActivity = (action: string, details: string, entityType: ActivityLog['entityType']) => {
    const newLog: ActivityLog = {
      id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      action,
      details,
      timestamp: new Date().toISOString(),
      entityType,
    };
    setActivityLogs((prev) => [newLog, ...prev.slice(0, 49)]);
  };

  const setViewMode = (mode: ViewMode) => {
    setViewModeState(mode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth Operations
  const login = (username: string, password: string): boolean => {
    // Demo validation accepts demo credentials or standard inputs
    const validUser = username.trim().toLowerCase();
    const validPass = password.trim();
    if (
      (validUser === 'admin@nexoratech.com' && validPass === 'nexora2026') ||
      (validUser === 'admin' && validPass === 'admin') ||
      (validUser.includes('@') && validPass.length >= 4)
    ) {
      setIsAuthenticated(true);
      const user = {
        username: validUser,
        name: 'Executive Administrator',
        role: 'Platform Owner',
      };
      setAdminUser(user);
      try {
        localStorage.setItem(AUTH_KEY, 'true');
      } catch {
        // ignore
      }
      logActivity('Admin Login', `Session initiated for ${user.username}`, 'system');
      setViewMode('admin');
      return true;
    }
    return false;
  };

  const demoLogin = () => {
    setIsAuthenticated(true);
    const user = {
      username: 'admin@nexoratech.com',
      name: 'Corporate Demo Administrator',
      role: 'Platform Owner',
    };
    setAdminUser(user);
    try {
      localStorage.setItem(AUTH_KEY, 'true');
    } catch {
      // ignore
    }
    logActivity('Quick Demo Login', 'One-click administrative access granted', 'system');
    setViewMode('admin');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdminUser(null);
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch {
      // ignore
    }
    logActivity('Admin Logout', 'Administrative session ended', 'system');
    setViewMode('website');
  };

  // Service Actions
  const addService = (newSrv: Omit<Service, 'id' | 'updatedAt'>) => {
    const id = `srv-${Date.now()}`;
    const service: Service = {
      ...newSrv,
      id,
      updatedAt: new Date().toISOString(),
    };
    setServices((prev) => [service, ...prev]);
    logActivity('Added Service', `Created service "${service.title}" (${service.category})`, 'service');
  };

  const updateService = (updated: Service) => {
    setServices((prev) =>
      prev.map((s) => (s.id === updated.id ? { ...updated, updatedAt: new Date().toISOString() } : s))
    );
    logActivity('Updated Service', `Modified details for "${updated.title}"`, 'service');
  };

  const deleteService = (id: string) => {
    const target = services.find((s) => s.id === id);
    setServices((prev) => prev.filter((s) => s.id !== id));
    logActivity('Deleted Service', `Removed service "${target ? target.title : id}"`, 'service');
  };

  const togglePublishService = (id: string) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const nextState = !s.isPublished;
          logActivity(
            nextState ? 'Published Service' : 'Unpublished Service',
            `Service "${s.title}" set to ${nextState ? 'Live' : 'Draft'}`,
            'service'
          );
          return { ...s, isPublished: nextState, updatedAt: new Date().toISOString() };
        }
        return s;
      })
    );
  };

  // Project Actions
  const addProject = (newPrj: Omit<Project, 'id' | 'updatedAt'>) => {
    const id = `prj-${Date.now()}`;
    const project: Project = {
      ...newPrj,
      id,
      updatedAt: new Date().toISOString(),
    };
    setProjects((prev) => [project, ...prev]);
    logActivity('Added Project', `Created portfolio case study "${project.title}"`, 'project');
  };

  const updateProject = (updated: Project) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updated.id ? { ...updated, updatedAt: new Date().toISOString() } : p))
    );
    logActivity('Updated Project', `Modified case study "${updated.title}"`, 'project');
  };

  const deleteProject = (id: string) => {
    const target = projects.find((p) => p.id === id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
    logActivity('Deleted Project', `Removed project "${target ? target.title : id}"`, 'project');
  };

  const togglePublishProject = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextState = !p.isPublished;
          logActivity(
            nextState ? 'Published Project' : 'Unpublished Project',
            `Project "${p.title}" set to ${nextState ? 'Public' : 'Draft'}`,
            'project'
          );
          return { ...p, isPublished: nextState, updatedAt: new Date().toISOString() };
        }
        return p;
      })
    );
  };

  // Team Actions
  const addTeamMember = (newMember: Omit<TeamMember, 'id' | 'updatedAt'>) => {
    const id = `team-${Date.now()}`;
    const member: TeamMember = {
      ...newMember,
      id,
      updatedAt: new Date().toISOString(),
    };
    setTeam((prev) => [member, ...prev]);
    logActivity('Added Team Member', `Added profile for ${member.name} (${member.designation})`, 'team');
  };

  const updateTeamMember = (updated: TeamMember) => {
    setTeam((prev) =>
      prev.map((t) => (t.id === updated.id ? { ...updated, updatedAt: new Date().toISOString() } : t))
    );
    logActivity('Updated Team Member', `Updated profile of ${updated.name}`, 'team');
  };

  const deleteTeamMember = (id: string) => {
    const target = team.find((t) => t.id === id);
    setTeam((prev) => prev.filter((t) => t.id !== id));
    logActivity('Deleted Team Member', `Removed profile of ${target ? target.name : id}`, 'team');
  };

  const togglePublishTeamMember = (id: string) => {
    setTeam((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextState = !t.isPublished;
          logActivity(
            nextState ? 'Published Team Profile' : 'Unpublished Team Profile',
            `Profile for ${t.name} set to ${nextState ? 'Visible' : 'Hidden'}`,
            'team'
          );
          return { ...t, isPublished: nextState, updatedAt: new Date().toISOString() };
        }
        return t;
      })
    );
  };

  // Testimonial Actions
  const addTestimonial = (newTestimonial: Omit<Testimonial, 'id' | 'updatedAt'>) => {
    const id = `tst-${Date.now()}`;
    const testimonial: Testimonial = {
      ...newTestimonial,
      id,
      updatedAt: new Date().toISOString(),
    };
    setTestimonials((prev) => [testimonial, ...prev]);
    logActivity(
      'Added Testimonial',
      `Added client feedback from ${testimonial.clientName} (${testimonial.clientCompany})`,
      'testimonial'
    );
  };

  const updateTestimonial = (updated: Testimonial) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === updated.id ? { ...updated, updatedAt: new Date().toISOString() } : t))
    );
    logActivity('Updated Testimonial', `Updated testimonial by ${updated.clientName}`, 'testimonial');
  };

  const deleteTestimonial = (id: string) => {
    const target = testimonials.find((t) => t.id === id);
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    logActivity('Deleted Testimonial', `Removed review from ${target ? target.clientName : id}`, 'testimonial');
  };

  const togglePublishTestimonial = (id: string) => {
    setTestimonials((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextState = !t.isPublished;
          logActivity(
            nextState ? 'Published Testimonial' : 'Unpublished Testimonial',
            `Feedback from ${t.clientName} set to ${nextState ? 'Public' : 'Hidden'}`,
            'testimonial'
          );
          return { ...t, isPublished: nextState, updatedAt: new Date().toISOString() };
        }
        return t;
      })
    );
  };

  // Contact Form & Enquiries
  const submitContactForm = (formData: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }): boolean => {
    const newEnquiry: ContactEnquiry = {
      id: `enq-${Date.now()}`,
      ...formData,
      status: 'New',
      createdAt: new Date().toISOString(),
      internalNotes: 'Inbound enquiry submitted via Nexora Technologies public website contact form.',
    };
    setEnquiries((prev) => [newEnquiry, ...prev]);
    logActivity('New Customer Enquiry', `Received enquiry from ${formData.name}: "${formData.subject}"`, 'enquiry');
    return true;
  };

  const updateEnquiryStatus = (id: string, status: ContactEnquiry['status']) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
    logActivity('Enquiry Status Updated', `Enquiry #${id} marked as "${status}"`, 'enquiry');
  };

  const deleteEnquiry = (id: string) => {
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
    logActivity('Deleted Enquiry', `Removed enquiry record #${id}`, 'enquiry');
  };

  const updateEnquiryNotes = (id: string, notes: string) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, internalNotes: notes } : e))
    );
    logActivity('Enquiry Notes Updated', `Updated internal notes on enquiry #${id}`, 'enquiry');
  };

  // Reset to Sample Data
  const restoreSampleData = () => {
    setServices(INITIAL_SERVICES);
    setProjects(INITIAL_PROJECTS);
    setTeam(INITIAL_TEAM);
    setTestimonials(INITIAL_TESTIMONIALS);
    setEnquiries(INITIAL_ENQUIRIES);
    const resetLog: ActivityLog = {
      id: `act-${Date.now()}`,
      action: 'Sample Data Restored',
      details: 'All services, projects, team, testimonials, and enquiries reset to original demo state',
      timestamp: new Date().toISOString(),
      entityType: 'system',
    };
    setActivityLogs([resetLog, ...INITIAL_ACTIVITY_LOGS]);

    try {
      localStorage.setItem(`${STORAGE_KEY}_services`, JSON.stringify(INITIAL_SERVICES));
      localStorage.setItem(`${STORAGE_KEY}_projects`, JSON.stringify(INITIAL_PROJECTS));
      localStorage.setItem(`${STORAGE_KEY}_team`, JSON.stringify(INITIAL_TEAM));
      localStorage.setItem(`${STORAGE_KEY}_testimonials`, JSON.stringify(INITIAL_TESTIMONIALS));
      localStorage.setItem(`${STORAGE_KEY}_enquiries`, JSON.stringify(INITIAL_ENQUIRIES));
      localStorage.setItem(`${STORAGE_KEY}_activity`, JSON.stringify([resetLog, ...INITIAL_ACTIVITY_LOGS]));
    } catch {
      // ignore
    }
  };

  return (
    <AppContext.Provider
      value={{
        viewMode,
        setViewMode,
        activePublicPage,
        setActivePublicPage,
        activeAdminTab,
        setActiveAdminTab,
        isAuthenticated,
        adminUser,
        login,
        demoLogin,
        logout,
        services,
        projects,
        team,
        testimonials,
        enquiries,
        activityLogs,
        addService,
        updateService,
        deleteService,
        togglePublishService,
        addProject,
        updateProject,
        deleteProject,
        togglePublishProject,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        togglePublishTeamMember,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        togglePublishTestimonial,
        submitContactForm,
        updateEnquiryStatus,
        deleteEnquiry,
        updateEnquiryNotes,
        restoreSampleData,
        logActivity,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
