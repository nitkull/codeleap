// Service name (S)
export const SERVICE_GATEWAY = 'gateway';
export const SERVICE_USERS = 'users';
export const SERVICE_MAIL = 'mail';
export const SERVICE_AUTH = 'auth';
export const SERVICE_STORAGE = 'storage';
export const SERVICE_FILE = 'file';
export const SERVICE_CONFIGS = 'configs';
export const SERVICE_TYPE_UPLOAD = 'type_upload';
export const SERVICE_HISTORY = 'history';
export const SERVICE_STEAM = 'steam';
export const SERVICE_PREFERENCE = 'preferences';
export const SERVICE_ITEM = 'items';
export const SERVICE_STEAM_BOT = 'steam_bot';
export const SERVICE_CATEGORY = 'categories';
export const SERVICE_BREEDS = 'breeds';
export const SERVICE_CONTRACT = 'contract';
export const SERVICE_MARKET_PRICES = 'market-prices';
export const SERVICE_ADMIN = 'admin';

// Service name (E)

export const HASH_ALGORITHM = '$2b$'; // Blowfish-based crypt Algorithm

// ROLES (S)
export const ROLE_SYSTEM = '$system';
export const ROLE_EVERYONE = '$everyone';
export const ROLE_AUTHENTICATED = '$authenticated';
export const ROLE_OWNER = '$owner';
export const ROLE_ADMIN = 'admin';
// ROLES (E)

// SCHEMA NAME (S)
export const SCHEMA_AUTH = 'auth';
// SCHEMA NAME (E)

// ERROR (S)
export const ERR_ENTITY_NOT_FOUND = 'ERR_ENTITY_NOT_FOUND';
export const ERR_USER_NOT_FOUND = 'ERR_USER_NOT_FOUND';
export const ERR_ACCOUNT_NOT_VERIFIED = 'ERR_ACCOUNT_NOT_VERIFIED';
export const ERR_ACCOUNT_DISABLED = 'ERR_ACCOUNT_DISABLED';
export const ERR_USR_OR_EML_EXISTED = 'ERR_USR_OR_EML_EXISTED';
export const ERR_INVALID_TOKEN = 'INVALID_TOKEN';
export const ERR_USER_ALREADY_ENABLED = 'USER_ALREADY_ENABLED';
export const ERR_USER_ALREADY_DISABLED = 'USER_ALREADY_DISABLED';
export const ERR_INTERNALL_ERROR = 'ERR_INTERNALL_ERROR';
export const NO_LOGGED_IN_USER = 'NO_LOGGED_IN_USER';
export const ERR_USR_NOT_EXISTED = 'ERR_USR_NOT_EXISTED';
export const ERR_REQUIRED_FIELD_MISSING = 'ERR_REQUIRED_FIELD_MISSING';
export const VALIDATION_ERROR = 'VALIDATION_ERROR';
export const ERR_TOKEN_VERIFY_EMAIL = 'ERR_TOKEN_VERIFY_EMAIL';
export const ERR_EMAIL_VERIFIED = 'ERR_EMAIL_VERIFIED';
// ERROR (E)

// FILE TYPE (S)
export const FILE_TYPE = {
  IMAGE: 'IMAGE'
};

// ITEM STATUS (E)
export const ITEM_STATUS = {
  EMPTY: 'empty',
  PROCESSING: 'processing',
  FAIL: 'fail',
  SUCCESS: 'success',
  DEPOSITED: 'deposited'
};
