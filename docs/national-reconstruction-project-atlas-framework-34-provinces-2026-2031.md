# National Reconstruction Project Atlas Framework — 34 Provinces (2026–2031)

**Status:** Proposed planning and information-management framework  
**Program:** Afghanistan National Reconstruction & Sustainable Development Program (2026–2031)  
**Version:** 1.0

> **Important:** This is a proposed framework, not an official government atlas, approved national project list, verified map of project sites, or evidence of allocated funds. No project, location, budget, beneficiary count, partner, or completion status should be presented as confirmed until supported by documented evidence and authorization.

## 1. Purpose

The National Reconstruction Project Atlas is intended to provide a consistent way to register, map, compare, and monitor proposed and approved reconstruction projects across Afghanistan's 34 provinces. It should help decision-makers and communities understand:
- where projects are proposed or being implemented;
- what needs each project addresses;
- which stage each project has reached;
- what funding is approved, committed, disbursed, and spent;
- what outputs and outcomes have been independently verified;
- which risks, safeguards, and maintenance obligations remain open.

The atlas should support equitable planning while avoiding the appearance that a proposed project is already approved or funded.

## 2. Core design principles

1. **Evidence before publication:** each public project record must have a source, responsible owner, and last-verified date.
2. **One project, one identifier:** assign a stable unique ID and prevent duplicate records.
3. **Province-wide coverage:** provide a consistent registration structure for all 34 provinces without implying that every province has an approved project.
4. **Needs-led prioritization:** use documented needs, feasibility, public benefit, readiness, cost, risk, and equity criteria.
5. **Transparent financial status:** distinguish estimates, requested amounts, approved budgets, signed commitments, disbursements, and verified expenditure.
6. **Do-no-harm mapping:** do not disclose sensitive facilities, vulnerable households, personal data, or security-sensitive coordinates.
7. **Accessible multilingual design:** support Dari, Pashto, and English labels where feasible, and work on mobile screens and low-bandwidth connections.
8. **Independent verification:** important milestones, costs, and results require appropriate evidence and review.
9. **Lifecycle accountability:** include operations, maintenance, ownership, and handover—not only construction.
10. **No unsupported endorsements:** do not use institutional logos or imply official approval or partnership without written authorization.

## 3. Province registry

Create a controlled province reference table containing:
- stable province code;
- official Dari, Pashto, and English names;
- approved administrative boundary dataset and its version;
- source and date of the boundary data;
- province-level data custodian;
- data-quality and coverage notes.

Use an authoritative and documented administrative-boundary source selected by the responsible authority. Do not draw or infer boundaries from informal images. District and village-level records should use a separately verified administrative reference.

The atlas must not assume that project coverage is complete merely because all provinces appear in the registry.

## 4. Project lifecycle and public status

Use one controlled status from the following list:

| Status | Meaning | Minimum evidence |
|---|---|---|
| Concept | An idea is recorded for consideration | Concept note and submitting party |
| Needs assessment | Problem and affected area are being assessed | Assessment method and source records |
| Feasibility | Technical, economic, environmental, social, and legal feasibility is under review | Feasibility work plan or study |
| Preparation | Design, costing, safeguards, land, and delivery arrangements are being prepared | Named owner and preparation documents |
| Submitted for approval | Complete proposal is awaiting a decision | Submission reference and date |
| Approved | Authorized body has formally approved the project | Verifiable approval reference |
| Financing confirmed | Financing agreement or authorized budget is documented | Signed agreement or approved budget record |
| Procurement | Procurement process is active | Published procurement reference, where disclosure is lawful |
| Contracted | Contract has been signed and validated | Contract reference and award details |
| In implementation | Work or service delivery has commenced | Notice to proceed or verified commencement evidence |
| Suspended | Work is paused under a documented decision | Reason, authority, date, and restart conditions |
| Completed | Contracted outputs have been accepted | Completion and acceptance records |
| Operational | Service or asset is functioning | Operational inspection and responsible operator |
| Closed | Financial, contractual, safeguard, and handover obligations are closed | Closure report and approvals |

Never use “approved,” “funded,” “under construction,” or “completed” without the corresponding evidence. A project may be physically complete but not operational; these are separate states.

## 5. Standard project record

Every project record should contain the following metadata.

| Field | Required information |
|---|---|
| Project ID | Stable unique identifier, e.g. AFG-WAT-0001 |
| Project title | Clear name in Dari, Pashto, and English where available |
| Sector and sub-sector | Controlled classification |
| Province | Province code and verified name |
| District / locality | Verified administrative reference, subject to disclosure safety |
| Location precision | Province, district, generalized area, or restricted coordinates |
| Need statement | Problem, evidence, affected service, and date |
| Beneficiaries | Defined population and counting method; aggregated only |
| Project owner | Legally and operationally responsible entity |
| Implementing entity | Confirmed delivery organization, if appointed |
| Lifecycle status | One controlled status from Section 4 |
| Scope and outputs | Measurable deliverables and acceptance criteria |
| Schedule | Proposed and approved dates kept distinct |
| Capital cost | Estimate and currency / price basis |
| Operating cost | Annual or lifecycle estimate and assumptions |
| Financing status | Requested, approved, committed, disbursed, and spent shown separately |
| Procurement | Method, notice, award, contractor, and contract value where lawful |
| Safeguards | Environmental, social, labor, land, safety, and inclusion records |
| Risks | Risk owner, rating method, mitigation, and due date |
| Indicators | Linked indicator IDs from the dashboard framework |
| Evidence | Document references and verification status |
| Last verified | Date, verifier, and method |
| Public disclosure | Public, summarized, restricted, or withheld with reason |
| Maintenance | Operator, budget, asset register, and maintenance plan |
| Change history | Version, changed field, reason, date, and approver |

Do not publish confidential source documents merely because a project record references them. Apply access permissions and redaction rules.

## 6. Sector taxonomy

Use a common sector classification so projects can be filtered and compared:

1. Water supply, irrigation, and water-resource management
2. Renewable energy, electricity, and energy access
3. Primary healthcare, hospitals, and public health
4. General education, higher education, and vocational training
5. Agriculture, livestock, and food security
6. Agro-processing, storage, and cold-chain logistics
7. Roads, bridges, and transport connectivity
8. Housing, urban services, and municipal infrastructure
9. Sanitation, drainage, and solid-waste management
10. Digital connectivity and public-service technology
11. Small business, manufacturing, and private-sector development
12. Trade, logistics, and regional connectivity
13. Tourism, culture, and heritage conservation
14. Environment, climate resilience, and disaster-risk reduction
15. Social inclusion, disability access, and community services
16. Public administration, institutional capacity, and service delivery

A project may have one primary sector and multiple secondary tags. Avoid double-counting its full cost or outputs across sectors.

## 7. Geographic map and location protection

### Public map
- Show province-level coverage by default.
- Show district or project points only where publication is safe and authorized.
- Use generalized locations for sensitive services and vulnerable populations.
- Provide a list and accessible table alternative to the map.
- Include a map legend, source, boundary version, and last-updated date.
- Distinguish proposed sites from approved and active project sites.
- Never imply that a map pin proves construction, ownership, funding, or completion.

### Internal map
- Use role-based access for precise coordinates and restricted documents.
- Log access to sensitive location information.
- Apply security review before exporting or sharing coordinates.
- Avoid storing personal household locations unless essential, lawful, and protected.

Do not publish exact coordinates of sensitive infrastructure, protected groups, shelters, medical cases, or security-sensitive assets.

## 8. Provincial needs and prioritization

A provincial needs profile may include:
- access to safe water and sanitation;
- health-service access and facility readiness;
- education access and learning conditions;
- electricity access and reliability;
- road connectivity and seasonal access;
- agricultural and livelihood constraints;
- exposure to climate and disaster risks;
- accessibility and inclusion barriers;
- local delivery capacity and maintenance constraints.

Every profile must identify its source, date, geographic coverage, method, and limitations. A missing data field must be labeled as missing—not treated as evidence that no need exists.

### Proposed project screening dimensions

| Dimension | Review question |
|---|---|
| Need and public benefit | Is the problem documented and the proposed response relevant? |
| Readiness | Are design, land, permits, safeguards, and delivery arrangements sufficiently prepared? |
| Feasibility | Is the technical solution suitable and maintainable? |
| Value for money | Are lifecycle costs and alternatives assessed? |
| Equity | Are underserved communities considered using safe, evidence-based criteria? |
| Sustainability | Is there a capable operator and realistic maintenance funding? |
| Risk and safeguards | Are material risks identified and mitigated? |
| Evidence quality | Are baseline, outputs, and verification methods credible? |

If a numerical scoring model is adopted, weights and thresholds must be approved and published before projects are scored. Do not manufacture rankings from incomplete data. A high score does not replace legal approval or safeguards clearance.

## 9. Financial transparency

For each project, report separate values and dates for:

- preliminary estimate;
- submitted funding request;
- formally approved budget;
- signed financing commitment;
- amount disbursed to the implementing entity;
- verified expenditure;
- remaining balance and forecast, clearly labeled.

For every amount, specify currency, price year, exchange-rate basis where relevant, whether taxes and contingencies are included, and whether the amount is nominal or inflation-adjusted.

Do not add unlike currencies without a documented conversion rate and date. Do not label pledges, discussions, or expressions of interest as secured financing. Publish contract and payment information only in accordance with applicable law and legitimate confidentiality requirements.

## 10. Progress and results

Connect each project to the National Development Indicators Dashboard Framework using stable indicator IDs. At minimum, track:
- approved scope and deliverables;
- milestone schedule and variance;
- approved budget and financial status;
- procurement and contract changes;
- verified physical progress;
- operational readiness;
- safeguard compliance and open corrective actions;
- beneficiary reach using a defined, non-duplicative method;
- maintenance and handover readiness.

Physical progress percentages must have a defined measurement method and supporting evidence. A contractor's self-reported percentage must not automatically be described as independently verified progress.

## 11. Public project card

Each public card should show:
- project title and unique ID;
- province and safe location description;
- sector;
- need addressed;
- current lifecycle status and status date;
- responsible owner;
- approved scope and key milestones;
- financial status by category;
- verified outputs and linked indicators;
- principal risks and mitigation summary;
- environmental and social safeguard status;
- maintenance and operating arrangements;
- source references and last verification date;
- public contact or grievance route, where authorized.

If a field is not available, display “Not yet published” or “Not available,” with a reason where possible. Do not fill gaps with estimates presented as facts.

## 12. Governance and data responsibilities

- **Atlas administrator:** maintains the registry, reference tables, access controls, and change log.
- **Provincial data focal point:** coordinates submissions and validates administrative references; appointment must be formal.
- **Project owner:** certifies project scope, status, and source evidence.
- **Sector reviewer:** checks technical definitions, deliverables, and sector data.
- **Finance reviewer:** reconciles budget, commitments, disbursements, and expenditure.
- **Safeguards reviewer:** checks disclosure, land, environmental, social, labor, and safety matters.
- **Independent verifier:** checks material milestones and results under a defined mandate.
- **Publication authority:** approves public records and corrections.

No one should approve their own financial or performance claims without an independent control.

## 13. Data quality and audit trail

Apply:
- duplicate project-ID and similar-project checks;
- required-field validation;
- geographic code validation;
- date and lifecycle sequence checks;
- financial reconciliation;
- source-document and acceptance-evidence checks;
- risk-based field verification;
- independent review of material claims;
- change logs with user, timestamp, prior value, new value, and reason;
- correction requests and documented resolution.

Use confidence labels such as **Verified**, **Reviewed**, **Provisional**, and **Unverified**. Define the evidence threshold for each label. Do not allow an unverified value to appear visually identical to a verified result.

## 14. Technology and export requirements

The system may begin as a controlled spreadsheet and later move to a database-backed web application. Before deployment, define:
- hosting and data residency requirements;
- user roles and multi-factor authentication where supported;
- backups, recovery, and security monitoring;
- encryption and secure document storage;
- API authentication, rate limits, and audit logging;
- multilingual search and right-to-left layout;
- mobile and low-bandwidth performance;
- CSV and machine-readable exports;
- data retention and deletion procedures;
- accessibility and usability testing.

Suggested core entities:
- Province
- District
- Project
- ProjectStatusHistory
- Sector
- ProjectIndicator
- FinancialTransaction
- ProcurementRecord
- SafeguardRecord
- Risk
- EvidenceDocument
- Verification
- UserRole
- ChangeLog

Public APIs should expose only approved public fields. Private source documents, exact sensitive coordinates, and personal information must never be exposed through public exports.

## 15. Rollout sequence

**Phase 1 — Governance and schema:** approve mandate, province reference source, project ID rules, lifecycle definitions, and disclosure policy.

**Phase 2 — Pilot registry:** enter a small, documented set of candidate projects and test duplicate detection, evidence requirements, and workflows. Label all unapproved concepts clearly.

**Phase 3 — Provincial coverage:** establish data focal points and needs profiles as reliable data and authorization become available. Do not force publication where information is unsafe or unavailable.

**Phase 4 — Dashboard integration:** link approved project records to verified indicators, financial reporting, procurement records, and safeguard status.

**Phase 5 — Public release:** complete security, privacy, accessibility, data-quality, and legal reviews before publishing.

**Phase 6 — Independent review:** periodically assess data quality, geographic equity, project readiness, delivery, and maintenance sustainability.

## 16. Go-live checklist

- [ ] Mandate and publication authority documented.
- [ ] Province and district reference data verified and versioned.
- [ ] Project ID and duplicate rules implemented.
- [ ] Lifecycle statuses and evidence requirements approved.
- [ ] Project owners and data focal points assigned.
- [ ] Financial categories and reconciliation rules adopted.
- [ ] Indicator links use the approved indicator dictionary.
- [ ] Safeguard and location-disclosure review completed.
- [ ] Role-based access and change logging tested.
- [ ] Public cards distinguish proposed, approved, funded, active, and completed projects.
- [ ] Corrections and grievance processes established.
- [ ] Backup, recovery, and operating budget confirmed.
- [ ] No unsupported claims of government approval, partnerships, or funding.

## 17. Decisions required before operational use

The authorized governance body must decide:
1. the legal mandate and accountable operator;
2. the authoritative province and district boundary datasets;
3. the project approval and status-certification process;
4. the public disclosure and location-sensitivity policy;
5. financial reporting and audit requirements;
6. provincial data ownership and verification arrangements;
7. technology, hosting, maintenance, and funding;
8. independent oversight and public correction procedures.

Until these decisions are formally made and the system is implemented, this document remains a planning framework—not an operational national atlas.
