"use client";

import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
type provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParam?: Record<string, string> | null;
};

type providers = Record<string, provider>;

const AuthProvider = () => {
  const [Providers, setProviders] = useState<providers | null>(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <div className="">
      {Providers &&
        Object.values(Providers).map((_provider: provider, index: number) => (
          <button key={index} onClick={() => signIn(_provider?.id)}>
            {_provider.id}
          </button>
        ))}
    </div>
  );
};

export default AuthProvider;
