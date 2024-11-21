/* eslint-disable @typescript-eslint/no-explicit-any */
import useStore from "./store"; // Ensure this import is correct and there are no circular dependencies

const selector = (key: string) => (state: any) => state[key];

const storeProvider = useStore.getState();

export const {
  saveAdminInfo,
  setShowLoading,
  logoutAdmin
} = storeProvider;

export { selector, storeProvider };
