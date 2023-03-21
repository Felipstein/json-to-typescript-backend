export interface EnvConfig {
  PORT: number;
  ORIGIN: string;
}

export const env = process.env as unknown as EnvConfig;
