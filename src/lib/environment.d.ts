declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HEADER_USER: string;
      HEADER_NAME: string;
      HEADER_GROUPS: string;
    }
  }
}
