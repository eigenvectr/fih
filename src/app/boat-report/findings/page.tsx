import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Cpu, Hammer, Search, Paintbrush, Wrench } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata = {
  title: "Inspection findings · 2018 Alumacraft Pro 185",
  description:
    "What we found inspecting the 2018 Alumacraft Pro 185 on the lot — verdicts, fixes, costs, and the console restoration plan.",
};

/* ---------------------------------- data ---------------------------------- */

const CONFIRMED: { label: string; detail: string }[] = [
  {
    label: "Engine: Evinrude E-TEC 115 H.O. G1 — confirmed twice over",
    detail:
      "Settles the listing's 115-vs-150 contradiction; the hull's 115 hp max rating is matched correctly. The EMM report's model code (A115GHLAFI) and four cylinders of injector data confirm the G1 1.7L V4, built late 2017 for model year 2018 — good news: longest parts run and simplest rigging of anything Evinrude made. Realistic top speed low-to-mid 40s; WOT target 5,500–6,000 RPM.",
  },
  {
    label: "Prop: 4-blade stainless, clean",
    detail:
      "Straight blades, no dings, intact skeg. The listing said 3-blade — the 4-blade is actually the better fishing prop (see reference below).",
  },
  {
    label: "Electronics: Humminbird Helix 7 CHIRP G2",
    detail:
      "The smaller, older end of the Helix line — roughly $150–250 used. Works, but it's a modest unit; the listing's vague \"Helix GPS/FF\" oversold it.",
  },
  {
    label: "Storage: outdoors, uncovered, for years",
    detail:
      "The pattern is unmistakable — cracked rigging boot, peeling console finish, hazed screen, seat seams letting go, and a brand-new mooring cover in the deal. Explains both the low hours and the cosmetic wear.",
  },
  {
    label: "Batteries: new — and trailer tires check out",
    detail:
      "Confirmed at the lot: fresh batteries (a $400–800 risk off the table) and trailer tires in good shape. The fuel line and primer bulb also checked out fine once wiped down. Real points in the boat's favor.",
  },
  {
    label: "Water test: PASSED — and the boat is ours",
    detail:
      "Purchased August 2026 at $14,800 out the door after trade. The on-water test came back clean. Remaining before/after delivery: seat repair (dealer), rigging boot (owner DIY, cosmetic), impeller service (book it — still owed on the schedule), and the Garmin dash project below.",
  },
  {
    label: "EMM report pulled — the engine's history checks out",
    detail:
      "Hours verified at 72:31 (the ad was honest). No active faults. Never overheated in its life (max 196°F, alarm threshold ~211°F, zero overheat codes). Winterization routine logged 9 times — put away properly every season despite living outside. Max RPM ever 6,243, so it revs out. Histogram shows a troller's life: ~61% at/below 1,600 RPM, ~17% at full load. Injector data confirms G1 V4, 2017-built for model year 2018. Two shop questions remain: early-life Code 38 oil-feedback faults (12×, all in the first 19 hours, none in the 53 hours since — likely initial oil-line priming) and nuisance TPS Code 11s (last one 33 engine-hours ago). Since resolved: the water test passed at 47 mph GPS. Compression check remains a worthwhile add-on at the first impeller service.",
  },
];

const EMM_ROWS: [string, string, string][] = [
  ["Model code", "A115GHLAFI", "G1 E-TEC 115 H.O., 20\" shaft — the engine it's supposed to be"],
  ["Engine hours", "72:31:22", "Ad claimed 72.5 — the hours are TRUE"],
  ["Max RPM ever", "6,243", "Revs past 6,000: healthy breathing, prop pitch right"],
  ["Max head temps", "192 / 196°F", "Alarm is ~211°F — never overheated once, zero overheat codes"],
  ["EMM max temp", "144.5°F", "The $3k computer has lived cool its whole life"],
  ["Start cycles", "524", "~7 starts per running hour — normal fishing duty"],
  ["Oil setting", "XD100", "Programmed for the premium synthetic — keep using it"],
  ["Break-in", "Completed", "Done by the book"],
  ["Current faults", "None", "Nothing wrong right now that the computer can see"],
  ["Record status", "Initial pull", "First report ever — the hour counter was never reset"],
];

const EMM_CODES: { code: string; verdict: string; body: string }[] = [
  {
    code: "Code 21 · Winterization Activated ×9",
    verdict: "The best line on the page",
    body: "The self-fogging winterize routine ran nine times — roughly every fall of its life. The boat sat outside cosmetically, but the engine was put to bed correctly every season. Sun kills dashboards; winter kills powerheads — this one was protected from the killer that matters.",
  },
  {
    code: "Code 38 · Oil Pressure Feedback Not Detected ×12 + 15:49 No-Oil Time",
    verdict: "The one real question — likely benign",
    body: "~16 minutes of running without confirmed oil delivery — but every occurrence sits in the first 19 hours of life (first at 4 minutes), then nothing in the 53 hours since. Textbook first-rigging oil-line priming, and E-TECs cut to reduced-power protection during oil faults. Shop question: \"Code 38s all cluster in the first 19 hours and never recur — confirm oil feedback reads good today and pull a plug to check the wash.\" Compression is the final proof it left no scar.",
  },
  {
    code: "Code 11 · TPS Out of Idle Range ×21",
    verdict: "Nuisance",
    body: "Every snapshot shows RPM=0 — key-on moments, usually a nudged throttle during starting. Last occurrence 33 engine-hours ago, calibration value present. One sentence to the shop: verify TPS cal while you're in there.",
  },
  {
    code: "RPM histogram · 61% at/below 1,600 · 17% at 5,000–6,000",
    verdict: "Ideal usage fingerprint",
    body: "Hundreds of hours at trolling speed (there's the Vermont lake troller) balanced by regular hard clean runs — which DI two-strokes like; it keeps carbon down. No lugging signature, no abuse signature. If you designed the ideal life for this motor, it would look like this histogram.",
  },
];

type Verdict = "cosmetic" | "minor" | "monitor" | "good";

const verdictStyle: Record<Verdict, { label: string; cls: string }> = {
  cosmetic: {
    label: "Cosmetic",
    cls: "bg-amber-500/10 text-amber-700 dark:bg-amber-400/10 dark:text-amber-400",
  },
  minor: {
    label: "Minor fix",
    cls: "bg-amber-500/10 text-amber-700 dark:bg-amber-400/10 dark:text-amber-400",
  },
  monitor: {
    label: "Watch it",
    cls: "bg-sky-500/10 text-sky-700 dark:bg-sky-400/10 dark:text-sky-400",
  },
  good: {
    label: "Good news",
    cls: "bg-emerald-600/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400",
  },
};

const FINDINGS: {
  title: string;
  verdict: Verdict;
  photo: string;
  alt: string;
  what: string;
  fix: string;
}[] = [
  {
    title: "Console panel finish is peeling",
    verdict: "cosmetic",
    photo: "/boat/console.jpg",
    alt: "Dash panels with finish peeling in large patches around the gauges and switches",
    what: "The gray textured finish on both dash panels is delaminating in sheets from UV exposure — bare substrate showing around the speedo, Helix, and switch panel. Function is unaffected; every gauge and switch works.",
    fix: "Fully restorable as a DIY weekend job — see the restoration guide below for the step-by-step. Budget roughly $50–80 in materials, or $200–400 if a shop does it.",
  },
  {
    title: "Helix 7 screen is hazed and spotted",
    verdict: "cosmetic",
    photo: "/boat/helix.jpg",
    alt: "Humminbird Helix 7 screen with water spotting and haze",
    what: "Dried mineral spots and UV haze on the display — the unit powers on and functions normally. Either water spotting (cleanable) or the anti-glare coating delaminating (permanent but harmless).",
    fix: "Try 50/50 distilled water and white vinegar on a microfiber first, gentle passes only — no ammonia cleaners, no abrasives on a coated screen. If the coating itself is gone, live with it or replace the unit (~$200 used). Details in the restoration guide.",
  },
  {
    title: "Rigging boot cracked, clamp broken",
    verdict: "minor",
    photo: "/boat/rigging.jpg",
    alt: "Rigging tube entering the engine with cracked boot, and the fuel line with primer bulb",
    what: "The big ribbed tube is the rigging conduit — battery cables, harness, and control lines running into the engine. Its rubber entry boot has split and the clamp failed, letting rain at the wiring. The fuel line alongside it is proper 3/8\" SAE J30R9 and checked out fine — surface mildew wiped off, bulb pumps firm.",
    fix: "Now an owner to-do: judged cosmetic at closing and deferred (dealer ran out of time). Boot and clamp are a $20–60 part and an easy first DIY with the new M12 ratchet — while it's apart, check the connectors under the cowl for corrosion (corroded connections are what kill the $3,000 EMM).",
  },
  {
    title: "Seat seams splitting (vinyl itself is good)",
    verdict: "minor",
    photo: "/boat/seats.jpg",
    alt: "Cockpit seats — vinyl and carpet in healthy shape overall, with seam stitching letting go",
    what: "Stitching letting go at the seams while the vinyl stays supple — classic outdoor storage, since UV kills the thread years before the vinyl. The interior photo shows the good news: vinyl, foam, and carpet are fundamentally healthy. This is the cheap version of seat damage: re-stitching, not replacement.",
fix: "Resolved in the deal: the dealer is having the seats repaired before delivery. (Re-stitching runs $50–150 a seat versus ~$1,000 new — the cheap version of seat damage, as predicted.)",
  },
  {
    title: "Batteries, charger, and fuel tank — the good compartment",
    verdict: "good",
    photo: "/boat/batteries.jpg",
    alt: "Battery compartment with two Interstate SRM-27 deep-cycle batteries, onboard charger, and the poly fuel tank",
    what: "Two Interstate SRM-27 marine deep-cycles (the Ulterra's 24V bank), clean posts, proper clamp terminals with boot covers — no wing nuts — plus a verified Minn Kota MK 315D onboard charger: 3 banks at 5A each, digital multi-stage, covering both trolling batteries and the start battery. Factory-tidy wiring throughout. The 20-gal poly fuel tank above shows surface mildew (cosmetic) with proper marine fuel hose and an intact sender.",
    fix: "Nothing to fix. Habit to build: 5A per bank is maintenance-sized, so plug in right after trips — a deep-discharged trolling bank is an overnight recharge. Add \"including Minn Kota MK315D onboard charger\" to the buyer's order equipment line.",
  },
  {
    title: "Ulterra decoded: Bluetooth, built 2021, with built-in sonar",
    verdict: "good",
    photo: "/boat/bow.jpg",
    alt: "Minn Kota Ulterra 80 BT with Universal Sonar 2, produced 2021",
    what: "The data label settles everything: ULTERRA80/US2/IP-60\" BT — 24V Ulterra 80, i-Pilot, Bluetooth, 60\" shaft, produced in 2021, so the boat's most expensive accessory is three years newer than the boat. US2 means Universal Sonar 2: a transducer built into the trolling motor's lower unit.",
    fix: "The remote turned up after all — so you have the full stack: remote + the Minn Kota One-Boat Network app (supports all 2017+ Bluetooth i-Pilot systems) + foot pedal. Check the remote's battery and pair both. Future project: a ~$40 US2 adapter cable feeds the built-in transducer to a bow-mounted fish finder — move the Helix up front and run two sonar stations.",
  },
  {
    title: "Ulterra's i-Pilot remote: found after all",
    verdict: "minor",
    photo: "/boat/bow.jpg",
    alt: "Minn Kota Ulterra on the bow, sold with foot pedal only and no i-Pilot remote",
    what: "Resolved: the remote surfaced at the dealership after being reported missing. For the record while it was lost — The pedal runs steering, speed, trim, and stow/deploy — but Spot-Lock and autopilot live in the i-Pilot remote, so without one those features are dead. The likely free fix: 2018-era Ulterras are usually Bluetooth i-Pilot — check the control head for a Bluetooth logo, and if it's there, Minn Kota's free i-Pilot phone app controls everything including Spot-Lock.",
    fix: "Check the remote's battery, pair it, and test Spot-Lock from both remote and app at the water test. The $250 signing ask is closed — spend the goodwill on the service booking instead.",
  },
  {
    title: "Sealant squeeze-out at the engine mount",
    verdict: "monitor",
    photo: "/boat/mount.jpg",
    alt: "Engine mounting bracket with aged sealant around the transom bolts",
    what: "The cream-colored material around the mounting bolts is marine sealant, not a leak — bolts get bedded in it so water can't wick into the transom holes. It's aged, dirty, and cracking. On an aluminum transom there's no wood to rot, so stakes are low.",
fix: "The water test came back clean — no weeping found. Owner to-do someday: trim the crusty old squeeze-out for looks, and glance at the transom bolts in the bilge once a season. Otherwise, forget it.",
  },
  {
    title: "Pass-through plate with exposed foam",
    verdict: "monitor",
    photo: "/boat/passthru.jpg",
    alt: "Black plate with two oval openings in the carpeted side panel, yellow foam visible inside",
    what: "A rod/wiring pass-through into the side cavity — the yellow material inside is the hull's flotation foam, which is supposed to be there. Ragged foam in a boat stored outside is worth a second look, though.",
    fix: "One-time rodent check: sniff the lockers, look for droppings, shredded foam, or chewed wire insulation in compartment corners and under the console. Clean = forget it. Chewed wiring = real money; renegotiate.",
  },
  {
    title: "Edge-guard gaps and chipped welds",
    verdict: "cosmetic",
    photo: "/boat/edge.jpg",
    alt: "Bow gunwale with rub rail end, stitch welds, and paint chips",
    what: "Small gaps where the rub-rail trim meets the hull, plus paint chips and minor white oxidation along the stitch welds. The trim is a protective bumper above the waterline, not a seal — the gaps are normal aluminum-boat construction.",
    fix: "Nothing required. Touch-up paint on the chips stops the oxidation spots from growing; part of the cosmetic tally, not a repair.",
  },
  {
    title: "4-blade stainless prop",
    verdict: "good",
    photo: "/boat/prop.jpg",
    alt: "Four-blade stainless steel propeller, clean blades, intact skeg",
    what: "Clean, undinged 4-blade stainless (the listing said 3-blade — wrong again, but in your favor). Four blades trade 1–3 mph of top speed for better hole shot, grip in chop, low-speed planing, and trolling control — the right prop for how this boat will fish.",
fix: "Nothing to fix — and confirmed at the water test: 47 mph GPS with the engine pulling cleanly. The prop is right for this boat.",
  },
];

/* ------------- console restoration guide (deep-research results) ------------ */

const RESTORE_INTRO =
  "Note: the BBT replacement-plate project below supersedes this guide for the main dash insert — if that route happens, this refinish applies only to the lower switch panel and other plastics. Verified: the dash is a thermoformed plastic insert panel (mounted on the fiberglass console) with a factory textured coating that lost adhesion from UV — a documented weak point on Alumacraft consoles of this era, so this is normal aging, not damage. Fully DIY-restorable: about $100 in materials and a weekend, with cure time doing most of the waiting. Before painting anything, check Great Lakes Skipper and eBay for the exact factory panel — many list under $150, and swapping beats refinishing.";

const RESTORE_STEPS: { step: string; detail: string }[] = [
  {
    step: "Confirm the substrate.",
    detail:
      "Look at the panel's back side: uniform-color plastic with vacuum-forming marks = ABS-type plastic; visible resin and glass strands = fiberglass. The process below works for both — but never use chemical paint stripper on the plastic; it attacks ABS.",
  },
  {
    step: "Pull the panel and strip what's failing.",
    detail:
      "Remove (or carefully mask) the gauges and switches. Lift the peeling coating with a plastic scraper or razor held at a low angle. Rule: anything that still won't scrape off after scuffing has earned its place — leave it and feather it.",
  },
  {
    step: "Sand.",
    detail:
      "180–220 grit to knock down and feather the edges of the remaining coating, then 320–400 over the whole panel so the new coating has tooth. Don't chase perfection — the texture coat hides feathered edges.",
  },
  {
    step: "Clean like it matters, because it does.",
    detail:
      "Scrub with dish soap and a gray Scotch-Brite pad, rinse, dry, then wipe with a plastic prep solvent (SEM Plastic & Leather Prep) in one direction until water no longer beads on the surface. No silicone dressings anywhere near the job.",
  },
  {
    step: "Adhesion promoter — the step the factory skipped, apparently.",
    detail:
      "SEM Plastic Adhesion Promoter (or Bulldog): one light coat, flash 5 minutes; one wet coat, flash 10–15; topcoat within 30 minutes. This is the difference between a finish that lasts and repeating the factory's failure.",
  },
  {
    step: "Texture coat to hide the scars.",
    detail:
      "SEM Texture Coating (#39853, ~$20/can) — spray distance and speed control the texture from fine to heavy. Optional, but it's what makes a repaired panel look factory instead of painted.",
  },
  {
    step: "Topcoat with the marine-rated stuff.",
    detail:
      "SEM Marine Vinyl Coat in satin or low-luster, 2–3 light coats — it's flexible and formulated with extra UV inhibitors specifically for boat dashes (regular SEM Color Coat is interior-rated; this boat lives outside). Satin hides flaws; gloss advertises them. Let it cure several days before reinstalling gauges.",
  },
];

const RESTORE_NOTES: string[] = [
  "Budget route: Krylon Fusion or Rust-Oleum Textured (~$30–50 total) over the same prep and adhesion promoter is serviceable, but owners report it going soft and chipping within a season or two outdoors. The SEM system (~$100) is the one actually rated for this environment.",
  "Alternatives, in order of sense: exact factory panel from Great Lakes Skipper/eBay ($75–250, fastest); marine-grade cast vinyl wrap ($30–60 — dashes hit 140°F+, so edges must be heat-set or they lift); custom SeaDek dash pad (~$100–300, hides everything, very durable); pro shop respray ($300–600 — overkill for one panel).",
  "Helix 7 screen: mild soapy water or distilled water with a splash of white vinegar on microfiber, gentle passes. Never regular Windex, ammonia, or alcohol — they dissolve the anti-glare coating, as do sunscreen and bug spray. Haze inside the unit is condensation and clears after an hour of running. If the anti-glare layer is already ruined, the accepted salvage is polishing it off entirely (Novus 2/PlastX by hand) and fitting a ~$12 anti-glare screen protector — better economics than Humminbird's $150–300 flat-rate repair on an aging G2 when a new Helix 7 G4 runs ~$550–680.",
  "Faded trim and gauge bezels: Solution Finish (~$17, lasts about a year) or CeraKote Trim Coat (~$20, bonds semi-permanently) actually work; oil and silicone dressings wash off in weeks. 303 Marine Protectant every 3–5 weeks as the maintenance layer — but not on gauge lenses or clear plastics.",
];

const RESTORE_SOURCES: { label: string; url: string }[] = [
  { label: "SEM — refinishing interior plastic, step by step", url: "https://semproducts.com/blog/4-easy-steps-to-refinishing-interior-plastic" },
  { label: "SEM Texture Coating (product + prep spec)", url: "https://semproducts.com/product/texture-coating" },
  { label: "SEM Marine Vinyl Coat (UV-rated marine topcoat)", url: "https://www.overtons.com/sem-marine-vinyl-coat-spray-307790.html" },
  { label: "Great Lakes Skipper — Alumacraft dash panels", url: "https://www.greatlakesskipper.com/boat-parts/boat-consoles-panels/gauge-and-dash-panels/l/manufacturer:alumacraft" },
  { label: "Humminbird — proper screen maintenance", url: "https://humminbird-help.johnsonoutdoors.com/hc/en-us/articles/4413206460695-Proper-Maintenance-for-Your-Humminbird-Unit" },
  { label: "Humminbird — display screen issues (condensation, coatings)", url: "https://humminbird-help.johnsonoutdoors.com/hc/en-us/articles/4412799208727-Display-Screen-Issues" },
  { label: "SeaDek — custom dash pads", url: "https://www.seadek.com/custom-seadek-dash-pad/" },
  { label: "303 Marine Protectant (maintenance UV layer)", url: "https://www.goldeagle.com/product/303-marine-recreation-aerospace-protectant/" },
  { label: "BBT — 2018-2019 Alumacraft Pro 175/185/XB200 Single Dash Mount", url: "https://bassboattech.com/boat-brand/alumacraft/2018-2019-alumacraft-pro-175-185-xb200/2018-2019-alumacraft-pro-175-185-xb200-single-dash-mount" },
  { label: "Garmin — LiveScope 2 launch (July 2026)", url: "https://www.garmin.com/en-US/newsroom/press-release/marine/garmin-launches-livescope-2-its-clearest-live-sonar-yet/" },
  { label: "LiveScope 2 head-unit compatibility guide", url: "https://carolinasportsmanoutfitters.com/pages/garmin-livescope-2-compatibility" },
];

/* ------------------------------ owner projects ------------------------------ */

const PROJECTS: { title: string; status: string; body: string }[] = [
  {
    title: "Dash rebuild: the BBT plate answers the panel-or-mount question — it's both",
    status: "Unblocked · order for the UHD 93sv",
    body: "Bass Boat Technologies' \"2018-2019 Alumacraft Pro 175/185/XB200 Single Dash Mount\" ships as a complete REPLACEMENT dash plate: 3/16\" powder-coated aircraft aluminum with the graph mount pre-installed, dropping into the factory dash-insert opening with hardware included. The sun-baked panel comes out entirely — one part (~$350–450 based on their other hulls; exact price unlisted) fixes the ugly dash AND mounts the Garmin, and owner reviews are uniformly \"rock solid, no wobble.\" Our unit is settled: the ECHOMAP UHD 93sv from the Mirrocraft — a 9\" screen, comfortably within the standard Single mount (MEGA is for 10\"+). The old \"will it fit the panel\" stop-work is moot: the panel leaves the boat. Order spec'd for the UHD 93sv; the unit hangs on its own factory bail bracket, so find the bail in the parts pulled from the old boat or buy one (~$40). One call to BBT (706-217-6161): confirm price, confirm the 93sv is in their dropdown, confirm the speedo and switch panel transfer into the plate's cutouts, and order from the 2018-2019 page — the 2015 Pro 185 uses a different plate. Also check the pulled parts for the old transducer: if it stayed on the Mirrocraft's transom, the dash 93sv is GPS/mapping-only until a transom ducer is added (GT56UHD, ~$270).",
  },
  {
    title: "LiveScope: a separate bow-station build (resolved by the model number)",
    status: "Future purchase · architecture set",
    body: "Our UHD 93sv is a first-generation UHD — it CANNOT run LiveScope 2 (July 2026: no black box, $1,999 LVS44 / $2,199 LVS42HD, but only on ECHOMAP UHD2 sv, Ultra/Ultra 2, and GPSMAP platforms). That settles the architecture in favor of the plan anyway: the bow becomes its own self-contained station — a LiveScope-2-capable head unit up front (UHD2 sv ~$850, or Ultra 2 for a bigger screen) plus the LVS44 on the Ulterra. The 93sv keeps the dash job it's good at: charts, waypoints, 2D sonar. The budget alternative — legacy LiveScope Plus (LVS34 + GLS 10, ~$1,600) feeding the 93sv — puts the screen at the dash, the wrong end of the boat for forward-facing sonar, and leans on a discontinued black box. Skip it; save for the bow station.",
  },
  {
    title: "LiveScope rigging on the Ulterra, when the day comes",
    status: "Parts list saved",
    body: "Barrel mount only, never shaft-clamped — the Ulterra's auto stow/deploy telescoping shaft can't carry clamped weight or loose cables (LiveScope 2 includes the barrel mount; the legacy LVS34 barrel mount is $40). Leave a ~10\" cable service loop across the pivot and verify a full stow/deploy cycle before the first trip. Power it from a dedicated 12V LiFePO4 (20–30Ah, ~$100–200) rather than the trolling bank — isolates it from motor interference and keeps it alive all day at its ~2–5A draw.",
  },
  {
    title: "Meanwhile: the Helix, the boot, and the impeller",
    status: "Near-term list",
    body: "Helix 7 stays at the dash until the BBT plate arrives, then becomes the placeholder bow unit — a ~$40 US2 adapter cable connects it to the Ulterra's built-in transducer for a free bow sonar station until the LiveScope build replaces it (then sell it, ~$100–150). The rigging boot ($20–60) is the first DIY with the new M12 ratchet: replace boot and clamp, check the connectors under the cowl while it's open. And book the impeller service with the compression check — the one maintenance item still owed from the purchase checklist.",
  },
];

/* ------------------------- owner's quick reference ------------------------- */

const REFERENCE: { title: string; body: string }[] = [
  {
    title: "Wide-open throttle: 5,500–6,000 RPM — our boat runs 47 mph",
    body: "Measured at the August 2026 water test: 47 mph GPS, the top of the predicted 43–47 range — the benchmark for every future season. If a future WOT run comes up meaningfully short of that at similar load: check prop for dings and RPM first. Well under 5,500 and slow = over-propped or something tired (below 5,500 is lugging — genuinely harmful, not a tune-up item). Over 6,000 but slow = pitch or hull drag. A slow drift from the benchmark over years usually just means a dinged prop or a fouled bottom.",
  },
  {
    title: "Primer bulb squeeze test",
    body: "Squeeze until firm — it should pump up and stay firm (check valves holding). Flex it and look for spider-web cracking; smell for raw gas seeping through the rubber. Soft, cracked, or smelly = replace the whole fuel line assembly (~$40). Surface mildew alone means nothing.",
  },
  {
    title: "E-TEC basics worth knowing",
    body: "No belts, no valves, no scheduled oil changes — it injects oil from a reservoir (use XD50/XD100). Regular 87-octane gas; premium buys nothing. It self-winterizes with an automatic fogging routine. Water pump impeller every ~3 years on a boat that sits. The EMM computer logs true hours, RPM history, and faults — any Evinrude dealer can pull the report, and it's the motor's real service record.",
  },
  {
    title: "Keep the EMM alive",
    body: "The EMM (~$3,000, the known E-TEC failure) dies two ways: overheating from blocked cooling passages, and voltage spikes from loose battery connections. Real locking nuts on clean battery terminals — never wing nuts — and always confirm the tell-tale water stream when running.",
  },
  {
    title: "3-blade vs 4-blade, in one paragraph",
    body: "More blades = more grip, less slip: quicker hole shot, less bow rise, stays on plane slower, steadier in turns and chop, smoother trolling. Cost: 1–3 mph off the top and a touch of fuel at WOT. For fishing, the 4-blade wins; pitch must still let the engine hit rated RPM.",
  },
  {
    title: "After any saltwater day (Milford routine)",
    body: "Flush the engine on muffs 10–15 minutes. Wash hull, trailer, and rinse the Ulterra (it's the freshwater model — salt isn't covered by Minn Kota's warranty). Rinse livewell plumbing. Before the first salt season: swap the magnesium anodes for zinc or aluminum ones.",
  },
  {
    title: "The starter toolbox",
    body: "Core: cordless ratchet (Milwaukee M12 3/8\" is the marine-mechanic classic) or drill with nut-driver bits, 1/4\"+3/8\" socket set in SAE and metric with deep sockets, impact bits including #2/#3 Phillips and square-drive. Installs: ratcheting crimper + marine heat-shrink connectors, heat gun, multimeter, fuses, 3M 4200 for any hole you drill. Service: 3/8\" torque wrench, prop-nut deep socket, plug socket, gearcase oil pump (they fill from the bottom), Triple-Guard grease, flushing muffs. The rule that saves this aluminum boat: Tef-Gel every stainless thread going into aluminum, and hand-start every fastener before power touches it — stainless-into-aluminum galls and snaps.",
  },
  {
    title: "Boat that sits = check these each spring",
    body: "Fuel: fresh gas, StaBil in the offseason, inspect the bulb and lines. Tell-tale stream at first start. Trailer tire date codes (age out at ~6 years regardless of tread). Battery voltage after winter. Ten minutes that prevents most on-water failures.",
  },
];

/* --------------------------------- helpers --------------------------------- */

function SectionHeading({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-faint">
      <Icon className="h-3.5 w-3.5" />
      {children}
    </h2>
  );
}

/* ----------------------------------- page ---------------------------------- */

export default function FindingsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pt-4 sm:px-6">
      <header className="mb-5 flex items-center gap-2">
        <Link
          href="/boat-report"
          aria-label="Back to boat report"
          className="rounded-full p-2 text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-semibold tracking-tight">
            Inspection findings
          </h1>
          <p className="truncate text-xs text-ink-muted">
            Inspected in person at CR&apos;s Marine · August 2026
          </p>
        </div>
        <ThemeToggle />
      </header>

      {/* confirmed */}
      <section>
        <SectionHeading icon={CheckCircle2}>Settled at the lot</SectionHeading>
        <ul className="space-y-2">
          {CONFIRMED.map((c) => (
            <li key={c.label} className="rounded-xl border border-line bg-surface p-4">
              <p className="text-sm font-semibold">{c.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{c.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* EMM readout */}
      <section className="mt-8">
        <SectionHeading icon={Cpu}>EMM report readout — the engine&apos;s biography</SectionHeading>
        <div className="rounded-xl border border-line bg-surface p-4">
          <div className="overflow-x-auto">
            <table className="w-full min-w-105 text-sm">
              <thead>
                <tr className="border-b border-line text-left text-[11px] uppercase tracking-wide text-ink-faint">
                  <th className="pb-2 pr-3 font-semibold">Field</th>
                  <th className="pb-2 pr-3 font-semibold">Reading</th>
                  <th className="pb-2 font-semibold">Verdict</th>
                </tr>
              </thead>
              <tbody>
                {EMM_ROWS.map(([k, v, m]) => (
                  <tr key={k} className="border-b border-line/60 last:border-0">
                    <td className="py-2 pr-3 whitespace-nowrap">{k}</td>
                    <td className="py-2 pr-3 font-semibold whitespace-nowrap">{v}</td>
                    <td className="py-2 text-ink-muted">{m}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <ul className="mt-2 space-y-2">
          {EMM_CODES.map((c) => (
            <li key={c.code} className="rounded-xl border border-line bg-surface p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <p className="text-sm font-semibold">{c.code}</p>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
                  {c.verdict}
                </p>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{c.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-2 rounded-xl border border-line bg-surface p-4 text-sm leading-relaxed text-ink-muted">
          <strong className="text-ink">Mechanic&apos;s verdict: 9/10 engine history — and the water
          test passed at 47 mph GPS.</strong> The only deduction was the early-life oil quirk, 53
          clean hours stale. What the EMM cannot see — impeller rubber, gearcase oil — is what
          the first service covers; add a compression check there for the complete baseline.
          This is as well-documented as a used E-TEC purchase gets.
        </p>
      </section>

      {/* findings */}
      <section className="mt-8">
        <SectionHeading icon={Search}>Findings, verdicts & fixes</SectionHeading>
        <ul className="space-y-3">
          {FINDINGS.map((f) => {
            const v = verdictStyle[f.verdict];
            return (
              <li key={f.title} className="overflow-hidden rounded-xl border border-line bg-surface">
                <Image
                  src={f.photo}
                  alt={f.alt}
                  width={1000}
                  height={750}
                  className="max-h-72 w-full object-cover"
                />
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold">{f.title}</p>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${v.cls}`}
                    >
                      {v.label}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{f.what}</p>
                  <p className="mt-2 text-sm leading-relaxed">
                    <span className="font-semibold">The fix: </span>
                    <span className="text-ink-muted">{f.fix}</span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* restoration */}
      <section className="mt-8">
        <SectionHeading icon={Paintbrush}>Console restoration guide</SectionHeading>
        <div className="rounded-xl border border-line bg-surface p-4">
          <p className="text-sm leading-relaxed text-ink-muted">{RESTORE_INTRO}</p>
          <ol className="mt-3 space-y-3">
            {RESTORE_STEPS.map((s, i) => (
              <li key={s.step} className="flex gap-3 text-sm leading-relaxed">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-surface-2 text-[11px] font-semibold text-ink-muted">
                  {i + 1}
                </span>
                <span>
                  <span className="font-semibold">{s.step} </span>
                  <span className="text-ink-muted">{s.detail}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-4 space-y-2 border-t border-line pt-3">
            {RESTORE_NOTES.map((n) => (
              <p key={n} className="text-sm leading-relaxed text-ink-muted">
                {n}
              </p>
            ))}
          </div>
          <div className="mt-4 border-t border-line pt-3">
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
              Sources
            </p>
            <ul className="space-y-1">
              {RESTORE_SOURCES.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-accent hover:underline"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* projects */}
      <section className="mt-8">
        <SectionHeading icon={Hammer}>Owner projects — the Garmin dash plan</SectionHeading>
        <ul className="space-y-2">
          {PROJECTS.map((pr) => (
            <li key={pr.title} className="rounded-xl border border-line bg-surface p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <p className="text-sm font-semibold">{pr.title}</p>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
                  {pr.status}
                </p>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{pr.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* reference */}
      <section className="mt-8 mb-4">
        <SectionHeading icon={Wrench}>Owner&apos;s quick reference</SectionHeading>
        <ul className="space-y-2">
          {REFERENCE.map((r) => (
            <li key={r.title} className="rounded-xl border border-line bg-surface p-4">
              <p className="text-sm font-semibold">{r.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{r.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
