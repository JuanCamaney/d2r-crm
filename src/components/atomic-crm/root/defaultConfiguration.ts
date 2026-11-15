import type { ConfigurationContextValue } from "./ConfigurationContext";
// Import the logos as module assets so Vite resolves their URL relative to the
// JS chunk (import.meta.url), not the current route. A plain "./logos/..." path
// breaks on nested routes like /oauth/consent and under a deployment sub-path.
import {
  d2rLogo,
  d2rTitle,
  jobStages,
  jobPipelineStatuses,
  jobTrades,
  clientTypes,
  leadStatuses,
  gcTaskTypes,
} from "../../../d2rConfig";

const darkModeLogo = d2rLogo;
const lightModeLogo = d2rLogo;

export const defaultDarkModeLogo = darkModeLogo;
export const defaultLightModeLogo = lightModeLogo;

export const defaultCurrency = "USD";

export const defaultTitle = d2rTitle;

export const defaultCompanySectors = clientTypes;

export const defaultDealStages = jobStages;

export const defaultDealPipelineStatuses = jobPipelineStatuses;

export const defaultDealCategories = jobTrades;

export const defaultNoteStatuses = leadStatuses;

export const defaultTaskTypes = gcTaskTypes;

export const defaultConfiguration: ConfigurationContextValue = {
  companySectors: defaultCompanySectors,
  currency: defaultCurrency,
  dealCategories: defaultDealCategories,
  dealPipelineStatuses: defaultDealPipelineStatuses,
  dealStages: defaultDealStages,
  noteStatuses: defaultNoteStatuses,
  taskTypes: defaultTaskTypes,
  title: defaultTitle,
  darkModeLogo: defaultDarkModeLogo,
  lightModeLogo: defaultLightModeLogo,
};
