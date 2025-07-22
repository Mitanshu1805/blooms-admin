export const hasPermission = (
  moduleName: string,
  permissionType: string
): boolean => {
  const permissions = localStorage.getItem("permissions");

  if (!permissions) return false;

  try {
    const parsedPermissions: Record<string, string[]> = JSON.parse(permissions);

    const modulePermissions = parsedPermissions[moduleName];

    // console.log("modulePermissions -> ", modulePermissions);

    if (!modulePermissions || !Array.isArray(modulePermissions)) return false;

    return modulePermissions.includes(permissionType);
  } catch (err) {
    console.error("Permission parse error:", err);
    return false;
  }
};
