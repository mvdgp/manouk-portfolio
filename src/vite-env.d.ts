/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RESUME_MASTER_ENABLED?: string;
  readonly VITE_RESUME_MASTER_PHONE?: string;
  readonly VITE_RESUME_MASTER_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
