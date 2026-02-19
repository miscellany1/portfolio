import type { Scenario } from './types.ts';

export const thursdayScenario: Scenario = {
  id: 'thursday',
  title: 'Data Handling',
  dayLabel: 'Thursday',
  bloomsLevel: 'Analysis',
  simulationType: 'chat',
  learningObjective:
    'Understand proper data classification, handling, and sharing practices to protect sensitive information from unauthorized access and accidental disclosure.',
  intro:
    'It\'s Thursday morning and your team Slack is buzzing. Several coworkers have data-related requests that will test your judgment on what can be shared, where it can be stored, and how to handle sensitive information. Every choice you make affects your company\'s security posture.',

  steps: [
    // Step 1: Data classification question -- public vs confidential
    {
      id: 'thursday-step-1',
      narrative:
        'A coworker posts in your team channel asking whether a particular document should be classified as "Public" or "Confidential." The document contains aggregated customer satisfaction survey results with no personally identifiable information, but it also includes internal response-rate benchmarks your company uses to measure team performance.',
      simulationContent: {
        type: 'chat',
        messages: [
          {
            sender: 'Dana Reeves',
            message:
              'Hey team! Quick question -- I need to send our Q3 customer satisfaction report to a partner agency for a joint case study. The report has survey scores and our internal response-rate benchmarks. Is this considered Public or Confidential? I don\'t want to hold things up.',
            timestamp: '9:12 AM',
            avatar: 'DR',
          },
          {
            sender: 'Marcus Li',
            message:
              'I think the survey scores are fine to share, but not sure about the benchmarks. Anyone from compliance around?',
            timestamp: '9:14 AM',
            avatar: 'ML',
          },
          {
            sender: 'Dana Reeves',
            message:
              'The partner is waiting on me... Can I just send the whole thing and sort it out later?',
            timestamp: '9:16 AM',
            avatar: 'DR',
          },
        ],
      },
      choices: [
        {
          id: 'thursday-1-optimal',
          text: 'Advise Dana to classify the document as Confidential due to the internal benchmarks, and suggest she create a separate version with only the public survey data for the partner while getting compliance approval for the rest.',
          quality: 'optimal',
          securityScoreChange: 5,
          trustChange: 5,
          achievementTrigger: 'data_guardian',
          feedback: {
            title: 'Excellent Data Classification',
            explanation:
              'You correctly identified that internal performance benchmarks make the full document Confidential, even though survey results alone might be shareable. Recommending a redacted version shows strong data handling instincts.',
            realWorldContext:
              'Many data breaches stem from over-sharing documents that mix public and confidential information. The 2023 Microsoft AI research leak happened partly because internal data was bundled with intended-to-be-public content. Always separate and classify individual data elements.',
          },
        },
        {
          id: 'thursday-1-acceptable',
          text: 'Tell Dana the document is probably Confidential and she should check with compliance before sending anything to the partner.',
          quality: 'acceptable',
          securityScoreChange: 2,
          trustChange: 2,
          feedback: {
            title: 'Cautious but Incomplete',
            explanation:
              'Flagging it as likely Confidential and deferring to compliance is safe, but you didn\'t offer a practical path forward. Dana might still be tempted to send it while waiting for a compliance response.',
            realWorldContext:
              'In fast-paced workplaces, telling someone to "just check with compliance" without offering an alternative often leads to people bypassing the process to meet deadlines. Providing a concrete workaround (like a redacted version) reduces that risk significantly.',
          },
        },
        {
          id: 'thursday-1-poor',
          text: 'Tell Dana that since there\'s no PII in the document, it\'s fine to classify as Public and send to the partner.',
          quality: 'poor',
          securityScoreChange: -5,
          trustChange: -3,
          feedback: {
            title: 'Incorrect Classification',
            explanation:
              'The absence of PII does not automatically make a document Public. Internal benchmarks and performance metrics are proprietary business information that competitors could exploit. Data classification considers multiple sensitivity dimensions, not just PII.',
            realWorldContext:
              'Many organizations mistakenly equate "no PII" with "safe to share." Internal KPIs, financial benchmarks, and operational metrics are high-value targets for competitors and can violate NDA terms if shared improperly.',
          },
        },
        {
          id: 'thursday-1-dangerous',
          text: 'Tell Dana not to worry about classification -- just send the whole document now and retroactively classify it later if anyone raises a concern.',
          quality: 'dangerous',
          securityScoreChange: -10,
          trustChange: -8,
          nextBranch: 'careless-sharing',
          feedback: {
            title: 'Reckless Data Handling',
            explanation:
              'Ignoring classification entirely and sharing confidential data with external parties creates serious legal and competitive risk. Retroactive classification cannot undo an unauthorized disclosure.',
            realWorldContext:
              'Once data is shared externally, you lose control of it permanently. The "send now, classify later" approach has led to major incidents, including the 2017 Equifax breach response failures where unclassified documents were shared with unauthorized third parties during the chaos.',
          },
        },
      ],
    },

    // Step 2: Coworker asking to share customer data via personal email
    {
      id: 'thursday-step-2',
      narrative:
        'A few minutes later, another message appears. Your coworker Jake says his corporate email is having sync issues and asks you to forward a customer contact list to his personal Gmail so he can work from home this afternoon.',
      simulationContent: {
        type: 'chat',
        messages: [
          {
            sender: 'Jake Torres',
            message:
              'Hey, my Outlook is acting up again and IT says they can\'t fix it until tomorrow. Can you forward me the Acme Corp customer contact list? I need it for my calls this afternoon.',
            timestamp: '10:04 AM',
            avatar: 'JT',
          },
          {
            sender: 'Jake Torres',
            message: 'Just send it to jakettorres@gmail.com -- I\'ll delete it from my personal email once Outlook is fixed, promise.',
            timestamp: '10:05 AM',
            avatar: 'JT',
          },
          {
            sender: 'Jake Torres',
            message: 'I really can\'t miss these calls, the quarterly review is next week and these accounts are my responsibility.',
            timestamp: '10:07 AM',
            avatar: 'JT',
          },
        ],
      },
      choices: [
        {
          id: 'thursday-2-optimal',
          text: 'Decline the request and suggest Jake use an approved method instead: access the CRM through the company VPN on his personal device, or ask IT for a temporary webmail workaround until Outlook is fixed.',
          quality: 'optimal',
          securityScoreChange: 5,
          trustChange: 5,
          feedback: {
            title: 'Perfect Response',
            explanation:
              'You protected customer PII by refusing to send it to an unmanaged personal email while still helping Jake find a compliant workaround. Customer contact lists are sensitive data that must stay within company-controlled systems.',
            realWorldContext:
              'Sending customer data to personal email accounts violates most data protection regulations (GDPR, CCPA, HIPAA). Even if Jake deletes the email, copies may persist in his Gmail trash, backups, or cached on his device. Companies have faced multi-million-dollar fines for exactly this kind of data handling failure.',
          },
        },
        {
          id: 'thursday-2-acceptable',
          text: 'Tell Jake you can\'t send customer data to a personal email, and suggest he escalate the Outlook issue to IT as urgent so they prioritize the fix.',
          quality: 'acceptable',
          securityScoreChange: 2,
          trustChange: 2,
          feedback: {
            title: 'Correct Refusal, Limited Help',
            explanation:
              'You correctly refused to send customer data to a personal email. However, you didn\'t offer an alternative way for Jake to access the data he needs, which might lead him to find a less secure workaround on his own.',
            realWorldContext:
              'When security policies block someone\'s workflow without offering alternatives, people often find shadow IT workarounds that are even riskier. The best security advice pairs a "no" with a compliant "but here\'s what you can do instead."',
          },
        },
        {
          id: 'thursday-2-poor',
          text: 'Send the customer list to Jake\'s Gmail but remove the most sensitive fields like phone numbers, keeping only names and company associations.',
          quality: 'poor',
          securityScoreChange: -5,
          trustChange: -3,
          feedback: {
            title: 'Partial Data is Still a Breach',
            explanation:
              'Even with sensitive fields removed, sending any customer data to an unmanaged personal email account violates data handling policies. Customer names and company associations are still personally identifiable information under most regulations.',
            realWorldContext:
              'Regulators do not accept "we only sent some of the data" as a defense. Under GDPR, even a customer\'s name combined with their company is considered personal data. Partial data exports to unauthorized systems are still reportable breaches.',
          },
        },
        {
          id: 'thursday-2-dangerous',
          text: 'Forward the full customer contact list to Jake\'s personal Gmail -- he\'s a trusted coworker and said he\'d delete it. Speed matters more than process.',
          quality: 'dangerous',
          securityScoreChange: -10,
          trustChange: -8,
          feedback: {
            title: 'Serious Data Policy Violation',
            explanation:
              'Sending a full customer contact list to an unmanaged personal email is a clear data breach. Trust in a coworker does not override data protection requirements, and verbal promises to delete data are unenforceable.',
            realWorldContext:
              'In 2022, a Morgan Stanley employee sent client data to personal accounts, resulting in a $35 million SEC fine. "I trust this person" is never an acceptable justification for bypassing data controls. Personal email accounts lack encryption, DLP, and audit logging that corporate systems provide.',
          },
        },
      ],
    },

    // Step 3: Sharing passwords in chat
    {
      id: 'thursday-step-3',
      narrative:
        'After lunch, you notice a message thread in the team channel where a new hire is struggling to access a shared analytics dashboard. Another coworker is about to share login credentials directly in the Slack channel.',
      simulationContent: {
        type: 'chat',
        messages: [
          {
            sender: 'Priya Sharma',
            message:
              'I still can\'t log into the analytics dashboard. IT provisioned my account but the password they gave me says invalid. Can someone help? My manager is out today.',
            timestamp: '1:32 PM',
            avatar: 'PS',
          },
          {
            sender: 'Kevin O\'Brien',
            message:
              'Oh I have the shared team login for that. Let me just post the creds here so you can get in.',
            timestamp: '1:34 PM',
            avatar: 'KO',
          },
          {
            sender: 'Kevin O\'Brien',
            message: 'Username: analytics_team  Password: Dashb0ard',
            timestamp: '1:34 PM',
            avatar: 'KO',
          },
          {
            sender: 'Priya Sharma',
            message: 'Thanks Kevin! Let me try that.',
            timestamp: '1:35 PM',
            avatar: 'PS',
          },
        ],
      },
      choices: [
        {
          id: 'thursday-3-optimal',
          text: 'Immediately flag that credentials should never be posted in a chat channel. Ask Kevin to change the shared password right away, and direct Priya to IT to get her individual account fixed or to use the company\'s password manager for shared credentials.',
          quality: 'optimal',
          securityScoreChange: 5,
          trustChange: 5,
          requiresTrustLevel: 35,
          feedback: {
            title: 'Strong Security Intervention',
            explanation:
              'You addressed all three issues: stopped credentials from sitting in a public channel, initiated a password change to mitigate the exposure, and redirected to proper channels (IT and password manager). This is textbook incident response for credential exposure.',
            realWorldContext:
              'Slack messages are searchable, backed up, and potentially accessible to anyone in the workspace. In 2023, EA Games was breached after attackers found credentials posted in an internal Slack channel. Shared passwords in chat are one of the most common -- and most preventable -- security failures in organizations.',
          },
        },
        {
          id: 'thursday-3-acceptable',
          text: 'Tell Kevin he shouldn\'t post passwords in the chat and ask him to delete the message. Suggest Priya contact IT for help with her account.',
          quality: 'acceptable',
          securityScoreChange: 2,
          trustChange: 2,
          feedback: {
            title: 'Good Instincts, Incomplete Follow-Through',
            explanation:
              'You correctly identified the problem and asked for the message to be deleted. However, deleting a Slack message doesn\'t remove it from server logs or backups, and you didn\'t address the need to change the now-compromised password.',
            realWorldContext:
              'Deleting a message in Slack or Teams gives a false sense of security. Enterprise chat platforms retain message history in compliance archives, and the credentials may already have been cached by search indexers or seen by other users. The password must be changed immediately after any exposure.',
          },
        },
        {
          id: 'thursday-3-poor',
          text: 'Send Priya a direct message with the credentials instead, since at least a DM is more private than the team channel.',
          quality: 'poor',
          securityScoreChange: -5,
          trustChange: -3,
          feedback: {
            title: 'Still Insecure',
            explanation:
              'While DMs are slightly less visible than a channel post, sharing plain-text passwords via any chat platform is a policy violation. DMs are still stored in server logs, subject to admin review, and vulnerable to account compromise.',
            realWorldContext:
              'Direct messages in enterprise chat tools are not truly private. Workspace admins can export DM history, and if either account is compromised, the credentials are exposed. The only acceptable way to share credentials is through an approved password manager with proper access controls and audit logging.',
          },
        },
        {
          id: 'thursday-3-dangerous',
          text: 'Ignore it -- Kevin is just trying to help the new hire, and it\'s a shared team account anyway so the credentials aren\'t that sensitive.',
          quality: 'dangerous',
          securityScoreChange: -10,
          trustChange: -8,
          nextBranch: 'credential-leak',
          feedback: {
            title: 'Negligent Inaction',
            explanation:
              'Ignoring exposed credentials normalizes terrible security practices. "Shared team account" passwords are especially dangerous because there\'s no individual accountability, and if compromised, they give attackers broad access that\'s hard to trace.',
            realWorldContext:
              'Shared credentials are a top finding in security audits and a favorite target for attackers. The 2020 Twitter breach involved attackers using shared internal tool credentials. When everyone shares one password and it appears in a chat log, the blast radius of a breach multiplies dramatically.',
          },
        },
      ],
    },

    // Step 4: Request to upload sensitive files to unauthorized cloud service
    {
      id: 'thursday-step-4',
      narrative:
        'Near the end of the day, a project manager posts urgently in the channel. The approved company file-sharing platform is down for maintenance, and she wants to upload sensitive project files containing client financial data to a free cloud storage service so the remote team can access them for a morning deadline.',
      simulationContent: {
        type: 'chat',
        messages: [
          {
            sender: 'Rachel Kim',
            message:
              'URGENT: SharePoint is down for maintenance until 8 AM tomorrow. The Singapore team needs the Meridian Financial project files for their morning standup. These include the client budget models and revenue forecasts.',
            timestamp: '4:45 PM',
            avatar: 'RK',
          },
          {
            sender: 'Rachel Kim',
            message:
              'I\'m going to upload them to WeTransfer so the Singapore team can download them tonight. Anyone have a better free option?',
            timestamp: '4:47 PM',
            avatar: 'RK',
          },
          {
            sender: 'Tom Nguyen',
            message:
              'Google Drive works too. I can share my personal Drive link if needed.',
            timestamp: '4:49 PM',
            avatar: 'TN',
          },
          {
            sender: 'Rachel Kim',
            message:
              'Perfect, either works. The deadline is non-negotiable -- the client presentation is tomorrow at 9 AM Singapore time.',
            timestamp: '4:50 PM',
            avatar: 'RK',
          },
        ],
      },
      choices: [
        {
          id: 'thursday-4-optimal',
          text: 'Explain that client financial data cannot go on unauthorized platforms regardless of the deadline. Suggest approved alternatives: contact IT for emergency access to a backup file share, use the company VPN to transfer files directly, or encrypt the files and send via corporate email with a password shared through a separate channel.',
          quality: 'optimal',
          securityScoreChange: 5,
          trustChange: 5,
          requiresTrustLevel: 30,
          feedback: {
            title: 'Outstanding Judgment Under Pressure',
            explanation:
              'You held firm on data security even with time pressure and offered multiple viable alternatives. Client financial data on unauthorized free cloud services could violate contractual obligations, regulatory requirements, and your company\'s data handling policies simultaneously.',
            realWorldContext:
              'Free cloud services like WeTransfer and personal Google Drive accounts lack enterprise security controls, data residency guarantees, and compliance certifications. In 2021, Volkswagen\'s vendor left 3.3 million customers\' financial data exposed on an unsecured cloud storage service. The urgency of a deadline never justifies bypassing data security controls for client financial information.',
          },
        },
        {
          id: 'thursday-4-acceptable',
          text: 'Tell Rachel that WeTransfer and personal Google Drive aren\'t approved and suggest she contacts IT to see if there\'s an emergency procedure for accessing files during SharePoint maintenance.',
          quality: 'acceptable',
          securityScoreChange: 2,
          trustChange: 2,
          feedback: {
            title: 'Correct Call, but Slow Solution',
            explanation:
              'You correctly blocked the use of unauthorized services. However, with IT likely closing for the day and a hard deadline, just suggesting "call IT" without backup options could leave Rachel feeling stuck and tempted to use unauthorized services anyway.',
            realWorldContext:
              'Security professionals call this the "last mile" problem: you successfully block an insecure action but don\'t provide a timely alternative, so the person finds an even worse workaround. Having knowledge of approved emergency procedures for data sharing is a valuable security skill.',
          },
        },
        {
          id: 'thursday-4-poor',
          text: 'Suggest Rachel password-protect the files before uploading them to WeTransfer, since at least that adds a layer of security.',
          quality: 'poor',
          securityScoreChange: -5,
          trustChange: -3,
          feedback: {
            title: 'Inadequate Protection',
            explanation:
              'Password-protecting files before uploading to an unauthorized platform does not make it compliant. The data still resides on servers you don\'t control, the password can be brute-forced, and you\'ve created an unauditable copy of client financial data outside your organization\'s boundaries.',
            realWorldContext:
              'Password-protected ZIP files and Office documents use encryption that can often be cracked with readily available tools. More importantly, uploading client financial data to any unauthorized third-party service likely violates your contract with the client, regardless of whether the files are password-protected.',
          },
        },
        {
          id: 'thursday-4-dangerous',
          text: 'Help Rachel upload the client financial files to Tom\'s personal Google Drive. The deadline is what matters most, and you can always delete the files later.',
          quality: 'dangerous',
          securityScoreChange: -10,
          trustChange: -8,
          feedback: {
            title: 'Critical Compliance Violation',
            explanation:
              'Uploading client financial data to a personal Google Drive account is a severe data handling violation. You\'ve placed regulated financial information on an unmanaged personal account with no audit trail, no data loss prevention, and no way to guarantee deletion.',
            realWorldContext:
              'Client financial data (budget models, revenue forecasts) is often subject to SOC 2, contractual NDA, and financial regulation requirements that mandate specific storage and access controls. A personal Google Drive meets none of these. Companies have lost major clients and faced lawsuits for exactly this kind of unauthorized data transfer. The "delete it later" promise is meaningless when cloud providers retain backups.',
          },
        },
      ],
    },
  ],

  branches: {
    'careless-sharing': {
      steps: [
        {
          id: 'careless-sharing-step-1',
          narrative:
            'Your advice to skip data classification has consequences. Dana sent the full unredacted report to the partner agency. An hour later, your compliance officer pings the channel -- the partner accidentally forwarded the report to a wider distribution list that included a competitor. The internal benchmarks are now exposed. Your manager asks the team how this happened.',
          simulationContent: {
            type: 'chat',
            messages: [
              {
                sender: 'Compliance Bot',
                message:
                  'ALERT: Unauthorized external disclosure detected. Document "Q3 Customer Satisfaction Report" containing CONFIDENTIAL internal benchmarks was forwarded to an external distribution list by partner agency contact. Incident #THR-2847 opened.',
                timestamp: '11:30 AM',
                avatar: 'CB',
              },
              {
                sender: 'Sarah Chen (Manager)',
                message:
                  'Team, I need to understand how a Confidential document was sent to a partner without classification review. Who approved this? We need to do an incident retrospective immediately.',
                timestamp: '11:45 AM',
                avatar: 'SC',
              },
              {
                sender: 'Dana Reeves',
                message:
                  'I was told not to worry about classification and to just send it... I\'m so sorry, I should have checked with compliance first.',
                timestamp: '11:48 AM',
                avatar: 'DR',
              },
            ],
          },
          choices: [
            {
              id: 'careless-branch-optimal',
              text: 'Take responsibility for giving Dana bad advice, cooperate fully with the incident investigation, and propose implementing a mandatory classification check for all external document sharing.',
              quality: 'optimal',
              securityScoreChange: 5,
              trustChange: 5,
              feedback: {
                title: 'Accountable Recovery',
                explanation:
                  'Taking responsibility and proposing process improvements shows integrity and helps prevent future incidents. Owning mistakes in security is far better than hiding them.',
                realWorldContext:
                  'Organizations with strong security cultures encourage employees to own mistakes without fear of retaliation. Post-incident improvements driven by people who experienced the failure firsthand are often the most effective. Accountability accelerates recovery and rebuilds trust.',
              },
            },
            {
              id: 'careless-branch-acceptable',
              text: 'Acknowledge the situation and participate in the retrospective, sharing what happened without placing blame.',
              quality: 'acceptable',
              securityScoreChange: 2,
              trustChange: 2,
              feedback: {
                title: 'Cooperative but Evasive',
                explanation:
                  'Participating in the retrospective is the minimum expectation. Without explicitly acknowledging your role in advising Dana, the root cause may not be fully addressed.',
                realWorldContext:
                  'Incident retrospectives only work when all involved parties are transparent. Omitting your role means the investigation might reach wrong conclusions and implement ineffective controls.',
              },
            },
            {
              id: 'careless-branch-poor',
              text: 'Stay silent and hope nobody traces the advice back to you. Dana should have known better anyway.',
              quality: 'poor',
              securityScoreChange: -5,
              trustChange: -3,
              feedback: {
                title: 'Evasion Makes It Worse',
                explanation:
                  'Avoiding accountability in a security incident investigation is both dishonest and counterproductive. Chat logs are discoverable, and your advice to Dana will likely surface during the review.',
                realWorldContext:
                  'Attempting to hide involvement in security incidents often results in more severe consequences when the truth emerges. Digital communications leave permanent trails. Transparency during incident response is both an ethical obligation and a practical necessity.',
              },
            },
            {
              id: 'careless-branch-dangerous',
              text: 'Delete your earlier chat messages advising Dana to skip classification, then claim you don\'t remember the conversation.',
              quality: 'dangerous',
              securityScoreChange: -10,
              trustChange: -8,
              feedback: {
                title: 'Evidence Tampering',
                explanation:
                  'Deleting messages during an active incident investigation is evidence tampering, which could escalate a process failure into a terminable offense or even legal liability. Enterprise chat platforms retain server-side records regardless of client-side deletion.',
                realWorldContext:
                  'Attempting to destroy evidence during a corporate investigation can turn a correctable mistake into grounds for termination and legal action. Slack and Teams retain complete message logs on enterprise plans, including "deleted" messages. Forensic investigators routinely recover these records.',
              },
            },
          ],
        },
      ],
    },

    'credential-leak': {
      steps: [
        {
          id: 'credential-leak-step-1',
          narrative:
            'Two hours after Kevin posted the analytics dashboard credentials in the team channel, the security operations center (SOC) detects unusual activity on the analytics platform. Someone outside the organization appears to be accessing the dashboard using the shared credentials. A former contractor who still had access to the Slack workspace apparently saw the posted password. The SOC team posts an urgent alert.',
          simulationContent: {
            type: 'chat',
            messages: [
              {
                sender: 'SOC Alert',
                message:
                  'SECURITY INCIDENT: Unauthorized access detected on Analytics Dashboard. Login from unrecognized IP (external) using team shared credentials. Access occurred at 3:47 PM. Credential source: team Slack channel post at 1:34 PM today. All team members: DO NOT use the analytics platform until further notice.',
                timestamp: '3:52 PM',
                avatar: 'SA',
              },
              {
                sender: 'Kevin O\'Brien',
                message:
                  'Oh no... I posted those credentials in the channel earlier. I didn\'t think anyone outside the team could see it. What do I do?',
                timestamp: '3:55 PM',
                avatar: 'KO',
              },
              {
                sender: 'Priya Sharma',
                message: 'I\'m so sorry, I shouldn\'t have asked in the channel. Is the client data on that dashboard at risk?',
                timestamp: '3:57 PM',
                avatar: 'PS',
              },
            ],
          },
          choices: [
            {
              id: 'credential-leak-optimal',
              text: 'Take immediate action: tell Kevin to change the shared password RIGHT NOW, advise the team to report the incident through the official security incident process, and recommend an audit of who has accessed the dashboard since the credentials were posted.',
              quality: 'optimal',
              securityScoreChange: 5,
              trustChange: 5,
              feedback: {
                title: 'Effective Incident Response',
                explanation:
                  'You prioritized the most critical action (password change), invoked the formal incident process, and suggested an access audit. This is exactly the right sequence: contain, report, investigate.',
                realWorldContext:
                  'The "contain, report, investigate" framework is standard incident response. Every minute credentials remain active after a known compromise increases the damage. Quick credential rotation followed by a formal report and access log review is how security professionals handle these situations.',
              },
            },
            {
              id: 'credential-leak-acceptable',
              text: 'Tell Kevin to change the password immediately and suggest the team report the incident to the security team.',
              quality: 'acceptable',
              securityScoreChange: 2,
              trustChange: 2,
              feedback: {
                title: 'Good Prioritization',
                explanation:
                  'Password change and incident reporting are the two most critical actions. However, without recommending an access audit, the team won\'t know the full extent of what the unauthorized user accessed or downloaded.',
                realWorldContext:
                  'Access logs are crucial for determining the blast radius of a credential compromise. Without reviewing who accessed the system and what data they viewed or exported, your incident response is incomplete and your notification obligations under regulations like GDPR may not be properly triggered.',
              },
            },
            {
              id: 'credential-leak-poor',
              text: 'Tell Kevin to just delete the message with the credentials and hope the unauthorized access was just a one-time thing.',
              quality: 'poor',
              securityScoreChange: -5,
              trustChange: -3,
              feedback: {
                title: 'Dangerously Insufficient Response',
                explanation:
                  'Deleting the message does nothing to stop the attacker who already has the credentials. Without changing the password, the unauthorized access continues. And hoping the problem goes away is not an incident response strategy.',
                realWorldContext:
                  'Once credentials are compromised, the only effective containment is immediate rotation. Message deletion is cosmetic -- the attacker already has what they need. Failing to report and respond to a known security incident can result in regulatory penalties and personal liability for those who were aware.',
              },
            },
            {
              id: 'credential-leak-dangerous',
              text: 'Tell the team to keep quiet about the incident to avoid getting Kevin in trouble. The SOC probably has it handled and reporting it again might make the team look bad.',
              quality: 'dangerous',
              securityScoreChange: -10,
              trustChange: -8,
              feedback: {
                title: 'Obstruction of Incident Response',
                explanation:
                  'Suppressing information during an active security incident is obstruction. The SOC needs full cooperation from the team to understand the scope of the breach. Protecting a coworker\'s reputation at the expense of security response puts the entire organization at risk.',
                realWorldContext:
                  'Covering up security incidents is grounds for termination in virtually every organization and may constitute a legal violation under regulations that require breach notification. Teams that suppress incident information consistently experience worse outcomes, larger breaches, and harsher regulatory penalties when the full truth emerges.',
              },
            },
          ],
        },
      ],
    },
  },
};
