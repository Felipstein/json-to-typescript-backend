export interface EnvConfig {
  PORT: number;
  ORIGIN: string;
  OPENAI_KEY: string;
}

export const env = process.env as unknown as EnvConfig;
