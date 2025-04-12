declare namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT: number;
      SUPABASE_URL: string;
      SUPABASE_SERVICE_ROLE_KEY?: string;
      FIREBASE_PROJECT_ID: string;
      FIREBASE_CLIENT_EMAIL: string;
      FIREBASE_PRIVATE_KEY: string;
      DATABASE_CONN_STRING: string;
    }
  }