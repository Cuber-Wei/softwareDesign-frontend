import ACCESSENUM from "@/access/accessEnum";

/**
 * 检查权限
 * @param loginUser 当前登录用户
 * @param needAccess 需要有的权限
 * @return boolean 是否有对应权限
 */
const checkAccess = (loginUser: any, needAccess: string) => {
  // 获取当权用户具有的权限(默认未登录)
  const loginUserAccess = loginUser?.userRole ?? ACCESSENUM.NOT_LOGIN;
  if (needAccess === ACCESSENUM.NOT_LOGIN) {
    // 无需登录，直接访问
    return true;
  } else {
    if (
      needAccess === ACCESSENUM.USER &&
      loginUserAccess === ACCESSENUM.NOT_LOGIN
    ) {
      // 需要登录但是未登录，拒绝访问
      return false;
    }
    if (
      needAccess === ACCESSENUM.ADMIN &&
      loginUserAccess !== ACCESSENUM.ADMIN
    ) {
      // 需要管理员权限但是不是管理员，拒绝访问
      return false;
    }
  }
  // 其余情况均符合权限管理
  return true;
};
export default checkAccess;
