"use client";

import { useUser } from "@/features/auth/useUser";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { isLoading, isAuthenticated } = useUser();

  useEffect(
    function () {
      if (!isLoading && !isAuthenticated) {
        router.push("/login");
      }
    },
    [isLoading, isAuthenticated, router]
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isAuthenticated) {
    return children;
  }

  return null;
}
