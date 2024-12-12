/**
 * @license
 * Copyright 2022 Superflow.dev
 * SPDX-License-Identifier: MIT
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
// import {customElement, query, queryAssignedElements, property} from 'lit/decorators.js';
import { customElement, query, property } from 'lit/decorators.js';
// import {customElement, query, property} from 'lit/decorators.js';
import Util from './util';
// import {LitElement, html, css} from 'lit';
// import {customElement} from 'lit/decorators.js';
import { createDataObject, createAddButtonObject, isAddButtonObject } from './dataObjects';
/*

Modes: View, Add, Edit, Delete, Admin
DB: partitionKey, rangeKey, values

*/
/**
 * SfIReporting element.
 * @fires renderComplete - When the list is populated
 * @fires valueChanged - When the value is changed
 * @property apiId - backend api id
 * @property label - input label
 * @property name - name of the input
 * @property mode - mode of operation
 * @property selectedId - id to preselect
 * @property selectedValue - callback function
 */
let SfIReporting = class SfIReporting extends LitElement {
    constructor() {
        super();
        this.apiId = "";
        this.projectid = "";
        this.projectname = "";
        this.configjson = "[]";
        // configjson: string = "[{\"type\":\"sf-i-form\",\"size\":\"large\",\"label\":\"Tags\",\"hint\":\"Tags applied to notice\",\"id\":\"tags\",\"mode\":\"multiselect-dropdown\",\"apiid\":\"dnytrdlrmxgsy.cloudfront.net/tagging\",\"searchstring\":\"Tag\",\"selectprojection\":\"name\",\"ignoredprojections\":\"[&quot;updatetype&quot;,&quot;project&quot;,&quot;tagtype&quot;,&quot;shortid&quot;]\",\"maxselect\":\"100\",\"mandatory\":\"\"}]";
        // configjson: string = "[{\"type\":\"textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Prepared by\",\"hint\":\"Mention the names of people who participated in preparing this document\",\"id\":\"preparedby\",\"value\":\"prepared by test\",\"collapse\":\"true\"},{\"type\":\"textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Approved by\",\"hint\":\"Mention the names of people who participated in reviewing this document\",\"id\":\"approvedby\",\"value\":\"test approved by\",\"collapse\":\"true\"},{\"type\":\"textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Purpose\",\"hint\":\"This is a checklist for reporting the statutory internal audit results of the infection control program\",\"id\":\"purpose\",\"value\":\"test purpose\",\"collapse\":\"true\"},{\"type\":\"section\",\"name\":\"Compliance with Biomedical Waste Management Rules, 2016\",\"size\":\"\",\"label\":\"\",\"hint\":\"\",\"id\":\"section-0\",\"value\":\"\",\"collapse\":\"false\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Is the hospital registered with the State Pollution Control Board (SPCB) for biomedical waste management?\",\"hint\":\"\",\"id\":\"bmwspcb\",\"value\":[\"No\",\"\"],\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are biomedical waste segregation protocols (color-coded bins) in place and followed as per rules?\",\"hint\":\"\",\"id\":\"bmwcolorcoding\",\"value\":[\"Yes\",\"\"],\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are disposal records for biomedical waste maintained as required by law?\",\"hint\":\"\",\"id\":\"bmwdisposal\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Is there a valid agreement with an authorized biomedical waste disposal vendor?\",\"hint\":\"\",\"id\":\"bmwvendoragreement\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are healthcare staff trained in biomedical waste segregation and disposal protocols?\",\"hint\":\"\",\"id\":\"bmwtraining\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"section\",\"name\":\"Compliance with The Drugs and Cosmetics Act, 1940 (Infection Control Equipment and Materials)\",\"size\":\"\",\"label\":\"\",\"hint\":\"\",\"id\":\"section-1\",\"value\":\"\",\"collapse\":\"false\"},{\"type\":\"yesno+textarea\",\"options\":[\"option1\",\"option2\",\"option3\"],\"name\":\"\",\"size\":\"large\",\"label\":\"Are hand hygiene products (e.g., alcohol-based hand rubs) procured from licensed vendors as per statutory regulations?\",\"hint\":\"\",\"id\":\"hhvendors\",\"value\":[\"option2\",\"\"],\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are disinfectants, sterilants, and antiseptics used in the hospital in compliance with the Drugs and Cosmetics Act?\",\"hint\":\"\",\"id\":\"disinfectantsdca\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Is there a regular check on the expiration dates and quality standards of infection control materials?\",\"hint\":\"\",\"id\":\"expirycheck\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"section\",\"name\":\"Compliance with The Indian Epidemic Diseases Act, 1897 (Outbreak Management)\",\"size\":\"\",\"label\":\"\",\"hint\":\"\",\"id\":\"section-2\",\"value\":\"\",\"collapse\":\"false\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Is there a policy in place for managing infectious disease outbreaks in compliance with the Indian Epidemic Diseases Act?\",\"hint\":\"\",\"id\":\"outbreakpolicy\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are protocols in place for isolation, patient segregation, and reporting of notifiable diseases as per government directives?\",\"hint\":\"\",\"id\":\"diseasereporting\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are outbreak reports documented and communicated to relevant authorities (local health departments, as per law)?\",\"hint\":\"\",\"id\":\"outbreakreporting\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"section\",\"name\":\"Compliance with The Water (Prevention and Control of Pollution) Act, 1974 (Water Quality Monitoring)\",\"size\":\"\",\"label\":\"\",\"hint\":\"\",\"id\":\"section-3\",\"value\":\"\",\"collapse\":\"false\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Is the hospital water supply tested regularly for microbiological contaminants?\",\"hint\":\"\",\"id\":\"watertesting\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are there documented records of water quality reports, and are they in compliance with prescribed standards?\",\"hint\":\"\",\"id\":\"waterqualityreporting\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Is there an arrangement for safe water storage and waste-water disposal in line with statutory requirements?\",\"hint\":\"\",\"id\":\"waterstorage\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"section\",\"name\":\"Compliance with The Air (Prevention and Control of Pollution) Act, 1981 (Air Quality Management)\",\"size\":\"\",\"label\":\"\",\"hint\":\"\",\"id\":\"section-4\",\"value\":\"\",\"collapse\":\"false\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are air conditioning and ventilation systems in place that comply with regulatory standards, especially in critical areas like OTs and ICUs?\",\"hint\":\"\",\"id\":\"acinplace\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are air filters in the hospital HVAC systems cleaned or replaced as per environmental laws and infection control guidelines?\",\"hint\":\"\",\"id\":\"airfilters\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are regular air quality audits conducted, and are reports maintained?\",\"hint\":\"\",\"id\":\"airqualityaudits\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"section\",\"name\":\"Compliance with The Public Health Act (Surveillance and Reporting)\",\"size\":\"\",\"label\":\"\",\"hint\":\"\",\"id\":\"section-5\",\"value\":\"\",\"collapse\":\"false\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Is there a surveillance system for monitoring hospital-acquired infections (HAIs)?\",\"hint\":\"\",\"id\":\"haisurveillance\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are notifiable infections reported to local health authorities as per the law?\",\"hint\":\"\",\"id\":\"infectionreporting\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are infection surveillance records maintained, and are they in compliance with public health laws?\",\"hint\":\"\",\"id\":\"infectionsurveillance\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"section\",\"name\":\"Compliance with The Occupational Safety and Health Act (Workplace Safety)\",\"size\":\"\",\"label\":\"\",\"hint\":\"\",\"id\":\"section-6\",\"value\":\"\",\"collapse\":\"false\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are healthcare workers provided with adequate personal protective equipment (PPE) in line with statutory safety regulations?\",\"hint\":\"\",\"id\":\"ppeallocation\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Is there a needle stick and sharps injury prevention policy in place, and is it compliant with the OSHA guidelines?\",\"hint\":\"\",\"id\":\"safeipolicy\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are protocols for staff vaccination (e.g., Hepatitis B, Influenza) and post-exposure prophylaxis (PEP) established?\",\"hint\":\"\",\"id\":\"prophylaxis\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"section\",\"name\":\"Compliance with The Clinical Establishments (Registration and Regulation) Act, 2010 (General Infection Control Requirements)\",\"size\":\"\",\"label\":\"\",\"hint\":\"\",\"id\":\"section-7\",\"value\":\"\",\"collapse\":\"false\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Is the hospital registered under the Clinical Establishments Act, and does it meet the infection control standards prescribed?\",\"hint\":\"\",\"id\":\"registration\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are infection control protocols updated and audited regularly, as required by the Act?\",\"hint\":\"\",\"id\":\"hicprotocolsupdated\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are records of infection control compliance maintained and available for inspection by regulatory authorities?\",\"hint\":\"\",\"id\":\"compliancerecords\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"section\",\"name\":\"Compliance with Fire Safety Regulations (Infection Control During Emergency Evacuations)\",\"size\":\"\",\"label\":\"\",\"hint\":\"\",\"id\":\"section-8\",\"value\":\"\",\"collapse\":\"false\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are fire safety protocols in place that ensure infection control measures (e.g., patient isolation) during evacuations?\",\"hint\":\"\",\"id\":\"firesafetyprotocols\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are infection control materials (e.g., masks, gloves) readily available for use during fire drills or actual emergencies?\",\"hint\":\"\",\"id\":\"hicmaterials\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"section\",\"name\":\"Compliance with The National Health Mission Guidelines (Sanitation and Hygiene)\",\"size\":\"\",\"label\":\"\",\"hint\":\"\",\"id\":\"section-9\",\"value\":\"\",\"collapse\":\"false\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are the hospital’s sanitation practices in compliance with National Health Mission standards for hospital cleanliness and hygiene?\",\"hint\":\"\",\"id\":\"sanitizationpractices\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are there dedicated housekeeping protocols for the cleaning and disinfection of patient care areas as per government guidelines?\",\"hint\":\"\",\"id\":\"housekeepingprotocols\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are sanitation records maintained, and are they available for regulatory review?\",\"hint\":\"\",\"id\":\"sanitiziationrecords\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"section\",\"name\":\"Compliance with The Indian Council of Medical Research (ICMR) Guidelines (Antibiotic Stewardship)\",\"size\":\"\",\"label\":\"\",\"hint\":\"\",\"id\":\"section-10\",\"value\":\"\",\"collapse\":\"false\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Is the hospital following ICMR guidelines for antibiotic stewardship to prevent the development of antimicrobial resistance (AMR)?\",\"hint\":\"\",\"id\":\"icmramsguidelines\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are antibiotic use patterns monitored, and are they compliant with ICMR’s antimicrobial stewardship guidelines?\",\"hint\":\"\",\"id\":\"patternsmonitoring\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are periodic audits conducted to assess adherence to guidelines, and are the audit reports documented?\",\"hint\":\"\",\"id\":\"amsaudits\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"section\",\"name\":\"Compliance with The Indian Medical Council (Professional Conduct, Etiquette, and Ethics) Regulations, 2002\",\"size\":\"\",\"label\":\"\",\"hint\":\"\",\"id\":\"section-11\",\"value\":\"\",\"collapse\":\"false\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are healthcare workers adhering to professional conduct and ethical guidelines for infection prevention as prescribed by the Medical Council of India?\",\"hint\":\"\",\"id\":\"professionalconduct\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are there protocols in place to report unethical or unsafe infection control practices?\",\"hint\":\"\",\"id\":\"unethicalreporting\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"section\",\"name\":\"Compliance with Employee State Insurance (ESI) Act, 1948 (Healthcare Worker Safety)\",\"size\":\"\",\"label\":\"\",\"hint\":\"\",\"id\":\"section-12\",\"value\":\"\",\"collapse\":\"false\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are healthcare workers insured under the ESI scheme, particularly those involved in high-risk infection control activities?\",\"hint\":\"\",\"id\":\"esiinsured\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are there protocols for compensation in case of occupational hazards (e.g., infections contracted at work)?\",\"hint\":\"\",\"id\":\"compensationprotocols\",\"value\":\"\",\"collapse\":\"true\"}]";
        // configjson: string = "[{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Prepared by\",\"hint\":\"Mention the names of people who participated in preparing this document\",\"id\":\"preparedby\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Approved by\",\"hint\":\"Mention the names of people who participated in reviewing this document\",\"id\":\"approvedby\"},[{\"type\":\"itemname\",\"name\":\"External Reporting Agency\"},{\"type\":\"textarea\",\"size\":\"small\",\"label\":\"Name\",\"hint\":\"State the name of the agency\",\"id\":\"name{iter}\"},{\"type\":\"textarea\",\"size\":\"small\",\"label\":\"Type\",\"hint\":\"State the type of the agency such as government (local, state, nationa), private, educational institute, etc.\",\"id\":\"type{iter}\"},{\"type\":\"textarea\",\"size\":\"small\",\"label\":\"Contact Person\",\"hint\":\"Name of the contact person\",\"id\":\"contact-person{iter}\"},{\"type\":\"textarea\",\"size\":\"small\",\"label\":\"Phone Number\",\"hint\":\"Phone number of the contact person\",\"id\":\"contact-phone{iter}\"},{\"type\":\"textarea\",\"size\":\"small\",\"label\":\"Email\",\"hint\":\"Email address of the contact person\",\"id\":\"contact-email{iter}\"},{\"type\":\"textarea\",\"size\":\"small\",\"label\":\"Reporting Method\",\"hint\":\"Method of reporting such as online/email/phone/fax, etc.\",\"id\":\"reporting-method{iter}\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Role\",\"hint\":\"When to report for e.g. report local outbreak and infection trends, national reporting of infection control and outbreaks, global disease surveillance, response coordination, state-level outbreak and epidemic reporting\",\"id\":\"role{iter}\"}]]";
        // configjson: string = "[{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Prepared by\",\"hint\":\"Mention the names of people who participated in preparing this document\",\"id\":\"preparedby\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Approved by\",\"hint\":\"Mention the names of people who participated in reviewing this document\",\"id\":\"approvedby\"},{\"type\":\"section\",\"name\":\"Program Structure\"},{\"type\":\"subsection\",\"name\":\"Infection Control Committee\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Responsibilities\",\"hint\":\"Briefly outline the responsibilities of the infection control committee\",\"id\":\"iccresponsibilities\"},[{\"type\":\"committeemember\",\"name\":\"Committee Member\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Role\",\"hint\":\"Infection Control Officer (ICO), Infection Control Nurses (ICN), Microbiologist, Nursing heads, Representatives from key departments (Surgery, Medicine, Housekeeping, CSSD, etc.)\",\"id\":\"iccstructurerole{iter}\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Responsibilities\",\"hint\":\"Oversee all infection control activities, review infection surveillance data and action plans, ensure compliance, etc.\",\"id\":\"iccstructureresponsibilities{iter}\"}],{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Meetings\",\"hint\":\"Meeting frequency, minimum quorum requirements, agenda\",\"id\":\"iccmeetings\"},{\"type\":\"subsection\",\"name\":\"Infection Control Team\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Responsibilities\",\"hint\":\"Briefly outline the responsibilities of the infection control team\",\"id\":\"ictresponsibilities\"},[{\"type\":\"teammember\",\"name\":\"Team Member\",\"direction\":\"row\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Role\",\"hint\":\"Infection Control Officer (ICO), Infection Control Nurses (ICN), Microbiologist, Admin Rep., Housekeeping Rep., CSSD Rep., Pharmacist, Engineering Rep., IT Rep.\",\"id\":\"ictstructurerole{iter}\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Responsibilities\",\"hint\":\"Day-to-day monitoring of infection control practices, ensure compliance with guidelines for high-risk areas (e.g., ICUs, OTs), coordinate with the ICC for feedback and updates, etc.\",\"id\":\"ictstructureresponsibilities{iter}\"}],{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Meetings\",\"hint\":\"Meeting frequency, minimum quorum requirements, agenda\",\"id\":\"ictmeetings\"},{\"type\":\"section\",\"name\":\"Aims & Objectives\"},{\"type\":\"subsection\",\"name\":\"Aims\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Aims\",\"hint\":\"Briefly outline the aims of the infection control programme\",\"id\":\"aims\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Objectives\",\"hint\":\"Precisely define the objectives including quantified targets wherever possible. For e.g. target to reduce HAIs by 20% annually, achieve 95% compliance with hand hygiene protocols across all departments.\",\"id\":\"aims\"},{\"type\":\"section\",\"name\":\"Infection Control Processes\"},{\"type\":\"subsection\",\"name\":\"Hand Hygiene\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Hand Hygiene Policies\",\"hint\":\"Summarize and reference the policies that are defined for hand hygiene\",\"id\":\"hhpolicies\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Hand Hygiene SOPs\",\"hint\":\"Summarize and reference the SOPs that are developed, maintained and released for hand hygiene\",\"id\":\"hhsops\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Hand Hygiene Monitoring\",\"hint\":\"Outline data parameters, methods and quality indicators for monitoring hand hygiene\",\"id\":\"hhmonitoring\"},{\"type\":\"subsection\",\"name\":\"Personal Protective Equipment (PPE)\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"PPE Usage Policies\",\"hint\":\"Summarize and reference the policies that are defined for the indications and usage of PPE for transmission-based precautions\",\"id\":\"ppepolicies\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"PPE Usage SOPs\",\"hint\":\"Summarize and reference the SOPs that are developed, maintained and released for the appropriate usage of PPE in various situations\",\"id\":\"ppesops\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"PPE Usage Monitoring\",\"hint\":\"Outline data parameters, methods and quality indicators for monitoring the usage of PPE\",\"id\":\"ppemonitoring\"},{\"type\":\"subsection\",\"name\":\"Housekeeping\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Cleaning Protocols\",\"hint\":\"Summarize the cleaning protocols for various areas such as OTs, wards, public areas including toilets, corridors including environment, fixtures, fomites, furniture, furnishings, equipments, etc. Protocols should be appropriately designed for high-touch and low-touch areas.\",\"id\":\"hkcleaning\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Dilution Protocols\",\"hint\":\"Summarize the cleaning protocols for approved disinfectants for cleaning in various areas such as OTs, wards, public areas including toilets, corridors including environment, fixtures, fomites, furniture, furnishings, equipments, etc. Protocols should be appropriately designed for high-touch and low-touch areas.\",\"id\":\"hkdilution\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Housekeeping Monitoring\",\"hint\":\"Outline data parameters, methods and quality indicators for monitoring the housekeeping activities in various areas such as OTs, wards, public areas including toilets, corridors including environment, fixtures, fomites, furniture, furnishings, equipments, etc. Include regular checks for surface cleanliness, air quality, water quality, etc.\",\"id\":\"hkmonitoring\"},{\"type\":\"subsection\",\"name\":\"CSSD\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"CSSD Design\",\"hint\":\"Summarise the CSSD design requirements including space requirements, location requirements, layouting and unidirectional flow zoning requirements, separate areas for receiving, washing, cleaning, packing, sterilization, sterile storage & issue and the separation of clean and dirty areas\",\"id\":\"cssddesign\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"CSSD Procedures\",\"hint\":\"Summarise and reference the procedures for cleaning, packing, disinfection and sterilization. Also include the use of flash sterilization and the usage of Spaulding's classification\",\"id\":\"cssdprocedures\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"CSSD Validation Tests\",\"hint\":\"Summarise and reference the usage, frequency and methodologies of validation tests including physical, chemical, biological and engineering tests for sterilization effectiveness\",\"id\":\"cssdvalidation\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Reuse and recall\",\"hint\":\"Summarise the indications, guidelines and procedures for instrument reuse including the policy of patient intimation. Also include the summary of recall procedures post breakdown for non-functional equipments/devices.\",\"id\":\"cssdreuserecall\"},{\"type\":\"subsection\",\"name\":\"Biomedical Waste Management\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Segregation & Transfer Procedures\",\"hint\":\"Summarise and reference the procedures for segregation, collection, storage, handling and the use of color codings. Also include the procedure for handover and transfer of biomedical waste to the approved vendor for disposal.\",\"id\":\"bmwsegregation\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Statutory Provisions\",\"hint\":\"Summarize the statutory provisions of biomedical waste management that are applicable to your hospital\",\"id\":\"bmwstatutory\"},{\"type\":\"subsection\",\"name\":\"Staff Infections Prevention\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Statutory Requirements\",\"hint\":\"Summarize the statutory requirements for staff immunization including the hospital policies.\",\"id\":\"staffstatutory\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Staff Infections Reporting\",\"hint\":\"Identify transmissible infections important for staff to report (such as acute conjunctivitis, chickenpox, acute respiratory infections, smear-positive tuberculosis, etc.) and summarize the reporting procedure.\",\"id\":\"staffinfectionreporting\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Work Restrictions\",\"hint\":\"Summarize the guidelines for work restrictions (limiting roles & responsibilities) for infected staff\",\"id\":\"staffworkrestrictions\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Prophylaxis\",\"hint\":\"Summarize the indications and procedures for giving pre and post exposure prophylaxis to staff\",\"id\":\"staffprophylaxis\"},{\"type\":\"subsection\",\"name\":\"Safe Injection & Infusion Practices\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Medication Practices\",\"hint\":\"Summarize the policies and procedures for safe medication practices including single-dose vials, multi-dose vials\",\"id\":\"safeimedication\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Injection Practices\",\"hint\":\"Summarize the policies and procedures for safe injection practices including preparation, labeling and administration practices\",\"id\":\"safeiinjection\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Sharps Injury Prevention\",\"hint\":\"Summarize the policies and procedures for sharps injury prevention\",\"id\":\"safeiinjuryprevention\"},{\"type\":\"subsection\",\"name\":\"Antimicrobial Stewardship\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Clinical Conditions Identification\",\"hint\":\"Summarize the identified clinical conditions for using antimicrobials including antifungals, antibiotics, antivirals and antiparasites from the pov of antimicrobial agent, monotherapy vs combination therapy, escalaction & de-escalation of therapy and dose & duration of therapy\",\"id\":\"amsclinicalconditions\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Susceptibility Monitoring\",\"hint\":\"Summarize the identified system of monitoring antimicrobial susceptibility\",\"id\":\"amssusceptibility\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Antimicrobial Usage Policy\",\"hint\":\"Summarize the animicrobial usage policy including the frequency of reviewing this policy\",\"id\":\"amsusagepolicy\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Antimicrobial Stewardship Committee\",\"hint\":\"Outline the structure, roles and responsibilities of the antimicrobial stewardship committee structure\",\"id\":\"amsstewardshipcommittee\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Antimicrobial Workflows\",\"hint\":\"Summarize the procedures for antimicrobial workflows such ordering, prescriptions and usages\",\"id\":\"amsworkflows\"},{\"type\":\"subsection\",\"name\":\"Renovation & New Construction\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Risk Assessment\",\"hint\":\"Summarize the risk assessment methodology and the tool for conducting risk assessment of infection control during renovation & new construction\",\"id\":\"rncriskassessment\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Inclusion From Design\",\"hint\":\"Summarize the policy of including infection control and the involvement of infection control team since the design stages of any renovation & new construction project\",\"id\":\"rncriskassessment\"},{\"type\":\"subsection\",\"name\":\"Healthcare Associated Infections\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Care Bundles\",\"hint\":\"Summarize the care bundles developed for prevent CAUTIs, VAPs, SSI, CLABSIs\",\"id\":\"haicarebundles\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Monitoring\",\"hint\":\"Summarize the monitoring frequencies and methdologies for HAIs\",\"id\":\"haimonitoring\"},{\"type\":\"subsection\",\"name\":\"Dietary Services & Kitchen\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Statutory Requirements\",\"hint\":\"Summarize the statutory requirements for kitchen & dietary services\",\"id\":\"dskstatutory\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Design Requirements\",\"hint\":\"Summarize the design requirements of kitchen & dietary services including layout, traffic-flow, prevention of criss-cross traffic, sequence of activities. Also include separate dedicated food preparation areas\",\"id\":\"dskriskassessment\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Workers Screening\",\"hint\":\"Summarize the policies & procedures for screening kitchen workers and food handlers\",\"id\":\"dskscreening\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Hygienic Preparation, Storage & Distribution of Food\",\"hint\":\"Summarize the policies & procedures for hygiene measures such as storage of food off the floor, separation in storage of cleaning supplies and food, separate dedicated food preparation areas, identification of measures to prevent flies & insects to come in contact with prepared/stored food. Also include safe preparation, handling, storage & distribution procedures encompassing the temperatures for food distribution as well\",\"id\":\"dskhygiene\"},{\"type\":\"subsection\",\"name\":\"Laundry & Linen Management\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Procedures\",\"hint\":\"Summarize the policies & procedures for linen change, handling (patient-care, transport to laundry, inside laundry), storage of clean linen, separation of clean & dirty linen, distribution of clean linen. Also include controls to ensure infection prevention & control when laundry management is outsourced\",\"id\":\"llmprocedures\"},{\"type\":\"section\",\"name\":\"Surveillance\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Infection Surveillance\",\"hint\":\"Include surveillance of hospital-acquired infections (VAP, CLABSI, CAUTI, SSIs), define frequency and methodology for collecting infection data from different units (ICU, OT, general wards), surveillance tools and weekly and monthly review of infection trends and risk factors.\",\"id\":\"surveillanceinfections\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Antimicrobial Surveillance\",\"hint\":\"Include regular audits of antimicrobial prescriptions and usage, surveillance of resistance patterns in the hospital, frequency of reports to the Antimicrobial Stewardship Committee.\",\"id\":\"surveillanceantimicrobial\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Environmental Surveillance\",\"hint\":\"Include surface sampling such as regular swabs and testing of high-touch surfaces (ICUs, OT, isolation rooms), air quality monitoring of air handling units and conducting air sampling in critical care areas, water quality testing of RO water in dialysis units for endotoxin levels.\",\"id\":\"surveillanceenvironment\"},{\"type\":\"section\",\"name\":\"Inventory Management\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Inventory Policies\",\"hint\":\"Summarize and reference the policies that define the expected stock levels of various equipments, devices & materials used in the infection control program for hand hygiene, PPE, biomedical waste management, CSSD, pre & post exposure prophylaxis, safe injection & infusions, isolation & barrier nursing, housekeeping, etc.\",\"id\":\"inventorypolicy\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Availability Policies\",\"hint\":\"Summarize and reference the policies that define the distribution and expected availability levels across different hospital zones for various equipments, devices & materials used in the infection control program for hand hygiene, PPE, biomedical waste management, CSSD, pre & post exposure prophylaxis, safe injection & infusions, isolation & barrier nursing, housekeeping, etc.\",\"id\":\"availabilitypolicy\"},{\"type\":\"section\",\"name\":\"Trainings\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Training Policies\",\"hint\":\"Summarize and reference the staff training policies for standard precautions, hand hygiene, PPE usage, antimicrobial stewardship, safe injection & infusion practices, housekeeping, laundry & linen management, biomedical waste management, care bundles for HAI preventions, CSSD operations, reuse and recalls, etc.\",\"id\":\"trainingpolicy\"},{\"type\":\"section\",\"name\":\"Audits\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Audit Policies\",\"hint\":\"Summarize and reference the audit policies for standard precautions, hand hygiene, PPE usage, antimicrobial stewardship, safe injection & infusion practices, housekeeping, laundry & linen management, biomedical waste management, care bundles for HAI preventions, CSSD operations, reuse and recalls, etc. Include the methodology, frequency, etc.\",\"id\":\"auditpolicy\"},{\"type\":\"section\",\"name\":\"Quality\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Quality Policies\",\"hint\":\"Summarize and reference the quality policies for material, equipments and devices used in the infection control program, including the expected standards and benchmarks. For PPE, hand hygiene, isolation & barrier nursing, safe injection & infusion, air-conditioning, water supply, housekeeping, biomedical waste, linen management, kitchen & dietary services, CSSD, etc.\",\"id\":\"qualitypolicy\"},{\"type\":\"section\",\"name\":\"Vendor Selection\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Vendor Selection Policies\",\"hint\":\"Summarize and reference the vendor selection policies for material, equipments and devices used in the infection control program, including the qualification criteria, delivery schedules and agreement clauses. For PPE, hand hygiene, isolation & barrier nursing, safe injection & infusion, air-conditioning, water supply, housekeeping, biomedical waste management, linen management, kitchen & dietary services, CSSD, etc.\",\"id\":\"vendorselectionpolicy\"},{\"type\":\"section\",\"name\":\"Maintenance\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Maintenance Policies\",\"hint\":\"Summarize and reference the maintenance policies for equipments and facilities used in the infection control program, including the routine, contractual and breakdown maintenance activities. For PPE, hand hygiene, isolation & barrier nursing, safe injection & infusion, air-conditioning, water supply, housekeeping, biomedical waste, linen management, kitchen & dietary services, CSSD, etc.\",\"id\":\"maintenancepolicy\"}]";
        // configjson: string = "[{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Prepared by\",\"hint\":\"Mention the names of people who participated in preparing this document\",\"id\":\"preparedby\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Approved by\",\"hint\":\"Mention the names of people who participated in reviewing this document\",\"id\":\"approvedby\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Purpose\",\"hint\":\"This is a checklist for reporting the statutory internal audit results of the infection control program\",\"id\":\"purpose\"},{\"type\":\"section\",\"name\":\"Compliance with Biomedical Waste Management Rules, 2016\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Is the hospital registered with the State Pollution Control Board (SPCB) for biomedical waste management?\",\"hint\":\"\",\"id\":\"bmwspcb\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are biomedical waste segregation protocols (color-coded bins) in place and followed as per rules?\",\"hint\":\"\",\"id\":\"bmwcolorcoding\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are disposal records for biomedical waste maintained as required by law?\",\"hint\":\"\",\"id\":\"bmwdisposal\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Is there a valid agreement with an authorized biomedical waste disposal vendor?\",\"hint\":\"\",\"id\":\"bmwvendoragreement\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are healthcare staff trained in biomedical waste segregation and disposal protocols?\",\"hint\":\"\",\"id\":\"bmwtraining\"},{\"type\":\"section\",\"name\":\"Compliance with The Drugs and Cosmetics Act, 1940 (Infection Control Equipment and Materials)\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are hand hygiene products (e.g., alcohol-based hand rubs) procured from licensed vendors as per statutory regulations?\",\"hint\":\"\",\"id\":\"hhvendors\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are disinfectants, sterilants, and antiseptics used in the hospital in compliance with the Drugs and Cosmetics Act?\",\"hint\":\"\",\"id\":\"disinfectantsdca\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Is there a regular check on the expiration dates and quality standards of infection control materials?\",\"hint\":\"\",\"id\":\"expirycheck\"},{\"type\":\"section\",\"name\":\"Compliance with The Indian Epidemic Diseases Act, 1897 (Outbreak Management)\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Is there a policy in place for managing infectious disease outbreaks in compliance with the Indian Epidemic Diseases Act?\",\"hint\":\"\",\"id\":\"outbreakpolicy\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are protocols in place for isolation, patient segregation, and reporting of notifiable diseases as per government directives?\",\"hint\":\"\",\"id\":\"diseasereporting\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are outbreak reports documented and communicated to relevant authorities (local health departments, as per law)?\",\"hint\":\"\",\"id\":\"outbreakreporting\"},{\"type\":\"section\",\"name\":\"Compliance with The Water (Prevention and Control of Pollution) Act, 1974 (Water Quality Monitoring)\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Is the hospital water supply tested regularly for microbiological contaminants?\",\"hint\":\"\",\"id\":\"watertesting\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are there documented records of water quality reports, and are they in compliance with prescribed standards?\",\"hint\":\"\",\"id\":\"waterqualityreporting\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Is there an arrangement for safe water storage and waste-water disposal in line with statutory requirements?\",\"hint\":\"\",\"id\":\"waterstorage\"},{\"type\":\"section\",\"name\":\"Compliance with The Air (Prevention and Control of Pollution) Act, 1981 (Air Quality Management)\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are air conditioning and ventilation systems in place that comply with regulatory standards, especially in critical areas like OTs and ICUs?\",\"hint\":\"\",\"id\":\"acinplace\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are air filters in the hospital HVAC systems cleaned or replaced as per environmental laws and infection control guidelines?\",\"hint\":\"\",\"id\":\"airfilters\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are regular air quality audits conducted, and are reports maintained?\",\"hint\":\"\",\"id\":\"airqualityaudits\"},{\"type\":\"section\",\"name\":\"Compliance with The Public Health Act (Surveillance and Reporting)\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Is there a surveillance system for monitoring hospital-acquired infections (HAIs)?\",\"hint\":\"\",\"id\":\"haisurveillance\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are notifiable infections reported to local health authorities as per the law?\",\"hint\":\"\",\"id\":\"infectionreporting\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are infection surveillance records maintained, and are they in compliance with public health laws?\",\"hint\":\"\",\"id\":\"infectionsurveillance\"},{\"type\":\"section\",\"name\":\"Compliance with The Occupational Safety and Health Act (Workplace Safety)\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are healthcare workers provided with adequate personal protective equipment (PPE) in line with statutory safety regulations?\",\"hint\":\"\",\"id\":\"ppeallocation\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Is there a needle stick and sharps injury prevention policy in place, and is it compliant with the OSHA guidelines?\",\"hint\":\"\",\"id\":\"safeipolicy\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are protocols for staff vaccination (e.g., Hepatitis B, Influenza) and post-exposure prophylaxis (PEP) established?\",\"hint\":\"\",\"id\":\"prophylaxis\"},{\"type\":\"section\",\"name\":\"Compliance with The Clinical Establishments (Registration and Regulation) Act, 2010 (General Infection Control Requirements)\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Is the hospital registered under the Clinical Establishments Act, and does it meet the infection control standards prescribed?\",\"hint\":\"\",\"id\":\"registration\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are infection control protocols updated and audited regularly, as required by the Act?\",\"hint\":\"\",\"id\":\"hicprotocolsupdated\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are records of infection control compliance maintained and available for inspection by regulatory authorities?\",\"hint\":\"\",\"id\":\"compliancerecords\"},{\"type\":\"section\",\"name\":\"Compliance with Fire Safety Regulations (Infection Control During Emergency Evacuations)\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are fire safety protocols in place that ensure infection control measures (e.g., patient isolation) during evacuations?\",\"hint\":\"\",\"id\":\"firesafetyprotocols\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are infection control materials (e.g., masks, gloves) readily available for use during fire drills or actual emergencies?\",\"hint\":\"\",\"id\":\"hicmaterials\"},{\"type\":\"section\",\"name\":\"Compliance with The National Health Mission Guidelines (Sanitation and Hygiene)\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are the hospital’s sanitation practices in compliance with National Health Mission standards for hospital cleanliness and hygiene?\",\"hint\":\"\",\"id\":\"sanitizationpractices\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are there dedicated housekeeping protocols for the cleaning and disinfection of patient care areas as per government guidelines?\",\"hint\":\"\",\"id\":\"housekeepingprotocols\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are sanitation records maintained, and are they available for regulatory review?\",\"hint\":\"\",\"id\":\"sanitiziationrecords\"},{\"type\":\"section\",\"name\":\"Compliance with The Indian Council of Medical Research (ICMR) Guidelines (Antibiotic Stewardship)\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Is the hospital following ICMR guidelines for antibiotic stewardship to prevent the development of antimicrobial resistance (AMR)?\",\"hint\":\"\",\"id\":\"icmramsguidelines\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are antibiotic use patterns monitored, and are they compliant with ICMR’s antimicrobial stewardship guidelines?\",\"hint\":\"\",\"id\":\"patternsmonitoring\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are periodic audits conducted to assess adherence to guidelines, and are the audit reports documented?\",\"hint\":\"\",\"id\":\"amsaudits\"},{\"type\":\"section\",\"name\":\"Compliance with The Indian Medical Council (Professional Conduct, Etiquette, and Ethics) Regulations, 2002\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are healthcare workers adhering to professional conduct and ethical guidelines for infection prevention as prescribed by the Medical Council of India?\",\"hint\":\"\",\"id\":\"professionalconduct\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are there protocols in place to report unethical or unsafe infection control practices?\",\"hint\":\"\",\"id\":\"unethicalreporting\"},{\"type\":\"section\",\"name\":\"Compliance with Employee State Insurance (ESI) Act, 1948 (Healthcare Worker Safety)\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are healthcare workers insured under the ESI scheme, particularly those involved in high-risk infection control activities?\",\"hint\":\"\",\"id\":\"esiinsured\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are there protocols for compensation in case of occupational hazards (e.g., infections contracted at work)?\",\"hint\":\"\",\"id\":\"compensationprotocols\"}]";
        this.getConfigJson = () => {
            console.log('configjson', this.configjson);
            return JSON.parse(this.configjson);
        };
        this.prepopulateValJson = "[]";
        // prepopulateValJson: string = "{\"preparedby\":\"prepared by test\",\"approvedby\":\"approved by test\",\"iccresponsibilities\":\"committee resp\",\"Committee Member\":[{\"iccstructurerole-0\":\"role 1\",\"iccstructureresponsibilities-0\":\"resp 1\"},{\"iccstructurerole-1\":\"role 2\",\"iccstructureresponsibilities-1\":\"resp 2\"}],\"iccmeetings\":\"meet committee\",\"ictresponsibilities\":\"team resp\",\"Team Member\":[{\"ictstructurerole-0\":\"role team 1\",\"ictstructureresponsibilities-0\":\"resp team 1\"},{\"ictstructurerole-1\":\"role team 2\",\"ictstructureresponsibilities-1\":\"resp team 2\"}],\"ictmeetings\":\"meet team\",\"aims\":\"obj test\",\"hhpolicies\":\"proc hand hyg\",\"hhsops\":\"hand hyg sop\",\"hhmonitoring\":\"hand hyg monit\",\"ppepolicies\":\"ppe usage\",\"ppesops\":\"ppe usage sop\",\"ppemonitoring\":\"ppe usage monit\",\"hkcleaning\":\"housekeep test\",\"hkdilution\":\"dilution \",\"hkmonitoring\":\"housekeep monit\",\"cssddesign\":\"ccsd desg\",\"cssdprocedures\":\"\",\"cssdvalidation\":\"ccsd valid test\",\"cssdreuserecall\":\"reuse recall\",\"bmwsegregation\":\"bio waste mgmt\",\"bmwstatutory\":\"satutory prov\",\"staffstatutory\":\"staff inf prev\",\"staffinfectionreporting\":\"staff inf report\",\"staffworkrestrictions\":\"work restrict\",\"staffprophylaxis\":\"prophyl\",\"safeimedication\":\"\",\"safeiinjection\":\"\",\"safeiinjuryprevention\":\"\",\"amsclinicalconditions\":\"\",\"amssusceptibility\":\"\",\"amsusagepolicy\":\"\",\"amsstewardshipcommittee\":\"\",\"amsworkflows\":\"\",\"rncriskassessment\":\"\",\"haicarebundles\":\"\",\"haimonitoring\":\"\",\"dskstatutory\":\"\",\"dskriskassessment\":\"\",\"dskscreening\":\"\",\"dskhygiene\":\"\",\"llmprocedures\":\"\",\"surveillanceinfections\":\"\",\"surveillanceantimicrobial\":\"\",\"surveillanceenvironment\":\"\",\"inventorypolicy\":\"\",\"availabilitypolicy\":\"\",\"trainingpolicy\":\"\",\"auditpolicy\":\"\",\"qualitypolicy\":\"\",\"vendorselectionpolicy\":\"\",\"maintenancepolicy\":\"\"}";
        this.getPrepopulateJson = () => {
            return JSON.parse(this.prepopulateValJson);
        };
        this.mode = "";
        this.flow = "";
        this.name = "Reporting";
        this.ignoreprojections = "[]";
        this.editdisable = "";
        this.getIgnoreProjections = () => {
            return JSON.parse(this.ignoreprojections);
        };
        this.usermap = "[]";
        this.getUserMap = () => {
            return JSON.parse(this.usermap);
        };
        this.formviewclass = "flex-col";
        this.dataModel = [];
        this.list = [];
        this.published = false;
        this.lastCalendarGenerated = "";
        this.nextCalendarScheduled = "";
        // selectedItem: any = {};
        this.selectedItem = { id: "be121a6c-73e2-49f8-b1c9-bdf45a72da6d" };
        this.selectedItemIds = [];
        this.decryptProjectId = "";
        this.decryptFileName = "";
        this.truncate = (str, n, useWordBoundary) => {
            if (str.length <= n) {
                return str;
            }
            const subString = str.slice(0, n - 1); // the original check
            return (useWordBoundary
                ? subString.slice(0, subString.lastIndexOf(" "))
                : subString) + "&hellip;";
        };
        this.selectedValues = () => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            let valueObj = {};
            for (let element of this.dataModel) {
                if (isAddButtonObject(element)) {
                    let sectionObj = [];
                    for (let subrecord of element.children) {
                        let subrecordObj = {};
                        for (let subElement of subrecord) {
                            if (subElement.id !== "") {
                                if (subElement.type == "sf-i-form") {
                                    let form = this._SfReportingContainer.querySelector('#' + subElement.id);
                                    if (subElement.savenameseparate == "yes") {
                                        subrecordObj[subElement.id + 'id'] = (_a = form.selectedValues()[0]) !== null && _a !== void 0 ? _a : "";
                                        subrecordObj[subElement.id + 'name'] = (_b = form.selectedTexts()[0]) !== null && _b !== void 0 ? _b : "";
                                    }
                                    else if (((_c = parseInt(subElement.maxselect)) !== null && _c !== void 0 ? _c : 0) > 0) {
                                        let tempArr = [];
                                        for (let [i, val] of form.selectedValues().entries()) {
                                            tempArr.push(form.selectedTexts()[i] + ';' + val);
                                        }
                                        subrecordObj[subElement.id] = tempArr;
                                    }
                                    else {
                                        subrecordObj[subElement.id] = form.selectedTexts();
                                    }
                                }
                                else if (subElement.type == "sf-i-bricks") {
                                    let bricks = this._SfReportingContainer.querySelector('#' + subElement.id);
                                    if (subElement.savenameseparate == "yes") {
                                        subrecordObj[subElement.id + 'id'] = (_d = bricks.selectedValues()[0]) !== null && _d !== void 0 ? _d : "";
                                        subrecordObj[subElement.id + 'name'] = (_e = bricks.selectedTexts()[0]) !== null && _e !== void 0 ? _e : "";
                                    }
                                    else {
                                        subrecordObj[subElement.id] = bricks.selectedValueTexts();
                                    }
                                }
                                else {
                                    subrecordObj[subElement.id] = subElement.value;
                                }
                            }
                        }
                        sectionObj.push(subrecordObj);
                    }
                    valueObj[element.label] = sectionObj;
                }
                else {
                    if (element.id != "" && element.type != "section") {
                        if (element.type == "sf-i-form") {
                            let form = this._SfReportingContainer.querySelector('#' + element.id);
                            if (element.savenameseparate == "yes") {
                                valueObj[element.id + 'id'] = (_f = form.selectedValues()[0]) !== null && _f !== void 0 ? _f : "";
                                valueObj[element.id + 'name'] = (_g = form.selectedTexts()[0]) !== null && _g !== void 0 ? _g : "";
                            }
                            else if (((_h = parseInt(element.maxselect)) !== null && _h !== void 0 ? _h : 0) > 0) {
                                let tempArr = [];
                                for (let [i, val] of form.selectedValues().entries()) {
                                    tempArr.push(form.selectedTexts()[i] + ';' + val);
                                }
                                valueObj[element.id] = tempArr;
                            }
                            else {
                                valueObj[element.id] = form.selectedTexts();
                            }
                            console.log('selected values form', form.selectedValues(), form.selectedTexts());
                        }
                        else if (element.type == "sf-i-bricks") {
                            let bricks = this._SfReportingContainer.querySelector('#' + element.id);
                            if (element.savenameseparate == "yes") {
                                valueObj[element.id + 'id'] = (_j = bricks.selectedValues()[0]) !== null && _j !== void 0 ? _j : "";
                                valueObj[element.id + 'name'] = (_k = bricks.selectedTexts()[0]) !== null && _k !== void 0 ? _k : "";
                            }
                            else {
                                valueObj[element.id] = bricks.selectedValueTexts();
                            }
                        }
                        else {
                            valueObj[element.id] = element.value;
                        }
                    }
                }
            }
            return valueObj;
        };
        this.submitClick = () => {
            this._SfReportingButtonSubmit.style.display = 'none';
            this._SfReportingButtonSubmitCancel.style.display = 'flex';
            this._SfReportingButtonSubmitConfirm.style.display = 'flex';
        };
        this.submitCancelClick = () => {
            this._SfReportingButtonSubmit.style.display = 'flex';
            this._SfReportingButtonSubmitCancel.style.display = 'none';
            this._SfReportingButtonSubmitConfirm.style.display = 'none';
        };
        this.submitConfirmClick = () => {
            console.log('submit confired', this.selectedValues());
            if (this.flow == "new") {
                this.submitNew();
            }
            else {
                this.submitEdit();
            }
        };
        this.editClick = () => {
            this.flow = "edit";
            this.loadMode();
        };
        this.editCancelClick = () => {
            this.flow = "details";
            this.loadMode();
        };
        this.publishClick = () => {
            this.published = !this.published;
            this.submitEdit();
        };
        this.newClick = () => {
            console.log('new clicked');
            this.flow = "new";
            this.loadMode();
        };
        this.backClick = () => {
            console.log('back clicked');
            this.flow = "list";
            this.loadMode();
        };
        this.deleteClick = () => {
            this._SfReportingButtonDelete.style.display = 'none';
            this._SfReportingButtonDeleteCancel.style.display = 'flex';
            this._SfReportingButtonDeleteConfirm.style.display = 'flex';
        };
        this.deleteCancelClick = () => {
            this._SfReportingButtonDelete.style.display = 'flex';
            this._SfReportingButtonDeleteCancel.style.display = 'none';
            this._SfReportingButtonDeleteConfirm.style.display = 'none';
        };
        this.deleteConfirmClick = () => {
            this.submitDelete();
        };
        this.getBricksValues = (element, selectedValues = []) => {
            let names = [];
            let ids = [];
            if (element.id == "country") {
                for (let country of Object.keys(this.getUserMap())) {
                    if (country == "roles") {
                        continue;
                    }
                    if (names.indexOf(country.split(';')[0]) < 0) {
                        names.push(country.split(';')[0]);
                        ids.push(country.split(';')[1]);
                    }
                }
            }
            else if (element.id == "entity") {
                for (let country of Object.keys(this.getUserMap())) {
                    if (country == "roles") {
                        continue;
                    }
                    if (selectedValues.length > 0 && country == selectedValues[0]) {
                        for (let entity of Object.keys(this.getUserMap()[country])) {
                            console.log('bricks entity', entity, selectedValues);
                            if (names.indexOf(entity.split(';')[0]) < 0) {
                                names.push(entity.split(';')[0]);
                                ids.push(entity.split(';')[1]);
                            }
                        }
                    }
                }
            }
            else if (element.id == "locations") {
                for (let country of Object.keys(this.getUserMap())) {
                    if (country == "roles") {
                        continue;
                    }
                    if (selectedValues.length > 0 && country == selectedValues[0]) {
                        for (let entity of Object.keys(this.getUserMap()[country])) {
                            if (selectedValues.length > 1 && entity == selectedValues[1]) {
                                for (let location of Object.keys(this.getUserMap()[country][entity])) {
                                    console.log('bricks location', location, selectedValues);
                                    if (names.indexOf(location.split(';')[0]) < 0) {
                                        names.push(location.split(';')[0]);
                                        ids.push(location.split(';')[1]);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else if (element.id == "tags") {
                for (let country of Object.keys(this.getUserMap())) {
                    if (country == "roles") {
                        continue;
                    }
                    if (selectedValues.length > 0 && country == selectedValues[0]) {
                        for (let entity of Object.keys(this.getUserMap()[country])) {
                            if (selectedValues.length > 1 && entity == selectedValues[1]) {
                                for (let location of Object.keys(this.getUserMap()[country][entity])) {
                                    if (selectedValues.length > 2 && selectedValues[2].indexOf(location) >= 0) {
                                        for (let tag of this.getUserMap()[country][entity][location]['tags']) {
                                            console.log('bricks tag', tag, selectedValues);
                                            if (tag.indexOf(element.searchstring) >= 0) {
                                                if (names.indexOf(tag.split(';')[0]) < 0) {
                                                    names.push(tag.split(';')[0]);
                                                    ids.push(tag.split(';')[1]);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return [names, ids];
        };
        this.initListeners = () => {
            var _a, _b, _c, _d, _e, _f;
            (_a = this._SfReportingButtonSubmit) === null || _a === void 0 ? void 0 : _a.removeEventListener('click', this.submitClick);
            (_b = this._SfReportingButtonSubmit) === null || _b === void 0 ? void 0 : _b.addEventListener('click', this.submitClick);
            (_c = this._SfReportingButtonSubmitConfirm) === null || _c === void 0 ? void 0 : _c.removeEventListener('click', this.submitConfirmClick);
            (_d = this._SfReportingButtonSubmitConfirm) === null || _d === void 0 ? void 0 : _d.addEventListener('click', this.submitConfirmClick);
            (_e = this._SfReportingButtonSubmitCancel) === null || _e === void 0 ? void 0 : _e.removeEventListener('click', this.submitCancelClick);
            (_f = this._SfReportingButtonSubmitCancel) === null || _f === void 0 ? void 0 : _f.addEventListener('click', this.submitCancelClick);
            // (this._SfReportingButtonEdit as HTMLButtonElement)?.removeEventListener('click', this.editClick);
            // (this._SfReportingButtonEdit as HTMLButtonElement)?.addEventListener('click', this.editClick);
            // (this._SfReportingContainer.querySelector('#button-detail-close') as HTMLButtonElement)?.addEventListener('click', () => {
            //   (this._SfReportingContainer as HTMLDivElement).innerHTML = '';
            //   (this._SfReportingContainer as HTMLDivElement).style.display = 'none';
            //   // (this._SfReportingButtonContainer as HTMLDivElement).style.display = 'none';
            // });
        };
        this.initListListeners = () => {
            var _a;
            // (this._SfReportingButtonNew as HTMLButtonElement)?.removeEventListener('click', this.newClick);
            (_a = this._SfReportingButtonNew) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.newClick);
        };
        this.initNewListeners = () => {
            var _a, _b;
            (_a = this._SfReportingButtonBack) === null || _a === void 0 ? void 0 : _a.removeEventListener('click', this.backClick);
            (_b = this._SfReportingButtonBack) === null || _b === void 0 ? void 0 : _b.addEventListener('click', this.backClick);
        };
        this.initDetailsListeners = () => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            if (this.editdisable == "true") {
                this._SfReportingButtonBack.style.display = 'none';
                this._SfReportingButtonEdit.style.display = 'none';
                this._SfReportingButtonDelete.style.display = 'none';
                this._SfReportingButtonDeleteCancel.style.display = 'none';
                this._SfReportingButtonDeleteConfirm.style.display = 'none';
            }
            else {
                (_a = this._SfReportingButtonBack) === null || _a === void 0 ? void 0 : _a.removeEventListener('click', this.backClick);
                (_b = this._SfReportingButtonBack) === null || _b === void 0 ? void 0 : _b.addEventListener('click', this.backClick);
                (_c = this._SfReportingButtonEdit) === null || _c === void 0 ? void 0 : _c.removeEventListener('click', this.editClick);
                (_d = this._SfReportingButtonEdit) === null || _d === void 0 ? void 0 : _d.addEventListener('click', this.editClick);
                (_e = this._SfReportingButtonDelete) === null || _e === void 0 ? void 0 : _e.removeEventListener('click', this.deleteClick);
                (_f = this._SfReportingButtonDelete) === null || _f === void 0 ? void 0 : _f.addEventListener('click', this.deleteClick);
                (_g = this._SfReportingButtonDeleteCancel) === null || _g === void 0 ? void 0 : _g.removeEventListener('click', this.deleteCancelClick);
                (_h = this._SfReportingButtonDeleteCancel) === null || _h === void 0 ? void 0 : _h.addEventListener('click', this.deleteCancelClick);
                (_j = this._SfReportingButtonDeleteConfirm) === null || _j === void 0 ? void 0 : _j.removeEventListener('click', this.deleteConfirmClick);
                (_k = this._SfReportingButtonDeleteConfirm) === null || _k === void 0 ? void 0 : _k.addEventListener('click', this.deleteConfirmClick);
            }
        };
        this.initEditListeners = () => {
            var _a, _b, _c, _d;
            (_a = this._SfReportingButtonBack) === null || _a === void 0 ? void 0 : _a.removeEventListener('click', this.backClick);
            (_b = this._SfReportingButtonBack) === null || _b === void 0 ? void 0 : _b.addEventListener('click', this.backClick);
            (_c = this._SfReportingButtonEditCancel) === null || _c === void 0 ? void 0 : _c.removeEventListener('click', this.editCancelClick);
            (_d = this._SfReportingButtonEditCancel) === null || _d === void 0 ? void 0 : _d.addEventListener('click', this.editCancelClick);
        };
        this.populateDataModel = () => {
            let sectionCount = 0;
            this.dataModel = [];
            console.log('getconfigjson', this.getConfigJson());
            for (let element of this.getConfigJson()) {
                if (Array.isArray(element)) {
                    let addElement = element[0];
                    let schemaElement = element.splice(1, element.length - 1);
                    let addObject = createAddButtonObject({ id: addElement.type, label: addElement.name, schema: JSON.stringify(schemaElement), direction: addElement.direction });
                    this.dataModel.push(addObject);
                }
                else {
                    if (element.type == "section") {
                        let dataObj = createDataObject({ id: 'section-' + sectionCount, name: element.name, type: element.type });
                        this.dataModel.push(dataObj);
                        sectionCount++;
                    }
                    else {
                        let dataObj = createDataObject(element);
                        this.dataModel.push(dataObj);
                    }
                }
            }
            console.log('dataModel', this.dataModel);
        };
        this.populateView = (scrollTopTarget = 0) => {
            console.log('populating view');
            let html = "";
            // html += `<div class="d-flex justify-between m-20">
            //           <button part="button-icon" class="material-icons invisible">close</button>
            //           <h3 part="results-title" class="m-0">${this.name}</h3>
            //           <button id="button-detail-close" part="button-icon" class="material-icons">close</button>
            //         </div>`
            html += `<div class="d-flex flex-col md-20-ml-10" part="title-section">
              <div class="d-flex w-100-m-0 justify-between align-center">
                <button id="button-back" part="button-icon" class="button-icon-click"><span class="material-icons">keyboard_backspace</span></button>
                <h3 part="results-title" class="m-0">${this.name}</h3>
                <div class="d-flex justify-center align-center">${this.flow == "new" ? `
                    <button class="mrl-5 material-icons invisible" part="button-icon" id="button-submit" disabled>save</button>
                    <button class="mrl-5 material-icons hide" part="button-icon-light" id="button-submit-cancel">close</button>
                    <button class="mrl-5 material-icons hide" part="button-icon" id="button-submit-confirm">check save</button>
                  ` : (this.flow == "details" ? `
                    <span class="mrl-5 material-icons" part="span-icon${this.published ? '-light' : ''}" id="span-submit-publish">${this.published ? 'radio_button_checked' : 'radio_button_unchecked'}</span>
                    <button id="button-edit" part="button-icon" class="mrl-5 material-icons button-icon-click">edit</button>
                    <button id="button-delete" part="button-icon" class="mrl-5 material-icons button-icon-click">delete</button>
                    <button id="button-delete-cancel" part="button-icon-light" class="mrl-5 material-icons button-icon-click hide">close</button>
                    <button id="button-delete-confirm" part="button-icon" class="mrl-5 button-icon-click hide"><span class="material-icons">delete</span><span class="material-icons">done</span></button>
              ` : `
                    <button class="mrl-5 material-icons" part="button-icon${this.published ? '-light' : ''}" id="button-submit-publish">${this.published ? 'radio_button_unchecked' : 'radio_button_checked'}</button>
                    <button id="button-edit-cancel" part="button-icon-light" class="mrl-5 material-icons button-icon-click">edit_off</button>
                    <button class="mrl-5 material-icons hide" part="button-icon" id="button-submit" disabled>save</button>
                    <button class="mrl-5 material-icons hide" part="button-icon-light" id="button-submit-cancel">close</button>
                    <button class="mrl-5 material-icons hide" part="button-icon" id="button-submit-confirm">check save</button>
              `)}
                </div>
              </div>
              <div class="progress-bar w-100-m-0 d-flex flex-wrap" part="progress-bar">
                <div class="progress-bar-complete" part="progress-bar-complete"></div>
                <div class="progress-bar-finished" part="progress-bar-finished"></div>
                <div class="progress-bar-incomplete" part="progress-bar-incomplete"></div>
              </div>
            </div>
            <div class="d-flex ${this.formviewclass} form-container align-stretch p-10" part="form-container">`;
            let firstFlag = true;
            for (let element of this.dataModel) {
                if (isAddButtonObject(element)) {
                    let addButtonObject = element;
                    for (let i = 0; i < addButtonObject.children.length; i++) {
                        html += this.renderAddSection(addButtonObject, (i + 1));
                        html += this.renderSectionContainer(addButtonObject);
                        for (let childElement of addButtonObject.children[i]) {
                            html += this.renderElement(childElement);
                        }
                        if (addButtonObject.direction == "row") {
                            html += '</div>';
                        }
                    }
                    if (this.mode != "view") {
                        html += this.renderAddButton(addButtonObject);
                    }
                }
                else {
                    if (element.type == "section") {
                        if (firstFlag) {
                            firstFlag = false;
                        }
                        else {
                            html += '</div></div>';
                        }
                    }
                    html += this.renderElement(element);
                }
            }
            html += "</div></div>";
            if (this.flow == "new") {
                html += `
              <div part="published-container"  class="d-flex flex-col flex-grow">
                
                <div class="d-flex" part=${this.published ? "published-container-published" : "published-container-unpublished"}  id="published-container">
                  <input type="checkbox" id="input-publish-checkbox" class="input-publish-checkbox" part="input-publish-checkbox" ${this.published ? "checked" : ""}>
                  <label id="input-publish-checkbox-label" part="textarea-label">Published</label>
                </div>
              </div>`;
            }
            this._SfReportingContainer.innerHTML = html;
            this._SfReportingContainer.style.display = 'block';
            this.initSectionListeners();
            this.initListeners();
            // (this._SfReportingButtonContainer as HTMLDivElement).style.display = 'flex';
            if (this.mode == "view") {
                //   (this._SfReportingButtonEdit as HTMLButtonElement).style.display = 'flex';
                //   (this._SfReportingButtonSubmit as HTMLButtonElement).style.display = 'none';
                //   (this._SfReportingButtonSubmitConfirm as HTMLButtonElement).style.display = 'none';
                //   (this._SfReportingButtonSubmitCancel as HTMLButtonElement).style.display = 'none';
            }
            else {
                this.initInputListeners();
                if (this.mode == "admin" && this.flow != "details") {
                    // (this._SfReportingButtonEdit as HTMLButtonElement).style.display = 'none';
                    this._SfReportingButtonSubmit.style.display = 'flex';
                    this._SfReportingButtonSubmit.disabled = this.flow == "view";
                    this._SfReportingButtonSubmitConfirm.style.display = 'none';
                    this._SfReportingButtonSubmitCancel.style.display = 'none';
                }
            }
            for (let element of this.dataModel) {
                if (element.type == "sf-i-form") {
                    let form = this._SfReportingContainer.querySelector('#' + element.id);
                    if (this.flow == "details") {
                        form.flow = "read";
                    }
                    if (element.value != '') {
                        form.selectedSearchId = element.value;
                    }
                    // setTimeout(() => {form.loadMode();},1000)
                }
                if (element.type == "sf-i-bricks") {
                    console.log('bricks element value', element.value, element.id);
                    let bricks = this._SfReportingContainer.querySelector('#' + element.id);
                    let selectedDependedValues = [];
                    for (let dependency of element.dependencies) {
                        for (let tempElement of this.dataModel) {
                            if (tempElement.id == dependency) {
                                selectedDependedValues.push(tempElement.value);
                            }
                        }
                    }
                    let values = this.getBricksValues(element, selectedDependedValues);
                    console.log('bricks selecteddependantvalues', selectedDependedValues, element.value, values[1]);
                    bricks.namesjson = JSON.stringify(values[0]);
                    bricks.idsjson = JSON.stringify(values[1]);
                    if (element.value != '') {
                        // let ids = []
                        // for(let val of element.value){
                        //   console.log('bricks spliting values', val, element.id)
                        //   ids.push(val.split(';')[1])
                        // }
                        bricks.prepopulateValJson = JSON.stringify(element.value);
                    }
                    else {
                        bricks.prepopulateValJson = JSON.stringify([]);
                    }
                    console.log('bricks element values', bricks.prepopulateValJson, element.id);
                    if (this.flow == "details") {
                        bricks.flow = "read";
                    }
                    else {
                        bricks.flow = "edit";
                    }
                    // setTimeout(() => {bricks.loadMode()},500)
                }
            }
            let checkboxPublish = this._SfReportingContainer.querySelector('#input-publish-checkbox');
            checkboxPublish === null || checkboxPublish === void 0 ? void 0 : checkboxPublish.addEventListener('click', (ev) => {
                let target = ev.target;
                this.published = target.checked;
                let publishedContainer = this._SfReportingContainer.querySelector('#published-container');
                publishedContainer.setAttribute('part', this.published ? "published-container-published" : "published-container-unpublished");
                let formContainer = this._SfReportingContainer.querySelector('.form-container');
                formContainer.setAttribute('part', this.published ? "form-container-published" : "form-container");
                console.log('publish checked', this.published);
            });
            let buttonBack = this._SfReportingContainer.querySelector('#button-back');
            buttonBack === null || buttonBack === void 0 ? void 0 : buttonBack.addEventListener('click', this.backClick);
            let buttonSubmit = this._SfReportingContainer.querySelector('#button-submit');
            if (this.flow == "new") {
                buttonSubmit.style.visibility = 'visible';
            }
            buttonSubmit === null || buttonSubmit === void 0 ? void 0 : buttonSubmit.addEventListener('click', this.submitClick);
            let buttonSubmitConfirm = this._SfReportingContainer.querySelector('#button-submit-confirm');
            buttonSubmitConfirm === null || buttonSubmitConfirm === void 0 ? void 0 : buttonSubmitConfirm.addEventListener('click', this.submitConfirmClick);
            let buttonSubmitCancel = this._SfReportingContainer.querySelector('#button-submit-cancel');
            buttonSubmitCancel === null || buttonSubmitCancel === void 0 ? void 0 : buttonSubmitCancel.addEventListener('click', this.submitCancelClick);
            let buttonPublish = this._SfReportingContainer.querySelector('#button-submit-publish');
            buttonPublish === null || buttonPublish === void 0 ? void 0 : buttonPublish.addEventListener('click', () => {
                console.log('publish clicked', this.published);
                this.publishClick();
            });
            let buttonEdit = this._SfReportingContainer.querySelector('#button-edit');
            buttonEdit === null || buttonEdit === void 0 ? void 0 : buttonEdit.addEventListener('click', this.editClick);
            let buttonDelete = this._SfReportingContainer.querySelector('#button-delete');
            buttonDelete === null || buttonDelete === void 0 ? void 0 : buttonDelete.addEventListener('click', this.deleteClick);
            let buttonDeleteCancel = this._SfReportingContainer.querySelector('#button-delete-cancel');
            buttonDeleteCancel === null || buttonDeleteCancel === void 0 ? void 0 : buttonDeleteCancel.addEventListener('click', this.deleteCancelClick);
            let buttonDeleteConfirm = this._SfReportingContainer.querySelector('#button-delete-confirm');
            buttonDeleteConfirm === null || buttonDeleteConfirm === void 0 ? void 0 : buttonDeleteConfirm.addEventListener('click', this.submitCancelClick);
            let buttonEditCancel = this._SfReportingContainer.querySelector('#button-edit-cancel');
            buttonEditCancel === null || buttonEditCancel === void 0 ? void 0 : buttonEditCancel.addEventListener('click', this.editCancelClick);
            setTimeout(() => {
                this.evalShowProgress();
                this._SfReportingContainer.querySelector('.form-container').scrollTo({ top: scrollTopTarget, left: 0 });
            }, 500);
        };
        this.prepopulateValues = () => {
            var _a, _b, _c, _d, _e, _f;
            console.log('prepopulating', this.getPrepopulateJson());
            for (let [i, element] of this.dataModel.entries()) {
                if (isAddButtonObject(element)) {
                    if (this.getPrepopulateJson()[element.label] != null && Array.isArray(this.getPrepopulateJson()[element.label])) {
                        for (let valArr of this.getPrepopulateJson()[element.label]) {
                            let schemaArr = JSON.parse(element.schema);
                            let childElementArr = [];
                            for (let schemaElement of schemaArr) {
                                let childDataObj = createDataObject(schemaElement, this.dataModel[i].children.length);
                                childDataObj.value = valArr[childDataObj.id];
                                childElementArr.push(childDataObj);
                            }
                            this.dataModel[i].children.push(childElementArr);
                        }
                    }
                }
                else {
                    if (element.type == "section") {
                        this.dataModel[i].collapse = "false";
                    }
                    else {
                        if (this.dataModel[i].type == "textarea") {
                            this.dataModel[i].value = (_a = this.getPrepopulateJson()[element.id]) !== null && _a !== void 0 ? _a : "";
                        }
                        else if (element.type == "yesno+textarea") {
                            this.dataModel[i].value = (_b = this.getPrepopulateJson()[element.id]) !== null && _b !== void 0 ? _b : ['', ''];
                        }
                        else if (element.type == "date") {
                            this.dataModel[i].value = (_c = this.getPrepopulateJson()[element.id]) !== null && _c !== void 0 ? _c : '';
                        }
                        else if (element.type == "sf-i-form") {
                            if (element.savenameseparate == "yes") {
                                this.dataModel[i].value = [this.getPrepopulateJson()[element.id + 'id']];
                                // this.dataModel[i].value = (this.getPrepopulateJson()[element.id + 'name'].trim() ?? '')  + ';' + (this.getPrepopulateJson()[element.id + 'id'] ?? '')
                            }
                            else if (((_d = parseInt(element.maxselect)) !== null && _d !== void 0 ? _d : 0) >= 1) {
                                if (this.getPrepopulateJson()[element.id + 'id'] != null) {
                                    this.dataModel[i].value = [(_e = this.getPrepopulateJson()[element.id + 'id']) !== null && _e !== void 0 ? _e : ''];
                                }
                                else {
                                    let tempArr = [];
                                    for (let val of this.getPrepopulateJson()[element.id]) {
                                        tempArr.push((_f = val.split(';')[1]) !== null && _f !== void 0 ? _f : '');
                                    }
                                    this.dataModel[i].value = tempArr;
                                }
                            }
                            console.log('setting form value', this.dataModel[i], this.getPrepopulateJson()[element.id + 'id'], element.mode);
                        }
                        else if (element.type == "sf-i-bricks") {
                            if (element.savenameseparate == "yes") {
                                this.dataModel[i].value = [this.getPrepopulateJson()[element.id + 'name'] + ';' + this.getPrepopulateJson()[element.id + 'id']];
                            }
                            else {
                                this.dataModel[i].value = this.getPrepopulateJson()[element.id];
                            }
                        }
                    }
                }
            }
            if (this.evalTimeout != null) {
                clearTimeout(this.evalTimeout);
            }
            this.evalTimeout = setTimeout(() => {
                this.evalShowProgress();
            }, 2000);
            this.populateView();
        };
        this.evalShowProgress = () => {
            let total = 0;
            let filled = 0;
            let sectionChildCount = 0;
            let sectionChildFilledCount = 0;
            let sectionId = "";
            let flagEval = true;
            for (let element of this.dataModel) {
                if (isAddButtonObject(element)) {
                    for (let childElementsArr of element.children) {
                        for (let childElement of childElementsArr) {
                            total++;
                            if (childElement.value != "" && childElement.value.length > 0) {
                                filled++;
                            }
                            if (childElement.mandatory != null && flagEval) {
                                if (childElement.value == "" || childElement.value.length < 1) {
                                    flagEval = false;
                                }
                            }
                        }
                    }
                }
                else {
                    if (element.type == "section") {
                        if (sectionChildCount != 0 && sectionId !== "") {
                            if (sectionChildCount == sectionChildFilledCount) {
                                this._SfReportingContainer.querySelector('#' + sectionId + "-success").style.display = 'flex';
                            }
                            else {
                                this._SfReportingContainer.querySelector('#' + sectionId + "-success").style.display = 'none';
                            }
                        }
                        sectionChildCount = 0;
                        sectionChildFilledCount = 0;
                        sectionId = element.id;
                    }
                    else if (element.type != "section" && element.type != "subsection" && element.mandatory != null) {
                        total++;
                        sectionChildCount++;
                        if (element.type == "textarea" || element.type == "date") {
                            if (element.value != "" && element.value.length > 0) {
                                filled++;
                                sectionChildFilledCount++;
                            }
                        }
                        else if (element.type == "yesno+textarea") {
                            if (element.value.length == 2 && element.value[0].length > 0 && element.value[1].length > 0) {
                                filled++;
                                sectionChildFilledCount++;
                            }
                        }
                        else if (element.type == "sf-i-form") {
                            console.log('evalshowprogress sf-i-form value', element.value, element.value.length, element.mandatory, element.mandatory != null);
                            if (element.value.length > 0) {
                                filled++;
                                sectionChildFilledCount++;
                            }
                        }
                        else if (element.type == "sf-i-bricks") {
                            console.log('evalshowprogress sf-i-bricks value', element.value, element.value.length, element.mandatory, element.mandatory != null);
                            if (element.value.length > 0) {
                                filled++;
                                sectionChildFilledCount++;
                            }
                        }
                        if (element.mandatory != null && flagEval) {
                            if (element.value == "" || element.value.length < 1) {
                                flagEval = false;
                            }
                        }
                    }
                }
            }
            if (sectionChildCount != 0 && sectionId !== "") {
                if (sectionChildCount == sectionChildFilledCount) {
                    this._SfReportingContainer.querySelector('#' + sectionId + "-success").style.display = 'flex';
                }
                else {
                    this._SfReportingContainer.querySelector('#' + sectionId + "-success").style.display = 'none';
                }
            }
            console.log('evalshowprogress', filled, total);
            if (this.editdisable == "true") {
                this._SfReportingContainer.querySelector('.progress-bar').style.display = 'none';
            }
            else {
                this._SfReportingContainer.querySelector('.progress-bar').style.display = 'flex';
                let progress = Math.floor((filled / total) * 100);
                if (progress == 100) {
                    this._SfReportingContainer.querySelector('.progress-bar-complete').style.width = "0%";
                    this._SfReportingContainer.querySelector('.progress-bar-finished').style.width = "100%";
                }
                else {
                    this._SfReportingContainer.querySelector('.progress-bar-complete').style.width = progress + "%";
                    this._SfReportingContainer.querySelector('.progress-bar-finished').style.width = "0%";
                }
                this._SfReportingContainer.querySelector('.progress-bar-incomplete').style.width = (100 - progress) + "%";
                console.log('buttonsubmit', this._SfReportingButtonSubmit);
                if (this._SfReportingButtonSubmit != null) {
                    this._SfReportingButtonSubmit.disabled = !flagEval;
                }
            }
            console.log('selectedValues', this.selectedValues());
        };
        this.initInputListeners = () => {
            let addButtons = this._SfReportingContainer.querySelectorAll('.add-button');
            for (let addButton of addButtons) {
                addButton.addEventListener('click', (ev) => {
                    let target = ev.target;
                    for (let [i, element] of this.dataModel.entries()) {
                        if (isAddButtonObject(element)) {
                            if (element.id == target.id) {
                                let schemaArr = JSON.parse(this.dataModel[i].schema);
                                let childElementArr = [];
                                for (let schemaElement of schemaArr) {
                                    childElementArr.push(createDataObject(schemaElement, this.dataModel[i].children.length));
                                }
                                this.dataModel[i].children.push(childElementArr);
                                break;
                            }
                        }
                    }
                    if (this.evalTimeout != null) {
                        clearTimeout(this.evalTimeout);
                    }
                    this.evalTimeout = setTimeout(() => {
                        this.evalShowProgress();
                    }, 2000);
                    this.populateView(this._SfReportingContainer.querySelector('.form-container').scrollTop);
                });
            }
            let removeButtons = this._SfReportingContainer.querySelectorAll('.remove-child-button');
            for (let removeButton of removeButtons) {
                removeButton.addEventListener('click', (ev) => {
                    let target = ev.target;
                    console.log(target);
                    let addId = target.id.split("-")[0];
                    let iter = parseInt(target.id.split("-")[target.id.split("-").length - 1]) - 1;
                    for (let [i, element] of this.dataModel.entries()) {
                        if (isAddButtonObject(element)) {
                            if (element.id == addId) {
                                this.dataModel[i].children.splice(iter, 1);
                                break;
                            }
                        }
                    }
                    if (this.evalTimeout != null) {
                        clearTimeout(this.evalTimeout);
                    }
                    this.evalTimeout = setTimeout(() => {
                        this.evalShowProgress();
                    }, 2000);
                    this.populateView(this._SfReportingContainer.querySelector('.form-container').scrollTop);
                });
            }
            let textAreas = this._SfReportingContainer.querySelectorAll('.reporting-textarea');
            for (let textArea of textAreas) {
                textArea.addEventListener('keyup', (e) => {
                    let target = e.target;
                    let genId = target.id.slice(0, target.id.lastIndexOf('-'));
                    for (let [i, element] of this.dataModel.entries()) {
                        if (!isAddButtonObject(element)) {
                            if (element.type == "textarea") {
                                if (element.id == target.id) {
                                    this.dataModel[i].value = target.value;
                                }
                            }
                            else if (element.type == "yesno+textarea") {
                                if ((element.id + "-textarea") == target.id) {
                                    if (this.dataModel[i].value == null || this.dataModel[i].value.length != 2) {
                                        this.dataModel[i].value = ['', ''];
                                    }
                                    this.dataModel[i].value[1] = target.value;
                                }
                            }
                        }
                        else {
                            if (element.schema.indexOf(genId) >= 0) {
                                for (let [j, childElementArr] of element.children.entries()) {
                                    for (let [k, childElement] of childElementArr.entries()) {
                                        if (childElement.type == "textarea") {
                                            if (childElement.id == target.id) {
                                                this.dataModel[i].children[j][k].value = target.value;
                                            }
                                        }
                                        else if (childElement.type == "yesno+textarea") {
                                            if ((childElement.id + "-textarea") == target.id) {
                                                if (this.dataModel[i].children[j][k].value == null || this.dataModel[i].children[j][k].value.length != 2) {
                                                    this.dataModel[i].children[j][k].value = ['', ''];
                                                }
                                                this.dataModel[i].children[j][k].value[1] = target.value;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (this.evalTimeout != null) {
                        clearTimeout(this.evalTimeout);
                    }
                    this.evalTimeout = setTimeout(() => {
                        this.evalShowProgress();
                    }, 2000);
                });
            }
            let radioButtons = this._SfReportingContainer.querySelectorAll('.reporting-radio');
            for (let radioButton of radioButtons) {
                radioButton.addEventListener('change', (e) => {
                    let target = e.target;
                    console.log('radio changed', target.id);
                    let genId = target.id.slice(0, target.id.lastIndexOf('-'));
                    for (let [i, element] of this.dataModel.entries()) {
                        if (!isAddButtonObject(element)) {
                            if (element.type == "yesno+textarea") {
                                if (element.id == genId) {
                                    if (this.dataModel[i].value == null || this.dataModel[i].value.length != 2) {
                                        this.dataModel[i].value = ['', ''];
                                    }
                                    this.dataModel[i].value[0] = target.value;
                                }
                            }
                        }
                        else {
                            if (element.schema.indexOf(genId) >= 0) {
                                for (let [j, childElementArr] of element.children.entries()) {
                                    for (let [k, childElement] of childElementArr.entries()) {
                                        if (childElement.type == "yesno+textarea") {
                                            if (childElement.id == genId) {
                                                if (this.dataModel[i].children[j][k].value == null || this.dataModel[i].children[j][k].value.length != 2) {
                                                    this.dataModel[i].children[j][k].value = ['', ''];
                                                }
                                                this.dataModel[i].children[j][k].value[0] = target.value;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (this.evalTimeout != null) {
                        clearTimeout(this.evalTimeout);
                    }
                    this.evalTimeout = setTimeout(() => {
                        this.evalShowProgress();
                    }, 2000);
                });
            }
            let forms = this._SfReportingContainer.querySelectorAll('.reporting-sf-i-form');
            for (let form of forms) {
                form.addEventListener('valueChanged', (ev) => {
                    let target = ev.target;
                    console.log(target);
                    let genId = target.id.slice(0, target.id.lastIndexOf('-'));
                    for (let [i, element] of this.dataModel.entries()) {
                        if (!isAddButtonObject(element)) {
                            if (element.id == target.id) {
                                this.dataModel[i].value = target.selectedValues();
                            }
                        }
                        else {
                            if (element.schema.indexOf(genId) >= 0) {
                                for (let [j, childElementArr] of element.children.entries()) {
                                    for (let [k, childElement] of childElementArr.entries()) {
                                        if (childElement.id == target.id) {
                                            this.dataModel[i].children[j][k].value = target.selectedValues();
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (this.evalTimeout != null) {
                        clearTimeout(this.evalTimeout);
                    }
                    this.evalTimeout = setTimeout(() => {
                        this.evalShowProgress();
                    }, 2000);
                    // this.populateView((this._SfReportingContainer.querySelector('.form-container') as HTMLElement).scrollTop);
                });
            }
            let dateInputs = this._SfReportingContainer.querySelectorAll('.reporting-date');
            for (let dateInput of dateInputs) {
                dateInput.addEventListener('change', (ev) => {
                    let target = ev.target;
                    console.log(target);
                    let genId = target.id.slice(0, target.id.lastIndexOf('-'));
                    for (let [i, element] of this.dataModel.entries()) {
                        if (!isAddButtonObject(element)) {
                            if (element.id == target.id) {
                                this.dataModel[i].value = target.value;
                            }
                        }
                        else {
                            if (element.schema.indexOf(genId) >= 0) {
                                for (let [j, childElementArr] of element.children.entries()) {
                                    for (let [k, childElement] of childElementArr.entries()) {
                                        if (childElement.id == target.id) {
                                            this.dataModel[i].children[j][k].value = target.value;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (this.evalTimeout != null) {
                        clearTimeout(this.evalTimeout);
                    }
                    this.evalTimeout = setTimeout(() => {
                        this.evalShowProgress();
                    }, 2000);
                    // this.populateView((this._SfReportingContainer.querySelector('.form-container') as HTMLElement).scrollTop);
                });
            }
            let bricksArr = this._SfReportingContainer.querySelectorAll('.reporting-sf-i-bricks');
            for (let bricks of bricksArr) {
                bricks.addEventListener('valueChanged', async (ev) => {
                    let target = ev.target;
                    let genId = target.id.slice(0, target.id.lastIndexOf('-'));
                    console.log('bricks value changed', target.id);
                    for (let [i, element] of this.dataModel.entries()) {
                        if (!isAddButtonObject(element)) {
                            if (element.id == target.id) {
                                this.dataModel[i].value = target.selectedValueTexts();
                            }
                        }
                        else {
                            if (element.schema.indexOf(genId) >= 0) {
                                for (let [j, childElementArr] of element.children.entries()) {
                                    for (let [k, childElement] of childElementArr.entries()) {
                                        if (childElement.id == target.id) {
                                            this.dataModel[i].children[j][k].value = target.selectedValueTexts();
                                        }
                                    }
                                }
                            }
                        }
                    }
                    for (let element of this.dataModel) {
                        if (element.type == "sf-i-bricks" && element.dependencies.indexOf(target.id) >= 0) {
                            let dependantBricks = this._SfReportingContainer.querySelector('#' + element.id);
                            let selectedDependedValues = [];
                            for (let dependency of element.dependencies) {
                                let dependedBricks = this._SfReportingContainer.querySelector('#' + dependency);
                                selectedDependedValues.push(dependedBricks.selectedValueTexts()[0]);
                            }
                            let values = this.getBricksValues(element, selectedDependedValues);
                            console.log('bricks selecteddependantvalues', selectedDependedValues, element.value.length, values[1], element.id);
                            dependantBricks.namesjson = JSON.stringify(values[0]);
                            dependantBricks.idsjson = JSON.stringify(values[1]);
                            if (element.value != '' && element.value.length > 0) {
                                // let ids = []
                                // for(let val of element.value){
                                //   ids.push(val.split(';')[1])
                                // }
                                dependantBricks.prepopulateValJson = JSON.stringify(element.value);
                            }
                            else {
                                dependantBricks.prepopulateValJson = JSON.stringify([]);
                            }
                            dependantBricks.loadMode();
                            await Util.delay(500);
                        }
                    }
                    if (this.evalTimeout != null) {
                        clearTimeout(this.evalTimeout);
                    }
                    this.evalTimeout = setTimeout(() => {
                        this.evalShowProgress();
                    }, 2000);
                });
            }
        };
        this.initSectionListeners = () => {
            let sectionHeads = (this._SfReportingContainer.querySelectorAll('.section-head'));
            for (let sectionHead of sectionHeads) {
                sectionHead.addEventListener('click', () => {
                    console.log('scroll position', this._SfReportingContainer.querySelector('.form-container').scrollTop);
                    for (let dataObj of this.dataModel) {
                        if (dataObj.id == sectionHead.id) {
                            dataObj.collapse = dataObj.collapse == "false" ? "true" : "false";
                        }
                    }
                    if (this.evalTimeout != null) {
                        clearTimeout(this.evalTimeout);
                    }
                    this.evalTimeout = setTimeout(() => {
                        this.evalShowProgress();
                    }, 2000);
                    this.populateView(this._SfReportingContainer.querySelector('.form-container').scrollTop);
                });
            }
        };
        this.renderAddSection = (addObj, iter) => {
            let elementHtml = `<div class="d-flex align-center justify-between" part="subsection-container"><h4 part="subsection">${addObj.label} - ${iter}</h4><button id="${addObj.id}-remove-${iter}" class="remove-child-button" part="remove-child-button"><span class="material-icons button-icon">delete</span></button></div>`;
            return elementHtml;
        };
        this.renderSectionContainer = (addObj) => {
            let elementHtml = addObj.direction == "row" ? `<div class="d-flex jsutify-start align-start">` : ``;
            return elementHtml;
        };
        this.renderAddButton = (addObj) => {
            let elementHtml = `<button id="${addObj.id}" class="add-button" part="add-button">Add ${addObj.label}</button>`;
            return elementHtml;
        };
        this.renderElement = (dataObj) => {
            var _a;
            let elementHtml = "";
            console.log('rendering obj', dataObj.type);
            if (dataObj.type == "section") {
                elementHtml += `<div class="d-flex flex-col" part="section-container"><div id="${dataObj.id}" class="section-head d-flex align-center justify-between" part="${dataObj.collapse == "true" ? 'section-head-collapsed' : 'section-head-expanded'}"><h3 part="${dataObj.collapse == "true" ? 'section-title-collapsed' : 'section-title-expanded'}">${dataObj.name}</h3><div id="${dataObj.id}-success" part="section-success-icon"><div class="material-icons">${dataObj.collapse == "true" ? "keyboard_arrow_down" : "keyboard_arrow_up"}</div></div></div><div class="section-body d-flex ${this.formviewclass} ${dataObj.collapse == "true" ? 'hide' : ''}" part="section-body"> `;
            }
            else if (dataObj.type == "subsection") {
                elementHtml += `<div class="d-flex align-center" part="subsection-container"><h4 part="subsection">${dataObj.name}</h4></div>`;
            }
            else if (dataObj.type == "textarea") {
                elementHtml += `<div part="textarea-container" class="d-flex flex-col flex-grow">
                        <label id="${dataObj.id}-label" part="textarea-label">${dataObj.label}</label>
                        <div part="td-body-2"><sf-i-elastic-text text="${dataObj.hint}" minLength="50"></sf-i-elastic-text></div>
                        <textarea rows="${dataObj.size == "small" ? "4" : "10"}" id="${dataObj.id}" type="text" class=" reporting-textarea" part="input-textarea" ${this.mode == "view" || this.flow == "details" ? "readonly" : ""}>${dataObj.value}</textarea>
                      </div>`;
            }
            else if (dataObj.type == "yesno+textarea") {
                elementHtml += `<div part="textarea-container"  class="d-flex flex-col flex-grow">
                        <label id="${dataObj.id}-label" part="textarea-label">${dataObj.label}</label>
                        <div part="td-body-2"><sf-i-elastic-text text="${dataObj.hint}" minLength="50"></sf-i-elastic-text></div>
                        <div class="d-flex">`;
                for (let option of dataObj.options) {
                    elementHtml += `<input type="radio" id="${dataObj.id}-${option.toLowerCase().replace(/ /g, '_')}" name="${dataObj.id}" class="reporting-radio" part="input-radio" value="${option}" ${this.mode == "view" || this.flow == "details" ? "disabled" : ""} ${dataObj.value[0] == option ? "checked" : ""}><label id="${dataObj.id}-${option.toLowerCase().replace(/ /g, '_')}-label" part="radio-label">${option}</label>`;
                }
                elementHtml += `</div>
                        <textarea rows="${dataObj.size == "small" ? "4" : "10"}" id="${dataObj.id}-textarea" type="text" class="reporting-textarea" part="input-textarea" ${this.mode == "view" || this.flow == "details" ? "readonly" : ""}>${(_a = dataObj.value[1]) !== null && _a !== void 0 ? _a : ""}</textarea>
                      </div>`;
            }
            else if (dataObj.type == "date") {
                elementHtml += `<div part="date-container" class="d-flex flex-col flex-grow">
                        <label id="${dataObj.id}-label" part="date-label">${dataObj.label}</label>
                        <div part="td-body-2"><sf-i-elastic-text text="${dataObj.hint}" minLength="50"></sf-i-elastic-text></div>
                        <input class="reporting-date" id="${dataObj.id}" part="input-date" type="date" ${this.mode == "view" || this.flow == "details" ? "readonly" : ""} value="${dataObj.value}"/>
                      </div>`;
            }
            else if (dataObj.type == "sf-i-form") {
                elementHtml += `<div part="date-container" class="d-flex flex-col flex-grow">
                        <label id="${dataObj.id}-label" part="date-label">${dataObj.label}</label>
                        <div part="td-body-2"><sf-i-elastic-text text="${dataObj.hint}" minLength="50"></sf-i-elastic-text></div>
                        <sf-i-form exportparts="td-action:form-td-action, td-body" id="${dataObj.id}" class="reporting-sf-i-form" part="input-sf-i-form" name="${dataObj.name}" label="" apiId="${dataObj.apiid}" mode="${dataObj.mode}" searchPhrase="${this.projectname + "&" + dataObj.searchstring}" selectProjection="${dataObj.selectprojection}" ignoreProjections="${dataObj.ignoredprojections}" ${parseInt(dataObj.maxselect) == 0 ? "" : `maxselect="${dataObj.maxselect}"`} ${dataObj.mandatory != null ? "mandatory=\"\"" : ""}></sf-i-form>
                      </div>`;
                // elementHtml += `<div part="date-container" class="d-flex flex-col flex-grow">
                //                   <label id="${dataObj.id}-label" part="date-label">${dataObj.label}</label>
                //                   <div part="td-body"><sf-i-elastic-text text="${dataObj.hint}" minLength="50"></sf-i-elastic-text></div>
                //                   <sf-i-form id="${dataObj.id}" class="reporting-sf-i-form" name="${dataObj.name}" label="" apiId="${dataObj.apiid}" mode="${dataObj.mode}" searchPhrase="${this.projectname + "&" + dataObj.searchstring}" selectProjection="${dataObj.selectprojection}" ignoreProjections="${dataObj.ignoredprojections}" ${parseInt(dataObj.maxselect) == 0 ? "" : `maxselect="${dataObj.maxselect}"`} ${dataObj.mandatory != null ? "mandatory=\"\"" : ""}></sf-i-form>
                //                 </div>`
                //${dataObj.value != "" ? (dataObj.mode == "select" ? "" : ("selectedSearchId=\"" + JSON.stringify(dataObj.value).replace(/"/g,"&quot;") + "\"")) : ""} 
            }
            else if (dataObj.type == "sf-i-bricks") {
                elementHtml += `<div part="date-container" class="d-flex flex-col flex-grow">
                        <label id="${dataObj.id}-label" part="date-label">${dataObj.label}</label>
                        <div part="td-body-2"><sf-i-elastic-text text="${dataObj.hint}" minLength="50"></sf-i-elastic-text></div>
                        <sf-i-bricks exportparts="input-select-single, selected-container, selected-option, input-select-multi-option, select-option-label, selected-option-label" id="${dataObj.id}" mode="${dataObj.mode}" class="reporting-sf-i-bricks" part="input-sf-i-bricks" name="${dataObj.name}" ${parseInt(dataObj.maxselect) == 0 ? "" : `maxselect="${dataObj.maxselect}"`} ${dataObj.mandatory != null ? "mandatory=\"\"" : ""}></sf-i-bricks>
                      </div>`;
            }
            return elementHtml;
        };
        this.populateViewShort = () => {
            var _a, _b;
            let html = "";
            if (this.mode == "short-new") {
                html += `<button part="button-lg" id="button-short-new">Submit Form</button>`;
            }
            else if (this.mode == "short-view") {
                html += `<button part="button-lg" id="button-short-view">Update From</button>`;
            }
            this._SfReportingContainerShort.innerHTML = html;
            this._SfReportingContainer.style.display = 'none';
            // (this._SfReportingButtonContainer as HTMLDivElement).style.display = 'none';
            (_a = this._SfReportingContainerShort.querySelector('#button-short-new')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
                this.mode = "new";
                this.loadMode();
            });
            (_b = this._SfReportingContainerShort.querySelector('#button-short-view')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
                this.mode = "view";
                this.loadMode();
            });
        };
        this.populateList = () => {
            let html = '';
            html += `<div class="d-flex justify-between p-7">`;
            html += `<div part="calendar-date-container" class="d-flex flex-col align-start justify-center">${this.lastCalendarGenerated == "" ? "" : ("<div class=\"d-flex align-center justify-center\" part=\"last-calendar-date\" id=\"last-calendar-date\"><span class=\"material-symbols-outlined\">update</span>&nbsp;&nbsp;Calendar synced on \n" + (new Date(parseInt(this.lastCalendarGenerated)).toLocaleDateString('en-IN') + " - " + new Date(parseInt(this.lastCalendarGenerated)).toLocaleTimeString('en-IN'))) + '</div>'}${this.nextCalendarScheduled == "" ? "" : ("<div class=\"d-flex align-center justify-center\" part=\"next-calendar-date\" id=\"next-calendar-date\"><span class=\"material-symbols-outlined\">hourglass</span>&nbsp;&nbsp;Next update on \n" + (new Date(parseInt(this.nextCalendarScheduled)).toLocaleDateString('en-IN') + " - " + new Date(parseInt(this.nextCalendarScheduled)).toLocaleTimeString('en-IN'))) + '</div>'}</div>`;
            html += `<div class="d-flex justify-end flex-grow">`;
            // html += `<button id="button-publish" part="button-icon" class="material-icons hide">campaign</button>`
            html += `<button id="button-new" part="button-icon" class="material-icons button-icon-click ml-10">add</button>`;
            html += `</div>`;
            html += `</div>`;
            html += '<table id="select-list-table" class="w-100-m-0">';
            for (let [i, item] of this.list.entries()) {
                html += '<tr class="tablerow">';
                let bgClass = i % 2 == 0 ? 'td-light' : 'td-dark';
                html += `<td part="td-body" class="td-body"><span class="mrl-5 material-icons" part="span-submit-${item.published ? 'published' : 'unpublished'}" >${item.published ? 'radio_button_checked' : 'edit_note'}</span></td>`;
                html += `<td part="td-action" class="td-action"><button part="button-icon" class="material-icons button-details" id="button-details-${i}">open_in_new</button></td>`;
                for (let property of Object.keys(item)) {
                    if (this.getIgnoreProjections().indexOf(property) < 0) {
                        html += `<td part="td-body" class="td-body ${bgClass}"><div class="d-flex flex-col align-start flex-wrap"><div part="td-head" class="pl-0-imp w-100 d-flex align-center">${property}</div><div><sf-i-elastic-text text="${item[property]}" minLength="20"></sf-i-elastic-text></div></div></td>`;
                    }
                }
                html += '</tr>';
            }
            html += '</table>';
            this._SfReportingContainer.innerHTML = html;
            this._SfReportingContainer.style.display = 'block';
            let detailsButtons = this._SfReportingContainer.querySelectorAll('.button-details');
            for (let detailsButton of detailsButtons) {
                detailsButton.addEventListener('click', (ev) => {
                    let target = ev.target;
                    let index = target.id.split('-')[2];
                    this.selectedItem = this.list[index];
                    console.log('item selected', this.selectedItem);
                    this.flow = "details";
                    this.loadMode();
                });
            }
            // let selectInputs = (this._SfReportingContainer as HTMLDivElement).querySelectorAll('.input-select') as NodeListOf<HTMLInputElement>
            // for(let selectInput of selectInputs){
            //   selectInput.addEventListener('change',(ev: any) => {
            //     let target = ev.target
            //     let index = target.id.split('-')[2]
            //     if(target.checked){
            //       if(this.selectedItemIds.indexOf(this.list[index].id) < 0){
            //         this.selectedItemIds.push(this.list[index].id)
            //       }
            //     }else{
            //       if(this.selectedItemIds.indexOf(this.list[index].id) >= 0){
            //         this.selectedItemIds.splice(this.selectedItemIds.indexOf(this.list[index].id), 1)
            //       }
            //     }
            //     if(this.selectedItemIds.length > 0){
            //       ((this._SfReportingContainer as HTMLDivElement).querySelector('#button-publish') as HTMLButtonElement).style.display = 'flex'
            //     }else{
            //       ((this._SfReportingContainer as HTMLDivElement).querySelector('#button-publish') as HTMLButtonElement).style.display = 'none'
            //     }
            //   })
            // }
            // let inputSelectAll = (this._SfReportingContainer as HTMLDivElement).querySelector('#input-select-all') as HTMLInputElement
            // inputSelectAll.addEventListener('click',(ev: any)=>{
            //   let target = ev.target;
            //   let selectInputs = (this._SfReportingContainer as HTMLDivElement).querySelectorAll('.input-select') as NodeListOf<HTMLInputElement>
            //   for(let selectInput of selectInputs){
            //     selectInput.checked = target.checked
            //     var event = document.createEvent("HTMLEvents");
            //     event.initEvent('change', false, true);
            //     selectInput.dispatchEvent(event);
            //   }
            // })
            // inputSelectAll.style.display = this.list.length > 0 ? 'flex' : 'none';
            let buttonNew = this._SfReportingContainer.querySelector('#button-new');
            buttonNew.addEventListener('click', () => {
                this.newClick();
            });
            let customEvent = new CustomEvent('valueChanged');
            this.dispatchEvent(customEvent);
        };
        this.loadMode = async () => {
            console.log('loadmode', this.mode, this.flow);
            if (this.mode == "view") {
                this.populateDataModel();
                this.prepopulateValues();
            }
            else if (this.mode == "edit") {
                this.populateDataModel();
                this.prepopulateValues();
            }
            else if (this.mode == "new") {
                this.published = false;
                this.populateDataModel();
                this.populateView();
            }
            else if (this.mode == "downloader") {
                setTimeout(() => {
                    this.initDecryptView();
                }, 1000);
            }
            else if (this.mode == "admin") {
                if (this.flow == "new") {
                    setTimeout(() => {
                        this.initNewListeners();
                    }, 500);
                    this.fetchSchema();
                }
                else if (this.flow == "edit") {
                    setTimeout(() => {
                        this.initEditListeners();
                        this.populateDataModel();
                        this.prepopulateValues();
                    }, 500);
                }
                else if (this.flow == "details") {
                    setTimeout(() => {
                        this.initDetailsListeners();
                    }, 500);
                    this.fetchDetails();
                }
                else if (this.flow == "list") {
                    setTimeout(() => {
                        this.initListListeners();
                    }, 500);
                    this.fetchList();
                }
            }
            else {
                this.populateViewShort();
            }
        };
        this.prepareXhrPresignedGet = async (url, loaderElement, loaderText = '') => {
            if (loaderElement != null) {
                loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
                loaderElement.innerHTML += ('<div class="lds-text"><div class="lds-text-c">' + loaderText + '</div></div>');
            }
            return await Util.callApiPresignedGet(url);
        };
        this.prepareXhrPresignedDelete = async (url, loaderElement, loaderText = '') => {
            if (loaderElement != null) {
                loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
                loaderElement.innerHTML += ('<div class="lds-text"><div class="lds-text-c">' + loaderText + '</div></div>');
            }
            return await Util.callApiPresignedDelete(url);
        };
        this.prepareXhr = async (data, url, loaderElement, authorization) => {
            if (loaderElement != null) {
                loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
            }
            return await Util.callApi(url, data, authorization);
        };
        this.fetchPresignedUrl = async (url) => {
            const xhr = (await this.prepareXhrPresignedGet(url, this._SfLoader, 'Downloading'));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsRespose = JSON.parse(xhr.responseText);
                console.log('jsRespose', jsRespose);
                return jsRespose;
            }
        };
        this.fetchPresignedUrlDelete = async (url) => {
            const xhr = (await this.prepareXhrPresignedDelete(url, this._SfLoader));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsRespose = JSON.parse(xhr.responseText);
                console.log('jsRespose', jsRespose);
                return jsRespose;
            }
        };
        this.clearMessages = () => {
            this._SfRowError.style.display = 'none';
            this._SfRowErrorMessage.innerHTML = '';
            this._SfRowSuccess.style.display = 'none';
            this._SfRowSuccessMessage.innerHTML = '';
        };
        this.setError = (msg) => {
            this._SfRowError.style.display = 'flex';
            this._SfRowErrorMessage.innerHTML = msg;
            this._SfRowSuccess.style.display = 'none';
            this._SfRowSuccessMessage.innerHTML = '';
            // this._SfRowNotif.style.display = 'none';
            // this._SfRowNotifMessage.innerHTML = '';
        };
        this.setSuccess = (msg) => {
            this._SfRowError.style.display = 'none';
            this._SfRowErrorMessage.innerHTML = '';
            this._SfRowSuccess.style.display = 'flex';
            this._SfRowSuccessMessage.innerHTML = msg;
            // this._SfRowNotif.style.display = 'none';
            // this._SfRowNotifMessage.innerHTML = '';
        };
        this.setNotif = (msg) => {
            this._SfRowError.style.display = 'none';
            this._SfRowErrorMessage.innerHTML = '';
            this._SfRowSuccess.style.display = 'none';
            this._SfRowSuccessMessage.innerHTML = '';
            this._SfRowNotif.style.display = 'flex';
            this._SfRowNotifMessage.innerHTML = msg;
        };
        this.fetchSchema = async () => {
            let url = "https://" + this.apiId + "/getschema";
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr({}, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            console.log(xhr);
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.configjson = JSON.stringify(jsonRespose.schema);
                this.populateDataModel();
                this.populateView();
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchList = async () => {
            var _a, _b;
            let url = "https://" + this.apiId + "/list";
            let body = { projectid: this.projectid };
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            console.log(xhr);
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log('list response', jsonRespose);
                console.log('list response', jsonRespose.lastCalendarGenerated);
                this.lastCalendarGenerated = (_a = jsonRespose.lastCalendarGenerated) !== null && _a !== void 0 ? _a : "";
                this.nextCalendarScheduled = (_b = jsonRespose.nextCalendarScheduled) !== null && _b !== void 0 ? _b : "";
                this.list = jsonRespose.list;
                this.initListeners();
                this.populateList();
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.fetchDetails = async () => {
            var _a;
            let url = "https://" + this.apiId + "/details";
            let body = { projectid: this.projectid, noticeid: this.selectedItem.id };
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            console.log(xhr);
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log('details response', jsonRespose);
                let resultObject = jsonRespose.object;
                this.published = (_a = resultObject.published) !== null && _a !== void 0 ? _a : false;
                this.configjson = resultObject.schema;
                this.prepopulateValJson = resultObject.object;
                this.populateDataModel();
                this.prepopulateValues();
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.submitNew = async () => {
            console.log('adding', this.selectedValues());
            let url = "https://" + this.apiId + "/add";
            let body = { projectid: this.projectid, object: this.selectedValues(), schema: this.getConfigJson(), published: this.published };
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            console.log(xhr);
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log('add response', jsonRespose);
                // this.configjson = JSON.stringify(jsonRespose.schema);
                // this.populateDataModel();
                // this.populateView();
                this.backClick();
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.submitEdit = async () => {
            let url = "https://" + this.apiId + "/update";
            let body = { projectid: this.projectid, noticeid: this.selectedItem.id, object: this.selectedValues(), schema: this.getConfigJson(), published: this.published };
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            console.log(xhr);
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log('update response', jsonRespose);
                // this.configjson = JSON.stringify(jsonRespose.schema);
                // this.populateDataModel();
                // this.populateView();
                this.backClick();
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.submitDelete = async () => {
            let url = "https://" + this.apiId + "/delete";
            let body = { projectid: this.projectid, noticeid: this.selectedItem.id };
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            console.log(xhr);
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log('delete response', jsonRespose);
                // this.configjson = JSON.stringify(jsonRespose.schema);
                // this.populateDataModel();
                // this.populateView();
                this.backClick();
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.submitPublish = async () => {
            let url = "https://" + this.apiId + "/publish";
            let body = { projectid: this.projectid, noticeids: this.selectedItemIds };
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            console.log(xhr);
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                console.log('publish response', jsonRespose);
                // this.configjson = JSON.stringify(jsonRespose.schema);
                // this.populateDataModel();
                // this.populateView();
                // this.backClick()
                this.setSuccess("Calendar will be updated in a while.");
                setTimeout(() => {
                    this.clearMessages();
                }, 3000);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
            }
        };
        this.initDecryptView = () => {
            let divsArr = this._SfDecryptContainer.querySelectorAll("#decrypt-container > div");
            console.log('decrypt divs', divsArr);
            for (let divElement of divsArr) {
                divElement.classList.remove('hide');
            }
            this.initDecryptListeners();
        };
        this.initDecryptListeners = () => {
            this._SfDecryptProjectInput.addEventListener('valueChanged', () => {
                let projectId = this._SfDecryptProjectInput.selectedValues()[0];
                this.decryptProjectId = projectId.split(';')[projectId.split(';').length - 1];
                this.evalDecrypt();
            });
            this._SfDecryptFileInput.addEventListener('keyup', () => {
                console.log('keyup called');
                this.decryptFileName = this._SfDecryptFileInput.value;
                this.evalDecrypt();
            });
            this._SfDecryptButton.addEventListener('click', () => {
                console.log('decrypt clicked', this.decryptProjectId, this.decryptFileName);
                // this.submitDecrypt()
            });
        };
        this.evalDecrypt = () => {
            var _a, _b;
            console.log(this._SfDecryptFileInput);
            console.log('evalDecrypt', this.decryptProjectId, this.decryptFileName);
            if (this.decryptProjectId != null && this.decryptProjectId != "" && this.decryptFileName != null && this.decryptFileName.length > 3) {
                ((_a = this._SfDecryptContainer) === null || _a === void 0 ? void 0 : _a.querySelector('#button-decrypt')).removeAttribute('disabled');
            }
            else {
                ((_b = this._SfDecryptContainer) === null || _b === void 0 ? void 0 : _b.querySelector('#button-decrypt')).setAttribute('disabled', 'true');
            }
        };
        this.submitDecrypt = async () => {
            this.clearMessages();
            console.log('submitDecrypt called');
            const body = {};
            let url = "https://" + this.apiId + "/getdecryptedjson";
            body["projectid"] = this.decryptProjectId;
            body["key"] = this.decryptFileName + ".json";
            console.log(body);
            console.log(JSON.stringify(body));
            const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
            const xhr = (await this.prepareXhr(body, url, this._SfLoader, authorization));
            this._SfLoader.innerHTML = '';
            if (xhr.status == 200) {
                const jsonRespose = JSON.parse(xhr.responseText);
                let data = await this.fetchPresignedUrl(jsonRespose.signedUrlGet);
                await this.fetchPresignedUrlDelete(jsonRespose.signedUrlDelete);
                console.log('decrypt response', jsonRespose);
                this.setSuccess('Operation Successful!');
                const a = document.createElement("a");
                a.style.display = "none";
                a.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
                a.download = this.decryptFileName + ".json";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                setTimeout(() => {
                    this.clearMessages();
                }, 2000);
            }
            else {
                const jsonRespose = JSON.parse(xhr.responseText);
                this.setError(jsonRespose.error);
                setTimeout(() => {
                    this.clearMessages();
                }, 5000);
            }
        };
    }
    firstUpdated(_changedProperties) {
        this.loadMode();
    }
    connectedCallback() {
        super.connectedCallback();
    }
    render() {
        if (this.mode == "downloader") {
            return html `
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <div class="SfIEventsC">
          <div class="d-flex justify-center">
              <h1 part="title">${this.name}</h1>
          </div>
          <div id="decrypt-container" class="d-flex flex-col justify-center mt-20">
            <div class="d-flex mb-10">
              <div class="lb" part="lb"></div>
              <div class="d-flex align-end justify-between flex-grow">
                <div class="d-flex flex-col">
                  <sf-i-form id="sf-i-project-decrypt" class="mr-10" name="Projects" label="Select Project *" apiid="dnytrdlrmxgsy.cloudfront.net/project" mode="multiselect-dropdown" selectprojection="name" searchphrase="" ignoreprojections="[&quot;locations&quot;,&quot;plan&quot;,&quot;logo&quot;,&quot;shortid&quot;,&quot;plan&quot;]" mandatory="">
                  </sf-i-form>
                </div>
                <div class="d-flex flex-col">
                  <label>Decrypt Utility</label>
                  <div class="d-flex align-end">
                    <input part="input" id="input-decrypt" type="text" placeholder="file key" />.json&nbsp;&nbsp;
                    <button id="button-decrypt" part="button-icon-small" class="material-icons button-icon">download</button>
                  </div>
                  <div class="loader-element"></div>
                </div>
              </div>
              <div class="rb" part="rb"></div>
            </div>
            <div class="d-flex justify-center">
              <div class="lb" part="lb"></div>
              <div class="d-flex flex-col">
                <div class="d-flex justify-center gone">
                </div>
                <div class="div-row-error div-row-submit gone">
                  <div part="errormsg" class="div-row-error-message"></div>
                </div>
                <div class="div-row-success div-row-submit">
                  <div part="successmsg" class="div-row-success-message"></div>
                  <div part="successmsgbtncontainer" class="div-row-success-message-btn-container"></div>
                </div>
                <div class="div-row-notif div-row-submit">
                  <div part="notifmsg" class="div-row-notif-message"></div>
                </div>
              </div>
              <div class="rb" part="rb"></div>
            </div>
          </div>
        </div>
      `;
        }
        if (this.mode == "admin" && this.flow == "new") {
            return html `
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
      <div part="reporting-container-outer" class="SfIReportingC d-flex flex-col align-center">
        <div id="reporting-container" part="reporting-container" class="w-100-m-0 hide"></div>  
        <div class="loader-element"></div>
        <div class="d-flex justify-between">
          <div class="lb"></div>
          <div>
            <div class="div-row-error div-row-submit gone">
              <div part="errormsg" class="div-row-error-message"></div>
            </div>
            <div class="div-row-success div-row-submit gone">
              <div part="successmsg" class="div-row-success-message"></div>
            </div>
            <div class="div-row-notif div-row-submit">
              <div part="notifmsg" class="div-row-notif-message"></div>
            </div>
          </div>
          <div class="rb"></div>
        </div>
      </div>
      `;
        }
        else if (this.mode == "admin" && this.flow == "details") {
            return html `
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
      <div part="reporting-container-outer" class="SfIReportingC d-flex flex-col align-center">
        <div id="reporting-container" part="reporting-container" class="w-100-m-0 hide"></div>
        <div class="loader-element"></div>
        <div class="d-flex justify-between">
          <div class="lb"></div>
          <div>
            <div class="div-row-error div-row-submit gone">
              <div part="errormsg" class="div-row-error-message"></div>
            </div>
            <div class="div-row-success div-row-submit gone">
              <div part="successmsg" class="div-row-success-message"></div>
            </div>
            <div class="div-row-notif div-row-submit">
              <div part="notifmsg" class="div-row-notif-message"></div>
            </div>
          </div>
          <div class="rb"></div>
        </div>
      </div>
      `;
        }
        else if (this.mode == "admin" && this.flow == "edit") {
            return html `
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
      <div part="reporting-container-outer" class="SfIReportingC d-flex flex-col align-center">
        <div id="reporting-container" part="reporting-container" class="w-100-m-0 hide"></div>
        <div class="loader-element"></div>
        <div class="d-flex justify-between">
          <div class="lb"></div>
          <div>
            <div class="div-row-error div-row-submit gone">
              <div part="errormsg" class="div-row-error-message"></div>
            </div>
            <div class="div-row-success div-row-submit gone">
              <div part="successmsg" class="div-row-success-message"></div>
            </div>
            <div class="div-row-notif div-row-submit">
              <div part="notifmsg" class="div-row-notif-message"></div>
            </div>
          </div>
          <div class="rb"></div>
        </div>
      </div>
      `;
        }
        else if (this.mode == "admin" && this.flow == "list") {
            return html `
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0..1,0" />
      <div part="reporting-container-outer" class="SfIReportingC d-flex flex-col align-center">
        <div class="d-flex justify-between w-100-m-0">
          <div id="reporting-container" part="reporting-container" class="w-100-m-0 hide"></div>
        </div>
        <div class="loader-element"></div>
        <div class="d-flex justify-between w-100-m-0">
          <div class="lb"></div>
          <div>
            <div class="div-row-error div-row-submit gone">
              <div part="errormsg" class="div-row-error-message"></div>
            </div>
            <div class="div-row-success div-row-submit gone">
              <div part="successmsg" class="div-row-success-message"></div>
            </div>
            <div class="div-row-notif div-row-submit">
              <div part="notifmsg" class="div-row-notif-message"></div>
            </div>
          </div>
          <div class="rb"></div>
        </div>
      </div>
      `;
        }
        return html `
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <div part="reporting-container-outer" class="SfIReportingC d-flex flex-col align-center">
        <div id="reporting-container-short" part="reporting-container-short" class="w-100-m-0"></div>
        <div id="reporting-container" part="reporting-container" class="w-100-m-0 hide"></div>
      </div>
    `;
    }
};
SfIReporting.styles = css `

    
    .SfIReportingC {
    }

    .invisible {
      visibility: hidden;
    }

    .m-0 {
      margin: 0px;
    }

    .m-20 {
      margin: 20px;
    }
    .md-20-ml-10 {
      margin-top: 20px;
      margin-bottom: 20px;
      margin-left: 10px;
      margin-right: 10px;
    }
    .mrl-5 {
      margin-left: 5px;
      margin-right: 5px;
    }
    .ml-10{
      margin-left: 10px
    }
    .flex-grow {
      flex-grow: 1;
    }

    .left-sticky {
      left: 0px;
      position: sticky;
    }

    .color-lt-gray {
      color: #999;
      font-size: 95%;
    }

    .link {
      text-decoration: underline;
      cursor: pointer;
    }

    .cursor {
      cursor: pointer;
    }

    .gone {
      display: none
    }

    .loader-element {
      position: fixed;
      right: 10px;
      top: 10px;
      margin-left: 5px;
    }

    .td-head {
      text-transform: capitalize;
    }

    .td-body {
      
    }

    .td-dark {
      background-color: #e9e9e9;
    }

    .td-highlight {
      background-color: black;
      color: white;
    }

    .td-light {
      background-color: #f6f6f6;
    }

    td {
      white-space: nowrap;
    }

    .align-start {
      align-items: flex-start;
    }

    .align-end {
      align-items: flex-end;
    }

    .align-center {
      align-items: center;
    }
    .align-stretch {
      align-items: stretch;
    }
    .p-10{
      padding: 10px
    }
    
    .lds-dual-ring {
      display: inline-block;
      width: 50px;
      height: 50px;
    }
    .lds-dual-ring:after {
      content: " ";
      display: block;
      width: 50px;
      height: 50px;
      margin: 0px;
      border-radius: 50%;
      border: 2px solid #fff;
      border-color: #888 #ddd #888 #ddd;
      background-color: white;
      animation: lds-dual-ring 0.8s linear infinite;
    }

    .lds-dual-ring-lg {
      display: inline-block;
      width: 30px;
      height: 30px;
    }
    .lds-dual-ring-lg:after {
      content: " ";
      display: block;
      width: 30px;
      height: 30px;
      margin: 0px;
      border-radius: 50%;
      border: 3px solid #fff;
      border-color: #888 #ddd #888 #ddd;
      animation: lds-dual-ring 0.8s linear infinite;
    }

    .div-row-error {
      display: flex;
      justify-content: center;
      position: fixed;
      position: fixed;
      top: 0px;
      right: 0px;
      margin-top: 20px;
      margin-right: 20px;
      display: none;
      align-items:center;
      background-color: white;
      border: dashed 1px red;
      padding: 20px;
    }

    .div-row-error-message {
      color: red;
      padding: 5px;
      background-color: white;
      text-align: center;
    }

    .div-row-success {
      display: flex;
      justify-content: center;
      position: fixed;
      top: 0px;
      right: 0px;
      margin-top: 20px;
      margin-right: 20px;
      display: none;
      align-items:center;
      background-color: white;
      border: dashed 1px green;
      padding: 20px;
    }

    .div-row-success-message {
      color: green;
      padding: 5px;
      background-color: white;
      text-align: center;
    }

    .d-flex {
      display: flex;
    }

    .flex-col {
      flex-direction: column;
    }

    .flex-wrap {
      flex-wrap: wrap;
    }

    .justify-center {
      justify-content: center;
    }

    .justify-between {
      justify-content: space-between;
    }

    .justify-end {
      justify-content: flex-end;
    }

    .w-100-m-0 {
      width: 100%;
    }
    
    .mb-20 {
      margin-bottom: 20px;
    }
    
    .mt-20 {
      margin-top: 20px;
    }
    .mr-10 {
      margin-right: 10px;
    }
    
    .p-7 {
      padding: 7px
    }

    @keyframes lds-dual-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }  

    .hide {
      display: none;
    }

    .lb {
      width: 5%
    }
    .rb {
      width: 5%
    }

    @media (orientation: landscape) {

      .lb {
        width: 30%
      }
      .rb {
        width: 30%
      }

    }
    
    .progress-bar-complete {
      height: 20px;
      background-color: #123;
    }
    .progress-bar-finished {
      height: 20px;
      background-color: #115;
    }
    .progress-bar-incomplete {
      height: 20px;
      background-color: #555
    }

    .button-icon {
      pointer-events: none
    }
    
  `;
__decorate([
    property()
], SfIReporting.prototype, "apiId", void 0);
__decorate([
    property()
], SfIReporting.prototype, "projectid", void 0);
__decorate([
    property()
], SfIReporting.prototype, "projectname", void 0);
__decorate([
    property()
], SfIReporting.prototype, "configjson", void 0);
__decorate([
    property()
], SfIReporting.prototype, "prepopulateValJson", void 0);
__decorate([
    property()
], SfIReporting.prototype, "mode", void 0);
__decorate([
    property()
], SfIReporting.prototype, "flow", void 0);
__decorate([
    property()
], SfIReporting.prototype, "name", void 0);
__decorate([
    property()
], SfIReporting.prototype, "ignoreprojections", void 0);
__decorate([
    property()
], SfIReporting.prototype, "editdisable", void 0);
__decorate([
    property()
], SfIReporting.prototype, "usermap", void 0);
__decorate([
    property()
], SfIReporting.prototype, "formviewclass", void 0);
__decorate([
    query('.div-row-error')
], SfIReporting.prototype, "_SfRowError", void 0);
__decorate([
    query('.div-row-error-message')
], SfIReporting.prototype, "_SfRowErrorMessage", void 0);
__decorate([
    query('.div-row-success')
], SfIReporting.prototype, "_SfRowSuccess", void 0);
__decorate([
    query('.div-row-success-message')
], SfIReporting.prototype, "_SfRowSuccessMessage", void 0);
__decorate([
    query('.div-row-notif')
], SfIReporting.prototype, "_SfRowNotif", void 0);
__decorate([
    query('.div-row-notif-message')
], SfIReporting.prototype, "_SfRowNotifMessage", void 0);
__decorate([
    query('.loader-element')
], SfIReporting.prototype, "_SfLoader", void 0);
__decorate([
    query('.SfIReportingC')
], SfIReporting.prototype, "_SfIReportingC", void 0);
__decorate([
    query('#reporting-container')
], SfIReporting.prototype, "_SfReportingContainer", void 0);
__decorate([
    query('#reporting-container-short')
], SfIReporting.prototype, "_SfReportingContainerShort", void 0);
__decorate([
    query('#button-submit')
], SfIReporting.prototype, "_SfReportingButtonSubmit", void 0);
__decorate([
    query('#button-submit-confirm')
], SfIReporting.prototype, "_SfReportingButtonSubmitConfirm", void 0);
__decorate([
    query('#button-submit-cancel')
], SfIReporting.prototype, "_SfReportingButtonSubmitCancel", void 0);
__decorate([
    query('#button-edit')
], SfIReporting.prototype, "_SfReportingButtonEdit", void 0);
__decorate([
    query('#button-edit-cancel')
], SfIReporting.prototype, "_SfReportingButtonEditCancel", void 0);
__decorate([
    query('#button-delete')
], SfIReporting.prototype, "_SfReportingButtonDelete", void 0);
__decorate([
    query('#button-delete-cancel')
], SfIReporting.prototype, "_SfReportingButtonDeleteCancel", void 0);
__decorate([
    query('#button-delete-confirm')
], SfIReporting.prototype, "_SfReportingButtonDeleteConfirm", void 0);
__decorate([
    query('#button-new')
], SfIReporting.prototype, "_SfReportingButtonNew", void 0);
__decorate([
    query('#button-back')
], SfIReporting.prototype, "_SfReportingButtonBack", void 0);
__decorate([
    query('#decrypt-container')
], SfIReporting.prototype, "_SfDecryptContainer", void 0);
__decorate([
    query('#sf-i-project-decrypt')
], SfIReporting.prototype, "_SfDecryptProjectInput", void 0);
__decorate([
    query('#input-decrypt')
], SfIReporting.prototype, "_SfDecryptFileInput", void 0);
__decorate([
    query('#button-decrypt')
], SfIReporting.prototype, "_SfDecryptButton", void 0);
__decorate([
    property()
], SfIReporting.prototype, "decryptProjectId", void 0);
__decorate([
    property()
], SfIReporting.prototype, "decryptFileName", void 0);
SfIReporting = __decorate([
    customElement('sf-i-reporting')
], SfIReporting);
export { SfIReporting };
//# sourceMappingURL=sf-i-reporting.js.map