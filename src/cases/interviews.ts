/**
 * The Interview Room — a branching interrogation. You don't pick from a fixed
 * Q&A; you pick a TACTIC, and the suspect's composure moves. Press too hard
 * and they wall up and lawyer out. Read them right — sympathy here, a bluff
 * there, the evidence at the exact moment it bites — and their composure
 * breaks and they say the thing they came in swearing they never would.
 *
 * Every line can shift their composure, raise their guard, gate on evidence,
 * set a flag that unlocks a later line, or end the interview one of four ways:
 *   confession — they break and incriminate themselves
 *   cleared    — their account rules them out
 *   clammed    — they shut down / demand a lawyer (retry resets their guard)
 *   redirect   — they hand you the next name
 */

export type Tactic = "press" | "empathize" | "bluff" | "evidence" | "probe";
export type Outcome = "confession" | "cleared" | "clammed" | "redirect";

export interface Line {
  id: string;
  tactic: Tactic;
  /** What you say. */
  text: string;
  /** How they answer. */
  reply: string;
  /** Only selectable once this evidence id has been viewed. */
  requiresEvidenceId?: string;
  /** Availability window on their composure (0–100). */
  minComposure?: number;
  maxComposure?: number;
  /** Only selectable after this flag is set / never after. */
  needFlag?: string;
  blockFlag?: string;
  /** Sets a flag when chosen. */
  setFlag?: string;
  /** Composure delta (negative cracks them). */
  composure?: number;
  /** Guard delta (positive walls them up; hits guardMax → they clam). */
  guard?: number;
  /** Re-selectable if false. Default true (ask once). */
  once?: boolean;
  /** Terminal outcome. */
  outcome?: Outcome;
  redirectTo?: string;
}

export interface Suspect {
  id: string;
  name: string;
  role: string;
  hue: number;
  /** Starting composure, 0–100. */
  composure: number;
  /** Walls needed before they lawyer up. Default 3. */
  guardMax?: number;
  intro: string;
  lines: Line[];
  /** Shown if they clam up. */
  clamReply?: string;
}

export interface Interrogation {
  brief: string;
  suspects: Suspect[];
}

const INTERVIEWS: Record<string, Interrogation> = {
  // -------------------------------------------------------------------------
  "case-00": {
    brief:
      "Two people of interest. Detective Larry's coaching you: pick an APPROACH, not just a question. Watch their composure. Sympathy opens people up; going in hot makes them wall off and call a lawyer. Press with evidence you've actually found and it lands twice as hard.",
    suspects: [
      {
        id: "s00-marnie",
        name: "Marnie Voss",
        role: "the supervisor",
        hue: 8,
        composure: 100,
        guardMax: 3,
        clamReply: "“We're done here. Anything else goes through the company's lawyer. Don't contact me again.”",
        intro: "Voss sits with her arms crossed and her chin up. “I've got a shift to run. And I know my rights.”",
        lines: [
          { id: "m-open-hostile", tactic: "press", text: "You made him disappear because he wouldn't play along.", reply: "“Excuse me? I run a cleaning crew, not a — how DARE you. I want that on the record as an accusation.” (She's bristling. You've put a wall up.)", composure: 6, guard: 1 },
          { id: "m-liar", tactic: "press", text: "Stop lying. We both know what you did to him.", reply: "“I do not have to sit here and be called a liar. I know my rights, and I'm about done using them politely.”", composure: 5, guard: 2 },
          { id: "m-open-soft", tactic: "empathize", text: "Budgets are brutal. Nobody trains you for the pressure they put on a supervisor.", reply: "“…Thank you. Finally. Yes. Corporate gives me a number and I have to make it work, and Ray acted like I invented the whole system to spite him personally.”", composure: -15, setFlag: "rapport" },
          { id: "m-hours", tactic: "evidence", text: "You told staff to clock out at 11 and keep working. It's in his texts.", requiresEvidenceId: "c00-th-marnie", reply: "“It's — okay. Fine. We adjust the hours. Everyone does it. That's a payroll thing, that's not — is that actually illegal?” (It is. She knows it is.)", composure: -25 },
          { id: "m-tuition", tactic: "press", text: "You threatened his daughter's tuition to shut him up.", requiresEvidenceId: "c00-th-marnie", needFlag: "rapport", reply: "“I said he should THINK about his family. That's — I was scared, okay? He had a FOLDER. I panicked. I never touched him, I swear to God I never touched him. I just wanted the folder gone.”", composure: -30 },
          { id: "m-break", tactic: "press", text: "So you scared a good man into running. That's on you.", maxComposure: 45, needFlag: "rapport", reply: "“…He ran? He's — okay. Okay, yes, I threatened his job, I cooked the timesheets, I'm the reason he bolted. Write it down. But that's ALL. I did wage theft, not a — I'm not a monster. Is he okay?”", composure: -40, outcome: "confession" },
          { id: "m-where", tactic: "probe", text: "Where do you think Ray went?", reply: "“How would I know? Ask his sister. Whenever it got hard he ran to Ada's. He's probably on her couch right now feeling righteous.”", composure: 2, outcome: "redirect", redirectTo: "s00-ada" },
        ],
      },
      {
        id: "s00-ada",
        name: "Ada Okonkwo",
        role: "the sister",
        hue: 150,
        composure: 100,
        intro: "Ada answers quietly, like she doesn't want to wake someone in the next room. “…Is this about Ray?”",
        lines: [
          { id: "a-accuse", tactic: "press", text: "You know where he is and you're hiding him.", reply: "“Hiding? He's my little brother and he's SAFE, which is more than your paperwork managed to keep him. If that's a crime, cuff me.”", composure: 4, guard: 1 },
          { id: "a-soft", tactic: "empathize", text: "You're clearly protecting someone you love. I just want him safe too.", reply: "[a breath] “…Then we want the same thing. He's asleep in my spare room. He got here on his own two feet. He did the brave thing and I'm not sorry.”", composure: -20, setFlag: "trusts", outcome: "cleared" },
          { id: "a-plan", tactic: "probe", text: "Did Ray leave on his own?", needFlag: "trusts", reply: "“Every step of it. Took his daughter's photo, took his coat, mailed that folder himself. He's not missing. He's hiding — from HER — and there's a world of difference.”", composure: -5, outcome: "cleared" },
        ],
      },
    ],
  },

  // -------------------------------------------------------------------------
  "case-12": {
    brief:
      "Three around 44 Beechmont. Hollis is armor-plated politeness — go at him head-on and he'll wall up and call a lawyer. Warm him up, then drop the wall, the log, and the door app on him at the right beat and watch the civility crack.",
    suspects: [
      {
        id: "s12-hollis",
        name: "Garrett Hollis",
        role: "the homeowner",
        hue: 20,
        composure: 100,
        guardMax: 3,
        clamReply: "“I've been more than patient. I won't say another word without my attorney present. Biscuit and I would like you to leave.”",
        intro: "Hollis folds his hands with a small, courteous smile. “I reported the theft myself, you'll recall. I'm the injured party here.”",
        lines: [
          { id: "h-hot", tactic: "press", text: "Cut it out. There's a woman behind your wall.", reply: "“That is a grotesque thing to say to a grieving man. I'll be noting your name.” (His smile hardens. That was too fast.)", composure: 8, guard: 1 },
          { id: "h-monster", tactic: "press", text: "You're a monster, Garrett, and everyone's going to know it.", reply: "“Name-calling. How professional. I rather think we're finished here, detective.”", composure: 6, guard: 2 },
          { id: "h-charm", tactic: "empathize", text: "It's a beautiful old house. Must be a lot to keep up, all alone.", reply: "“It is. People don't appreciate the discipline a house demands. Everyone in their room, everyone accounted for. That's how a home stays… peaceful.”", composure: -12, setFlag: "warm" },
          { id: "h-app", tactic: "evidence", text: "You made a dog walker install your own door app. Why keep a diary of a stranger's comings and goings?", requiresEvidenceId: "c12-th-hollis", reply: "“I like a record. Is that a crime? A tidy house is a safe house.” (A flicker. He doesn't like that you led with the app.)", composure: -14 },
          { id: "h-wall", tactic: "evidence", text: "Sadie photographed inside the northeast chase. Tally marks. Two handprints. One still red.", requiresEvidenceId: "c12-ph-tally", needFlag: "warm", reply: "[his hands, for the first time, go completely still] “…That room is a mechanical chase. There is nothing in it. …What else did she photograph. Tell me exactly what she photographed.”", composure: -30 },
          { id: "h-alibi", tactic: "bluff", text: "You left your Rotary lunch at 12:50 after a phone alert. The door app puts you home before she got out.", requiresEvidenceId: "case-12.hidden", needFlag: "warm", reply: "“I— the alert was a false alarm, I went home to— that proves nothing. That proves a man went into his own home.” (He's arguing with the log now. He's losing.)", composure: -22 },
          { id: "h-break", tactic: "press", text: "Say her name, Garrett. Say Adelaide.", maxComposure: 40, needFlag: "warm", reply: "“…Mother is comfortable. Mother has ALWAYS been comfortable. Fourteen years I kept her safe in the only room no one could take her from, and that girl UNLOCKED it, and I— [he stops] …I'd like my lawyer. But yes. The room is mine. Everything in that room is mine.”", composure: -40, outcome: "confession" },
          { id: "h-adelaide", tactic: "probe", text: "Who does the tray on the eighth stair— I mean, who's Adelaide?", blockFlag: "warm", reply: "“My mother. Dead fourteen years. Grief makes a man keep a room ready. I won't be baited into theatrics.”", composure: 3 },
        ],
      },
      {
        id: "s12-okabe",
        name: "Mrs. Okabe",
        role: "the neighbor",
        hue: 280,
        composure: 100,
        intro: "Mrs. Okabe folds a dish towel. “Sadie was a good girl. She asked me the strangest questions, right at the end.”",
        lines: [
          { id: "ok-oranges", tactic: "probe", text: "What did Sadie want to know?", requiresEvidenceId: "c12-th-okabe", reply: "“Whether Adelaide Hollis liked oranges. I said she grew them in pots in the northeast room — and the girl went white as a sheet. That poor woman. That terrible, terrible son.”", composure: -10, outcome: "redirect", redirectTo: "s12-hollis" },
          { id: "ok-dead", tactic: "bluff", text: "You know Adelaide was declared dead in 2011?", reply: "“Dead? I waved to her in the upstairs window not two years ago. I assumed a care home. …Oh. Oh, I've been waving at that window for years, haven't I. Oh, Adelaide.”", composure: -8, outcome: "cleared" },
        ],
      },
    ],
  },

  // -------------------------------------------------------------------------
  "case-16": {
    brief:
      "Denny answers a line that shouldn't connect, calm as 3 AM. Attack him and he retreats into scripture about 'the hour.' Meet him where he lives — the loneliness, the keeping — then close with the trace, and he'll tell you what he did.",
    suspects: [
      {
        id: "s16-denny",
        name: "Denny Folkes",
        role: "the fired intern",
        hue: 265,
        composure: 100,
        guardMax: 3,
        clamReply: "“You're not listening. You're just another daytime voice. …I have to go raise the mic. Don't call this line again.” [the line goes to dead air]",
        intro: "Folkes picks up before it rings. He sounds calm. He sounds like the late show. “You've been reading her phone. Good. The hour always finds a new voice.”",
        lines: [
          { id: "d-stalker", tactic: "press", text: "You're a stalker who couldn't take being fired.", reply: "“Fired. Such a small word for what they did. They tried to let the hour go DARK. I'm not a stalker. I'm the KEEPER.” (He's retreating into the sermon. Wrong door.)", composure: 6, guard: 1 },
          { id: "d-freak", tactic: "press", text: "You're out of your mind, you know that?", reply: "“Everyone says that who's never sat alone with the silence at 3 a.m. I'm DONE explaining the hour to daylight people.” (The line hisses. He's shutting you out.)", composure: 4, guard: 2 },
          { id: "d-lonely", tactic: "empathize", text: "Eight miles out, alone, keeping a dead man's show alive. That's a lonely kind of faithful.", reply: "“…It is. Nobody sees the keeping. You raise the mic at 1:59 and hold the light and no one ever thanks you. Del understood, a little. At the end she understood a lot.”", composure: -18, setFlag: "seen" },
          { id: "d-shack", tactic: "evidence", text: "You've been living in the transmitter shack for six years. The console has your name on it.", requiresEvidenceId: "case-16.hidden", reply: "“I've been KEEPING it. Somebody has to raise her mic, cue the ON AIR light, hold the request line open. You call it living there. I call it a vigil.”", composure: -20 },
          { id: "d-trace", tactic: "bluff", text: "We traced the 3:11 call. It left the shack and drove eight miles. We know where you went.", requiresEvidenceId: "c16-pin-shack", needFlag: "seen", reply: "[a pause; the sound of a road under him] “…To the studio. To turn the key myself, since she never would. Six years I was patient. That last night the hour wasn't, and neither was I.”", composure: -26 },
          { id: "d-break", tactic: "press", text: "You drove there and you took her, Denny. Say it.", maxComposure: 40, needFlag: "seen", reply: "“I kept the LIGHT on. She wouldn't play the song, so the light needed a new hand on it, and I— …somebody has to keep the light on. You'll see. It's very late where you are. It's about to be your show.”", composure: -40, outcome: "confession" },
          { id: "d-caller", tactic: "probe", text: "Who taught you the hour needs a live voice?", reply: "“The caller did. Same as he taught Royce in '79. I only ever answered the phone.”", composure: 2, outcome: "redirect", redirectTo: "s16-caller" },
        ],
      },
      {
        id: "s16-marlon",
        name: "Marlon",
        role: "the old board engineer",
        hue: 30,
        composure: 100,
        intro: "Marlon exhales. “I quit that shift in 2018 and I'd rather not talk about the 3:33 caller.”",
        lines: [
          { id: "ma-you", tactic: "press", text: "Maybe you never really left. Maybe it was you out there.", reply: "“Me? I have an alibi a mile long and a therapist who'll confirm every minute of the last seven years. I got OUT. That's the whole point of me. Don't put that shack on me.”", composure: 5, guard: 1, outcome: undefined },
          { id: "ma-denny", tactic: "empathize", text: "You're scared of that place. I get it. Who should I be scared of?", reply: "“…Denny. Intern, '17, '18. Obsessed with the overnight, with Royce, with 1979. When they automated the show he swore it 'needed a live voice or it would come looking.' If he's at that shack, Del is in real trouble.”", composure: -12, outcome: "redirect", redirectTo: "s16-denny" },
        ],
      },
      {
        id: "s16-caller",
        name: "the 3:33 caller",
        role: "unknown · no ring, no duration",
        hue: 340,
        composure: 100,
        guardMax: 9,
        intro: "The line is already open when you lift it. Someone breathes on the other end, unhurried, in no hurry at all.",
        lines: [
          { id: "c-who", tactic: "probe", text: "Who are you?", reply: "“I'm the part of the night that stays open after everyone hangs up. Royce knew me. Del knew me. Play Harbor Lights and I'll introduce myself properly.”", composure: 0 },
          { id: "c-del", tactic: "press", text: "Where is Del?", reply: "“Closer than your trace will ever reach. She kept the light on for me, right to the end — then pointed at her sister, clever girl, so the hour would find its next voice. …You're not alone out there.” [the line does not disconnect. it was never connected.]", composure: 0 },
        ],
      },
    ],
  },

  // -------------------------------------------------------------------------
  "case-17": {
    brief:
      "Adler is seventy years of tidy denial. He'll talk you in circles about paperwork forever — until you press him with the ledger and the camera at the exact beat. Strangely, the harder truth is the one he WANTS to say. The bellman knows more than he'll carry.",
    suspects: [
      {
        id: "s17-adler",
        name: "Howard Adler",
        role: "the hotel owner",
        hue: 26,
        composure: 100,
        guardMax: 3,
        clamReply: "“I've indulged this long enough. My lawyer will handle the rest. The Marlibel has nothing further to say.”",
        intro: "Adler, 71, sits very still, hands flat on the table. “Miss Sunder didn't finish her business day. Auditors come and go. It's a difficult shift.”",
        lines: [
          { id: "ad-hot", tactic: "press", text: "You killed her to bury the fraud.", reply: "“That is slander, and I have counsel. The books balance. Everything at the Marlibel balances.” (Rehearsed. He's done this in his head a thousand times.)", composure: 7, guard: 1 },
          { id: "ad-body", tactic: "press", text: "Enough games. Where's the body, Howard?", reply: "“That is an obscene thing to put to a man my age. I won't dignify it, and I won't sit for much more of it.”", composure: 5, guard: 2 },
          { id: "ad-old", tactic: "empathize", text: "You've carried this hotel — and something in it — a very long time. Since you were young.", reply: "“…Since I was sixteen. You have no idea what a boy can be made to keep quiet about, in a building like this. Fifty years I've kept it quiet.”", composure: -16, setFlag: "young" },
          { id: "ad-ledger", tactic: "evidence", text: "Eleven permanent guests draw federal benefits and pay you rent. No death certificates. Explain that.", requiresEvidenceId: "case-17.hidden", reply: "“They're on the books. Their folios balance. I administer their affairs as payee.” [a long breath] “…There are no certificates because there are no deaths on file. Yes. That part I did. That part is mine.”", composure: -26 },
          { id: "ad-camera", tactic: "evidence", text: "Your camera caught the service door open. You called Priya and begged her to come down.", requiresEvidenceId: "c17-vm-adler", needFlag: "young", reply: "“I watched that door open and I was SIXTEEN again. I begged her. I have spent fifty years making sure no one had to see what's up those stairs, and she went UP, and I couldn't— I told her to come down. God, I told her to come down.”", composure: -30 },
          { id: "ad-break", tactic: "press", text: "Then tell me what's in 813, Howard. Get it off you.", maxComposure: 45, needFlag: "young", reply: "“The fraud is mine — the eleven, the money, all of it, charge me, I'll sign it tonight. But the room is NOT mine. Mr. Ganz was here before my father. He taught us a house that hides one room can keep anything. I only ever… kept the books. She's HIS. I am so sorry. She's his.”", composure: -40, outcome: "confession" },
          { id: "ad-813", tactic: "probe", text: "Who is in Room 813?", blockFlag: "young", reply: "“Mr. Ganz. Since 1971. Cash, a tray, a light in the hall. Ask the room yourself. It answers everyone who reads the book.”", composure: 3, outcome: "redirect", redirectTo: "s17-813" },
        ],
      },
      {
        id: "s17-reggie",
        name: "Reggie Alvarez",
        role: "the bellman (22 years)",
        hue: 190,
        composure: 100,
        intro: "Reggie won't look at the camera. “Twenty-two years. Ask me anything except what's up those stairs.”",
        lines: [
          { id: "re-you", tactic: "press", text: "You carry the tray up there every night. Maybe you're in on it.", reply: "“In on it? I gave my key card to the police that same morning. I was in the lobby all night, check the logs. I just carry a tray to a door and walk away. That's my whole crime — walking away.”", composure: 5, guard: 1 },
          { id: "re-tray", tactic: "empathize", text: "You've been walking away for a long time. It's okay to stop now.", reply: "“…She noticed in a WEEK what took me twenty years not to notice on purpose. The tray goes up. It comes back empty. Every night. I stopped letting myself do the math. Talk to the room. Talk to Adler. Don't make me carry it anymore.”", composure: -14, outcome: "redirect", redirectTo: "s17-813" },
        ],
      },
      {
        id: "s17-813",
        name: "Room 813",
        role: "permanent guest · since 1971",
        hue: 40,
        composure: 100,
        guardMax: 9,
        intro: "A front-desk bell rings three times on an internal line to a room the elevator won't visit. Then, courtly: “Good evening. You balanced me. It's only polite to answer back.”",
        lines: [
          { id: "r-where", tactic: "press", text: "Where is Priya Sunder?", reply: "“The tray is set for two. It has been since 1971. Mr. Coble learned his manners; he's just down the hall. Your auditor reads the book. I do so hate to eat alone.”", composure: 0 },
          { id: "r-what", tactic: "probe", text: "What are you?", reply: "“A guest. The oldest one. A house that can hide one room can keep anything — a man learned that from me in 1971 and built his tidy little fraud on top of it. He is yours to arrest. I am not. The hall light is still out. I have asked since Nixon.”", composure: 0, outcome: "redirect", redirectTo: "s17-adler" },
        ],
      },
    ],
  },
};

export function interrogationFor(caseId: string): Interrogation | undefined {
  return INTERVIEWS[caseId];
}
