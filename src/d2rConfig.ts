// D2R Builders LLC — CRM configuration for a roofing / siding / renovation GC.
// Edit these lists to change pipeline stages, trades, client types and task types.
import logo from "./d2r-logo.svg";

export const d2rTitle = "D2R Builders CRM";
export const d2rLogo = logo;

// Job pipeline (Kanban columns), in order.
export const jobStages = [
  { value: "lead", label: "New Lead" },
  { value: "inspection", label: "Inspection Scheduled" },
  { value: "estimate-sent", label: "Estimate Sent" },
  { value: "follow-up", label: "Follow-up" },
  { value: "contract-signed", label: "Contract Signed" },
  { value: "permitting", label: "Permitting / Materials" },
  { value: "in-production", label: "In Production" },
  { value: "punch-list", label: "Punch List" },
  { value: "invoiced", label: "Invoiced" },
  { value: "paid", label: "Paid / Closed" },
  { value: "lost", label: "Lost" },
];

// Stages counted as sold work in the dashboard revenue chart.
export const jobPipelineStatuses = [
  "contract-signed",
  "permitting",
  "in-production",
  "punch-list",
  "invoiced",
  "paid",
];

// Trades / job types.
export const jobTrades = [
  { value: "reroof", label: "Re-roof" },
  { value: "roof-repair", label: "Roof Repair" },
  { value: "siding", label: "Siding" },
  { value: "gutters", label: "Gutters" },
  { value: "windows-doors", label: "Windows & Doors" },
  { value: "renovation", label: "Interior Renovation" },
  { value: "repipe", label: "Repipe (Poly to PEX)" },
  { value: "electrical", label: "Electrical" },
  { value: "new-construction", label: "New Construction" },
  { value: "insurance-claim", label: "Insurance Claim" },
  { value: "other", label: "Other" },
];

// Client types (shown as "sector" on client records).
export const clientTypes = [
  { value: "homeowner", label: "Homeowner" },
  { value: "hoa-poa", label: "HOA / POA" },
  { value: "property-manager", label: "Property Manager" },
  { value: "general-contractor", label: "General Contractor" },
  { value: "commercial", label: "Commercial Owner" },
  { value: "builder-developer", label: "Builder / Developer" },
  { value: "insurance", label: "Insurance Carrier / Adjuster" },
  { value: "realtor", label: "Realtor" },
  { value: "subcontractor", label: "Subcontractor" },
  { value: "supplier", label: "Supplier" },
];

export const leadStatuses = [
  { value: "cold", label: "Cold", color: "#7dbde8" },
  { value: "warm", label: "Warm", color: "#e8cb7d" },
  { value: "hot", label: "Hot", color: "#e88b7d" },
  { value: "in-contract", label: "Under Contract", color: "#a4e87d" },
];

export const gcTaskTypes = [
  { value: "none", label: "None" },
  { value: "call", label: "Call" },
  { value: "email", label: "Email" },
  { value: "site-visit", label: "Site Visit" },
  { value: "inspection", label: "Roof Inspection" },
  { value: "estimate", label: "Prepare Estimate" },
  { value: "follow-up", label: "Follow-up" },
  { value: "adjuster-meeting", label: "Adjuster Meeting" },
  { value: "permit", label: "Pull Permit" },
  { value: "material-order", label: "Order Materials" },
  { value: "schedule-crew", label: "Schedule Crew" },
  { value: "final-walkthrough", label: "Final Walkthrough" },
  { value: "collect-payment", label: "Collect Payment" },
];

export const leadSources = [
  { value: "referral", label: "Referral" },
  { value: "repeat-client", label: "Repeat Client" },
  { value: "google", label: "Google / Website" },
  { value: "mailer", label: "Mailer" },
  { value: "door-knock", label: "Door Knock / Canvass" },
  { value: "yard-sign", label: "Yard Sign" },
  { value: "gc-partner", label: "GC / Partner" },
  { value: "insurance", label: "Insurance Referral" },
  { value: "social", label: "Social Media" },
  { value: "other", label: "Other" },
];

export const d2rCrmProps = {
  title: d2rTitle,
  lightModeLogo: d2rLogo,
  darkModeLogo: d2rLogo,
  dealStages: jobStages,
  dealPipelineStatuses: jobPipelineStatuses,
  dealCategories: jobTrades,
  companySectors: clientTypes,
  noteStatuses: leadStatuses,
  taskTypes: gcTaskTypes,
};
