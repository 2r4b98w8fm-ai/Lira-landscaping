/**
 * The Interview Room. The one investigator-side tool on the evidence
 * terminal: sit a person of interest down and question them by text. Each
 * question lands one of four ways —
 *   guilt     — they incriminate themselves (a slip, a contradiction)
 *   cleared   — their answer rules them out
 *   stonewall — no comment, a deflection, nothing
 *   redirect  — they point you at someone else
 * Some questions only unlock once you've found the evidence to press with.
 * Nothing here files the report for you; it sharpens who you file it against.
 */

export type QEffect = "guilt" | "cleared" | "stonewall" | "redirect";

export interface SuspectQuestion {
  id: string;
  q: string;
  /** Item id whose "viewed" state unlocks this question (optional). */
  requiresEvidenceId?: string;
  reply: string;
  effect: QEffect;
  /** For redirect: the suspect id they point you toward. */
  redirectTo?: string;
}

export interface Suspect {
  id: string;
  name: string;
  role: string;
  hue: number;
  intro: string;
  questions: SuspectQuestion[];
}

export interface Interrogation {
  /** Brief framing shown at the top of the interview list. */
  brief: string;
  suspects: Suspect[];
}

const INTERVIEWS: Record<string, Interrogation> = {
  "case-00": {
    brief:
      "Two people of interest. Detective Larry's tip: press them with what you've actually found — a question backed by evidence lands harder. Some answers clear a person, some sink them, and some just point you down the hall.",
    suspects: [
      {
        id: "s00-marnie",
        name: "Marnie Voss",
        role: "the supervisor",
        hue: 8,
        intro: "Voss sits with her arms crossed. “I have a shift to run. Make it quick.”",
        questions: [
          { id: "q00-ma-1", q: "Where were you the night Ray disappeared?", reply: "“Home. Alone. Is that a crime now? I don't have to account for myself to you.”", effect: "stonewall" },
          { id: "q00-ma-2", q: "Why did you tell staff to clock out at 11 and keep working?", requiresEvidenceId: "c00-th-marnie", reply: "“Everyone does it, it's — okay, fine, yes, we adjust the hours, the budget's tight. That's a payroll thing, not a — that's not illegal. Is it illegal?” (It is.)", effect: "guilt" },
          { id: "q00-ma-3", q: "Did you threaten his daughter's tuition?", requiresEvidenceId: "c00-th-marnie", reply: "“I said he should THINK about it. That's not a threat, that's — you have the texts, don't you. Of course you have the texts.”", effect: "guilt" },
          { id: "q00-ma-4", q: "Do you know where Ray is now?", reply: "“No. And honestly? Ask his sister. Whenever things got hard he always ran to Ada's. Go bother her.”", effect: "redirect", redirectTo: "s00-ada" },
        ],
      },
      {
        id: "s00-ada",
        name: "Ada Okonkwo",
        role: "the sister",
        hue: 150,
        intro: "Ada answers on the second ring, quiet, like she doesn't want to wake someone. “…Is this about Ray?”",
        questions: [
          { id: "q00-ad-1", q: "Is Ray with you right now?", requiresEvidenceId: "c00-th-ada", reply: "[a long pause] “…He's asleep in my spare room. He got here safe. He did the right thing, and I'm not sorry, and neither is he.”", effect: "cleared" },
          { id: "q00-ad-2", q: "Did Ray leave on his own?", reply: "“Yes. He planned it. He took his daughter's photo and his coat and he mailed that folder himself. He's not missing. He's HIDING, from her, and there's a difference.”", effect: "cleared" },
          { id: "q00-ad-3", q: "Why didn't he just call the police?", reply: "“Because a scared man doesn't trust that the police will move before Marnie does. So he moved first. Wouldn't you?”", effect: "stonewall" },
        ],
      },
    ],
  },

  "case-12": {
    brief:
      "Three people of interest around 44 Beechmont. Press the homeowner with what the phone actually holds — the wall, the log, the door app — and watch how fast civility becomes something else.",
    suspects: [
      {
        id: "s12-hollis",
        name: "Garrett Hollis",
        role: "the homeowner",
        hue: 20,
        intro: "Hollis folds his hands. “I reported the theft myself, you understand. I am the victim here. Biscuit misses her terribly.”",
        questions: [
          { id: "q12-ho-1", q: "Why did you require your own door app for a dog walker?", requiresEvidenceId: "c12-th-hollis", reply: "“The lock is temperamental. I like a record of who comes and goes. A tidy house is a safe house. Everyone in their room, everyone accounted for.”", effect: "stonewall" },
          { id: "q12-ho-2", q: "What's behind the northeast wall — the room that isn't on the plan?", requiresEvidenceId: "c12-ph-tally", reply: "“There is no room. It's a mechanical chase. You've been listening to a dog and a hysterical girl.” [his hands, for the first time, go still] “…What exactly did she photograph.”", effect: "guilt" },
          { id: "q12-ho-3", q: "Where were you at 3:45 PM on the 17th?", requiresEvidenceId: "case-12.hidden", reply: "“At my Rotary lunch, until two.” (The door app logged him home at 12:50, after a phone alert. He left the lunch early. He knows you can see it. He stops talking.)", effect: "guilt" },
          { id: "q12-ho-4", q: "Who is Adelaide?", reply: "“My mother. Who has been dead fourteen years.” [a very long pause] “Grief makes people keep rooms ready. That's all it is. A room kept ready.”", effect: "guilt" },
        ],
      },
      {
        id: "s12-wagroute",
        name: "WagRoute Support",
        role: "the platform",
        hue: 200,
        intro: "A support rep reads from a script. “Hi! So sorry about Sadie. We take walker safety super seriously! 🐾 How can I help today?”",
        questions: [
          { id: "q12-wr-1", q: "Why did six walkers quit 44 Beechmont in one year?", requiresEvidenceId: "c12-th-wagroute", reply: "“Every client's a journey! For privacy we can't share walker notes. But we're so glad you're asking questions — safety first! 🐾”", effect: "stonewall" },
          { id: "q12-wr-2", q: "Did Sadie really send that resignation?", reply: "“It came from her account at 4:21 PM! …Though our stylometry flag does say it doesn't match her prior 1,400 messages. You might want to talk to whoever had her phone. We just process the messages.”", effect: "redirect", redirectTo: "s12-hollis" },
        ],
      },
      {
        id: "s12-okabe",
        name: "Mrs. Okabe",
        role: "the neighbor (Mochi's owner)",
        hue: 280,
        intro: "Mrs. Okabe pours tea you can't drink through a phone. “Sadie was a good girl. She asked me the strangest questions, right at the end.”",
        questions: [
          { id: "q12-ok-1", q: "What did Sadie ask you about?", requiresEvidenceId: "c12-th-okabe", reply: "“Adelaide Hollis. Whether she liked oranges. I said she grew them in pots in the northeast room — and dear, the moment I said it, Sadie went white. That poor man's mother. That terrible, terrible son.”", effect: "redirect", redirectTo: "s12-hollis" },
          { id: "q12-ok-2", q: "Did you know Adelaide was declared dead in 2011?", reply: "“Dead? I waved at her in the upstairs window not two years ago. I assumed she'd gone into a home. …Oh. Oh, I've been waving at that window for years, haven't I.”", effect: "cleared" },
        ],
      },
    ],
  },

  "case-16": {
    brief:
      "Three voices around the WVRN overnight, and one you can't quite place. Keep the operator talking; press the intern's old boss; let corporate stonewall. The trace does the rest.",
    suspects: [
      {
        id: "s16-denny",
        name: "Denny Folkes",
        role: "the fired intern",
        hue: 265,
        intro: "Folkes answers on a line that shouldn't connect. He sounds calm. He sounds like 3 AM. “You've been reading her phone. Good. The hour always finds a new voice.”",
        questions: [
          { id: "q16-de-1", q: "Have you been living in the transmitter shack?", requiresEvidenceId: "case-16.hidden", reply: "“I've been KEEPING it. Six years. Somebody has to raise the mic, cue the light, keep a live voice on the air. You wouldn't understand what goes quiet if I stop.”", effect: "guilt" },
          { id: "q16-de-2", q: "You called at 3:11 on the ninth. Then you left the shack. Where did you go?", requiresEvidenceId: "c16-pin-shack", reply: "[a pause, the sound of a road] “…To the studio. To turn the key myself, since she never would. I was patient for six years. The hour wasn't, that last night. Neither was I.”", effect: "guilt" },
          { id: "q16-de-3", q: "Who taught you the hour needs a live voice?", reply: "“The caller did. Same as he taught Royce, in '79. I just answered the phone. …You should be careful. You're on the air right now too. It's very late where you are.”", effect: "redirect", redirectTo: "s16-caller" },
        ],
      },
      {
        id: "s16-marlon",
        name: "Marlon",
        role: "the old board engineer",
        hue: 30,
        intro: "Marlon exhales. “I quit that shift in 2018 and I'd rather not talk about the 3:33 caller, if it's all the same to you.”",
        questions: [
          { id: "q16-ma-1", q: "Tell me about Denny.", requiresEvidenceId: "c16-th-marlon", reply: "“Intern, '17, '18. Obsessed with the overnight, with Royce, with the whole 1979 thing. When they automated the show he swore it 'needed a live voice or it would come looking.' We let him go. If he's out at that shack, Del is in trouble.”", effect: "redirect", redirectTo: "s16-denny" },
          { id: "q16-ma-2", q: "Did you have anything to do with Del's disappearance?", reply: "“God, no. I haven't set foot in that building in seven years. I got OUT. That's the whole reason I'm still — look, I have an alibi a mile long and a therapist who'll confirm every minute of it. I got out.”", effect: "cleared" },
        ],
      },
      {
        id: "s16-corp",
        name: "WVRN Corporate",
        role: "the licensee",
        hue: 210,
        intro: "A media-relations voice, very smooth. “We're happy to clarify: the overnight is a pre-recorded program. There is no live host. Any live voice is a known audio artifact.”",
        questions: [
          { id: "q16-co-1", q: "Then who rewired the request line you cut in 2019?", requiresEvidenceId: "c16-m-gi-5", reply: "“We have no record of any rewiring. The transmitter is unmanned. …The power-draw discrepancy is under internal review. We'd prefer you direct further questions to our counsel.”", effect: "stonewall" },
          { id: "q16-co-2", q: "Did you know someone was broadcasting from your transmitter?", reply: "“We knew the meters were… irregular. We chose not to escalate. That is a negligence question for the regulators, not a police matter. It is not our man out there. We'd remind you of that.”", effect: "redirect", redirectTo: "s16-denny" },
        ],
      },
      {
        id: "s16-caller",
        name: "the 3:33 caller",
        role: "unknown · no ring, no duration",
        hue: 340,
        intro: "The line was already open before you dialed. Someone is breathing on it, unhurried, in no hurry at all.",
        questions: [
          { id: "q16-ca-1", q: "Who are you?", reply: "“I'm the part of the night that stays open after everyone hangs up. Royce knew me. Del knew me. You're getting to know me. Play Harbor Lights and I'll introduce myself properly.”", effect: "stonewall" },
          { id: "q16-ca-2", q: "Where is Del?", reply: "“Closer than the trace will ever reach. She kept the light on for me, right to the end — and then she pointed at her sister, clever girl, so the hour would find its next voice. …You're not alone out there.” [the line does not disconnect. it was never connected.]", effect: "stonewall" },
        ],
      },
    ],
  },

  "case-17": {
    brief:
      "Three at the Marlibel, and a fourth on an internal line that rings from a room the elevator won't visit. Adler will talk you in circles until you press him with the ledger; the bellman knows more than he'll carry.",
    suspects: [
      {
        id: "s17-adler",
        name: "Howard Adler",
        role: "the hotel owner",
        hue: 26,
        intro: "Adler, 71, sits very still. “Miss Sunder didn't finish her business day. That's all I know. Auditors come and go. It's a difficult shift.”",
        questions: [
          { id: "q17-ad-1", q: "Eleven permanent guests draw benefits and pay you rent. Explain that.", requiresEvidenceId: "case-17.hidden", reply: "[a breath] “…They're on the books. Their folios balance. I administer their affairs as payee. There's paperwork for all of it.” (There are no death certificates. He knows you know.) “…Yes. Fine. Yes. That part I did.”", effect: "guilt" },
          { id: "q17-ad-2", q: "What happened when Priya went up the service stairs?", requiresEvidenceId: "c17-vm-adler", reply: "“I told her to come DOWN. On my camera, I watched that door open and I — do you understand I spent fifty years making sure no one had to see what I saw at sixteen? I told her to come down. I am not the thing on those stairs.”", effect: "guilt" },
          { id: "q17-ad-3", q: "Who is in Room 813?", reply: "“Mr. Ganz. Since 1971. He pays cash and he asks for nothing but a tray and a light in the hall.” [his voice drops] “He was here before my father. Ask the room yourself. It'll answer you. It answers everyone who reads the book.”", effect: "redirect", redirectTo: "s17-813" },
        ],
      },
      {
        id: "s17-reggie",
        name: "Reggie Alvarez",
        role: "the bellman (22 years)",
        hue: 190,
        intro: "Reggie won't look at the camera. “Twenty-two years I've worked here. Ask me anything except what's up those stairs.”",
        questions: [
          { id: "q17-re-1", q: "You carry a tray to 813 every night. What's in the room?", requiresEvidenceId: "c17-th-reggie", reply: "“I leave the tray at a door the wall says isn't there and I walk away and I stopped checking if it comes back empty a long time ago. It comes back empty. That's all I've got. That's all I let myself have.”", effect: "redirect", redirectTo: "s17-813" },
          { id: "q17-re-2", q: "Did you have any part in what happened to Priya?", reply: "“No. God, no. I liked her. She noticed things in a week that took me twenty years not to notice on purpose. I gave my key card to the police the same morning. Check the logs. I was in the lobby all night.”", effect: "cleared" },
        ],
      },
      {
        id: "s17-813",
        name: "Room 813",
        role: "permanent guest · since 1971",
        hue: 40,
        intro: "The front-desk bell rings three times on an internal line to a room that isn't on the panel. Then, courtly, unhurried: “Good evening. You balanced me. It's only polite to answer back.”",
        questions: [
          { id: "q17-81-1", q: "Where is Priya Sunder?", reply: "“The tray is set for two. It has been set for two since 1971. Mr. Coble learned his manners; he's just down the hall. She reads the book, your auditor. I do so hate to eat alone.”", effect: "stonewall" },
          { id: "q17-81-2", q: "What are you?", reply: "“A guest. The oldest one. A house that can hide one room can keep anything, and a man learned that from me in 1971 and built a tidy little fraud on top of it. He is yours to arrest. I am not. The hall light is still out. I have asked since Nixon.”", effect: "redirect", redirectTo: "s17-adler" },
        ],
      },
    ],
  },
};

export function interrogationFor(caseId: string): Interrogation | undefined {
  return INTERVIEWS[caseId];
}
