import Api, { supabase } from "@api";
import { useQueryKeyStore } from "@api-hooks";
import { IUserData } from "@local-types/user";
import { Session, User, WeakPassword } from "@supabase/supabase-js";
import {
  UseMutateFunction,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { usePathname, useRouter } from "expo-router";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type UserContextValue = {
  user: User | null;
  isSigningIn: boolean;
  signInWithPassword: UseMutateFunction<
    {
      user: User;
      session: Session;
      weakPassword?: WeakPassword;
    },
    Error,
    {
      email: string;
      password: string;
    },
    unknown
  >;
  isSigningUp: boolean;
  signUpWithPassword: UseMutateFunction<
    {
      user: User | null;
      session: Session | null;
    },
    Error,
    {
      email: string;
      password: string;
    },
    unknown
  >;
  logOut: () => void;
  userData?: IUserData;
};

const UserContext = createContext<UserContextValue>({
  user: null,
  signInWithPassword: () => {},
  isSigningIn: false,
  signUpWithPassword: () => {},
  isSigningUp: false,
  logOut: () => {},
});

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const queryKeyStore = useQueryKeyStore();

  const { data: userData } = useQuery({
    queryKey: queryKeyStore.userData.get,
    queryFn: () => Api.userData.getByUserId(user?.id ?? ""),
  });

  useEffect(() => {
    (async () => {
      const {
        data: { user: sessionUser },
      } = await supabase.auth.getUser();

      setUser(sessionUser);

      if (!sessionUser && !PUBLIC_PATHNAMES.includes(pathname)) {
        router.replace("/sign-in");
      }
    })();
  }, [pathname, router]);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace("/sign-in");

      setUser(session?.user ?? null);
    });
  }, [router]);

  const logOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.replace("/sign-in");
  }, [router]);

  const { mutate: signInWithPassword, isPending: isSigningIn } = useMutation({
    mutationFn: Api.auth.signInWithPassword,
    onSuccess: (response) => {
      setUser(response.user);
      router.replace("/(tabs)/goals");
    },
  });

  const { mutate: signUpWithPassword, isPending: isSigningUp } = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const signUpResponse = await Api.auth.signUpWithPassword(credentials);
      if (signUpResponse.user) {
        await Api.userData.create({ user_id: signUpResponse.user.id });
        await Api.readingTracker.create({ user_id: signUpResponse.user.id });
      }

      return signUpResponse;
    },
    onSuccess: () => {
      router.replace("/(public)/sign-in");
    },
  });

  return (
    <UserContext
      value={{
        user,
        signInWithPassword,
        isSigningIn,
        signUpWithPassword,
        isSigningUp,
        logOut,
        userData,
      }}
    >
      {children}
    </UserContext>
  );
};

export const useUserContext = () => useContext(UserContext);

const PUBLIC_PATHNAMES = ["/sign-in", "/sign-up"];
