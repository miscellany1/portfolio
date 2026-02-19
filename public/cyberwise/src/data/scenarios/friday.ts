import type { Scenario } from './types.ts';

export const fridayScenario: Scenario = {
  id: 'friday',
  title: 'Incident Response',
  dayLabel: 'Friday',
  bloomsLevel: 'Evaluation',
  simulationType: 'mixed',
  learningObjective:
    'Understand and apply proper incident response procedures including timely reporting, effective containment strategies, coordinated team communication, and clear executive escalation to minimize damage during a security incident.',
  intro:
    'It is Friday morning and you are settling in for what you hope will be a quiet end to the week. Your security monitoring dashboard lights up with an alert that suggests anomalous data exfiltration from one of your company\'s production databases. The clock is ticking -- how you respond in the next few hours will determine the extent of the damage and whether the organization can recover quickly.',

  steps: [
    // Step 1: Discovering the potential data breach alert
    {
      id: 'friday-step-1',
      narrative:
        'Your SIEM dashboard has flagged a critical alert: unusual outbound traffic from the customer database server spiked overnight, with over 12 GB of data transferred to an external IP address between 2:00 AM and 5:00 AM. The alert includes log excerpts showing queries against the customers table that do not match any scheduled jobs. You need to decide how to handle this initial alert.',
      simulationContent: {
        type: 'mixed',
        elements: [
          {
            type: 'email',
            emails: [
              {
                from: 'siem-alerts@company.com',
                to: 'you@company.com',
                subject: 'CRITICAL: Anomalous Data Exfiltration Detected — custdb-prod-01',
                body: 'Priority: CRITICAL\n\nTimestamp: 2025-06-13 02:14:00 UTC — 05:03:00 UTC\nSource: custdb-prod-01 (10.0.12.45)\nDestination: 203.0.113.77 (unregistered external IP)\nVolume: 12.4 GB outbound\n\nDetails:\n- 47 SELECT * queries against `customers` table (columns: name, email, ssn_encrypted, payment_token)\n- Queries originated from service account `svc_reporting` which has not been used since 2024-11-01\n- No corresponding scheduled ETL or reporting jobs found\n- Firewall egress rule match: allow-all (legacy rule, flagged for removal in Q1 audit)\n\nRecommended Action: Investigate immediately. This pattern is consistent with credential compromise and data exfiltration.\n\nSIEM Reference: INC-2025-0613-0042',
                timestamp: '2025-06-13T06:15:00Z',
              },
            ],
          },
          {
            type: 'desktop',
            notifications: [
              {
                title: 'Security Alert — Severity: Critical',
                message:
                  'Anomalous outbound data transfer detected from custdb-prod-01. 12.4 GB sent to external IP 203.0.113.77 using dormant service account svc_reporting. Immediate investigation recommended.',
                type: 'error',
              },
            ],
          },
        ],
      },
      choices: [
        {
          id: 'friday-1-optimal',
          text: 'Immediately document the alert details, preserve the SIEM logs, and open a formal incident ticket following the company incident response plan before taking any other action.',
          quality: 'optimal',
          securityScoreChange: 5,
          trustChange: 5,
          achievementTrigger: 'first_responder',
          feedback: {
            title: 'Textbook Initial Response',
            explanation:
              'You followed the first critical step of any incident response: preserving evidence and formally documenting the incident. By opening a ticket and preserving logs before taking action, you ensured that nothing is lost and the response is traceable.',
            realWorldContext:
              'The NIST Incident Response framework (SP 800-61) emphasizes that the first phase after detection is to document and preserve evidence. Many organizations have lost the ability to prosecute attackers or understand the full scope of a breach because responders modified or destroyed evidence in their rush to contain the threat.',
          },
        },
        {
          id: 'friday-1-acceptable',
          text: 'Review the SIEM alert details carefully to verify it is not a false positive, then notify your direct manager about the alert before proceeding.',
          quality: 'acceptable',
          securityScoreChange: 2,
          trustChange: 2,
          feedback: {
            title: 'Reasonable but Slightly Delayed',
            explanation:
              'Verifying the alert and notifying your manager are both valid actions. However, you did not formally open an incident ticket or explicitly preserve the log evidence, which risks losing critical forensic data if logs rotate.',
            realWorldContext:
              'False positive triage is important, but with indicators this strong -- dormant account usage, large data volume to an unknown IP, and queries against sensitive columns -- the probability of a true positive is high. In real incidents, spending too long on triage before formal documentation has led to evidence gaps.',
          },
        },
        {
          id: 'friday-1-poor',
          text: 'Immediately block the external IP address at the firewall and disable the svc_reporting service account to stop any ongoing exfiltration.',
          quality: 'poor',
          securityScoreChange: -5,
          trustChange: -3,
          feedback: {
            title: 'Containment Without Documentation',
            explanation:
              'While blocking the IP and disabling the account are eventually necessary, doing so as your first action without documenting the incident or preserving evidence can tip off the attacker (who may have other access paths) and destroy forensic artifacts. You also skipped the formal incident process.',
            realWorldContext:
              'Premature containment is a common mistake in incident response. The 2017 Equifax breach investigation was complicated because early remediation steps altered system state before forensic images could be captured. The attacker may also have multiple exfiltration channels, making a single block ineffective while alerting them to switch methods.',
          },
        },
        {
          id: 'friday-1-dangerous',
          text: 'The alert is probably a false positive from the legacy firewall rule. Mark it as reviewed and continue with your normal Friday tasks.',
          quality: 'dangerous',
          securityScoreChange: -10,
          trustChange: -8,
          feedback: {
            title: 'Critical Alert Ignored',
            explanation:
              'Dismissing a critical alert with multiple corroborating indicators -- dormant account usage, large data transfer to an unknown IP, queries against sensitive PII columns -- is a severe failure in incident response. This allows the breach to continue unchecked and potentially expand.',
            realWorldContext:
              'The Target breach of 2013 is a cautionary tale: security alerts from their FireEye system were ignored by the monitoring team in the days before 40 million credit card records were stolen. Alert fatigue is real, but critical alerts with strong indicators must always be investigated promptly.',
          },
        },
      ],
    },

    // Step 2: Deciding whether to contain or investigate first
    {
      id: 'friday-step-2',
      narrative:
        'You have documented the initial alert and opened incident ticket INC-2025-0613-0042. Now you need to decide on your next course of action. The exfiltration appears to have stopped at 5:03 AM, but you cannot be certain the attacker no longer has access. The svc_reporting account is still active, and the legacy firewall rule still permits outbound traffic. Your incident response plan calls for a balance between containment and investigation.',
      simulationContent: {
        type: 'mixed',
        elements: [
          {
            type: 'desktop',
            notifications: [
              {
                title: 'Incident Response Checklist',
                message:
                  'INC-2025-0613-0042 opened. Phase: Containment & Analysis. Key decisions: scope assessment, evidence preservation, containment strategy. Reminder: coordinate with Legal and Privacy teams if PII is involved.',
                type: 'warning',
              },
              {
                title: 'System Status — custdb-prod-01',
                message:
                  'Current status: ONLINE. Active connections: 14 (all from known application servers). svc_reporting account: ACTIVE (last login 05:03 UTC). No current anomalous traffic detected.',
                type: 'info',
              },
            ],
          },
        ],
      },
      choices: [
        {
          id: 'friday-2-optimal',
          text: 'Take a forensic image of the affected server first, then disable the svc_reporting account and tighten the firewall rule. Simultaneously request network flow logs from the past 72 hours for analysis.',
          quality: 'optimal',
          securityScoreChange: 5,
          trustChange: 5,
          feedback: {
            title: 'Balanced Containment and Preservation',
            explanation:
              'You correctly prioritized forensic imaging before making changes, then applied targeted containment measures. Requesting extended network logs shows thoroughness in scoping the incident. This approach preserves evidence while stopping further damage.',
            realWorldContext:
              'SANS incident response methodology recommends capturing forensic images before containment actions whenever possible. The forensic image preserves the exact state of the system including memory artifacts, running processes, and temporary files that would be lost after account disabling or system changes. The 72-hour log window helps establish whether this was a one-time event or part of a longer campaign.',
          },
        },
        {
          id: 'friday-2-acceptable',
          text: 'Disable the svc_reporting account immediately and close the legacy firewall rule, then begin investigating the logs to understand the scope of the breach.',
          quality: 'acceptable',
          securityScoreChange: 2,
          trustChange: 2,
          nextBranch: 'containment-first',
          feedback: {
            title: 'Containment Prioritized Over Forensics',
            explanation:
              'Disabling the account and closing the firewall rule are correct containment actions. However, by not capturing a forensic image first, you may have lost volatile evidence such as active sessions, memory contents, and process state that could be critical for understanding the full attack chain.',
            realWorldContext:
              'In many real-world incidents, the tension between "stop the bleeding" and "preserve the evidence" is the hardest judgment call. When customer PII is actively being exfiltrated, containment may take priority. However, best practice is to at minimum capture memory and active connections before making changes.',
          },
        },
        {
          id: 'friday-2-poor',
          text: 'Begin a deep-dive investigation into the svc_reporting account history, audit logs, and network traces to fully understand the attack before taking any containment action.',
          quality: 'poor',
          securityScoreChange: -5,
          trustChange: -3,
          nextBranch: 'investigation-deep-dive',
          feedback: {
            title: 'Investigation Without Containment',
            explanation:
              'While investigation is important, leaving a compromised account active and a permissive firewall rule in place while you investigate means the attacker could resume exfiltration at any time. The investigation could take hours or days, during which the breach could expand significantly.',
            realWorldContext:
              'The 2020 SolarWinds breach demonstrated the danger of extended attacker dwell time. While understanding the full scope matters, allowing continued access while investigating gives attackers time to entrench further, deploy additional backdoors, or exfiltrate more data. Containment and investigation should proceed in parallel.',
          },
        },
        {
          id: 'friday-2-dangerous',
          text: 'Shut down the production database server entirely to ensure no further data can be exfiltrated.',
          quality: 'dangerous',
          securityScoreChange: -10,
          trustChange: -8,
          feedback: {
            title: 'Disproportionate Response Causing Business Disruption',
            explanation:
              'Shutting down a production database affects all business operations, not just the compromised pathway. This causes a company-wide outage, destroys volatile forensic evidence in memory, and may violate SLAs. The breach channel can be contained with targeted measures without taking down the entire server.',
            realWorldContext:
              'In the 2014 Sony Pictures breach, some overly aggressive containment measures contributed to operational chaos. Incident responders should use the minimum containment action necessary to stop the threat. Shutting down production systems should be reserved for cases where targeted containment has failed and active exfiltration is ongoing with no alternative.',
          },
        },
      ],
    },

    // Step 3: Communicating with the team about the incident
    {
      id: 'friday-step-3',
      narrative:
        'Containment measures are in place. The svc_reporting account has been disabled, the legacy firewall rule has been replaced with a restrictive policy, and forensic images have been captured. Initial analysis suggests that approximately 50,000 customer records may have been accessed, including names, email addresses, and encrypted SSNs. You now need to coordinate with your team and other stakeholders. The incident response team Slack channel is active and people are starting to ask questions.',
      simulationContent: {
        type: 'mixed',
        elements: [
          {
            type: 'chat',
            messages: [
              {
                sender: 'Maria Chen (DevOps Lead)',
                message:
                  'Hey, I noticed the svc_reporting account got disabled and a firewall rule changed. Our monitoring dashboards are showing the changes. What is going on?',
                timestamp: '2025-06-13T08:22:00Z',
              },
              {
                sender: 'Jake Powell (Junior Developer)',
                message:
                  'Is the customer DB down? I am getting connection warnings on the reporting microservice.',
                timestamp: '2025-06-13T08:24:00Z',
              },
              {
                sender: 'Aisha Rahman (Privacy Officer)',
                message:
                  'I heard there might be a data incident. If customer PII is involved, we have regulatory notification obligations. Please loop me in ASAP.',
                timestamp: '2025-06-13T08:27:00Z',
              },
              {
                sender: 'Tom Bradley (CISO)',
                message:
                  'I have seen the incident ticket. Let us get the IR team assembled. What is the current status and what do you need?',
                timestamp: '2025-06-13T08:30:00Z',
              },
            ],
          },
        ],
      },
      choices: [
        {
          id: 'friday-3-optimal',
          text: 'Post a structured status update to the IR channel with: current facts (what we know), containment actions taken, estimated scope (50K records), and next steps. Directly tag Aisha for privacy/legal coordination and ask Tom to schedule an IR bridge call within the hour.',
          quality: 'optimal',
          securityScoreChange: 5,
          trustChange: 5,
          requiresTrustLevel: 40,
          feedback: {
            title: 'Clear, Structured Incident Communication',
            explanation:
              'You provided a factual, structured update that keeps all stakeholders informed without causing panic. By tagging the Privacy Officer directly, you ensured regulatory obligations are being addressed. Requesting a bridge call provides a forum for coordinated decision-making.',
            realWorldContext:
              'Effective incident communication follows the ICS (Incident Command System) model: clear, factual, structured updates through defined channels. The GDPR and many US state breach notification laws require privacy teams to be engaged early to assess notification timelines (e.g., GDPR requires notification within 72 hours of discovery). Poor communication during incidents is consistently cited as a major factor in increased breach costs in IBM\'s annual Cost of a Data Breach Report.',
          },
        },
        {
          id: 'friday-3-acceptable',
          text: 'Respond to each person individually with relevant information: explain the situation to Maria and Jake, confirm to Aisha that PII may be involved, and give Tom a brief status update.',
          quality: 'acceptable',
          securityScoreChange: 2,
          trustChange: 2,
          feedback: {
            title: 'Individual Responses Instead of Unified Update',
            explanation:
              'Responding to each person shows attentiveness, but individual messages risk inconsistent information sharing and waste time during a critical incident. A single structured update ensures everyone has the same information simultaneously.',
            realWorldContext:
              'During the 2021 Colonial Pipeline incident, fragmented communication between teams led to confusion about the scope and status of the attack. Incident response best practices emphasize single-source-of-truth updates to prevent information asymmetry, contradictory actions, and rumor propagation.',
          },
        },
        {
          id: 'friday-3-poor',
          text: 'Tell the team you are still investigating and cannot share details yet. Ask everyone to hold their questions until you have completed the full analysis.',
          quality: 'poor',
          securityScoreChange: -5,
          trustChange: -3,
          feedback: {
            title: 'Withholding Information from Stakeholders',
            explanation:
              'Asking stakeholders to wait while you complete analysis delays critical actions like legal assessment and regulatory notification. The Privacy Officer needs to be engaged immediately when PII is involved, and the CISO needs situational awareness to make resource decisions.',
            realWorldContext:
              'Delayed internal communication is a pattern seen in many costly breaches. Uber\'s 2016 breach was concealed internally, eventually leading to regulatory fines and criminal charges against the CSO. While you do not need to share every detail immediately, key stakeholders in legal, privacy, and executive leadership must be informed promptly when PII exposure is suspected.',
          },
        },
        {
          id: 'friday-3-dangerous',
          text: 'Post a detailed technical writeup in the general company Slack channel so everyone in the organization knows what happened and can check if their systems are affected.',
          quality: 'dangerous',
          securityScoreChange: -10,
          trustChange: -8,
          feedback: {
            title: 'Breach Details Shared to Unauthorized Audience',
            explanation:
              'Sharing detailed incident information in a general channel violates information control principles. This could cause organizational panic, tip off an insider threat, leak to the press prematurely, or compromise the investigation. Incident details should be restricted to the IR team and authorized stakeholders.',
            realWorldContext:
              'Information control during incidents is critical. When details of the 2023 MGM Resorts breach leaked to social media before the company could control the narrative, it caused stock price drops, customer panic, and complicated the response. Incident communication should follow a defined communications plan with authorized channels and spokespeople.',
          },
        },
      ],
    },

    // Step 4: Reporting to management and determining next steps
    {
      id: 'friday-step-4',
      narrative:
        'The IR bridge call is underway. Forensic analysis has confirmed that 52,347 customer records were exfiltrated, including names, email addresses, and encrypted SSNs (the encryption keys were stored separately and do not appear to have been compromised). The attack vector was a compromised set of credentials for the svc_reporting account, likely obtained through a credential stuffing attack against a third-party service where the same password was reused. The CISO has asked you to present the situation to the VP of Engineering and recommend next steps.',
      simulationContent: {
        type: 'mixed',
        elements: [
          {
            type: 'phone',
            call: {
              caller: 'Diana Morrison',
              callerTitle: 'VP of Engineering',
              transcript: [
                'Diana: I understand we have a security incident. I have 15 minutes before the board prep meeting. Give me the essential facts and your recommendation.',
                'Diana: How confident are we in the scope? Could it be larger than what we currently know?',
                'Diana: What are our obligations here? Do we need to notify customers?',
                'Diana: What do you recommend as immediate next steps?',
              ],
            },
          },
        ],
      },
      choices: [
        {
          id: 'friday-4-optimal',
          text: 'Present a concise executive summary: confirmed exfiltration of 52K records via compromised service account, SSN encryption keys not compromised, containment complete. Recommend: (1) engage external forensics firm to validate scope, (2) work with Legal and Privacy to initiate breach notification process, (3) immediate password rotation for all service accounts, (4) expedite the legacy firewall rule audit from the Q1 backlog.',
          quality: 'optimal',
          securityScoreChange: 5,
          trustChange: 5,
          requiresTrustLevel: 35,
          // security_champion is evaluated computationally at end of game based on final score
          feedback: {
            title: 'Comprehensive Executive Briefing with Actionable Recommendations',
            explanation:
              'You delivered a clear, concise briefing appropriate for executive audience with the right level of detail. Your four recommendations cover validation (external forensics), compliance (breach notification), immediate remediation (password rotation), and systemic improvement (firewall audit). This demonstrates mature incident response leadership.',
            realWorldContext:
              'Executive communication during incidents requires translating technical details into business impact and actionable decisions. The Verizon DBIR consistently shows that organizations with pre-established executive communication plans recover faster from breaches. Engaging external forensics provides independent validation that regulators and courts look for. Breach notification timelines vary by jurisdiction but typically range from 30 to 72 hours after confirmation.',
          },
        },
        {
          id: 'friday-4-acceptable',
          text: 'Explain the technical details of the breach including the attack vector and recommend immediately notifying affected customers and engaging the legal team to assess regulatory requirements.',
          quality: 'acceptable',
          securityScoreChange: 2,
          trustChange: 2,
          feedback: {
            title: 'Good Recommendations but Overly Technical for Audience',
            explanation:
              'Your recommendations to notify customers and engage legal are correct. However, leading with technical details in a 15-minute executive briefing wastes valuable time. Executives need business impact, scope, and decisions -- not attack chain details. You also missed recommending external forensics validation and systemic remediation.',
            realWorldContext:
              'Effective executive communication during crises is a learned skill. Security leaders who can translate technical incidents into business language earn greater trust and resources. The SANS Institute recommends the "bottom line up front" (BLUF) format for executive incident briefings: impact, scope, containment status, and required decisions.',
          },
        },
        {
          id: 'friday-4-poor',
          text: 'Tell Diana that the situation is under control and the team is handling it. Suggest waiting until the full investigation is complete before making any decisions about notification or remediation.',
          quality: 'poor',
          securityScoreChange: -5,
          trustChange: -3,
          feedback: {
            title: 'Downplaying Severity and Delaying Action',
            explanation:
              'Telling an executive the situation is "under control" without providing facts is evasive. Recommending to wait for the full investigation before starting notification processes could violate regulatory timelines. Executives need honest assessments to make informed decisions, even when the news is bad.',
            realWorldContext:
              'The Equifax breach response was heavily criticized because executives downplayed the severity and delayed customer notification for six weeks after discovery. This resulted in congressional hearings, a $700 million settlement, and lasting reputational damage. Regulatory frameworks like GDPR impose strict notification timelines that begin at discovery, not at investigation completion.',
          },
        },
        {
          id: 'friday-4-dangerous',
          text: 'Recommend keeping the breach confidential until the company can assess the financial impact. Suggest that since the SSN encryption keys were not compromised, there is no real risk to customers and notification may not be necessary.',
          quality: 'dangerous',
          securityScoreChange: -10,
          trustChange: -8,
          feedback: {
            title: 'Concealment and Misrepresentation of Obligations',
            explanation:
              'Recommending concealment of a confirmed data breach is both unethical and illegal in most jurisdictions. Even though encryption keys were not compromised, the exfiltration of names, email addresses, and encrypted SSNs still constitutes a reportable breach under most data protection laws. Minimizing the breach to avoid notification is a path to severe legal consequences.',
            realWorldContext:
              'Uber\'s former CSO Joe Sullivan was criminally convicted in 2022 for concealing the 2016 data breach from regulators, resulting in a federal felony conviction. Most US states have mandatory breach notification laws, and the FTC has taken enforcement actions against companies that failed to disclose breaches. The fact that encryption keys were not compromised may reduce the severity assessment but does not eliminate notification obligations when PII has been exfiltrated.',
          },
        },
      ],
    },
  ],

  branches: {
    'containment-first': {
      steps: [
        {
          id: 'friday-branch-containment-step-1',
          narrative:
            'You contained the threat quickly by disabling the account and closing the firewall rule. However, without a forensic image, some volatile evidence has been lost. The IT operations team is now asking whether any other service accounts may be compromised. You need to decide how to scope the investigation going forward without the forensic baseline you would normally have.',
          simulationContent: {
            type: 'mixed',
            elements: [
              {
                type: 'chat',
                messages: [
                  {
                    sender: 'Maria Chen (DevOps Lead)',
                    message:
                      'We have 23 other service accounts in production. Given that svc_reporting was compromised, should we disable all of them as a precaution? That would break several critical integrations.',
                    timestamp: '2025-06-13T09:15:00Z',
                  },
                  {
                    sender: 'Tom Bradley (CISO)',
                    message:
                      'I wish we had the forensic image to analyze the attack vector more thoroughly. Let us work with what we have. What is your recommendation for scoping the rest of the environment?',
                    timestamp: '2025-06-13T09:18:00Z',
                  },
                ],
              },
            ],
          },
          choices: [
            {
              id: 'friday-branch-1-optimal',
              text: 'Recommend an audit of all 23 service accounts: check last login timestamps, password ages, and whether any share credentials with svc_reporting. Rotate passwords for any accounts with passwords older than 90 days. Do not disable all accounts preemptively.',
              quality: 'optimal',
              securityScoreChange: 5,
              trustChange: 5,
              feedback: {
                title: 'Targeted, Risk-Based Scoping',
                explanation:
                  'A targeted audit based on credential hygiene indicators is the right approach. Checking for password reuse and stale credentials focuses the investigation on the most likely compromised accounts without causing unnecessary business disruption.',
                realWorldContext:
                  'Credential stuffing attacks typically exploit password reuse. The NIST 800-63B guidelines recommend checking credentials against known breach databases. A risk-based approach to scoping prevents the "whack-a-mole" pattern where teams disable accounts reactively without understanding the underlying vulnerability.',
              },
            },
            {
              id: 'friday-branch-1-acceptable',
              text: 'Rotate passwords for all 23 service accounts immediately as a precaution, coordinating with each integration owner to minimize downtime.',
              quality: 'acceptable',
              securityScoreChange: 2,
              trustChange: 2,
              feedback: {
                title: 'Broad but Managed Response',
                explanation:
                  'Rotating all passwords is a conservative but safe approach. Coordinating with integration owners shows awareness of business impact. However, without first analyzing which accounts are actually at risk, you may be causing unnecessary disruption while missing the root cause.',
                realWorldContext:
                  'Mass credential rotation is a common post-breach action, but it is most effective when paired with analysis of the compromise vector. If the attacker obtained credentials through a specific third-party breach, only accounts with reused passwords from that service are at risk. Blanket rotation without analysis can create operational chaos and a false sense of security.',
              },
            },
            {
              id: 'friday-branch-1-poor',
              text: 'Focus only on the svc_reporting account since that is the one confirmed to be compromised. The other accounts are probably fine.',
              quality: 'poor',
              securityScoreChange: -5,
              trustChange: -3,
              feedback: {
                title: 'Insufficient Scoping',
                explanation:
                  'Limiting investigation to only the confirmed compromised account ignores the likely attack pattern. If svc_reporting was compromised via credential stuffing, any other accounts with reused passwords are at equal risk. Failing to scope properly can lead to a second breach through another compromised account.',
                realWorldContext:
                  'Many major breaches involve lateral movement and multiple compromised accounts. The SolarWinds attackers compromised numerous accounts beyond the initial entry point. Incident scoping must consider the attack vector and identify all assets that could be affected by the same vulnerability.',
              },
            },
            {
              id: 'friday-branch-1-dangerous',
              text: 'Disable all 23 service accounts immediately, regardless of business impact. Security comes first and we cannot risk another breach.',
              quality: 'dangerous',
              securityScoreChange: -10,
              trustChange: -8,
              feedback: {
                title: 'Panic Response Causing Maximum Disruption',
                explanation:
                  'Disabling all service accounts without coordination would break critical integrations across the organization, potentially causing a larger business impact than the breach itself. This panic response damages trust in the security team and makes future cooperation more difficult.',
                realWorldContext:
                  'Disproportionate incident response measures can cause more damage than the incident itself. Security teams that repeatedly cause business disruptions through overreaction lose organizational trust and influence. The principle of proportionality in incident response means using the minimum necessary containment to neutralize the threat while preserving business operations.',
              },
            },
          ],
        },
      ],
    },

    'investigation-deep-dive': {
      steps: [
        {
          id: 'friday-branch-investigation-step-1',
          narrative:
            'Your thorough forensic analysis has revealed additional details. The attacker used a VPN exit node in Eastern Europe, and the compromised credentials for svc_reporting were found in a dark web credential dump from a third-party HR platform breach three months ago. The password had not been rotated since 2024. You now have a clear picture of the attack chain and need to compile your findings into an after-action report.',
          simulationContent: {
            type: 'mixed',
            elements: [
              {
                type: 'email',
                emails: [
                  {
                    from: 'forensics-team@company.com',
                    to: 'incident-response@company.com',
                    subject: 'Forensic Analysis Complete — INC-2025-0613-0042',
                    body: 'Summary of Findings:\n\n1. Attack Vector: Credential stuffing using credentials from HRConnect platform breach (March 2025 dark web dump)\n2. Entry Point: svc_reporting account — password unchanged since November 2024\n3. Attacker Origin: VPN exit node 203.0.113.77, traced to commercial VPN provider (Eastern European exit)\n4. Data Accessed: 52,347 customer records (name, email, encrypted SSN, payment token)\n5. Encryption Keys: NOT accessed — stored in separate HSM, no access attempts detected\n6. Dwell Time: Single session, 02:14 — 05:03 UTC (2 hours 49 minutes)\n7. Lateral Movement: None detected\n8. Additional Indicators: No persistence mechanisms, no malware deployed\n\nAssessment: Opportunistic smash-and-grab attack, not an APT. Attacker likely automated credential testing against multiple targets from the HRConnect dump.',
                    timestamp: '2025-06-13T14:00:00Z',
                  },
                ],
              },
            ],
          },
          choices: [
            {
              id: 'friday-branch-2-optimal',
              text: 'Compile a comprehensive after-action report including the full attack timeline, root cause analysis (credential reuse + no rotation policy enforcement), specific remediation items with owners and deadlines, and recommend a company-wide review of service account hygiene.',
              quality: 'optimal',
              securityScoreChange: 5,
              trustChange: 5,
              feedback: {
                title: 'Thorough Post-Incident Analysis',
                explanation:
                  'A comprehensive after-action report with assigned remediation items turns a security incident into an improvement opportunity. Identifying the root cause (credential reuse and lack of rotation enforcement) and recommending systemic changes prevents recurrence.',
                realWorldContext:
                  'Post-incident reviews (also called retrospectives or lessons learned) are a critical phase of the NIST incident response lifecycle. Organizations that conduct thorough after-action reviews and implement recommended changes reduce the likelihood and cost of future breaches. The Verizon DBIR shows that credential-related attacks remain the most common breach vector, making service account hygiene a high-impact improvement area.',
              },
            },
            {
              id: 'friday-branch-2-acceptable',
              text: 'Write up the technical findings and share them with the security team. Recommend implementing mandatory password rotation for all service accounts.',
              quality: 'acceptable',
              securityScoreChange: 2,
              trustChange: 2,
              feedback: {
                title: 'Good Technical Documentation, Limited Scope',
                explanation:
                  'Documenting technical findings and recommending password rotation are valid steps. However, the report should be broader than just the security team and should include non-technical root cause factors like the lack of policy enforcement, missing credential monitoring, and the legacy firewall rule that was flagged but not remediated.',
                realWorldContext:
                  'After-action reports are most valuable when they address systemic issues, not just the immediate technical vulnerability. The most effective post-incident improvements often involve process changes (like enforcing credential rotation policies) and governance improvements (like ensuring flagged security items are remediated on schedule).',
              },
            },
            {
              id: 'friday-branch-2-poor',
              text: 'The forensic analysis is complete and the breach has been contained. Close the incident ticket and move on. The team can review the findings when they have time.',
              quality: 'poor',
              securityScoreChange: -5,
              trustChange: -3,
              feedback: {
                title: 'Missed Improvement Opportunity',
                explanation:
                  'Closing an incident without a formal after-action review and remediation plan virtually guarantees that the same type of attack will succeed again. The root cause — credential reuse and lack of rotation — remains unaddressed, leaving 23 other service accounts potentially vulnerable.',
                realWorldContext:
                  'Organizations that skip post-incident reviews are statistically more likely to suffer repeat breaches. The Ponemon Institute found that companies without formal incident response processes (including post-incident review) spend an average of $1.5 million more per breach than those with mature IR programs.',
              },
            },
            {
              id: 'friday-branch-2-dangerous',
              text: 'The breach was caused by a third-party platform (HRConnect) so it is really their fault. Draft a communication blaming the third-party vendor and recommend the company pursue legal action against HRConnect instead of making internal changes.',
              quality: 'dangerous',
              securityScoreChange: -10,
              trustChange: -8,
              feedback: {
                title: 'Deflecting Responsibility and Ignoring Root Cause',
                explanation:
                  'While the credential source was a third-party breach, the root cause was internal: the password was reused, not rotated, and the legacy firewall rule permitted unrestricted outbound traffic. Blaming a vendor while ignoring internal failures ensures the same vulnerability will be exploited again, potentially through a different credential source.',
                realWorldContext:
                  'Shared responsibility in cybersecurity means that even when a third party is breached, organizations are responsible for their own credential hygiene, network segmentation, and monitoring. Regulators will hold the company accountable for failing to protect customer data, regardless of where the credentials were initially compromised. The 2013 Target breach originated through a third-party HVAC vendor, but Target bore the regulatory and financial consequences.',
              },
            },
          ],
        },
      ],
    },
  },
};
