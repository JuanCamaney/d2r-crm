-- D2R Builders: job-specific fields on deals (shown as "Jobs" in the UI)
alter table public.deals
    add column job_address text,
    add column job_city text,
    add column job_state text,
    add column job_zip text,
    add column lead_source text,
    add column insurance_claim boolean not null default false,
    add column insurance_carrier text,
    add column claim_number text,
    add column permit_number text,
    add column start_date date;
