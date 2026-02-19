import type { Scenario } from './types.ts';

export const wednesdayScenario: Scenario = {
  id: 'wednesday',
  title: 'Physical Security',
  dayLabel: 'Wednesday',
  bloomsLevel: 'Application',
  simulationType: 'desktop',
  learningObjective:
    'Identify and respond appropriately to physical security threats including tailgating, USB drops, and clean desk policy violations in the workplace.',
  intro:
    'It is Wednesday morning and you have just arrived at your company\'s office. Physical security is just as critical as digital security -- threats like rogue USB devices, unauthorized building access, unattended workstations, and exposed documents can all lead to devastating breaches. Today you will face several real-world physical security situations and must decide how to handle each one.',

  steps: [
    // -------------------------------------------------------
    // Step 1 -- Found USB drive in the parking lot
    // -------------------------------------------------------
    {
      id: 'wed_step1_usb_drive',
      narrative:
        'As you walk from the parking lot toward the office entrance, you spot a USB flash drive lying on the ground near the building door. It has a label that reads "Q4 Salary Data". No one else is around.',
      simulationContent: {
        type: 'desktop',
        notifications: [
          {
            title: 'Security Reminder',
            message:
              'Company policy: Never connect unknown removable media to corporate devices. Report suspicious items to the Security Operations Center.',
            type: 'info',
          },
          {
            title: 'USB Device Detected Nearby',
            message:
              'An unidentified USB storage device has been observed in a common area. Exercise extreme caution.',
            type: 'usb',
          },
          {
            title: 'Threat Intelligence Update',
            message:
              'Recent industry reports indicate a 300% increase in USB-drop social engineering attacks targeting corporate employees.',
            type: 'warning',
          },
        ],
      },
      choices: [
        {
          id: 'wed_s1_optimal',
          text: 'Do not touch the USB drive. Immediately report its location to the Security Operations Center so they can collect and analyze it safely.',
          quality: 'optimal',
          securityScoreChange: 5,
          trustChange: 5,
          feedback: {
            title: 'Perfect Response',
            explanation:
              'You avoided all contact with the suspicious device and reported it through the correct channel. The SOC can now safely analyze the drive in an isolated environment to determine whether it is part of an attack.',
            realWorldContext:
              'USB-drop attacks are a well-documented social engineering technique. In a famous 2016 study at the University of Illinois, 48% of people who found USB drives on the ground plugged them in. Malicious USB devices can install malware the moment they are connected, even before the user opens any files.',
          },
        },
        {
          id: 'wed_s1_acceptable',
          text: 'Pick up the USB drive without plugging it in and bring it directly to the IT security desk for analysis.',
          quality: 'acceptable',
          securityScoreChange: 2,
          trustChange: 2,
          feedback: {
            title: 'Reasonable but Risky',
            explanation:
              'Turning the drive in to IT security is responsible, but physically handling the device introduces a small chain-of-custody risk. It is generally better to leave suspicious items in place and report them so a trained team can handle the collection.',
            realWorldContext:
              'Some sophisticated attack devices are disguised as USB drives but contain embedded wireless transmitters or even small amounts of harmful substances. Security teams have protocols for safely handling unknown hardware.',
          },
        },
        {
          id: 'wed_s1_poor',
          text: 'Plug the USB drive into your personal phone charger to see if you can read its contents and identify the owner.',
          quality: 'poor',
          securityScoreChange: -5,
          trustChange: -3,
          nextBranch: 'usb_compromised',
          feedback: {
            title: 'Dangerous Curiosity',
            explanation:
              'Connecting an unknown USB device to any of your devices -- even a phone -- can trigger a malware payload. Some USB devices masquerade as keyboards and execute commands within seconds of being plugged in.',
            realWorldContext:
              'USB Rubber Ducky and similar devices can type out hundreds of keystrokes per second, downloading and executing malware before you can react. A personal device compromised on a corporate network can serve as a pivot point for attackers.',
          },
        },
        {
          id: 'wed_s1_dangerous',
          text: 'Plug the USB drive into your work computer to check the salary data -- it might be important company information that someone lost.',
          quality: 'dangerous',
          securityScoreChange: -10,
          trustChange: -8,
          nextBranch: 'usb_compromised',
          feedback: {
            title: 'Critical Security Violation',
            explanation:
              'Plugging an unknown USB device directly into a corporate workstation is one of the most dangerous things you can do. The device could install ransomware, a keylogger, or a remote access trojan that gives an attacker full control of the corporate network.',
            realWorldContext:
              'The Stuxnet worm, which damaged Iranian nuclear centrifuges, was initially delivered via infected USB drives. Many organizations have disabled USB ports entirely because the risk is so severe. The enticing "Salary Data" label is a classic social engineering tactic designed to exploit curiosity.',
          },
        },
      ],
    },

    // -------------------------------------------------------
    // Step 2 -- Tailgating at a secure door
    // -------------------------------------------------------
    {
      id: 'wed_step2_tailgating',
      narrative:
        'You badge in at the main secure entrance. As the door opens, a person in business attire walks briskly up behind you carrying a large box. They smile and say, "Hey, could you hold the door? My badge is in my pocket and my hands are full. I\'m from the third-floor marketing team."',
      simulationContent: {
        type: 'desktop',
        notifications: [
          {
            title: 'Access Control Policy',
            message:
              'Each employee must individually authenticate at every access-controlled entry point. Holding doors open for others is a policy violation.',
            type: 'info',
          },
          {
            title: 'Tailgating Alert',
            message:
              'Security cameras have detected multiple unauthorized entries via tailgating this quarter. Employees are reminded to never allow others to pass on their badge swipe.',
            type: 'warning',
          },
          {
            title: 'Recent Incident',
            message:
              'Last month, an unauthorized individual gained building access by tailgating. The intruder accessed a server room and stole hardware containing customer data.',
            type: 'error',
          },
        ],
      },
      choices: [
        {
          id: 'wed_s2_optimal',
          text: 'Politely decline and explain that company policy requires everyone to badge in individually. Offer to hold their box while they retrieve their badge, or suggest they contact reception for assistance.',
          quality: 'optimal',
          securityScoreChange: 5,
          trustChange: 5,
          feedback: {
            title: 'Excellent Security Awareness',
            explanation:
              'You enforced access control policy while remaining courteous and offering a practical alternative. This is the ideal balance between security and professionalism.',
            realWorldContext:
              'Tailgating is one of the most common methods used by social engineers and unauthorized individuals to gain physical access to restricted areas. Penetration testers report that tailgating succeeds over 90% of the time because people feel socially uncomfortable refusing entry.',
          },
        },
        {
          id: 'wed_s2_acceptable',
          text: 'Let the door close and direct the person to the reception desk where security can verify their identity and let them in.',
          quality: 'acceptable',
          securityScoreChange: 2,
          trustChange: 2,
          feedback: {
            title: 'Secure but Could Be More Helpful',
            explanation:
              'You correctly prevented unauthorized access by not holding the door. Directing them to reception is a valid approach, though offering to help with the box while they badge in would have been more collegial.',
            realWorldContext:
              'Reception and security desks serve as secondary verification points. Directing someone there is always a safe fallback when you are uncertain about their identity or access rights.',
          },
        },
        {
          id: 'wed_s2_poor',
          text: 'Hold the door open for them. They look like they belong here, and you do not want to be rude to a colleague.',
          quality: 'poor',
          securityScoreChange: -5,
          trustChange: -3,
          nextBranch: 'tailgating_investigation',
          feedback: {
            title: 'Social Pressure Overcame Security',
            explanation:
              'Appearances can be deceiving. Social engineers specifically dress and behave in ways that make them look like they belong. By holding the door, you bypassed the entire access control system.',
            realWorldContext:
              'Professional penetration testers routinely gain access to secure facilities simply by carrying a box, wearing a uniform, or acting confident. The "hands full" pretext is one of the oldest and most effective tailgating tricks in the book.',
          },
        },
        {
          id: 'wed_s2_dangerous',
          text: 'Hold the door, and when they mention marketing, offer to walk them to the third floor yourself since the secure stairwell also requires a badge.',
          quality: 'dangerous',
          securityScoreChange: -10,
          trustChange: -8,
          nextBranch: 'tailgating_investigation',
          feedback: {
            title: 'You Became an Escort for a Potential Intruder',
            explanation:
              'Not only did you allow someone to bypass the first access control point, you actively helped them bypass additional security barriers deeper inside the building. If this person were an attacker, you just gave them access to restricted areas.',
            realWorldContext:
              'In physical penetration testing engagements, once an intruder gets one employee to help, they often escalate by asking for more access. Attackers use the "foot-in-the-door" technique: each small favor leads to a bigger ask until they reach their target.',
          },
        },
      ],
    },

    // -------------------------------------------------------
    // Step 3 -- Unattended workstation / clean desk
    // -------------------------------------------------------
    {
      id: 'wed_step3_clean_desk',
      narrative:
        'After a morning meeting, you return to your desk to find that you left your workstation unlocked and several printed documents containing project budgets and client contact information are spread across your desk. A sticky note with your VPN password is also attached to your monitor. You notice a facilities worker you do not recognize cleaning the desks nearby.',
      simulationContent: {
        type: 'desktop',
        notifications: [
          {
            title: 'Workstation Auto-Lock Reminder',
            message:
              'Your workstation has been unlocked and unattended for 23 minutes. Company policy requires screens to be locked (Win+L / Cmd+L) whenever you leave your desk.',
            type: 'warning',
          },
          {
            title: 'Clean Desk Policy',
            message:
              'All sensitive documents must be stored in locked drawers or shredded when no longer needed. Leaving confidential materials in the open is a policy violation.',
            type: 'info',
          },
          {
            title: 'Credential Exposure Risk',
            message:
              'Visible passwords on sticky notes or whiteboards are a critical security violation. Unauthorized individuals can photograph or memorize exposed credentials.',
            type: 'error',
          },
          {
            title: 'Visitor Alert',
            message:
              'Unescorted non-employees have been observed in the workspace area. Verify that all visitors are wearing proper identification badges.',
            type: 'warning',
          },
        ],
      },
      choices: [
        {
          id: 'wed_s3_optimal',
          text: 'Immediately lock your workstation, remove the sticky note with your password and destroy it, gather all sensitive documents into a locked drawer, and then change your VPN password right away since it was exposed.',
          quality: 'optimal',
          securityScoreChange: 5,
          trustChange: 5,
          achievementTrigger: 'clean_desk',
          feedback: {
            title: 'Comprehensive Remediation',
            explanation:
              'You addressed every vulnerability: the unlocked workstation, the exposed credentials, and the unsecured documents. Changing the VPN password is essential because you cannot know if anyone saw or photographed the sticky note while you were away.',
            realWorldContext:
              'The "clean desk policy" is a foundational physical security control recognized in standards like ISO 27001. Studies show that over 60% of employees leave sensitive information visible on their desks. Exposed passwords are a leading cause of unauthorized access -- security auditors routinely photograph credentials left on sticky notes during assessments.',
          },
        },
        {
          id: 'wed_s3_acceptable',
          text: 'Lock your workstation and put the sensitive documents in a drawer. Remove the sticky note and throw it in the trash.',
          quality: 'acceptable',
          securityScoreChange: 2,
          trustChange: 2,
          feedback: {
            title: 'Good but Incomplete',
            explanation:
              'You secured the workstation and the documents, which is good. However, throwing the password sticky note in the trash rather than shredding it leaves it recoverable, and you did not change the VPN password which may have already been observed.',
            realWorldContext:
              'Dumpster diving -- searching through trash for sensitive information -- is a real attack technique. Passwords written on paper should be shredded or destroyed completely. Additionally, any credential that has been visually exposed should be rotated immediately.',
          },
        },
        {
          id: 'wed_s3_poor',
          text: 'Lock your workstation and move the sticky note to inside your desk drawer. Leave the documents where they are since you will need them again soon.',
          quality: 'poor',
          securityScoreChange: -5,
          trustChange: -3,
          feedback: {
            title: 'Partially Addressed',
            explanation:
              'Moving the sticky note to a drawer is marginally better than leaving it on the monitor, but the password has already been exposed and needs to be changed. The sensitive documents remain accessible to anyone passing by your desk.',
            realWorldContext:
              'Keeping passwords written down, even hidden, violates security best practices. Password managers exist specifically to eliminate this risk. Leaving sensitive documents unattended -- even briefly -- gives anyone in the area an opportunity to photograph or take them.',
          },
        },
        {
          id: 'wed_s3_dangerous',
          text: 'Leave everything as it is. You will be at your desk for the rest of the day, so there is no real risk. The password sticky note is convenient and the documents are easier to reference when visible.',
          quality: 'dangerous',
          securityScoreChange: -10,
          trustChange: -8,
          feedback: {
            title: 'Complete Disregard for Physical Security',
            explanation:
              'Every vulnerability remains unaddressed. Your unlocked workstation was exposed for 23 minutes, and leaving credentials and confidential documents in the open continues to put company data at risk even while you are present -- you cannot monitor your desk at all times.',
            realWorldContext:
              'Insider threats and social engineering actors often operate during normal business hours. A passerby or visitor only needs seconds to photograph a password or snap pictures of confidential documents with a phone. Many major data breaches have started with physical security lapses that seemed trivial at the time.',
          },
        },
      ],
    },

    // -------------------------------------------------------
    // Step 4 -- Sensitive documents left on the printer
    // -------------------------------------------------------
    {
      id: 'wed_step4_printer_documents',
      narrative:
        'Later in the afternoon, you walk to the shared printer to collect a document you printed. On the output tray you find your printout along with several pages that are not yours. The unclaimed pages are marked "CONFIDENTIAL" and contain detailed employee performance reviews with full names, Social Security numbers, and salary information. No one else is near the printer.',
      simulationContent: {
        type: 'desktop',
        notifications: [
          {
            title: 'Secure Printing Reminder',
            message:
              'Use the secure print feature (Print > Secure Release) to hold jobs until you authenticate at the printer. This prevents sensitive documents from sitting unattended in the output tray.',
            type: 'info',
          },
          {
            title: 'Data Classification Notice',
            message:
              'Documents containing PII (Social Security numbers, salary data, performance evaluations) are classified as CONFIDENTIAL and must be handled according to data protection policy.',
            type: 'warning',
          },
          {
            title: 'Compliance Alert',
            message:
              'Improper handling of employee PII may result in violations of privacy regulations (GDPR, CCPA, HIPAA) and could expose the company to legal liability.',
            type: 'error',
          },
        ],
      },
      choices: [
        {
          id: 'wed_s4_optimal',
          text: 'Take only your own printout. Do not read the confidential pages. Immediately notify the document owner (or HR/management if the owner is unknown) about the unclaimed sensitive printout so they can retrieve and secure it.',
          quality: 'optimal',
          securityScoreChange: 5,
          trustChange: 5,
          feedback: {
            title: 'Exemplary Data Handling',
            explanation:
              'You respected data confidentiality by not reading documents that were not meant for you, and you ensured the responsible party was notified so the sensitive information could be secured promptly.',
            realWorldContext:
              'Printers are one of the most overlooked physical security vulnerabilities in offices. A 2019 Quocirca study found that 60% of businesses experienced a print-related data breach. Sensitive documents left on shared printers can be read, photographed, or taken by anyone who walks by.',
          },
        },
        {
          id: 'wed_s4_acceptable',
          text: 'Take your printout and place the confidential pages face down on the tray. Send a general message to the team channel reminding everyone to pick up their print jobs promptly.',
          quality: 'acceptable',
          securityScoreChange: 2,
          trustChange: 2,
          feedback: {
            title: 'Partially Effective',
            explanation:
              'Flipping the pages face down offers minimal protection, and a general reminder does not ensure the specific document owner is notified. The sensitive pages remain unsecured in a public area while you wait for someone to claim them.',
            realWorldContext:
              'General reminders are useful for long-term behavior change but do not solve the immediate problem. Confidential documents containing PII need to be actively secured, not left in a shared space and hoped for the best.',
          },
        },
        {
          id: 'wed_s4_poor',
          text: 'Read through the confidential documents to figure out who printed them, then leave them on that person\'s desk so they get their printout back.',
          quality: 'poor',
          securityScoreChange: -5,
          trustChange: -3,
          feedback: {
            title: 'Unauthorized Access to Confidential Data',
            explanation:
              'Even with good intentions, reading confidential documents that are not meant for you is an unauthorized access violation. You have now been exposed to sensitive PII (Social Security numbers, salaries) that you have no business reason to view. Leaving them on an unattended desk creates yet another exposure point.',
            realWorldContext:
              'Under data protection regulations like GDPR and CCPA, accessing personal data without authorization -- even accidentally or with good intentions -- can be a reportable incident. The principle of least privilege applies to physical documents just as it does to digital systems.',
          },
        },
        {
          id: 'wed_s4_dangerous',
          text: 'Take the confidential pages along with your printout to your desk to look at later. The salary data might be interesting, and you can always return the pages tomorrow.',
          quality: 'dangerous',
          securityScoreChange: -10,
          trustChange: -8,
          feedback: {
            title: 'Data Theft and Privacy Violation',
            explanation:
              'Taking confidential documents containing employee PII to your desk for personal curiosity is a serious policy violation that could constitute data theft. This behavior may result in termination and legal consequences.',
            realWorldContext:
              'Intentionally accessing and retaining confidential employee data without authorization is grounds for immediate dismissal at most organizations and may violate criminal statutes related to identity theft and privacy. Insider-caused data breaches account for roughly 25% of all incidents, and many begin with seemingly small acts of curiosity.',
          },
        },
      ],
    },
  ],

  branches: {
    // -------------------------------------------------------
    // Branch: USB was plugged in (poor/dangerous path from step 1)
    // -------------------------------------------------------
    usb_compromised: {
      steps: [
        {
          id: 'wed_branch_usb_alert',
          narrative:
            'Moments after you connected the USB drive, your screen flickers and your endpoint protection software displays a critical alert: "Malicious payload detected -- USB HID attack in progress." Your IT security team has been automatically notified and is calling you. Meanwhile, your machine is behaving erratically -- the cursor is moving on its own and command windows are flashing open and closed.',
          simulationContent: {
            type: 'desktop',
            notifications: [
              {
                title: 'CRITICAL: Malware Detected',
                message:
                  'Endpoint Detection and Response has identified a USB Human Interface Device (HID) attack. A malicious script is attempting to exfiltrate data and establish a reverse shell. Immediate action required.',
                type: 'error',
              },
              {
                title: 'IT Security Response',
                message:
                  'The Security Operations Center has been alerted. An incident responder is en route to your location. Do NOT attempt to remove the USB device until instructed.',
                type: 'warning',
              },
              {
                title: 'Network Quarantine Active',
                message:
                  'Your workstation has been automatically isolated from the corporate network to prevent lateral movement of the detected threat.',
                type: 'info',
              },
              {
                title: 'USB Device Classification',
                message:
                  'The connected device has been identified as a programmable USB attack tool (BadUSB/Rubber Ducky variant), not a standard storage device.',
                type: 'usb',
              },
            ],
          },
          choices: [
            {
              id: 'wed_branch_usb_optimal',
              text: 'Do not touch the USB or the computer. Immediately call the IT security hotline, report exactly what happened, and wait for the incident response team to arrive and handle the situation.',
              quality: 'optimal',
              securityScoreChange: 5,
              trustChange: 5,
              feedback: {
                title: 'Best Possible Recovery',
                explanation:
                  'Given the mistake of plugging in the USB, this is the best recovery action. Leaving the device in place preserves forensic evidence, and immediately reporting the full truth helps the IR team contain the damage as quickly as possible.',
                realWorldContext:
                  'Incident response teams need accurate, timely information to contain threats. The first few minutes after a compromise are critical. Removing a USB device or shutting down the machine improperly can destroy volatile forensic evidence that analysts need to understand the full scope of the attack.',
              },
            },
            {
              id: 'wed_branch_usb_acceptable',
              text: 'Disconnect the network cable from the computer to isolate it, then call IT security to report the incident and wait for their instructions.',
              quality: 'acceptable',
              securityScoreChange: 2,
              trustChange: 2,
              feedback: {
                title: 'Quick Thinking but Imperfect',
                explanation:
                  'Disconnecting the network cable is a reasonable instinct to prevent data exfiltration, though the automated quarantine had already isolated the machine. Reporting to IT security was the right call.',
                realWorldContext:
                  'Manual network isolation can be helpful if automated quarantine has not engaged, but it is best to follow your organization\'s specific incident response procedures. Some forensic data (like active network connections) may be lost when the cable is disconnected.',
              },
            },
            {
              id: 'wed_branch_usb_poor',
              text: 'Quickly yank out the USB drive and restart the computer, hoping that will fix the problem before IT security notices.',
              quality: 'poor',
              securityScoreChange: -5,
              trustChange: -3,
              feedback: {
                title: 'Evidence Destruction and Concealment',
                explanation:
                  'Removing the USB device and restarting destroys volatile forensic evidence. Trying to hide the incident from IT security is a serious violation -- the automated alert has already notified them, and your attempt at concealment will make the situation worse.',
                realWorldContext:
                  'Attempting to conceal a security incident is treated far more seriously than the original mistake. Forensic investigators can often reconstruct what happened even after a restart, and the cover-up attempt will appear in the audit logs. Transparency is always the better path.',
              },
            },
            {
              id: 'wed_branch_usb_dangerous',
              text: 'Ignore the alerts -- they are probably false positives. Remove the USB drive, dismiss the notifications, and continue working normally.',
              quality: 'dangerous',
              securityScoreChange: -10,
              trustChange: -8,
              feedback: {
                title: 'Willful Negligence',
                explanation:
                  'Dismissing a critical malware alert as a false positive while your machine is visibly compromised shows a dangerous disregard for security. The attack may have already established persistence, and continuing to work on a compromised machine puts all corporate data at risk.',
                realWorldContext:
                  'Alert fatigue is a real problem, but ignoring critical alerts -- especially when accompanied by visible signs of compromise -- can lead to catastrophic breaches. Many major incidents (including the Target breach) involved alerts that were dismissed or ignored by personnel.',
              },
            },
          ],
        },
      ],
    },

    // -------------------------------------------------------
    // Branch: Post-tailgating investigation
    // -------------------------------------------------------
    tailgating_investigation: {
      steps: [
        {
          id: 'wed_branch_tailgate_followup',
          narrative:
            'An hour after the tailgating incident, building security contacts you. Security camera footage shows that the person you encountered at the door was not a recognized employee. They were observed photographing server room door codes posted on a nearby whiteboard and attempting to access the data center with a cloned badge. Security wants to understand what happened and asks you to describe the encounter in detail.',
          simulationContent: {
            type: 'desktop',
            notifications: [
              {
                title: 'Security Investigation in Progress',
                message:
                  'Building security is conducting an active investigation into an unauthorized individual detected on premises. All employees in the affected area may be contacted for statements.',
                type: 'warning',
              },
              {
                title: 'Badge Access Audit',
                message:
                  'A full audit of badge access logs for the main entrance is underway. Anomalies between badge swipes and camera footage are being reviewed.',
                type: 'info',
              },
              {
                title: 'Potential Data Center Breach Attempt',
                message:
                  'An unauthorized individual attempted to access the data center using a cloned badge. The attempt was blocked by multi-factor authentication at the data center door.',
                type: 'error',
              },
              {
                title: 'Physical Security Escalation',
                message:
                  'This incident has been escalated to the Chief Information Security Officer. All employees involved will be required to submit written incident reports.',
                type: 'warning',
              },
            ],
          },
          choices: [
            {
              id: 'wed_branch_tail_optimal',
              text: 'Provide a complete and honest account of the encounter, including every detail you can remember about the person\'s appearance, behavior, and what they said. Offer to help review security camera footage to confirm the timeline.',
              quality: 'optimal',
              securityScoreChange: 5,
              trustChange: 5,
              feedback: {
                title: 'Full Cooperation',
                explanation:
                  'Your honest and detailed account helps the security team piece together the intruder\'s movements and methods. Volunteering to help review footage shows accountability and a commitment to organizational security.',
                realWorldContext:
                  'Physical penetration testers and real intruders carefully plan their approach, clothing, and cover story. Detailed witness accounts are invaluable for understanding how social engineering tactics succeed and for improving future defenses. Your description may help identify the individual or prevent future attempts.',
              },
            },
            {
              id: 'wed_branch_tail_acceptable',
              text: 'Describe what happened honestly but keep the details brief, mentioning only the basic facts of the encounter.',
              quality: 'acceptable',
              securityScoreChange: 2,
              trustChange: 2,
              feedback: {
                title: 'Honest but Limited',
                explanation:
                  'Honesty is essential, but brief details may not give the security team enough to work with. Small details -- like what the person was wearing, their exact words, or which direction they came from -- can be critical for an investigation.',
                realWorldContext:
                  'In security investigations, seemingly trivial details often turn out to be important. The color of a shirt might match other camera footage, an accent might narrow down a suspect pool, and the exact phrasing of a cover story might link to other social engineering attempts.',
              },
            },
            {
              id: 'wed_branch_tail_poor',
              text: 'Downplay your involvement and say you do not remember much about the encounter. You do not want to get in trouble for a possible policy violation.',
              quality: 'poor',
              securityScoreChange: -5,
              trustChange: -3,
              feedback: {
                title: 'Obstructing the Investigation',
                explanation:
                  'Downplaying your involvement hinders the investigation and delays the security team\'s ability to understand and respond to the threat. Camera footage will likely contradict your account anyway, damaging your credibility.',
                realWorldContext:
                  'Security investigations are about understanding what happened, not punishing employees (unless there is willful negligence). Withholding information during an active security incident can escalate a minor policy discussion into a serious disciplinary matter.',
              },
            },
            {
              id: 'wed_branch_tail_dangerous',
              text: 'Deny any involvement entirely. Claim you entered through a different door and did not see anyone. The cameras probably did not get a clear shot of your face.',
              quality: 'dangerous',
              securityScoreChange: -10,
              trustChange: -8,
              feedback: {
                title: 'Dishonesty During a Security Investigation',
                explanation:
                  'Lying during an active security investigation is a terminable offense at most organizations. Modern security cameras capture high-resolution footage with timestamps synchronized to badge access logs. Your deception will almost certainly be uncovered, and the consequences will be far worse than admitting a policy violation.',
                realWorldContext:
                  'Organizations with mature security programs correlate badge logs, camera footage, and network access logs during investigations. Attempting to deceive investigators transforms a policy-adherence discussion into a trust and integrity issue that typically results in termination, and in some industries, legal consequences.',
              },
            },
          ],
        },
      ],
    },
  },
};
