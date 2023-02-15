import type { ApiKey } from '@/interfaces/ApiKey';
import type { Project } from '@/interfaces/Project';
import type { Permission } from '@/interfaces/Permission';

import { api } from '@/services/api-service';

function getAllProjects(): Promise<Project[]> {
	return api.get(`/projects`);
}

function getProjectPermissionById(projectId: string | number): Promise<Permission[]> {
	return api.get(`/projects/${projectId}/permissions`);
}

function getProjectApiKeyById(projectId: string | number): Promise<ApiKey | undefined> {
	return api.get(`/projects/${projectId}/api-keys`);
}

export {
	getAllProjects,
	getProjectApiKeyById,
	getProjectPermissionById
};
