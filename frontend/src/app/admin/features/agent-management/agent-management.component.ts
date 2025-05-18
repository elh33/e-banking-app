import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgentService } from '../../core/services/agent.service';
import { Agent } from '../../core/models/agent.model';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash, faPlus, faTimes, faKey, faUserCheck, faUserSlash, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-agent-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FaIconComponent],
  templateUrl: './agent-management.component.html',
  styleUrls: ['./agent-management.component.css']
})
export class AgentManagementComponent implements OnInit {
  agents: Agent[] = [];
  isLoading: boolean = true;
  showForm: boolean = false;
  isEditing: boolean = false;
  currentAgentId: string | null = null;
  searchTerm: string = '';
  statusFilter: string = 'ALL';
  
  agentForm: FormGroup;
  
  // Icons
  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;
  faTimes = faTimes;
  faKey = faKey;
  faUserCheck = faUserCheck;
  faUserSlash = faUserSlash;
  faExclamationTriangle = faExclamationTriangle;

  constructor(
    private agentService: AgentService,
    private fb: FormBuilder
  ) {
    this.agentForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      role: ['AGENT', [Validators.required]],
      status: ['ACTIVE', [Validators.required]],
      branchId: ['', [Validators.required]],
      branchName: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadAgents();
  }

  loadAgents(): void {
    this.isLoading = true;
    this.agentService.getAllAgents().subscribe(
      agents => {
        this.agents = agents;
        this.isLoading = false;
      },
      error => {
        console.error('Error loading agents:', error);
        this.isLoading = false;
      }
    );
  }

  onSubmit(): void {
    if (this.agentForm.invalid) return;
    
    const formValue = this.agentForm.value;
    
    if (this.isEditing && this.currentAgentId) {
      // Update existing agent
      this.agentService.updateAgent(this.currentAgentId, formValue).subscribe(
        updatedAgent => {
          const index = this.agents.findIndex(a => a.id === this.currentAgentId);
          if (index !== -1 && updatedAgent) {
            this.agents[index] = updatedAgent;
          }
          this.resetForm();
        },
        error => console.error('Error updating agent:', error)
      );
    } else {
      // Create new agent
      this.agentService.createAgent(formValue).subscribe(
        newAgent => {
          this.agents.push(newAgent);
          this.resetForm();
        },
        error => console.error('Error creating agent:', error)
      );
    }
  }

  editAgent(agent: Agent): void {
    this.isEditing = true;
    this.currentAgentId = agent.id;
    this.showForm = true;
    
    this.agentForm.patchValue({
      firstName: agent.firstName,
      lastName: agent.lastName,
      email: agent.email,
      phone: agent.phone,
      role: agent.role,
      status: agent.status,
      branchId: agent.branchId,
      branchName: agent.branchName
    });
  }

  deleteAgent(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet agent ?')) {
      this.agentService.deleteAgent(id).subscribe(
        success => {
          if (success) {
            this.agents = this.agents.filter(a => a.id !== id);
          }
        },
        error => console.error('Error deleting agent:', error)
      );
    }
  }

  resetPassword(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser le mot de passe de cet agent ?')) {
      this.agentService.resetAgentPassword(id).subscribe(
        response => {
          if (response.success) {
            alert('Le mot de passe a été réinitialisé et envoyé à l\'agent par email.');
          }
        },
        error => console.error('Error resetting password:', error)
      );
    }
  }

  updateAgentStatus(agent: Agent, newStatus: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'): void {
    if (confirm(`Êtes-vous sûr de vouloir ${newStatus === 'ACTIVE' ? 'activer' : newStatus === 'INACTIVE' ? 'désactiver' : 'suspendre'} cet agent ?`)) {
      this.agentService.updateAgentStatus(agent.id, newStatus).subscribe(
        updatedAgent => {
          const index = this.agents.findIndex(a => a.id === agent.id);
          if (index !== -1 && updatedAgent) {
            this.agents[index] = updatedAgent;
          }
        },
        error => console.error('Error updating agent status:', error)
      );
    }
  }

  resetForm(): void {
    this.agentForm.reset({ role: 'AGENT', status: 'ACTIVE' });
    this.isEditing = false;
    this.currentAgentId = null;
    this.showForm = false;
  }

  toggleForm(): void {
    if (this.showForm && this.isEditing) {
      this.resetForm();
    } else {
      this.showForm = !this.showForm;
      if (!this.showForm) {
        this.resetForm();
      }
    }
  }

  filterByStatus(status: string): void {
    this.statusFilter = status;
  }

  getFilteredAgents(): Agent[] {
    let result = this.agents;
    
    // Filter by status if not "ALL"
    if (this.statusFilter !== 'ALL') {
      result = result.filter(agent => agent.status === this.statusFilter);
    }
    
    // Then filter by search term if any
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(agent => 
        agent.firstName.toLowerCase().includes(term) ||
        agent.lastName.toLowerCase().includes(term) ||
        agent.email.toLowerCase().includes(term) ||
        (agent.phone && agent.phone.includes(term)) ||
        (agent.branchName && agent.branchName.toLowerCase().includes(term))
      );
    }
    
    return result;
  }

  formatDate(date: Date | undefined): string {
    if (!date) return 'Jamais';
    return new Date(date).toLocaleDateString();
  }
}