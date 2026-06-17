# Database Normalization (Alumni Management System)

## 1) Unnormalized Form (UNF)
In UNF, a flat source table (`ALUMNI_RAW`) would contain repeating groups like multiple skills and multiple events in the same row.

Example UNF columns:
- alumni_id, name, email, phone, dob, gender
- degree, department, college_name, graduation_year
- company_name, industry, company_location, job_title, start_date, end_date
- skill_1, skill_2, skill_3, ...
- event_1, event_1_role, event_2, event_2_role, ...

This creates repeating groups, update anomalies, and non-atomic attributes.

## 2) First Normal Form (1NF)
Issue in UNF:
- Multi-valued attributes (skills/events) and repeating groups violate atomicity.

Fix applied:
- Split into separate tables: `ALUMNI`, `USER_ACCOUNT`, `EDUCATION`, `JOB`, `COMPANY`, `SKILL`, `ALUMNI_SKILL`, `EVENT`, `EVENT_PARTICIPATION`.
- Each column now stores a single atomic value.
- Repeating groups are removed and represented as rows in relationship tables.

Result:
- All attributes are atomic.
- No repeating groups remain.

## 3) Second Normal Form (2NF)
Condition:
- Table must be in 1NF and have no partial dependency on part of a composite key.

Validation:
- `ALUMNI_SKILL(alumni_id, skill_id)` has only key columns, so no non-key partial dependency.
- `EVENT_PARTICIPATION(alumni_id, event_id, role)` uses `role` as a non-key attribute dependent on the full composite key `(alumni_id, event_id)`.
- `USER_ACCOUNT(user_id, alumni_id, username, password, role)` uses a single primary key, so no partial dependency exists.

Result:
- No partial dependencies exist.
- Schema satisfies 2NF.

## 4) Third Normal Form (3NF)
Potential transitive dependency in earlier design:
- If `JOB` stored company details directly (e.g., `company_location` depending on `company_name`), non-key attributes would depend on another non-key attribute.

Fix applied:
- Extracted company data into `COMPANY` table.
- `JOB` stores only `company_id` as foreign key.
- Company attributes (`company_name`, `industry`, `location`) now depend only on `company_id` in `COMPANY`.

Result:
- Transitive dependencies are removed.
- Schema satisfies 3NF.
