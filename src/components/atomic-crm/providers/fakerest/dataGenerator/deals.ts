import { add } from "date-fns";
import { datatype, lorem, random } from "faker/locale/en_US";

import {
  defaultDealCategories,
  defaultDealStages,
} from "../../../root/defaultConfiguration";
import type { Deal } from "../../../types";
import type { Db } from "./types";
import { leadSources } from "../../../../../d2rConfig";

const towns = [
  ["Bluffton", "SC", "29910"],
  ["Hilton Head Island", "SC", "29926"],
  ["Okatie", "SC", "29909"],
  ["Beaufort", "SC", "29902"],
  ["Charleston", "SC", "29401"],
  ["Mount Pleasant", "SC", "29464"],
  ["Sparta", "NC", "28675"],
];
const streets = [
  "Palmetto Bluff Rd",
  "May River Rd",
  "Buckwalter Pkwy",
  "Pope Ave",
  "William Hilton Pkwy",
  "Bluffton Pkwy",
  "Hampton Lake Dr",
  "Okatie Hwy",
  "Coleman Blvd",
  "Main St",
  "Beach City Rd",
  "Sea Pines Dr",
];
const scopes: Record<string, string[]> = {
  reroof: [
    "Re-roof – GAF Timberline HDZ",
    "Tear-off & re-roof",
    "Metal roof replacement",
  ],
  "roof-repair": [
    "Leak repair",
    "Storm damage roof repair",
    "Flashing & boot replacement",
  ],
  siding: [
    "Hardie siding replacement",
    "Siding repair & paint",
    "Soffit & fascia",
  ],
  gutters: ["Seamless gutter install", "Gutter guards"],
  "windows-doors": ["Window replacement", "Exterior door install"],
  renovation: [
    "Kitchen remodel",
    "Primary bath remodel",
    "Interior renovation",
  ],
  repipe: ["Poly-B to PEX repipe", "Condo repipe"],
  electrical: ["Panel upgrade", "Generator hookup"],
  "new-construction": ["New construction – framing to dry-in"],
  "insurance-claim": ["Hurricane claim – roof & siding", "Hail claim re-roof"],
  other: ["Pressure wash & seal", "Deck repair"],
};
import { randomDate } from "./utils";

export const generateDeals = (db: Db): Deal[] => {
  const deals = Array.from(Array(50).keys()).map((id) => {
    const company = random.arrayElement(db.companies);
    company.nb_deals = (company.nb_deals ?? 0) + 1;
    const contacts = random.arrayElements(
      db.contacts.filter((contact) => contact.company_id === company.id),
      datatype.number({ min: 1, max: 3 }),
    );
    const trade = random.arrayElement(defaultDealCategories).value;
    const [city, state, zip] = random.arrayElement(towns);
    const insurance_claim =
      trade === "insurance-claim" || datatype.number(10) > 8;
    const created_at = randomDate(new Date(company.created_at)).toISOString();

    const expected_closing_date = randomDate(
      new Date(created_at),
      add(new Date(created_at), { months: 6 }),
    )
      .toISOString()
      .split("T")[0];

    return {
      id,
      name: random.arrayElement(scopes[trade] ?? scopes.other),
      company_id: company.id,
      contact_ids: contacts.map((contact) => contact.id),
      categories: [trade],
      job_address: `${datatype.number({ min: 10, max: 999 })} ${random.arrayElement(streets)}`,
      job_city: city,
      job_state: state,
      job_zip: zip,
      lead_source: random.arrayElement(leadSources).value,
      insurance_claim,
      insurance_carrier: insurance_claim
        ? random.arrayElement([
            "State Farm",
            "Allstate",
            "USAA",
            "Liberty Mutual",
          ])
        : null,
      claim_number: insurance_claim
        ? `CLM-${datatype.number({ min: 100000, max: 999999 })}`
        : null,
      permit_number:
        datatype.number(10) > 5
          ? `BP-${datatype.number({ min: 10000, max: 99999 })}`
          : null,
      start_date: null,
      stage: random.arrayElement(defaultDealStages).value,
      description: lorem.paragraphs(datatype.number({ min: 1, max: 4 })),
      amount: datatype.number({ min: 40, max: 600 }) * 100,
      created_at,
      updated_at: randomDate(new Date(created_at)).toISOString(),
      expected_closing_date,
      sales_id: company.sales_id!,
      index: 0,
    };
  });
  // compute index based on stage
  defaultDealStages.forEach((stage) => {
    deals
      .filter((deal) => deal.stage === stage.value)
      .forEach((deal, index) => {
        deals[deal.id].index = index;
      });
  });
  return deals;
};
