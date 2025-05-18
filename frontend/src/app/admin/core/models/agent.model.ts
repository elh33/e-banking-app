export interface Agent {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    role: 'AGENT' | 'SUPERVISOR';
    status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
    createdAt: Date;
    lastLogin?: Date;
    branchId?: string;
    branchName?: string;
  }