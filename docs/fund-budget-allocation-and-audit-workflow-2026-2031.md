# Afghan AI — Financial Ledger and Audit Workflow (Pilot)

## Purpose
This document defines a proposed control workflow for the National Support and Development Fund. The current website implementation is a browser-local demonstration only, not a live accounting system.

## Separate financial stages
1. **Planned budget:** an indicative programme ceiling; it is not cash and does not increase available funds.
2. **Donor pledge/commitment:** a stated intention to contribute; it is not a receipt. Pledges remain separately displayed in the existing pilot register.
3. **Received funds:** record only after an authorized finance process has independently verified the actual receipt and supporting evidence. In this prototype, entries are synthetic test data only.
4. **Allocation:** earmarking of received funds for an approved programme category. The prototype blocks allocations above recorded receipts less prior allocations.
5. **Disbursement:** recording a payment/use against an allocation. The prototype blocks disbursement above allocated but not yet disbursed funds.
6. **Reconciliation:** independent matching of a disbursement to appropriate bank/payment evidence. The prototype blocks reconciliation above recorded disbursements not yet reconciled.

## Dashboard definitions
- Cash remaining = received − disbursed.
- Unallocated cash = received − allocated.
- Allocated but unpaid = allocated − disbursed.
- Disbursed but unreconciled = disbursed − reconciled.
- Planned budget and pledge amounts must never be added to cash received or cash remaining.

## Programme categories
Families in need; children and education; disability inclusion; youth skills; community recovery; emergency response; Afghan AI platform development.

## Minimum governance controls before production
- Adopt an approved budget and written eligibility/allocation criteria.
- Separate request assessment, financial recording, payment authorization and independent reconciliation.
- Require at least two authorized approvals for disbursement; no single-person end-to-end control.
- Keep immutable, timestamped server-side audit logs and versioned supporting evidence.
- Reconcile bank/provider statements independently and publish periodic aggregate reports.
- Apply privacy-by-design, data minimization, retention limits and an accessible complaints/appeals channel.
- Conduct independent financial and programme audits; disclose conflicts of interest.
- Establish a secure backend, role-based authorization, backups, access monitoring and incident response before accepting real applications or funds.

## Prototype limitations
All ledger events are stored in this browser only under `afghanai-fund-ledger-demo-v1`. Browser data can be edited or deleted and is not tamper-proof. There is no bank connection, payment processing, real receipt verification, secure authentication, cloud sync, immutable audit trail or legal accounting assurance. Never enter real names, account numbers, identity documents or sensitive beneficiary data. The prototype must not be used as evidence of actual funds received, allocated, paid or audited.
