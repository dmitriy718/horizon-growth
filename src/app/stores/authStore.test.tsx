import { useAuthStore } from "./authStore";

describe("authStore", () => {
  it("should have the correct initial state", () => {
    const { isAuthenticated, user, tokens } = useAuthStore.getState();
    expect(isAuthenticated).toBe(false);
    expect(user).toBeNull();
    expect(tokens).toBeNull();
  });
});
