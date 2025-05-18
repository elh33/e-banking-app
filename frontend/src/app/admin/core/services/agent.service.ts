import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Agent } from '../models/agent.model';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private mockAgents: Agent[] = [
    {
      id: '1',
      firstName: 'Ahmed',
      lastName: 'Bensouda',
      email: 'ahmed.bensouda@ebank.com',
      phone: '+212-664-555-111',
      role: 'AGENT',
      status: 'ACTIVE',
      createdAt: new Date('2023-01-15'),
      lastLogin: new Date('2023-05-10T14:32:00'),
      branchId: 'B001',
      branchName: 'Casablanca Main'
    },
    {
      id: '2',
      firstName: 'Fatima',
      lastName: 'Alami',
      email: 'fatima.alami@ebank.com',
      phone: '+212-664-555-222',
      role: 'SUPERVISOR',
      status: 'ACTIVE',
      createdAt: new Date('2023-01-20'),
      lastLogin: new Date('2023-05-10T09:15:00'),
      branchId: 'B001',
      branchName: 'Casablanca Main'
    },
    {
      id: '3',
      firstName: 'Karim',
      lastName: 'Idrissi',
      email: 'karim.idrissi@ebank.com',
      phone: '+212-664-555-333',
      role: 'AGENT',
      status: 'INACTIVE',
      createdAt: new Date('2023-02-05'),
      branchId: 'B002',
      branchName: 'Rabat Branch'
    },
    {
      id: '4',
      firstName: 'Leila',
      lastName: 'Bennani',
      email: 'leila.bennani@ebank.com',
      phone: '+212-664-555-444',
      role: 'AGENT',
      status: 'ACTIVE',
      createdAt: new Date('2023-02-10'),
      lastLogin: new Date('2023-05-09T16:45:00'),
      branchId: 'B002',
      branchName: 'Rabat Branch'
    },
    {
      id: '5',
      firstName: 'Omar',
      lastName: 'Chraibi',
      email: 'omar.chraibi@ebank.com',
      phone: '+212-664-555-555',
      role: 'AGENT',
      status: 'SUSPENDED',
      createdAt: new Date('2023-03-01'),
      lastLogin: new Date('2023-04-28T11:20:00'),
      branchId: 'B003',
      branchName: 'Marrakech Branch'
    },
  ];

  constructor(private http: HttpClient) { }

  getAllAgents(): Observable<Agent[]> {
    // Mock implementation
    return of(this.mockAgents);
  }

  getAgentById(id: string): Observable<Agent | undefined> {
    // Mock implementation
    const agent = this.mockAgents.find(a => a.id === id);
    return of(agent);
  }

  createAgent(agent: Omit<Agent, 'id' | 'createdAt'>): Observable<Agent> {
    // Mock implementation
    const newAgent: Agent = {
      ...agent,
      id: (this.mockAgents.length + 1).toString(),
      createdAt: new Date()
    };
    
    this.mockAgents.push(newAgent);
    return of(newAgent);
  }

  updateAgent(id: string, updates: Partial<Agent>): Observable<Agent | undefined> {
    // Mock implementation
    const index = this.mockAgents.findIndex(a => a.id === id);
    if (index !== -1) {
      this.mockAgents[index] = {
        ...this.mockAgents[index],
        ...updates
      };
      return of(this.mockAgents[index]);
    }
    return of(undefined);
  }

  deleteAgent(id: string): Observable<boolean> {
    // Mock implementation
    const initialLength = this.mockAgents.length;
    this.mockAgents = this.mockAgents.filter(a => a.id !== id);
    return of(initialLength > this.mockAgents.length);
  }

  updateAgentStatus(id: string, status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'): Observable<Agent | undefined> {
    // Mock implementation
    return this.updateAgent(id, { status });
  }

  resetAgentPassword(id: string): Observable<{ success: boolean }> {
    // Mock implementation - In real world, this would generate and send a new password
    return of({ success: true });
  }
}