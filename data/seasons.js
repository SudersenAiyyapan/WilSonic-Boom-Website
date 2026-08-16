/* ─────────────────────────────────────────────────────────────────────────
   SEASONS
   One entry per FTC season. The first entry in the list is treated as the
   current season; everything after it is archive.

   When next season starts, add a new object at the TOP of this array.
   Do not delete the old one — the archive is the point.
   ───────────────────────────────────────────────────────────────────────── */

const SEASONS = [
  {
    key: 'decode',
    game: 'DECODE',
    years: '2025–26',
    status: 'complete',           // 'complete' | 'current' | 'upcoming'
    summary:
      'Our first season. Fourth of fifteen at regionals, a finalist alliance ' +
      'with Wilsobotics, and two awards — including Think, for design process.',

    // Headline numbers shown on the home page. Keep to three.
    headline: [
      { value: '2',     label: 'Awards won' },
      { value: '4th',   label: 'of 15 at regionals' },
      { value: '33001', label: 'FTC team number', mono: true },
    ],

    awards: [
      {
        name: 'Think Award',
        event: 'Langley Park Regional',
        note: 'For design process and engineering reasoning.',
      },
      {
        name: 'Sustain Award',
        event: 'UK Championships',
        note: 'For building a team that lasts.',
      },
    ],

    events: [
      {
        name: 'Scrimmages',
        venue: 'Langley Park School',
        result: null,
        note: 'First time on a competition field. Our intake failed under pressure, which drove the V2 redesign.',
      },
      {
        name: 'Regional Championship',
        venue: 'Langley Park School',
        result: '4th of 15',
        note: 'Finalist alliance with Wilsobotics. Won the Think Award. Qualified for the UK Championships.',
      },
      {
        name: 'UK Championships',
        venue: 'Copper Box Arena, London',
        result: '27th of 50',
        note: 'Won the Sustain Award.',
      },
    ],

    robot: {
      versions: ['V1', 'V2'],
      subsystems: ['Drivetrain', 'Intake', 'Shooter', 'Transfer'],
      // Fill these in from the notes — leave a value null and it is hidden.
      specs: [
        { label: 'Motors',        value: '8' },
        { label: 'Drivetrain',    value: 'Mecanum' },
        { label: 'Gear ratio',    value: null },
        { label: 'Flywheel RPM',  value: null },
        { label: 'Weight',        value: null },
        { label: 'Cycle time',    value: null },
        { label: 'Auto points',   value: null },
      ],
      software:
        'Colour sensors and motors detect and sort game elements. In autonomous, ' +
        'a webcam reads AprilTags to navigate the field and score without a driver.',
      cad: 'Onshape',
    },
  },
];
