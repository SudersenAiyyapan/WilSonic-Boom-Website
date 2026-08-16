/* ─────────────────────────────────────────────────────────────────────────
   TEAM ROSTER
   Edit this file to add, remove or change a team member. Nothing else.

   photo:  a file in images/team/. Leave as null and an initial is shown.
   group:  'design' or 'programming' — which sub-team they sit in.
   lead:   true puts them in the Leads row at the top of the Team page.
   ───────────────────────────────────────────────────────────────────────── */

const TEAM = [
  // ── Leads ──────────────────────────────────────────────────────────────
  { name: 'Sudersen', role: 'Project Manager',     group: 'design',      lead: true,  photo: 'images/team/sudersen.jpg' },
  { name: 'Liang',    role: 'Design Manager',      group: 'design',      lead: true,  photo: 'images/team/liang.jpg' },
  { name: 'Anvesh',   role: 'Design Manager',      group: 'design',      lead: true,  photo: 'images/team/anvesh.jpg' },
  { name: 'Vatsal',   role: 'Outreach Manager',    group: 'design',      lead: true,  photo: 'images/team/vatsal.jpg' },
  { name: 'Razi',     role: 'Programming Manager', group: 'programming', lead: true,  photo: 'images/team/razi.jpg' },

  // ── Design team ────────────────────────────────────────────────────────
  { name: 'Akshat',   role: 'Portfolio Manager',   group: 'design',      lead: false, photo: 'images/team/akshat.jpg' },
  { name: 'Siddarth', role: 'Team Member',         group: 'design',      lead: false, photo: 'images/team/siddarth.jpg' },
  { name: 'Savith',   role: 'Team Member',         group: 'design',      lead: false, photo: 'images/team/savith.jpg' },
  { name: 'Adrij',    role: 'Team Member',         group: 'design',      lead: false, photo: 'images/team/adrij.jpg' },
  { name: 'Avyukth',  role: 'Team Member',         group: 'design',      lead: false, photo: 'images/team/avyukth.jpg' },
  { name: 'Jonathan', role: 'Team Member',         group: 'design',      lead: false, photo: 'images/team/jonathan.jpg' },
  { name: 'Shratul',  role: 'Team Member',         group: 'design',      lead: false, photo: 'images/team/shratul.jpg' },
  { name: 'Zachary',  role: 'Team Member',         group: 'design',      lead: false, photo: 'images/team/zachary.jpg' },
  { name: 'Srihan',   role: 'Team Member',         group: 'design',      lead: false, photo: null },

  // ── Programming team ───────────────────────────────────────────────────
  { name: 'Dhir',     role: 'Team Member',         group: 'programming', lead: false, photo: 'images/team/dhir.jpg' },
  { name: 'Sriram',   role: 'Team Member',         group: 'programming', lead: false, photo: 'images/team/sriram.jpg' },
  { name: 'Thajan',   role: 'Team Member',         group: 'programming', lead: false, photo: 'images/team/thajan.jpg' },
];
