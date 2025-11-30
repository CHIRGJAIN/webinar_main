"use client";

import { useMemo } from "react";
import { getInstitutionById, getInstitutionEvents, getInstitutionSeries } from "@/lib/institutions";
import { Institution } from "@/lib/types";
import { useAuth } from "./useAuth";

export const useInstitutionContext = () => {
  const { user } = useAuth();

  const institution = useMemo<Institution | null>(() => {
    if (!user?.institutionId) return null;
    return getInstitutionById(user.institutionId) ?? null;
  }, [user]);

  const events = useMemo(() => (user?.institutionId ? getInstitutionEvents(user.institutionId) : []), [user]);
  const series = useMemo(() => (user?.institutionId ? getInstitutionSeries(user.institutionId) : []), [user]);

  return {
    user,
    institution,
    events,
    series,
    institutionId: user?.institutionId ?? null,
    isInstitutionAdmin: user?.role === "institution_admin",
  };
};
