import { required, useTranslate } from "ra-core";
import { AutocompleteArrayInput } from "@/components/admin/autocomplete-array-input";
import { ReferenceArrayInput } from "@/components/admin/reference-array-input";
import { ReferenceInput } from "@/components/admin/reference-input";
import { TextInput } from "@/components/admin/text-input";
import { NumberInput } from "@/components/admin/number-input";
import { DateInput } from "@/components/admin/date-input";
import { SelectInput } from "@/components/admin/select-input";
import { BooleanInput } from "@/components/admin/boolean-input";
import { Separator } from "@/components/ui/separator";
import { useWatch } from "react-hook-form";
import { leadSources } from "../../../d2rConfig";
import { useIsMobile } from "@/hooks/use-mobile";

import { useConfigurationContext } from "../root/ConfigurationContext";
import { AutocompleteCompanyInput } from "../companies/AutocompleteCompanyInput.tsx";
import { AutocompleteContactInput } from "../contacts/AutocompleteContactInput.tsx";
import { validateClosingDate } from "./dealUtils";

export const DealInputs = () => {
  const isMobile = useIsMobile();
  return (
    <div className="flex flex-col gap-10 p-1">
      <DealInfoInputs />

      <JobSiteInputs />

      <div className={`flex gap-6 ${isMobile ? "flex-col" : "flex-row"}`}>
        <DealLinkedToInputs />
        <Separator orientation={isMobile ? "horizontal" : "vertical"} />
        <DealMiscInputs />
      </div>
    </div>
  );
};

const DealInfoInputs = () => {
  return (
    <div className="flex flex-col gap-4 flex-1">
      <TextInput source="name" validate={required()} helperText={false} />
      <TextInput source="description" multiline rows={3} helperText={false} />
    </div>
  );
};

const JobSiteInputs = () => {
  const isMobile = useIsMobile();
  const insuranceClaim = useWatch({ name: "insurance_claim" });
  return (
    <div className="flex flex-col gap-4">
      <h6 className="text-lg font-semibold">Job Site</h6>
      <TextInput
        source="job_address"
        label="Street address"
        helperText={false}
      />
      <div className={`flex gap-4 ${isMobile ? "flex-col" : "flex-row"}`}>
        <TextInput
          source="job_city"
          label="City"
          helperText={false}
          className="flex-2"
        />
        <TextInput
          source="job_state"
          label="State"
          helperText={false}
          defaultValue="SC"
          className="flex-1"
        />
        <TextInput
          source="job_zip"
          label="ZIP"
          helperText={false}
          className="flex-1"
        />
      </div>
      <div className={`flex gap-4 ${isMobile ? "flex-col" : "flex-row"}`}>
        <SelectInput
          source="lead_source"
          label="Lead source"
          choices={leadSources}
          optionText="label"
          optionValue="value"
          helperText={false}
          className="flex-1"
        />
        <TextInput
          source="permit_number"
          label="Permit #"
          helperText={false}
          className="flex-1"
        />
        <DateInput
          source="start_date"
          label="Start date"
          helperText={false}
          className="flex-1"
        />
      </div>
      <BooleanInput
        source="insurance_claim"
        label="Insurance claim"
        helperText={false}
      />
      {insuranceClaim ? (
        <div className={`flex gap-4 ${isMobile ? "flex-col" : "flex-row"}`}>
          <TextInput
            source="insurance_carrier"
            label="Carrier"
            helperText={false}
            className="flex-1"
          />
          <TextInput
            source="claim_number"
            label="Claim #"
            helperText={false}
            className="flex-1"
          />
        </div>
      ) : null}
    </div>
  );
};

const DealLinkedToInputs = () => {
  const translate = useTranslate();
  return (
    <div className="flex flex-col gap-4 flex-1">
      <h6 className="text-lg font-semibold">
        {translate("resources.deals.inputs.linked_to")}
      </h6>
      <ReferenceInput source="company_id" reference="companies">
        <AutocompleteCompanyInput
          label="resources.deals.fields.company_id"
          validate={required()}
          modal
        />
      </ReferenceInput>

      <ReferenceArrayInput source="contact_ids" reference="contacts_summary">
        <AutocompleteContactInput label="resources.deals.fields.contact_ids" />
      </ReferenceArrayInput>
    </div>
  );
};

const DealMiscInputs = () => {
  const { dealStages, dealCategories } = useConfigurationContext();
  const translate = useTranslate();
  return (
    <div className="flex flex-col gap-4 flex-1">
      <h6 className="text-lg font-semibold">
        {translate("resources.deals.field_categories.misc")}
      </h6>

      <AutocompleteArrayInput
        source="categories"
        choices={dealCategories}
        optionText="label"
        optionValue="value"
        helperText={false}
      />
      <NumberInput
        source="amount"
        defaultValue={0}
        helperText={false}
        validate={required()}
      />
      <DateInput
        validate={validateClosingDate}
        source="expected_closing_date"
        helperText={false}
      />
      <SelectInput
        source="stage"
        choices={dealStages}
        optionText="label"
        optionValue="value"
        defaultValue="lead"
        helperText={false}
        validate={required()}
      />
    </div>
  );
};
