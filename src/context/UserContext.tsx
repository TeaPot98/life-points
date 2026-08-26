import Api, { supabase } from "@api";
import { Session, User, WeakPassword } from "@supabase/supabase-js";
import { UseMutateFunction, useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "expo-router";
import {
  createContext,
  PropsWithChildren,
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
};

const UserContext = createContext<UserContextValue>({
  user: null,
  signInWithPassword: () => {},
  isSigningIn: false,
});

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const {
        data: { user: sessionUser },
      } = await supabase.auth.getUser();

      setUser(sessionUser);

      if (!sessionUser && pathname !== "/sign-in") {
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

  const { mutate: signInWithPassword, isPending: isSigningIn } = useMutation({
    mutationFn: Api.auth.signInWithPassword,
    onSuccess: (response) => {
      setUser(response.user);
      router.replace("/");
    },
  });

  return (
    <UserContext value={{ user, signInWithPassword, isSigningIn }}>
      {children}
    </UserContext>
  );
};

export const useUserContext = () => useContext(UserContext);
