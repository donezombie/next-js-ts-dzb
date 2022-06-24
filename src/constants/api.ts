//! Authentication
const AUTH_ROOT_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const LOGIN_URL = `${AUTH_ROOT_URL}/auth/login`;
export const SIGN_UP_URL = `${AUTH_ROOT_URL}/signup`;
export const LOGOUT_URL = `${AUTH_ROOT_URL}/log-out`;
export const REFRESH_TOKEN_URL = `${AUTH_ROOT_URL}/refreshtoken`;

//! Blockchain
export const BLOCK_ROOT_URL = process.env.REACT_APP_BOT_BLOCK_URL;
