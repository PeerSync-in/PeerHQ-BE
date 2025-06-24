import { Generated } from 'kysely';

interface UsersTable {
  id: Generated<number>; 
  fullName: string;
  email: string;
  password: string;
  emailVerified?: boolean | null;
  image?: string | null;
  role: string;
  createdAt?: Generated<Date>;
  updatedAt?: Generated<Date>;
  lastLoginAt?: Date | null;
  lastLoginIp?: string | null;
  signupIp?: string;
}

interface ProfilesTable  {
  id: Generated<number>;
  tagLine: string | null;
  description: string | null;
  languages: string | null;
  mobile: string | null;
  city: string | null;
  country: string | null;
  bannerPhoto: string | null;
  skills: string[];
  userOnboarded: Date | null;
  createdAt: Generated<Date>;
  updatedAt: Generated<Date>;
}

interface AccountsTable {
  id: Generated<number>;
  userId: number;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  access_token: string | null;
  expires_in: number | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
}

interface SessionsTable {
  id: Generated<number>;
  sessionToken: string;
}

export interface Database {
  users: UsersTable;
  profiles: ProfilesTable;
  accounts: AccountsTable;
  sessions: SessionsTable;
}