export interface Permission {
  id: number;
  code: string;
  display_name: string;
  category: string;
  value: 0 | 1;
}

export const hasPermission = (permissionCode: string): boolean => {
  const permissionsJson = localStorage.getItem('user_permissions') || sessionStorage.getItem('user_permissions');
  // console.log('permissionsJson', permissionsJson)
  if (!permissionsJson) return false;

  try {
    const permissions: Permission[] = JSON.parse(permissionsJson);
    const permission = permissions.find(p => p.code === permissionCode);

    // Check if the permission exists AND its value is 1
    return permission?.value === 1;
  } catch (error) {
    console.error("Failed to parse user permissions:", error);
    return false;
  }
};