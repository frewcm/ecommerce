declare global {
  namespace NodeJS {
    interface Global {
      NODE_ENV: "development" | "production";
    }
  }
}

export {};
