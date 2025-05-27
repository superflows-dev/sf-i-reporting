/**
 * @license
 * Copyright 2022 Superflow.dev
 * SPDX-License-Identifier: MIT
 */

import { LitElement, html, css, PropertyValueMap } from 'lit';
// import {customElement, query, queryAssignedElements, property} from 'lit/decorators.js';
import { customElement, query, property } from 'lit/decorators.js';
// import {customElement, query, property} from 'lit/decorators.js';
import Util from './util';
// import {LitElement, html, css} from 'lit';
// import {customElement} from 'lit/decorators.js';
import { DataObject, AddButtonObject, createDataObject, createAddButtonObject, isAddButtonObject } from './dataObjects';
import { SfIForm } from 'sf-i-form';
import { SfIBricks } from 'sf-i-bricks';
import { SfIUploader } from 'sf-i-uploader';
import { SfChecklist } from 'sf-checklist';
import { SfISelect } from 'sf-i-select';

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
@customElement('sf-i-reporting')
export class SfIReporting extends LitElement {
  @property()
  apiId: string = "";

  @property()
  apiIdUploader: string = "";

  @property()
  projectid: string = "";

  @property()
  projectname: string = "";

  @property()
  configjson: string = "[]";
  // configjson: string = "[{\"type\":\"sf-i-form\",\"size\":\"large\",\"label\":\"Tags\",\"hint\":\"Tags applied to notice\",\"id\":\"tags\",\"mode\":\"multiselect-dropdown\",\"apiid\":\"dnytrdlrmxgsy.cloudfront.net/tagging\",\"searchstring\":\"Tag\",\"selectprojection\":\"name\",\"ignoredprojections\":\"[&quot;updatetype&quot;,&quot;project&quot;,&quot;tagtype&quot;,&quot;shortid&quot;]\",\"maxselect\":\"100\",\"mandatory\":\"\"}]";
  // configjson: string = "[{\"type\":\"textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Prepared by\",\"hint\":\"Mention the names of people who participated in preparing this document\",\"id\":\"preparedby\",\"value\":\"prepared by test\",\"collapse\":\"true\"},{\"type\":\"textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Approved by\",\"hint\":\"Mention the names of people who participated in reviewing this document\",\"id\":\"approvedby\",\"value\":\"test approved by\",\"collapse\":\"true\"},{\"type\":\"textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Purpose\",\"hint\":\"This is a checklist for reporting the statutory internal audit results of the infection control program\",\"id\":\"purpose\",\"value\":\"test purpose\",\"collapse\":\"true\"},{\"type\":\"section\",\"name\":\"Compliance with Biomedical Waste Management Rules, 2016\",\"size\":\"\",\"label\":\"\",\"hint\":\"\",\"id\":\"section-0\",\"value\":\"\",\"collapse\":\"false\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Is the hospital registered with the State Pollution Control Board (SPCB) for biomedical waste management?\",\"hint\":\"\",\"id\":\"bmwspcb\",\"value\":[\"No\",\"\"],\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are biomedical waste segregation protocols (color-coded bins) in place and followed as per rules?\",\"hint\":\"\",\"id\":\"bmwcolorcoding\",\"value\":[\"Yes\",\"\"],\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are disposal records for biomedical waste maintained as required by law?\",\"hint\":\"\",\"id\":\"bmwdisposal\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Is there a valid agreement with an authorized biomedical waste disposal vendor?\",\"hint\":\"\",\"id\":\"bmwvendoragreement\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are healthcare staff trained in biomedical waste segregation and disposal protocols?\",\"hint\":\"\",\"id\":\"bmwtraining\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"section\",\"name\":\"Compliance with The Drugs and Cosmetics Act, 1940 (Infection Control Equipment and Materials)\",\"size\":\"\",\"label\":\"\",\"hint\":\"\",\"id\":\"section-1\",\"value\":\"\",\"collapse\":\"false\"},{\"type\":\"yesno+textarea\",\"options\":[\"option1\",\"option2\",\"option3\"],\"name\":\"\",\"size\":\"large\",\"label\":\"Are hand hygiene products (e.g., alcohol-based hand rubs) procured from licensed vendors as per statutory regulations?\",\"hint\":\"\",\"id\":\"hhvendors\",\"value\":[\"option2\",\"\"],\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are disinfectants, sterilants, and antiseptics used in the hospital in compliance with the Drugs and Cosmetics Act?\",\"hint\":\"\",\"id\":\"disinfectantsdca\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Is there a regular check on the expiration dates and quality standards of infection control materials?\",\"hint\":\"\",\"id\":\"expirycheck\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"section\",\"name\":\"Compliance with The Indian Epidemic Diseases Act, 1897 (Outbreak Management)\",\"size\":\"\",\"label\":\"\",\"hint\":\"\",\"id\":\"section-2\",\"value\":\"\",\"collapse\":\"false\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Is there a policy in place for managing infectious disease outbreaks in compliance with the Indian Epidemic Diseases Act?\",\"hint\":\"\",\"id\":\"outbreakpolicy\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are protocols in place for isolation, patient segregation, and reporting of notifiable diseases as per government directives?\",\"hint\":\"\",\"id\":\"diseasereporting\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are outbreak reports documented and communicated to relevant authorities (local health departments, as per law)?\",\"hint\":\"\",\"id\":\"outbreakreporting\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"section\",\"name\":\"Compliance with The Water (Prevention and Control of Pollution) Act, 1974 (Water Quality Monitoring)\",\"size\":\"\",\"label\":\"\",\"hint\":\"\",\"id\":\"section-3\",\"value\":\"\",\"collapse\":\"false\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Is the hospital water supply tested regularly for microbiological contaminants?\",\"hint\":\"\",\"id\":\"watertesting\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are there documented records of water quality reports, and are they in compliance with prescribed standards?\",\"hint\":\"\",\"id\":\"waterqualityreporting\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Is there an arrangement for safe water storage and waste-water disposal in line with statutory requirements?\",\"hint\":\"\",\"id\":\"waterstorage\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"section\",\"name\":\"Compliance with The Air (Prevention and Control of Pollution) Act, 1981 (Air Quality Management)\",\"size\":\"\",\"label\":\"\",\"hint\":\"\",\"id\":\"section-4\",\"value\":\"\",\"collapse\":\"false\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are air conditioning and ventilation systems in place that comply with regulatory standards, especially in critical areas like OTs and ICUs?\",\"hint\":\"\",\"id\":\"acinplace\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are air filters in the hospital HVAC systems cleaned or replaced as per environmental laws and infection control guidelines?\",\"hint\":\"\",\"id\":\"airfilters\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are regular air quality audits conducted, and are reports maintained?\",\"hint\":\"\",\"id\":\"airqualityaudits\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"section\",\"name\":\"Compliance with The Public Health Act (Surveillance and Reporting)\",\"size\":\"\",\"label\":\"\",\"hint\":\"\",\"id\":\"section-5\",\"value\":\"\",\"collapse\":\"false\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Is there a surveillance system for monitoring hospital-acquired infections (HAIs)?\",\"hint\":\"\",\"id\":\"haisurveillance\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are notifiable infections reported to local health authorities as per the law?\",\"hint\":\"\",\"id\":\"infectionreporting\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are infection surveillance records maintained, and are they in compliance with public health laws?\",\"hint\":\"\",\"id\":\"infectionsurveillance\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"section\",\"name\":\"Compliance with The Occupational Safety and Health Act (Workplace Safety)\",\"size\":\"\",\"label\":\"\",\"hint\":\"\",\"id\":\"section-6\",\"value\":\"\",\"collapse\":\"false\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are healthcare workers provided with adequate personal protective equipment (PPE) in line with statutory safety regulations?\",\"hint\":\"\",\"id\":\"ppeallocation\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Is there a needle stick and sharps injury prevention policy in place, and is it compliant with the OSHA guidelines?\",\"hint\":\"\",\"id\":\"safeipolicy\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are protocols for staff vaccination (e.g., Hepatitis B, Influenza) and post-exposure prophylaxis (PEP) established?\",\"hint\":\"\",\"id\":\"prophylaxis\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"section\",\"name\":\"Compliance with The Clinical Establishments (Registration and Regulation) Act, 2010 (General Infection Control Requirements)\",\"size\":\"\",\"label\":\"\",\"hint\":\"\",\"id\":\"section-7\",\"value\":\"\",\"collapse\":\"false\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Is the hospital registered under the Clinical Establishments Act, and does it meet the infection control standards prescribed?\",\"hint\":\"\",\"id\":\"registration\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are infection control protocols updated and audited regularly, as required by the Act?\",\"hint\":\"\",\"id\":\"hicprotocolsupdated\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are records of infection control compliance maintained and available for inspection by regulatory authorities?\",\"hint\":\"\",\"id\":\"compliancerecords\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"section\",\"name\":\"Compliance with Fire Safety Regulations (Infection Control During Emergency Evacuations)\",\"size\":\"\",\"label\":\"\",\"hint\":\"\",\"id\":\"section-8\",\"value\":\"\",\"collapse\":\"false\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are fire safety protocols in place that ensure infection control measures (e.g., patient isolation) during evacuations?\",\"hint\":\"\",\"id\":\"firesafetyprotocols\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are infection control materials (e.g., masks, gloves) readily available for use during fire drills or actual emergencies?\",\"hint\":\"\",\"id\":\"hicmaterials\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"section\",\"name\":\"Compliance with The National Health Mission Guidelines (Sanitation and Hygiene)\",\"size\":\"\",\"label\":\"\",\"hint\":\"\",\"id\":\"section-9\",\"value\":\"\",\"collapse\":\"false\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are the hospital’s sanitation practices in compliance with National Health Mission standards for hospital cleanliness and hygiene?\",\"hint\":\"\",\"id\":\"sanitizationpractices\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are there dedicated housekeeping protocols for the cleaning and disinfection of patient care areas as per government guidelines?\",\"hint\":\"\",\"id\":\"housekeepingprotocols\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are sanitation records maintained, and are they available for regulatory review?\",\"hint\":\"\",\"id\":\"sanitiziationrecords\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"section\",\"name\":\"Compliance with The Indian Council of Medical Research (ICMR) Guidelines (Antibiotic Stewardship)\",\"size\":\"\",\"label\":\"\",\"hint\":\"\",\"id\":\"section-10\",\"value\":\"\",\"collapse\":\"false\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Is the hospital following ICMR guidelines for antibiotic stewardship to prevent the development of antimicrobial resistance (AMR)?\",\"hint\":\"\",\"id\":\"icmramsguidelines\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are antibiotic use patterns monitored, and are they compliant with ICMR’s antimicrobial stewardship guidelines?\",\"hint\":\"\",\"id\":\"patternsmonitoring\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are periodic audits conducted to assess adherence to guidelines, and are the audit reports documented?\",\"hint\":\"\",\"id\":\"amsaudits\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"section\",\"name\":\"Compliance with The Indian Medical Council (Professional Conduct, Etiquette, and Ethics) Regulations, 2002\",\"size\":\"\",\"label\":\"\",\"hint\":\"\",\"id\":\"section-11\",\"value\":\"\",\"collapse\":\"false\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are healthcare workers adhering to professional conduct and ethical guidelines for infection prevention as prescribed by the Medical Council of India?\",\"hint\":\"\",\"id\":\"professionalconduct\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are there protocols in place to report unethical or unsafe infection control practices?\",\"hint\":\"\",\"id\":\"unethicalreporting\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"section\",\"name\":\"Compliance with Employee State Insurance (ESI) Act, 1948 (Healthcare Worker Safety)\",\"size\":\"\",\"label\":\"\",\"hint\":\"\",\"id\":\"section-12\",\"value\":\"\",\"collapse\":\"false\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are healthcare workers insured under the ESI scheme, particularly those involved in high-risk infection control activities?\",\"hint\":\"\",\"id\":\"esiinsured\",\"value\":\"\",\"collapse\":\"true\"},{\"type\":\"yesno+textarea\",\"name\":\"\",\"size\":\"large\",\"label\":\"Are there protocols for compensation in case of occupational hazards (e.g., infections contracted at work)?\",\"hint\":\"\",\"id\":\"compensationprotocols\",\"value\":\"\",\"collapse\":\"true\"}]";
  // configjson: string = "[{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Prepared by\",\"hint\":\"Mention the names of people who participated in preparing this document\",\"id\":\"preparedby\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Approved by\",\"hint\":\"Mention the names of people who participated in reviewing this document\",\"id\":\"approvedby\"},[{\"type\":\"itemname\",\"name\":\"External Reporting Agency\"},{\"type\":\"textarea\",\"size\":\"small\",\"label\":\"Name\",\"hint\":\"State the name of the agency\",\"id\":\"name{iter}\"},{\"type\":\"textarea\",\"size\":\"small\",\"label\":\"Type\",\"hint\":\"State the type of the agency such as government (local, state, nationa), private, educational institute, etc.\",\"id\":\"type{iter}\"},{\"type\":\"textarea\",\"size\":\"small\",\"label\":\"Contact Person\",\"hint\":\"Name of the contact person\",\"id\":\"contact-person{iter}\"},{\"type\":\"textarea\",\"size\":\"small\",\"label\":\"Phone Number\",\"hint\":\"Phone number of the contact person\",\"id\":\"contact-phone{iter}\"},{\"type\":\"textarea\",\"size\":\"small\",\"label\":\"Email\",\"hint\":\"Email address of the contact person\",\"id\":\"contact-email{iter}\"},{\"type\":\"textarea\",\"size\":\"small\",\"label\":\"Reporting Method\",\"hint\":\"Method of reporting such as online/email/phone/fax, etc.\",\"id\":\"reporting-method{iter}\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Role\",\"hint\":\"When to report for e.g. report local outbreak and infection trends, national reporting of infection control and outbreaks, global disease surveillance, response coordination, state-level outbreak and epidemic reporting\",\"id\":\"role{iter}\"}]]";
  // configjson: string = "[{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Prepared by\",\"hint\":\"Mention the names of people who participated in preparing this document\",\"id\":\"preparedby\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Approved by\",\"hint\":\"Mention the names of people who participated in reviewing this document\",\"id\":\"approvedby\"},{\"type\":\"section\",\"name\":\"Program Structure\"},{\"type\":\"subsection\",\"name\":\"Infection Control Committee\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Responsibilities\",\"hint\":\"Briefly outline the responsibilities of the infection control committee\",\"id\":\"iccresponsibilities\"},[{\"type\":\"committeemember\",\"name\":\"Committee Member\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Role\",\"hint\":\"Infection Control Officer (ICO), Infection Control Nurses (ICN), Microbiologist, Nursing heads, Representatives from key departments (Surgery, Medicine, Housekeeping, CSSD, etc.)\",\"id\":\"iccstructurerole{iter}\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Responsibilities\",\"hint\":\"Oversee all infection control activities, review infection surveillance data and action plans, ensure compliance, etc.\",\"id\":\"iccstructureresponsibilities{iter}\"}],{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Meetings\",\"hint\":\"Meeting frequency, minimum quorum requirements, agenda\",\"id\":\"iccmeetings\"},{\"type\":\"subsection\",\"name\":\"Infection Control Team\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Responsibilities\",\"hint\":\"Briefly outline the responsibilities of the infection control team\",\"id\":\"ictresponsibilities\"},[{\"type\":\"teammember\",\"name\":\"Team Member\",\"direction\":\"row\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Role\",\"hint\":\"Infection Control Officer (ICO), Infection Control Nurses (ICN), Microbiologist, Admin Rep., Housekeeping Rep., CSSD Rep., Pharmacist, Engineering Rep., IT Rep.\",\"id\":\"ictstructurerole{iter}\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Responsibilities\",\"hint\":\"Day-to-day monitoring of infection control practices, ensure compliance with guidelines for high-risk areas (e.g., ICUs, OTs), coordinate with the ICC for feedback and updates, etc.\",\"id\":\"ictstructureresponsibilities{iter}\"}],{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Meetings\",\"hint\":\"Meeting frequency, minimum quorum requirements, agenda\",\"id\":\"ictmeetings\"},{\"type\":\"section\",\"name\":\"Aims & Objectives\"},{\"type\":\"subsection\",\"name\":\"Aims\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Aims\",\"hint\":\"Briefly outline the aims of the infection control programme\",\"id\":\"aims\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Objectives\",\"hint\":\"Precisely define the objectives including quantified targets wherever possible. For e.g. target to reduce HAIs by 20% annually, achieve 95% compliance with hand hygiene protocols across all departments.\",\"id\":\"aims\"},{\"type\":\"section\",\"name\":\"Infection Control Processes\"},{\"type\":\"subsection\",\"name\":\"Hand Hygiene\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Hand Hygiene Policies\",\"hint\":\"Summarize and reference the policies that are defined for hand hygiene\",\"id\":\"hhpolicies\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Hand Hygiene SOPs\",\"hint\":\"Summarize and reference the SOPs that are developed, maintained and released for hand hygiene\",\"id\":\"hhsops\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Hand Hygiene Monitoring\",\"hint\":\"Outline data parameters, methods and quality indicators for monitoring hand hygiene\",\"id\":\"hhmonitoring\"},{\"type\":\"subsection\",\"name\":\"Personal Protective Equipment (PPE)\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"PPE Usage Policies\",\"hint\":\"Summarize and reference the policies that are defined for the indications and usage of PPE for transmission-based precautions\",\"id\":\"ppepolicies\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"PPE Usage SOPs\",\"hint\":\"Summarize and reference the SOPs that are developed, maintained and released for the appropriate usage of PPE in various situations\",\"id\":\"ppesops\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"PPE Usage Monitoring\",\"hint\":\"Outline data parameters, methods and quality indicators for monitoring the usage of PPE\",\"id\":\"ppemonitoring\"},{\"type\":\"subsection\",\"name\":\"Housekeeping\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Cleaning Protocols\",\"hint\":\"Summarize the cleaning protocols for various areas such as OTs, wards, public areas including toilets, corridors including environment, fixtures, fomites, furniture, furnishings, equipments, etc. Protocols should be appropriately designed for high-touch and low-touch areas.\",\"id\":\"hkcleaning\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Dilution Protocols\",\"hint\":\"Summarize the cleaning protocols for approved disinfectants for cleaning in various areas such as OTs, wards, public areas including toilets, corridors including environment, fixtures, fomites, furniture, furnishings, equipments, etc. Protocols should be appropriately designed for high-touch and low-touch areas.\",\"id\":\"hkdilution\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Housekeeping Monitoring\",\"hint\":\"Outline data parameters, methods and quality indicators for monitoring the housekeeping activities in various areas such as OTs, wards, public areas including toilets, corridors including environment, fixtures, fomites, furniture, furnishings, equipments, etc. Include regular checks for surface cleanliness, air quality, water quality, etc.\",\"id\":\"hkmonitoring\"},{\"type\":\"subsection\",\"name\":\"CSSD\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"CSSD Design\",\"hint\":\"Summarise the CSSD design requirements including space requirements, location requirements, layouting and unidirectional flow zoning requirements, separate areas for receiving, washing, cleaning, packing, sterilization, sterile storage & issue and the separation of clean and dirty areas\",\"id\":\"cssddesign\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"CSSD Procedures\",\"hint\":\"Summarise and reference the procedures for cleaning, packing, disinfection and sterilization. Also include the use of flash sterilization and the usage of Spaulding's classification\",\"id\":\"cssdprocedures\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"CSSD Validation Tests\",\"hint\":\"Summarise and reference the usage, frequency and methodologies of validation tests including physical, chemical, biological and engineering tests for sterilization effectiveness\",\"id\":\"cssdvalidation\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Reuse and recall\",\"hint\":\"Summarise the indications, guidelines and procedures for instrument reuse including the policy of patient intimation. Also include the summary of recall procedures post breakdown for non-functional equipments/devices.\",\"id\":\"cssdreuserecall\"},{\"type\":\"subsection\",\"name\":\"Biomedical Waste Management\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Segregation & Transfer Procedures\",\"hint\":\"Summarise and reference the procedures for segregation, collection, storage, handling and the use of color codings. Also include the procedure for handover and transfer of biomedical waste to the approved vendor for disposal.\",\"id\":\"bmwsegregation\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Statutory Provisions\",\"hint\":\"Summarize the statutory provisions of biomedical waste management that are applicable to your hospital\",\"id\":\"bmwstatutory\"},{\"type\":\"subsection\",\"name\":\"Staff Infections Prevention\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Statutory Requirements\",\"hint\":\"Summarize the statutory requirements for staff immunization including the hospital policies.\",\"id\":\"staffstatutory\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Staff Infections Reporting\",\"hint\":\"Identify transmissible infections important for staff to report (such as acute conjunctivitis, chickenpox, acute respiratory infections, smear-positive tuberculosis, etc.) and summarize the reporting procedure.\",\"id\":\"staffinfectionreporting\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Work Restrictions\",\"hint\":\"Summarize the guidelines for work restrictions (limiting roles & responsibilities) for infected staff\",\"id\":\"staffworkrestrictions\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Prophylaxis\",\"hint\":\"Summarize the indications and procedures for giving pre and post exposure prophylaxis to staff\",\"id\":\"staffprophylaxis\"},{\"type\":\"subsection\",\"name\":\"Safe Injection & Infusion Practices\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Medication Practices\",\"hint\":\"Summarize the policies and procedures for safe medication practices including single-dose vials, multi-dose vials\",\"id\":\"safeimedication\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Injection Practices\",\"hint\":\"Summarize the policies and procedures for safe injection practices including preparation, labeling and administration practices\",\"id\":\"safeiinjection\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Sharps Injury Prevention\",\"hint\":\"Summarize the policies and procedures for sharps injury prevention\",\"id\":\"safeiinjuryprevention\"},{\"type\":\"subsection\",\"name\":\"Antimicrobial Stewardship\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Clinical Conditions Identification\",\"hint\":\"Summarize the identified clinical conditions for using antimicrobials including antifungals, antibiotics, antivirals and antiparasites from the pov of antimicrobial agent, monotherapy vs combination therapy, escalaction & de-escalation of therapy and dose & duration of therapy\",\"id\":\"amsclinicalconditions\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Susceptibility Monitoring\",\"hint\":\"Summarize the identified system of monitoring antimicrobial susceptibility\",\"id\":\"amssusceptibility\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Antimicrobial Usage Policy\",\"hint\":\"Summarize the animicrobial usage policy including the frequency of reviewing this policy\",\"id\":\"amsusagepolicy\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Antimicrobial Stewardship Committee\",\"hint\":\"Outline the structure, roles and responsibilities of the antimicrobial stewardship committee structure\",\"id\":\"amsstewardshipcommittee\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Antimicrobial Workflows\",\"hint\":\"Summarize the procedures for antimicrobial workflows such ordering, prescriptions and usages\",\"id\":\"amsworkflows\"},{\"type\":\"subsection\",\"name\":\"Renovation & New Construction\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Risk Assessment\",\"hint\":\"Summarize the risk assessment methodology and the tool for conducting risk assessment of infection control during renovation & new construction\",\"id\":\"rncriskassessment\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Inclusion From Design\",\"hint\":\"Summarize the policy of including infection control and the involvement of infection control team since the design stages of any renovation & new construction project\",\"id\":\"rncriskassessment\"},{\"type\":\"subsection\",\"name\":\"Healthcare Associated Infections\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Care Bundles\",\"hint\":\"Summarize the care bundles developed for prevent CAUTIs, VAPs, SSI, CLABSIs\",\"id\":\"haicarebundles\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Monitoring\",\"hint\":\"Summarize the monitoring frequencies and methdologies for HAIs\",\"id\":\"haimonitoring\"},{\"type\":\"subsection\",\"name\":\"Dietary Services & Kitchen\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Statutory Requirements\",\"hint\":\"Summarize the statutory requirements for kitchen & dietary services\",\"id\":\"dskstatutory\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Design Requirements\",\"hint\":\"Summarize the design requirements of kitchen & dietary services including layout, traffic-flow, prevention of criss-cross traffic, sequence of activities. Also include separate dedicated food preparation areas\",\"id\":\"dskriskassessment\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Workers Screening\",\"hint\":\"Summarize the policies & procedures for screening kitchen workers and food handlers\",\"id\":\"dskscreening\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Hygienic Preparation, Storage & Distribution of Food\",\"hint\":\"Summarize the policies & procedures for hygiene measures such as storage of food off the floor, separation in storage of cleaning supplies and food, separate dedicated food preparation areas, identification of measures to prevent flies & insects to come in contact with prepared/stored food. Also include safe preparation, handling, storage & distribution procedures encompassing the temperatures for food distribution as well\",\"id\":\"dskhygiene\"},{\"type\":\"subsection\",\"name\":\"Laundry & Linen Management\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Procedures\",\"hint\":\"Summarize the policies & procedures for linen change, handling (patient-care, transport to laundry, inside laundry), storage of clean linen, separation of clean & dirty linen, distribution of clean linen. Also include controls to ensure infection prevention & control when laundry management is outsourced\",\"id\":\"llmprocedures\"},{\"type\":\"section\",\"name\":\"Surveillance\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Infection Surveillance\",\"hint\":\"Include surveillance of hospital-acquired infections (VAP, CLABSI, CAUTI, SSIs), define frequency and methodology for collecting infection data from different units (ICU, OT, general wards), surveillance tools and weekly and monthly review of infection trends and risk factors.\",\"id\":\"surveillanceinfections\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Antimicrobial Surveillance\",\"hint\":\"Include regular audits of antimicrobial prescriptions and usage, surveillance of resistance patterns in the hospital, frequency of reports to the Antimicrobial Stewardship Committee.\",\"id\":\"surveillanceantimicrobial\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Environmental Surveillance\",\"hint\":\"Include surface sampling such as regular swabs and testing of high-touch surfaces (ICUs, OT, isolation rooms), air quality monitoring of air handling units and conducting air sampling in critical care areas, water quality testing of RO water in dialysis units for endotoxin levels.\",\"id\":\"surveillanceenvironment\"},{\"type\":\"section\",\"name\":\"Inventory Management\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Inventory Policies\",\"hint\":\"Summarize and reference the policies that define the expected stock levels of various equipments, devices & materials used in the infection control program for hand hygiene, PPE, biomedical waste management, CSSD, pre & post exposure prophylaxis, safe injection & infusions, isolation & barrier nursing, housekeeping, etc.\",\"id\":\"inventorypolicy\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Availability Policies\",\"hint\":\"Summarize and reference the policies that define the distribution and expected availability levels across different hospital zones for various equipments, devices & materials used in the infection control program for hand hygiene, PPE, biomedical waste management, CSSD, pre & post exposure prophylaxis, safe injection & infusions, isolation & barrier nursing, housekeeping, etc.\",\"id\":\"availabilitypolicy\"},{\"type\":\"section\",\"name\":\"Trainings\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Training Policies\",\"hint\":\"Summarize and reference the staff training policies for standard precautions, hand hygiene, PPE usage, antimicrobial stewardship, safe injection & infusion practices, housekeeping, laundry & linen management, biomedical waste management, care bundles for HAI preventions, CSSD operations, reuse and recalls, etc.\",\"id\":\"trainingpolicy\"},{\"type\":\"section\",\"name\":\"Audits\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Audit Policies\",\"hint\":\"Summarize and reference the audit policies for standard precautions, hand hygiene, PPE usage, antimicrobial stewardship, safe injection & infusion practices, housekeeping, laundry & linen management, biomedical waste management, care bundles for HAI preventions, CSSD operations, reuse and recalls, etc. Include the methodology, frequency, etc.\",\"id\":\"auditpolicy\"},{\"type\":\"section\",\"name\":\"Quality\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Quality Policies\",\"hint\":\"Summarize and reference the quality policies for material, equipments and devices used in the infection control program, including the expected standards and benchmarks. For PPE, hand hygiene, isolation & barrier nursing, safe injection & infusion, air-conditioning, water supply, housekeeping, biomedical waste, linen management, kitchen & dietary services, CSSD, etc.\",\"id\":\"qualitypolicy\"},{\"type\":\"section\",\"name\":\"Vendor Selection\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Vendor Selection Policies\",\"hint\":\"Summarize and reference the vendor selection policies for material, equipments and devices used in the infection control program, including the qualification criteria, delivery schedules and agreement clauses. For PPE, hand hygiene, isolation & barrier nursing, safe injection & infusion, air-conditioning, water supply, housekeeping, biomedical waste management, linen management, kitchen & dietary services, CSSD, etc.\",\"id\":\"vendorselectionpolicy\"},{\"type\":\"section\",\"name\":\"Maintenance\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Maintenance Policies\",\"hint\":\"Summarize and reference the maintenance policies for equipments and facilities used in the infection control program, including the routine, contractual and breakdown maintenance activities. For PPE, hand hygiene, isolation & barrier nursing, safe injection & infusion, air-conditioning, water supply, housekeeping, biomedical waste, linen management, kitchen & dietary services, CSSD, etc.\",\"id\":\"maintenancepolicy\"}]";
  // configjson: string = "[{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Prepared by\",\"hint\":\"Mention the names of people who participated in preparing this document\",\"id\":\"preparedby\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Approved by\",\"hint\":\"Mention the names of people who participated in reviewing this document\",\"id\":\"approvedby\"},{\"type\":\"textarea\",\"size\":\"large\",\"label\":\"Purpose\",\"hint\":\"This is a checklist for reporting the statutory internal audit results of the infection control program\",\"id\":\"purpose\"},{\"type\":\"section\",\"name\":\"Compliance with Biomedical Waste Management Rules, 2016\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Is the hospital registered with the State Pollution Control Board (SPCB) for biomedical waste management?\",\"hint\":\"\",\"id\":\"bmwspcb\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are biomedical waste segregation protocols (color-coded bins) in place and followed as per rules?\",\"hint\":\"\",\"id\":\"bmwcolorcoding\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are disposal records for biomedical waste maintained as required by law?\",\"hint\":\"\",\"id\":\"bmwdisposal\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Is there a valid agreement with an authorized biomedical waste disposal vendor?\",\"hint\":\"\",\"id\":\"bmwvendoragreement\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are healthcare staff trained in biomedical waste segregation and disposal protocols?\",\"hint\":\"\",\"id\":\"bmwtraining\"},{\"type\":\"section\",\"name\":\"Compliance with The Drugs and Cosmetics Act, 1940 (Infection Control Equipment and Materials)\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are hand hygiene products (e.g., alcohol-based hand rubs) procured from licensed vendors as per statutory regulations?\",\"hint\":\"\",\"id\":\"hhvendors\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are disinfectants, sterilants, and antiseptics used in the hospital in compliance with the Drugs and Cosmetics Act?\",\"hint\":\"\",\"id\":\"disinfectantsdca\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Is there a regular check on the expiration dates and quality standards of infection control materials?\",\"hint\":\"\",\"id\":\"expirycheck\"},{\"type\":\"section\",\"name\":\"Compliance with The Indian Epidemic Diseases Act, 1897 (Outbreak Management)\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Is there a policy in place for managing infectious disease outbreaks in compliance with the Indian Epidemic Diseases Act?\",\"hint\":\"\",\"id\":\"outbreakpolicy\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are protocols in place for isolation, patient segregation, and reporting of notifiable diseases as per government directives?\",\"hint\":\"\",\"id\":\"diseasereporting\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are outbreak reports documented and communicated to relevant authorities (local health departments, as per law)?\",\"hint\":\"\",\"id\":\"outbreakreporting\"},{\"type\":\"section\",\"name\":\"Compliance with The Water (Prevention and Control of Pollution) Act, 1974 (Water Quality Monitoring)\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Is the hospital water supply tested regularly for microbiological contaminants?\",\"hint\":\"\",\"id\":\"watertesting\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are there documented records of water quality reports, and are they in compliance with prescribed standards?\",\"hint\":\"\",\"id\":\"waterqualityreporting\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Is there an arrangement for safe water storage and waste-water disposal in line with statutory requirements?\",\"hint\":\"\",\"id\":\"waterstorage\"},{\"type\":\"section\",\"name\":\"Compliance with The Air (Prevention and Control of Pollution) Act, 1981 (Air Quality Management)\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are air conditioning and ventilation systems in place that comply with regulatory standards, especially in critical areas like OTs and ICUs?\",\"hint\":\"\",\"id\":\"acinplace\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are air filters in the hospital HVAC systems cleaned or replaced as per environmental laws and infection control guidelines?\",\"hint\":\"\",\"id\":\"airfilters\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are regular air quality audits conducted, and are reports maintained?\",\"hint\":\"\",\"id\":\"airqualityaudits\"},{\"type\":\"section\",\"name\":\"Compliance with The Public Health Act (Surveillance and Reporting)\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Is there a surveillance system for monitoring hospital-acquired infections (HAIs)?\",\"hint\":\"\",\"id\":\"haisurveillance\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are notifiable infections reported to local health authorities as per the law?\",\"hint\":\"\",\"id\":\"infectionreporting\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are infection surveillance records maintained, and are they in compliance with public health laws?\",\"hint\":\"\",\"id\":\"infectionsurveillance\"},{\"type\":\"section\",\"name\":\"Compliance with The Occupational Safety and Health Act (Workplace Safety)\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are healthcare workers provided with adequate personal protective equipment (PPE) in line with statutory safety regulations?\",\"hint\":\"\",\"id\":\"ppeallocation\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Is there a needle stick and sharps injury prevention policy in place, and is it compliant with the OSHA guidelines?\",\"hint\":\"\",\"id\":\"safeipolicy\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are protocols for staff vaccination (e.g., Hepatitis B, Influenza) and post-exposure prophylaxis (PEP) established?\",\"hint\":\"\",\"id\":\"prophylaxis\"},{\"type\":\"section\",\"name\":\"Compliance with The Clinical Establishments (Registration and Regulation) Act, 2010 (General Infection Control Requirements)\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Is the hospital registered under the Clinical Establishments Act, and does it meet the infection control standards prescribed?\",\"hint\":\"\",\"id\":\"registration\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are infection control protocols updated and audited regularly, as required by the Act?\",\"hint\":\"\",\"id\":\"hicprotocolsupdated\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are records of infection control compliance maintained and available for inspection by regulatory authorities?\",\"hint\":\"\",\"id\":\"compliancerecords\"},{\"type\":\"section\",\"name\":\"Compliance with Fire Safety Regulations (Infection Control During Emergency Evacuations)\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are fire safety protocols in place that ensure infection control measures (e.g., patient isolation) during evacuations?\",\"hint\":\"\",\"id\":\"firesafetyprotocols\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are infection control materials (e.g., masks, gloves) readily available for use during fire drills or actual emergencies?\",\"hint\":\"\",\"id\":\"hicmaterials\"},{\"type\":\"section\",\"name\":\"Compliance with The National Health Mission Guidelines (Sanitation and Hygiene)\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are the hospital’s sanitation practices in compliance with National Health Mission standards for hospital cleanliness and hygiene?\",\"hint\":\"\",\"id\":\"sanitizationpractices\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are there dedicated housekeeping protocols for the cleaning and disinfection of patient care areas as per government guidelines?\",\"hint\":\"\",\"id\":\"housekeepingprotocols\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are sanitation records maintained, and are they available for regulatory review?\",\"hint\":\"\",\"id\":\"sanitiziationrecords\"},{\"type\":\"section\",\"name\":\"Compliance with The Indian Council of Medical Research (ICMR) Guidelines (Antibiotic Stewardship)\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Is the hospital following ICMR guidelines for antibiotic stewardship to prevent the development of antimicrobial resistance (AMR)?\",\"hint\":\"\",\"id\":\"icmramsguidelines\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are antibiotic use patterns monitored, and are they compliant with ICMR’s antimicrobial stewardship guidelines?\",\"hint\":\"\",\"id\":\"patternsmonitoring\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are periodic audits conducted to assess adherence to guidelines, and are the audit reports documented?\",\"hint\":\"\",\"id\":\"amsaudits\"},{\"type\":\"section\",\"name\":\"Compliance with The Indian Medical Council (Professional Conduct, Etiquette, and Ethics) Regulations, 2002\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are healthcare workers adhering to professional conduct and ethical guidelines for infection prevention as prescribed by the Medical Council of India?\",\"hint\":\"\",\"id\":\"professionalconduct\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are there protocols in place to report unethical or unsafe infection control practices?\",\"hint\":\"\",\"id\":\"unethicalreporting\"},{\"type\":\"section\",\"name\":\"Compliance with Employee State Insurance (ESI) Act, 1948 (Healthcare Worker Safety)\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are healthcare workers insured under the ESI scheme, particularly those involved in high-risk infection control activities?\",\"hint\":\"\",\"id\":\"esiinsured\"},{\"type\":\"yesno+textarea\",\"size\":\"small\",\"label\":\"Are there protocols for compensation in case of occupational hazards (e.g., infections contracted at work)?\",\"hint\":\"\",\"id\":\"compensationprotocols\"}]";
  // configjson: string = "[{\"type\":\"sf-i-uploader\",\"size\":\"large\",\"label\":\"Contract Document *\",\"hint\":\"Document of the contract\",\"id\":\"contractdocuments\",\"mode\":\"multiselect-dropdown\",\"apiid\":\"1peg5170d3\",\"allowedextensions\":\"[&quot;jpg&quot;,&quot;png&quot;,&quot;pdf&quot;,&quot;xls&quot;,&quot;xlsx&quot;,&quot;doc&quot;,&quot;docx&quot;]\",\"extract\":\"yes\",\"maxselect\":\"1\",\"maxsize\":\"5242880\",\"allowdownload\":\"yes\",\"mandatory\":\"\",\"displayinhistory\":\"yes\"},{\"type\":\"textarea\",\"size\":\"small\",\"label\":\"Contract Reference No. *\",\"hint\":\"Contract reference number\",\"id\":\"refno\",\"mandatory\":\"\",\"copytoreopen\":\"yes\",\"displayinhistory\":\"yes\"},{\"type\":\"date\",\"size\":\"large\",\"label\":\"Date of Execution *\",\"hint\":\"The date of execution of the contract\",\"id\":\"dateofexecution\",\"mandatory\":\"\",\"copytoreopen\":\"yes\",\"displayinhistory\":\"yes\"},{\"type\":\"date\",\"size\":\"large\",\"label\":\"Date of Expiry *\",\"hint\":\"The date on which the contract expires.\",\"id\":\"dateofexpiry\",\"mandatory\":\"\",\"copytoreopen\":\"yes\",\"displayinhistory\":\"yes\"},{\"type\":\"date\",\"size\":\"large\",\"label\":\"Date of Renewal *\",\"hint\":\"The date on which the contract renews.\",\"id\":\"dateofrenewal\",\"mandatory\":\"\",\"copytoreopen\":\"yes\",\"displayinhistory\":\"yes\"},{\"type\":\"date\",\"size\":\"large\",\"label\":\"Due Date *\",\"hint\":\"The due date for the contract.\",\"id\":\"duedate\",\"mandatory\":\"\",\"copytoreopen\":\"yes\",\"displayinhistory\":\"yes\"},{\"type\":\"textarea\",\"size\":\"small\",\"label\":\"Contract Term *\",\"hint\":\"Term / Tenure of the contract\",\"id\":\"tenure\",\"mandatory\":\"\",\"copytoreopen\":\"yes\",\"displayinhistory\":\"yes\"},{\"type\":\"textarea\",\"size\":\"small\",\"label\":\"Party - 1 *\",\"hint\":\"Name of the Party - 1\",\"id\":\"party1\",\"mandatory\":\"\",\"copytoreopen\":\"yes\",\"displayinhistory\":\"yes\"},{\"type\":\"textarea\",\"size\":\"small\",\"label\":\"Party - 2 *\",\"hint\":\"Name of the Party - 2\",\"id\":\"party2\",\"mandatory\":\"\",\"copytoreopen\":\"yes\",\"displayinhistory\":\"yes\"},{\"type\":\"textarea\",\"size\":\"small\",\"label\":\"Party - 3\",\"hint\":\"Name of the Party - 3\",\"id\":\"party3\",\"copytoreopen\":\"yes\",\"displayinhistory\":\"yes\"},{\"type\":\"sf-i-bricks\",\"size\":\"large\",\"label\":\"Country *\",\"hint\":\"Country for contract\",\"id\":\"country\",\"mode\":\"select\",\"savenameseparate\":\"yes\",\"maxselect\":\"1\",\"mandatory\":\"\",\"copytoreopen\":\"yes\",\"displayinhistory\":\"yes\"},{\"type\":\"sf-i-bricks\",\"size\":\"large\",\"label\":\"Entity *\",\"hint\":\"Entity for contract\",\"id\":\"entity\",\"dependencies\":[\"country\"],\"mode\":\"select\",\"savenameseparate\":\"yes\",\"maxselect\":\"1\",\"mandatory\":\"\",\"copytoreopen\":\"yes\"},{\"type\":\"sf-i-bricks\",\"size\":\"large\",\"label\":\"Locations *\",\"hint\":\"Locations for contract\",\"id\":\"locations\",\"dependencies\":[\"country\",\"entity\"],\"mode\":\"multiselect\",\"mandatory\":\"\",\"copytoreopen\":\"yes\"},{\"type\":\"sf-i-bricks\",\"size\":\"large\",\"label\":\"Tags *\",\"hint\":\"Tags applied to contract\",\"id\":\"tags\",\"mode\":\"multiselect\",\"dependencies\":[\"country\",\"entity\",\"locations\"],\"searchstring\":\"-Tags\",\"mandatory\":\"\",\"copytoreopen\":\"yes\"},{\"type\":\"sf-i-form\",\"size\":\"large\",\"label\":\"Reporter *\",\"hint\":\"Reporter for the contract\",\"id\":\"reporters\",\"mode\":\"multiselect-dropdown\",\"apiid\":\"dnytrdlrmxgsy.cloudfront.net/userprofile\",\"searchstring\":\"\",\"selectprojection\":\"name\",\"ignoredprojections\":\"[&quot;usermap&quot;,&quot;designation&quot;,&quot;project&quot;,&quot;updatetype&quot;,&quot;userid&quot;,&quot;shortid&quot;,&quot;kra&quot;,&quot;role&quot;,&quot;trainingstatute&quot;,&quot;shortnumid&quot;,&quot;lastmodifiedby&quot;,&quot;lastmodifiedtime&quot;]\",\"maxselect\":\"1\",\"mandatory\":\"\",\"copytoreopen\":\"yes\",\"displayinhistory\":\"yes\"},{\"type\":\"sf-i-form\",\"size\":\"large\",\"label\":\"Approver *\",\"hint\":\"Approver for the contract\",\"id\":\"approvers\",\"mode\":\"multiselect-dropdown\",\"apiid\":\"dnytrdlrmxgsy.cloudfront.net/userprofile\",\"searchstring\":\"\",\"selectprojection\":\"name\",\"ignoredprojections\":\"[&quot;usermap&quot;,&quot;designation&quot;,&quot;project&quot;,&quot;updatetype&quot;,&quot;userid&quot;,&quot;shortid&quot;,&quot;kra&quot;,&quot;role&quot;,&quot;trainingstatute&quot;,&quot;shortnumid&quot;,&quot;lastmodifiedby&quot;,&quot;lastmodifiedtime&quot;]\",\"maxselect\":\"1\",\"mandatory\":\"\",\"copytoreopen\":\"yes\",\"displayinhistory\":\"yes\"},{\"type\":\"sf-i-form\",\"size\":\"large\",\"label\":\"Function head *\",\"hint\":\"Function head for the Contract\",\"id\":\"functionheads\",\"mode\":\"multiselect-dropdown\",\"apiid\":\"dnytrdlrmxgsy.cloudfront.net/userprofile\",\"searchstring\":\"\",\"selectprojection\":\"name\",\"ignoredprojections\":\"[&quot;usermap&quot;,&quot;designation&quot;,&quot;project&quot;,&quot;updatetype&quot;,&quot;userid&quot;,&quot;shortid&quot;,&quot;kra&quot;,&quot;role&quot;,&quot;trainingstatute&quot;,&quot;shortnumid&quot;,&quot;lastmodifiedby&quot;,&quot;lastmodifiedtime&quot;]\",\"maxselect\":\"1\",\"mandatory\":\"\",\"copytoreopen\":\"yes\",\"displayinhistory\":\"yes\"},{\"type\":\"sf-i-form\",\"size\":\"large\",\"label\":\"Auditor *\",\"hint\":\"Auditor for the Contract\",\"id\":\"auditors\",\"mode\":\"multiselect-dropdown\",\"apiid\":\"dnytrdlrmxgsy.cloudfront.net/userprofile\",\"searchstring\":\"\",\"selectprojection\":\"name\",\"ignoredprojections\":\"[&quot;usermap&quot;,&quot;designation&quot;,&quot;project&quot;,&quot;updatetype&quot;,&quot;userid&quot;,&quot;shortid&quot;,&quot;kra&quot;,&quot;role&quot;,&quot;trainingstatute&quot;,&quot;shortnumid&quot;,&quot;lastmodifiedby&quot;,&quot;lastmodifiedtime&quot;]\",\"maxselect\":\"1\",\"mandatory\":\"\",\"copytoreopen\":\"yes\",\"displayinhistory\":\"yes\"},{\"type\":\"sf-i-form\",\"size\":\"large\",\"label\":\"Viewer *\",\"hint\":\"Viewer for the contract\",\"id\":\"viewers\",\"mode\":\"multiselect-dropdown\",\"apiid\":\"dnytrdlrmxgsy.cloudfront.net/userprofile\",\"searchstring\":\"\",\"selectprojection\":\"name\",\"ignoredprojections\":\"[&quot;usermap&quot;,&quot;designation&quot;,&quot;project&quot;,&quot;updatetype&quot;,&quot;userid&quot;,&quot;shortid&quot;,&quot;kra&quot;,&quot;role&quot;,&quot;trainingstatute&quot;,&quot;shortnumid&quot;,&quot;lastmodifiedby&quot;,&quot;lastmodifiedtime&quot;]\",\"maxselect\":\"1\",\"mandatory\":\"\",\"copytoreopen\":\"yes\",\"displayinhistory\":\"yes\"},{\"type\":\"sf-i-select\",\"size\":\"large\",\"label\":\"Contract Type *\",\"apiid\":\"dwqyez2puoxmu.cloudfront.net/contracttype\",\"hint\":\"Type of the Contract\",\"id\":\"contracttype\",\"mandatory\":\"\",\"copytoreopen\":\"yes\",\"displayinhistory\":\"yes\"},{\"type\":\"textarea\",\"size\":\"small\",\"label\":\"Context\",\"hint\":\"Context of the contract\",\"id\":\"context\",\"copytoreopen\":\"yes\",\"displayinhistory\":\"yes\"},{\"type\":\"textarea\",\"size\":\"small\",\"label\":\"Remarks\",\"hint\":\"Remarks on the contract\",\"id\":\"remarks\",\"copytoreopen\":\"yes\",\"displayinhistory\":\"yes\"},{\"type\":\"sf-checklist\",\"size\":\"small\",\"label\":\"Terms *\",\"hint\":\"Terms in the contract\",\"elementsjson\":\"[{\\\"name\\\":\\\"Term1\\\"},{\\\"name\\\":\\\"Term2\\\"},{\\\"name\\\":\\\"Term3\\\"},{\\\"name\\\":\\\"Term4\\\"}]\",\"id\":\"terms\",\"mandatory\":\"\",\"copytoreopen\":\"yes\",\"displayinhistory\":\"yes\"}]"
  // configjson: string = "[{\"type\":\"sf-i-uploader\",\"name\":\"\",\"size\":\"large\",\"label\":\"Contract Document *\",\"hint\":\"Document of the contract\",\"id\":\"contractdocuments\",\"value\":[{\"arrWords\":[\"Flagg\",\"GRC\"],\"arrWordsMeta\":{\"PAGE\":1,\"LINE\":2,\"WORD\":2},\"jobId\":\"723710139e3fb5d504ea939f93f86ec321024c8752ee83fca02f4158302cf253\",\"key\":\"2cff3eba-36cb-46d9-9e92-e1cb759b8e10\",\"ext\":\"png\"}],\"options\":[\"Yes\",\"No\"],\"collapse\":\"true\",\"mode\":\"multiselect-dropdown\",\"maxselect\":\"1\",\"apiid\":\"1peg5170d3\",\"searchstring\":\"\",\"selectprojection\":\"\",\"ignoredprojections\":\"\",\"savenameseparate\":\"no\",\"dependencies\":[],\"allowedextensions\":\"[&quot;jpg&quot;,&quot;png&quot;,&quot;pdf&quot;,&quot;xls&quot;,&quot;xlsx&quot;,&quot;doc&quot;,&quot;docx&quot;]\",\"extract\":\"yes\",\"maxsize\":\"5242880\",\"allowdownload\":\"yes\",\"selectfields\":[],\"mandatory\":\"\",\"copytoreopen\":false,\"displayinhistory\":true,\"elementsjson\":\"\",\"customreporting\":true},{\"type\":\"date\",\"name\":\"\",\"size\":\"large\",\"label\":\"Date of Execution *\",\"hint\":\"The date of execution of the contract\",\"id\":\"dateofexecution\",\"value\":\"2025-05-19\",\"options\":[\"Yes\",\"No\"],\"collapse\":\"true\",\"mode\":\"\",\"maxselect\":\"\",\"apiid\":\"\",\"searchstring\":\"\",\"selectprojection\":\"\",\"ignoredprojections\":\"\",\"savenameseparate\":\"no\",\"dependencies\":[],\"allowedextensions\":\"\",\"extract\":\"\",\"maxsize\":\"\",\"allowdownload\":\"\",\"selectfields\":[],\"mandatory\":\"\",\"copytoreopen\":false,\"displayinhistory\":true,\"elementsjson\":\"\",\"customreporting\":true},{\"type\":\"date\",\"name\":\"\",\"size\":\"large\",\"label\":\"Date of Expiry *\",\"hint\":\"The date on which the contract expires.\",\"id\":\"dateofexpiry\",\"value\":\"2025-05-20\",\"options\":[\"Yes\",\"No\"],\"collapse\":\"true\",\"mode\":\"\",\"maxselect\":\"\",\"apiid\":\"\",\"searchstring\":\"\",\"selectprojection\":\"\",\"ignoredprojections\":\"\",\"savenameseparate\":\"no\",\"dependencies\":[],\"allowedextensions\":\"\",\"extract\":\"\",\"maxsize\":\"\",\"allowdownload\":\"\",\"selectfields\":[],\"mandatory\":\"\",\"copytoreopen\":false,\"displayinhistory\":true,\"elementsjson\":\"\",\"customreporting\":true},{\"type\":\"date\",\"name\":\"\",\"size\":\"large\",\"label\":\"Date of Renewal *\",\"hint\":\"The date on which the contract renews.\",\"id\":\"dateofrenewal\",\"value\":\"2025-05-21\",\"options\":[\"Yes\",\"No\"],\"collapse\":\"true\",\"mode\":\"\",\"maxselect\":\"\",\"apiid\":\"\",\"searchstring\":\"\",\"selectprojection\":\"\",\"ignoredprojections\":\"\",\"savenameseparate\":\"no\",\"dependencies\":[],\"allowedextensions\":\"\",\"extract\":\"\",\"maxsize\":\"\",\"allowdownload\":\"\",\"selectfields\":[],\"mandatory\":\"\",\"copytoreopen\":false,\"displayinhistory\":true,\"elementsjson\":\"\",\"customreporting\":true},{\"type\":\"date\",\"name\":\"\",\"size\":\"large\",\"label\":\"Due Date *\",\"hint\":\"The due date for the contract.\",\"id\":\"duedate\",\"value\":\"2025-05-22\",\"options\":[\"Yes\",\"No\"],\"collapse\":\"true\",\"mode\":\"\",\"maxselect\":\"\",\"apiid\":\"\",\"searchstring\":\"\",\"selectprojection\":\"\",\"ignoredprojections\":\"\",\"savenameseparate\":\"no\",\"dependencies\":[],\"allowedextensions\":\"\",\"extract\":\"\",\"maxsize\":\"\",\"allowdownload\":\"\",\"selectfields\":[],\"mandatory\":\"\",\"copytoreopen\":false,\"displayinhistory\":true,\"elementsjson\":\"\",\"customreporting\":true},{\"type\":\"textarea\",\"name\":\"\",\"size\":\"small\",\"label\":\"Context\",\"hint\":\"Context of the contract\",\"id\":\"context\",\"value\":\"\",\"options\":[\"Yes\",\"No\"],\"collapse\":\"true\",\"mode\":\"\",\"maxselect\":\"\",\"apiid\":\"\",\"searchstring\":\"\",\"selectprojection\":\"\",\"ignoredprojections\":\"\",\"savenameseparate\":\"no\",\"dependencies\":[],\"allowedextensions\":\"\",\"extract\":\"\",\"maxsize\":\"\",\"allowdownload\":\"\",\"selectfields\":[],\"mandatory\":null,\"copytoreopen\":true,\"displayinhistory\":true,\"elementsjson\":\"\",\"customreporting\":true},{\"type\":\"textarea\",\"name\":\"\",\"size\":\"small\",\"label\":\"Remarks\",\"hint\":\"Remarks on the contract\",\"id\":\"remarks\",\"value\":\"\",\"options\":[\"Yes\",\"No\"],\"collapse\":\"true\",\"mode\":\"\",\"maxselect\":\"\",\"apiid\":\"\",\"searchstring\":\"\",\"selectprojection\":\"\",\"ignoredprojections\":\"\",\"savenameseparate\":\"no\",\"dependencies\":[],\"allowedextensions\":\"\",\"extract\":\"\",\"maxsize\":\"\",\"allowdownload\":\"\",\"selectfields\":[],\"mandatory\":null,\"copytoreopen\":true,\"displayinhistory\":true,\"elementsjson\":\"\",\"customreporting\":true},{\"type\":\"sf-checklist\",\"name\":\"\",\"size\":\"small\",\"label\":\"Terms *\",\"hint\":\"Terms in the contract\",\"id\":\"terms\",\"value\":\"\",\"options\":[\"Yes\",\"No\"],\"collapse\":\"true\",\"mode\":\"\",\"maxselect\":\"\",\"apiid\":\"\",\"searchstring\":\"\",\"selectprojection\":\"\",\"ignoredprojections\":\"\",\"savenameseparate\":\"no\",\"dependencies\":[],\"allowedextensions\":\"\",\"extract\":\"\",\"maxsize\":\"\",\"allowdownload\":\"\",\"selectfields\":[],\"mandatory\":\"\",\"copytoreopen\":true,\"displayinhistory\":true,\"elementsjson\":\"[{\\\"name\\\":\\\"First term\\\"},{\\\"name\\\":\\\"Second term\\\"}]\",\"customreporting\":true}]"
  // configjson: string = "[{\"type\":\"sf-i-uploader\",\"name\":\"\",\"size\":\"large\",\"label\":\"Contract Document *\",\"hint\":\"Document of the contract\",\"id\":\"contractdocuments\",\"value\":[{\"arrWords\":[\"FlaggGRC\",\"Governance\",\"IRskl\",\"Complierce\",\"ISO\",\"27001\",\"Certified\",\"IS\",\"YOUR\",\"ORGANIZATION\",\"READY\",\"FOR\",\"INDIA'S\",\"DPDP\",\"ACT?\"],\"arrWordsMeta\":{\"PAGE\":1,\"LINE\":7,\"WORD\":15},\"jobId\":\"22d56d6c41f9930e5f7aea16613241b19fd36b4a0fd2ae0e9e284376387670f2\",\"filename\":\"dpdp.jpg\",\"key\":\"ea08e215-a394-429a-ab6b-9b761f1f87b6\",\"ext\":\"jpg\"}],\"options\":[\"Yes\",\"No\"],\"collapse\":\"true\",\"mode\":\"multiselect-dropdown\",\"maxselect\":\"1\",\"apiid\":\"1peg5170d3\",\"searchstring\":\"\",\"selectprojection\":\"\",\"ignoredprojections\":\"\",\"savenameseparate\":\"no\",\"dependencies\":[],\"allowedextensions\":\"[&quot;jpg&quot;,&quot;png&quot;,&quot;pdf&quot;,&quot;xls&quot;,&quot;xlsx&quot;,&quot;doc&quot;,&quot;docx&quot;]\",\"extract\":\"yes\",\"maxsize\":\"5242880\",\"allowdownload\":\"yes\",\"selectfields\":[],\"mandatory\":\"\",\"copytoreopen\":false,\"displayinhistory\":true,\"elementsjson\":\"\",\"customreporting\":true},{\"type\":\"date\",\"name\":\"\",\"size\":\"large\",\"label\":\"Date of Execution *\",\"hint\":\"The date of execution of the contract\",\"id\":\"dateofexecution\",\"value\":\"2025-05-23\",\"options\":[\"Yes\",\"No\"],\"collapse\":\"true\",\"mode\":\"\",\"maxselect\":\"\",\"apiid\":\"\",\"searchstring\":\"\",\"selectprojection\":\"\",\"ignoredprojections\":\"\",\"savenameseparate\":\"no\",\"dependencies\":[],\"allowedextensions\":\"\",\"extract\":\"\",\"maxsize\":\"\",\"allowdownload\":\"\",\"selectfields\":[],\"mandatory\":\"\",\"copytoreopen\":false,\"displayinhistory\":true,\"elementsjson\":\"\",\"customreporting\":true},{\"type\":\"date\",\"name\":\"\",\"size\":\"large\",\"label\":\"Due Date *\",\"hint\":\"The due date for the contract.\",\"id\":\"duedate\",\"value\":\"2025-05-30\",\"options\":[\"Yes\",\"No\"],\"collapse\":\"true\",\"mode\":\"\",\"maxselect\":\"\",\"apiid\":\"\",\"searchstring\":\"\",\"selectprojection\":\"\",\"ignoredprojections\":\"\",\"savenameseparate\":\"no\",\"dependencies\":[],\"allowedextensions\":\"\",\"extract\":\"\",\"maxsize\":\"\",\"allowdownload\":\"\",\"selectfields\":[],\"mandatory\":\"\",\"copytoreopen\":false,\"displayinhistory\":true,\"elementsjson\":\"\",\"customreporting\":true},{\"type\":\"textarea\",\"name\":\"\",\"size\":\"small\",\"label\":\"Remarks\",\"hint\":\"Remarks on the contract\",\"id\":\"remarks\",\"value\":\"There are no remarks\",\"options\":[\"Yes\",\"No\"],\"collapse\":\"true\",\"mode\":\"\",\"maxselect\":\"\",\"apiid\":\"\",\"searchstring\":\"\",\"selectprojection\":\"\",\"ignoredprojections\":\"\",\"savenameseparate\":\"no\",\"dependencies\":[],\"allowedextensions\":\"\",\"extract\":\"\",\"maxsize\":\"\",\"allowdownload\":\"\",\"selectfields\":[],\"mandatory\":null,\"copytoreopen\":true,\"displayinhistory\":true,\"elementsjson\":\"\",\"customreporting\":true},{\"type\":\"sf-checklist\",\"name\":\"\",\"size\":\"small\",\"label\":\"Terms *\",\"hint\":\"Terms in the contract\",\"id\":\"terms\",\"value\":\"\",\"options\":[\"Yes\",\"No\"],\"collapse\":\"true\",\"mode\":\"\",\"maxselect\":\"\",\"apiid\":\"\",\"searchstring\":\"\",\"selectprojection\":\"\",\"ignoredprojections\":\"\",\"savenameseparate\":\"no\",\"dependencies\":[],\"allowedextensions\":\"\",\"extract\":\"\",\"maxsize\":\"\",\"allowdownload\":\"\",\"selectfields\":[],\"mandatory\":\"\",\"copytoreopen\":true,\"displayinhistory\":true,\"elementsjson\":\"[{\\\"name\\\":\\\"All personnel should wear uniform\\\"},{\\\"name\\\":\\\"Security services personnel should have ID cards\\\"}]\",\"customreporting\":true}]"
  getConfigJson = () => {
    return JSON.parse(this.configjson)
  }

  @property()
  prepopulateValJson: string = "[]";
  // prepopulateValJson: string = "{\"preparedby\":\"prepared by test\",\"approvedby\":\"approved by test\",\"iccresponsibilities\":\"committee resp\",\"Committee Member\":[{\"iccstructurerole-0\":\"role 1\",\"iccstructureresponsibilities-0\":\"resp 1\"},{\"iccstructurerole-1\":\"role 2\",\"iccstructureresponsibilities-1\":\"resp 2\"}],\"iccmeetings\":\"meet committee\",\"ictresponsibilities\":\"team resp\",\"Team Member\":[{\"ictstructurerole-0\":\"role team 1\",\"ictstructureresponsibilities-0\":\"resp team 1\"},{\"ictstructurerole-1\":\"role team 2\",\"ictstructureresponsibilities-1\":\"resp team 2\"}],\"ictmeetings\":\"meet team\",\"aims\":\"obj test\",\"hhpolicies\":\"proc hand hyg\",\"hhsops\":\"hand hyg sop\",\"hhmonitoring\":\"hand hyg monit\",\"ppepolicies\":\"ppe usage\",\"ppesops\":\"ppe usage sop\",\"ppemonitoring\":\"ppe usage monit\",\"hkcleaning\":\"housekeep test\",\"hkdilution\":\"dilution \",\"hkmonitoring\":\"housekeep monit\",\"cssddesign\":\"ccsd desg\",\"cssdprocedures\":\"\",\"cssdvalidation\":\"ccsd valid test\",\"cssdreuserecall\":\"reuse recall\",\"bmwsegregation\":\"bio waste mgmt\",\"bmwstatutory\":\"satutory prov\",\"staffstatutory\":\"staff inf prev\",\"staffinfectionreporting\":\"staff inf report\",\"staffworkrestrictions\":\"work restrict\",\"staffprophylaxis\":\"prophyl\",\"safeimedication\":\"\",\"safeiinjection\":\"\",\"safeiinjuryprevention\":\"\",\"amsclinicalconditions\":\"\",\"amssusceptibility\":\"\",\"amsusagepolicy\":\"\",\"amsstewardshipcommittee\":\"\",\"amsworkflows\":\"\",\"rncriskassessment\":\"\",\"haicarebundles\":\"\",\"haimonitoring\":\"\",\"dskstatutory\":\"\",\"dskriskassessment\":\"\",\"dskscreening\":\"\",\"dskhygiene\":\"\",\"llmprocedures\":\"\",\"surveillanceinfections\":\"\",\"surveillanceantimicrobial\":\"\",\"surveillanceenvironment\":\"\",\"inventorypolicy\":\"\",\"availabilitypolicy\":\"\",\"trainingpolicy\":\"\",\"auditpolicy\":\"\",\"qualitypolicy\":\"\",\"vendorselectionpolicy\":\"\",\"maintenancepolicy\":\"\"}";
  // prepopulateValJson: string = "{\"contractdocuments\":[{\"arrWords\":[\"Flagg\",\"GRC\"],\"arrWordsMeta\":{\"PAGE\":1,\"LINE\":2,\"WORD\":2},\"jobId\":\"139182bd46abb07587276a4d8e180ab246536417c26fe56656ece31a80cd06de\",\"filename\":\"unnamed.png\",\"key\":\"f1095679-4a97-4994-941d-1e2f61cdff13\",\"ext\":\"png\"}],\"dateofexecution\":\"2025-05-20\",\"dateofexpiry\":\"2025-05-23\",\"dateofrenewal\":\"2025-05-24\",\"duedate\":\"2025-05-24\",\"context\":\"Renewal\",\"remarks\":\"Renewal\",\"terms\":{\"First term\":true,\"Second term\":true}}";

  getPrepopulateJson = () => {
    return JSON.parse(this.prepopulateValJson)
  }

  @property()
  mode: string = "view";

  @property()
  flow: string = "edit";

  @property()
  name: string = "Reporting";

  @property()
  ignoreprojections: string = "[]";

  @property()
  editdisable: string = "false";

  @property()
  showterminate: string = "false";

  getIgnoreProjections = () => {
    return JSON.parse(this.ignoreprojections)
  }

  @property()
  usermap: string = "[]"
  // usermap: string = "{\"roles\":{\"reporter\":{}},\"Australia (ABC Global-Country);8f04fd68-652e-4066-93d1-c99f1088cac6\":{\"ABC Limited - Australia (ABC Global-Australia-Entity);c637557d-e0f9-4117-a2f6-f661024a9f6c\":{\"Australia Federal (ABC Global-Australia-ABC Limited - Australia-Location);121335d3-e3fc-4139-a6b7-38d4587cd0e3\":{\"tags\":[\"Corp Sec (ABC Global-Function);2c4bfb82-bd9a-4589-b27a-423cc72ea56a\",\"Statutory (ABC Global-Tags);8ff789fa-de57-44d9-baa4-9ca5bc18c800;Compliance Type\",\"Oceania (ABC Global-Tags);fe63abac-2eba-478c-9f92-a7436cdebef9;International Region\",\"Local Reporter 1;e9684b5d-ddbc-46d3-ae07-51706bf75410\",\"Local Approver 1;c44dcd04-aebb-4417-ba6b-fac170efd5d0\",\"Chief Compliance Officer;5fe96caa-1a44-4a2d-921a-920d29433eca\",\"Compliance Officer;9e46dba0-9750-47bd-8d77-385cd17681da\",\"Auditor J1;bda0d59b-058b-4098-b0fc-54aa54aa5998\",\"Viewer J1;344c84d2-5976-47ff-949b-49f6fa9627eb\",\"Not Required (ABC Global-MakerChecker);fef0402d-4578-4b9f-ab53-f8404ec5aefb\",\"Australia (ABC Global-Country);8f04fd68-652e-4066-93d1-c99f1088cac6\",\"ABC Limited - Australia (ABC Global-Australia-Entity);c637557d-e0f9-4117-a2f6-f661024a9f6c\",\"Australia Federal (ABC Global-Australia-ABC Limited - Australia-Location);121335d3-e3fc-4139-a6b7-38d4587cd0e3\",\"Human Resource (ABC Global-Function);215026f6-0d73-49b3-b193-4b95184201f8\"]}}},\"Canada (ABC Global-Country);58c90fb5-9d1d-46bc-9b1a-2cf3e353eed0\":{\"ABC Limited - Canada (ABC Global-Canada-Entity);ed9795ff-166e-4f78-983c-2312c3042017\":{\"Canada Federal (ABC Global-Canada-ABC Canada Limited-Location);47fe7508-47fe-44bf-9b94-2db1c31866d3\":{\"tags\":[\"Corp Sec (ABC Global-Function);2c4bfb82-bd9a-4589-b27a-423cc72ea56a\",\"Statutory (ABC Global-Tags);8ff789fa-de57-44d9-baa4-9ca5bc18c800;Compliance Type\",\"Northern America (ABC Global-Tags);3945b6f1-f70c-4d01-90b2-c9596402aaee;International Region\",\"Local Reporter 1;e9684b5d-ddbc-46d3-ae07-51706bf75410\",\"Local Approver 1;c44dcd04-aebb-4417-ba6b-fac170efd5d0\",\"Chief Compliance Officer;5fe96caa-1a44-4a2d-921a-920d29433eca\",\"Compliance Officer;9e46dba0-9750-47bd-8d77-385cd17681da\",\"Auditor J1;bda0d59b-058b-4098-b0fc-54aa54aa5998\",\"Viewer J1;344c84d2-5976-47ff-949b-49f6fa9627eb\",\"Canada (ABC Global-Country);58c90fb5-9d1d-46bc-9b1a-2cf3e353eed0\",\"ABC Limited - Canada (ABC Global-Canada-Entity);ed9795ff-166e-4f78-983c-2312c3042017\",\"Canada Federal (ABC Global-Canada-ABC Canada Limited-Location);47fe7508-47fe-44bf-9b94-2db1c31866d3\",\"Not Required (ABC Global-MakerChecker);fef0402d-4578-4b9f-ab53-f8404ec5aefb\",\"Operations (ABC Global-Function);d5c14313-f94e-4f02-bcaf-7959032296af\",\"Human Resource (ABC Global-Function);215026f6-0d73-49b3-b193-4b95184201f8\",\"Admin (ABC Global-Function);313f6a70-4b5f-4182-8855-1e5ec59aaf53\",\"IT (ABC Global-Function);7ca3a611-cde2-4705-a630-9e55f4daa26e\"]}}},\"India (ABC Global-Country);07d73b44-648d-4301-82c4-d6df43397824\":{\"ABC Limited - India (ABC Global-India-Entity);c989a44e-7d3d-427e-b712-90eacf585075\":{\"Mumbai (ABC Global-India-ABC Limited - India-Location);38dc8c53-643f-4fee-83fe-f15239606277\":{\"tags\":[\"Admin (ABC Global-Function);313f6a70-4b5f-4182-8855-1e5ec59aaf53\",\"Statutory (ABC Global-Tags);8ff789fa-de57-44d9-baa4-9ca5bc18c800;Compliance Type\",\"Southeast Asia (ABC Global-Tags);d6e372a8-8bff-4de2-8dc0-f80094c49a7d;International Region\",\"Local Reporter 1;e9684b5d-ddbc-46d3-ae07-51706bf75410\",\"Local Approver 1;c44dcd04-aebb-4417-ba6b-fac170efd5d0\",\"Chief Compliance Officer;5fe96caa-1a44-4a2d-921a-920d29433eca\",\"Compliance Officer;9e46dba0-9750-47bd-8d77-385cd17681da\",\"Auditor J1;bda0d59b-058b-4098-b0fc-54aa54aa5998\",\"Viewer J1;344c84d2-5976-47ff-949b-49f6fa9627eb\",\"India (ABC Global-Country);07d73b44-648d-4301-82c4-d6df43397824\",\"ABC Limited - India (ABC Global-India-Entity);c989a44e-7d3d-427e-b712-90eacf585075\",\"Mumbai (ABC Global-India-ABC Limited - India-Location);38dc8c53-643f-4fee-83fe-f15239606277\",\"Pune (ABC Global-India-ABC Limited - India-Location);4fb7b672-5cce-443f-869b-6b35247d6331\",\"IT (ABC Global-Function);7ca3a611-cde2-4705-a630-9e55f4daa26e\",\"Not Required (ABC Global-MakerChecker);fef0402d-4578-4b9f-ab53-f8404ec5aefb\",\"Corp Sec (ABC Global-Function);2c4bfb82-bd9a-4589-b27a-423cc72ea56a\",\"Telangana (ABC Global-India-ABC Limited - India-Location);a2b6ef9c-2d3e-4a82-b22e-221962d48ba4\",\"Human Resource (ABC Global-Function);215026f6-0d73-49b3-b193-4b95184201f8\",\"Payroll (ABC Global-Function);52f5563a-5a58-4c80-8a4c-dacbfef14d16\",\"Production (ABC Global-Function);af9c1cd4-909f-444d-80c2-dd297ca1b8b1\",\"Operations (ABC Global-Function);d5c14313-f94e-4f02-bcaf-7959032296af\",\"Advertising Conditions (ABC Global-Tags);2cd4f501-1dcf-4f76-be0b-779a0721ad2f;SOP\",\"Safety Measures (ABC Global-Tags);c5b639f8-eea1-47e3-8bf2-dec2ea13170f;SOP\",\"Packaging/Labelling (ABC Global-Tags);b7d2346d-c006-48fc-8870-b8d3c17a1c32;SOP\",\"Finance (ABC Global-Function);6847ff49-09f1-4c26-9c84-ae923758c9eb\"]},\"Pune (ABC Global-India-ABC Limited - India-Location);4fb7b672-5cce-443f-869b-6b35247d6331\":{\"tags\":[\"Admin (ABC Global-Function);313f6a70-4b5f-4182-8855-1e5ec59aaf53\",\"Statutory (ABC Global-Tags);8ff789fa-de57-44d9-baa4-9ca5bc18c800;Compliance Type\",\"Southeast Asia (ABC Global-Tags);d6e372a8-8bff-4de2-8dc0-f80094c49a7d;International Region\",\"Local Reporter 1;e9684b5d-ddbc-46d3-ae07-51706bf75410\",\"Local Approver 1;c44dcd04-aebb-4417-ba6b-fac170efd5d0\",\"Chief Compliance Officer;5fe96caa-1a44-4a2d-921a-920d29433eca\",\"Compliance Officer;9e46dba0-9750-47bd-8d77-385cd17681da\",\"Auditor J1;bda0d59b-058b-4098-b0fc-54aa54aa5998\",\"Viewer J1;344c84d2-5976-47ff-949b-49f6fa9627eb\",\"Not Required (ABC Global-MakerChecker);fef0402d-4578-4b9f-ab53-f8404ec5aefb\",\"India (ABC Global-Country);07d73b44-648d-4301-82c4-d6df43397824\",\"ABC Limited - India (ABC Global-India-Entity);c989a44e-7d3d-427e-b712-90eacf585075\",\"Mumbai (ABC Global-India-ABC Limited - India-Location);38dc8c53-643f-4fee-83fe-f15239606277\",\"Pune (ABC Global-India-ABC Limited - India-Location);4fb7b672-5cce-443f-869b-6b35247d6331\",\"IT (ABC Global-Function);7ca3a611-cde2-4705-a630-9e55f4daa26e\",\"Corp Sec (ABC Global-Function);2c4bfb82-bd9a-4589-b27a-423cc72ea56a\",\"Telangana (ABC Global-India-ABC Limited - India-Location);a2b6ef9c-2d3e-4a82-b22e-221962d48ba4\",\"Human Resource (ABC Global-Function);215026f6-0d73-49b3-b193-4b95184201f8\",\"Payroll (ABC Global-Function);52f5563a-5a58-4c80-8a4c-dacbfef14d16\",\"Production (ABC Global-Function);af9c1cd4-909f-444d-80c2-dd297ca1b8b1\",\"External Reporting (ABC Global-Tags);7c6d5bfa-2de3-486f-85d1-488ea6868f57;SOP\",\"Safety Measures (ABC Global-Tags);c5b639f8-eea1-47e3-8bf2-dec2ea13170f;SOP\",\"Production Standards (ABC Global-Tags);c0424874-28b3-41e7-b637-a38a5cafe2ed;SOP\",\"Operations (ABC Global-Function);d5c14313-f94e-4f02-bcaf-7959032296af\",\"Conditions of Sale (ABC Global-Tags);dc03a0cf-fce4-48ce-ae19-e42c61174b62;SOP\",\"Packaging/Labelling (ABC Global-Tags);b7d2346d-c006-48fc-8870-b8d3c17a1c32;SOP\",\"Marketing (ABC Global-Function);07240150-320f-45b0-a51b-d786667981f0\",\"Advertising Conditions (ABC Global-Tags);2cd4f501-1dcf-4f76-be0b-779a0721ad2f;SOP\",\"Prohibitory (ABC Global-Tags);2255003a-fcd6-4c1b-ab1d-04cce193b719;SOP\",\"License (ABC Global-Tags);fb393f58-9fa8-40f5-8879-120f4fd6b2da;SOP\",\"Finance (ABC Global-Function);6847ff49-09f1-4c26-9c84-ae923758c9eb\",\"FSSAI (ABC Global-Function);35002808-bcd0-4ab4-9058-fef1a87a9f2b\"]},\"Telangana (ABC Global-India-ABC Limited - India-Location);a2b6ef9c-2d3e-4a82-b22e-221962d48ba4\":{\"tags\":[\"Corp Sec (ABC Global-Function);2c4bfb82-bd9a-4589-b27a-423cc72ea56a\",\"Statutory (ABC Global-Tags);8ff789fa-de57-44d9-baa4-9ca5bc18c800;Compliance Type\",\"Southeast Asia (ABC Global-Tags);d6e372a8-8bff-4de2-8dc0-f80094c49a7d;International Region\",\"Local Reporter 1;e9684b5d-ddbc-46d3-ae07-51706bf75410\",\"Local Approver 1;c44dcd04-aebb-4417-ba6b-fac170efd5d0\",\"Chief Compliance Officer;5fe96caa-1a44-4a2d-921a-920d29433eca\",\"Compliance Officer;9e46dba0-9750-47bd-8d77-385cd17681da\",\"Auditor J1;bda0d59b-058b-4098-b0fc-54aa54aa5998\",\"Viewer J1;344c84d2-5976-47ff-949b-49f6fa9627eb\",\"India (ABC Global-Country);07d73b44-648d-4301-82c4-d6df43397824\",\"ABC Limited - India (ABC Global-India-Entity);c989a44e-7d3d-427e-b712-90eacf585075\",\"Mumbai (ABC Global-India-ABC Limited - India-Location);38dc8c53-643f-4fee-83fe-f15239606277\",\"Pune (ABC Global-India-ABC Limited - India-Location);4fb7b672-5cce-443f-869b-6b35247d6331\",\"Telangana (ABC Global-India-ABC Limited - India-Location);a2b6ef9c-2d3e-4a82-b22e-221962d48ba4\",\"Admin (ABC Global-Function);313f6a70-4b5f-4182-8855-1e5ec59aaf53\",\"Human Resource (ABC Global-Function);215026f6-0d73-49b3-b193-4b95184201f8\",\"Not Required (ABC Global-MakerChecker);fef0402d-4578-4b9f-ab53-f8404ec5aefb\",\"Payroll (ABC Global-Function);52f5563a-5a58-4c80-8a4c-dacbfef14d16\",\"Operations (ABC Global-Function);d5c14313-f94e-4f02-bcaf-7959032296af\",\"Packaging/Labelling (ABC Global-Tags);b7d2346d-c006-48fc-8870-b8d3c17a1c32;SOP\",\"Finance (ABC Global-Function);6847ff49-09f1-4c26-9c84-ae923758c9eb\",\"IT (ABC Global-Function);7ca3a611-cde2-4705-a630-9e55f4daa26e\"]}}},\"Mauritius (ABC Global-Country);08ef2081-d33f-4876-be86-f811fd9dc572\":{\"ABC Capital Ltd (ABC Global-Mauritius-Entity);6f19dce2-7cbe-48d3-b427-c8272a9b9dae\":{\"Port Louis (ABC Global-Mauritius-ABC Capital Ltd-Location);606b5624-0528-4b61-9503-6b3bd9729622\":{\"tags\":[\"Finance (ABC Global-Function);6847ff49-09f1-4c26-9c84-ae923758c9eb\",\"Statutory (ABC Global-Tags);8ff789fa-de57-44d9-baa4-9ca5bc18c800;Compliance Type\",\"Local Reporter 1;e9684b5d-ddbc-46d3-ae07-51706bf75410\",\"Local Approver 1;c44dcd04-aebb-4417-ba6b-fac170efd5d0\",\"Chief Compliance Officer;5fe96caa-1a44-4a2d-921a-920d29433eca\",\"Compliance Officer;9e46dba0-9750-47bd-8d77-385cd17681da\",\"Auditor J1;bda0d59b-058b-4098-b0fc-54aa54aa5998\",\"Viewer J1;344c84d2-5976-47ff-949b-49f6fa9627eb\",\"Mauritius (ABC Global-Country);08ef2081-d33f-4876-be86-f811fd9dc572\",\"ABC Capital Ltd (ABC Global-Mauritius-Entity);6f19dce2-7cbe-48d3-b427-c8272a9b9dae\",\"Port Louis (ABC Global-Mauritius-ABC Capital Ltd-Location);606b5624-0528-4b61-9503-6b3bd9729622\"]}}},\"Singapore (ABC Global-Country);8ee18117-0cca-49be-80f4-1f712d871fef\":{\"ABC Pte Ltd (ABC Global-Singapore-Entity);50797394-7f3f-40a5-8dc3-ca360596e394\":{\"Raffles Place (ABC Global-Singapore-ABC Pte Ltd-Location);405732fc-7a4b-4df1-9b5e-fa508db9fced\":{\"tags\":[\"Corp Sec (ABC Global-Function);2c4bfb82-bd9a-4589-b27a-423cc72ea56a\",\"Statutory (ABC Global-Tags);8ff789fa-de57-44d9-baa4-9ca5bc18c800;Compliance Type\",\"Southeast Asia (ABC Global-Tags);d6e372a8-8bff-4de2-8dc0-f80094c49a7d;International Region\",\"Local Reporter 1;e9684b5d-ddbc-46d3-ae07-51706bf75410\",\"Local Approver 1;c44dcd04-aebb-4417-ba6b-fac170efd5d0\",\"Chief Compliance Officer;5fe96caa-1a44-4a2d-921a-920d29433eca\",\"Compliance Officer;9e46dba0-9750-47bd-8d77-385cd17681da\",\"Auditor J1;bda0d59b-058b-4098-b0fc-54aa54aa5998\",\"Viewer J1;344c84d2-5976-47ff-949b-49f6fa9627eb\",\"Not Required (ABC Global-MakerChecker);fef0402d-4578-4b9f-ab53-f8404ec5aefb\",\"Singapore (ABC Global-Country);8ee18117-0cca-49be-80f4-1f712d871fef\",\"ABC Pte Ltd (ABC Global-Singapore-Entity);50797394-7f3f-40a5-8dc3-ca360596e394\",\"DEF Pte Ltd (ABC Global-Singapore-Entity);910f911e-a687-4021-951d-77f401931b83\",\"Raffles Place (ABC Global-Singapore-ABC Pte Ltd-Location);405732fc-7a4b-4df1-9b5e-fa508db9fced\",\"Human Resource (ABC Global-Function);215026f6-0d73-49b3-b193-4b95184201f8\",\"IT (ABC Global-Function);7ca3a611-cde2-4705-a630-9e55f4daa26e\",\"Admin (ABC Global-Function);313f6a70-4b5f-4182-8855-1e5ec59aaf53\"]}},\"DEF Pte Ltd (ABC Global-Singapore-Entity);910f911e-a687-4021-951d-77f401931b83\":{\"Marina Bay (ABC Global-Singapore-DEF Pte Ltd-Location);c5fadbbf-cfd0-43bd-b685-6881874a34d6\":{\"tags\":[\"Corp Sec (ABC Global-Function);2c4bfb82-bd9a-4589-b27a-423cc72ea56a\",\"Statutory (ABC Global-Tags);8ff789fa-de57-44d9-baa4-9ca5bc18c800;Compliance Type\",\"Southeast Asia (ABC Global-Tags);d6e372a8-8bff-4de2-8dc0-f80094c49a7d;International Region\",\"Local Reporter 1;e9684b5d-ddbc-46d3-ae07-51706bf75410\",\"Local Approver 1;c44dcd04-aebb-4417-ba6b-fac170efd5d0\",\"Chief Compliance Officer;5fe96caa-1a44-4a2d-921a-920d29433eca\",\"Compliance Officer;9e46dba0-9750-47bd-8d77-385cd17681da\",\"Auditor J1;bda0d59b-058b-4098-b0fc-54aa54aa5998\",\"Viewer J1;344c84d2-5976-47ff-949b-49f6fa9627eb\",\"Not Required (ABC Global-MakerChecker);fef0402d-4578-4b9f-ab53-f8404ec5aefb\",\"Singapore (ABC Global-Country);8ee18117-0cca-49be-80f4-1f712d871fef\",\"ABC Pte Ltd (ABC Global-Singapore-Entity);50797394-7f3f-40a5-8dc3-ca360596e394\",\"DEF Pte Ltd (ABC Global-Singapore-Entity);910f911e-a687-4021-951d-77f401931b83\",\"Marina Bay (ABC Global-Singapore-DEF Pte Ltd-Location);c5fadbbf-cfd0-43bd-b685-6881874a34d6\",\"Tanjong Pagar (ABC Global-Singapore-DEF Pte Ltd-Location);5624f7f0-fed2-45c2-ae65-9424e47aba3f\",\"Tras Street (ABC Global-Singapore-DEF Pte Ltd-Location);94542aab-0fde-4d2c-a704-4a13dc21d2ca\",\"Human Resource (ABC Global-Function);215026f6-0d73-49b3-b193-4b95184201f8\",\"IT (ABC Global-Function);7ca3a611-cde2-4705-a630-9e55f4daa26e\"]},\"Tanjong Pagar (ABC Global-Singapore-DEF Pte Ltd-Location);5624f7f0-fed2-45c2-ae65-9424e47aba3f\":{\"tags\":[\"Corp Sec (ABC Global-Function);2c4bfb82-bd9a-4589-b27a-423cc72ea56a\",\"Statutory (ABC Global-Tags);8ff789fa-de57-44d9-baa4-9ca5bc18c800;Compliance Type\",\"Southeast Asia (ABC Global-Tags);d6e372a8-8bff-4de2-8dc0-f80094c49a7d;International Region\",\"Local Reporter 1;e9684b5d-ddbc-46d3-ae07-51706bf75410\",\"Local Approver 1;c44dcd04-aebb-4417-ba6b-fac170efd5d0\",\"Chief Compliance Officer;5fe96caa-1a44-4a2d-921a-920d29433eca\",\"Compliance Officer;9e46dba0-9750-47bd-8d77-385cd17681da\",\"Auditor J1;bda0d59b-058b-4098-b0fc-54aa54aa5998\",\"Viewer J1;344c84d2-5976-47ff-949b-49f6fa9627eb\",\"Not Required (ABC Global-MakerChecker);fef0402d-4578-4b9f-ab53-f8404ec5aefb\",\"Singapore (ABC Global-Country);8ee18117-0cca-49be-80f4-1f712d871fef\",\"ABC Pte Ltd (ABC Global-Singapore-Entity);50797394-7f3f-40a5-8dc3-ca360596e394\",\"DEF Pte Ltd (ABC Global-Singapore-Entity);910f911e-a687-4021-951d-77f401931b83\",\"Tanjong Pagar (ABC Global-Singapore-DEF Pte Ltd-Location);5624f7f0-fed2-45c2-ae65-9424e47aba3f\",\"Tras Street (ABC Global-Singapore-DEF Pte Ltd-Location);94542aab-0fde-4d2c-a704-4a13dc21d2ca\",\"Marina Bay (ABC Global-Singapore-DEF Pte Ltd-Location);c5fadbbf-cfd0-43bd-b685-6881874a34d6\",\"Human Resource (ABC Global-Function);215026f6-0d73-49b3-b193-4b95184201f8\",\"IT (ABC Global-Function);7ca3a611-cde2-4705-a630-9e55f4daa26e\"]},\"Tras Street (ABC Global-Singapore-DEF Pte Ltd-Location);94542aab-0fde-4d2c-a704-4a13dc21d2ca\":{\"tags\":[\"Corp Sec (ABC Global-Function);2c4bfb82-bd9a-4589-b27a-423cc72ea56a\",\"Statutory (ABC Global-Tags);8ff789fa-de57-44d9-baa4-9ca5bc18c800;Compliance Type\",\"Southeast Asia (ABC Global-Tags);d6e372a8-8bff-4de2-8dc0-f80094c49a7d;International Region\",\"Local Reporter 1;e9684b5d-ddbc-46d3-ae07-51706bf75410\",\"Local Approver 1;c44dcd04-aebb-4417-ba6b-fac170efd5d0\",\"Chief Compliance Officer;5fe96caa-1a44-4a2d-921a-920d29433eca\",\"Compliance Officer;9e46dba0-9750-47bd-8d77-385cd17681da\",\"Auditor J1;bda0d59b-058b-4098-b0fc-54aa54aa5998\",\"Viewer J1;344c84d2-5976-47ff-949b-49f6fa9627eb\",\"Not Required (ABC Global-MakerChecker);fef0402d-4578-4b9f-ab53-f8404ec5aefb\",\"Singapore (ABC Global-Country);8ee18117-0cca-49be-80f4-1f712d871fef\",\"ABC Pte Ltd (ABC Global-Singapore-Entity);50797394-7f3f-40a5-8dc3-ca360596e394\",\"DEF Pte Ltd (ABC Global-Singapore-Entity);910f911e-a687-4021-951d-77f401931b83\",\"Tanjong Pagar (ABC Global-Singapore-DEF Pte Ltd-Location);5624f7f0-fed2-45c2-ae65-9424e47aba3f\",\"Tras Street (ABC Global-Singapore-DEF Pte Ltd-Location);94542aab-0fde-4d2c-a704-4a13dc21d2ca\",\"Marina Bay (ABC Global-Singapore-DEF Pte Ltd-Location);c5fadbbf-cfd0-43bd-b685-6881874a34d6\",\"Human Resource (ABC Global-Function);215026f6-0d73-49b3-b193-4b95184201f8\",\"IT (ABC Global-Function);7ca3a611-cde2-4705-a630-9e55f4daa26e\"]},\"Raffles Place (ABC Global-Singapore-ABC Pte Ltd-Location);405732fc-7a4b-4df1-9b5e-fa508db9fced\":{\"tags\":[\"Human Resource (ABC Global-Function);215026f6-0d73-49b3-b193-4b95184201f8\",\"Statutory (ABC Global-Tags);8ff789fa-de57-44d9-baa4-9ca5bc18c800;Compliance Type\",\"Southeast Asia (ABC Global-Tags);d6e372a8-8bff-4de2-8dc0-f80094c49a7d;International Region\",\"Local Reporter 1;e9684b5d-ddbc-46d3-ae07-51706bf75410\",\"Local Approver 1;c44dcd04-aebb-4417-ba6b-fac170efd5d0\",\"Chief Compliance Officer;5fe96caa-1a44-4a2d-921a-920d29433eca\",\"Compliance Officer;9e46dba0-9750-47bd-8d77-385cd17681da\",\"Auditor J1;bda0d59b-058b-4098-b0fc-54aa54aa5998\",\"Viewer J1;344c84d2-5976-47ff-949b-49f6fa9627eb\",\"Singapore (ABC Global-Country);8ee18117-0cca-49be-80f4-1f712d871fef\",\"ABC Pte Ltd (ABC Global-Singapore-Entity);50797394-7f3f-40a5-8dc3-ca360596e394\",\"DEF Pte Ltd (ABC Global-Singapore-Entity);910f911e-a687-4021-951d-77f401931b83\",\"Raffles Place (ABC Global-Singapore-ABC Pte Ltd-Location);405732fc-7a4b-4df1-9b5e-fa508db9fced\"]}}},\"United Kingdom (ABC Global-Country);cfdeb388-e806-4cad-81b6-f1ddfd10e293\":{\"ABC Limited - UK (ABC Global-United Kingdom-Entity);a0269f03-479d-49b7-b080-94f287cc7c98\":{\"UK Federal (ABC Global-United Kingdom-ABC Limited - UK-Location);08c0a303-4355-4444-9ba0-7050d4fdcf72\":{\"tags\":[\"Human Resource (ABC Global-Function);215026f6-0d73-49b3-b193-4b95184201f8\",\"Statutory (ABC Global-Tags);8ff789fa-de57-44d9-baa4-9ca5bc18c800;Compliance Type\",\"Europe (ABC Global-Tags);9f77c0c7-7e05-4707-ab9b-9f31ad27f8e8;International Region\",\"Local Reporter 1;e9684b5d-ddbc-46d3-ae07-51706bf75410\",\"Local Approver 1;c44dcd04-aebb-4417-ba6b-fac170efd5d0\",\"Chief Compliance Officer;5fe96caa-1a44-4a2d-921a-920d29433eca\",\"Compliance Officer;9e46dba0-9750-47bd-8d77-385cd17681da\",\"Auditor J1;bda0d59b-058b-4098-b0fc-54aa54aa5998\",\"Viewer J1;344c84d2-5976-47ff-949b-49f6fa9627eb\",\"United Kingdom (ABC Global-Country);cfdeb388-e806-4cad-81b6-f1ddfd10e293\",\"ABC Limited - UK (ABC Global-United Kingdom-Entity);a0269f03-479d-49b7-b080-94f287cc7c98\",\"UK Federal (ABC Global-United Kingdom-ABC Limited - UK-Location);08c0a303-4355-4444-9ba0-7050d4fdcf72\",\"Corp Sec (ABC Global-Function);2c4bfb82-bd9a-4589-b27a-423cc72ea56a\",\"Not Required (ABC Global-MakerChecker);fef0402d-4578-4b9f-ab53-f8404ec5aefb\"]}}},\"United States of America (ABC Global-Country);2e8b229e-ad6e-43fb-8767-65dc248abd54\":{\"ABC Inc - USA (ABC Global-United States of America-Entity);16d72bae-10cf-4fa3-b609-eee8e309e0a8\":{\"US Federal (ABC Global-United States of America-ABC Inc - USA-Location);af851ebd-222c-4cb6-ad53-b65ba40b3ecc\":{\"tags\":[\"Admin (ABC Global-Function);313f6a70-4b5f-4182-8855-1e5ec59aaf53\",\"Statutory (ABC Global-Tags);8ff789fa-de57-44d9-baa4-9ca5bc18c800;Compliance Type\",\"Northern America (ABC Global-Tags);3945b6f1-f70c-4d01-90b2-c9596402aaee;International Region\",\"Local Reporter 1;e9684b5d-ddbc-46d3-ae07-51706bf75410\",\"Local Approver 1;c44dcd04-aebb-4417-ba6b-fac170efd5d0\",\"Chief Compliance Officer;5fe96caa-1a44-4a2d-921a-920d29433eca\",\"Compliance Officer;9e46dba0-9750-47bd-8d77-385cd17681da\",\"Auditor J1;bda0d59b-058b-4098-b0fc-54aa54aa5998\",\"Viewer J1;344c84d2-5976-47ff-949b-49f6fa9627eb\",\"Not Required (ABC Global-MakerChecker);fef0402d-4578-4b9f-ab53-f8404ec5aefb\",\"United States of America (ABC Global-Country);2e8b229e-ad6e-43fb-8767-65dc248abd54\",\"ABC Inc - USA (ABC Global-United States of America-Entity);16d72bae-10cf-4fa3-b609-eee8e309e0a8\",\"US Federal (ABC Global-United States of America-ABC Inc - USA-Location);af851ebd-222c-4cb6-ad53-b65ba40b3ecc\",\"Marketing (ABC Global-Function);07240150-320f-45b0-a51b-d786667981f0\",\"Southeast Asia (ABC Global-Tags);d6e372a8-8bff-4de2-8dc0-f80094c49a7d;International Region\",\"Prohibitory (ABC Global-Tags);2255003a-fcd6-4c1b-ab1d-04cce193b719;SOP\",\"Human Resource (ABC Global-Function);215026f6-0d73-49b3-b193-4b95184201f8\",\"Operations (ABC Global-Function);d5c14313-f94e-4f02-bcaf-7959032296af\",\"IT (ABC Global-Function);7ca3a611-cde2-4705-a630-9e55f4daa26e\"]}}}}"

  getUserMap = () => {
    return JSON.parse(this.usermap);
  }

  @property()
  formviewclass: string = "flex-col"

  dataModel: any[] = [];

  list: any[] = [];

  published: boolean = false;
  
  terminated: boolean = false;

  lastCalendarGenerated: string = ""
  nextCalendarScheduled: string = ""
  // selectedItem: any = {};
  // selectedItem: any = { id: "2b1d4da9-7cfe-4861-91f2-1727d0cc70b4" };
  selectedItem: any = {"contractdocuments":[{"arrWords":["FlaggGRC","Governance","IRskl","Complierce","ISO","27001","Certified","IS","YOUR","ORGANIZATION","READY","FOR","INDIA'S","DPDP","ACT?"],"arrWordsMeta":{"PAGE":1,"LINE":7,"WORD":15},"jobId":"22d56d6c41f9930e5f7aea16613241b19fd36b4a0fd2ae0e9e284376387670f2","filename":"dpdp.jpg","key":"ea08e215-a394-429a-ab6b-9b761f1f87b6","ext":"jpg"}],"refno":"Security/S/PUN/12","dateofexecution":"2025-05-23","duedate":"30/05/2025","party1":"XYZ Security Pvt. Ltd.","party2":"FlaggGRC TL","party3":"","countryid":"07d73b44-648d-4301-82c4-d6df43397824","countryname":"India (ABC Global-Country)","entityid":"c989a44e-7d3d-427e-b712-90eacf585075","entityname":"ABC Limited - India (ABC Global-India-Entity)","locations":["Pune (ABC Global-India-ABC Limited - India-Location);4fb7b672-5cce-443f-869b-6b35247d6331"],"tags":["Safety Measures (ABC Global-Tags);c5b639f8-eea1-47e3-8bf2-dec2ea13170f"],"reporters":["Local Reporter 1;e9684b5d-ddbc-46d3-ae07-51706bf75410"],"approvers":["Local Approver 1;c44dcd04-aebb-4417-ba6b-fac170efd5d0"],"functionheads":["Chief Compliance Officer;5fe96caa-1a44-4a2d-921a-920d29433eca"],"contracttypeid":"0338b199-0c1f-44fa-9c13-a051143ea704","contracttypename":"Security","context":"Physical security services","remarks":"There are no remarks","makercheckers":[],"auditors":[],"viewers":[],"terms":[{"name":"All personnel should wear uniform"},{"name":"Security services personnel should have ID cards"}],"customreporting":"[{\"type\":\"sf-i-uploader\",\"name\":\"\",\"size\":\"large\",\"label\":\"Contract Document *\",\"hint\":\"Document of the contract\",\"id\":\"contractdocuments\",\"value\":[{\"arrWords\":[\"FlaggGRC\",\"Governance\",\"IRskl\",\"Complierce\",\"ISO\",\"27001\",\"Certified\",\"IS\",\"YOUR\",\"ORGANIZATION\",\"READY\",\"FOR\",\"INDIA'S\",\"DPDP\",\"ACT?\"],\"arrWordsMeta\":{\"PAGE\":1,\"LINE\":7,\"WORD\":15},\"jobId\":\"22d56d6c41f9930e5f7aea16613241b19fd36b4a0fd2ae0e9e284376387670f2\",\"filename\":\"dpdp.jpg\",\"key\":\"ea08e215-a394-429a-ab6b-9b761f1f87b6\",\"ext\":\"jpg\"}],\"options\":[\"Yes\",\"No\"],\"collapse\":\"true\",\"mode\":\"multiselect-dropdown\",\"maxselect\":\"1\",\"apiid\":\"1peg5170d3\",\"searchstring\":\"\",\"selectprojection\":\"\",\"ignoredprojections\":\"\",\"savenameseparate\":\"no\",\"dependencies\":[],\"allowedextensions\":\"[&quot;jpg&quot;,&quot;png&quot;,&quot;pdf&quot;,&quot;xls&quot;,&quot;xlsx&quot;,&quot;doc&quot;,&quot;docx&quot;]\",\"extract\":\"yes\",\"maxsize\":\"5242880\",\"allowdownload\":\"yes\",\"selectfields\":[],\"mandatory\":\"\",\"copytoreopen\":false,\"displayinhistory\":true,\"elementsjson\":\"\",\"customreporting\":true},{\"type\":\"date\",\"name\":\"\",\"size\":\"large\",\"label\":\"Date of Execution *\",\"hint\":\"The date of execution of the contract\",\"id\":\"dateofexecution\",\"value\":\"2025-05-23\",\"options\":[\"Yes\",\"No\"],\"collapse\":\"true\",\"mode\":\"\",\"maxselect\":\"\",\"apiid\":\"\",\"searchstring\":\"\",\"selectprojection\":\"\",\"ignoredprojections\":\"\",\"savenameseparate\":\"no\",\"dependencies\":[],\"allowedextensions\":\"\",\"extract\":\"\",\"maxsize\":\"\",\"allowdownload\":\"\",\"selectfields\":[],\"mandatory\":\"\",\"copytoreopen\":false,\"displayinhistory\":true,\"elementsjson\":\"\",\"customreporting\":true},{\"type\":\"date\",\"name\":\"\",\"size\":\"large\",\"label\":\"Due Date *\",\"hint\":\"The due date for the contract.\",\"id\":\"duedate\",\"value\":\"2025-05-30\",\"options\":[\"Yes\",\"No\"],\"collapse\":\"true\",\"mode\":\"\",\"maxselect\":\"\",\"apiid\":\"\",\"searchstring\":\"\",\"selectprojection\":\"\",\"ignoredprojections\":\"\",\"savenameseparate\":\"no\",\"dependencies\":[],\"allowedextensions\":\"\",\"extract\":\"\",\"maxsize\":\"\",\"allowdownload\":\"\",\"selectfields\":[],\"mandatory\":\"\",\"copytoreopen\":false,\"displayinhistory\":true,\"elementsjson\":\"\",\"customreporting\":true},{\"type\":\"textarea\",\"name\":\"\",\"size\":\"small\",\"label\":\"Remarks\",\"hint\":\"Remarks on the contract\",\"id\":\"remarks\",\"value\":\"There are no remarks\",\"options\":[\"Yes\",\"No\"],\"collapse\":\"true\",\"mode\":\"\",\"maxselect\":\"\",\"apiid\":\"\",\"searchstring\":\"\",\"selectprojection\":\"\",\"ignoredprojections\":\"\",\"savenameseparate\":\"no\",\"dependencies\":[],\"allowedextensions\":\"\",\"extract\":\"\",\"maxsize\":\"\",\"allowdownload\":\"\",\"selectfields\":[],\"mandatory\":null,\"copytoreopen\":true,\"displayinhistory\":true,\"elementsjson\":\"\",\"customreporting\":true},{\"type\":\"sf-checklist\",\"name\":\"\",\"size\":\"small\",\"label\":\"Terms *\",\"hint\":\"Terms in the contract\",\"id\":\"terms\",\"value\":\"\",\"options\":[\"Yes\",\"No\"],\"collapse\":\"true\",\"mode\":\"\",\"maxselect\":\"\",\"apiid\":\"\",\"searchstring\":\"\",\"selectprojection\":\"\",\"ignoredprojections\":\"\",\"savenameseparate\":\"no\",\"dependencies\":[],\"allowedextensions\":\"\",\"extract\":\"\",\"maxsize\":\"\",\"allowdownload\":\"\",\"selectfields\":[],\"mandatory\":\"\",\"copytoreopen\":true,\"displayinhistory\":true,\"elementsjson\":\"[{\\\"name\\\":\\\"All personnel should wear uniform\\\"},{\\\"name\\\":\\\"Security services personnel should have ID cards\\\"}]\",\"customreporting\":true}]","id":"9dcba65e-7408-4b41-97b2-37bce405052b","tagsmap":{"Safety Measures (ABC Global-Tags);c5b639f8-eea1-47e3-8bf2-dec2ea13170f":true},"reportersmap":{"e9684b5d-ddbc-46d3-ae07-51706bf75410":true},"approversmap":{"c44dcd04-aebb-4417-ba6b-fac170efd5d0":true},"functionheadsmap":{"5fe96caa-1a44-4a2d-921a-920d29433eca":true},"auditorsmap":{},"viewersmap":{},"locationname":"Pune (ABC Global-India-ABC Limited - India-Location)","locationid":"4fb7b672-5cce-443f-869b-6b35247d6331","isnotice":true,"module":"agreement","obligationtitle":"Security/S/PUN/12","documents":[],"comments":[],"approved":false,"lastupdated":"","dateofcompletion":"","docs":["Not Required"]}

  selectedItemIds: any = [];

  reopenedItem: any = {};

  static override styles = css`

    .SfIReportingCCopy {
      width: 100%;
      height: 100%;
      z-index: 10;
      display: none;
      position: absolute;
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
    .mrl-10 {
      margin-left: 10px;
      margin-right: 10px;
    }
    .mt-10{
      margin-top: 10px
    }
    .ml-10{
      margin-left: 10px
    }
    .mr-20{
      margin-right: 20px
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
    .p-5{
      padding: 5px
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
    
    .sf-i-form-modal-container {
      position: fixed;
      width: 80%;
      height: 80%;
      top: 10%;
      right: 10%;
      background-color: white;
      border: 1px solid #888;
      overflow: scroll;
    }
    
    .selected-option {
      font-size: 70%;
      padding: 5px;
      border-radius: 10px;
      border: solid 1px #dddddd;
      white-space: nowrap;
      overflow: hidden !important;
      min-width: 50px;
    }
    .selected-option-icon{
      pointer-events: none
    }

    .selected-option-label{
      pointer-events: none
    }

    .sf-i-form-modal-button-container{
      background-color: white;
      position: sticky;
      top: 0px;
      z-index: 10;
    }
    .commentbox {
      padding: 10px;
      border: solid 1px gray;
      border-radius: 10px;
    }

    .reporterbox {
      width: 90%;
      margin-right: 10%;
    }

    .approverbox {
      width: 90%;
      margin-left: 5%;
    }

    .box-large {
      height: 150px;
      width: 100%;
      background: linear-gradient(-45deg, transparent 10%, #ccc 5%, transparent 60%);
      background-size: 300%;
      background-position-x: 100%;
      animation: shimmer 1.5s infinite linear;
      margin-top: 20px;
      margin-bottom: 20px;
    }


    .box {
      margin-top: 20px;
      height: 10px;
      width: 100%;
      background: linear-gradient(-45deg, transparent 10%, #ccc 5%, transparent 60%);
      background-size: 300%;
      background-position-x: 100%;
      animation: shimmer 1.5s infinite linear;
      margin-bottom: 20px;
    }
  
    @keyframes shimmer {
      to {
         background-position-x: 0%
      }
    }  

    .history-status {
      position: absolute;
      top:10px;
      right: 0;
      left: 0;
      margin-left: auto;
      margin-right: auto;
      width: fit-content;
    }

    .label-button {
      padding-inline: 6px;
      padding-block: 1px;
    }
  `;

  @query('.div-row-error')
  _SfRowError: any;

  @query('.div-row-error-message')
  _SfRowErrorMessage: any;

  @query('.div-row-success')
  _SfRowSuccess: any;

  @query('.div-row-success-message')
  _SfRowSuccessMessage: any;

  @query('.div-row-notif')
  _SfRowNotif: any;

  @query('.div-row-notif-message')
  _SfRowNotifMessage: any;

  @query('.loader-element')
  _SfLoader: any;

  @query('.SfIReportingC')
  _SfIReportingC: any;

  @query('.SfIReportingCCopy')
  _SfIReportingCCopy: any;

  @query('#reporting-container')
  _SfReportingContainer: any;

  @query('#reporting-container-short')
  _SfReportingContainerShort: any;

  @query('#button-submit')
  _SfReportingButtonSubmit: any;

  @query('#button-submit-confirm')
  _SfReportingButtonSubmitConfirm: any;

  @query('#button-submit-cancel')
  _SfReportingButtonSubmitCancel: any;

  @query('#button-edit')
  _SfReportingButtonEdit: any;

  @query('#button-edit-cancel')
  _SfReportingButtonEditCancel: any;

  @query('#button-delete')
  _SfReportingButtonDelete: any;

  @query('#button-delete-cancel')
  _SfReportingButtonDeleteCancel: any;

  @query('#button-delete-confirm')
  _SfReportingButtonDeleteConfirm: any;

  @query('#button-new')
  _SfReportingButtonNew: any;

  @query('#button-back')
  _SfReportingButtonBack: any;

  @query('#decrypt-container')
  _SfDecryptContainer: any;

  @query('#sf-i-project-decrypt')
  _SfDecryptProjectInput: any;

  @query('#input-decrypt')
  _SfDecryptFileInput: any;

  @query('#button-decrypt')
  _SfDecryptButton: any;

  @property()
  decryptProjectId: string = "";

  @property()
  decryptFileName: string = "";

  constructor() {
    super();
  }

  truncate = (str: string, n: number, useWordBoundary: boolean) => {
    if (str.length <= n) { return str; }
    const subString = str.slice(0, n - 1); // the original check
    return (useWordBoundary
      ? subString.slice(0, subString.lastIndexOf(" "))
      : subString) + "&hellip;";
  };

  selectedValues = () => {
    let valueObj: { [key: string]: any } = {};
    let reportingArr = []
    for (let element of this.dataModel) {
      if (element.customreporting) {
        reportingArr.push(element);
      }
      if (isAddButtonObject(element)) {
        let sectionObj = []
        for (let subrecord of element.children) {
          let subrecordObj: { [key: string]: any } = {}
          for (let subElement of subrecord) {
            if (subElement.id !== "") {
              if (subElement.type == "sf-i-form") {
                let form: SfIForm = (this._SfReportingContainer as HTMLDivElement).querySelector('#' + subElement.id) as SfIForm;
                if (subElement.savenameseparate == "yes") {
                  subrecordObj[subElement.id + 'id'] = form.selectedValues()[0] ?? "";
                  subrecordObj[subElement.id + 'name'] = form.selectedTexts()[0] ?? "";
                } else if ((parseInt(subElement.maxselect) ?? 0) > 0) {
                  let tempArr = []
                  for (let [i, val] of form.selectedValues().entries()) {
                    tempArr.push(form.selectedTexts()[i] + ';' + val)
                  }
                  subrecordObj[subElement.id] = tempArr
                } else {
                  subrecordObj[subElement.id] = form.selectedTexts();
                }
              } else if (subElement.type == "sf-i-bricks") {
                let bricks: SfIBricks = (this._SfReportingContainer as HTMLDivElement).querySelector('#' + subElement.id) as SfIBricks;
                if (subElement.savenameseparate == "yes") {
                  subrecordObj[subElement.id + 'id'] = bricks.selectedValues()[0] ?? "";
                  subrecordObj[subElement.id + 'name'] = bricks.selectedTexts()[0] ?? "";
                } else {
                  subrecordObj[subElement.id] = bricks.selectedValueTexts()
                }
              } else if (subElement.type == "sf-i-select") {
                let select: SfISelect = (this._SfReportingContainer as HTMLDivElement).querySelector('#' + subElement.id) as SfISelect;
                subrecordObj[subElement.id + 'id'] = select.selectedValues()[0] ?? "";
                subrecordObj[subElement.id + 'name'] = select.selectedTexts()[0] ?? "";
              } else {
                subrecordObj[subElement.id] = subElement.value;
              }
            }
          }
          sectionObj.push(subrecordObj)
        }
        valueObj[element.label] = sectionObj
      } else {
        if (element.id != "" && element.type != "section") {
          if (element.type == "sf-i-form") {
            let form: SfIForm = (this._SfReportingContainer as HTMLDivElement).querySelector('#' + element.id) as SfIForm;
            if (element.savenameseparate == "yes") {
              valueObj[element.id + 'id'] = form.selectedValues()[0] ?? "";
              valueObj[element.id + 'name'] = form.selectedTexts()[0] ?? "";
            } else if ((parseInt(element.maxselect) ?? 0) > 0) {
              let tempArr = []
              for (let [i, val] of form.selectedValues().entries()) {
                tempArr.push(form.selectedTexts()[i] + ';' + val)
              }
              valueObj[element.id] = tempArr
            } else {
              valueObj[element.id] = form.selectedTexts();
            }
            console.log('selected values form', form.selectedValues(), form.selectedTexts());
          } else if (element.type == "sf-i-form-select") {
            valueObj[element.id] = element.value
            if (element.savenameseparate == "yes") {
              valueObj[element.id] = element.value
            } else {
              for (let field of element.selectfields) {
                valueObj[field] = element.value[field]
              }
            }
          } else if (element.type == "sf-i-bricks") {
            let bricks: SfIBricks = (this._SfReportingContainer as HTMLDivElement).querySelector('#' + element.id) as SfIBricks;
            console.log('sf-i-bricks id', element.id);
            if (element.savenameseparate == "yes") {
              valueObj[element.id + 'id'] = bricks.selectedValues()[0] ?? "";
              valueObj[element.id + 'name'] = bricks.selectedTexts()[0] ?? "";
            } else {
              valueObj[element.id] = bricks.selectedValueTexts()
            }
          } else if (element.type == "sf-i-select") {
            let select: SfISelect = (this._SfReportingContainer as HTMLDivElement).querySelector('#' + element.id) as SfISelect;
            valueObj[element.id + 'id'] = select.selectedValues()[0] ?? "";
            valueObj[element.id + 'name'] = select.selectedTexts()[0] ?? "";
          } else if (element.type == "sf-checklist") {
            let checklist: SfChecklist = (this._SfReportingContainer as HTMLDivElement).querySelector('#' + element.id) as SfChecklist;
            if(this.mode == "admin"){
              valueObj[element.id] = checklist.listelements ?? "";
            }else{
              valueObj[element.id] = checklist.listselection ?? "";
            }
          } else {
            valueObj[element.id] = element.value;
          }
        }
      }
    }

    if(reportingArr.length > 0){
      valueObj['customreporting'] = JSON.stringify(reportingArr)
    }
    if(this.showterminate == "true"){
      valueObj['terminated'] = this.terminated;
    }
    return valueObj
  }
  submitClick = () => {
    (this._SfReportingButtonSubmit as HTMLButtonElement).style.display = 'none';
    (this._SfReportingButtonSubmitCancel as HTMLButtonElement).style.display = 'flex';
    (this._SfReportingButtonSubmitConfirm as HTMLButtonElement).style.display = 'flex';
  }
  submitCancelClick = () => {
    (this._SfReportingButtonSubmit as HTMLButtonElement).style.display = 'flex';
    (this._SfReportingButtonSubmitCancel as HTMLButtonElement).style.display = 'none';
    (this._SfReportingButtonSubmitConfirm as HTMLButtonElement).style.display = 'none';
  }
  submitConfirmClick = () => {
    console.log('submit confired', this.selectedValues());
    if (this.flow == "new") {
      this.submitNew();
    } else {
      this.submitEdit();
    }
  }

  editClick = () => {
    this.flow = "edit";
    this.loadMode()
  }

  editCancelClick = () => {
    this.flow = "details";
    this.loadMode()
  }

  publishClick = () => {
    this.published = !this.published;
    this.submitEdit()
  }

  newClick = () => {
    console.log('new clicked');
    this.prepopulateValJson = "[]";
    this.flow = "new";
    this.loadMode();
  }

  backClick = () => {
    console.log('back clicked');
    this.flow = "list";
    this.loadMode();
  }

  deleteClick = () => {
    (this._SfReportingButtonDelete as HTMLButtonElement).style.display = 'none';
    (this._SfReportingButtonDeleteCancel as HTMLButtonElement).style.display = 'flex';
    (this._SfReportingButtonDeleteConfirm as HTMLButtonElement).style.display = 'flex';
  }

  deleteCancelClick = () => {
    (this._SfReportingButtonDelete as HTMLButtonElement).style.display = 'flex';
    (this._SfReportingButtonDeleteCancel as HTMLButtonElement).style.display = 'none';
    (this._SfReportingButtonDeleteConfirm as HTMLButtonElement).style.display = 'none';
  }

  deleteConfirmClick = () => {
    this.submitDelete()
  }

  getBricksValues = (element: DataObject, selectedValues: string[] = []) => {
    let names = [];
    let ids = []
    if (element.id == "country") {
      console.log('getting usermap', this.getUserMap());
      for (let country of Object.keys(this.getUserMap())) {
        if (country == "roles") {
          continue;
        }
        if (names.indexOf(country.split(';')[0]) < 0) {
          names.push(country.split(';')[0])
          ids.push(country.split(';')[1])
        }
      }
    } else if (element.id == "entity") {
      for (let country of Object.keys(this.getUserMap())) {
        if (country == "roles") {
          continue;
        }
        if (selectedValues.length > 0 && country == selectedValues[0]) {
          for (let entity of Object.keys(this.getUserMap()[country])) {
            console.log('bricks entity', entity, selectedValues);
            if (names.indexOf(entity.split(';')[0]) < 0) {
              names.push(entity.split(';')[0])
              ids.push(entity.split(';')[1])
            }
          }
        }
      }
    } else if (element.id == "locations") {
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
                  names.push(location.split(';')[0])
                  ids.push(location.split(';')[1])
                }
              }
            }
          }
        }
      }
    } else if (element.id == "tags") {
      for (let country of Object.keys(this.getUserMap())) {
        if (country == "roles") {
          continue;
        }
        if (selectedValues.length > 0 && country == selectedValues[0]) {
          for (let entity of Object.keys(this.getUserMap()[country])) {
            if (selectedValues.length > 1 && entity == selectedValues[1]) {
              for (let location of Object.keys(this.getUserMap()[country][entity])) {
                if (selectedValues[2] != null && selectedValues[2].indexOf(location) >= 0) {
                  for (let tag of this.getUserMap()[country][entity][location]['tags']) {
                    console.log('bricks tag', tag, selectedValues);
                    if (tag.indexOf(element.searchstring) >= 0) {
                      if (names.indexOf(tag.split(';')[0]) < 0) {
                        names.push(tag.split(';')[0])
                        ids.push(tag.split(';')[1])
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
    return [names, ids]
  }

  initListeners = () => {
    (this._SfReportingButtonSubmit as HTMLButtonElement)?.removeEventListener('click', this.submitClick);
    (this._SfReportingButtonSubmit as HTMLButtonElement)?.addEventListener('click', this.submitClick);
    (this._SfReportingButtonSubmitConfirm as HTMLButtonElement)?.removeEventListener('click', this.submitConfirmClick);
    (this._SfReportingButtonSubmitConfirm as HTMLButtonElement)?.addEventListener('click', this.submitConfirmClick);
    (this._SfReportingButtonSubmitCancel as HTMLButtonElement)?.removeEventListener('click', this.submitCancelClick);
    (this._SfReportingButtonSubmitCancel as HTMLButtonElement)?.addEventListener('click', this.submitCancelClick);
    // (this._SfReportingButtonEdit as HTMLButtonElement)?.removeEventListener('click', this.editClick);
    // (this._SfReportingButtonEdit as HTMLButtonElement)?.addEventListener('click', this.editClick);
    // (this._SfReportingContainer.querySelector('#button-detail-close') as HTMLButtonElement)?.addEventListener('click', () => {
    //   (this._SfReportingContainer as HTMLDivElement).innerHTML = '';
    //   (this._SfReportingContainer as HTMLDivElement).style.display = 'none';
    //   // (this._SfReportingButtonContainer as HTMLDivElement).style.display = 'none';
    // });
  }

  initListListeners = () => {
    // (this._SfReportingButtonNew as HTMLButtonElement)?.removeEventListener('click', this.newClick);
    (this._SfReportingButtonNew as HTMLButtonElement)?.addEventListener('click', this.newClick);
  }

  initNewListeners = () => {
    (this._SfReportingButtonBack as HTMLButtonElement)?.removeEventListener('click', this.backClick);
    (this._SfReportingButtonBack as HTMLButtonElement)?.addEventListener('click', this.backClick);
  }
  initDetailsListeners = () => {
    if (this.editdisable == "true") {
      if(this._SfReportingButtonBack != null)(this._SfReportingButtonBack as HTMLButtonElement).style.display = 'none';
      if(this._SfReportingButtonEdit != null)(this._SfReportingButtonEdit as HTMLButtonElement).style.display = 'none';
      if(this._SfReportingButtonDelete != null)(this._SfReportingButtonDelete as HTMLButtonElement).style.display = 'none';
      if(this._SfReportingButtonDeleteCancel != null)(this._SfReportingButtonDeleteCancel as HTMLButtonElement).style.display = 'none';
      if(this._SfReportingButtonDeleteConfirm != null)(this._SfReportingButtonDeleteConfirm as HTMLButtonElement).style.display = 'none';
    } else {
      (this._SfReportingButtonBack as HTMLButtonElement)?.removeEventListener('click', this.backClick);
      (this._SfReportingButtonBack as HTMLButtonElement)?.addEventListener('click', this.backClick);
      (this._SfReportingButtonEdit as HTMLButtonElement)?.removeEventListener('click', this.editClick);
      (this._SfReportingButtonEdit as HTMLButtonElement)?.addEventListener('click', this.editClick);
      (this._SfReportingButtonDelete as HTMLButtonElement)?.removeEventListener('click', this.deleteClick);
      (this._SfReportingButtonDelete as HTMLButtonElement)?.addEventListener('click', this.deleteClick);
      (this._SfReportingButtonDeleteCancel as HTMLButtonElement)?.removeEventListener('click', this.deleteCancelClick);
      (this._SfReportingButtonDeleteCancel as HTMLButtonElement)?.addEventListener('click', this.deleteCancelClick);
      (this._SfReportingButtonDeleteConfirm as HTMLButtonElement)?.removeEventListener('click', this.deleteConfirmClick);
      (this._SfReportingButtonDeleteConfirm as HTMLButtonElement)?.addEventListener('click', this.deleteConfirmClick);
    }

  }
  initEditListeners = () => {
    (this._SfReportingButtonBack as HTMLButtonElement)?.removeEventListener('click', this.backClick);
    (this._SfReportingButtonBack as HTMLButtonElement)?.addEventListener('click', this.backClick);
    (this._SfReportingButtonEditCancel as HTMLButtonElement)?.removeEventListener('click', this.editCancelClick);
    (this._SfReportingButtonEditCancel as HTMLButtonElement)?.addEventListener('click', this.editCancelClick);
  }

  populateDataModel = () => {
    console.log('populating data model')
    let sectionCount = 0
    this.dataModel = [];
    console.log('getconfigjson', this.getConfigJson());
    for (let element of this.getConfigJson()) {
      if (Array.isArray(element)) {
        let addElement = element[0];
        let schemaElement = element.splice(1, element.length - 1)
        let addObject: AddButtonObject = createAddButtonObject({ id: addElement.type, label: addElement.name, schema: JSON.stringify(schemaElement), direction: addElement.direction });
        this.dataModel.push(addObject);
      } else {
        if (element.type == "section") {
          let dataObj: DataObject = createDataObject({ id: 'section-' + sectionCount, name: element.name, type: element.type })
          if (this.editdisable == "true" || this.flow == "details") {
            dataObj.collapse = "true"
          }
          this.dataModel.push(dataObj)
          sectionCount++;
        } else {
          let dataObj: DataObject = createDataObject(element)
          this.dataModel.push(dataObj)
        }
      }
    }
    console.log('dataModel', this.dataModel);
  }

  populateView = async (scrollTopTarget: number = 0) => {
    console.log('populating view');
    let html = "";
    // html += `<div class="d-flex justify-between m-20">
    //           <button part="button-icon" class="material-icons invisible">close</button>
    //           <h3 part="results-title" class="m-0">${this.name}</h3>
    //           <button id="button-detail-close" part="button-icon" class="material-icons">close</button>
    //         </div>`
    html += `${this.name.length > 1 ? `<div class="d-flex flex-col md-20-ml-10" part="title-section">
              <div class="d-flex w-100-m-0 justify-between align-center">
                ${this.editdisable != "true" ? `
                <button id="button-back" part="button-icon" class="button-icon-click"><span class="material-icons">keyboard_backspace</span></button>` : ''}
                ${this.editdisable != "true" ? `<h3 part="results-title" class="m-0">${this.name}</h3>` : ''}
                ${this.editdisable != "true" ? (`
                <div class="d-flex justify-center align-center">${this.flow == "new" ? `
                    <button class="mrl-5 material-icons invisible" part="button-icon" id="button-submit" disabled>save</button>
                    <button class="mrl-5 material-icons hide" part="button-icon-light" id="button-submit-cancel">close</button>
                    <button class="mrl-5 material-icons hide" part="button-icon" id="button-submit-confirm">check save</button>
                  ` : (this.flow == "details" ? `
                    <span class="mrl-5" part="span-icon${this.published ? '-light' : ''}" id="span-submit-publish">${this.published ? 'Published' : 'Unpublished'}</span>
                    <button id="button-edit" part="button-icon" class="mrl-5 material-icons button-icon-click">edit</button>
                    <button part="button-icon" class="mrl-5 material-symbols-outlined button-icon-click button-reopen hide" id="button-reopen">reopen_window</button>
                    <button id="button-delete" part="button-icon" class="mrl-5 material-icons button-icon-click hide">delete</button>
                    <button id="button-delete-cancel" part="button-icon-light" class="mrl-5 material-icons button-icon-click hide">close</button>
                    <button id="button-delete-confirm" part="button-icon" class="mrl-5 button-icon-click hide"><span class="material-icons">delete</span><span class="material-icons">done</span></button>
                    <button part="button-icon" class="mrl-5 material-symbols-outlined button-icon-click button-more" id="button-more">more_vert</button>
                    <button part="button-icon" class="mrl-5 material-symbols-outlined button-icon-click hide" id="button-more-close">close</button>
                    
              ` : `
                    <button class="mrl-5" part="button-icon${this.published ? '-light' : ''}" id="button-submit-publish">${this.published ? 'Unpublish' : 'Publish'}</button>
                    <button id="button-edit-cancel" part="button-icon-light" class="mrl-5 material-icons button-icon-click">edit_off</button>
                    <button class="mrl-5 material-icons hide" part="button-icon" id="button-submit" disabled>save</button>
                    <button class="mrl-5 material-icons hide" part="button-icon-light" id="button-submit-cancel">close</button>
                    <button class="mrl-5 material-icons hide" part="button-icon" id="button-submit-confirm">check save</button>
              `)
        }
                </div>`) : ''}
              </div>
              <div class="progress-bar w-100-m-0 d-flex flex-wrap" part="progress-bar">
                <div class="progress-bar-complete" part="progress-bar-complete"></div>
                <div class="progress-bar-finished" part="progress-bar-finished"></div>
                <div class="progress-bar-incomplete" part="progress-bar-incomplete"></div>
              </div>
            </div>` : ``}
            <div class="d-flex ${this.formviewclass} form-container align-stretch p-10" part="${this.published ? "form-container-published" : "form-container"}">`

    let firstFlag = true
    for (let element of this.dataModel) {
      if (isAddButtonObject(element)) {
        let addButtonObject = element as AddButtonObject;
        for (let i = 0; i < addButtonObject.children.length; i++) {
          html += this.renderAddSection(addButtonObject, (i + 1))
          html += this.renderSectionContainer(addButtonObject);
          for (let childElement of addButtonObject.children[i]) {
            html += this.renderElement(childElement);
          }
          if (addButtonObject.direction == "row") {
            html += '</div>'
          }
        }
        if (this.mode != "view") {
          html += this.renderAddButton(addButtonObject);
        }
      } else {
        if (element.type == "section") {
          if (firstFlag) {
            firstFlag = false;
          } else {
            html += '</div></div>'
          }
        }
        html += this.renderElement(element)
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
              </div>`
    }
    if (this.showterminate == "true") {

      html += `
              <div part="terminate-container"  class="d-flex flex-col flex-grow">
                
                <div class="d-flex" part=${this.terminated ? "terminate-container-terminated" : "terminate-container-active"}  id="terminate-container">
                  <input type="checkbox" id="input-terminate-checkbox" class="input-terminate-checkbox" part="input-terminate-checkbox" ${this.terminated ? "checked" : ""}>
                  <label id="input-terminate-checkbox-label" for="input-terminate-checkbox" part="textarea-label">Terminate</label>
                </div>
              </div>`
    }
    if (this.flow != "details") {
      html += `
        <div class="sf-i-form-modal-container d-flex flex-col align-stretch hide" part="sf-i-form-modal-container" id="sf-i-form-modal-container">
          <div class="sf-i-form-modal-button-container d-flex justify-between align-center p-10" part="sf-i-form-modal-button-container">
            <button id="button-close-form" part="button-icon" class="button-icon-click"><span class="material-icons">keyboard_backspace</span></button>
            <button id="button-save-form" part="button-icon" class="button-icon-click"><span class="material-icons">check</span></button>
          </div>
          <div class="d-flex p-10" id="sf-i-form-container" part="sf-i-form-container"></div>
        </div>
      `;
    }

    (this._SfReportingContainer as HTMLDivElement).innerHTML = html;
    (this._SfReportingContainer as HTMLDivElement).style.display = 'block';
    this.initSectionListeners();
    
    // (this._SfReportingButtonContainer as HTMLDivElement).style.display = 'flex';
    if (this.mode == "view") {
      //   (this._SfReportingButtonEdit as HTMLButtonElement).style.display = 'flex';
      //   (this._SfReportingButtonSubmit as HTMLButtonElement).style.display = 'none';
      //   (this._SfReportingButtonSubmitConfirm as HTMLButtonElement).style.display = 'none';
      //   (this._SfReportingButtonSubmitCancel as HTMLButtonElement).style.display = 'none';
    } else {
      if (this.mode == "admin" && this.flow != "details") {
        // (this._SfReportingButtonEdit as HTMLButtonElement).style.display = 'none';
        (this._SfReportingButtonSubmit as HTMLButtonElement).style.display = 'flex';
        (this._SfReportingButtonSubmit as HTMLButtonElement).disabled = this.flow == "view";
        (this._SfReportingButtonSubmitConfirm as HTMLButtonElement).style.display = 'none';
        (this._SfReportingButtonSubmitCancel as HTMLButtonElement).style.display = 'none';
      }
      this.initInputListeners();
    }
    this.initListeners();
    for (let [i, element] of this.dataModel.entries()) {
      if (element.type == "sf-i-form") {
        let form: SfIForm = (this._SfReportingContainer as HTMLDivElement).querySelector('#' + element.id) as SfIForm;
        if (this.mode == "view" || this.flow == "details") {
          form.flow = "read"
        }
        if (element.value != '') {
          form.selectedSearchId = element.value
        }

        // setTimeout(() => {form.loadMode();},1000)
      } else if (element.type == "sf-i-bricks") {
        console.log('bricks element value', element.value, element.id);
        let bricks: SfIBricks = (this._SfReportingContainer as HTMLDivElement).querySelector('#' + element.id) as SfIBricks
        let selectedDependedValues = []
        for (let dependency of element.dependencies) {
          for (let tempElement of this.dataModel) {
            if (tempElement.id == dependency) {
              selectedDependedValues.push(tempElement.value)
            }
          }
        }
        let values = this.getBricksValues(element, selectedDependedValues);
        console.log('bricks selecteddependantvalues', element.id, element.value, selectedDependedValues, values[0], values[1]);
        bricks.namesjson = JSON.stringify(values[0])
        bricks.idsjson = JSON.stringify(values[1])
        if (element.value != '') {
          let arr = []
          for (let tempVal of element.value) {
            console.log('bricks selecteddependantvalues tempVal', tempVal, values[0].indexOf(tempVal.split(';')[0]), values[1][(values[1].indexOf(tempVal.split(';')[0]))]);
            if (values[1][(values[0].indexOf(tempVal.split(';')[0]))] == tempVal.split(';')[1]) {
              arr.push(tempVal)
            }
          }
          console.log('bricks selecteddependantvalues value', arr, element.value, element.id);
          bricks.prepopulateValJson = JSON.stringify(arr)
          this.dataModel[i].value = arr
        } else {
          bricks.prepopulateValJson = JSON.stringify([])
        }
        console.log('bricks element values', bricks.prepopulateValJson, bricks.namesjson, bricks.idsjson, element.id);
        if (this.mode == "view" || this.flow == "details") {
          bricks.flow = "view"
        } else {
          bricks.flow = "edit"
        }
        bricks.loadMode()
      } else if (element.type == "sf-i-uploader") {
        await customElements.whenDefined('sf-i-uploader');
        let uploader: SfIUploader = (this._SfReportingContainer as HTMLDivElement).querySelector('#' + element.id) as SfIUploader
        uploader.prepopulatedInputArr = JSON.stringify(element.value ?? []);
        uploader.readOnly = (this.mode == "view" || this.flow == "details")
        console.log('uploader', uploader, uploader.prepopulatedInputArr, element.value);
        if (uploader != null) {
          setTimeout(() => {
            uploader.loadMode()
          }, 500)
        }
      } else if (element.type == "sf-i-form-select") {
        let buttonEditForm = (this._SfReportingContainer as HTMLDivElement).querySelector('#button-edit-form-' + element.id) as HTMLButtonElement
        buttonEditForm?.addEventListener('click', () => {
          let formHtml = `
            <div part="date-container" class="d-flex flex-col flex-grow mt-20">
              <label id="${element.id}-label" part="date-label">${element.label}</label>
              <div part="td-body-2"><sf-i-elastic-text text="${element.hint}" minLength="50"></sf-i-elastic-text></div>
              <sf-i-form exportparts="td-action:form-td-action, td-body" id="${element.id}" class="reporting-sf-i-form" part="input-sf-i-form" name="${element.name}" label="" apiId="${element.apiid}" mode="${element.mode}" searchPhrase="${((element.mode == "multiselect-dropdown" || element.searchstring != "") ? (this.projectname + "&") : "") + element.searchstring}" selectProjection="${element.selectprojection}" ignoreProjections="${element.ignoredprojections}" ${parseInt(element.maxselect) == 0 ? "" : `maxselect="${element.maxselect}"`} ${element.mandatory != null ? "mandatory=\"\"" : ""}></sf-i-form>
            </div>
          `

          let formContainer = (this._SfReportingContainer as HTMLDivElement).querySelector('#sf-i-form-container') as HTMLDivElement
          formContainer.innerHTML = formHtml
          let formModalContainer = (this._SfReportingContainer as HTMLDivElement).querySelector('#sf-i-form-modal-container') as HTMLDivElement
          formModalContainer.style.display = 'block'
          let formCloseButton = (this._SfReportingContainer as HTMLDivElement).querySelector('#button-close-form') as HTMLButtonElement
          formCloseButton.addEventListener('click', () => {
            formModalContainer.style.display = 'none'
          })
          let formSaveButton = (this._SfReportingContainer as HTMLDivElement).querySelector('#button-save-form') as HTMLButtonElement
          let formObj = formContainer.querySelector('#' + element.id) as SfIForm
          console.log('formobj searchPhrase', formObj.searchPhrase);
          // if(formObj.searchPhrase != ''){
          //   formObj.loadMode();
          // }
          console.log('selectedsearchid', element.value)
          if ((element.value.id ?? '') != '') {
            formObj.selectedSearchId = element.value.id
            console.log('form selectedsearchid', formObj.selectedSearchId)
            formSaveButton.style.visibility = 'visible';
          } else {
            formSaveButton.style.visibility = 'hidden';
          }
          formObj.addEventListener('valueChanged', () => {
            if (formObj.selectedEntireValues() != null && Object.keys(formObj.selectedEntireValues()).length > 0) {
              formSaveButton.style.visibility = 'visible';
            } else {
              formSaveButton.style.visibility = 'hidden';
            }
          })
          formSaveButton.addEventListener('click', async () => {
            await this.showLoader();
            formModalContainer.style.display = 'none'
            let formObj = formContainer.querySelector('#' + element.id) as SfIForm
            console.log("selected", formObj, element.id)
            for (let dataElement of this.dataModel) {
              if (dataElement.id == element.id) {
                let valObj: any = {}
                let selectedObj = formObj.selectedEntireValues()
                valObj.id = selectedObj.id
                let cols = JSON.parse(selectedObj.fields?.cols ?? '[]')
                let data = JSON.parse(selectedObj.fields?.data ?? '[]')
                for (let [i, col] of cols.entries()) {
                  valObj[col] = data[i]
                }
                if (dataElement.savenameseparate == "yes") {
                  console.log('populating dataelement', valObj)
                  dataElement.value = [valObj.name + ';' + valObj.id];
                } else {
                  dataElement.value = valObj
                }
              }
            }
            let reportingFormContainer = (this._SfReportingContainer as HTMLDivElement).querySelector('.form-container') as HTMLDivElement
            if (reportingFormContainer != null) {
              console.log('scrolling', reportingFormContainer.scrollTop)
              this.populateView(reportingFormContainer.scrollTop);
            }
          })
          if (element.dependencies != null && element.dependencies.length > 0) {
            this.updateShortlistedSearchPhrases(element.id);
          }
        })
      } else if (element.type == "sf-i-select") {
        console.log('rendering sf-i-select', element.id)
        await customElements.whenDefined('sf-i-select');
        let select: SfISelect = (this._SfReportingContainer as HTMLDivElement).querySelector('#' + element.id) as SfISelect
        select.flow = (this.mode == "view" || this.flow == "details") ? "read" : ""
        if (element.value != '') {
          let valArr = [element.value[0].split(';')[1]]
          select.selectedId = valArr
        }
        select.loadMode()
        console.log('sf-i-select', select, select.selectedId, element.id);
      } else if (element.type == "sf-checklist") {
        console.log('rendering sf-checklist', element.id, JSON.stringify(element.value));
        await customElements.whenDefined('sf-checklist');
        let checklist: SfChecklist = (this._SfReportingContainer as HTMLDivElement).querySelector('#' + element.id) as SfChecklist
        if (this.mode == 'admin' && this.flow != "details") {
          checklist.listelements = element.value ?? []
        } else {
          checklist.listelements = element.elementsjson != '' ? JSON.parse(element.elementsjson) : (element.value ?? [])
          checklist.listselection = JSON.stringify(element.value) != '' ? element.value : {}
        }
        checklist.readonly = (this.mode == "view" || this.flow == "details")
        checklist.mode = this.mode
        // console.log('sf-checklist', checklist.listelements, checklist.readonly, this.mode, this.flow);
        setTimeout(() => {
          console.log('sf-checklist', checklist.listelements, element.value, this.mode, this.flow);
          checklist.loadMode()
        }, 200)
      }
    }
    if (this.mode != "view" && this.flow != 'details') {
      let selectedOptions = (this._SfReportingContainer as HTMLDivElement).querySelectorAll('.selected-option') as NodeListOf<HTMLDivElement>
      for (let selectedOption of selectedOptions) {
        selectedOption?.addEventListener('click', async (ev: any) => {
          await this.showLoader();
          let target = ev.target
          let elementId = target.id
          let id = elementId.split('-')[2]
          for (let [i, dataObj] of this.dataModel.entries()) {
            if (dataObj.id == id) {
              this.dataModel[i].value = ''
            }
          }
          let formContainer = (this._SfReportingContainer.querySelector('.form-container') as HTMLElement)
          if (formContainer != null) {
            this.populateView(formContainer.scrollTop);
          }
        })
      }
    }
    let checkboxPublish = (this._SfReportingContainer as HTMLDivElement).querySelector('#input-publish-checkbox') as HTMLInputElement
    checkboxPublish?.addEventListener('click', (ev: any) => {
      let target = ev.target as HTMLInputElement
      this.published = target.checked
      let publishedContainer = (this._SfReportingContainer as HTMLDivElement).querySelector('#published-container') as HTMLDivElement
      publishedContainer.setAttribute('part', this.published ? "published-container-published" : "published-container-unpublished")
      let formContainer = this._SfReportingContainer.querySelector('.form-container') as HTMLDivElement
      formContainer.setAttribute('part', this.published ? "form-container-published" : "form-container")
      console.log('publish checked', this.published);
    }
    )
    let checkboxPublishLabel = (this._SfReportingContainer as HTMLDivElement).querySelector('#input-publish-checkbox-label') as HTMLLabelElement
    checkboxPublishLabel?.addEventListener('click', () => {
      checkboxPublish.click()
    })

    let checkboxTerminate = (this._SfReportingContainer as HTMLDivElement).querySelector('#input-terminate-checkbox') as HTMLInputElement
    checkboxTerminate?.addEventListener('click', (ev: any) => {
      let target = ev.target as HTMLInputElement
      this.terminated = target.checked
      let terminateContainer = (this._SfReportingContainer as HTMLDivElement).querySelector('#terminate-container') as HTMLDivElement
      terminateContainer.setAttribute('part', this.terminated ? "terminate-container-published" : "terminate-container-unpublished")
      let formContainer = this._SfReportingContainer.querySelector('.form-container') as HTMLDivElement
      formContainer.setAttribute('part', this.terminated ? "form-container-published" : "form-container")
      console.log('terminate checked', this.terminated);
    })

    let buttonBack = (this._SfReportingContainer as HTMLDivElement).querySelector('#button-back') as HTMLButtonElement
    buttonBack?.addEventListener('click', this.backClick);

    let buttonSubmit = (this._SfReportingContainer as HTMLDivElement).querySelector('#button-submit') as HTMLButtonElement
    if (this.flow == "new") {
      buttonSubmit.style.visibility = 'visible'
    }
    buttonSubmit?.addEventListener('click', this.submitClick);
    let buttonSubmitConfirm = (this._SfReportingContainer as HTMLDivElement).querySelector('#button-submit-confirm') as HTMLButtonElement
    buttonSubmitConfirm?.addEventListener('click', this.submitConfirmClick)
    let buttonSubmitCancel = (this._SfReportingContainer as HTMLDivElement).querySelector('#button-submit-cancel') as HTMLButtonElement
    buttonSubmitCancel?.addEventListener('click', this.submitCancelClick)

    let buttonPublish = ((this._SfReportingContainer as HTMLDivElement).querySelector('#button-submit-publish') as HTMLButtonElement)
    buttonPublish?.addEventListener('click', () => {
      console.log('publish clicked', this.published);
      this.publishClick();
    })

    let buttonEdit = (this._SfReportingContainer as HTMLDivElement).querySelector('#button-edit') as HTMLButtonElement
    buttonEdit?.addEventListener('click', this.editClick)
    let buttonMore = (this._SfReportingContainer as HTMLDivElement).querySelector('#button-more') as HTMLButtonElement
    buttonMore?.addEventListener('click', () => {
      buttonMore.style.display = 'none'
      let buttonReopen = (this._SfReportingContainer as HTMLDivElement).querySelector('#button-reopen') as HTMLButtonElement
      if (buttonReopen != null) {
        buttonReopen.style.display = 'block'
        buttonReopen.addEventListener('click', async () => {
          this.reopenedItem = this.getPrepopulateJson()
          let oldObj = this.reopenedItem
          this.showLoader();
          console.log('item selected', this.reopenedItem);
          await this.fetchSchema();
          this.published = this.published ?? false
          let copyVals: any = {}
          for (let obj of this.dataModel) {
            if (obj.copytoreopen) {
              console.log('copyVals copying', obj.id, obj.type, oldObj[obj.id]);
              if (obj.type == "sf-i-bricks" && obj.savenameseparate == "yes") {
                copyVals[obj.id + 'id'] = oldObj[obj.id + 'id'];
                copyVals[obj.id + 'name'] = oldObj[obj.id + 'name'];
              } else {
                copyVals[obj.id] = oldObj[obj.id];
              }
              console.log('copyVals copied', copyVals)
            }
          }
          console.log('copyVals', JSON.parse(JSON.stringify(copyVals)))
          this.prepopulateValJson = JSON.stringify(copyVals)
          this.flow = "edit"
          this.loadMode();
        })
      }
      let buttonDelete = (this._SfReportingContainer as HTMLDivElement).querySelector('#button-delete') as HTMLButtonElement
      if (buttonDelete != null) {
        buttonDelete.style.display = 'block'
        buttonDelete?.addEventListener('click', this.deleteClick)
      }
      let buttonMoreClose = (this._SfReportingContainer as HTMLDivElement).querySelector('#button-more-close') as HTMLButtonElement
      buttonMoreClose.style.display = 'block'
      buttonMoreClose?.addEventListener('click', () => {
        let buttonMore = (this._SfReportingContainer as HTMLDivElement).querySelector('#button-more') as HTMLButtonElement
        if (buttonMore != null) {
          buttonMore.style.display = 'block'
        }
        buttonMoreClose.style.display = 'none'
        let buttonReopen = (this._SfReportingContainer as HTMLDivElement).querySelector('#button-reopen') as HTMLButtonElement
        if (buttonReopen != null) {
          buttonReopen.style.display = 'none'
        }
        let buttonDelete = (this._SfReportingContainer as HTMLDivElement).querySelector('#button-delete') as HTMLButtonElement
        if (buttonDelete != null) {
          buttonDelete.style.display = 'none'
        }
        let buttonDeleteCancel = (this._SfReportingContainer as HTMLDivElement).querySelector('#button-delete-cancel') as HTMLButtonElement
        if (buttonDeleteCancel != null) {
          buttonDeleteCancel.style.display = 'none'
        }
        let buttonDeleteConfirm = (this._SfReportingContainer as HTMLDivElement).querySelector('#button-delete-confirm') as HTMLButtonElement
        if (buttonDeleteConfirm != null) {
          buttonDeleteConfirm.style.display = 'none'
        }
      })
    })
    let buttonDelete = (this._SfReportingContainer as HTMLDivElement).querySelector('#button-delete') as HTMLButtonElement
    buttonDelete?.addEventListener('click', this.deleteClick)
    let buttonDeleteCancel = (this._SfReportingContainer as HTMLDivElement).querySelector('#button-delete-cancel') as HTMLButtonElement
    buttonDeleteCancel?.addEventListener('click', this.deleteCancelClick)
    let buttonDeleteConfirm = (this._SfReportingContainer as HTMLDivElement).querySelector('#button-delete-confirm') as HTMLButtonElement
    buttonDeleteConfirm?.addEventListener('click', this.submitDelete)

    let buttonEditCancel = (this._SfReportingContainer as HTMLDivElement).querySelector('#button-edit-cancel') as HTMLButtonElement
    buttonEditCancel?.addEventListener('click', this.editCancelClick)

    setTimeout(() => {
      this.evalShowProgress();
      (this._SfReportingContainer.querySelector('.form-container') as HTMLDivElement).scrollTo({ top: scrollTopTarget, left: 0 });
      this.hideLoader();
      let customEvent = new CustomEvent('valueChanged');
      this.dispatchEvent(customEvent);
    }, 500)
    if (this.getPrepopulateJson().history != null && Object.keys(this.getPrepopulateJson().history).length > 0) {
      this.populateHistory()
    }
  }

  populateHistory = () => {
    console.log('populating history', this.getPrepopulateJson().history)
    let formContainer = (this._SfReportingContainer.querySelector('.form-container') as HTMLElement)
    if (formContainer != null) {
      let html = ''
      html += `
        <div class="d-flex flex-col" part="section-container"><div id="history" class="section-head d-flex align-center justify-between" part="section-head-collapsed"><h3 part="section-title-collapsed" id="section-history-title">History</h3><div class="material-icons" id="section-history-icon">keyboard_arrow_down</div></div><div id="section-history-body" class="section-body d-flex ${this.formviewclass} hide" part="section-body">
      `
      for (let [indexDate, historyDate] of Object.keys(this.getPrepopulateJson().history).entries()) {
        console.log('history', this.getPrepopulateJson().history);
        html += `
          <div class="d-flex flex-col" part="section-container"><div id="history-date-${indexDate}" class="history-section-head section-head d-flex align-center justify-between" part="section-head-collapsed"><h3 part="section-title-collapsed" class="section-history-title" id="section-history-title-${indexDate}">${historyDate}</h3><div class="section-history-icon material-icons" id="section-history-icon-${indexDate}">keyboard_arrow_down</div></div><div id="section-history-body-${indexDate}" class="section-history-body section-body d-flex ${this.formviewclass} hide" part="section-body">
        `
        for (let [index, historyItem] of this.getPrepopulateJson().history[historyDate].entries()) {
          console.log('historyitem', historyItem)
          html += `<sf-i-reporting name="" id="history-reporting-${historyDate}-${index}" class="history-reporting" exportparts="uploader-extracted-text:reporting-uploader-extracted-text, uploader-sf-upload-message:reporting-uploader-sf-upload-message, uploader-sf-upload-submessage:reporting-uploader-sf-upload-submessage, uploader-extracted-text-chip:reporting-uploader-extracted-text-chip, uploader-extracted-text-chip-failed:reporting-uploader-extracted-text-chip-failed, uploader-doctype-verify-badge:reporting-uploader-doctype-verify-badge,span-submit-published:reporting-span-submit-published, span-submit-unpublished:reporting-span-submit-unpublished, reporting-container:reporting-reporting-container, button-icon:reporting-button-icon, uploader-button-icon:reporting-uploader-button-icon, sf-i-form-modal-container:reporting-sf-i-form-modal-container, next-calendar-date:reporting-next-calendar-date, last-calendar-date:reporting-last-calendar-date, input-publish-checkbox:reporting-input-publish-checkbox, button-icon-light:reporting-button-icon-light, button-icon-small:reporting-button-icon-small, uploader-input-label:reporting-uploader-input-label, input-radio:reporting-input-radio, radio-label:reporting-radio-label, input-textarea:reporting-input-textarea, input-date:reporting-input-date, input-select-single:reporting-input-select-single, textarea-container:reporting-textarea-container, section-body:reporting-section-body, section-container:reporting-section-container, date-container:reporting-date-container, input-sf-i-uploader:reporting-input-sf-i-uploader, published-container:reporting-published-container, selected-option:reporting-selected-option, input-select-multi-option:reporting-input-select-multi-option, select-option-label:reporting-select-option-label, input-sf-i-form:reporting-input-sf-i-form, input-sf-i-bricks:reporting-input-sf-i-bricks, uploader-input:reporting-uploader-input, form-container:reporting-form-container, published-container:reporting-published-container, form-container-published:reporting-form-container-published, subsection:reporting-subsection, results-title:reporting-results-title, td-head:reporting-td-head, td-action:reporting-td-action, td-body:reporting-td-body, td-body-2:reporting-td-body-2, add-button:reporting-add-button, uploader-button:reporting-uploader-button, section-head-collapsed:reporting-section-head-collapsed, section-title-expanded:reporting-section-title-expanded, section-title-collapsed:reporting-section-title-collapsed, section-head-expanded:reporting-section-head-expanded, progress-bar-finished:reporting-progress-bar-finished, progress-bar-complete:reporting-progress-bar-complete, progress-bar-incomplete:reporting-progress-bar-incomplete, section-success-icon:reporting-section-success-icon, section-body:reporting-section-body, title-section:reporting-title-section, button-lg:reporting-button-lg, uploader-detail-container:reporting-uploader-detail-container, textarea-label:reporting-textarea-label, date-label:reporting-date-label, commentbox:reporting-commentbox, comment-username:reporting-comment-username, detail-head:reporting-detail-head" name="Object Details" mode="view" editdisable="true" formviewclass="flex-wrap" configjson="${JSON.stringify(historyItem.schema).replace(/"/g, '&quot;')}" prepopulatevaljson="${JSON.stringify(historyItem.object).replace(/&quot;/g, '\\&quot;').replace(/"/g, '&quot;')}"></sf-i-reporting>`
          let comments = historyItem.object.comments ?? []
          if (historyItem.object.documents != null && historyItem.object.documents.length > 0) {
            html += '<div class="d-flex justify-between mb-20">';
            html += '<h3 part="history-docs-title" class="m-0"><br />Documents</h3>';
            html += '</div>';
            html += `
              <sf-i-uploader prepopulatedInputArr="${JSON.stringify(historyItem.object.documents).replace(/"/g, '&quot;')}" exportparts="detail-container:uploader-detail-container, errmsg:uploader-errmsg, successmsg:uploader-successmsg, sf-upload-message:uploader-sf-upload-message, sf-upload-submessage: uploader-sf-upload-submessage, doctype-verify-badge: uploader-doctype-verify-badge, details-controls-container: uploader-details-controls-container, button-icon: uploader-button-icon, pdf-controls-container: uploader-pdf-controls-container, pdf-pages: uploader-pdf-pages, pdf-page-num: uploader-pdf-page-num, pdf-page-count: uploader-pdf-page-count, pdf-canvas: uploader-pdf-canvas, image-container: uploader-image-container, image-component: uploader-image-component, pdf-thumbnail-container: uploader-pdf-thumbnail-container, pdf-canvas-thumbnail: uploader-pdf-canvas-thumbnail, sf-uploader-download-message: uploader-sf-uploader-download-message, input: uploader-input, upload-buttons-container: uploader-upload-buttons-container, doctype-badge: uploader-doctype-badge, upload-status: uploader-upload-status, ext-badge:uploader-ext-badge, extracted-meta: uploader-extracted-meta, extracted-text-chip: uploader-extracted-text-chip, extracted-text-chip-parsed: uploader-extracted-text-chip-parsed, extracted-text-chip-failed: uploader-extracted-text-chip-failed, matches-title: uploader-matches-title, matches:uploader-matches, extracted-title: uploader-extracted-title, extracted-text: uploader-extracted-text, disclaimer-message-container: uploader-disclaimer-message-container, message-container: uploader-message-container, button: uploader-button" class="reporting-sf-i-uploader" part="input-sf-i-uploader" id="history-doc-uploader-${index}" maximize="yes" max="${historyItem.object.documents.length}" apiid="${this.apiIdUploader}" projectid="${this.projectid}" mode="view"></sf-i-uploader>
            `
          }
          html += '<div class="d-flex justify-between mb-20">';
          html += '<h3 part="history-comments-title" class="m-0"><br />Comments</h3>';
          html += '</div>';

          html += '<div class="m-20">';

          html += '<div class="d-flex flex-col">';

          for (var i = 0; i < comments.length; i++) {
            html += '<div part="commentbox" class="d-flex commentbox ' + (comments[i].author + "").toLowerCase() + 'box">';
            html += '<div class="mr-20 d-flex flex-col align-end"><span part="comment-username">' + (comments[i].username != null ? comments[i].username : '') + '</span><span part="td-head">' + comments[i].author + '</span></div>';

            const onlyCommentText = (comments[i].comment + "").replace(/ *\([^)]*\) */g, "").trim();
            try {

              const jsonComments = JSON.parse(onlyCommentText);

              if (Util.isInteger(jsonComments)) {
                html += '<div class="">' + comments[i].comment + '<br /><small><span class="muted">' + comments[i].timestamp + '</span></small></div>';
              } else {
                //console.log('json comments', jsonComments);
                var htmlTable = '';
                for (var j = 0; j < Object.keys(jsonComments).length; j++) {
                  htmlTable += '<div class="mb-20">';
                  htmlTable += ('<div part="detail-head">' + Object.keys(jsonComments)[j] + '</div>');
                  htmlTable += ('<sf-i-elastic-text text="' + jsonComments[Object.keys(jsonComments)[j]] + '" minLength="20"></sf-i-elastic-text>');
                  htmlTable += '</div>';
                }
                html += '<div class="">' + htmlTable + '<small><span class="muted">' + comments[i].timestamp + '</span></small></div>';
              }

            } catch (e: any) {
              //console.log('json comments exception', comments[i]);
              html += '<div class="">' + comments[i].comment + '<br /><small><span class="muted">' + comments[i].timestamp + '</span></small></div>';
            }

            html += '</div>';
          }
          if (comments.length === 0) {
            html += '<div><strong>No comments!</strong></div>';
          }

          html += '</div>';

          html += '</div>';
        }
        html += '</div>'
      }
      html += `<div part="history-status" class="d-flex history-status p-5 hide">History Status</div>`
      html += '</div>'
      formContainer.insertAdjacentHTML('beforeend', html);
      let sectionHistory = formContainer.querySelector('#history') as HTMLDivElement
      sectionHistory.addEventListener('click', () => {
        let sectionHistoryBody = formContainer.querySelector('#section-history-body') as HTMLDivElement
        let sectionHistoryTitle = formContainer.querySelector('#section-history-title') as HTMLHeadingElement
        let sectionHistoryIcon = formContainer.querySelector('#section-history-icon') as HTMLHeadingElement
        if (sectionHistoryBody.style.display == 'block') {
          sectionHistory.setAttribute('part', 'section-head-collapsed')
          sectionHistoryBody.style.display = 'none'
          sectionHistoryTitle.setAttribute('part', 'section-title-collapsed')
          sectionHistoryIcon.innerHTML = 'keyboard_arrow_down'
        } else {
          sectionHistory.setAttribute('part', 'section-head-expanded')
          sectionHistoryBody.style.display = 'block'
          sectionHistoryTitle.setAttribute('part', 'section-title-expanded')
          sectionHistoryIcon.innerHTML = 'keyboard_arrow_up'
        }
      })
      let sectionHistoryDates = formContainer.querySelectorAll('.history-section-head') as NodeListOf<HTMLDivElement>
      for (let sectionHistoryDate of sectionHistoryDates) {
        sectionHistoryDate.addEventListener('click', () => {
          let id = sectionHistoryDate.id
          let dateIndex = id.split('-')[2]
          let sectionHistoryDateBodies = formContainer.querySelectorAll('.section-history-body') as NodeListOf<HTMLDivElement>

          let sectionHistoryDateTitles = formContainer.querySelectorAll('.section-history-title') as NodeListOf<HTMLHeadingElement>
          let sectionHistoryDateIcons = formContainer.querySelectorAll('.section-history-icon') as NodeListOf<HTMLHeadingElement>
          let historyStatus = formContainer.querySelector('.history-status') as HTMLDivElement
          for (let [i, sectionHistoryDateBody] of sectionHistoryDateBodies.entries()) {
            if (sectionHistoryDateBody.id == ("section-history-body-" + dateIndex)) {
              if (sectionHistoryDateBody.style.display == 'block') {
                historyStatus.style.display = 'none'
                sectionHistoryDate.setAttribute('part', 'section-head-collapsed')
                sectionHistoryDateBody.style.display = 'none'
                sectionHistoryDateTitles[i].setAttribute('part', 'section-title-collapsed')
                sectionHistoryDateIcons[i].innerHTML = 'keyboard_arrow_down'
              } else {
                historyStatus.innerHTML = "History : " + sectionHistoryDateTitles[i].innerHTML
                historyStatus.style.display = 'flex'
                sectionHistoryDate.setAttribute('part', 'section-head-expanded')
                sectionHistoryDateBody.style.display = 'block'
                sectionHistoryDateTitles[i].setAttribute('part', 'section-title-expanded')
                sectionHistoryDateIcons[i].innerHTML = 'keyboard_arrow_up'
              }
            } else {
              sectionHistoryDate.setAttribute('part', 'section-head-collapsed')
              sectionHistoryDateBody.style.display = 'none'
              sectionHistoryDateTitles[i].setAttribute('part', 'section-title-collapsed')
              sectionHistoryDateIcons[i].innerHTML = 'keyboard_arrow_down'
            }
          }
        })
      }
      let historyReportings = formContainer.querySelectorAll('.history-reporting') as NodeListOf<SfIReporting>
      for (let historyReporting of historyReportings) {
        let id = historyReporting.id;
        let date = id.split('-')[2]
        let index = id.split('-')[3]
        console.log('historyConfigJSON', id)
        historyReporting.configjson = JSON.stringify(this.getPrepopulateJson().history[date][index].schema)
        // historyReporting.loadMode();
      }
    }
  }

  prepopulateValues = (showView: boolean = true) => {
    console.log('prepopulating', this.getPrepopulateJson());
    this.terminated = this.getPrepopulateJson().terminated ?? false
    for (let [i, element] of this.dataModel.entries()) {
      if (isAddButtonObject(element)) {
        if (this.getPrepopulateJson()[element.label] != null && Array.isArray(this.getPrepopulateJson()[element.label])) {
          for (let valArr of this.getPrepopulateJson()[element.label]) {
            let schemaArr = JSON.parse(element.schema)
            let childElementArr = []
            for (let schemaElement of schemaArr) {
              let childDataObj = createDataObject(schemaElement, this.dataModel[i].children.length)
              childDataObj.value = valArr[childDataObj.id]
              childElementArr.push(childDataObj);
            }
            this.dataModel[i].children.push(childElementArr)
          }
        }
      } else {
        if (element.type == "section" && this.editdisable != "true" && this.flow != "details") {
          this.dataModel[i].collapse = "false"
        } else {
          if (this.dataModel[i].type == "textarea") {
            this.dataModel[i].value = this.getPrepopulateJson()[element.id] ?? ""
          } else if (element.type == "yesno+textarea") {
            this.dataModel[i].value = this.getPrepopulateJson()[element.id] ?? ['', '']
          } else if (element.type == "date") {
            this.dataModel[i].value = this.getPrepopulateJson()[element.id] ?? ''
          } else if (element.type == "sf-i-form-select") {
            // if(element.savenameseparate == "yes"){
            //   console.log('prepopulating sf-i-form-select', this.getPrepopulateJson()[element.id])
            //   this.dataModel[i].value = this.getPrepopulateJson()[element.id] ?? ''
            // }else{
            this.dataModel[i].value = this.getPrepopulateJson()[element.id] ?? ''
            // }
          } else if (element.type == "sf-i-form") {
            if (element.savenameseparate == "yes") {
              this.dataModel[i].value = [this.getPrepopulateJson()[element.id + 'id']]
              // this.dataModel[i].value = (this.getPrepopulateJson()[element.id + 'name'].trim() ?? '')  + ';' + (this.getPrepopulateJson()[element.id + 'id'] ?? '')
            } else if ((parseInt(element.maxselect) ?? 0) >= 1) {
              if (this.getPrepopulateJson()[element.id + 'id'] != null) {
                this.dataModel[i].value = [this.getPrepopulateJson()[element.id + 'id'] ?? '']
              } else {
                let tempArr: any[] = []
                for (let val of this.getPrepopulateJson()[element.id]) {
                  tempArr.push(val.split(';')[1] ?? '');
                }
                this.dataModel[i].value = tempArr
              }
            }
            console.log('setting form value', this.dataModel[i], this.getPrepopulateJson()[element.id + 'id'], element.mode);
          } else if (element.type == "sf-i-bricks") {
            if (element.savenameseparate == "yes") {
              this.dataModel[i].value = [this.getPrepopulateJson()[element.id + 'name'] + ';' + this.getPrepopulateJson()[element.id + 'id']]
              console.log('prepopulating sf-i-bricks',JSON.stringify(this.dataModel[i].value), this.getPrepopulateJson()[element.id + 'id'], this.getPrepopulateJson()[element.id + 'name'])
            } else {
              this.dataModel[i].value = this.getPrepopulateJson()[element.id]
            }
          } else if (element.type == "sf-checklist") {
            if(this.mode == 'admin'){
              this.dataModel[i].elementsjson = (this.getPrepopulateJson()[element.id] != null ? JSON.stringify(this.getPrepopulateJson()[element.id]) : '')
            } else {
              this.dataModel[i].value = this.getPrepopulateJson()[element.id] ?? []
            }
          } else if (element.type == "sf-i-select") {
            this.dataModel[i].value = [this.getPrepopulateJson()[element.id + 'name'] + ';' + this.getPrepopulateJson()[element.id + 'id']]
          } else if (element.type == "sf-i-uploader") {
            this.dataModel[i].value = this.getPrepopulateJson()[element.id]
            console.log('setting uploader value', JSON.stringify(this.dataModel[i]), this.getPrepopulateJson()[element.id]);
          }
        }
      }
    }
    if (showView) {
      if (this.evalTimeout != null) {
        clearTimeout(this.evalTimeout)
      }
      this.evalTimeout = setTimeout(() => {
        this.evalShowProgress()
      }, 2000)
      this.populateView();
    }
  }

  evalShowProgress = () => {
    let total = 0;
    let filled = 0;
    let sectionChildCount = 0;
    let sectionChildFilledCount = 0;
    let sectionId = "";
    let flagEval = true
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
                flagEval = false
              }
            }
          }
        }
      } else {
        if (element.type == "section") {
          if (sectionChildCount != 0 && sectionId !== "") {
            if (sectionChildCount == sectionChildFilledCount) {
              ((this._SfReportingContainer as HTMLDivElement).querySelector('#' + sectionId + "-success") as HTMLDivElement).style.display = 'flex'
            } else {
              ((this._SfReportingContainer as HTMLDivElement).querySelector('#' + sectionId + "-success") as HTMLDivElement).style.display = 'none'
            }
          }
          sectionChildCount = 0;
          sectionChildFilledCount = 0;
          sectionId = element.id;
        } else if (element.type != "section" && element.type != "subsection" && element.mandatory != null) {
          total++;
          sectionChildCount++;
          if (element.type == "textarea" || element.type == "date") {
            if (element.value != "" && element.value.length > 0) {
              filled++;
              sectionChildFilledCount++;
            } else {
              console.log('eval fail', element)
            }
          } else if (element.type == "yesno+textarea") {
            if (element.value.length == 2 && element.value[0].length > 0 && element.value[1].length > 0) {
              filled++;
              sectionChildFilledCount++;
            } else {
              console.log('eval fail', element)
            }
          } else if (element.type == "sf-i-form") {
            console.log('evalshowprogress sf-i-form value', element.value, element.value.length, element.mandatory, element.mandatory != null);
            let form = (this._SfReportingContainer as HTMLDivElement).querySelector('#' + element.id) as SfIForm
            if (form != null && form.selectedValues().length > 0) {
              if (element.value.length > 0) {
                filled++;
                sectionChildFilledCount++;
              }
            } else {
              console.log('eval fail1', element)
            }
          } else if (element.type == "sf-i-form-select") {
            console.log('evalshowprogress sf-i-form-select value', element.value, Object.keys(element.value).length, element.mandatory);
            if (Object.keys(element.value).length > 0) {
              filled++;
              sectionChildFilledCount++;
            } else {
              console.log('eval fail', element)
            }
          } else if (element.type == "sf-i-bricks") {
            console.log('evalshowprogress sf-i-bricks value', element.value, element.value.length, element.mandatory, element.mandatory != null);
            if (element.value.length > 0) {
              filled++;
              sectionChildFilledCount++;
            } else {
              console.log('eval fail', element)
            }
          } else if (element.type == "sf-i-select") {
            console.log('evalshowprogress sf-i-select value', element.value, element.value.length, element.mandatory, element.mandatory != null);
            if (element.value.length > 0) {
              filled++;
              sectionChildFilledCount++;
            } else {
              console.log('eval fail', element)
            }
          } else if (element.type == "sf-checklist") {
            console.log('evalshowprogress sf-checklist value', element.elementsjson.length, element.mandatory, element.mandatory != null);
            if (this.mode == 'admin') {
              if (element.elementsjson != null && element.elementsjson.length > 2) {
                filled++;
                sectionChildFilledCount++;
              } else {
                console.log('eval fail', element)
              }
            } else {
              for (let val of Object.keys(element.value)) {
                if (element.value[val] == true) {
                  filled++;
                  sectionChildFilledCount++;
                  break;
                }
              }
            }
          } else if (element.type == "sf-i-uploader") {
            if (element.value != null && element.value.length > 0) {
              filled++;
              sectionChildFilledCount++;
            } else {
              console.log('eval fail', element)
            }
          }
          if (element.mandatory != null && flagEval) {
            if (element.value == "" || element.value == null || element.value.length < 1) {
              if(element.elementsjson == null || element.elementsjson == ''){
                flagEval = false
              }
            } 
          }
        }
      }
    }
    if (sectionChildCount != 0 && sectionId !== "") {
      if (sectionChildCount == sectionChildFilledCount) {
        ((this._SfReportingContainer as HTMLDivElement).querySelector('#' + sectionId + "-success") as HTMLDivElement).style.display = 'flex'
      } else {
        ((this._SfReportingContainer as HTMLDivElement).querySelector('#' + sectionId + "-success") as HTMLDivElement).style.display = 'none'
      }
    }
    console.log('evalshowprogress', filled, total, this.editdisable)
    if (this.editdisable == "true" && ((this._SfReportingContainer as HTMLDivElement).querySelector('.progress-bar') as HTMLDivElement) != null) {
      ((this._SfReportingContainer as HTMLDivElement).querySelector('.progress-bar') as HTMLDivElement).style.display = 'none'
    } else if (((this._SfReportingContainer as HTMLDivElement).querySelector('.progress-bar') as HTMLDivElement) != null) {
      ((this._SfReportingContainer as HTMLDivElement).querySelector('.progress-bar') as HTMLDivElement).style.display = 'flex'
      let progress = Math.floor((filled / total) * 100);
      if (progress == 100) {
        ((this._SfReportingContainer as HTMLDivElement).querySelector('.progress-bar-complete') as HTMLDivElement).style.width = "0%";
        ((this._SfReportingContainer as HTMLDivElement).querySelector('.progress-bar-finished') as HTMLDivElement).style.width = "100%";
      } else {
        ((this._SfReportingContainer as HTMLDivElement).querySelector('.progress-bar-complete') as HTMLDivElement).style.width = progress + "%";
        ((this._SfReportingContainer as HTMLDivElement).querySelector('.progress-bar-finished') as HTMLDivElement).style.width = "0%";
      }
      ((this._SfReportingContainer as HTMLDivElement).querySelector('.progress-bar-incomplete') as HTMLDivElement).style.width = (100 - progress) + "%";
      console.log('buttonsubmit', this._SfReportingButtonSubmit);
      if ((this._SfReportingButtonSubmit as HTMLButtonElement) != null) {
        (this._SfReportingButtonSubmit as HTMLButtonElement).disabled = !flagEval;
        console.log('buttonsubmit 1', this._SfReportingButtonSubmit.disabled, flagEval);
      }
    }

    console.log('selectedValues', this.selectedValues())
  }
  evalTimeout: any;
  initInputListeners = () => {
    let addButtons = (this._SfReportingContainer as HTMLDivElement).querySelectorAll('.add-button') as NodeListOf<HTMLButtonElement>
    for (let addButton of addButtons) {
      addButton.addEventListener('click', async (ev: any) => {
        await this.showLoader();
        let target = ev.target;
        for (let [i, element] of this.dataModel.entries()) {
          if (isAddButtonObject(element)) {
            if (element.id == target.id) {
              let schemaArr = JSON.parse(this.dataModel[i].schema)
              let childElementArr = []
              for (let schemaElement of schemaArr) {
                childElementArr.push(createDataObject(schemaElement, this.dataModel[i].children.length));
              }
              this.dataModel[i].children.push(childElementArr)
              break;
            }
          }
        }
        if (this.evalTimeout != null) {
          clearTimeout(this.evalTimeout)
        }
        this.evalTimeout = setTimeout(() => {
          this.evalShowProgress()
        }, 2000)
        let formContainer = (this._SfReportingContainer.querySelector('.form-container') as HTMLElement)
        if (formContainer != null) {
          this.populateView(formContainer.scrollTop);
        }
      })
    }

    let removeButtons = (this._SfReportingContainer as HTMLDivElement).querySelectorAll('.remove-child-button') as NodeListOf<HTMLButtonElement>
    for (let removeButton of removeButtons) {
      removeButton.addEventListener('click', async (ev: any) => {
        await this.showLoader();
        let target = ev.target;
        console.log(target)
        let addId = target.id.split("-")[0]
        let iter = parseInt(target.id.split("-")[target.id.split("-").length - 1]) - 1
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
          this.evalShowProgress()
        }, 2000)
        let formContainer = (this._SfReportingContainer.querySelector('.form-container') as HTMLElement)
        if (formContainer != null) {
          this.populateView(formContainer.scrollTop);
        }
      })
    }

    let textAreas = (this._SfReportingContainer as HTMLDivElement).querySelectorAll('.reporting-textarea') as NodeListOf<HTMLTextAreaElement>
    for (let textArea of textAreas) {
      textArea.addEventListener('keyup', (e: any) => {
        let target = e.target;
        let genId = target.id.slice(0, target.id.lastIndexOf('-'));
        for (let [i, element] of this.dataModel.entries()) {
          if (!isAddButtonObject(element)) {
            if (element.type == "textarea") {
              if (element.id == target.id) {
                this.dataModel[i].value = target.value
              }
            } else if (element.type == "yesno+textarea") {
              if ((element.id + "-textarea") == target.id) {
                if (this.dataModel[i].value == null || this.dataModel[i].value.length != 2) {
                  this.dataModel[i].value = ['', '']
                }
                this.dataModel[i].value[1] = target.value
              }
            }
          } else {
            if (element.schema.indexOf(genId) >= 0) {
              for (let [j, childElementArr] of element.children.entries()) {
                for (let [k, childElement] of childElementArr.entries()) {
                  if (childElement.type == "textarea") {
                    if (childElement.id == target.id) {
                      this.dataModel[i].children[j][k].value = target.value
                    }
                  } else if (childElement.type == "yesno+textarea") {
                    if ((childElement.id + "-textarea") == target.id) {
                      if (this.dataModel[i].children[j][k].value == null || this.dataModel[i].children[j][k].value.length != 2) {
                        this.dataModel[i].children[j][k].value = ['', '']
                      }
                      this.dataModel[i].children[j][k].value[1] = target.value
                    }
                  }
                }
              }
            }
          }
        }
        if (this.evalTimeout != null) {
          clearTimeout(this.evalTimeout)
        }
        this.evalTimeout = setTimeout(() => {
          this.evalShowProgress()
        }, 2000)
      })
    }

    let radioButtons = (this._SfReportingContainer as HTMLDivElement).querySelectorAll('.reporting-radio') as NodeListOf<HTMLInputElement>
    for (let radioButton of radioButtons) {
      radioButton.addEventListener('change', (e: any) => {
        let target = e.target;
        console.log('radio changed', target.id)
        let genId = target.id.slice(0, target.id.lastIndexOf('-'));
        for (let [i, element] of this.dataModel.entries()) {
          if (!isAddButtonObject(element)) {
            if (element.type == "yesno+textarea") {
              if (element.id == genId) {
                if (this.dataModel[i].value == null || this.dataModel[i].value.length != 2) {
                  this.dataModel[i].value = ['', '']
                }
                this.dataModel[i].value[0] = target.value
              }
            }
          } else {
            if (element.schema.indexOf(genId) >= 0) {
              for (let [j, childElementArr] of element.children.entries()) {
                for (let [k, childElement] of childElementArr.entries()) {
                  if (childElement.type == "yesno+textarea") {
                    if (childElement.id == genId) {
                      if (this.dataModel[i].children[j][k].value == null || this.dataModel[i].children[j][k].value.length != 2) {
                        this.dataModel[i].children[j][k].value = ['', '']
                      }
                      this.dataModel[i].children[j][k].value[0] = target.value
                    }
                  }
                }
              }
            }
          }
        }
        if (this.evalTimeout != null) {
          clearTimeout(this.evalTimeout)
        }
        this.evalTimeout = setTimeout(() => {
          this.evalShowProgress()
        }, 2000)
      })
    }
    let forms = (this._SfReportingContainer as HTMLDivElement).querySelectorAll('.reporting-sf-i-form') as NodeListOf<SfIForm>
    for (let form of forms) {
      form.addEventListener('valueChanged', (ev: any) => {
        let target = ev.target as SfIForm;
        console.log(target)
        let genId = target.id.slice(0, target.id.lastIndexOf('-'));
        for (let [i, element] of this.dataModel.entries()) {
          if (!isAddButtonObject(element)) {
            if (element.id == target.id) {
              this.dataModel[i].value = target.selectedValues()
            }
          } else {
            if (element.schema.indexOf(genId) >= 0) {
              for (let [j, childElementArr] of element.children.entries()) {
                for (let [k, childElement] of childElementArr.entries()) {
                  if (childElement.id == target.id) {
                    this.dataModel[i].children[j][k].value = target.selectedValues()
                  }
                }
              }
            }
          }
        }
        this.checkDependencies(target.id)
        if (this.evalTimeout != null) {
          clearTimeout(this.evalTimeout);
        }
        this.evalTimeout = setTimeout(() => {
          this.evalShowProgress()
        }, 2000)
        // this.populateView((this._SfReportingContainer.querySelector('.form-container') as HTMLElement).scrollTop);
      })
    }
    let dateInputs = (this._SfReportingContainer as HTMLDivElement).querySelectorAll('.reporting-date') as NodeListOf<HTMLInputElement>
    for (let dateInput of dateInputs) {
      dateInput.addEventListener('change', (ev: any) => {
        let target = ev.target as HTMLInputElement;
        console.log(target)
        let genId = target.id.slice(0, target.id.lastIndexOf('-'));
        for (let [i, element] of this.dataModel.entries()) {
          if (!isAddButtonObject(element)) {
            if (element.id == target.id) {
              this.dataModel[i].value = target.value
            }
          } else {
            if (element.schema.indexOf(genId) >= 0) {
              for (let [j, childElementArr] of element.children.entries()) {
                for (let [k, childElement] of childElementArr.entries()) {
                  if (childElement.id == target.id) {
                    this.dataModel[i].children[j][k].value = target.value
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
          this.evalShowProgress()
        }, 2000)
        // this.populateView((this._SfReportingContainer.querySelector('.form-container') as HTMLElement).scrollTop);
      })
    }
    let bricksArr = (this._SfReportingContainer as HTMLDivElement).querySelectorAll('.reporting-sf-i-bricks') as NodeListOf<SfIBricks>
    for (let bricks of bricksArr) {
      bricks.addEventListener('valueChanged', async (ev: any) => {

        let target = ev.target as SfIBricks;
        let genId = target.id.slice(0, target.id.lastIndexOf('-'));
        console.log('bricks value changed', target.id)
        for (let [i, element] of this.dataModel.entries()) {
          if (!isAddButtonObject(element)) {
            if (element.id == target.id) {
              this.dataModel[i].value = target.selectedValueTexts()
            }
          } else {
            if (element.schema.indexOf(genId) >= 0) {
              for (let [j, childElementArr] of element.children.entries()) {
                for (let [k, childElement] of childElementArr.entries()) {
                  if (childElement.id == target.id) {
                    this.dataModel[i].children[j][k].value = target.selectedValueTexts()
                  }
                }
              }
            }
          }
        }

        this.checkDependencies(target.id)

        if (this.evalTimeout != null) {
          clearTimeout(this.evalTimeout);
        }
        this.evalTimeout = setTimeout(() => {
          this.evalShowProgress()
        }, 2000)
      })
    }

    let uploaders = (this._SfReportingContainer as HTMLDivElement).querySelectorAll('.reporting-sf-i-uploader') as NodeListOf<SfIUploader>
    for (let uploader of uploaders) {
      uploader.addEventListener('uploadValid', async (ev: any) => {

        let target = ev.target as SfIUploader;
        let genId = target.id.slice(0, target.id.lastIndexOf('-'));
        console.log('uploader value changed', target.id, target.selectedValues(), this.mode)
        for (let [i, element] of this.dataModel.entries()) {
          if (!isAddButtonObject(element)) {
            if (element.id == target.id && target.selectedValues().length > 0) {
              this.dataModel[i].value = target.selectedValues()
            }
          } else {
            if (element.schema.indexOf(genId) >= 0) {
              for (let [j, childElementArr] of element.children.entries()) {
                for (let [k, childElement] of childElementArr.entries()) {
                  if (childElement.id == target.id) {
                    this.dataModel[i].children[j][k].value = target.selectedValues()
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
          this.evalShowProgress()
        }, 2000)
      })
    }

    let selects = (this._SfReportingContainer as HTMLDivElement).querySelectorAll('.reporting-sf-i-select') as NodeListOf<SfISelect>
    for (let select of selects) {
      select.addEventListener('valueChanged', async (ev: any) => {

        let target = ev.target as SfISelect;
        let genId = target.id.slice(0, target.id.lastIndexOf('-'));
        console.log('sf-i-select value changed', target.id)
        for (let [i, element] of this.dataModel.entries()) {
          if (!isAddButtonObject(element)) {
            if (element.id == target.id) {
              this.dataModel[i].value = target.selectedValues()
            }
          } else {
            if (element.schema.indexOf(genId) >= 0) {
              for (let [j, childElementArr] of element.children.entries()) {
                for (let [k, childElement] of childElementArr.entries()) {
                  if (childElement.id == target.id) {
                    this.dataModel[i].children[j][k].value = target.selectedValues()
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
          this.evalShowProgress()
        }, 2000)
      })
    }

    let checklists = (this._SfReportingContainer as HTMLDivElement).querySelectorAll('.reporting-sf-checklist') as NodeListOf<SfChecklist>
    for (let checklist of checklists) {
      checklist.addEventListener('valueChanged', async (ev: any) => {

        let target = ev.target as SfChecklist;
        let genId = target.id.slice(0, target.id.lastIndexOf('-'));
        console.log('sf-checklist value changed', target.id)
        for (let [i, element] of this.dataModel.entries()) {
          if (!isAddButtonObject(element)) {
            if (element.id == target.id) {

              if (this.mode == 'admin') {
                this.dataModel[i].elementsjson = JSON.stringify(target.listelements)
              } else if (Object.keys(target.selectedValues()).length > 0) {
                this.dataModel[i].value = target.selectedValues()
              }
            }
          } else {
            if (element.schema.indexOf(genId) >= 0) {
              for (let [j, childElementArr] of element.children.entries()) {
                for (let [k, childElement] of childElementArr.entries()) {
                  if (childElement.id == target.id) {
                    this.dataModel[i].children[j][k].value = target.selectedValues()
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
          this.evalShowProgress()
        }, 2000)
      })
    }
  }

  checkDependencies = async (id: string) => {
    for (let element of this.dataModel) {
      if (element.dependencies.indexOf(id) >= 0) {
        let dependantElement = (this._SfReportingContainer as HTMLDivElement).querySelector('#' + element.id)
        console.log('dependant element', dependantElement?.tagName, dependantElement?.id, id);
        if (dependantElement?.tagName.toLowerCase() == "sf-i-bricks") {
          let dependantBricks = dependantElement as SfIBricks
          let selectedDependedValues = []
          for (let dependency of element.dependencies) {
            let dependedBricks = (this._SfReportingContainer as HTMLDivElement).querySelector('#' + dependency) as SfIBricks
            selectedDependedValues.push(dependedBricks.selectedValueTexts()[0])
          }
          let values = this.getBricksValues(element, selectedDependedValues)
          console.log('bricks selecteddependantvalues', selectedDependedValues, element.value.length, values[1], element.id);
          dependantBricks.namesjson = JSON.stringify(values[0])
          dependantBricks.idsjson = JSON.stringify(values[1])
          if (element.value != '' && element.value.length > 0) {
            dependantBricks.prepopulateValJson = JSON.stringify(element.value)
          } else {
            dependantBricks.prepopulateValJson = JSON.stringify([])
          }
          dependantBricks.loadMode()
          await Util.delay(500)
        } else if (dependantElement?.tagName.toLowerCase() == "sf-i-form") {
          let dependantForm = dependantElement as SfIForm
          if (dependantForm.mode == "select") {
            this.updateShortlistedSearchPhrases(dependantForm.id);
            dependantForm.loadMode()
          }
        } else if (dependantElement?.tagName.toLowerCase() == "sf-i-form-select") {
          let dependantForm = dependantElement as SfIForm
          if (dependantForm.mode == "select") {
            this.updateShortlistedSearchPhrases(dependantForm.id);
            dependantForm.loadMode()
          }
        }
      }
    }
  }

  updateShortlistedSearchPhrases = (id: string) => {
    for (let dataObj of this.dataModel) {
      if (dataObj.id == id) {
        let element = dataObj as DataObject
        let elementForm = (this._SfReportingContainer as HTMLDivElement).querySelector('#' + element.id) as SfIForm;
        let tempSearchPhrases = []
        for (let dependency of element.dependencies) {
          console.log('checking dependency', dependency)
          let dependencyElement = (this._SfReportingContainer as HTMLDivElement).querySelector('#' + dependency)
          if (dependencyElement?.tagName.toLowerCase() == "sf-i-bricks") {
            console.log('dependencyelement', dependencyElement.id, (dependencyElement as SfIBricks).selectedTexts());
            for (let selectedText of (dependencyElement as SfIBricks).selectedTexts()) {
              if (selectedText == '') {
                continue;
              }
              tempSearchPhrases.push(selectedText.replace(/ *\([^)]*\) */g, ""))
            }
          } else if (dependencyElement?.tagName.toLowerCase() == "sf-i-form") {
            console.log('dependencyelement', dependencyElement.id, (dependencyElement as SfIForm).selectedTexts());
            for (let selectedText of (dependencyElement as SfIForm).selectedTexts()) {
              if (selectedText == '') {
                continue;
              }
              tempSearchPhrases.push(selectedText.replace(/ *\([^)]*\) */g, ""))
            }
          } else if (dependencyElement?.tagName.toLowerCase() == "sf-i-form-select") {
            console.log('dependencyelement', dependencyElement.id, (dependencyElement as SfIForm).selectedTexts());
            for (let selectedText of (dependencyElement as SfIForm).selectedTexts()) {
              if (selectedText == '') {
                continue;
              }
              tempSearchPhrases.push(selectedText.replace(/ *\([^)]*\) */g, ""))
            }
          }
        }
        elementForm.searchPhrase = tempSearchPhrases.join('&')
        console.log('shortlistedSearchPhrases', tempSearchPhrases, elementForm.searchPhrase);
      }
    }
  }

  initSectionListeners = () => {
    let sectionHeads = (this._SfReportingContainer.querySelectorAll('.section-head')) as NodeListOf<HTMLDivElement>
    for (let sectionHead of sectionHeads) {
      sectionHead.addEventListener('click', async () => {
        await this.showLoader();
        console.log('scroll position', (this._SfReportingContainer.querySelector('.form-container') as HTMLElement).scrollTop)
        for (let dataObj of this.dataModel) {
          if (dataObj.id == sectionHead.id) {
            dataObj.collapse = dataObj.collapse == "false" ? "true" : "false"
          }
        }
        if (this.evalTimeout != null) {
          clearTimeout(this.evalTimeout)
        }
        this.evalTimeout = setTimeout(() => {
          this.evalShowProgress()
        }, 2000)

        let formContainer = (this._SfReportingContainer.querySelector('.form-container') as HTMLElement)
        if (formContainer != null) {
          this.populateView(formContainer.scrollTop);
        }
      })
    }
  }

  renderAddSection = (addObj: AddButtonObject, iter: number) => {
    let elementHtml = `<div class="d-flex align-center justify-between" part="subsection-container"><h4 part="subsection">${addObj.label} - ${iter}</h4><button id="${addObj.id}-remove-${iter}" class="remove-child-button" part="remove-child-button"><span class="material-icons button-icon">delete</span></button></div>`
    return elementHtml
  }

  renderSectionContainer = (addObj: AddButtonObject) => {
    let elementHtml = addObj.direction == "row" ? `<div class="d-flex jsutify-start align-start">` : ``
    return elementHtml
  }

  renderAddButton = (addObj: AddButtonObject) => {
    let elementHtml = `<button id="${addObj.id}" class="add-button" part="add-button">Add ${addObj.label}</button>`
    return elementHtml
  }
  renderElement = (dataObj: DataObject) => {
    let elementHtml = ""
    console.log('rendering obj', dataObj.type)
    let elementLabel = dataObj.label ?? ""
    if (this.editdisable == "true") {
      elementLabel = elementLabel.replace(/ */g, '')
    }
    if (dataObj.type == "section") {
      console.log('renderingSection', dataObj)
      elementHtml += `<div class="d-flex flex-col" part="section-container"><div id="${dataObj.id}" class="section-head d-flex align-center justify-between" part="${dataObj.collapse == "true" ? 'section-head-collapsed' : 'section-head-expanded'}"><h3 part="${dataObj.collapse == "true" ? 'section-title-collapsed' : 'section-title-expanded'}">${dataObj.name}</h3><div id="${dataObj.id}-success" part="section-success-icon"><div class="material-icons">${dataObj.collapse == "true" ? "keyboard_arrow_down" : "keyboard_arrow_up"}</div></div></div><div class="section-body d-flex ${this.formviewclass} ${dataObj.collapse == "true" ? 'hide' : ''}" part="section-body"> `
    } else if (dataObj.type == "subsection") {
      elementHtml += `<div class="d-flex align-center" part="subsection-container"><h4 part="subsection">${dataObj.name}</h4></div>`
    } else if (dataObj.type == "textarea") {
      elementHtml += `<div part="textarea-container" class="d-flex flex-col flex-grow">
                        <label id="${dataObj.id}-label" part="textarea-label">${elementLabel}</label>
                        <div part="td-body-2"><sf-i-elastic-text text="${dataObj.hint}" minLength="50"></sf-i-elastic-text></div>
                        <${this.editdisable == "true" ? 'div' : 'textarea'} rows="${dataObj.size == "small" ? "4" : (dataObj.size == "smallest" ? "1" : "10")}" id="${dataObj.id}" type="text" class=" reporting-textarea" part="input-textarea" ${this.mode == "view" || this.flow == "details" ? "readonly" : ""}>${dataObj.value}</${this.editdisable == "true" ? 'div' : 'textarea'}>
                      </div>`
    } else if (dataObj.type == "yesno+textarea") {
      elementHtml += `<div part="textarea-container"  class="d-flex flex-col flex-grow">
                        <label id="${dataObj.id}-label" part="textarea-label">${elementLabel}</label>
                        <div part="td-body-2"><sf-i-elastic-text text="${dataObj.hint}" minLength="50"></sf-i-elastic-text></div>
                        <div class="d-flex">`
      for (let option of dataObj.options) {
        elementHtml += `<input type="radio" id="${dataObj.id}-${option.toLowerCase().replace(/ /g, '_')}" name="${dataObj.id}" class="reporting-radio" part="input-radio" value="${option}" ${this.mode == "view" || this.flow == "details" ? "disabled" : ""} ${dataObj.value[0] == option ? "checked" : ""}><label id="${dataObj.id}-${option.toLowerCase().replace(/ /g, '_')}-label" part="radio-label">${option}</label>`
      }
      elementHtml += `</div>
                        <${this.editdisable == "true" ? 'div' : 'textarea'} rows="${dataObj.size == "small" ? "4" : "10"}" id="${dataObj.id}-textarea" type="text" class="reporting-textarea" part="input-textarea" ${this.mode == "view" || this.flow == "details" ? "readonly" : ""}>${dataObj.value[1] ?? ""}</${this.editdisable == "true" ? 'div' : 'textarea'}>
                      </div>`
    } else if (dataObj.type == "date") {
      elementHtml += `<div part="date-container" class="d-flex flex-col flex-grow">
                        <label id="${dataObj.id}-label" part="date-label">${elementLabel}</label>
                        <div part="td-body-2"><sf-i-elastic-text text="${dataObj.hint}" minLength="50"></sf-i-elastic-text></div>
                        <input class="reporting-date" id="${dataObj.id}" part="input-date" type="date" ${this.mode == "view" || this.flow == "details" ? "readonly" : ""} value="${dataObj.value}"/>
                      </div>`
    } else if (dataObj.type == "sf-i-form") {
      elementHtml += `<div part="date-container" class="d-flex flex-col flex-grow">
                        <label id="${dataObj.id}-label" part="date-label">${elementLabel}</label>
                        <div part="td-body-2"><sf-i-elastic-text text="${dataObj.hint}" minLength="50"></sf-i-elastic-text></div>
                        <sf-i-form exportparts="td-action:form-td-action, td-body" id="${dataObj.id}" class="reporting-sf-i-form" part="input-sf-i-form" name="${dataObj.name}" label="" apiId="${dataObj.apiid}" mode="${dataObj.mode}" searchPhrase="${(dataObj.mode == "multiselect-dropdown" ? (this.projectname + "&") : "") + dataObj.searchstring}" selectProjection="${dataObj.selectprojection}" ignoreProjections="${dataObj.ignoredprojections}" ${parseInt(dataObj.maxselect) == 0 ? "" : `maxselect="${dataObj.maxselect}"`} ${dataObj.mandatory != null ? "mandatory=\"\"" : ""}></sf-i-form>
                      </div>`
    } else if (dataObj.type == "sf-i-form-select") {
      let valToBeShown = ""
      if (dataObj.savenameseparate == "yes") {
        if (dataObj.value[0] != null && dataObj.value[0].split(';').length > 0) {
          valToBeShown = dataObj.value[0].split(';')[0]
        }
      } else if (dataObj.value.name != null) {
        valToBeShown = dataObj.value.name
      } else {
        valToBeShown = dataObj.value.reference
      }
      elementHtml += `<div part="date-container" class="d-flex flex-col flex-grow">
                        <label id="${dataObj.id}-label" part="date-label">${elementLabel}</label>
                        <div part="td-body-2"><sf-i-elastic-text text="${dataObj.hint}" minLength="50"></sf-i-elastic-text></div>
                        <div class="d-flex flex-col align-start" part="form-select-container">
                          <div class"d-flex align-center" part="form-selected-value">
                            ${(Object.keys(dataObj.value) ?? []).length > 0 ? (`
                              <div class="selected-option d-flex justtify-center align-center" part="selected-option" id="selected-option-${dataObj.id}">
                                ${this.mode == "view" || this.flow == "details" ? '' : '<span class="material-icons selected-option-icon mr-10">cancel</span>'}
                                <label class="selected-option-label" part="selected-option-label">${valToBeShown}</label>
                              </div>`) : (`
                                ${(this.mode == "view" || this.flow == "details") ? '' :
            `<button id="button-edit-form-${dataObj.id}" part="button-icon" class="material-icons button-edit-form button-icon-click">edit</button>`
          }
                                `)
        }
                          </div>
                        </div>
                      </div>`
    } else if (dataObj.type == "sf-i-bricks") {
      elementHtml += `<div part="date-container" class="d-flex flex-col flex-grow">
                        <label id="${dataObj.id}-label" part="date-label">${elementLabel}</label>
                        <div part="td-body-2"><sf-i-elastic-text text="${dataObj.hint}" minLength="50"></sf-i-elastic-text></div>
                        <sf-i-bricks exportparts="input-select-single, selected-container, selected-option, input-select-multi-option, select-option-label, selected-option-label" id="${dataObj.id}" mode="${dataObj.mode}" 
                        ${this.mode == "view" || this.flow == 'details' ? 'flow="view"' : ''} class="reporting-sf-i-bricks" part="input-sf-i-bricks" name="${dataObj.name}" ${parseInt(dataObj.maxselect) == 0 ? "" : `maxselect="${dataObj.maxselect}"`} ${dataObj.mandatory != null ? "mandatory=\"\"" : ""}></sf-i-bricks>
                      </div>`
    } else if (dataObj.type == "sf-i-select") {
      elementHtml += `<div part="date-container" class="d-flex flex-col flex-grow">
                        <label id="${dataObj.id}-label" part="date-label">${elementLabel}</label>
                        <div part="td-body-2"><sf-i-elastic-text text="${dataObj.hint}" minLength="50"></sf-i-elastic-text></div>
                        <sf-i-select class="reporting-sf-i-select" exportparts="input-select:select-input-select" id="${dataObj.id}" part="input-sf-i-select" label="" apiId="${dataObj.apiid}" ${dataObj.mandatory != null ? "mandatory=\"\"" : ""}></sf-i-select>
                      </div>`
    } else if (dataObj.type == "sf-checklist") {
      elementHtml += `<div part="date-container" class="d-flex flex-col flex-grow">
                        <label id="${dataObj.id}-label" part="date-label">${elementLabel}</label>
                        <div part="td-body-2"><sf-i-elastic-text text="${dataObj.hint}" minLength="50"></sf-i-elastic-text></div>
                        <sf-checklist class="reporting-sf-checklist" exportparts="checklist-container, checklist-title, checklist-list, checklist-item, checklist-checkbox, checklist-checkbox-label" id="${dataObj.id}" part="input-sf-checklist" ${dataObj.mandatory != null ? "mandatory=\"\"" : ""}></sf-checklist>
                      </div>`
    } else if (dataObj.type == "sf-i-uploader") {
      elementHtml += `<div part="uploader-container" class="d-flex flex-col flex-grow">
                        <label id="${dataObj.id}-label" part="date-label">${elementLabel}</label>
                        <div part="td-body-2"><sf-i-elastic-text text="${dataObj.hint}" minLength="50"></sf-i-elastic-text></div>
                        <sf-i-uploader exportparts="detail-container:uploader-detail-container, errmsg:uploader-errmsg, successmsg:uploader-successmsg, sf-upload-message:uploader-sf-upload-message, sf-upload-submessage: uploader-sf-upload-submessage, doctype-verify-badge: uploader-doctype-verify-badge, details-controls-container: uploader-details-controls-container, button-icon: uploader-button-icon, pdf-controls-container: uploader-pdf-controls-container, pdf-pages: uploader-pdf-pages, pdf-page-num: uploader-pdf-page-num, pdf-page-count: uploader-pdf-page-count, pdf-canvas: uploader-pdf-canvas, image-container: uploader-image-container, image-component: uploader-image-component, pdf-thumbnail-container: uploader-pdf-thumbnail-container, pdf-canvas-thumbnail: uploader-pdf-canvas-thumbnail, sf-uploader-download-message: uploader-sf-uploader-download-message, input: uploader-input, upload-buttons-container: uploader-upload-buttons-container, doctype-badge: uploader-doctype-badge, upload-status: uploader-upload-status, ext-badge:uploader-ext-badge, extracted-meta: uploader-extracted-meta, extracted-text-chip: uploader-extracted-text-chip, extracted-text-chip-parsed: uploader-extracted-text-chip-parsed, extracted-text-chip-failed: uploader-extracted-text-chip-failed, matches-title: uploader-matches-title, matches:uploader-matches, extracted-title: uploader-extracted-title, extracted-text: uploader-extracted-text, disclaimer-message-container: uploader-disclaimer-message-container, message-container: uploader-message-container, button: uploader-button" class="reporting-sf-i-uploader" part="input-sf-i-uploader" id="${dataObj.id}" max="${dataObj.maxselect}" apiid="${dataObj.apiid}" allowedextensions="${dataObj.allowedextensions}" extract="${dataObj.extract}" projectid="${this.projectid}" maxsize="${dataObj.maxsize}" allowdownload="${dataObj.allowdownload}"></sf-i-uploader>
                      </div>`
    }

    return elementHtml
  }

  populateViewShort = () => {
    let html = "";
    if (this.mode == "short-new") {
      html += `<button part="button-lg" id="button-short-new">Submit Form</button>`
    } else if (this.mode == "short-view") {
      html += `<button part="button-lg" id="button-short-view">Update From</button>`
    }

    (this._SfReportingContainerShort as HTMLDivElement).innerHTML = html;
    (this._SfReportingContainer as HTMLDivElement).style.display = 'none';
    // (this._SfReportingButtonContainer as HTMLDivElement).style.display = 'none';
    (this._SfReportingContainerShort.querySelector('#button-short-new') as HTMLButtonElement)?.addEventListener('click', () => {
      this.mode = "new";
      this.loadMode();
    });

    (this._SfReportingContainerShort.querySelector('#button-short-view') as HTMLButtonElement)?.addEventListener('click', () => {
      this.mode = "view";
      this.loadMode();
    })
  }

  populateList = () => {
    let html = ''
    html += `<div class="d-flex left-sticky justify-between align-start p-7">`
    html += `<div part="calendar-date-container" class="d-flex flex-col align-start justify-center">${this.lastCalendarGenerated == "" ? "" : ("<div class=\"d-flex align-center justify-center\" part=\"last-calendar-date\" id=\"last-calendar-date\"><span class=\"material-symbols-outlined\">update</span>&nbsp;&nbsp;Calendar synced on \n" + (new Date(parseInt(this.lastCalendarGenerated)).toLocaleDateString('en-IN') + " - " + new Date(parseInt(this.lastCalendarGenerated)).toLocaleTimeString('en-IN'))) + '</div>'}${this.nextCalendarScheduled == "" ? "" : ("<div class=\"d-flex align-center justify-center\" part=\"next-calendar-date\" id=\"next-calendar-date\"><span class=\"material-symbols-outlined\">hourglass</span>&nbsp;&nbsp;Next update on \n" + (new Date(parseInt(this.nextCalendarScheduled)).toLocaleDateString('en-IN') + " - " + new Date(parseInt(this.nextCalendarScheduled)).toLocaleTimeString('en-IN'))) + '</div>'}</div>`
    html += `<div class="d-flex justify-end flex-grow">`
    // html += `<button id="button-publish" part="button-icon" class="material-icons hide">campaign</button>`
    html += `<input class="hide" id="input-import" type="file" accept=".csv" />`
    html += `<label id="button-upload" part="button-icon" for="input-import" class="material-icons label-button ml-10">upload</label>`
    html += `<button id="button-new" part="button-icon" class="material-icons button-icon-click ml-10">add</button>`
    html += `</div>`
    html += `</div>`
    html += '<table id="select-list-table" class="w-100-m-0">';
    for (let [i, item] of this.list.entries()) {
      html += '<tr class="tablerow">'
      let bgClass = i % 2 == 0 ? 'td-light' : 'td-dark'
      html += `<td part="td-body" class="td-body"><span class="mrl-5 material-icons" part="span-submit-${item.published ? 'published' : 'unpublished'}" >${item.published ? 'radio_button_checked' : 'edit_note'}</span></td>`
      // html += `<td part="td-action" class="td-action"><button part="button-icon" class="material-symbols-outlined button-reopen" id="button-reopen-${i}">reopen_window</button></td>`
      html += `<td part="td-action" class="td-action"><button part="button-icon" class="material-icons button-details" id="button-details-${i}">open_in_new</button></td>`
      for (let property of Object.keys(item)) {
        if (this.getIgnoreProjections().indexOf(property) < 0) {
          let displayValue = item[property]
          console.log('displaying property', property)
          if (property == "lastModifiedTime") {
            displayValue = Util.timeSince(parseInt(item[property]));
          }
          html += `<td part="td-body" class="td-body ${bgClass}"><div class="d-flex flex-col align-start flex-wrap"><div part="td-head" class="pl-0-imp w-100 d-flex align-center">${property}</div><div><sf-i-elastic-text text="${displayValue}" minLength="10"></sf-i-elastic-text></div></div></td>`
        }
      }
      html += '</tr>'
    }
    html += '</table>';

    (this._SfReportingContainer as HTMLDivElement).innerHTML = html;
    (this._SfReportingContainer as HTMLDivElement).style.display = 'block';

    // let reopenButtons = (this._SfReportingContainer as HTMLDivElement).querySelectorAll('.button-reopen') as NodeListOf<HTMLButtonElement>
    // for (let reopenButton of reopenButtons) {
    //   reopenButton.addEventListener('click', async (ev: any) => {
    //     let target = ev.target
    //     let index = target.id.split('-')[2]
    //     this.reopenedItem = this.list[index]
    //     let oldObj = this.reopenedItem
    //     this.showLoader();
    //     console.log('item selected', this.reopenedItem);
    //     await this.fetchSchema();
    //     this.published = this.list[index].published ?? false
    //     let copyVals: any = {}
    //     for (let obj of this.dataModel) {
    //       if (obj.copytoreopen) {
    //         console.log('copyVals copying', obj.id, obj.type, oldObj[obj.id]);
    //         if (obj.type == "sf-i-bricks" && obj.savenameseparate == "yes") {
    //           copyVals[obj.id + 'id'] = oldObj[obj.id + 'id'];
    //           copyVals[obj.id + 'name'] = oldObj[obj.id + 'name'];
    //         } else {
    //           copyVals[obj.id] = oldObj[obj.id];
    //         }
    //         console.log('copyVals copied', copyVals)
    //       }
    //     }
    //     console.log('copyVals', JSON.parse(JSON.stringify(copyVals)))
    //     this.prepopulateValJson = JSON.stringify(copyVals)
    //     this.flow = "edit"
    //     this.loadMode();
    //   })
    // }
    let detailsButtons = (this._SfReportingContainer as HTMLDivElement).querySelectorAll('.button-details') as NodeListOf<HTMLButtonElement>
    for (let detailsButton of detailsButtons) {
      detailsButton.addEventListener('click', (ev: any) => {
        let target = ev.target
        let index = target.id.split('-')[2]
        this.selectedItem = this.list[index]
        this.showLoader();
        console.log('item selected', this.selectedItem);
        setTimeout(() => {
          this.flow = "details"
          this.loadMode();
        }, 3000)

      })
    }

    let buttonNew = ((this._SfReportingContainer as HTMLDivElement).querySelector('#button-new') as HTMLButtonElement)
    buttonNew.addEventListener('click', () => {
      this.showLoader();
      this.newClick()
    })

    let inputImport = ((this._SfReportingContainer as HTMLDivElement).querySelector('#input-import') as HTMLInputElement)
    inputImport.addEventListener('change', async (ev: any) => {
      let target = ev.target as HTMLInputElement;
      console.log('file selected', target.files);
      if (target.files != null && target.files.length > 0) {
        let file = target.files[0];
        console.log('file selected', file);
        this.showLoader();
        let jsonData = await this.csvToJson(file);
        console.log('jsonData', jsonData);
        for (let element of jsonData) {
          this.published = false
          // this.prepopulateValJson = JSON.stringify(element)
          // this.populateDataModel()
          // this.prepopulateValues(false)
          // console.log('dataModel', this.dataModel);
          await this.submitNew(element)
        }
        this.hideLoader();
        // this.dataModel = jsonData;
        // this.populateView();
      }
    })
    let customEvent = new CustomEvent('valueChanged');
    this.dispatchEvent(customEvent);
    this.hideLoader();
  }

  csvToJson = async (file: File): Promise<any> => {
    const text = await file.text();
    const lines = text.split(/\r?\n/).filter(line => line.trim() !== "");
    const headers = lines[0].split(",");

    return lines.slice(1).map((line) => {
      const values = line.split(",");
      const obj: Record<string, any> = {};

      headers.forEach((header, i) => {
        let value = values[i];

        // Clean up wrapped quotes ("" to "), and trim outer quotes
        if (value?.startsWith('"') && value?.endsWith('"')) {
          value = value.slice(1, -1).replace(/""/g, '"');
        }

        // Try to parse array-like fields (if it's valid JSON after cleaning)
        try {
          const parsed = JSON.parse(value);
          obj[header] = parsed;
        } catch {
          obj[header] = value;
        }
      });

      return obj;
    });
  }



  loadMode = async () => {
    console.log('loadmode', this.mode, this.flow);
    if (this.mode == "view") {
      this.populateDataModel();
      this.prepopulateValues()
    } else if (this.mode == "edit") {
      this.populateDataModel();
      this.prepopulateValues()
    } else if (this.mode == "new") {
      this.published = false;
      this.populateDataModel();
      this.populateView();
    } else if (this.mode == "downloader") {
      setTimeout(() => {
        this.initDecryptView();
      }, 1000)
    } else if (this.mode == "admin") {
      if (this.flow == "new") {
        setTimeout(() => {
          this.initNewListeners();
        }, 500);
        this.fetchSchema();
      } else if (this.flow == "edit") {
        setTimeout(() => {
          this.initEditListeners();
          this.populateDataModel();
          this.prepopulateValues();
        }, 500);
      } else if (this.flow == "details") {
        setTimeout(() => {
          this.initDetailsListeners();
        }, 500);
        this.fetchDetails();
      } else if (this.flow == "list") {
        setTimeout(() => {
          this.initListListeners();
        }, 500);
        this.fetchList();
      }
    } else {
      this.populateViewShort();
    }
  }

  prepareXhrPresignedGet = async (url: string, loaderElement: any, loaderText: string = '') => {


    if (loaderElement != null) {
      loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
      loaderElement.innerHTML += ('<div class="lds-text"><div class="lds-text-c">' + loaderText + '</div></div>');
    }
    return await Util.callApiPresignedGet(url);

  }

  prepareXhrPresignedDelete = async (url: string, loaderElement: any, loaderText: string = '') => {


    if (loaderElement != null) {
      loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
      loaderElement.innerHTML += ('<div class="lds-text"><div class="lds-text-c">' + loaderText + '</div></div>');
    }
    return await Util.callApiPresignedDelete(url);

  }

  prepareXhr = async (data: any, url: string, loaderElement: any, authorization: any) => {


    if (loaderElement != null) {
      loaderElement.innerHTML = '<div class="lds-dual-ring"></div>';
    }
    return await Util.callApi(url, data, authorization);

  }

  fetchPresignedUrl = async (url: string) => {
    const xhr: any = (await this.prepareXhrPresignedGet(url, this._SfLoader, 'Downloading')) as any;
    this._SfLoader.innerHTML = '';
    if (xhr.status == 200) {
      const jsRespose = JSON.parse(xhr.responseText);
      console.log('jsRespose', jsRespose);
      return jsRespose;
    }
  }

  fetchPresignedUrlDelete = async (url: string) => {
    const xhr: any = (await this.prepareXhrPresignedDelete(url, this._SfLoader)) as any;
    this._SfLoader.innerHTML = '';
    if (xhr.status == 200) {
      const jsRespose = JSON.parse(xhr.responseText);
      console.log('jsRespose', jsRespose);
      return jsRespose;
    }
  }

  clearMessages = () => {
    this._SfRowError.style.display = 'none';
    this._SfRowErrorMessage.innerHTML = '';
    this._SfRowSuccess.style.display = 'none';
    this._SfRowSuccessMessage.innerHTML = '';
  }

  setError = (msg: string) => {
    this._SfRowError.style.display = 'flex';
    this._SfRowErrorMessage.innerHTML = msg;
    this._SfRowSuccess.style.display = 'none';
    this._SfRowSuccessMessage.innerHTML = '';
    // this._SfRowNotif.style.display = 'none';
    // this._SfRowNotifMessage.innerHTML = '';
  }

  setSuccess = (msg: string) => {
    this._SfRowError.style.display = 'none';
    this._SfRowErrorMessage.innerHTML = '';
    this._SfRowSuccess.style.display = 'flex';
    this._SfRowSuccessMessage.innerHTML = msg;
    // this._SfRowNotif.style.display = 'none';
    // this._SfRowNotifMessage.innerHTML = '';
  }

  setNotif = (msg: string) => {
    this._SfRowError.style.display = 'none';
    this._SfRowErrorMessage.innerHTML = '';
    this._SfRowSuccess.style.display = 'none';
    this._SfRowSuccessMessage.innerHTML = '';
    this._SfRowNotif.style.display = 'flex';
    this._SfRowNotifMessage.innerHTML = msg;
  }

  fetchSchema = async () => {
    let url = "https://" + this.apiId + "/getschema";

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr: any = (await this.prepareXhr({}, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    console.log(xhr)
    if (xhr.status == 200) {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.configjson = JSON.stringify(jsonRespose.schema);
      // if(this.flow == "new"){
      this.populateDataModel();
      this.populateView();
      // }
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
    }
  }

  fetchList = async () => {
    let url = "https://" + this.apiId + "/list";
    let body = { projectid: this.projectid }
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr: any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    console.log(xhr)
    if (xhr.status == 200) {
      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('list response', jsonRespose)
      console.log('list response', jsonRespose.lastCalendarGenerated)
      this.lastCalendarGenerated = jsonRespose.lastCalendarGenerated ?? ""
      this.nextCalendarScheduled = jsonRespose.nextCalendarScheduled ?? ""
      this.list = jsonRespose.list
      this.initListeners()
      this.populateList();
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
    }
  }

  fetchDetails = async () => {
    let url = "https://" + this.apiId + "/details";
    let body = { projectid: this.projectid, objectid: this.selectedItem.id }
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr: any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    console.log(xhr)
    if (xhr.status == 200) {
      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('details response', jsonRespose)
      let resultObject = jsonRespose.object
      this.published = resultObject.published ?? false
      this.configjson = resultObject.schema;
      this.prepopulateValJson = resultObject.object
      this.populateDataModel()
      this.prepopulateValues()
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
    }
  }

  submitNew = async (obj: any = this.selectedValues()) => {
    console.log('adding', obj);
    let url = "https://" + this.apiId + "/add";

    let body: any = { projectid: this.projectid, object: obj, schema: this.getConfigJson(), published: this.published }

    console.log('adding', body, url);
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr: any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    console.log(xhr)
    if (xhr.status == 200) {
      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('add response', jsonRespose)
      // this.configjson = JSON.stringify(jsonRespose.schema);
      // this.populateDataModel();
      // this.populateView();
      this.backClick()
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
    }
  }

  submitEdit = async () => {
    let url = "https://" + this.apiId + "/update";
    let body = { projectid: this.projectid, objectid: this.selectedItem.id, object: this.selectedValues(), schema: this.getConfigJson(), published: this.published }
    if (Object.keys(this.reopenedItem).length > 0) {
      url = "https://" + this.apiId + "/reopen"
      body = { projectid: this.projectid, object: this.selectedValues(), schema: this.getConfigJson(), objectid: this.reopenedItem.id, published: this.published }
    }
    console.log('updating', body, url)
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr: any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    console.log(xhr)
    if (xhr.status == 200) {
      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('update response', jsonRespose)
      // this.configjson = JSON.stringify(jsonRespose.schema);
      // this.populateDataModel();
      // this.populateView();
      this.backClick()
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
    }
  }

  submitDelete = async () => {
    let url = "https://" + this.apiId + "/delete";
    let body = { projectid: this.projectid, objectid: this.selectedItem.id }
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr: any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    console.log(xhr)
    if (xhr.status == 200) {
      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('delete response', jsonRespose)
      // this.configjson = JSON.stringify(jsonRespose.schema);
      // this.populateDataModel();
      // this.populateView();
      this.backClick()
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
    }
  }

  submitPublish = async () => {
    let url = "https://" + this.apiId + "/publish";
    let body = { projectid: this.projectid, objectids: this.selectedItemIds }
    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr: any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    console.log(xhr)
    if (xhr.status == 200) {
      const jsonRespose = JSON.parse(xhr.responseText);
      console.log('publish response', jsonRespose)
      // this.configjson = JSON.stringify(jsonRespose.schema);
      // this.populateDataModel();
      // this.populateView();
      // this.backClick()
      this.setSuccess("Calendar will be updated in a while.")
      setTimeout(() => {
        this.clearMessages();
      }, 3000)
    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
    }
  }

  initDecryptView = () => {
    let divsArr = this._SfDecryptContainer.querySelectorAll("#decrypt-container > div")
    console.log('decrypt divs', divsArr);
    for (let divElement of divsArr) {
      (divElement as HTMLElement).classList.remove('hide');
    }
    this.initDecryptListeners()
  }

  initDecryptListeners = () => {
    (this._SfDecryptProjectInput as SfIForm).addEventListener('valueChanged', () => {
      let projectId = (this._SfDecryptProjectInput as SfIForm).selectedValues()[0]
      this.decryptProjectId = projectId.split(';')[projectId.split(';').length - 1];
      this.evalDecrypt()
    });
    (this._SfDecryptFileInput as HTMLInputElement).addEventListener('keyup', () => {
      console.log('keyup called');
      this.decryptFileName = (this._SfDecryptFileInput as HTMLInputElement).value;
      this.evalDecrypt()
    });
    let decryptButton = this._SfDecryptContainer.querySelector("#button-decrypt") as HTMLButtonElement
    decryptButton?.addEventListener('click', () => {
      console.log('decrypt clicked', this.decryptProjectId, this.decryptFileName);
      this.submitDecrypt()
    })
  }

  evalDecrypt = () => {
    console.log((this._SfDecryptFileInput as HTMLInputElement))
    console.log('evalDecrypt', this.decryptProjectId, this.decryptFileName)
    if (this.decryptProjectId != null && this.decryptProjectId != "" && this.decryptFileName != null && this.decryptFileName.length > 3) {
      (this._SfDecryptContainer?.querySelector('#button-decrypt') as HTMLButtonElement).removeAttribute('disabled');
    } else {
      (this._SfDecryptContainer?.querySelector('#button-decrypt') as HTMLButtonElement).setAttribute('disabled', 'true');
    }
  }

  submitDecrypt = async () => {

    this.clearMessages();

    console.log('submitDecrypt called');

    const body: any = {};
    let url = "https://" + this.apiId + "/getdecryptedjson";

    body["projectid"] = this.decryptProjectId;
    body["key"] = this.decryptFileName + ".json";

    console.log(body);
    console.log(JSON.stringify(body));

    const authorization = btoa(Util.readCookie('email') + ":" + Util.readCookie('accessToken'));
    const xhr: any = (await this.prepareXhr(body, url, this._SfLoader, authorization)) as any;
    this._SfLoader.innerHTML = '';
    if (xhr.status == 200) {
      const jsonRespose = JSON.parse(xhr.responseText);
      let data = await this.fetchPresignedUrl(jsonRespose.signedUrlGet);
      await this.fetchPresignedUrlDelete(jsonRespose.signedUrlDelete)
      console.log('decrypt response', jsonRespose)
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

    } else {
      const jsonRespose = JSON.parse(xhr.responseText);
      this.setError(jsonRespose.error);
      setTimeout(() => {
        this.clearMessages();
      }, 5000);
    }

  }

  showLoader = async () => {
    if (this._SfIReportingCCopy != null) {
      let loaderContainer = this._SfIReportingCCopy as HTMLDivElement
      loaderContainer.style.backgroundColor = "#efefef"
      loaderContainer.style.display = 'flex'
      console.log('showing loader', loaderContainer.style.display)
    }
  }

  hideLoader = async () => {
    if (this._SfIReportingCCopy != null) {
      let loaderContainer = this._SfIReportingCCopy as HTMLDivElement
      loaderContainer.style.display = 'none'
      console.log('hiding loader', loaderContainer.style.display)
    }
  }

  protected override firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {

    this.loadMode();

  }

  override connectedCallback() {
    super.connectedCallback()
  }

  override render() {
    if (this.mode == "downloader") {
      return html`
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
                    <button id="button-decrypt">download</button>
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
      `
    }
    if (this.mode == "admin" && this.flow == "new") {
      return html`
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
      <div part="reporting-container-outer-copy" class="SfIReportingCCopy align-center d-flex flex-col justify-center hide">
        <div class="lds-dual-ring"></div>
      </div>
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
      `
    } else if (this.mode == "admin" && this.flow == "details") {
      return html`
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
      <div part="reporting-container-outer-copy" class="SfIReportingCCopy align-center d-flex flex-col justify-center hide">
        <div class="lds-dual-ring"></div>
      </div>
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
      `
    } else if (this.mode == "admin" && this.flow == "edit") {
      return html`
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
      <div part="reporting-container-outer-copy" class="SfIReportingCCopy align-center d-flex flex-col justify-center hide">
        <div class="lds-dual-ring"></div>
      </div>
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
      `
    } else if (this.mode == "admin" && this.flow == "list") {
      return html`
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0..1,0" />
      <div part="reporting-container-outer-copy" class="SfIReportingCCopy align-center d-flex flex-col justify-center hide">
        <div class="lds-dual-ring"></div>
      </div>
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
      `
    }
    return html`
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <div part="reporting-container-outer" class="SfIReportingC d-flex flex-col align-center">
        <div id="reporting-container-short" part="reporting-container-short" class="w-100-m-0"></div>
        <div id="reporting-container" part="reporting-container" class="w-100-m-0 hide"></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sf-i-reporting': SfIReporting;
  }
}
