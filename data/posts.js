/* ─────────────────────────────────────────────────────────────────────────
   BLOG POSTS
   Newest first. Each post gets its own URL via blog.html?post=<slug>,
   so individual posts can be linked and shared.

   tag:  'Sponsor' | 'Build' | 'Competition' | 'Team'
   body: plain HTML. Keep it to <p>, <ul>, <li>, <strong>, <a>.
   ───────────────────────────────────────────────────────────────────────── */

const POSTS = [
  {
    slug: 'accu-partnership',
    title: 'Introducing Accu as Our Partner',
    date: '2026-01-30',
    tag: 'Sponsor',
    image: 'images/sponsors/Accu-logo.png',
    imageIsLogo: true,
    excerpt: 'Accu Components join us — precision screws, thread gauges and calipers for precision engineering work.',
    body: `
      <p>We are thrilled to announce <strong>Accu Components</strong> as our newest sponsor.</p>
      <p>Accu are a fast-growing company who help engineers and innovators bring their ideas to life. Their components reach billions of people worldwide, and they blend cutting-edge technology with passionate people to deliver an award-winning experience to customers all over the world.</p>
      <p>They sell everything from precision screws to thread gauges and calipers — all essential for precision engineering work like ours.</p>
      <p>Their commitment to quality lines up with how we like to build. We are excited to have them on board.</p>
      <p>Visit them at <a href="https://accu.co.uk/" target="_blank" rel="noopener noreferrer">accu.co.uk</a>.</p>
    `,
  },
  {
    slug: 'gwr-fasteners-partnership',
    title: 'Introducing GWR Fasteners as Our Partner',
    date: '2026-01-16',
    tag: 'Sponsor',
    image: 'images/sponsors/GWR-fasteners.png',
    imageIsLogo: true,
    excerpt: 'GWR Fasteners join the team — precision components and special fasteners for automotive and engineering.',
    body: `
      <p>We are proud to welcome <strong>GWR Fasteners</strong> to our sponsor family.</p>
      <p>GWR are a British company serving the automotive and engineering markets with precision components and special fasteners. Their range runs from screws, bolts and nails through to power tools and workwear.</p>
      <p>As a team that leans heavily on quality fasteners, having GWR's support is invaluable. Their range means we can nearly always get exactly the part a build needs.</p>
      <p>Check them out at <a href="https://www.gwr-fasteners.co.uk/" target="_blank" rel="noopener noreferrer">gwr-fasteners.co.uk</a>.</p>
    `,
  },
  {
    slug: 'robot-v2',
    title: 'Starting Version 2 of Our Robot',
    date: '2026-01-05',
    tag: 'Build',
    image: 'images/robot/slideshow/IMG20251211180748.jpg',
    excerpt: 'Everything we learned from V1, applied. Stiffer structure, better cable management, faster cycles.',
    body: `
      <p>After weeks of testing and refining our first design, we have officially kicked off V2. This iteration takes what we learned from the first build and pushes it further.</p>
      <p>V2 focuses on:</p>
      <ul>
        <li>Improved structural rigidity for more consistent performance</li>
        <li>Better cable management to prevent mid-match failures</li>
        <li>Faster cycle times, based on our scrimmage data</li>
        <li>Better driver ergonomics and control response</li>
      </ul>
      <p>The lessons from V1 were worth more than the robot itself. Every jam and every missed shot told us something specific, and all of it is going into this build.</p>
    `,
  },
  {
    slug: 'first-scrimmages',
    title: 'First Scrimmages & Testing',
    date: '2025-12-05',
    tag: 'Competition',
    image: 'images/team/team-working.jpg',
    video: 'videos/scrimmages/scrimmages-testing.mp4',
    excerpt: 'Our first time on a competition field — and the moment we found out our intake could not cope.',
    body: `
      <p>We completed our first scrimmage and it was an enormous learning experience. Going from practice sessions to real competition scenarios showed us what the robot could do, and exactly where it could not.</p>
      <p>What we took away:</p>
      <ul>
        <li>Our intake could not perform under pressure, which drove some drastic design changes</li>
        <li>The drivetrain handled the competition field surface well</li>
        <li>Our autonomous routine needed timing work</li>
        <li>Driver communication needed far more practice</li>
      </ul>
      <p>Watching our robot run alongside other teams gave us perspective. We saw strategies we had not considered, and found the areas where we are genuinely strong.</p>
    `,
  },
  {
    slug: 'east-loop-partnership',
    title: 'Introducing East Loop Components as Our Partner',
    date: '2025-10-26',
    tag: 'Sponsor',
    image: 'images/sponsors/east-loop-components.png',
    imageIsLogo: true,
    excerpt: 'East Loop Components join us — encoders and odometry pods, and a mission to make robotics accessible.',
    body: `
      <p>We are excited to announce <strong>East Loop Components</strong> as one of our sponsors.</p>
      <p>East Loop set out to offer competitive robotics components that give teams high-quality parts at affordable prices, making advanced robotics more accessible to everyone.</p>
      <p>They make encoders and odometry pods, which matter enormously to us — our autonomous routines depend on precise sensor feedback, so having access to parts like theirs changes what we can attempt.</p>
      <p>Explore their products at <a href="https://eastloopcomponents.com/" target="_blank" rel="noopener noreferrer">eastloopcomponents.com</a>.</p>
    `,
  },
  {
    slug: 'veracit-partnership',
    title: 'Introducing VeracIT as Our Partner',
    date: '2025-10-12',
    tag: 'Sponsor',
    image: 'images/sponsors/veracit.png',
    imageIsLogo: true,
    excerpt: 'VeracIT join us — generative AI and IT innovation, helping businesses become future-ready.',
    body: `
      <p>We are delighted to welcome <strong>VeracIT</strong> as a sponsor of Wilsonic Boom.</p>
      <p>VeracIT harness generative AI to build scalable, efficient and intelligent solutions so businesses can thrive. They tailor IT innovation to each company's specific challenges and systems.</p>
      <p>Having a partner who understands where innovation meets practical application is genuinely useful to us — it is much the same problem we face designing a robot that has to work on the day.</p>
      <p>Learn more at <a href="https://www.veracit.co.uk/" target="_blank" rel="noopener noreferrer">veracit.co.uk</a>.</p>
    `,
  },
  {
    slug: 'meet-the-team',
    title: 'Meet the Team',
    date: '2025-09-15',
    tag: 'Team',
    image: 'images/team/team-photo.jpg',
    excerpt: 'Seventeen people, four sub-teams, one robot. An introduction to Wilsonic Boom.',
    body: `
      <p>Welcome to Wilsonic Boom. We are seventeen students at Wilson's School, and this is our introduction.</p>
      <p>Each member brings something different — mechanical design, programming, CAD, outreach. Between us we cover every part of getting a robot to a competition field.</p>
      <p>Our leads are:</p>
      <ul>
        <li><strong>Sudersen</strong> — Project Manager, coordinating the team</li>
        <li><strong>Liang</strong> and <strong>Anvesh</strong> — Design Managers, overseeing mechanical design and CAD</li>
        <li><strong>Vatsal</strong> — Outreach Manager, running sponsorship and community work</li>
        <li><strong>Razi</strong> — Programming Manager, leading software</li>
      </ul>
      <p>We are not just building a robot. We are building the skills and the habits that make the next one better.</p>
    `,
  },
];
