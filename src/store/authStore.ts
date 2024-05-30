"use client";
import { User } from "@prisma/client";
import { makeAutoObservable } from "mobx";
import { makePersistable, clearPersistedStore } from "mobx-persist-store";
import { enableStaticRendering } from "mobx-react";

enableStaticRendering(typeof window === "undefined");
export type TAuthState = {
  isLoggedIn: boolean;
  userDetails: User | null;
  accessToken: string;
};

class AuthStoreClass {
  isLoggedIn: boolean = false;
  accessToken: string | null = null;
  userDetails: User | null = null;

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: "AuthStoreClass",
      properties: ["isLoggedIn", "userDetails", "accessToken"],
      storage:
        typeof window !== "undefined" ? window.sessionStorage : undefined,
      expireIn: 86400000, // One day in milliseconds
      removeOnExpiration: true,
    });
  }
  setIsLoggedIn(value: boolean) {
    this.isLoggedIn = value;
  }
  setAccessToken(value: string) {
    this.accessToken = value;
  }

  setUserDetails(payload: User) {
    this.userDetails = payload;
  }

  async clearAuthStoredData() {
    await clearPersistedStore(this);
  }

  async logoutAndClearAuthData() {
    this.isLoggedIn = false;
    this.userDetails = null;
    await this.clearAuthStoredData();
  }
}

export const authStore = new AuthStoreClass();
export type TAuthStoreClass = typeof AuthStoreClass;
