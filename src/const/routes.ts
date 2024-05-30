export const ROUTES = {
  // auth
  SIGN_IN: "/sign-in",
  SETUP_CHATID: "/setup-chatId",
  SETUP_PROFILE: "/setup-profile",
  VERIFY: (email: string) => {
    const params = new URLSearchParams({
      email,
    });
    return `/verify-mail?${params}`;
  },
  CHAT_DASHBOARD: (params: { recipientId?: string; chatId?: string }) => {
    const urlParams = new URLSearchParams(params);
    return `/chat?${urlParams}`;
  },
} as const;
