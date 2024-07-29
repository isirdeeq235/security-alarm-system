/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = ["/"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes: string[] = ["/login", "/register", "/forgot-password"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix: string = "/api";


/**
 * The default redirect path for admin after logging in
 * @type {string}
 */
export const DEFAULT_LOGGEDIN_REDIRECT: string = "/redirect";

/**
 * The default redirect path for user after logging in
 * @type {string}
 */
export const USER_LOGGEDIN_REDIRECT: string = "/user/dashboard";

/**
 * The default redirect path for admin after logging in
 * @type {string}
 */
export const ADMIN_LOGGEDIN_REDIRECT: string = "/admin/dashboard";


