import { useState, useEffect, useRef } from "react"
import { Zap, Target, Home, Calculator, List, Bot } from "lucide-react"
import "./App.css"

const KNOWLEDGE_BASE = `
PROPERTY OWNERSHIP:
- Fee Simple Absolute: highest form of ownership; full control, no conditions; can sell, lease, or will freely.
- Fee Simple Defeasible: ownership that can be lost if a specified condition is violated. Two types: Fee Simple Determinable (automatically ends) and Fee Simple Subject to Condition Subsequent (grantor must act to reclaim).
- Life Estate: ownership for the duration of a person's life. Life tenant can use and profit from property but cannot waste it or permanently alter it. The remainderman receives the property after the life tenant dies.
- Leasehold Estate: tenant's right to possess for a set time. Types: Estate for Years (specific end date), Periodic Tenancy (auto-renews), Tenancy at Will (either party can end anytime), Tenancy at Sufferance (holdover without permission).
- Joint Tenancy: co-ownership WITH right of survivorship. Requires 4 unities — Time, Title, Interest, Possession (TTIP). All owners must acquire title at the same time, in the same document, with equal shares. Deceased owner's share passes automatically to survivors, bypassing probate.
- Tenancy in Common: co-ownership WITHOUT survivorship. Each owner holds an undivided interest they can sell or will separately. Unequal shares are allowed. Most common form of co-ownership.
- Tenancy by the Entirety: married couples only; neither can sell or encumber without the other's consent. Provides protection from individual creditors.
- Community Property: in 9 states (AZ, CA, ID, LA, NV, NM, TX, WA, WI), most property acquired during marriage is owned 50/50 regardless of whose name is on title.
- Severalty: owned by one person alone.
- Condominium: fee simple title to unit plus undivided interest in common areas.
- Co-op: residents own shares in the corporation that owns the building. No deed for the individual unit — only a proprietary lease. Board approval often required to sell or sublet.
- Timeshare: shared ownership or right to use a property for a specific time period each year.
- MARIA test determines if personal property is a fixture (real property): Method of attachment, Adaptability to the property, Relationship of parties, Intention of parties, Agreement of parties.
- Real property includes land, everything permanently attached to land, and rights associated with land (air rights, mineral rights, water rights, riparian rights).
- Personal property (chattel) is movable property not permanently attached. Becomes real property when it becomes a fixture.

ENCUMBRANCES AND LIENS:
- Encumbrance: any claim, lien, or liability attached to real property that may affect its value or transferability.
- Specific lien: affects one particular parcel (mortgage, mechanic's lien, property tax lien, HOA lien).
- General lien: affects all property of a debtor (judgment lien, estate tax lien, IRS tax lien).
- Voluntary lien: created intentionally by the owner (mortgage, deed of trust).
- Involuntary lien: created by law without owner's consent (tax lien, mechanic's lien, judgment lien).
- Lien priority: generally first in time, first in right. Property taxes and special assessments usually have the highest priority regardless of recording date.
- Mechanic's lien: filed by unpaid contractors, subcontractors, or suppliers. Must be filed within a statutory period after work is completed. Attaches to the property, not just the owner.
- Lis pendens: recorded notice that a lawsuit is pending that may affect title. Puts future buyers on constructive notice.
- Judgment lien: created when a court awards money damages. Becomes a general lien on all real property the debtor owns in the county where recorded.
- Easement: the right to use another's land for a specific purpose. Does not convey ownership.
- Easement appurtenant: benefits one parcel (dominant tenement) at the expense of an adjacent parcel (servient tenement). Runs with the land — transfers automatically when either property is sold.
- Easement in gross: benefits a specific person or company, not adjacent land (utility easements, railroad easements). Commercial easements in gross are assignable; personal ones are not.
- Easement by prescription: acquired by open, notorious, hostile, and continuous use for the statutory period. Similar to adverse possession but only for use rights.
- Easement by necessity: granted when a property is landlocked and needs access to a public road.
- Easement by implication: arises from the circumstances of a property sale when an easement is necessary but not expressly stated.
- License: a personal, revocable, non-assignable right to use another's land. NOT an easement. Ends when the licensor dies or sells.
- Encroachment: when a structure or improvement physically invades another's property. Discovered by survey.
- Deed restriction (restrictive covenant): a private limitation on land use recorded in the deed or subdivision plat. Runs with the land and binds future owners.
- CC&Rs (Covenants, Conditions, and Restrictions): private rules governing a subdivision or planned community, enforced by an HOA.

LEGAL DESCRIPTIONS:
- Metes and Bounds: describes property using compass bearings (directions) and distances, starting and ending at the Point of Beginning (POB). Oldest method; used in original 13 colonies.
- Rectangular (Government) Survey System: divides land into Principal Meridians (north-south lines) and Base Lines (east-west lines). Creates townships (6 miles square = 36 sections). Sections are numbered 1-36 starting from the NE corner going west. One section = 640 acres = 1 square mile.
- Lot and Block (Recorded Plat): refers to a recorded subdivision map filed with the county. Most common for residential properties.
- 1 acre = 43,560 square feet. 1 section = 640 acres. 1 township = 36 sections. 1 quarter section = 160 acres.
- A legal description must be complete enough to locate and identify the property without additional information.

CONTRACTS:
- Essential elements for a valid contract: Offer, Acceptance (mutual assent), Consideration, Legal Capacity (competent parties), Legal Purpose.
- Void contract: has no legal effect from the beginning (illegal purpose, missing essential element).
- Voidable contract: valid but one party may rescind (minor, duress, undue influence, fraud, misrepresentation).
- Unenforceable contract: valid between parties but cannot be enforced in court (oral real estate contract violating Statute of Frauds).
- Statute of Frauds: real estate contracts must be in writing and signed by the party to be charged to be enforceable. Applies to purchase agreements, deeds, mortgages, and leases over one year.
- Bilateral contract: both parties make promises binding on each other (purchase and sale agreement). Most real estate contracts are bilateral.
- Unilateral contract: only one party makes a promise; the other party performs an act to accept (option contract, open listing).
- Executory contract: not yet fully performed by one or both parties (purchase agreement before closing).
- Executed contract: fully performed by all parties (deed delivered and accepted at closing).
- Consideration: something of value exchanged. Can be money, a promise, an act, or forbearance. Must be present but need not be adequate.
- Earnest money: good-faith deposit by buyer held in escrow. NOT required for a valid contract but customary. Applied toward purchase price at closing.
- Time is of the essence: clause making all deadlines strictly enforceable. Missing a deadline can constitute a breach.
- Contingency: a condition that must be satisfied before the contract becomes fully binding. Common types: financing, inspection, appraisal, sale of buyer's current home.
- Liquidated damages: pre-agreed compensation for breach (often the earnest money deposit if buyer defaults).
- Specific performance: court orders completion of the transaction. Available in real estate because each parcel is legally unique.
- Rescission: cancelling the contract and restoring parties to their original positions.
- Novation: substituting a new party for an original party, fully releasing the original.
- Assignment: transferring contract rights to a third party. Original party may remain liable unless there is a novation.
- Counteroffer: a response to an offer that changes the terms. Rejects the original offer and creates a new one.
- Option contract: unilateral contract giving the optionee the exclusive right — but not the obligation — to purchase at an agreed price within a set period. The optionor (seller) is bound; the optionee pays option consideration.
- Right of first refusal: gives a party the right to match any offer before the owner accepts it from someone else.
- Contract for deed (land contract, installment sale): buyer takes possession and makes payments to seller, but seller retains legal title until paid in full. Risk to buyer if seller has a mortgage.

AGENCY:
- Agency: a fiduciary relationship where an agent represents a principal.
- Listing agent (seller's agent): represents the seller. Owes fiduciary duties to the seller.
- Buyer's agent: represents the buyer. Owes fiduciary duties to the buyer.
- Dual agency: one agent or brokerage represents both buyer and seller. Requires informed written consent from both parties. Agent cannot fully advocate for either side.
- Designated agency: broker assigns different agents within the same firm to represent buyer and seller separately. Avoids dual agency conflict.
- Transaction broker (facilitator): assists both parties without representing either as a fiduciary. Used in some states as an alternative to dual agency.
- Sub-agent: a cooperating broker who acts as the seller's agent even when working with a buyer. Owes fiduciary duty to the seller, not the buyer.
- FIDUCIARY DUTIES — OLD CAR: Obedience (follow lawful instructions), Loyalty (put client's interests first), Disclosure (reveal all material facts), Confidentiality (keep client information private — SURVIVES the agency relationship), Accounting (account for all funds), Reasonable Care (use professional skill and diligence).
- Material fact: any fact that would affect a reasonable person's decision to buy, sell, or lease. Must be disclosed. Includes known defects, environmental hazards, and anything affecting value.
- Stigmatized property: property where a psychological event occurred (murder, suicide, alleged haunting). Disclosure requirements vary by state.
- Puffing: non-factual, subjective, exaggerated praise. Not illegal. Example: "best views in the city." Must not cross into false factual statements.
- Misrepresentation: a false statement of material fact. Negligent misrepresentation = agent did not know it was false but should have. Fraudulent misrepresentation = agent knew it was false.
- Exclusive Right to Sell: broker earns commission regardless of who sells, including the owner. Most common listing type. A bilateral contract.
- Exclusive Agency: owner can sell without owing commission. One broker authorized. Less common.
- Open Listing: owner may list with multiple brokers simultaneously. Only the procuring broker earns commission. A unilateral contract.
- Net Listing: broker keeps everything above a set net price. Legal in some states but widely discouraged due to conflicts of interest.
- Commingling: illegally mixing client funds with broker's personal or business funds. Earnest money and security deposits must be kept in a separate escrow or trust account.
- Conversion: illegally using client funds for personal use. More serious than commingling. May be criminal fraud.
- Sherman Antitrust Act: prohibits price-fixing (brokers agreeing on commission rates), market allocation (dividing territories), group boycotts, and tie-in arrangements. Violations are serious federal offenses.

FAIR HOUSING:
- Federal Fair Housing Act (1968, amended 1988): prohibits discrimination in residential housing transactions based on 7 protected classes: Race, Color, Religion, National Origin, Sex, Familial Status, Disability.
- Familial Status: households with children under 18, pregnant women, persons in process of securing custody of a minor.
- Disability: physical or mental impairment that substantially limits a major life activity. Landlord must allow reasonable modifications (at tenant's expense) and provide reasonable accommodations. New multifamily buildings of 4 or more units must meet accessibility design standards.
- Exemptions from Fair Housing Act (very narrow): owner-occupied buildings with 4 or fewer units — Mrs. Murphy exemption (cannot use a broker or discriminatory advertising); single-family homes sold or rented by the owner without a broker; housing for older persons (55+ communities meeting HUD requirements or 62+ communities).
- Steering: directing buyers or renters toward or away from certain neighborhoods based on a protected class characteristic. Illegal.
- Blockbusting (panic peddling): inducing property owners to sell by making representations about a protected class entering the neighborhood. Illegal.
- Redlining: refusing to make loans, provide insurance, or offer services in certain geographic areas based on the racial or ethnic composition of those areas. Illegal.
- Advertising: cannot use words, phrases, or images that indicate a preference or limitation based on any protected class.
- Civil Rights Act of 1866: prohibits discrimination based on RACE only. Has absolutely NO exemptions. Applies to every property transaction. Upheld by the Supreme Court in Jones v. Mayer (1968).
- ADA (Americans with Disabilities Act): applies to commercial properties and places of public accommodation. Requires accessible design and removal of barriers. Does not generally apply to private residential housing.
- ECOA (Equal Credit Opportunity Act) — Regulation B: prohibits credit discrimination based on race, color, religion, national origin, sex, marital status, age, or receipt of public assistance.
- Filing a complaint: HUD within 1 year of the discriminatory act. Federal court lawsuit within 2 years.
- Disparate impact: a facially neutral policy that disproportionately and negatively affects members of a protected class. Can be discriminatory even without intent.
- Disparate treatment: intentional discrimination — treating someone differently because of a protected class characteristic.

FINANCING:
- Mortgagor = borrower. Mortgagee = lender. The mortgagor pledges the property as collateral.
- Promissory note: the personal promise to repay the debt. The IOU. Creates personal liability.
- Mortgage: the security instrument pledging real property as collateral for the debt. Creates a lien on the property.
- Deed of Trust: used in many states instead of a mortgage. Three parties: trustor (borrower), beneficiary (lender), trustee (neutral third party who holds legal title). Allows non-judicial foreclosure.
- Conventional loan: not insured or guaranteed by the government. Meets Fannie Mae and Freddie Mac guidelines.
- Conforming loan: meets Fannie Mae and Freddie Mac loan limits and guidelines.
- Jumbo loan: exceeds conforming loan limits. Stricter underwriting requirements.
- FHA loan: insured by the Federal Housing Administration. Minimum 3.5% down payment. Requires MIP (Mortgage Insurance Premium) regardless of LTV.
- VA loan: guaranteed by the Dept. of Veterans Affairs for eligible veterans and service members. No down payment required. No PMI but requires a funding fee. No loan limit for eligible borrowers.
- USDA loan: for eligible rural properties. Low or no down payment. Income limits apply.
- PMI (Private Mortgage Insurance): protects the LENDER when LTV exceeds 80% on conventional loans. Does NOT protect the borrower. Can be cancelled when LTV reaches 80%.
- Fixed-rate mortgage: interest rate and monthly payment stay the same for the life of the loan.
- ARM (Adjustable-Rate Mortgage): interest rate changes periodically based on an index (SOFR, LIBOR). Has initial cap (first adjustment limit), periodic cap (each subsequent adjustment limit), and lifetime cap (maximum rate over life of loan).
- Balloon mortgage: regular payments that do not fully amortize the balance, with one large lump sum due at a set date.
- Interest-only loan: borrower pays only interest for a set period. Does not reduce principal during that time.
- Amortization: gradual repayment through regular scheduled payments. Early payments mostly cover interest. Over time, more goes to principal. Fully amortized = loan is paid off at end of term.
- Negative amortization: loan balance increases because payments do not cover all the interest due. Unpaid interest is added to principal.
- Due-on-Sale clause (alienation clause): full loan balance is due when the property is sold or transferred. Prevents unauthorized loan assumption.
- Acceleration clause: lender can demand full repayment immediately upon default.
- Prepayment penalty: fee for paying off the loan early. Not all loans have them.
- Subordination clause: lender agrees to accept a lower lien priority position, allowing a new loan to take first position.
- Assumption: buyer takes over the seller's existing mortgage with lender approval. Buyer becomes personally liable.
- Subject to: buyer takes title subject to existing mortgage but seller remains personally liable. Risky for seller.
- Deficiency judgment: when foreclosure sale proceeds are less than the loan balance, lender sues borrower for the difference.
- Foreclosure: legal process by which lender takes property after default. Judicial foreclosure = through courts, borrower has redemption rights. Non-judicial (power of sale) = faster, used in states with deeds of trust.
- Equitable redemption: borrower's right to reclaim property by paying the debt BEFORE the foreclosure sale.
- Statutory redemption: right to reclaim property AFTER the foreclosure sale. Only in some states.
- 1 discount point = 1% of the loan amount. Used to buy down the interest rate. Each point typically lowers the rate by 0.25%.
- Origination fee: lender's charge for processing the loan. Usually 1% of the loan amount.
- Primary mortgage market: where loans are originated between lenders and borrowers.
- Secondary mortgage market: where already-originated loans are bought and sold. Provides liquidity so lenders can make more loans.
- Fannie Mae (FNMA): government-sponsored enterprise. Purchases conventional conforming loans in the secondary market.
- Freddie Mac (FHLMC): government-sponsored enterprise. Similar to Fannie Mae. Purchases conventional loans.
- Ginnie Mae (GNMA): government agency (not GSE). Guarantees mortgage-backed securities composed of FHA and VA loans.
- RESPA (Real Estate Settlement Procedures Act): governs the mortgage settlement process. Prohibits kickbacks and unearned fees between settlement service providers. Requires Loan Estimate within 3 business days of application and Closing Disclosure at least 3 business days before closing.
- TILA (Truth in Lending Act): requires disclosure of APR (annual percentage rate) and total cost of credit. Implemented by Regulation Z.
- TRID (TILA-RESPA Integrated Disclosure): effective 2015. Loan Estimate replaced the Good Faith Estimate (GFE). Closing Disclosure replaced the HUD-1 Settlement Statement.
- Right of rescission: under TILA, borrowers have 3 business days to cancel certain refinance transactions on their primary residence. Does NOT apply to purchase loans.
- APR (Annual Percentage Rate): the true cost of borrowing including interest rate plus fees. Always higher than the stated interest rate.
- Regulation B (ECOA): prohibits discrimination in lending.
- Community Reinvestment Act (CRA): requires banks to serve the credit needs of all communities including low and moderate income areas.
- Predatory lending: unfair, deceptive, or abusive loan terms. Targets vulnerable borrowers. Includes excessive fees, prepayment penalties, loan flipping, and equity stripping.

APPRAISAL AND VALUE:
- Appraisal: an unbiased professional opinion of value performed by a licensed or certified appraiser.
- Market Value: the most probable price a willing buyer and willing seller would agree upon in an arm's-length transaction, with both having reasonable knowledge and neither under pressure. This is what appraisers estimate.
- Market Price: the actual price paid in a transaction. May differ from market value.
- Cost: the amount spent to produce or construct something. May differ from value.
- THREE APPROACHES TO VALUE:
1. Sales Comparison Approach (Market Data): compares subject property to recently sold comparable properties (comps). Adjustments are made for differences. Most reliable for single-family residential properties. Based on the principle of substitution.
2. Cost Approach: estimates value as Replacement or Reproduction Cost of improvements minus Depreciation plus Land Value. Land is never depreciated. Best for new construction, special-use properties (churches, schools, government buildings), and properties with no comparable sales.
3. Income Approach (Capitalization): converts income into value. Value = NOI divided by Cap Rate. Best for income-producing investment properties like apartment buildings and commercial real estate.
- Reproduction cost: cost to build an exact replica of the improvements.
- Replacement cost: cost to build a functionally equivalent substitute using current materials and standards.
- Depreciation: loss in value from any cause. Three types:
1. Physical deterioration: wear and tear, deferred maintenance. Can be curable (worth fixing) or incurable (too costly).
2. Functional obsolescence: loss from outdated or inadequate design features (too few bathrooms, outdated floor plan, inadequate wiring). Can be curable or incurable.
3. External (economic) obsolescence: loss from outside forces (nearby highway, industrial use, declining neighborhood). ALWAYS incurable because the owner cannot control external factors.
- Highest and Best Use: the legally permissible, physically possible, financially feasible use that produces the MAXIMUM value. Must be determined before appraising. May differ from current use.
- Principle of Substitution: a buyer will pay no more than the cost of acquiring an equally desirable substitute. Foundation of the Sales Comparison Approach.
- Principle of Contribution: the value of any component equals what it adds to the whole — not what it costs. A $50,000 pool may only add $15,000 in value.
- Principle of Anticipation: value is based on the present worth of future benefits expected from the property.
- Principle of Conformity: value is maximized when a property conforms to the character of the surrounding neighborhood.
- Progression: a lower-value property benefits from proximity to higher-value properties — its value is pulled up.
- Regression: a higher-value property is pulled down in value by proximity to lower-value properties.
- Plottage (assemblage): combining two or more adjacent parcels into one larger parcel. The combined value exceeds the sum of the individual values.
- Situs: the economic location of a property. Location is the most important factor in real estate value.
- CMA (Comparative Market Analysis): prepared by a real estate AGENT (not an appraiser) to estimate listing or offer price. Not a formal appraisal. Not admissible in legal proceedings.
- USPAP (Uniform Standards of Professional Appraisal Practice): ethical and performance standards for licensed appraisers.
- Reconciliation: the final step in the appraisal process where the appraiser weighs the results of all three approaches and arrives at a final value estimate.

TRANSFER OF TITLE:
- Deed: the written instrument that transfers title to real property from grantor to grantee.
- Essential elements of a valid deed: competent grantor, identifiable grantee, consideration (even $1), legal description of the property, words of conveyance (granting clause), grantor's signature. Delivery and acceptance are required for transfer.
- A deed does NOT need to be recorded to be valid between the parties. Recording provides constructive notice and protects against subsequent claims.
- General Warranty Deed: grantor warrants title against ALL defects and claims, even those arising before grantor's ownership. Strongest protection for the buyer. Includes 6 covenants: seisin, right to convey, against encumbrances, quiet enjoyment, further assurance, and warranty forever.
- Special Warranty Deed: grantor warrants only against defects arising DURING grantor's ownership. Used frequently in commercial transactions and by fiduciaries.
- Bargain and Sale Deed: implies grantor has title but makes no explicit warranties. Used in some states for foreclosure sales.
- Quitclaim Deed: conveys only whatever interest the grantor has, if any. No warranties whatsoever. Used to clear title defects, transfer between family members, or add and remove owners.
- Sheriff's Deed / Trustee's Deed / Executor's Deed: used in court-ordered or estate sales. Little or no warranty.
- Constructive notice: recording a deed in the public record provides notice to the entire world.
- Actual notice: direct, personal knowledge of a fact.
- Chain of title: chronological record of all recorded documents affecting a property from the original grant to the present.
- Cloud on title: any document, claim, or defect that may impair the validity of title. Must be cleared before a clean sale.
- Title search: examination of public records to determine chain of title and any encumbrances.
- Title insurance: protects against hidden title defects. Owner's policy protects the buyer. Lender's policy (required by most lenders) protects the mortgage holder.
- Abstract of title: historical summary of all recorded documents affecting the property.
- Adverse possession: acquiring title by open, notorious, hostile, actual, and continuous possession for the statutory period. Some states require payment of property taxes. Does not require recording.
- Eminent domain: government takes private property for public use and must pay just compensation. The legal process is condemnation. Just compensation = fair market value.
- Inverse condemnation: government action reduces property value without a formal taking. Owner sues government for compensation.
- Escheat: property reverts to the state if owner dies intestate (without a will) and leaves no identifiable heirs.
- Dedication: owner voluntarily transfers land to the public (streets, parks).
- Descent: passing of property to heirs when owner dies without a will (intestate succession).
- Devise: real property given through a will. The giver is the devisor; the recipient is the devisee.
- Probate: the legal process for administering a deceased person's estate.
- 1031 Exchange (Like-Kind Exchange): IRS provision allowing deferral of capital gains taxes when investment property is exchanged for like-kind property. Must identify replacement property within 45 days of sale. Must close on replacement within 180 days. Cannot use personal residences.
- Capital gains exclusion: primary residence — up to $250,000 (single) or $500,000 (married filing jointly) if lived there 2 of the last 5 years.

LAND USE AND GOVERNMENT CONTROLS:
- Police power: government's right to regulate private property use for public health, safety, welfare, and morals. No compensation owed. Basis for zoning, building codes, subdivision regulations, and environmental laws.
- Eminent domain: government takes private property for public use with just compensation.
- Taxation: government levies taxes on real property.
- Escheat: property reverts to state when owner dies without will or heirs.
- Zoning: local regulation dividing land into zones with permitted uses.
- Residential (R), Commercial (C), Industrial (I), Agricultural (A) zones.
- Nonconforming use: a use that legally existed before zoning and is allowed to continue, but cannot be expanded, substantially altered, or rebuilt if more than a certain percentage is destroyed.
- Variance: exception to zoning for undue hardship unique to that property. Does not change the zoning itself. Two types: area variance (physical requirements) and use variance (type of use).
- Special use permit (conditional use permit): allows a specific use not normally permitted in a zone, subject to conditions set by the zoning board.
- Spot zoning: rezoning a single parcel inconsistently with surrounding area. Generally illegal — lacks legitimate public purpose.
- Downzoning: rezoning to less intensive use. May require compensation if it goes too far.
- Buffer zone: a transitional area separating incompatible land uses.
- Building codes: minimum construction standards for health and safety. Enforced through permits and inspections.
- Certificate of Occupancy (CO): issued after a building passes final inspection. Authorizes occupancy.
- Subdivision regulations: govern how land can be divided. Require plat approval. May require dedication of land for streets and parks.
- Planned Unit Development (PUD): a development that mixes uses (residential, commercial, open space) under a unified plan. May have its own CC&Rs.
- Environmental controls:
- CERCLA (Superfund): current AND past owners can be held liable for hazardous waste cleanup. Liability is strict (no need to prove negligence), joint, and several (one party can be held for all). Innocent landowner defense requires environmental due diligence.
- Phase I Environmental Site Assessment: review of records, site inspection, interviews. No soil sampling.
- Phase II Environmental Site Assessment: actual testing of soil and groundwater.
- Lead paint: must disclose known lead paint hazards in homes built before 1978. Buyer has 10 days to test.
- Asbestos: hazardous if friable (crumbling). Common in pre-1980 buildings.
- Radon: naturally occurring radioactive gas. Tested with inexpensive kits. Mitigation systems available.
- Underground storage tanks (UST): potential source of soil contamination. Major disclosure concern.
- Mold: disclosure required in many states.
- Ad valorem tax: based on assessed value. Assessed Value times Tax Rate = Annual Tax. 1 mill = $0.001 = $1 per $1,000 of assessed value.
- Special assessment: a charge levied against properties that directly benefit from a specific public improvement (new sidewalk, sewer line, street paving). Separate from general property taxes.
- Tax lien: attaches automatically when property taxes are not paid. Has highest lien priority.

LEASES AND PROPERTY MANAGEMENT:
- Lease: a contract granting the right to possess property in exchange for rent. Creates a leasehold estate.
- Lessor = landlord (property owner). Lessee = tenant.
- Gross lease: tenant pays fixed rent; landlord pays all or most operating expenses (taxes, insurance, maintenance). Common in residential rentals and some office leases.
- Modified gross lease: tenant pays base rent plus some expenses. Common in office leases.
- Net lease: tenant pays base rent plus one or more operating expenses.
- Single Net (N): tenant pays rent plus property taxes.
- Double Net (NN): tenant pays rent plus taxes and insurance.
- Triple Net (NNN): tenant pays rent plus taxes, insurance, and maintenance. Landlord receives truly net income. Common for retail and industrial properties.
- Percentage lease: tenant pays base rent plus a percentage of gross sales. Used in retail and shopping centers.
- Ground lease: long-term lease of land only. Tenant builds and owns improvements during the lease. Improvements revert to landowner at lease end.
- Gross income: all potential rental income if 100% occupied.
- Effective gross income: gross income minus vacancy and credit losses.
- NOI (Net Operating Income): effective gross income minus operating expenses. Excludes debt service (mortgage payments) and depreciation. Used in the income approach to value.
- Operating expenses include: property taxes, insurance, management fees, repairs, maintenance, utilities, reserves for replacement. Do NOT include: mortgage payments, depreciation, capital expenditures.
- Cap Rate = NOI divided by Property Value. To find value: Value = NOI divided by Cap Rate.
- Landlord duties: provide habitable premises, maintain common areas, comply with lease terms, give proper notice before entry.
- Implied warranty of habitability: landlord must maintain the property in a livable condition.
- Constructive eviction: landlord's failure to provide habitable conditions effectively forces the tenant to leave. Tenant may be relieved of rent obligations.
- Actual eviction: formal legal process to remove a tenant.
- Unlawful detainer (summary possession): court proceeding to evict a tenant who refuses to leave.
- Security deposit: held in escrow; must be returned within a statutory period after move-out minus lawful deductions for damages beyond normal wear and tear.
- Lease assignment: tenant transfers all remaining lease rights to a new tenant. Original tenant may remain liable unless released.
- Sublease: tenant transfers some but not all lease rights. Original tenant remains liable to the landlord.

LICENSE LAW:
- A real estate license is required to represent others for compensation in real estate transactions.
- Broker: can operate independently, hold client funds, and supervise salespersons.
- Salesperson (Sales Associate): must work under a licensed broker. Cannot work independently.
- Activities requiring a license: listing, selling, leasing, auctioning, property management, and any other real estate services performed for compensation for others.
- Activities NOT requiring a license: owners selling or managing their own property, attorneys acting in their legal capacity, court-appointed trustees or executors, employees managing a single property for one employer.
- Errors and Omissions (E&O) insurance: professional liability insurance covering claims from mistakes, negligence, or failure to disclose. Protects the licensee if a client sues. Required in many states.
- License law violations: fraud, misrepresentation, commingling, conversion, secret profits, discriminatory acts, practicing without a license, violation of antitrust laws, making false promises.
- Commingling: illegally mixing client funds with the broker's personal or business funds. License can be suspended or revoked.
- Conversion: using client funds for personal use. Criminal fraud charges possible.
- Sherman Antitrust Act: prohibits commission rate-fixing (brokers agreeing to charge the same rates), market allocation (dividing territories among brokers), group boycotts, and tie-in arrangements. Violations are serious federal crimes.
- RESPA kickback prohibition: settlement service providers (agents, lenders, title companies) cannot pay or receive fees for referrals. Violators face criminal penalties.
- Secret profit: agent receives undisclosed compensation or benefit from a transaction. Violates fiduciary duties of loyalty and disclosure.
- Subagency: cooperating broker acts as the seller's agent even when working with a buyer. Owes fiduciary duty to the seller, not the buyer.
- Designated agency: broker assigns one agent to represent the seller and a different agent to represent the buyer within the same firm.
- Net listing risks: potential conflict of interest because the broker benefits from a higher sale price at the seller's expense. Discouraged or illegal in many states.
- Antitrust reminder: never discuss or agree on commission rates with competing brokers. Every broker sets rates independently.

MATH FORMULAS AND KEY NUMBERS:
- Commission = Sale Price times Commission Rate
- LTV (Loan-to-Value) = Loan Amount divided by Appraised Value
- Down Payment = Purchase Price times Down Payment Percentage
- Loan Amount = Purchase Price minus Down Payment
- Equity = Market Value minus Outstanding Loan Balance
- Cap Rate = NOI divided by Property Value
- Property Value (Income Approach) = NOI divided by Cap Rate
- NOI = Effective Gross Income minus Operating Expenses
- Effective Gross Income = Gross Income minus Vacancy and Credit Losses
- GRM (Gross Rent Multiplier) = Property Price divided by Monthly Gross Rent
- Property Value using GRM = Monthly Rent times GRM
- Monthly Interest = (Loan Balance times Annual Interest Rate) divided by 12
- Annual Interest = Loan Balance times Annual Interest Rate
- Depreciation Residential = Building Value divided by 27.5 years per year
- Depreciation Commercial = Building Value divided by 39 years per year
- Property Tax = Assessed Value times Tax Rate (or mill rate divided by 1000)
- Proration Daily Rate = Annual Amount divided by 365 days
- Transfer Tax: varies by state; often per $500 or $1,000 of sale price
- Points: 1 point = 1% of loan amount = prepaid interest
- Break-Even Ratio = (Operating Expenses plus Debt Service) divided by Gross Income
- KEY NUMBERS TO MEMORIZE: 1 acre = 43,560 sq ft; 1 section = 640 acres; 1 township = 36 sections; residential depreciation = 27.5 years; commercial depreciation = 39 years; FHA minimum down = 3.5%; RESPA Loan Estimate = 3 business days; RESPA Closing Disclosure = 3 business days before closing; 1031 identification = 45 days; 1031 closing = 180 days; HUD complaint = 1 year; federal court Fair Housing suit = 2 years.
`


const FLASHCARDS = [
{ id: 1, category: "Ownership", term: "Fee Simple Absolute", definition: "The most complete form of property ownership — full control with no conditions or time limits. The owner can sell, lease, mortgage, or leave it to heirs without any restrictions." },
{ id: 2, category: "Ownership", term: "Fee Simple Defeasible", definition: "Ownership that can automatically end if a specified condition is violated. Example: land granted 'as long as it is used as a park' — use it for anything else and ownership ends." },
{ id: 3, category: "Ownership", term: "Life Estate", definition: "Ownership that lasts only for the duration of someone's life. The life tenant can use and profit from the property but cannot permanently destroy or waste it. A remainderman inherits after." },
{ id: 4, category: "Ownership", term: "Joint Tenancy", definition: "Co-ownership with right of survivorship. Requires 4 unities: Time, Title, Interest, Possession (TTIP). When one owner dies, their share passes automatically to surviving owners, skipping probate." },
{ id: 5, category: "Ownership", term: "Tenancy in Common", definition: "Co-ownership without survivorship rights. Each owner holds an undivided interest and can independently sell, mortgage, or will their share to anyone. Unequal ownership percentages are allowed." },
{ id: 6, category: "Ownership", term: "Tenancy by the Entirety", definition: "A form of co-ownership available only to married couples. Neither spouse can sell, transfer, or encumber the property without the other's full consent." },
{ id: 7, category: "Ownership", term: "Community Property", definition: "In 9 states, most assets acquired during marriage are owned equally (50/50) by both spouses, regardless of whose name is on the title or who earned the money." },
{ id: 8, category: "Ownership", term: "Severalty", definition: "Ownership by a single individual with no co-owners. The owner has complete, undivided control over the property." },
{ id: 9, category: "Ownership", term: "Condominium", definition: "The owner holds fee simple title to their individual unit AND shares an undivided interest in all common areas such as lobbies, hallways, grounds, and amenities." },
{ id: 10, category: "Ownership", term: "Co-op (Cooperative)", definition: "Residents purchase shares in the corporation that owns the entire building. There is no individual deed — each owner receives a proprietary lease for their specific unit." },
{ id: 11, category: "Ownership", term: "MARIA Test", definition: "Determines whether personal property has legally become a fixture (real property): Method of attachment, Adaptability to the property, Relationship of the parties, Intention, Agreement." },
{ id: 12, category: "Ownership", term: "Riparian Rights", definition: "The right of a landowner whose property borders a river or stream to use the flowing water. The owner may use the water but cannot unreasonably interfere with other riparian owners." },
{ id: 13, category: "Ownership", term: "Littoral Rights", definition: "The rights of a landowner whose property borders a lake, sea, or ocean. Similar to riparian rights but applies to non-flowing bodies of water." },
{ id: 14, category: "Ownership", term: "Air Rights", definition: "The property owner's legal right to use and control the space above their land. Air rights can be sold or leased separately from surface rights." },
{ id: 15, category: "Ownership", term: "Mineral Rights", definition: "The ownership right to underground resources such as oil, gas, coal, and minerals. Mineral rights can be severed from surface rights and sold or leased separately." },
{ id: 16, category: "Encumbrances", term: "Easement Appurtenant", definition: "An easement that benefits one parcel (dominant tenement) at the expense of an adjacent parcel (servient tenement). It runs with the land and transfers automatically when either property is sold." },
{ id: 17, category: "Encumbrances", term: "Easement in Gross", definition: "An easement that benefits a specific person or company rather than adjacent land. A utility company's power line easement is a classic example. It does NOT run with the land." },
{ id: 18, category: "Encumbrances", term: "Easement by Prescription", definition: "An easement acquired by using someone else's land openly, notoriously, hostilely, and continuously for the statutory period — similar to adverse possession but for use rights only." },
{ id: 19, category: "Encumbrances", term: "Mechanic's Lien", definition: "A specific, involuntary lien filed against a property by a contractor, subcontractor, or supplier who provided labor or materials but was not paid. Must be filed within a statutory deadline." },
{ id: 20, category: "Encumbrances", term: "Lis Pendens", definition: "A recorded notice warning the public that a lawsuit is currently pending that may affect title to the property. It puts all future buyers on constructive notice of the dispute." },
{ id: 21, category: "Encumbrances", term: "Encroachment", definition: "When a structure, fence, or improvement physically extends from one property onto a neighboring property without the neighbor's permission." },
{ id: 22, category: "Encumbrances", term: "Deed Restriction", definition: "A private limitation on land use that is recorded in the deed or subdivision plat. Also called a restrictive covenant. Runs with the land and binds future owners." },
{ id: 23, category: "Deeds & Title", term: "General Warranty Deed", definition: "Provides the strongest protection for the buyer. The grantor guarantees title against ALL defects and claims — even those that arose before the grantor ever owned the property." },
{ id: 24, category: "Deeds & Title", term: "Special Warranty Deed", definition: "The grantor guarantees title only against defects that arose during their ownership. It does not cover any claims from previous owners." },
{ id: 25, category: "Deeds & Title", term: "Quitclaim Deed", definition: "Transfers only whatever interest the grantor currently holds — which may be nothing at all. Contains zero warranties. Commonly used to clear title defects or transfer between family members." },
{ id: 26, category: "Deeds & Title", term: "Bargain and Sale Deed", definition: "Implies the grantor holds title and has the right to convey, but makes no explicit promises or warranties about the condition of the title." },
{ id: 27, category: "Deeds & Title", term: "Adverse Possession", definition: "Gaining legal title to land by occupying it in a way that is open, notorious, hostile, actual, and continuous for the state's statutory period. Some states require payment of property taxes." },
{ id: 28, category: "Deeds & Title", term: "Constructive Notice", definition: "The legal presumption that everyone is aware of any document properly recorded in the public record — even if they have never personally seen it." },
{ id: 29, category: "Deeds & Title", term: "Title Insurance", definition: "Protection against losses from hidden title defects. An owner's policy protects the buyer; a lender's policy (required by most lenders) protects the mortgage holder." },
{ id: 30, category: "Deeds & Title", term: "1031 Exchange", definition: "An IRS provision allowing an investor to defer capital gains taxes by swapping one investment property for a like-kind replacement. Must identify the new property in 45 days and close within 180 days." },
{ id: 31, category: "Deeds & Title", term: "Escheat", definition: "The process by which property reverts to the state when the owner dies without a valid will and has no identifiable heirs. The state becomes the owner of last resort." },
{ id: 32, category: "Deeds & Title", term: "Cloud on Title", definition: "Any document, claim, lien, or defect in the public record that may impair or cast doubt on the validity of a property's title. Must be resolved before the property can be cleanly sold." },
{ id: 33, category: "Agency", term: "Fiduciary Duty (OLD CAR)", definition: "The duties owed by an agent to their client: Obedience, Loyalty, Disclosure, Confidentiality (survives after the agency ends), Accounting, and Reasonable Care." },
{ id: 34, category: "Agency", term: "Dual Agency", definition: "One agent or brokerage represents both the buyer and the seller in the same transaction. Legal in most states but requires informed written consent from both parties." },
{ id: 35, category: "Agency", term: "Exclusive Right to Sell", definition: "The most common listing agreement. The broker earns a commission no matter who finds the buyer — the listing broker, another agent, or even the seller themselves." },
{ id: 36, category: "Agency", term: "Exclusive Agency Listing", definition: "Only one broker is authorized, but the owner retains the right to sell the property themselves without owing a commission. The broker earns a commission only if they produce the buyer." },
{ id: 37, category: "Agency", term: "Open Listing", definition: "The owner may list with several brokers simultaneously. Only the broker who personally produces the ready, willing, and able buyer earns a commission. It is a unilateral contract." },
{ id: 38, category: "Agency", term: "Net Listing", definition: "The broker's compensation equals everything received above the seller's agreed minimum net price. Legal in some states but discouraged because of potential conflicts of interest." },
{ id: 39, category: "Agency", term: "Blockbusting", definition: "The illegal act of inducing property owners to sell by making representations that members of a protected class are moving into the neighborhood. Also called panic peddling." },
{ id: 40, category: "Agency", term: "Steering", definition: "Illegally directing prospective buyers or renters toward or away from certain neighborhoods based on a protected characteristic such as race, religion, or national origin." },
{ id: 41, category: "Agency", term: "Commingling", definition: "The illegal practice of mixing a client's funds (earnest money, security deposits) with the broker's personal or business operating account. A serious license law violation." },
{ id: 42, category: "Agency", term: "Puffing", definition: "Exaggerated, non-factual, subjective statements about a property. Not illegal, but must not cross into making false statements of verifiable fact." },
{ id: 43, category: "Contracts", term: "Statute of Frauds", definition: "A law requiring certain contracts — including real estate purchase agreements and leases longer than one year — to be in writing to be enforceable in a court of law." },
{ id: 44, category: "Contracts", term: "Specific Performance", definition: "A court remedy forcing a breaching party to complete a real estate transaction as agreed. Available in real estate because every parcel of land is legally considered unique." },
{ id: 45, category: "Contracts", term: "Contingency", definition: "A condition written into a contract that must be satisfied before the contract becomes fully binding. Common types: financing contingency, home inspection contingency, appraisal contingency." },
{ id: 46, category: "Contracts", term: "Novation", definition: "Replacing one contracting party with a new party, completely releasing the original party from all obligations. All parties must agree to the substitution." },
{ id: 47, category: "Contracts", term: "Time is of the Essence", definition: "A contract clause making all specified deadlines strictly enforceable. Missing a deadline — even by one day — can legally constitute a breach of contract." },
{ id: 48, category: "Contracts", term: "Earnest Money", definition: "A good-faith deposit made by the buyer to demonstrate serious intent to purchase. Held in escrow. If the buyer defaults without a valid reason, the seller may keep it as liquidated damages." },
{ id: 49, category: "Contracts", term: "Option Contract", definition: "A unilateral contract giving the buyer the exclusive right — but NOT the obligation — to purchase a property at an agreed price within a set time period. The seller is bound; the buyer can choose not to exercise it." },
{ id: 50, category: "Contracts", term: "Right of First Refusal", definition: "Gives a party the right to match any offer the owner receives before accepting it from someone else. It is not a right to buy — only a right to match terms if the owner decides to sell." },
{ id: 51, category: "Contracts", term: "Contract for Deed", definition: "Also called a land contract or installment sale. The buyer takes possession and makes payments directly to the seller, but the seller retains legal title until the full purchase price is paid." },
{ id: 52, category: "Contracts", term: "Liquidated Damages", definition: "A pre-agreed amount of compensation specified in the contract that one party will pay if they breach. In real estate, the earnest money deposit is most commonly identified as liquidated damages." },
{ id: 53, category: "Financing", term: "Amortization", definition: "The gradual repayment of a mortgage through scheduled regular payments. In early years, most of each payment covers interest. Over time, more of each payment goes toward reducing the principal." },
{ id: 54, category: "Financing", term: "Loan-to-Value (LTV)", definition: "A ratio comparing the loan amount to the appraised property value. LTV = Loan divided by Value. Lenders use it to assess risk — higher LTV means higher risk to the lender." },
{ id: 55, category: "Financing", term: "PMI", definition: "Private Mortgage Insurance — protects the LENDER (not the borrower) against default. Required on conventional loans when the down payment is less than 20% (LTV over 80%)." },
{ id: 56, category: "Financing", term: "FHA Loan", definition: "A government-backed loan insured by the Federal Housing Administration. Requires as little as 3.5% down but mandates a Mortgage Insurance Premium (MIP) for the life of the loan in most cases." },
{ id: 57, category: "Financing", term: "VA Loan", definition: "A loan guaranteed by the Department of Veterans Affairs for eligible service members and veterans. No down payment required, no PMI, but a one-time funding fee is charged at closing." },
{ id: 58, category: "Financing", term: "Acceleration Clause", definition: "A mortgage provision giving the lender the right to demand the entire remaining loan balance be paid immediately if the borrower defaults on their payments." },
{ id: 59, category: "Financing", term: "Due-on-Sale Clause", definition: "Requires the full mortgage balance to be paid off when the property is sold or transferred. Prevents the buyer from assuming the seller's existing loan without lender approval." },
{ id: 60, category: "Financing", term: "Discount Points", definition: "Prepaid interest paid at closing to lower the mortgage interest rate. One point = 1% of the loan amount. More points paid upfront results in a lower monthly payment over the loan's life." },
{ id: 61, category: "Financing", term: "Secondary Mortgage Market", definition: "Where already-originated loans are bought and sold. Fannie Mae and Freddie Mac purchase conventional loans; Ginnie Mae backs FHA and VA loan securities. This frees up capital for new loans." },
{ id: 62, category: "Financing", term: "RESPA", definition: "The Real Estate Settlement Procedures Act. Prohibits kickbacks and unearned fees. Requires a Loan Estimate within 3 business days of application and a Closing Disclosure 3 days before settlement." },
{ id: 63, category: "Financing", term: "Deed of Trust", definition: "A security instrument used in many states instead of a mortgage. Involves three parties: the trustor (borrower), the beneficiary (lender), and a neutral trustee who holds legal title until the loan is repaid." },
{ id: 64, category: "Financing", term: "Negative Amortization", definition: "Occurs when monthly loan payments are less than the interest accruing on the balance. The unpaid interest is added to the principal, causing the loan balance to grow over time despite making payments." },
{ id: 65, category: "Financing", term: "Balloon Mortgage", definition: "A loan with regular payments that do not fully pay off the balance, ending in one large lump-sum payment due at a set date. Often used by borrowers expecting to refinance or sell before the balloon is due." },
{ id: 66, category: "Financing", term: "Deficiency Judgment", definition: "A court judgment against a borrower for the remaining loan balance after a foreclosure sale does not generate enough proceeds to fully pay off the mortgage." },
{ id: 67, category: "Financing", term: "Subordination Clause", definition: "A mortgage provision where a lender agrees to accept a lower lien priority position, allowing a new loan to take first position. Commonly used when refinancing or adding construction financing." },
{ id: 68, category: "Appraisal", term: "Sales Comparison Approach", definition: "Estimates value by comparing the subject property to recently sold comparable properties nearby. Adjustments are made for differences. Most reliable method for single-family residential homes." },
{ id: 69, category: "Appraisal", term: "Cost Approach", definition: "Estimates value as: Replacement Cost of Improvements minus Depreciation plus Land Value. Best for new construction and special-use properties like schools and churches that rarely sell." },
{ id: 70, category: "Appraisal", term: "Income Approach", definition: "Converts a property's income into a value estimate using: Value = NOI divided by Cap Rate. The most appropriate method for income-producing investment properties like apartment buildings." },
{ id: 71, category: "Appraisal", term: "Functional Obsolescence", definition: "A loss in property value from outdated or inadequate design features within the property — such as a 4-bedroom home with only one bathroom. Can be curable or incurable." },
{ id: 72, category: "Appraisal", term: "External Obsolescence", definition: "A loss in value caused by factors entirely outside the property itself — such as a new highway nearby or a declining neighborhood. It is always considered incurable." },
{ id: 73, category: "Appraisal", term: "Highest and Best Use", definition: "The use of a property that is legally permissible, physically possible, financially feasible, AND produces the maximum property value. Appraisers determine this before valuing any property." },
{ id: 74, category: "Appraisal", term: "Principle of Substitution", definition: "A foundational appraisal principle stating that a buyer will pay no more for a property than the cost of acquiring an equally desirable substitute. This principle underlies the Sales Comparison Approach." },
{ id: 75, category: "Appraisal", term: "Principle of Contribution", definition: "The value of any component of a property is measured by how much it adds to the overall property value — not by its cost. A $50,000 pool may only add $20,000 in value to a home." },
{ id: 76, category: "Appraisal", term: "Plottage / Assemblage", definition: "Assemblage is combining two or more adjacent parcels into one. Plottage is the increased value that results — the combined parcel is worth more than the sum of the individual lots." },
{ id: 77, category: "Fair Housing", term: "7 Protected Classes", definition: "The Fair Housing Act prohibits discrimination based on: Race, Color, Religion, National Origin, Sex, Familial Status, and Disability. Familial Status and Disability were added by the 1988 amendment." },
{ id: 78, category: "Fair Housing", term: "Mrs. Murphy Exemption", definition: "An exemption from the Fair Housing Act for owners of buildings with 4 or fewer units who live in one of those units. The owner may personally choose tenants — but CANNOT use a broker or place discriminatory advertising." },
{ id: 79, category: "Fair Housing", term: "Disparate Impact", definition: "A legal theory where a facially neutral policy is considered discriminatory if it disproportionately and negatively affects members of a protected class — even without any discriminatory intent." },
{ id: 80, category: "Fair Housing", term: "ECOA", definition: "The Equal Credit Opportunity Act. Prohibits lenders from discriminating in credit decisions based on race, color, religion, national origin, sex, marital status, age, or receipt of public assistance. Implemented by Regulation B." },
{ id: 81, category: "Fair Housing", term: "ADA", definition: "The Americans with Disabilities Act. Requires commercial properties and places of public accommodation to provide accessible facilities and remove barriers. Does not generally apply to private residential housing." },
{ id: 82, category: "Land Use", term: "Police Power", definition: "The government's authority to regulate private property to protect public health, safety, and welfare. The legal basis for zoning, building codes, and environmental laws. No compensation is owed to the owner." },
{ id: 83, category: "Land Use", term: "Eminent Domain", definition: "The constitutional right of government to take private property for public use. The owner must receive just compensation at fair market value. The legal process of taking is called condemnation." },
{ id: 84, category: "Land Use", term: "Inverse Condemnation", definition: "When a government action reduces a property's value without formally taking it, the owner may sue the government for compensation. The owner initiates the action — the opposite of normal condemnation." },
{ id: 85, category: "Land Use", term: "Nonconforming Use", definition: "A property use that legally existed before zoning regulations were enacted. It is allowed to continue but typically cannot be expanded, rebuilt after major damage, or changed to a different nonconforming use." },
{ id: 86, category: "Land Use", term: "Special Use Permit", definition: "Permission granted by a zoning authority to allow a specific use not normally permitted in a zone, subject to conditions. Examples: a daycare center in a residential zone or a drive-through in a standard commercial zone." },
{ id: 87, category: "Land Use", term: "Spot Zoning", definition: "The rezoning of a single parcel in a way that is inconsistent with the surrounding area's zoning and serves only the parcel owner's interest. Generally considered illegal because it lacks a legitimate public purpose." },
{ id: 88, category: "Land Use", term: "Ad Valorem Tax", definition: "A property tax based on the assessed value of the property. Calculated as: Assessed Value times Tax Rate. One mill equals $1 per $1,000 of assessed value, or $0.001 per dollar." },
{ id: 89, category: "Leases", term: "Gross Lease", definition: "A lease where the tenant pays a fixed rent and the landlord covers most or all operating expenses including taxes, insurance, and maintenance. Common in residential rentals." },
{ id: 90, category: "Leases", term: "Net Lease", definition: "A lease where the tenant pays base rent plus some portion of the property's operating expenses. Types include Single Net (N), Double Net (NN), and Triple Net (NNN), each adding more tenant responsibilities." },
{ id: 91, category: "Leases", term: "Triple Net (NNN) Lease", definition: "A lease where the tenant pays base rent plus all three nets: property taxes, building insurance, and maintenance costs. The landlord receives a truly net income with minimal expenses." },
{ id: 92, category: "Leases", term: "Percentage Lease", definition: "A lease requiring the tenant to pay a fixed base rent plus a percentage of their gross sales. Most commonly used in retail settings and shopping centers." },
{ id: 93, category: "Leases", term: "Ground Lease", definition: "A long-term lease of land only. The tenant builds improvements on the land and may own those improvements during the lease term. At the end of the lease, improvements typically revert to the landowner." },
{ id: 94, category: "Leases", term: "Constructive Eviction", definition: "When a landlord's failure to maintain habitable conditions forces a tenant to vacate. The tenant is not formally removed but is effectively driven out. The tenant may be relieved of further rent obligations." },
{ id: 95, category: "Leases", term: "Periodic Tenancy", definition: "A leasehold that automatically renews for successive equal periods until one party gives proper advance notice to terminate. Examples: month-to-month, week-to-week." },
{ id: 96, category: "Leases", term: "Tenancy at Sufferance", definition: "Occurs when a tenant remains in possession after their lease expires without the landlord's permission. The landlord may treat them as a trespasser or choose to accept rent and create a periodic tenancy." },
{ id: 97, category: "License Law", term: "Conversion", definition: "The illegal act of using a client's funds (such as earnest money or security deposits) for the broker's own personal or business purposes. Goes beyond commingling and may constitute criminal fraud." },
{ id: 98, category: "License Law", term: "Sherman Antitrust Act", definition: "A federal law prohibiting anti-competitive business practices. In real estate, it forbids brokers from agreeing to fix commission rates (price-fixing) or dividing up market areas (market allocation)." },
{ id: 99, category: "License Law", term: "Errors and Omissions Insurance", definition: "Professional liability insurance for real estate licensees that covers claims arising from mistakes, negligence, or failure to disclose material facts. Protects the agent if a client sues over a transaction error." },
{ id: 100, category: "License Law", term: "Subagency", definition: "When a listing broker authorizes another broker to act as the seller's agent. The cooperating broker becomes a subagent of the seller — even if working with the buyer — and owes fiduciary duties to the seller." },
]

const QUIZ_QUESTIONS = [
{ category: "Ownership", question: "Which ownership type gives the most complete rights with no conditions attached?", options: ["Leasehold Estate","Life Estate","Fee Simple Absolute","Joint Tenancy"], answer: 2, explanation: "Fee Simple Absolute is the highest form of ownership — complete control with no time limits or conditions. The owner can sell, lease, mortgage, or will the property freely." },
{ category: "Ownership", question: "Two co-owners hold title with right of survivorship. When one owner passes away, their share:", options: ["Passes to their heirs via their will","Moves automatically to the surviving owner","Reverts to the state","Goes through probate"], answer: 1, explanation: "Right of survivorship in Joint Tenancy means the deceased owner's interest transfers automatically to the surviving owners — completely bypassing probate." },
{ category: "Ownership", question: "Which co-ownership form allows partners to hold unequal shares and leave them to anyone in a will?", options: ["Joint Tenancy","Tenancy by the Entirety","Tenancy in Common","Community Property"], answer: 2, explanation: "Tenancy in Common allows unequal ownership shares. Each owner can independently sell, mortgage, or will their interest to anyone — there is no right of survivorship." },
{ category: "Ownership", question: "The MARIA test is used to determine whether an item is legally considered a:", options: ["Valid deed","Fixture","Type of lien","Form of legal description"], answer: 1, explanation: "MARIA (Method of attachment, Adaptability, Relationship, Intention, Agreement) determines whether personal property has legally become part of the real property as a fixture." },
{ category: "Ownership", question: "A condo owner's legal interest includes fee simple title to their unit plus:", options: ["A leasehold interest in common areas","Corporate shares in the building","An undivided interest in all common areas","Nothing beyond their unit's four walls"], answer: 2, explanation: "Condo owners hold fee simple title to their individual unit AND share an undivided interest in all common elements — lobbies, hallways, amenities, and grounds." },
{ category: "Ownership", question: "Which form of co-ownership is exclusively available to married couples?", options: ["Joint Tenancy","Tenancy in Common","Severalty","Tenancy by the Entirety"], answer: 3, explanation: "Tenancy by the Entirety is reserved for married couples. Neither spouse can transfer or encumber their interest without the other's full consent." },
{ category: "Ownership", question: "A property is granted 'as long as it is used as a school.' If the school closes, ownership ends. This is:", options: ["Fee Simple Absolute","Life Estate","Fee Simple Defeasible","Leasehold Estate"], answer: 2, explanation: "Fee Simple Defeasible is ownership with a condition — if the condition is violated, ownership automatically terminates and may revert to the grantor." },
{ category: "Ownership", question: "When a person owns property entirely on their own with no co-owners, this is called:", options: ["Joint Tenancy","Severalty","Tenancy in Common","Community Property"], answer: 1, explanation: "Severalty is ownership by a single individual alone. The term comes from the idea of severing all others from an interest in the property." },
{ category: "Agency", question: "Which fiduciary duty continues to bind an agent even after the listing agreement expires?", options: ["Obedience","Loyalty","Confidentiality","Accounting"], answer: 2, explanation: "Confidentiality is the only fiduciary duty that survives the end of the agency relationship. An agent may never later disclose information that could be used against a former client." },
{ category: "Agency", question: "An agent says a home has 'the most spectacular sunsets in the entire county.' This is an example of:", options: ["Fraud","Material misrepresentation","Puffing","Steering"], answer: 2, explanation: "Puffing is non-factual, exaggerated, subjective praise. No reasonable person would rely on it as a verifiable statement of fact. It is not illegal." },
{ category: "Agency", question: "A listing agreement that guarantees the broker a commission no matter who finds the buyer is called:", options: ["Open Listing","Exclusive Agency","Exclusive Right to Sell","Net Listing"], answer: 2, explanation: "The Exclusive Right to Sell guarantees the listing broker a commission regardless of who produces the buyer — another agent, the seller themselves, or anyone else." },
{ category: "Agency", question: "Dual agency requires which of the following before it can proceed?", options: ["Verbal consent from the buyer only","A court order","Informed written consent from both buyer and seller","State licensing board approval"], answer: 2, explanation: "Dual agency creates a conflict of interest. It is legal in most states only with informed written consent from both the buyer and the seller." },
{ category: "Agency", question: "An agent guides a family toward a different neighborhood based on their race. This illegal act is called:", options: ["Blockbusting","Redlining","Commingling","Steering"], answer: 3, explanation: "Steering is the illegal practice of directing buyers or renters toward or away from specific neighborhoods based on a protected characteristic such as race." },
{ category: "Agency", question: "A broker deposits a client's earnest money into their personal checking account. This violation is called:", options: ["Conversion","Commingling","Fraud","Puffing"], answer: 1, explanation: "Commingling is the illegal mixing of client funds with the broker's personal or business funds. Brokers must keep all client money in a separate escrow or trust account." },
{ category: "Agency", question: "An agent encourages homeowners to sell quickly by warning a different ethnic group is buying nearby. This is:", options: ["Steering","Redlining","Blockbusting","Spot Zoning"], answer: 2, explanation: "Blockbusting (panic peddling) is the illegal act of inducing owners to sell by making representations about a protected class entering the neighborhood." },
{ category: "Agency", question: "In an Open Listing, a commission is earned only by:", options: ["Any broker who shows the property","The listing broker regardless of who sells","The broker who actually produces the buyer","The broker with the lowest rate"], answer: 2, explanation: "In an Open Listing, multiple brokers can market the same property, but only the one who actually brings the ready, willing, and able buyer earns the commission." },
{ category: "Contracts", question: "For a real estate contract to be enforceable in court, the Statute of Frauds requires it to be:", options: ["Notarized","In writing","Witnessed by two people","Reviewed by an attorney"], answer: 1, explanation: "The Statute of Frauds requires real estate contracts to be in writing to be enforceable. An oral agreement to buy or sell real property cannot be upheld in court." },
{ category: "Contracts", question: "A seller tries to back out of an accepted offer. The buyer goes to court to force the sale. This remedy is called:", options: ["Liquidated Damages","Rescission","Specific Performance","Novation"], answer: 2, explanation: "Specific Performance forces a party to complete the transaction as agreed. It is uniquely available in real estate because each property is legally considered one-of-a-kind." },
{ category: "Contracts", question: "A contract that was illegal from the start and has no legal effect whatsoever is:", options: ["Voidable","Unenforceable","Void","Executory"], answer: 2, explanation: "A void contract has no legal effect from the beginning — it was never a valid contract. Example: a contract to perform an illegal act." },
{ category: "Contracts", question: "A buyer's offer includes a clause stating the deal only goes forward if they secure a mortgage. This clause is a:", options: ["Time is of the Essence clause","Contingency","Novation","Liquidated Damages clause"], answer: 1, explanation: "A financing contingency is a condition that must be satisfied before the contract is binding. If the buyer cannot secure a loan, they can exit without penalty." },
{ category: "Contracts", question: "A new party takes over a contract, completely releasing the original party from all liability. This is:", options: ["Assignment","Rescission","Specific Performance","Novation"], answer: 3, explanation: "Novation substitutes a new contracting party for the original one and fully releases the original party. All parties must agree to the substitution." },
{ category: "Contracts", question: "Which of the following is NOT a required element of a valid real estate contract?", options: ["Consideration","Mutual Agreement","Notarization","Legal Purpose"], answer: 2, explanation: "Notarization is NOT a required element to form a valid contract. The essentials are Offer, Acceptance, Consideration, Legal Capacity, and Legal Purpose." },
{ category: "Financing", question: "The borrower in a mortgage transaction is called the:", options: ["Mortgagee","Trustee","Mortgagor","Beneficiary"], answer: 2, explanation: "The mortgagor is the borrower who pledges the property as collateral. The mortgagee is the lender. Memory tip: mortgagOR = the One who Owes." },
{ category: "Financing", question: "PMI is purchased primarily to protect:", options: ["The borrower against job loss","The lender when the down payment is under 20%","The seller if the buyer walks away","The title company against defects"], answer: 1, explanation: "Private Mortgage Insurance (PMI) protects the lender — not the buyer — in case of default. Required on conventional loans when LTV exceeds 80%." },
{ category: "Financing", question: "One discount point paid at closing equals:", options: ["0.5% of the purchase price","1% of the purchase price","1% of the loan amount","A flat $1,000 fee"], answer: 2, explanation: "One discount point = 1% of the loan amount, paid upfront at closing. Buying points reduces the interest rate, lowering monthly payments over the life of the loan." },
{ category: "Financing", question: "If a borrower stops making payments, which mortgage clause lets the lender demand the entire balance immediately?", options: ["Subordination Clause","Prepayment Clause","Due-on-Sale Clause","Acceleration Clause"], answer: 3, explanation: "The acceleration clause gives the lender the right to call the entire remaining loan balance due immediately upon the borrower's default." },
{ category: "Financing", question: "Ginnie Mae's primary role in the secondary mortgage market is to:", options: ["Originate FHA loans directly","Back securities made of FHA and VA loans","Set conventional loan limits","Insure conventional mortgages"], answer: 1, explanation: "Ginnie Mae (GNMA) is a government agency guaranteeing mortgage-backed securities composed of FHA and VA loans, providing liquidity for lenders to make more government-backed loans." },
{ category: "Financing", question: "TRID requires lenders to deliver the Closing Disclosure to buyers at least how far in advance of closing?", options: ["1 business day","3 business days","5 business days","7 calendar days"], answer: 1, explanation: "Under TRID, the Closing Disclosure must be delivered at least 3 business days before closing, giving borrowers time to review final loan terms." },
{ category: "Financing", question: "With a standard amortizing mortgage, what happens over time?", options: ["Interest portion increases each month","Each payment stays the same but more goes to principal over time","Early payments are mostly principal","Both portions stay equal"], answer: 1, explanation: "Amortization keeps the payment constant, but the composition shifts. Early on most of the payment covers interest. As the balance falls, more of each payment reduces principal." },
{ category: "Financing", question: "A VA loan is available to:", options: ["All first-time homebuyers","Any buyer with good credit","Eligible military service members and veterans","Buyers in rural areas only"], answer: 2, explanation: "VA loans are a benefit for eligible active-duty military, veterans, and surviving spouses. They offer no down payment and no PMI, though a one-time funding fee applies." },
{ category: "Fair Housing", question: "Which of the following is NOT one of the 7 federally protected classes under the Fair Housing Act?", options: ["Familial Status","Disability","Sexual Orientation","National Origin"], answer: 2, explanation: "Sexual Orientation is not currently a federal protected class under the Fair Housing Act. The 7 federal classes are Race, Color, Religion, National Origin, Sex, Familial Status, and Disability." },
{ category: "Fair Housing", question: "A landlord refuses to rent to a couple because they have a toddler. This violates the protected class of:", options: ["Disability","Sex","Familial Status","National Origin"], answer: 2, explanation: "Familial Status protects households with children under 18, pregnant women, and those gaining custody. Refusing to rent to families with young children is illegal discrimination." },
{ category: "Fair Housing", question: "An agent tells homeowners their values will drop because another ethnic group is buying nearby. This is:", options: ["Steering","Redlining","Blockbusting","Puffing"], answer: 2, explanation: "Blockbusting (panic peddling) is inducing owners to sell by making representations about protected classes entering the neighborhood." },
{ category: "Fair Housing", question: "The Civil Rights Act of 1866 prohibits housing discrimination based on race and has:", options: ["The same exemptions as the 1968 Fair Housing Act","No exemptions whatsoever","The Mrs. Murphy exemption","An exemption for small landlords"], answer: 1, explanation: "The Civil Rights Act of 1866 has absolutely NO exemptions. Every property transaction involving racial discrimination is prohibited, no exceptions." },
{ category: "Fair Housing", question: "A tenant with a disability asks to install grab bars. The landlord must:", options: ["Pay for the modifications","Allow them at the tenant's expense","Refuse since it alters the unit","Get city approval first"], answer: 1, explanation: "The Fair Housing Act requires landlords to allow reasonable modifications for disabled tenants. The tenant pays, and the landlord may require restoration when the tenant moves out." },
{ category: "Fair Housing", question: "A Fair Housing complaint filed with HUD must be submitted within:", options: ["6 months","1 year","2 years","3 years"], answer: 1, explanation: "HUD complaints must be filed within 1 year of the alleged discriminatory act. A federal court lawsuit has a 2-year deadline." },
{ category: "Appraisal", question: "Which appraisal method is considered most reliable for a single-family home?", options: ["Cost Approach","Income Approach","Sales Comparison Approach","Gross Rent Multiplier Method"], answer: 2, explanation: "The Sales Comparison Approach is most reliable for residential properties because there are typically many recent comparable home sales available to use as benchmarks." },
{ category: "Appraisal", question: "Which appraisal approach works best for a fire station or elementary school?", options: ["Income Approach","Sales Comparison Approach","Cost Approach","GRM Method"], answer: 2, explanation: "The Cost Approach is best for special-use or public properties because they rarely sell (making comparables scarce) and they do not generate rental income." },
{ category: "Appraisal", question: "A home loses value because it has an outdated floor plan with poor room flow. This is an example of:", options: ["Physical deterioration","External obsolescence","Functional obsolescence","Curable depreciation"], answer: 2, explanation: "Functional obsolescence is a loss in value due to outdated or inadequate design features within the property itself — like an awkward floor plan or too few bathrooms." },
{ category: "Appraisal", question: "A factory opens one block away, reducing nearby home values. This depreciation is:", options: ["Physical deterioration","Functional obsolescence","External obsolescence","Curable depreciation"], answer: 2, explanation: "External obsolescence results from factors entirely outside the property — like nearby industrial uses, a highway, or neighborhood decline. It is always classified as incurable." },
{ category: "Appraisal", question: "Highest and Best Use must satisfy all of the following EXCEPT:", options: ["Legally permissible","Physically possible","Owned by the government","Financially feasible"], answer: 2, explanation: "Highest and Best Use must be legally permissible, physically possible, and financially feasible — and produce maximum value. Government ownership is not a requirement." },
{ category: "Math", question: "A property sells for $400,000 with a 5% commission. What is the total commission?", options: ["$20,000","$25,000","$40,000","$4,000"], answer: 0, explanation: "$400,000 x 0.05 = $20,000 total commission." },
{ category: "Math", question: "A home is worth $320,000 with a $200,000 loan balance. What is the owner's equity?", options: ["$200,000","$320,000","$120,000","$80,000"], answer: 2, explanation: "Equity = Market Value - Loan Balance = $320,000 - $200,000 = $120,000." },
{ category: "Math", question: "A rental property has an NOI of $60,000 and the local cap rate is 8%. What is the estimated property value?", options: ["$480,000","$750,000","$600,000","$680,000"], answer: 1, explanation: "Value = NOI / Cap Rate = $60,000 / 0.08 = $750,000." },
{ category: "Math", question: "A borrower has a $180,000 loan at 6% annual interest. What is the interest portion of the first monthly payment?", options: ["$10,800","$1,080","$900","$1,800"], answer: 2, explanation: "Annual interest = $180,000 x 0.06 = $10,800. Monthly interest = $10,800 / 12 = $900." },
{ category: "Math", question: "How many square feet are in one acre?", options: ["36,000","40,000","43,560","48,000"], answer: 2, explanation: "One acre = 43,560 square feet. This is one of the most frequently tested numbers on the real estate exam — memorize it." },
{ category: "Land Use", question: "A property was used as a gas station before zoning laws were passed. The zoning now prohibits it. The owner can:", options: ["Continue operating as a nonconforming use","Be immediately forced to close","Apply for a variance to continue","Rezone the property themselves"], answer: 0, explanation: "A nonconforming use that legally existed before zoning was enacted is allowed to continue. However, it typically cannot be expanded or rebuilt if substantially destroyed." },
{ category: "Land Use", question: "The government takes a private landowner's property to build a new public highway. The owner must receive:", options: ["Nothing — eminent domain requires no payment","Replacement land of equal value","Just compensation at fair market value","Payment only if they contest in court"], answer: 2, explanation: "The 5th Amendment requires the government to pay just compensation — fair market value — whenever it exercises eminent domain and takes private property for public use." },
{ category: "Land Use", question: "A homeowner wants to build a garage that extends beyond the required setback. They should apply for a:", options: ["Rezoning","Special use permit","Variance","Nonconforming use certificate"], answer: 2, explanation: "A variance is an exception to a specific zoning requirement granted when strict enforcement would cause unique hardship. It does not change the underlying zoning of the property." },
{ category: "Land Use", question: "A church wants to operate a food pantry in a residential zone. They should apply for a:", options: ["Variance","Special use permit","Rezoning","Certificate of occupancy"], answer: 1, explanation: "A special use permit allows a specific use not normally permitted in a zone, subject to conditions. Churches and daycares in residential zones are common examples." },
{ category: "Land Use", question: "Which government power allows local authorities to create zoning laws and building codes?", options: ["Eminent domain","Escheat","Taxation","Police power"], answer: 3, explanation: "Police power is the government's authority to regulate land use to protect public health, safety, and welfare. It is the basis for zoning laws, building codes, and environmental regulations." },
{ category: "Land Use", question: "A new building cannot be legally occupied until the owner obtains a:", options: ["Variance","Certificate of Occupancy","Special use permit","Plat approval"], answer: 1, explanation: "A Certificate of Occupancy (CO) is issued by the local authority after a building passes all required inspections. It legally authorizes the building to be occupied." },
{ category: "Deeds & Title", question: "Which of the following is NOT required for a deed to be valid?", options: ["Grantor's signature","Legal description of the property","Recording at the county office","Identifiable grantee"], answer: 2, explanation: "Recording is NOT required for a deed to be valid between the grantor and grantee. However, recording provides constructive notice and protects the buyer against future claims from third parties." },
{ category: "Deeds & Title", question: "A property owner dies without a will and has no living heirs. The property will:", options: ["Be sold at auction","Pass to the nearest neighbor","Revert to the state through escheat","Become public park land automatically"], answer: 2, explanation: "Escheat is the process by which property reverts to the state when an owner dies intestate and has no identifiable heirs." },
{ category: "Deeds & Title", question: "In a 1031 exchange, an investor has how many days to identify a replacement property?", options: ["30 days","45 days","60 days","90 days"], answer: 1, explanation: "A 1031 Like-Kind Exchange requires the investor to identify potential replacement properties within 45 days of the sale and close on the replacement within 180 days." },
{ category: "Deeds & Title", question: "To acquire title through adverse possession, the possession must be all of the following EXCEPT:", options: ["Open and notorious","Hostile and without permission","Continuous for the statutory period","Witnessed by a licensed surveyor"], answer: 3, explanation: "Adverse possession requires open, notorious, hostile, actual, and continuous possession for the statutory period. A licensed surveyor's witness is not a legal requirement." },
{ category: "Deeds & Title", question: "Which type of deed is most commonly used in a court-ordered foreclosure sale?", options: ["General Warranty Deed","Special Warranty Deed","Quitclaim Deed","Sheriff's Deed"], answer: 3, explanation: "A Sheriff's Deed (or Trustee's Deed) is used in court-ordered or foreclosure sales. It conveys the property but typically carries no warranties from the grantor." },
{ category: "Leases", question: "In a gross lease, who is responsible for paying the property's operating expenses?", options: ["The tenant pays all expenses","The landlord pays expenses; tenant pays fixed rent","Both split expenses equally","The property manager pays from reserves"], answer: 1, explanation: "In a gross lease, the tenant pays a fixed rent amount and the landlord covers all or most operating expenses such as taxes, insurance, and maintenance." },
{ category: "Leases", question: "A retail tenant pays base rent plus a percentage of their monthly sales. This is a:", options: ["Gross lease","Net lease","Percentage lease","Ground lease"], answer: 2, explanation: "A percentage lease requires the tenant to pay a base rent plus a percentage of their gross sales revenue. It is most common in retail and shopping center settings." },
{ category: "Leases", question: "In a Triple Net (NNN) lease, the tenant is responsible for:", options: ["Base rent only","Base rent plus utilities only","Base rent, taxes, insurance, and maintenance","All expenses including mortgage payments"], answer: 2, explanation: "In a Triple Net lease, the tenant pays base rent plus the three nets: property taxes, building insurance, and maintenance/operating expenses." },
{ category: "Leases", question: "A landlord refuses to fix a broken heating system in freezing weather, making the unit uninhabitable. The tenant leaves. This is called:", options: ["Actual eviction","Constructive eviction","Unlawful detainer","Lease abandonment"], answer: 1, explanation: "Constructive eviction occurs when the landlord's failure to maintain habitable conditions effectively forces the tenant to vacate. The tenant may be relieved of rent obligations." },
{ category: "Leases", question: "A lease that automatically renews for equal successive periods until one party gives proper notice is called:", options: ["Estate for years","Tenancy at will","Periodic tenancy","Tenancy at sufferance"], answer: 2, explanation: "A periodic tenancy automatically renews for the same period — month-to-month or week-to-week — until one party gives proper advance notice to terminate." },
{ category: "Leases", question: "A tenant stays in a property after their lease expires without the landlord's permission. This is called:", options: ["Periodic tenancy","Tenancy at will","Tenancy at sufferance","Holdover tenancy renewal"], answer: 2, explanation: "Tenancy at sufferance occurs when a tenant remains in possession after their lease ends without the landlord's permission." },
{ category: "Leases", question: "Which of the following is excluded when calculating NOI?", options: ["Property taxes","Insurance premiums","Mortgage payments","Routine maintenance costs"], answer: 2, explanation: "NOI excludes debt service (mortgage payments) and depreciation. It equals Gross Income minus Vacancy Loss minus Operating Expenses like taxes, insurance, and maintenance." },
{ category: "License Law", question: "A broker uses a client's earnest money deposit to pay their own office rent. This is called:", options: ["Commingling","Conversion","Subrogation","Novation"], answer: 1, explanation: "Conversion is the illegal act of using client funds for personal or business purposes. It goes beyond commingling and may constitute criminal fraud or embezzlement." },
{ category: "License Law", question: "Several competing brokers in a city agree to all charge the same 6% commission rate. This violates:", options: ["RESPA","The Fair Housing Act","The Sherman Antitrust Act","TILA"], answer: 2, explanation: "The Sherman Antitrust Act prohibits price-fixing among competitors. Brokers agreeing to set standard commission rates is illegal price-fixing." },
{ category: "License Law", question: "Which of the following activities requires a real estate license?", options: ["Selling your own home","Managing properties you personally own","Listing another person's property for compensation","Auctioning personal property"], answer: 2, explanation: "A real estate license is required to represent others in real estate transactions for compensation. Selling your own property or managing your own properties does not require a license." },
{ category: "License Law", question: "A salesperson receives a referral fee directly from a mortgage lender for sending clients their way. This most likely violates:", options: ["The Sherman Antitrust Act","RESPA","The Fair Housing Act","ECOA"], answer: 1, explanation: "RESPA prohibits kickbacks and unearned fees between settlement service providers. Accepting referral fees from lenders is a RESPA violation." },
{ category: "License Law", question: "A real estate agent represents a buyer while secretly receiving compensation from the seller without disclosing it. This is called:", options: ["Dual agency","A secret profit","Puffing","Designated agency"], answer: 1, explanation: "A secret profit occurs when an agent receives undisclosed compensation from another party. It violates the fiduciary duties of loyalty and disclosure." },
{ category: "License Law", question: "Which of the following people is typically EXEMPT from needing a real estate license?", options: ["A property manager at a complex they do not own","An attorney handling a real estate closing in their legal capacity","A person listing homes for sellers for a commission","A buyer's agent representing clients in purchases"], answer: 1, explanation: "Attorneys acting in their legal capacity during real estate transactions are typically exempt from licensing requirements. They are regulated by the state bar instead." },
{ category: "Ownership", question: "A property owner has the right to use water from a river that borders their land. This right is called:", options: ["Mineral rights","Air rights","Riparian rights","Littoral rights"], answer: 2, explanation: "Riparian rights give landowners whose property borders a river or stream the right to use the flowing water." },
{ category: "Ownership", question: "Which of the following is considered real property?", options: ["A refrigerator the seller is taking","A freestanding bookshelf","Built-in kitchen cabinets","A portable shed not attached to the foundation"], answer: 2, explanation: "Built-in cabinets are attached to the structure and are considered fixtures — real property. Freestanding or portable items that are not permanently attached remain personal property." },
{ category: "Financing", question: "A borrower takes out a loan where the interest rate is fixed for 5 years then adjusts annually. This is called a:", options: ["Balloon mortgage","Graduated payment mortgage","5/1 ARM","Wraparound mortgage"], answer: 2, explanation: "A 5/1 ARM has a fixed rate for the first 5 years, then adjusts every 1 year thereafter based on an index." },
{ category: "Financing", question: "After a foreclosure sale, the proceeds are $40,000 less than the outstanding loan balance. The lender may pursue the borrower for a:", options: ["Short sale judgment","Deficiency judgment","Lis pendens claim","Quiet title action"], answer: 1, explanation: "A deficiency judgment allows the lender to sue the borrower for the remaining balance after a foreclosure sale does not generate enough to cover the full loan amount." },
{ category: "Math", question: "A buyer puts 10% down on a $250,000 home. What is their loan amount?", options: ["$25,000","$225,000","$250,000","$200,000"], answer: 1, explanation: "Down payment = $250,000 x 10% = $25,000. Loan amount = $250,000 - $25,000 = $225,000." },
{ category: "Math", question: "A property is assessed at $180,000 and the tax rate is 2%. What are the annual property taxes?", options: ["$1,800","$3,600","$18,000","$360"], answer: 1, explanation: "Property Tax = Assessed Value x Tax Rate = $180,000 x 0.02 = $3,600 per year." },
{ category: "Math", question: "A commercial building has a depreciable value of $390,000. What is the annual depreciation for tax purposes?", options: ["$10,000","$14,182","$15,000","$10,577"], answer: 0, explanation: "Commercial depreciation = $390,000 / 39 years = $10,000 per year." },
{ category: "Math", question: "A listing agent and buyer's agent split a 6% commission equally on a $425,000 sale. How much does each broker receive?", options: ["$25,500","$12,750","$6,375","$8,500"], answer: 1, explanation: "Total commission = $425,000 x 6% = $25,500. Split equally = $25,500 / 2 = $12,750 to each broker." },
{ category: "Appraisal", question: "An agent prepares a CMA for a seller to help set a listing price. How does this differ from a formal appraisal?", options: ["A CMA is more legally binding than an appraisal","A CMA is done by a licensed agent and is not a formal appraisal; an appraisal is done by a licensed appraiser","They are the same thing with different names","An appraisal is only required for commercial properties"], answer: 1, explanation: "A CMA is prepared by a real estate agent to estimate listing or offer price. It is not a formal appraisal, which must be performed by a licensed or certified appraiser." },
{ category: "Appraisal", question: "A small home in a neighborhood of large luxury homes will likely be valued higher than it would be elsewhere. This illustrates:", options: ["Regression","Progression","Substitution","Contribution"], answer: 1, explanation: "The principle of progression states that a lower-value property benefits from being located near higher-value properties." },
{ category: "Fair Housing", question: "A newspaper ad says 'ideal for single professionals.' This language potentially violates Fair Housing because it suggests a preference against:", options: ["Single people","Families with children — Familial Status","Professionals — income discrimination","It does not violate Fair Housing"], answer: 1, explanation: "Language like 'ideal for single professionals' implies a preference against families with children, which is discrimination based on Familial Status." },
{ category: "Fair Housing", question: "Which federal law specifically prohibits discrimination in mortgage lending based on race, color, religion, national origin, sex, marital status, or age?", options: ["Fair Housing Act","Civil Rights Act of 1866","ECOA","Community Reinvestment Act"], answer: 2, explanation: "ECOA (Equal Credit Opportunity Act) specifically prohibits credit discrimination based on race, color, religion, national origin, sex, marital status, age, or receipt of public assistance." },
{ category: "Contracts", question: "A buyer pays a seller $500 for the exclusive right to purchase a property at a set price within 60 days. This is called:", options: ["A right of first refusal","An option contract","A bilateral purchase agreement","A land contract"], answer: 1, explanation: "An option contract gives the buyer the exclusive right — but not the obligation — to purchase a property at an agreed price within a set period. The seller is bound; the buyer can choose not to exercise it." },
{ category: "Contracts", question: "A buyer makes an offer. The seller responds with different terms and a different price. The original offer is now:", options: ["Still valid until the buyer responds","Automatically accepted by the seller's response","Terminated — the counteroffer acts as a rejection","Extended for 48 hours by law"], answer: 2, explanation: "A counteroffer simultaneously rejects the original offer and creates a new offer. The original offer no longer exists." },
{ category: "Contracts", question: "A buyer takes title and makes payments directly to the seller over time, while the seller retains the deed until paid in full. This is a:", options: ["Wraparound mortgage","Contract for deed (land contract)","Lease with option to buy","Assumption of mortgage"], answer: 1, explanation: "A contract for deed allows the buyer to possess and use the property while making payments to the seller, who retains legal title until the debt is paid in full." },
{ category: "Agency", question: "A seller tells their listing agent they will accept $10,000 less than the asking price. The agent must:", options: ["Tell all interested buyers","Keep this information confidential","Disclose it in the MLS listing","Tell the buyer's agent immediately"], answer: 1, explanation: "A seller's minimum acceptable price is confidential information that the listing agent cannot disclose without the seller's permission. Disclosing it violates fiduciary duty." },
{ category: "Agency", question: "Which of the following is a material fact that an agent MUST disclose to a buyer?", options: ["The seller's reason for moving","A known foundation crack that affects the property's value","The seller's minimum acceptable price","That the seller is going through a divorce"], answer: 1, explanation: "A known foundation crack is a material fact — a defect that would affect a reasonable buyer's decision or the property's value. Agents must disclose all known material facts." },
{ category: "Deeds & Title", question: "A title search reveals a gap in the chain of title from 1987 to 1992. This creates a:", options: ["Lis pendens","Cloud on title","Deed restriction","Mechanic's lien"], answer: 1, explanation: "A cloud on title is any document, claim, or defect in the record that may impair the validity of the owner's title. A gap in the chain of title creates such a cloud." },
{ category: "Fair Housing", question: "The ADA primarily applies to which type of property?", options: ["All residential rentals","Single-family homes","Commercial properties and public accommodations","Only government-owned buildings"], answer: 2, explanation: "The ADA applies to commercial facilities and places of public accommodation. It does not generally apply to private residential housing, which is covered by the Fair Housing Act." },
{ category: "Land Use", question: "The rezoning of one single parcel in a way inconsistent with the surrounding area — benefiting only that owner — is generally considered illegal. This is called:", options: ["Variance","Special use permit","Spot zoning","Nonconforming use"], answer: 2, explanation: "Spot zoning is the illegal rezoning of a single parcel inconsistently with the surrounding area. Courts generally strike it down because it lacks a legitimate public purpose." },
{ category: "License Law", question: "A licensee assists both a buyer and seller without representing either as a fiduciary. This is known as:", options: ["Dual agency","Sub-agency","Transaction brokerage","Designated agency"], answer: 2, explanation: "A transaction broker assists both parties in completing a transaction but does not represent either as a fiduciary. Used in some states as an alternative to dual agency." },
]

const FORMULAS = [
{ name: "Commission", formula: "Sale Price x Commission Rate", example: "$300,000 x 6% = $18,000", color: "blue" },
{ name: "Loan-to-Value (LTV)", formula: "Loan Amount / Appraised Value x 100", example: "$240,000 / $300,000 x 100 = 80%", color: "emerald" },
{ name: "Down Payment", formula: "Purchase Price x Down Payment %", example: "$300,000 x 20% = $60,000", color: "red" },
{ name: "Equity", formula: "Market Value - Outstanding Loan Balance", example: "$350,000 - $220,000 = $130,000", color: "emerald" },
{ name: "Gross Rent Multiplier (GRM)", formula: "Property Price / Monthly Gross Rent", example: "$300,000 / $2,000 = 150", color: "blue" },
{ name: "Cap Rate", formula: "NOI / Property Value x 100", example: "$18,000 / $300,000 x 100 = 6%", color: "emerald" },
{ name: "Value (Income Approach)", formula: "NOI / Cap Rate", example: "$18,000 / 0.06 = $300,000", color: "red" },
{ name: "Net Operating Income (NOI)", formula: "Gross Income - Vacancy Loss - Operating Expenses", example: "$30,000 - $2,000 - $10,000 = $18,000", color: "blue" },
{ name: "Monthly Interest", formula: "(Loan Balance x Annual Rate) / 12", example: "($200,000 x 6%) / 12 = $1,000/mo", color: "red" },
{ name: "Depreciation (Residential)", formula: "Building Value / 27.5 years", example: "$275,000 / 27.5 = $10,000/yr", color: "blue" },
{ name: "Depreciation (Commercial)", formula: "Building Value / 39 years", example: "$390,000 / 39 = $10,000/yr", color: "emerald" },
{ name: "Property Tax", formula: "Assessed Value x Tax Rate", example: "$200,000 x 1.5% = $3,000/yr", color: "red" },
{ name: "Proration (Daily Rate)", formula: "Annual Amount / 365 days", example: "$3,650 / 365 = $10/day", color: "blue" },
{ name: "Break-Even Ratio", formula: "(Expenses + Debt Service) / Gross Income", example: "($12,000 + $15,000) / $30,000 = 90%", color: "emerald" },
]

const ACHIEVEMENTS = [
{ id: "first_card", name: "First Flip!", icon: "🃏", desc: "Study your first flashcard", xp: 10 },
{ id: "cards_10", name: "Flashcard Fan", icon: "📚", desc: "Study 10 flashcards", xp: 20 },
{ id: "cards_30", name: "Card Shark", icon: "🦈", desc: "Study 30 flashcards", xp: 40 },
{ id: "quiz_start", name: "Quiz Taker", icon: "📝", desc: "Complete your first quiz", xp: 25 },
{ id: "perfect_quiz", name: "Perfect Score!", icon: "🌟", desc: "Get 100% on a quiz", xp: 50 },
{ id: "quiz_50", name: "Half Century", icon: "🎯", desc: "Answer 50 quiz questions", xp: 35 },
{ id: "streak_3", name: "On Fire!", icon: "🔥", desc: "3-day streak", xp: 30 },
{ id: "formula_master", name: "Math Wizard", icon: "🧮", desc: "View all formulas", xp: 20 },
]

const QUIZ_CATEGORIES = ["All", ...Array.from(new Set(QUIZ_QUESTIONS.map(q => q.category)))]
const CARD_CATEGORIES = ["All", ...Array.from(new Set(FLASHCARDS.map(c => c.category)))]

export default function App() {
const [tab, setTab] = useState("dashboard")
const [xp, setXp] = useState(() => parseInt(localStorage.getItem("xp") || "0"))
const [streak, setStreak] = useState(() => parseInt(localStorage.getItem("streak") || "0"))
const [achievements, setAchievements] = useState(() => JSON.parse(localStorage.getItem("achievements") || "[]"))
const [newAchievement, setNewAchievement] = useState(null)
const [cardsStudied, setCardsStudied] = useState(() => parseInt(localStorage.getItem("cardsStudied") || "0"))
const [formulasViewed, setFormulasViewed] = useState(() => parseInt(localStorage.getItem("formulasViewed") || "0"))
const [totalAnswered, setTotalAnswered] = useState(() => parseInt(localStorage.getItem("totalAnswered") || "0"))

useEffect(() => {
localStorage.setItem("xp", xp)
localStorage.setItem("streak", streak)
localStorage.setItem("achievements", JSON.stringify(achievements))
localStorage.setItem("cardsStudied", cardsStudied)
localStorage.setItem("formulasViewed", formulasViewed)
localStorage.setItem("totalAnswered", totalAnswered)
}, [xp, streak, achievements, cardsStudied, formulasViewed, totalAnswered])

const addXP = (amount) => setXp(prev => prev + amount)

const unlockAchievement = (id) => {
if (!achievements.includes(id)) {
const ach = ACHIEVEMENTS.find(a => a.id === id)
if (!ach) return
setAchievements(prev => [...prev, id])
addXP(ach.xp)
setNewAchievement(ach)
setTimeout(() => setNewAchievement(null), 3000)
}
}

const level = Math.floor(xp / 100) + 1
const xpForLevel = xp % 100

const navItems = [
{ id: "dashboard", icon: <Home size={16} />, label: "Home" },
{ id: "flashcards", icon: <Zap size={16} />, label: "Flashcards" },
{ id: "quiz", icon: <Target size={16} />, label: "Quiz" },
{ id: "formulas", icon: <Calculator size={16} />, label: "Formulas" },
{ id: "terms", icon: <List size={16} />, label: "Key Terms" },
{ id: "tutor", icon: <Bot size={16} />, label: "AI Tutor" },
]

return (
<div className="app">
<div className="notebook-bg" />
<div className="dark-overlay" />
<div className="orb orb-blue" />
<div className="orb orb-emerald" />

{newAchievement && (
<div className="achievement-toast">
<span>{newAchievement.icon}</span>
<div><strong>Achievement Unlocked!</strong><p>{newAchievement.name} +{newAchievement.xp} XP</p></div>
</div>
)}

<header className="header">
<div className="logo">
<div className="logo-icon">RE</div>
<div>
<div className="logo-name">RealPrep</div>
<div className="logo-sub">Ace Your Exam</div>
</div>
</div>
<div className="header-stats">
<div className="stat-pill">⚡ {xp} XP</div>
<div className="stat-pill">🔥 {streak} streak</div>
<div className="stat-pill emerald">🏆 Level {level}</div>
</div>
</header>

<div className="xp-bar-container">
<div className="xp-bar" style={{ width: `${xpForLevel}%` }} />
</div>

<nav className="nav">
{navItems.map(t => (
<button key={t.id} className={`nav-btn ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
{t.icon}<span>{t.label}</span>
</button>
))}
</nav>

<main className="main">
{tab === "dashboard" && <Dashboard xp={xp} streak={streak} level={level} xpForLevel={xpForLevel} achievements={achievements} cardsStudied={cardsStudied} totalAnswered={totalAnswered} setTab={setTab} />}
{tab === "flashcards" && <Flashcards addXP={addXP} unlockAchievement={unlockAchievement} cardsStudied={cardsStudied} setCardsStudied={setCardsStudied} />}
{tab === "quiz" && <Quiz addXP={addXP} unlockAchievement={unlockAchievement} totalAnswered={totalAnswered} setTotalAnswered={setTotalAnswered} />}
{tab === "formulas" && <Formulas unlockAchievement={unlockAchievement} formulasViewed={formulasViewed} setFormulasViewed={setFormulasViewed} />}
{tab === "terms" && <KeyTerms />}
{tab === "tutor" && <AITutor />}
</main>
</div>
)
}

function Dashboard({ xp, streak, level, xpForLevel, achievements, cardsStudied, totalAnswered, setTab })  {
return (
<div className="dashboard">
<div className="welcome-card">
<div className="welcome-badge"><span className="pulse-dot" />Study Session Active</div>
<h1 className="gradient-text">Welcome back, Megan!</h1>
<p className="welcome-sub">You are on your way to passing that real estate exam. Keep going!</p>
<button className="btn btn-gradient" onClick={()=> setTab("flashcards")}>Start Studying</button></div>

<div className="stats-grid">
style={{ fontSize: "1.8rem", marginBottom: 6 }}⚡<div className="stat-card emerald"><div className="stat-icon-wrap" style={{ fontSize: "1.8rem" }}>🏆</div><div className="stat-val" style={{ fontSize: "2rem" }}>{level}</div><div className="stat-lbl">Level</div></div>
<div className="stat-card red"><div className="stat-icon-wrap" style={{ fontSize: "1.8rem" }}>🔥</div><div className="stat-val" style={{ fontSize: "2rem" }}>{streak}</div><div className="stat-lbl">Day Streak</div></div>
<div className="stat-card blue"><div className="stat-icon-wrap" style={{ fontSize: "1.8rem" }}>🃏</div><div className="stat-val" style={{ fontSize: "2rem" }}>{cardsStudied}</div><div className="stat-lbl">Cards Studied</div></div>
</div>

<div className="dark-card">
<div className="card-header"><span className="card-title">Level Progress</span><span className="emerald-text">{xpForLevel}/100 XP</span></div>
<div className="level-bar"><div className="level-fill" style={{ width: `${xpForLevel}%` }} /></div>
<p className="muted-text">Level {level} to Level {level + 1}</p>
</div>

<div className="dark-card">
<div className="card-header"><span className="card-title">📊 Content Library</span></div>
<div className="stats-grid" style={{ marginTop: 8 }}>
<div className="stat-card"><div className="stat-val" style={{ fontSize: "1.2rem" }}>{FLASHCARDS.length}</div><div className="stat-lbl">Flashcards</div></div>
<div className="stat-card"><div className="stat-val" style={{ fontSize: "1.2rem" }}>{QUIZ_QUESTIONS.length}</div><div className="stat-lbl">Quiz Qs</div></div>
<div className="stat-card"><div className="stat-val" style={{ fontSize: "1.2rem" }}>{FORMULAS.length}</div><div className="stat-lbl">Formulas</div></div>
<div className="stat-card"><div className="stat-val" style={{ fontSize: "1.2rem" }}>{totalAnswered}</div><div className="stat-lbl">Answered</div></div>
</div>
</div>

<div className="dark-card">
<div className="card-title mb16">🏅 Achievements</div>
<div className="achievements-grid">
{ACHIEVEMENTS.map(ach => (
<div key={ach.id} className={`ach-card ${achievements.includes(ach.id) ? "unlocked" : "locked"}`}>
<div className="ach-icon">{achievements.includes(ach.id) ? ach.icon : "🔒"}</div>
<div className="ach-name">{ach.name}</div>
<div className="ach-desc">{ach.desc}</div>
<div className="ach-xp">+{ach.xp} XP</div>
</div>
))}
</div>
</div>
</div>
)
}

function Flashcards({ addXP, unlockAchievement, cardsStudied, setCardsStudied }) {
const [catFilter, setCatFilter] = useState("All")
const [index, setIndex] = useState(0)
const [flipped, setFlipped] = useState(false)
const [studied, setStudied] = useState(new Set())

const filtered = catFilter === "All" ? FLASHCARDS : FLASHCARDS.filter(c => c.category === catFilter)
const card = filtered[index] || filtered[0]

const handleFlip = () => {
if (!flipped) {
setFlipped(true)
if (!studied.has(card.id)) {
setStudied(prev => new Set([...prev, card.id]))
addXP(5)
const n = cardsStudied + 1
setCardsStudied(n)
if (n === 1) unlockAchievement("first_card")
if (n >= 10) unlockAchievement("cards_10")
if (n >= 30) unlockAchievement("cards_30")
}
} else setFlipped(false)
}

const next = () => { setIndex((index + 1) % filtered.length); setFlipped(false) }
const prev = () => { setIndex((index - 1 + filtered.length) % filtered.length); setFlipped(false) }
const handleCat = (cat) => { setCatFilter(cat); setIndex(0); setFlipped(false) }

return (
<div className="section">
<div className="section-header">
<h2 className="gradient-text">Smart Flashcards</h2>
<p className="muted-text">{studied.size}/{FLASHCARDS.length} studied • +5 XP per new card</p>
</div>
<div className="category-pills">
{CARD_CATEGORIES.map(cat => (
<button key={cat} className={`cat-pill ${catFilter === cat ? "active" : ""}`} onClick={() => handleCat(cat)}>{cat}</button>
))}
</div>
<p className="muted-text" style={{ marginBottom: 10 }}>{filtered.length} cards</p>
<div className={`flip-card ${flipped ? "flipped" : ""}`} onClick={handleFlip}>
<div className="flip-inner">
<div className="flip-front">
<div className="card-badge blue-badge">{card.category}</div>
<div className="card-term">{card.term}</div>
<div className="muted-text mt8">Tap to reveal definition</div>
</div>
<div className="flip-back">
<div className="card-badge emerald-badge">DEFINITION</div>
<div className="card-def">{card.definition}</div>
</div>
</div>
</div>
<div className="card-controls">
<button className="btn btn-ghost" onClick={prev}>Prev</button>
<span className="muted-text">{index + 1} / {filtered.length}</span>
<button className="btn btn-gradient" onClick={next}>Next</button>
</div>
</div>
)
}

function Quiz({ addXP, unlockAchievement, totalAnswered, setTotalAnswered }) {
const [catFilter, setCatFilter] = useState("All")
const [pool, setPool] = useState([])
const [qIndex, setQIndex] = useState(0)
const [selected, setSelected] = useState(null)
const [score, setScore] = useState(0)
const [done, setDone] = useState(false)
const [started, setStarted] = useState(false)

const buildPool = (cat) => {
const base = cat === "All" ? QUIZ_QUESTIONS : QUIZ_QUESTIONS.filter(q => q.category === cat)
return [...base].sort(() => Math.random() - 0.5)
}

const startQuiz = () => {
setPool(buildPool(catFilter))
setQIndex(0); setSelected(null); setScore(0); setDone(false); setStarted(true)
}

const q = pool[qIndex]

const handleAnswer = (i) => {
if (selected !== null) return
setSelected(i)
if (i === q.answer) { addXP(10); setScore(p => p + 1) }
const next = totalAnswered + 1
setTotalAnswered(next)
if (next >= 50) unlockAchievement("quiz_50")
}

const handleNext = () => {
if (qIndex + 1 >= pool.length) {
setDone(true)
unlockAchievement("quiz_start")
if (score + (selected === q.answer ? 1 : 0) === pool.length) unlockAchievement("perfect_quiz")
} else {
setQIndex(qIndex + 1); setSelected(null)
}
}

if (!started) return (
<div className="section center-section">
<h2 className="gradient-text">Practice Exam</h2>
<p className="muted-text">{QUIZ_QUESTIONS.length} questions total • +10 XP per correct answer</p>
<div className="category-pills" style={{ justifyContent: "center" }}>
{QUIZ_CATEGORIES.map(cat => (
<button key={cat} className={`cat-pill ${catFilter === cat ? "active" : ""}`} onClick={() => setCatFilter(cat)}>{cat}</button>
))}
</div>
<p className="muted-text">
{catFilter === "All" ? QUIZ_QUESTIONS.length : QUIZ_QUESTIONS.filter(q => q.category === catFilter).length} questions in this set
</p>
<button className="btn btn-gradient btn-big" onClick={startQuiz}>Start Quiz 🚀</button>
</div>
)

if (done) {
const pct = Math.round((score / pool.length) * 100)
return (
<div className="section center-section">
<div className="score-ring"><div className="score-pct">{pct}%</div><div className="score-lbl">Score</div></div>
<h2 className="gradient-text">{pct >= 80 ? "Outstanding! 🎉" : pct >= 60 ? "Nice Work! 💪" : "Keep Studying! 📚"}</h2>
<p className="muted-text">{score}/{pool.length} correct • {score * 10} XP earned</p>
<div style={{ display: "flex", gap: 10 }}>
<button className="btn btn-gradient" onClick={startQuiz}>Retry</button>
<button className="btn btn-ghost" onClick={() => setStarted(false)}>Change Category</button>
</div>
</div>
)
}

return (
<div className="section">
<div className="quiz-header-row">
<span className="muted-text">Question {qIndex + 1}/{pool.length} • <span style={{ color: "#3b82f6" }}>{q.category}</span></span>
<span className="emerald-text font-bold">Score: {score}</span>
</div>
<div className="progress-bar"><div className="progress-fill" style={{ width: `${(qIndex / pool.length) * 100}%` }} /></div>
<div className="dark-card">
<h3 className="question-text">{q.question}</h3>
<div className="options">
{q.options.map((opt, i) => (
<button key={i} className={`option ${selected !== null ? (i === q.answer ? "correct" : i === selected ? "wrong" : "") : ""}`} onClick={() => handleAnswer(i)}>
<span className="option-letter">{["A","B","C","D"][i]}</span>{opt}
</button>
))}
</div>
{selected !== null && (
<div className={`explanation ${selected === q.answer ? "correct-exp" : "wrong-exp"}`}>
<strong>{selected === q.answer ? "Correct!" : "Not quite!"}</strong>
<p>{q.explanation}</p>
</div>
)}
</div>
{selected !== null && (
<button className="btn btn-gradient" onClick={handleNext}>
{qIndex + 1 >= pool.length ? "See Results 🎉" : "Next Question"}
</button>
)}
</div>
)
}

function Formulas({ unlockAchievement, formulasViewed, setFormulasViewed }) {
const [viewed, setViewed] = useState(new Set())
const handleView = (i) => {
if (!viewed.has(i)) {
const n = new Set([...viewed, i])
setViewed(n)
const c = formulasViewed + 1
setFormulasViewed(c)
if (c >= FORMULAS.length) unlockAchievement("formula_master")
}
}
return (
<div className="section">
<div className="section-header">
<h2 className="gradient-text">Formulas</h2>
<p className="muted-text">Tap to expand • {viewed.size}/{FORMULAS.length} reviewed</p>
</div>
<div className="formulas-grid">
{FORMULAS.map((f, i) => <FormulaCard key={i} formula={f} onView={() => handleView(i)} />)}
</div>
</div>
)
}

function FormulaCard({ formula, onView }) {
const [open, setOpen] = useState(false)
return (
<div className={`formula-card ${formula.color} ${open ? "open" : ""}`} onClick={() => { setOpen(!open); if (!open) onView() }}>
<div className="formula-name">{formula.name}</div>
{open && <div className="formula-body"><div className="formula-eq">{formula.formula}</div><div className="formula-ex">📌 {formula.example}</div></div>}
</div>
)
}

function KeyTerms() {
const [search, setSearch] = useState("")
const [catFilter, setCatFilter] = useState("All")

const filtered = FLASHCARDS.filter(c => {
const matchCat = catFilter === "All" || c.category === catFilter
const matchText = c.term.toLowerCase().includes(search.toLowerCase()) || c.definition.toLowerCase().includes(search.toLowerCase())
return matchCat && matchText
})

return (
<div className="section">
<div className="section-header">
<h2 className="gradient-text">Key Terms Glossary</h2>
<p className="muted-text">{FLASHCARDS.length} terms across {CARD_CATEGORIES.length - 1} categories</p>
</div>
<input className="search-input" placeholder="Search terms or definitions..." value={search} onChange={e => setSearch(e.target.value)} />
<div className="category-pills" style={{ marginTop: 10 }}>
{CARD_CATEGORIES.map(cat => (
<button key={cat} className={`cat-pill ${catFilter === cat ? "active" : ""}`} onClick={() => setCatFilter(cat)}>{cat}</button>
))}
</div>
<p className="muted-text" style={{ marginBottom: 6 }}>{filtered.length} results</p>
<div className="terms-list">
{filtered.map(card => (
<div key={card.id} className="term-item">
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
<div className="term-name">{card.term}</div>
<span style={{ fontSize: "0.65rem", background: "#27272a", color: "#71717a", padding: "2px 8px", borderRadius: 10 }}>{card.category}</span>
</div>
<div className="term-def">{card.definition}</div>
</div>
))}
</div>
</div>
)
}

function AITutor() {
const messagesEndRef = useRef(null)
const [messages, setMessages] = useState([
{ role: "assistant", text: "Hey! I am your real estate exam tutor. I am grounded to a verified knowledge base — I only answer from exam-tested real estate material and will not make things up. Ask me anything: concepts, formulas, laws, or how to remember tricky topics!" }
])
const [input, setInput] = useState("")
const [loading, setLoading] = useState(false)
const [apiKey, setApiKey] = useState(() => localStorage.getItem("geminiKey") || "")
const [showKey, setShowKey] = useState(!localStorage.getItem("geminiKey"))

useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }) }, [messages, loading])

const saveKey = () => { localStorage.setItem("geminiKey", apiKey); setShowKey(false) }

const QUICK_PROMPTS = [
"What are the 7 Fair Housing protected classes?",
"Explain Joint Tenancy vs Tenancy in Common",
"How do I calculate a cap rate?",
"What does OLD CAR stand for?",
"Explain the 3 approaches to appraisal",
"What is blockbusting vs steering?",
]

const send = async (overrideText) => {
const msg = overrideText || input.trim()
if (!msg || loading) return
setInput("")
setMessages(p => [...p, { role: "user", text: msg }])
setLoading(true)

const groundedPrompt = "You are a real estate exam prep tutor. You must ONLY answer using the knowledge base provided below. Do not use any outside knowledge. If a question is not covered, say: That topic is not in my knowledge base — try asking about a related topic.\n\nBe concise, clear, and exam-focused. Use bullet points for lists. Mention memory tricks when helpful.\n\nKNOWLEDGE BASE:\n" + KNOWLEDGE_BASE + "\n\nStudent question: " + msg

try {
const res = await fetch(
"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey,
{
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ contents: [{ parts: [{ text: groundedPrompt }] }] })
}
)
const data = await res.json()
const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Something went wrong — please try again."
setMessages(p => [...p, { role: "assistant", text: reply }])
} catch {
setMessages(p => [...p, { role: "assistant", text: "Connection error. Please check your API key and try again." }])
}
setLoading(false)
}

if (showKey) return (
<div className="section">
<h2 className="gradient-text">AI Tutor Setup</h2>
<div className="dark-card">
<p className="muted-text mb16">Enter your free Google Gemini API key to enable the AI tutor.</p>
<p className="muted-text mb16">Get one free at <strong className="emerald-text">aistudio.google.com</strong></p>
<input className="search-input" type="password" placeholder="AIza..." value={apiKey} onChange={e => setApiKey(e.target.value)} />
<button className="btn btn-gradient mt16" onClick={saveKey}>Save and Enable Tutor</button>
</div>
</div>
)

return (
<div className="section tutor-section">
<div className="tutor-header-row">
<h2 className="gradient-text">AI Tutor</h2>
<button className="btn-ghost-sm" onClick={() => setShowKey(true)}>Change Key</button>
</div>
<div className="quick-prompts">
{QUICK_PROMPTS.map((p, i) => (
<button key={i} className="quick-prompt-btn" onClick={() => send(p)}>{p}</button>
))}
</div>
<div className="messages">
{messages.map((m, i) => (
<div key={i} className={"message " + m.role}>
<div className="bubble">{m.text}</div>
</div>
))}
{loading && <div className="message assistant"><div className="bubble loading">Thinking...</div></div>}
<div ref={messagesEndRef} />
</div>
<div className="chat-row">
<input
className="chat-input"
placeholder="Ask anything about real estate..."
value={input}
onChange={e => setInput(e.target.value)}
onKeyDown={e => e.key === "Enter" && send()}
/>
<button className="btn btn-gradient" onClick={() => send()} disabled={loading}>Send</button>
</div>
</div>
)
}