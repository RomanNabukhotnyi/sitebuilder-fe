export interface ApiCreatePermission {
    email: string;
    permission: 'OWNER' | 'DESIGNER';
}