import type { Scenario } from './types.ts';

export const mondayScenario: Scenario = {
  id: 'monday',
  title: 'Phishing Detection',
  dayLabel: 'Monday',
  bloomsLevel: 'Knowledge',
  simulationType: 'email',
  learningObjective:
    'Identify common phishing email techniques including spoofed sender addresses, urgency-based social engineering, suspicious links, and malicious attachments.',
  intro:
    'Welcome to your first day as the new Security Analyst at NovaTech Industries. Your manager, Sarah Chen, has asked you to review the department inbox — there have been reports of phishing attempts targeting employees across the company. Your job is to triage each email and decide on the appropriate response. Stay sharp: not every email is what it seems.',

  steps: [
    // -------------------------------------------------------
    // Step 1 — Fake Password Reset from "IT Support"
    // -------------------------------------------------------
    {
      id: 'monday_step_1',
      narrative:
        'You open the first email in the queue. It claims to be from NovaTech IT Support and asks you to reset your password immediately. Something about it feels off.',
      simulationContent: {
        type: 'email',
        emails: [
          {
            from: 'it-support@n0vatech-security.com',
            to: 'you@novatech.com',
            subject: 'URGENT: Your Password Expires in 2 Hours — Immediate Action Required',
            body: `Dear Employee,

Our system records indicate that your NovaTech network password will expire within the next 2 hours. To avoid being locked out of all company systems, you must reset your password immediately by clicking the secure link below.

Reset Your Password Now: https://n0vatech-security.com/password-reset?uid=38271

If you do not reset your password before the deadline, your account will be suspended and you will need to contact your department manager to regain access, which may take up to 48 hours.

Thank you for your prompt attention to this matter.

Best regards,
NovaTech IT Support Team
helpdesk@n0vatech-security.com
© 2026 NovaTech Industries — Confidential`,
            timestamp: '2026-02-16T08:12:00Z',
            isPhishing: true,
          },
        ],
      },
      choices: [
        {
          id: 'monday_1_optimal',
          text: 'Report the email as phishing via the company reporting tool and notify the IT Security team directly. Do not click any links.',
          quality: 'optimal',
          securityScoreChange: 5,
          trustChange: 5,
          feedback: {
            title: 'Excellent — Textbook Phishing Response',
            explanation:
              'You correctly identified multiple red flags: the sender domain "n0vatech-security.com" uses a zero instead of the letter "o" and is not the legitimate novatech.com domain. The email manufactured extreme urgency ("2 hours") to pressure you into acting without thinking. Reporting it ensures the security team can block the domain and warn other employees.',
            realWorldContext:
              'According to the 2025 Verizon Data Breach Investigations Report, credential phishing remains the #1 initial attack vector in data breaches. Employees who report phishing emails reduce organizational risk by an average of 60%, because security teams can quarantine the message company-wide before others fall victim.',
          },
          achievementTrigger: 'eagle_eye',
        },
        {
          id: 'monday_1_acceptable',
          text: 'Delete the email without clicking anything and move on to the next message.',
          quality: 'acceptable',
          securityScoreChange: 2,
          trustChange: 2,
          feedback: {
            title: 'Safe but Incomplete',
            explanation:
              'You protected yourself by not clicking the link, which is good. However, simply deleting the email means other employees may still receive and fall for the same phishing attempt. Reporting the email to IT Security is always the better choice so the threat can be neutralized company-wide.',
            realWorldContext:
              'Phishing campaigns typically target hundreds or thousands of employees simultaneously. When one person deletes the email silently, the campaign continues unimpeded. Organizations with strong reporting cultures catch phishing campaigns an average of 4 hours faster than those without.',
          },
        },
        {
          id: 'monday_1_poor',
          text: 'Hover over the link to check it, then forward the email to a coworker to ask if they received the same message.',
          quality: 'poor',
          securityScoreChange: -5,
          trustChange: -3,
          feedback: {
            title: 'Risky Investigation Method',
            explanation:
              'While hovering over links can reveal their true destination, forwarding a phishing email to coworkers spreads the threat. Your coworker might not recognize it as phishing and click the link. If you suspect an email is phishing, use official reporting channels rather than redistributing the message.',
            realWorldContext:
              'Forwarded phishing emails are particularly dangerous because they now come from a trusted internal sender. Studies show that employees are 3x more likely to click a malicious link if the email was forwarded by a colleague, since the internal sender lends it credibility.',
          },
          nextBranch: 'forwarded_phish',
        },
        {
          id: 'monday_1_dangerous',
          text: 'Click the password reset link — it is better to be safe and reset the password now rather than risk being locked out.',
          quality: 'dangerous',
          securityScoreChange: -10,
          trustChange: -8,
          feedback: {
            title: 'Credentials Compromised',
            explanation:
              'You clicked a malicious link and likely entered your credentials on a fake login page controlled by the attacker. The domain "n0vatech-security.com" is not NovaTech\'s real domain — the "o" was replaced with a zero. The urgency was manufactured to override your critical thinking. An attacker now has your username and password.',
            realWorldContext:
              'Credential harvesting pages are often pixel-perfect replicas of legitimate login portals. In 2024, the average time from credential theft to account takeover was under 12 minutes. Once an attacker has valid credentials, they can access internal systems, exfiltrate data, or launch further attacks from inside the network.',
          },
          nextBranch: 'compromised_credentials',
        },
      ],
    },

    // -------------------------------------------------------
    // Step 2 — Fake CEO Wire Transfer Request
    // -------------------------------------------------------
    {
      id: 'monday_step_2',
      narrative:
        'The next email appears to be from NovaTech\'s CEO, David Park. It requests an urgent wire transfer. The email was flagged by the mail gateway as "External" even though it looks like an internal address.',
      simulationContent: {
        type: 'email',
        emails: [
          {
            from: 'david.park@novatech-corp.co',
            to: 'you@novatech.com',
            subject: 'Confidential — Urgent Wire Transfer Needed Today',
            body: `Hi,

I need you to process a wire transfer of $47,500 to the account details below before end of business today. This is for a confidential acquisition deal and I need this handled discreetly — please do not discuss this with anyone else on the team until the deal closes.

Beneficiary: Meridian Consulting Group LLC
Bank: First National Bank
Account: 2891-4477-6130
Routing: 071923845

I'm in back-to-back meetings all day so email is the best way to reach me. Please confirm once the transfer is complete.

Thanks,
David Park
CEO, NovaTech Industries
Sent from my iPhone`,
            timestamp: '2026-02-16T09:34:00Z',
            isPhishing: true,
          },
        ],
      },
      choices: [
        {
          id: 'monday_2_optimal',
          text: 'Recognize this as a Business Email Compromise (BEC) attempt. Report it to IT Security and verify with David Park through an internal channel such as Slack or a phone call to his known number.',
          quality: 'optimal',
          securityScoreChange: 5,
          trustChange: 5,
          feedback: {
            title: 'Perfect Identification of a BEC Attack',
            explanation:
              'You spotted the classic signs of a Business Email Compromise: the sender domain is "novatech-corp.co" instead of the legitimate "novatech.com," the request demands secrecy ("do not discuss this with anyone"), manufactures urgency ("before end of business today"), and invokes authority (the CEO). Verifying through a separate, trusted channel is the gold standard response.',
            realWorldContext:
              'The FBI reported that Business Email Compromise scams caused over $2.9 billion in losses in 2023 alone. BEC attacks specifically exploit authority and urgency. The "Sent from my iPhone" footer is a common trick to excuse the brevity and unusual tone of the message. Always verify large financial requests through a separate communication channel.',
          },
        },
        {
          id: 'monday_2_acceptable',
          text: 'Reply to the email asking David to confirm the request, mentioning that the email was flagged as external.',
          quality: 'acceptable',
          securityScoreChange: 2,
          trustChange: 2,
          feedback: {
            title: 'Good Instinct, Wrong Channel',
            explanation:
              'You correctly questioned the request, which shows good security awareness. However, replying directly to the phishing email means you are communicating with the attacker, not the real CEO. The attacker can simply confirm the request, making it seem legitimate. Always verify through a completely separate channel (phone call, Slack, in-person).',
            realWorldContext:
              'Attackers running BEC scams monitor the compromised or spoofed email accounts closely. If you reply to the fraudulent email, the attacker will respond convincingly, often within minutes. Out-of-band verification — using a different communication method entirely — is the only reliable way to confirm legitimacy.',
          },
        },
        {
          id: 'monday_2_poor',
          text: 'Ignore the email. It is probably spam and not worth your time.',
          quality: 'poor',
          securityScoreChange: -5,
          trustChange: -3,
          feedback: {
            title: 'Threat Left Unaddressed',
            explanation:
              'While you avoided falling for the scam, ignoring a BEC attempt without reporting it is a missed opportunity. This same email may have been sent to others in the finance department who could process the transfer. Reporting ensures the security team can investigate and protect the entire organization.',
            realWorldContext:
              'BEC attackers frequently target multiple people in financial roles simultaneously. If one person ignores the email, the attacker still has other potential victims. In a real-world case at Ubiquiti Networks, a BEC attack succeeded because the targeted employee did not escalate or report the suspicious request, resulting in a $46.7 million loss.',
          },
        },
        {
          id: 'monday_2_dangerous',
          text: 'Process the wire transfer immediately — the CEO said it is urgent and confidential, and you do not want to get on his bad side.',
          quality: 'dangerous',
          securityScoreChange: -10,
          trustChange: -8,
          feedback: {
            title: 'Wire Fraud — Funds Lost',
            explanation:
              'You just wired $47,500 to a criminal\'s bank account. The email was not from the real CEO — the domain was "novatech-corp.co" instead of "novatech.com." The attacker used authority ("CEO"), urgency ("today"), and secrecy ("do not discuss") to manipulate you. Once a wire transfer is sent, recovery is extremely difficult.',
            realWorldContext:
              'Wire transfers are nearly irreversible, which is why BEC attackers favor them. The average BEC wire fraud loss for small and mid-size companies is $130,000. In many cases, employees who process these transfers are acting in good faith under pressure from what they believe is executive authority, which is exactly why verification procedures exist.',
          },
        },
      ],
    },

    // -------------------------------------------------------
    // Step 3 — Suspicious Attachment from "HR"
    // -------------------------------------------------------
    {
      id: 'monday_step_3',
      narrative:
        'A third email has arrived, this time from what appears to be the HR department. It contains an attachment described as an updated benefits enrollment form. The email asks you to enable macros when opening the document.',
      simulationContent: {
        type: 'email',
        emails: [
          {
            from: 'hr-benefits@novatech.com.malware-host.net',
            to: 'all-employees@novatech.com',
            subject: 'Action Required: 2026 Benefits Enrollment — Updated Form Attached',
            body: `Dear NovaTech Team,

As part of our annual benefits enrollment period, we have updated the enrollment form to reflect new plan options and provider changes for 2026.

Please download and complete the attached form at your earliest convenience. When you open the document, you may see a security warning — please click "Enable Content" or "Enable Macros" to ensure the form functions correctly.

Return the completed form to hr-benefits@novatech.com by Friday, February 20th.

If you have any questions, please contact the HR Benefits team at ext. 4400.

Thank you,
NovaTech Human Resources
Benefits Administration Team`,
            timestamp: '2026-02-16T10:51:00Z',
            attachments: ['2026_Benefits_Enrollment_Form_v3.xlsm'],
            isPhishing: true,
          },
        ],
      },
      choices: [
        {
          id: 'monday_3_optimal',
          text: 'Do not open the attachment. Report the email to IT Security, noting the suspicious sender domain and the request to enable macros.',
          quality: 'optimal',
          securityScoreChange: 5,
          trustChange: 5,
          feedback: {
            title: 'Malware Delivery Blocked',
            explanation:
              'You identified two critical red flags: the sender address is "hr-benefits@novatech.com.malware-host.net" — the actual domain is "malware-host.net," not "novatech.com" (the legitimate address is merely a subdomain prefix designed to deceive). Additionally, the request to "Enable Macros" is a hallmark of macro-based malware delivery. The .xlsm file extension indicates a macro-enabled Excel file, which is a common malware vector.',
            realWorldContext:
              'Macro-enabled Office documents remain one of the most common malware delivery methods. The Emotet banking trojan, one of the most destructive malware families in history, spread primarily through macro-enabled email attachments. Microsoft began blocking macros by default in 2022, but attackers still rely on social engineering to convince users to manually enable them.',
          },
        },
        {
          id: 'monday_3_acceptable',
          text: 'Do not open the attachment. Contact the HR department directly at their known extension (4400) to verify whether this email is legitimate.',
          quality: 'acceptable',
          securityScoreChange: 2,
          trustChange: 2,
          feedback: {
            title: 'Safe Verification Approach',
            explanation:
              'You protected yourself by not opening the attachment and attempting to verify through a known channel. This is a sound approach. The ideal next step would also include reporting the email to IT Security so they can investigate the malicious domain and prevent other employees from falling victim.',
            realWorldContext:
              'Verifying unexpected attachments through a separate channel is an excellent habit. In organizations with strong security cultures, employees are encouraged to "trust but verify" — assume the best intent, but always confirm through independent means before taking action on emails that request you to open files or enable features.',
          },
        },
        {
          id: 'monday_3_poor',
          text: 'Open the attachment in a sandboxed environment or virtual machine to investigate what the macros do.',
          quality: 'poor',
          securityScoreChange: -5,
          trustChange: -3,
          feedback: {
            title: 'Unnecessary Risk — Leave It to the Experts',
            explanation:
              'While using a sandbox shows technical sophistication, analyzing potentially malicious files should be left to trained malware analysts with proper tools. As a security analyst triaging email, your role is to identify and report — not to manually detonate suspected malware. Sandboxes can be escaped by advanced malware, and improper analysis can lead to accidental infection.',
            realWorldContext:
              'Modern malware often includes sandbox-detection capabilities and may behave differently (or not at all) in virtualized environments. Professional malware analysis requires isolated forensic workstations, network monitoring, and proper chain-of-custody procedures. Attempting ad-hoc analysis on a work machine — even in a VM — introduces unnecessary risk.',
          },
        },
        {
          id: 'monday_3_dangerous',
          text: 'Open the attachment and enable macros — the form needs to work properly, and the email came from HR.',
          quality: 'dangerous',
          securityScoreChange: -10,
          trustChange: -8,
          feedback: {
            title: 'Malware Executed — System Compromised',
            explanation:
              'You opened a macro-enabled malware payload. The sender domain was actually "malware-host.net" — the "novatech.com" portion was just a subdomain prefix designed to fool you at a glance. Enabling macros allowed the embedded malicious code to execute, potentially installing a remote access trojan, ransomware, or credential stealer on your system.',
            realWorldContext:
              'The 2024 ransomware attack on Change Healthcare began with a single employee opening a malicious attachment, ultimately disrupting healthcare claims processing across the United States for weeks and costing over $1.6 billion. A single click on a malicious macro can give attackers full control of a workstation and a foothold into the entire corporate network.',
          },
        },
      ],
    },

    // -------------------------------------------------------
    // Step 4 — Urgent IT Request with Fake MFA Reset
    // -------------------------------------------------------
    {
      id: 'monday_step_4',
      narrative:
        'One final email sits in your queue. It appears to be from the NovaTech IT Security team, requesting you to re-verify your multi-factor authentication setup due to a "system migration." The email includes a QR code and a link.',
      simulationContent: {
        type: 'email',
        emails: [
          {
            from: 'security-team@novatechh.com',
            to: 'you@novatech.com',
            subject: 'IT Security Notice: MFA Re-Verification Required by EOD',
            body: `NOVATECH IT SECURITY — MANDATORY ACTION

Dear Employee,

As part of our ongoing infrastructure migration to NovaTech Cloud Platform v4.2, all employees are required to re-verify their Multi-Factor Authentication (MFA) devices before end of day today (February 16, 2026).

To re-verify your MFA, please:
1. Click the link below to access the MFA verification portal
2. Sign in with your NovaTech credentials
3. Scan the QR code with your authenticator app to re-link your device

MFA Verification Portal: https://novatechh.com/mfa-reverify?emp=7291

IMPORTANT: Failure to complete MFA re-verification by 5:00 PM EST will result in your account being temporarily disabled for security purposes. You will need to visit IT Support in person with a government-issued photo ID to restore access.

If you experience any issues, contact IT Security at security-team@novatechh.com.

Regards,
NovaTech IT Security Operations
Building 3, Floor 2 — Room 3201`,
            timestamp: '2026-02-16T14:22:00Z',
            isPhishing: true,
          },
        ],
      },
      choices: [
        {
          id: 'monday_4_optimal',
          text: 'Identify this as a phishing attempt — the domain "novatechh.com" has a double "h." Report it to IT Security through the official reporting tool and document all four phishing emails in your triage report.',
          quality: 'optimal',
          securityScoreChange: 5,
          trustChange: 5,
          feedback: {
            title: 'Flawless Phishing Detection',
            explanation:
              'You caught the typosquatted domain "novatechh.com" (double "h") and recognized the manufactured urgency pattern again. Legitimate IT departments do not ask employees to re-scan MFA QR codes via email links — MFA enrollment changes are handled through official IT portals or in-person processes. By documenting all four phishing emails, you provided the security team with a comprehensive picture of the day\'s threats.',
            realWorldContext:
              'MFA fatigue and MFA reset phishing have surged since 2023. In the 2022 Uber breach, an attacker used MFA-related social engineering to gain access to internal systems. Typosquatting — registering domains that differ by one character — is a common technique. The domain "novatechh.com" costs an attacker roughly $12 to register and can fool even experienced users who skim sender addresses.',
          },
          // perfect_day is evaluated computationally at end of day, not triggered per-choice
        },
        {
          id: 'monday_4_acceptable',
          text: 'Recognize the suspicious urgency and avoid clicking the link. Navigate directly to the official NovaTech IT portal to check for any real MFA-related announcements.',
          quality: 'acceptable',
          securityScoreChange: 2,
          trustChange: 2,
          feedback: {
            title: 'Good Defensive Instinct',
            explanation:
              'You avoided the phishing link and independently verified through the official IT portal, which is a solid approach. The extra step of reporting the phishing email would ensure the security team is aware of the ongoing campaign targeting MFA credentials, allowing them to alert the entire company and block the malicious domain.',
            realWorldContext:
              'Navigating directly to known-good URLs rather than clicking email links is a cornerstone of phishing defense. Security professionals call this "breaking the kill chain" — by refusing to follow the attacker\'s intended path, you neutralize the threat to yourself even if you don\'t yet report it for others.',
          },
        },
        {
          id: 'monday_4_poor',
          text: 'Reply to the email asking if this is legitimate, since you are not sure whether the IT department would send MFA requests by email.',
          quality: 'poor',
          securityScoreChange: -5,
          trustChange: -3,
          feedback: {
            title: 'Engaging the Attacker',
            explanation:
              'By replying to the phishing email, you confirmed to the attacker that your email address is active and monitored — making you a higher-value target for future attacks. The attacker could reply posing as IT Security and escalate their social engineering. Always verify through independent, trusted channels, never by replying to a suspicious email.',
            realWorldContext:
              'Threat actors maintain "sucker lists" of email addresses that have responded to phishing or scam emails. These lists are sold on dark web marketplaces for premium prices because engaged recipients are far more likely to fall for future attacks. A single reply can increase the volume of targeted phishing you receive by 10x.',
          },
        },
        {
          id: 'monday_4_dangerous',
          text: 'Click the link, sign in with your credentials, and scan the QR code — you do not want your account disabled and having to go through in-person verification sounds like a hassle.',
          quality: 'dangerous',
          securityScoreChange: -10,
          trustChange: -8,
          feedback: {
            title: 'MFA Bypass — Full Account Takeover',
            explanation:
              'You handed the attacker both your credentials and your MFA token. The domain "novatechh.com" (double "h") was a typosquatted fake. By scanning the attacker\'s QR code, you linked your authenticator app to the attacker\'s system, giving them the ability to generate valid MFA codes for your account. This is a complete account takeover — the attacker now bypasses all authentication protections.',
            realWorldContext:
              'Adversary-in-the-middle (AiTM) phishing kits like EvilProxy and Evilginx2 can capture both credentials and MFA session tokens in real time. In 2023, Microsoft reported that AiTM phishing attacks increased by over 146%. Once an attacker has both your password and MFA capability, they have the same access to your accounts as you do.',
          },
        },
      ],
    },
  ],

  // -------------------------------------------------------
  // Branches
  // -------------------------------------------------------
  branches: {
    // Branch triggered if user forwarded the phishing email to a coworker (Step 1 poor choice)
    forwarded_phish: {
      steps: [
        {
          id: 'branch_forwarded_step_1',
          narrative:
            'Your coworker, Marcus, just pinged you on Slack: "Hey, I got that email you forwarded about the password reset. I went ahead and clicked the link and entered my credentials before I realized the domain looked weird. What should I do?" You now need to handle the consequences of forwarding the phishing email.',
          simulationContent: {
            type: 'email',
            emails: [
              {
                from: 'marcus.webb@novatech.com',
                to: 'you@novatech.com',
                subject: 'RE: That password reset email you forwarded',
                body: `Hey,

So I clicked that password reset link from the email you sent me and entered my NovaTech credentials. The page looked legit but now I'm worried — the URL didn't look quite right after I submitted everything.

Did you actually send that or was it some kind of phishing thing? Should I be worried? What do I do now?

- Marcus`,
                timestamp: '2026-02-16T08:47:00Z',
                isPhishing: false,
              },
            ],
          },
          choices: [
            {
              id: 'branch_fwd_1_optimal',
              text: 'Tell Marcus to change his password immediately on the real NovaTech portal and report both the original phishing email and the credential compromise to IT Security right away.',
              quality: 'optimal',
              securityScoreChange: 5,
              trustChange: 5,
              feedback: {
                title: 'Damage Control — Fast and Effective',
                explanation:
                  'You acted quickly to mitigate the damage. Having Marcus change his password immediately limits the window of opportunity for the attacker. Reporting the compromise to IT Security allows them to monitor Marcus\'s account for suspicious activity, force a session revocation, and assess whether the attacker has already accessed any systems.',
                realWorldContext:
                  'Incident response speed is critical. IBM\'s 2024 Cost of a Data Breach report found that breaches contained within 200 days cost an average of $1.02 million less than those that took longer. The first hour after credential compromise is the most critical — attackers often begin lateral movement within minutes of obtaining valid credentials.',
              },
            },
            {
              id: 'branch_fwd_1_acceptable',
              text: 'Tell Marcus it was phishing and he should change his password right away. Make a mental note to report it to IT later.',
              quality: 'acceptable',
              securityScoreChange: 2,
              trustChange: 2,
              feedback: {
                title: 'Partially Effective Response',
                explanation:
                  'Advising Marcus to change his password is correct, but delaying the IT Security report gives the attacker more time to use the stolen credentials. Every minute counts in incident response. The security team needs to know immediately so they can take protective measures across the organization.',
                realWorldContext:
                  'In incident response, "later" is often too late. Automated attack tools can use stolen credentials within seconds. Delaying a report by even an hour can mean the difference between a contained incident and a full-scale breach affecting the entire company.',
              },
            },
            {
              id: 'branch_fwd_1_poor',
              text: 'Tell Marcus not to worry — it is probably nothing and these phishing emails rarely lead to actual hacks.',
              quality: 'poor',
              securityScoreChange: -5,
              trustChange: -3,
              feedback: {
                title: 'Downplaying a Real Threat',
                explanation:
                  'Marcus entered his real credentials into a phishing site. This is not "probably nothing" — it is a confirmed credential compromise. By downplaying the severity, you delayed critical response actions and left Marcus\'s account (and potentially the entire network) exposed to unauthorized access.',
                realWorldContext:
                  'Dismissing security incidents is one of the most common reasons breaches escalate. The 2013 Target breach — which compromised 40 million credit cards — began with stolen vendor credentials that were initially dismissed as a low-priority alert. Treat every credential compromise as a serious incident until proven otherwise.',
              },
            },
            {
              id: 'branch_fwd_1_dangerous',
              text: 'Ignore Marcus\'s message. You did not mean to cause a problem and do not want to draw attention to your mistake.',
              quality: 'dangerous',
              securityScoreChange: -10,
              trustChange: -8,
              feedback: {
                title: 'Concealing an Incident — Severe Consequences',
                explanation:
                  'Ignoring a known credential compromise to avoid blame is the worst possible response. Marcus\'s account is actively compromised, and the attacker may be using his credentials right now to access sensitive systems. By staying silent, you allow the breach to spread unchecked and violate your professional responsibility as a security analyst.',
                realWorldContext:
                  'Concealing security incidents is not only unethical but often illegal. Many industries have mandatory breach notification laws with strict timelines. Employees who hide incidents to avoid blame frequently face termination and, in regulated industries, personal legal liability. A culture where people fear reporting mistakes leads to catastrophic security failures.',
              },
            },
          ],
        },
      ],
    },

    // Branch triggered if user clicked the phishing link in Step 1 (dangerous choice)
    compromised_credentials: {
      steps: [
        {
          id: 'branch_compromised_step_1',
          narrative:
            'Moments after you entered your credentials on the fake password reset page, you receive an automated security alert from the real NovaTech IT system. It shows a login to your account from an unrecognized IP address in Eastern Europe. The attacker is already using your credentials.',
          simulationContent: {
            type: 'email',
            emails: [
              {
                from: 'no-reply@novatech.com',
                to: 'you@novatech.com',
                subject: 'Security Alert: Unrecognized Login to Your Account',
                body: `NovaTech Security Alert

We detected a login to your account from an unrecognized device and location:

    IP Address: 185.220.101.47
    Location: Bucharest, Romania
    Device: Unknown Linux Device
    Time: February 16, 2026 at 08:14 AM EST

If this was not you, your account may be compromised. Please take the following steps immediately:

1. Change your password at https://portal.novatech.com/account/security
2. Contact IT Security at ext. 9100 or security@novatech.com
3. Review your recent account activity for unauthorized changes

— NovaTech Automated Security Monitoring`,
                timestamp: '2026-02-16T08:14:00Z',
                isPhishing: false,
              },
            ],
          },
          choices: [
            {
              id: 'branch_comp_1_optimal',
              text: 'Immediately call IT Security at ext. 9100, explain that you fell for a phishing email, change your password through the official portal, and enable any additional security measures they recommend.',
              quality: 'optimal',
              securityScoreChange: 5,
              trustChange: 5,
              feedback: {
                title: 'Fast Incident Response — Minimizing the Damage',
                explanation:
                  'You took immediate and correct action. Calling IT Security directly ensures the fastest response. Changing your password through the official portal (not through any emailed link) cuts off the attacker\'s access. Being honest about falling for the phishing email allows the security team to assess the full scope of the compromise and take appropriate containment measures.',
                realWorldContext:
                  'The difference between a minor incident and a major breach is often just minutes. When an employee immediately reports a compromise, the security team can revoke sessions, lock down the account, and begin monitoring for lateral movement. Honesty and speed are more valued than perfection — security teams would rather hear about a mistake quickly than discover a hidden breach weeks later.',
              },
            },
            {
              id: 'branch_comp_1_acceptable',
              text: 'Change your password immediately through the official NovaTech portal and then send an email to the IT Security team explaining what happened.',
              quality: 'acceptable',
              securityScoreChange: 2,
              trustChange: 2,
              feedback: {
                title: 'Correct Actions, Slightly Delayed',
                explanation:
                  'Changing your password through the official portal is the right first step. However, calling IT Security is faster than emailing them, and in an active compromise, every second matters. The attacker may have already taken actions beyond just logging in — a phone call gets human eyes on the problem faster.',
                realWorldContext:
                  'In incident response, the communication channel matters. A phone call to the security team creates an immediate, interactive response. An email might sit unread for minutes or hours. Most security operations centers (SOCs) prioritize phone calls over email because they signal urgency and allow real-time information gathering.',
              },
            },
            {
              id: 'branch_comp_1_poor',
              text: 'Just change your password and hope the attacker did not do anything with your account. No need to involve IT Security for a simple password reset.',
              quality: 'poor',
              securityScoreChange: -5,
              trustChange: -3,
              feedback: {
                title: 'Incomplete Response — Hidden Risks Remain',
                explanation:
                  'Changing your password helps, but the attacker may have already installed persistence mechanisms: created forwarding rules in your email, accessed shared files, downloaded sensitive data, or used your account to send phishing emails to others. Without IT Security\'s involvement, these secondary compromises go undetected.',
                realWorldContext:
                  'Attackers who gain access to an email account typically set up hidden inbox rules to auto-forward certain emails (especially password resets and financial communications) to an external address. Even after a password change, these rules persist. IT Security teams specifically check for these hidden persistence mechanisms during incident response.',
              },
            },
            {
              id: 'branch_comp_1_dangerous',
              text: 'The security alert might also be phishing. Ignore it and continue working — you already reset your password using the first link.',
              quality: 'dangerous',
              securityScoreChange: -10,
              trustChange: -8,
              feedback: {
                title: 'Active Breach Ignored — Catastrophic Risk',
                explanation:
                  'This alert is from the legitimate NovaTech domain (novatech.com) and matches real security monitoring behavior. You did not reset your password through a legitimate portal — you entered it into a phishing site. The attacker has your credentials and is actively using them. By ignoring this alert, you are allowing an attacker free rein in the NovaTech network through your account.',
                realWorldContext:
                  'Alert fatigue is a real problem in cybersecurity, but dismissing a legitimate security alert during an active compromise is catastrophic. The 2020 SolarWinds attack went undetected for months in part because some alerts were dismissed or deprioritized. When you know you have been phished and then receive a login alert from an unknown location, that is not a coincidence — it is confirmation of compromise.',
              },
            },
          ],
        },
      ],
    },
  },
};
