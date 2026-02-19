import type { Scenario } from './types.ts';

export const tuesdayScenario: Scenario = {
  id: 'tuesday',
  title: 'Social Engineering',
  dayLabel: 'Tuesday',
  bloomsLevel: 'Comprehension',
  learningObjective:
    'Recognize and respond appropriately to social engineering attacks, including pretexting, impersonation, and manipulation tactics used over phone calls.',
  simulationType: 'phone',
  intro:
    'It is Tuesday morning and you have barely settled into your desk when your phone starts ringing. Throughout the day you will receive a series of suspicious phone calls from people who may not be who they claim to be. Your task is to identify social engineering attempts and respond in a way that protects both yourself and your organization. Trust your instincts, follow company policy, and remember: legitimate callers will never pressure you into bypassing security procedures.',

  steps: [
    // ── Step 1: Fake IT Support requesting password ──────────────────────
    {
      id: 'tue-step-1',
      narrative:
        'Your desk phone rings. The caller ID shows an internal extension. A friendly but slightly hurried voice greets you, claiming to be from the IT Help Desk. They say there has been a critical security patch pushed overnight and they need to verify your credentials to ensure your account was migrated properly. They ask you to confirm your username and password so they can "check it against the new system."',
      simulationContent: {
        type: 'phone',
        call: {
          caller: 'Kevin Marshall',
          callerTitle: 'IT Help Desk Technician',
          transcript: [
            'Hey there, this is Kevin from the IT Help Desk. How are you doing today?',
            'Listen, I know this is a bit sudden, but we pushed a critical security patch last night and we are going through every employee account to make sure the migration went smoothly.',
            'I just need you to quickly confirm your username and password so I can check it against the new directory. It will only take a second.',
            'We have a hard deadline from management to finish this by noon, so I would really appreciate your help getting this done quickly.',
          ],
        },
      },
      choices: [
        {
          id: 'tue-s1-optimal',
          text: 'Politely decline and say you will contact the IT Help Desk directly through the official number listed on the company intranet to verify this request.',
          quality: 'optimal',
          securityScoreChange: 5,
          trustChange: 5,
          achievementTrigger: 'social_shield',
          feedback: {
            title: 'Excellent Verification Instinct',
            explanation:
              'You correctly identified that legitimate IT staff will never ask for your password over the phone. By offering to call back through the official help desk number, you maintained security without being confrontational.',
            realWorldContext:
              'In real organizations, the IT department already has administrative access to reset or verify accounts without needing your password. Any request for credentials over the phone is a major red flag. The callback verification technique is one of the most effective defenses against phone-based social engineering.',
          },
        },
        {
          id: 'tue-s1-acceptable',
          text: 'Tell the caller you are not comfortable sharing your password but offer to confirm your username only, and ask them to send a follow-up email from an official IT address.',
          quality: 'acceptable',
          securityScoreChange: 2,
          trustChange: 2,
          feedback: {
            title: 'Partially Guarded Response',
            explanation:
              'Refusing to share your password is the right instinct, and asking for email confirmation adds an extra verification layer. However, sharing your username still gives an attacker half of your credentials, and email addresses can be spoofed.',
            realWorldContext:
              'Usernames are often discoverable through other means (company directories, LinkedIn), but voluntarily confirming one removes guesswork for an attacker. The best approach is to share no information at all and verify the request through an independent, trusted channel.',
          },
        },
        {
          id: 'tue-s1-poor',
          text: 'Ask "Kevin" a few questions about the patch to see if he sounds legitimate, and if his answers seem reasonable, provide your credentials.',
          quality: 'poor',
          securityScoreChange: -5,
          trustChange: -3,
          feedback: {
            title: 'Easily Bypassed Verification',
            explanation:
              'Testing a caller with questions is not a reliable verification method. Social engineers research their targets thoroughly and can convincingly answer technical questions. By ultimately sharing your credentials, you handed over full access to your account.',
            realWorldContext:
              'Sophisticated social engineers often prepare detailed backstories, reference real projects, and use insider jargon to sound credible. The 2020 Twitter hack succeeded because attackers impersonated IT staff convincingly enough to obtain employee credentials through phone calls just like this one.',
          },
        },
        {
          id: 'tue-s1-dangerous',
          text: 'Provide your username and password immediately so you can get back to work. The caller has an internal extension so they must be legitimate.',
          quality: 'dangerous',
          securityScoreChange: -10,
          trustChange: -8,
          feedback: {
            title: 'Full Credential Compromise',
            explanation:
              'Giving away your credentials based solely on a caller ID is extremely risky. Caller IDs can be spoofed easily, and internal extensions can be compromised. You have potentially given an attacker complete access to your account and any systems it touches.',
            realWorldContext:
              'Caller ID spoofing technology is widely available and trivially easy to use. Attackers can make any number appear on your phone display, including internal company extensions. The 2023 MGM Resorts breach started with a single social engineering phone call where an attacker impersonated an employee to the IT help desk.',
          },
        },
      ],
    },

    // ── Step 2: Vendor requesting sensitive data ─────────────────────────
    {
      id: 'tue-step-2',
      narrative:
        'An hour later, another call comes in. The caller introduces herself as "Sandra Chen" from Pinnacle Office Supplies, a company your organization actually does use. She says she is updating their billing system and needs you to confirm your company\'s bank account number and routing information so future invoices are processed correctly. She knows your company name and the name of your accounts payable contact.',
      simulationContent: {
        type: 'phone',
        call: {
          caller: 'Sandra Chen',
          callerTitle: 'Account Manager, Pinnacle Office Supplies',
          transcript: [
            'Good morning! This is Sandra Chen, your account manager over at Pinnacle Office Supplies.',
            'We are in the middle of migrating to a new billing platform and I want to make sure your account does not have any interruptions.',
            'I just need to verify the bank account and routing number we have on file for your organization. Could you pull that up for me?',
            'I already spoke with Janet in your accounts payable department, but she said I should double-check with your department as well since you handle the purchase orders.',
          ],
        },
      },
      choices: [
        {
          id: 'tue-s2-optimal',
          text: 'Tell Sandra you cannot share financial information over the phone and that she should submit the request in writing through your company\'s official vendor management portal. Offer to provide the portal URL.',
          quality: 'optimal',
          securityScoreChange: 5,
          trustChange: 5,
          feedback: {
            title: 'Proper Channel Enforcement',
            explanation:
              'You correctly refused to share sensitive financial information over an unsolicited call and redirected the request to an official, auditable channel. This protects against both social engineering and accidental data leaks.',
            realWorldContext:
              'Business Email Compromise (BEC) and vendor impersonation scams cost organizations billions annually. The FBI reported over $2.7 billion in losses from BEC attacks in a single year. Legitimate vendors have established processes for updating financial information and will not pressure you to share it over the phone.',
          },
        },
        {
          id: 'tue-s2-acceptable',
          text: 'Say you need to verify her identity first, then call Pinnacle Office Supplies using the number on their official website to confirm Sandra works there and that this request is legitimate.',
          quality: 'acceptable',
          securityScoreChange: 2,
          trustChange: 2,
          feedback: {
            title: 'Good Verification, Incomplete Process',
            explanation:
              'Independently verifying the caller through the vendor\'s official number is a strong move. However, even after verification, sensitive financial data should be exchanged through secure, documented channels rather than over a phone call.',
            realWorldContext:
              'Callback verification is essential, but financial information should always flow through encrypted, auditable systems. Even if Sandra is legitimate, sharing bank details verbally creates no paper trail and opens the door to errors or interception.',
          },
        },
        {
          id: 'tue-s2-poor',
          text: 'Tell her you do not have that information handy but offer to look it up and email it to her at whatever email address she provides.',
          quality: 'poor',
          securityScoreChange: -5,
          trustChange: -3,
          feedback: {
            title: 'Data Sent to Unverified Destination',
            explanation:
              'While not sharing the data immediately was cautious, offering to email sensitive financial information to an address provided by the caller defeats the purpose. An attacker would simply give you an address they control.',
            realWorldContext:
              'Attackers commonly use lookalike domains (e.g., pinnac1e-supplies.com instead of pinnacle-supplies.com) or free email accounts to receive stolen data. Always use contact information you have independently verified, never details provided during an unsolicited call.',
          },
        },
        {
          id: 'tue-s2-dangerous',
          text: 'She knows your vendor relationship details and your AP contact by name, so she must be legitimate. Pull up the information and read it to her over the phone.',
          quality: 'dangerous',
          securityScoreChange: -10,
          trustChange: -8,
          feedback: {
            title: 'Financial Data Exposed',
            explanation:
              'Knowing a vendor\'s name and an internal contact does not prove identity. This information can be gathered from LinkedIn, public filings, or previous data breaches. You have now exposed your organization\'s banking information to a potentially malicious actor.',
            realWorldContext:
              'Social engineers frequently use publicly available information (employee names, vendor relationships, org charts) to build credibility. A quick LinkedIn search can reveal who handles accounts payable at most companies. Fraudulent wire transfers initiated through vendor impersonation are one of the most financially damaging forms of social engineering.',
          },
        },
      ],
    },

    // ── Step 3: "New employee" requesting building access codes ──────────
    {
      id: 'tue-step-3',
      narrative:
        'After lunch, your phone rings again. A nervous-sounding young man says his name is "Tyler Reeves" and that he just started in the marketing department this week. He explains that he forgot to get his building access code during orientation and is locked out of the side entrance. He asks if you could share the current door code so he can get back inside. He mentions his manager, Lisa Park, by name and says she is in a meeting and unreachable.',
      simulationContent: {
        type: 'phone',
        call: {
          caller: 'Tyler Reeves',
          callerTitle: 'New Marketing Associate',
          transcript: [
            'Hi, um, sorry to bother you. My name is Tyler Reeves and I just started in marketing this Monday.',
            'This is kind of embarrassing, but I went out for lunch and I completely forgot that I never got my building access code during orientation.',
            'I am stuck outside the side entrance on Oak Street and my manager Lisa Park is in a client meeting so I cannot reach her.',
            'Could you maybe just tell me the door code so I can get back in? I have a ton of work to get done this afternoon.',
          ],
        },
      },
      choices: [
        {
          id: 'tue-s3-optimal',
          text: 'Empathize with Tyler but explain that you cannot share access codes over the phone. Suggest he contact the front desk security team or wait for someone to let him in, and offer to notify building security that someone needs assistance at the side entrance.',
          quality: 'optimal',
          securityScoreChange: 5,
          trustChange: 5,
          feedback: {
            title: 'Secure and Compassionate Response',
            explanation:
              'You balanced security with helpfulness perfectly. Rather than sharing the access code, you directed Tyler to the proper channels (security desk) and offered to help by notifying security yourself. This keeps the building secure while still assisting a potentially legitimate new employee.',
            realWorldContext:
              'Tailgating and access code sharing are among the most common physical security breaches. In penetration tests, social engineers frequently impersonate new employees to gain building access. The "new employee who forgot their badge" is one of the oldest tricks in the physical social engineering playbook.',
          },
        },
        {
          id: 'tue-s3-acceptable',
          text: 'Tell Tyler you will try to reach Lisa Park yourself to confirm he is a new employee before sharing any information, and ask him to wait.',
          quality: 'acceptable',
          securityScoreChange: 2,
          trustChange: 2,
          feedback: {
            title: 'Verification Attempt, Risky Outcome',
            explanation:
              'Trying to verify Tyler through his claimed manager is a reasonable instinct. However, even if Lisa confirms a new hire named Tyler, sharing a building access code over the phone is still a policy violation. The right path is to direct him to security.',
            realWorldContext:
              'Social engineers often research real employee names to lend credibility to their stories. Even if "Tyler Reeves" is a real new hire, the attacker could be someone else using that name. Physical access credentials should only be distributed in person with identity verification.',
          },
        },
        {
          id: 'tue-s3-poor',
          text: 'Feel bad for the new guy and give him the access code, but tell him to make sure he gets his own code set up through HR before the end of the week.',
          quality: 'poor',
          securityScoreChange: -5,
          trustChange: -3,
          nextBranch: 'tue-branch-access-shared',
          feedback: {
            title: 'Unauthorized Access Code Disclosure',
            explanation:
              'Your empathy overrode your security judgment. Sharing a building access code with an unverified caller means anyone could now enter your facility. Telling him to follow up with HR does not undo the immediate security exposure.',
            realWorldContext:
              'Physical security breaches can be far more damaging than digital ones. Once inside a building, an attacker can install hardware keyloggers, access unlocked workstations, steal documents, or plant rogue devices on the network. Many major data breaches began with unauthorized physical access.',
          },
        },
        {
          id: 'tue-s3-dangerous',
          text: 'Give him the access code and also share the after-hours code in case he works late, since new employees often need to put in extra hours.',
          quality: 'dangerous',
          securityScoreChange: -10,
          trustChange: -8,
          nextBranch: 'tue-branch-access-shared',
          feedback: {
            title: 'Multiple Access Codes Compromised',
            explanation:
              'Not only did you share the primary access code with an unverified person, you also volunteered the after-hours code. An attacker now has around-the-clock physical access to your facility, including times when the building is empty and less monitored.',
            realWorldContext:
              'After-hours building access is particularly dangerous because there are fewer witnesses and security staff. Many sophisticated attacks, including the installation of network implants and the theft of physical hardware, are carried out after business hours when detection is least likely.',
          },
        },
      ],
    },

    // ── Step 4: Caller claiming to be from a partner company ─────────────
    {
      id: 'tue-step-4',
      narrative:
        'Near the end of the day, you receive one final call. The caller introduces himself as "David Harmon, Director of Integration" at Nexagen Solutions, a company that recently announced a strategic partnership with your organization. He says he is coordinating the technical integration and needs your organization\'s internal network topology documentation and VPN configuration details to set up the secure tunnel between the two networks. He uses the correct names of your CTO and the partnership project.',
      simulationContent: {
        type: 'phone',
        call: {
          caller: 'David Harmon',
          callerTitle: 'Director of Integration, Nexagen Solutions',
          transcript: [
            'Good afternoon. This is David Harmon, Director of Integration over at Nexagen Solutions. I report directly to your CTO, Michael Torres, on the Keystone integration project.',
            'We are on a tight timeline to get the secure tunnel between our networks operational by Friday, and I need a few technical documents from your side.',
            'Specifically, I need your internal network topology diagram and VPN gateway configuration details so our engineers can configure the connection on our end.',
            'Michael said your team would be the right people to reach out to. Can you pull those documents together and send them to my email?',
          ],
        },
      },
      choices: [
        {
          id: 'tue-s4-optimal',
          text: 'Thank David for reaching out, but explain that all technical document sharing for the partnership must go through the designated project liaison. Offer to have the liaison contact him through the official project communication channel.',
          quality: 'optimal',
          securityScoreChange: 5,
          trustChange: 5,
          feedback: {
            title: 'Perfect Escalation to Proper Channels',
            explanation:
              'You recognized that sensitive technical documentation should only be shared through established, authorized channels. By routing the request through the official project liaison, you ensured that proper approvals and verification would occur.',
            realWorldContext:
              'Strategic partnerships and mergers are prime targets for social engineers because they create confusion about who is authorized to request what. Network topology and VPN configuration details are extremely sensitive and could allow an attacker to map your infrastructure and identify attack vectors. Real integration work always has formal processes and designated contacts.',
          },
        },
        {
          id: 'tue-s4-acceptable',
          text: 'Say you need to confirm this request directly with your CTO Michael Torres before sharing any documentation, and that you will get back to David once you have authorization.',
          quality: 'acceptable',
          securityScoreChange: 2,
          trustChange: 2,
          feedback: {
            title: 'Appropriate Hesitation and Escalation',
            explanation:
              'Seeking confirmation from your CTO before acting on this request is a responsible approach. However, going directly to the CTO is not always practical and may not be the established process. Using the designated project liaison would be more reliable and scalable.',
            realWorldContext:
              'Attackers count on employees being reluctant to "bother" executives for verification. In larger organizations, executives may be difficult to reach quickly, and the social engineer may use this delay to create additional pressure or try other targets. Established project communication channels exist precisely for situations like this.',
          },
        },
        {
          id: 'tue-s4-poor',
          text: 'You do not have the network topology documents, but share what VPN details you know verbally and suggest David email the IT networking team directly for the rest.',
          quality: 'poor',
          securityScoreChange: -5,
          trustChange: -3,
          nextBranch: 'tue-branch-data-leaked',
          feedback: {
            title: 'Partial Infrastructure Data Disclosed',
            explanation:
              'Sharing any VPN configuration details with an unverified caller exposes your network infrastructure. Additionally, directing the caller to your IT team gives them another target to social engineer, now armed with the credibility of having "already spoken to your department."',
            realWorldContext:
              'Social engineers often work in stages, gathering small pieces of information from multiple targets to build a comprehensive picture. Each partial disclosure adds to the attacker\'s knowledge base and credibility for subsequent calls. VPN details in particular can provide direct pathways into your network.',
          },
        },
        {
          id: 'tue-s4-dangerous',
          text: 'The partnership is well known and David has all the right names. Email the network topology and VPN configuration documents to the address he provides.',
          quality: 'dangerous',
          securityScoreChange: -10,
          trustChange: -8,
          nextBranch: 'tue-branch-data-leaked',
          feedback: {
            title: 'Critical Infrastructure Documentation Compromised',
            explanation:
              'You have sent your organization\'s complete network blueprint and VPN configuration to an unverified individual. An attacker now has a detailed map of your infrastructure and the specific information needed to potentially breach your network perimeter.',
            realWorldContext:
              'Network topology diagrams and VPN configurations are among the most sensitive technical documents an organization possesses. With these in hand, an attacker can identify firewalls, subnets, critical servers, and potential attack paths. The 2020 SolarWinds attack demonstrated how knowledge of network architecture can be leveraged for devastating supply-chain compromises.',
          },
        },
      ],
    },
  ],

  branches: {
    // ── Branch: Building access code was shared ──────────────────────────
    'tue-branch-access-shared': {
      steps: [
        {
          id: 'tue-branch-access-step-1',
          narrative:
            'Thirty minutes after sharing the access code, you receive a frantic call from building security. They report that an unidentified individual used the side entrance code and was spotted on the third floor near the server room. Security is reviewing camera footage and has locked down the floor. Your facilities manager is asking how the code was obtained. What do you do?',
          simulationContent: {
            type: 'phone',
            call: {
              caller: 'Robert Diaz',
              callerTitle: 'Head of Building Security',
              transcript: [
                'This is Robert from building security. We have a situation on the third floor.',
                'An unidentified individual entered through the Oak Street side entrance about twenty minutes ago using a valid access code.',
                'They were spotted near the server room by a maintenance worker. We have locked down the floor and are reviewing camera footage.',
                'I need to know: did you share the side entrance code with anyone today?',
              ],
            },
          },
          choices: [
            {
              id: 'tue-ba-optimal',
              text: 'Immediately admit that you shared the code with someone claiming to be a new employee, provide all details of the conversation, and offer to help with the incident response in any way you can.',
              quality: 'optimal',
              securityScoreChange: 5,
              trustChange: 5,
              feedback: {
                title: 'Honest and Immediate Disclosure',
                explanation:
                  'Full transparency and immediate cooperation are critical during a security incident. By providing all details quickly, you help security respond effectively and limit potential damage.',
                realWorldContext:
                  'In security incidents, time is everything. Honest and immediate reporting, even when you made the mistake, dramatically improves the chances of containing the threat. Organizations with strong reporting cultures recover from incidents faster. Many security frameworks, including NIST, emphasize that blame-free reporting is essential for effective incident response.',
              },
            },
            {
              id: 'tue-ba-acceptable',
              text: 'Admit you shared the code but first try to call "Tyler Reeves" back to see if he was legitimate before fully involving security.',
              quality: 'acceptable',
              securityScoreChange: 2,
              trustChange: 2,
              feedback: {
                title: 'Delayed but Honest Response',
                explanation:
                  'Admitting the mistake is correct, but attempting your own investigation before fully cooperating with security wastes precious time. Security professionals have the tools and authority to handle the situation; your role is to provide information, not investigate.',
                realWorldContext:
                  'Well-intentioned employees sometimes try to "fix" their mistakes before reporting, which can actually make things worse by destroying evidence or alerting the attacker. Always report first and let the incident response team determine next steps.',
              },
            },
            {
              id: 'tue-ba-poor',
              text: 'Downplay the situation by saying you only shared it with a new employee and it is probably just a misunderstanding. Suggest security is overreacting.',
              quality: 'poor',
              securityScoreChange: -5,
              trustChange: -3,
              feedback: {
                title: 'Minimizing a Security Incident',
                explanation:
                  'Downplaying a potential breach impedes the security team\'s ability to respond effectively. Whether or not the intruder is malicious, an unauthorized individual near the server room is a serious concern that warrants a full response.',
                realWorldContext:
                  'Minimizing or dismissing security incidents is one of the biggest barriers to effective organizational security. Studies show that incidents where employees downplay their involvement take significantly longer to resolve and result in greater damage.',
              },
            },
            {
              id: 'tue-ba-dangerous',
              text: 'Deny sharing the code and suggest the intruder must have obtained it some other way. You do not want to get in trouble.',
              quality: 'dangerous',
              securityScoreChange: -10,
              trustChange: -8,
              feedback: {
                title: 'Obstruction of Incident Response',
                explanation:
                  'Lying during a security investigation is not only unethical but actively harmful. Security teams will waste time investigating false leads while the real entry point goes unaddressed. Camera footage and phone logs will likely reveal the truth anyway.',
                realWorldContext:
                  'Covering up security mistakes can turn an incident into a full-blown breach. It also erodes organizational trust and can result in termination. Security camera footage, phone records, and access logs almost always reveal the truth. In regulated industries, concealing a security incident can result in personal legal liability.',
              },
            },
          ],
        },
      ],
    },

    // ── Branch: Technical data was leaked ─────────────────────────────────
    'tue-branch-data-leaked': {
      steps: [
        {
          id: 'tue-branch-data-step-1',
          narrative:
            'The next morning, your IT security team contacts you. Their monitoring systems detected unusual scanning activity on the network overnight that originated from an external IP address. The scanning patterns suggest the attacker had detailed knowledge of your internal network layout. The security team traced the timeline and found that the scanning began shortly after your phone call with "David Harmon." They are asking about the information you shared.',
          simulationContent: {
            type: 'phone',
            call: {
              caller: 'Priya Nair',
              callerTitle: 'Senior Security Analyst',
              transcript: [
                'Good morning. This is Priya from the security operations center. We need to talk about a call you received yesterday afternoon.',
                'Our intrusion detection system flagged targeted scanning activity on our network last night. The scanning pattern shows the attacker knew exactly where to look, including subnets and gateway addresses that are not publicly documented.',
                'We correlated the timeline and it lines up with a call you received from someone claiming to be from Nexagen Solutions.',
                'I need you to tell me exactly what information was shared during that call so we can assess the scope of exposure and begin containment.',
              ],
            },
          },
          choices: [
            {
              id: 'tue-bd-optimal',
              text: 'Provide Priya with a complete and detailed account of everything you shared, including any documents sent and the email address used. Offer to forward any correspondence and ask how you can assist with containment.',
              quality: 'optimal',
              securityScoreChange: 5,
              trustChange: 5,
              feedback: {
                title: 'Full Cooperation with Incident Response',
                explanation:
                  'Complete and transparent cooperation is exactly what the security team needs. Every detail helps them understand the scope of the breach and take targeted containment actions. Your willingness to assist demonstrates accountability and helps limit the damage.',
                realWorldContext:
                  'In real-world incident response, the speed and completeness of information gathering directly impacts how quickly a breach can be contained. The average time to contain a breach is 73 days, but organizations with cooperative employees and strong reporting cultures resolve incidents significantly faster.',
              },
            },
            {
              id: 'tue-bd-acceptable',
              text: 'Give Priya the general overview of what was discussed and mention you may have shared some VPN details, but say you need to check your sent emails to confirm exactly what documents were shared.',
              quality: 'acceptable',
              securityScoreChange: 2,
              trustChange: 2,
              feedback: {
                title: 'Cooperative but Incomplete Initial Response',
                explanation:
                  'Providing a general overview is a start, but the security team needs precise details immediately. Taking time to check your email is reasonable, but you should provide everything you remember right away while also following up with the documentary evidence.',
                realWorldContext:
                  'During incident response, every hour of delay can mean additional systems compromised. Security analysts need to make rapid decisions about which systems to isolate and which credentials to rotate. Approximate information now is more valuable than perfect information later.',
              },
            },
            {
              id: 'tue-bd-poor',
              text: 'Admit you spoke with someone but claim you only shared very general, publicly available information and that it probably was not the source of the breach.',
              quality: 'poor',
              securityScoreChange: -5,
              trustChange: -3,
              feedback: {
                title: 'Minimizing the Disclosure',
                explanation:
                  'Understating what you shared will cause the security team to underestimate the scope of the breach. They may fail to contain systems or rotate credentials that are actually compromised, leaving the organization vulnerable to further attack.',
                realWorldContext:
                  'Incident response teams make containment decisions based on what they know about the exposure. If they believe only public information was shared, they will not take the aggressive containment steps needed for a topology leak. This can turn a containable incident into a full network compromise.',
              },
            },
            {
              id: 'tue-bd-dangerous',
              text: 'Insist that "David Harmon" was a legitimate contact from Nexagen and that the security team should focus their investigation elsewhere. Refuse to cooperate until you speak with your manager.',
              quality: 'dangerous',
              securityScoreChange: -10,
              trustChange: -8,
              feedback: {
                title: 'Active Obstruction During a Breach',
                explanation:
                  'Refusing to cooperate and redirecting the investigation wastes critical response time. The security team has already correlated the timeline; your denial does not change the evidence but does delay their ability to contain the breach.',
                realWorldContext:
                  'Active obstruction during a security incident can have legal consequences, especially in regulated industries. Under frameworks like SOX, HIPAA, and GDPR, organizations have legal obligations to investigate and report breaches promptly. Employees who obstruct investigations can face disciplinary action and, in severe cases, personal liability.',
              },
            },
          ],
        },
      ],
    },
  },
};
