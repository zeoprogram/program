# Haryadi Garage — Living Spec

## Product
Professional Indonesian garage detailing booking portal inspired by the reference site. Customers can calculate a live estimate, submit a workshop or home-service booking, and track its status. Garage staff can review the queue and update operational status from `/admin`.

## Data model
- `Booking`: id, code, customer/contact, vehicle details, service location, selected services, preferred date/time, optional address/notes, estimated total, status, created/updated timestamps.
- Status flow: `pending` → `confirmed` → `in_progress` → `quality_check` → `completed`; `cancelled` is available from the admin panel.

## Key flows
1. Customer selects vehicle type, location, and services in the instant calculator.
2. Customer submits booking details and receives a generated `HG-YYYY-XXXXXX` code.
3. Customer tracks a booking by code or WhatsApp number in the Lacak Booking section.
4. Staff opens `/admin`, filters the queue, inspects booking details, and updates status.

## Auth and roles
No authentication in this demo. `/admin` is a visible operations preview intended for the garage team; add session-based auth before production use.

## Integrations
No third-party integrations are enabled. WhatsApp actions are represented as UI links only.
