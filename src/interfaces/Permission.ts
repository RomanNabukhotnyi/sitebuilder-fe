export interface Permission {
  id: number;
  userId: number;
  email: string;
  permission: 'OWNER' | 'DESIGNER';
}
