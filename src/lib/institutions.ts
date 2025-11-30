import { events, institutions, series } from "./mockData";
import { Event, Institution, Series } from "./types";

export const getInstitutionById = (id: string): Institution | undefined =>
  institutions.find((institution) => institution.id === id);

export const getInstitutions = (): Institution[] => institutions;

export const getInstitutionSeries = (institutionId: string): Series[] =>
  series.filter((item) => item.institutionId === institutionId);

export const getInstitutionEvents = (institutionId: string): Event[] =>
  events.filter((event) => event.institutionId === institutionId);

export const getSeriesById = (id: string): Series | undefined =>
  series.find((item) => item.id === id);
