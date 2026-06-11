/* ═══════════════════════════════════════════════════════════════════════════
   WILSONIC BOOM - ROBOT PAGE
   Handles modal functionality and Firebase data sync
   ═══════════════════════════════════════════════════════════════════════════ */

// Subsystem data - defaults that can be overridden by Firebase
window.subsystemData = {
    chassis: {
        title: "Chassis",
        image: "images/robot/drivetrain/IMG20251211173137.jpg",
        shortDesc: "Robust frame for stability and speed",
        category: "drivetrain",
        description: `
            <p>For our Version 1 design, we used a strafer drivetrain, which is a basic, general drivetrain. It contained four DC motors connected to a mecanum wheel each. Despite its ease of assembly and great reliability, lots of our other components had to be designed around this invariable drivetrain, which created an issue.</p>
            <p>To combat this, we created a custom drivetrain for our Version 2 design. This includes a mix of C-channels, U-channels and 3D printed parts. Again, our drivetrain is powered by four DC motors which are each connected to a mecanum wheel.</p>
            <p>This combination of mecanums and a custom drivetrain enables us to have a fast, yet also agile drivetrain that remains specially and uniquely crafted for our specific robot, meaning that the quality of the other components do not have to be sacrificed in order to work with the drivetrain.</p>
        `,
        media: [{ type: 'video', src: 'videos/Robot-v1/robot-moving.mp4' }]
    },
    wheels: {
        title: "Wheels",
        image: "images/robot/drivetrain/EE878754-14B1-4C37-84C2-419F8FEE469A_1_105_c.jpeg",
        shortDesc: "Mecanum wheels for omnidirectional movement",
        category: "drivetrain",
        description: `
            <p>The drivetrain is the part of the robot that allows the whole structure to move. This is, in its basic form, four DC motors connected together with wheels.</p>
            <p>Our primary wheel of choice were mecanum wheels. These have many rollers around the circumference of the wheel at 45 degrees, allowing for the drivetrain to move in any direction without having to turn the whole robot.</p>
            <p>Despite the more complex programming aspect, these provide a significant advantage to our gameplay.</p>
        `,
        media: [{ type: 'video', src: 'videos/Robot-v1/robot-moving.mp4' }]
    },
    collection: {
        title: "Collection",
        image: "images/robot/intake/IMG20251211173150.jpg",
        shortDesc: "Efficient game element pickup",
        category: "intake",
        description: `
            <p>The Intake system is responsible for the intake of balls into the robot. This is done using a series of axles controlled by a DC motor, which spin at a high RPM, allowing for the balls outside the robot to be taken inside.</p>
            <p>Our Version 1 design was inconsistent and unreliable due to its low grip and frequent jamming of balls mainly due to only having a single axle. This severely limited our ability to score points.</p>
            <p>However, a more careful design for Version 2, including having a dual axis setup, means that the Intake system is far more reliable.</p>
        `,
        media: [{ type: 'video', src: 'videos/Robot-v1/intake-v1.mp4' }]
    },
    launch: {
        title: "Launch System",
        image: "images/robot/shooter/IMG20251211173120.jpg",
        shortDesc: "Accurate and powerful scoring",
        category: "shooter",
        description: "",
        media: [{ type: 'video', src: 'videos/Robot-v1/flywheel-moving.mp4' }]
    },
    aiming: {
        title: "Aiming",
        image: "images/robot/shooter/IMG20251211174322.jpg",
        shortDesc: "Adjustable angle for precision",
        category: "shooter",
        description: `
            <p>Last, but not least, our shooter system is involved with getting the balls from the robot into the goal.</p>
            <p>For both our iterations, we have maintained a hooded shooter, which involves a flywheel at the centre and a hood which controls the trajectory of the ball.</p>
            <p>In our Version 2 design, however, we have included an adjustable hood, which can control the trajectory of the ball based on the proximity to the goal, resulting in a higher shot accuracy.</p>
        `,
        media: []
    },
    sorter: {
        title: "Sorting Mechanism",
        image: "images/robot/sorter/IMG20251211174346.jpg",
        shortDesc: "Intelligent game piece handling",
        category: "sorter",
        description: `
            <p>In order to gain more points, teams can include a sorting system, which stores three balls and releases the correctly coloured ball at the correct time.</p>
            <p>This is something we experimented with for our Version 1 design, in which we included a spindexer and a flap. This involved having a spinning wheel that could store three balls at a time, rotating the correctly coloured ball to below the shooter. A flap would then push the ball into the shooter.</p>
            <p>However, unreliability in the sorter and flap systems meant that we couldn't score any points - the flap being too short and the sorter disconnecting from its servo motor were one of many issues with this system, and hence resulted in us scrapping this idea.</p>
            <p>For our Version 2, we have simply included a transfer mechanism, which involves a series of axles push the ball into the shooter. Our aim has shifted from shooting the correctly coloured balls, to shooting a greater number of balls more rapidly.</p>
        `,
        media: []
    },
    'v2-chassis': {
        title: "Chassis",
        image: "",
        shortDesc: "Custom drivetrain for optimised subsystem integration",
        category: "drivetrain",
        description: `
            <p>For our Version 2 design, we created a custom drivetrain. This includes a mix of C-channels, U-channels and 3D printed parts. Again, our drivetrain is powered by four DC motors which are each connected to a mecanum wheel.</p>
            <p>This combination of mecanums and a custom drivetrain enables us to have a fast, yet also agile drivetrain that remains specially and uniquely crafted for our specific robot, meaning that the quality of the other components do not have to be sacrificed in order to work with the drivetrain.</p>
        `,
        media: []
    },
    'v2-plates': {
        title: "Parallel Plates",
        image: "",
        shortDesc: "Polycarbonate framework connecting transfer and shooter",
        category: "drivetrain",
        description: `
            <p>Our parallel plates provide a structured framework for attaching the transfer and shooter systems to the robot, helping to create a cohesive and well-integrated design.</p>
            <p>They form the main structural interface between subsystems, allowing us to accurately position motor mounts and organise how the different mechanisms connect and operate together within the robot.</p>
            <p>The plates also provide significant structural support, to mount components such as the expansion or the driver hub. To maximise durability and rigidity, the plates are manufactured from polycarbonate, a material chosen for its high strength and impact resistance.</p>
        `,
        media: []
    },
    'v2-collection': {
        title: "Collection",
        image: "",
        shortDesc: "Surgical tubing intake for maximum collection range",
        category: "intake",
        description: `
            <p>The intake is designed to collect artefacts as efficiently as possible so that they can be transferred through the robot and launched. The mechanism uses a single hex shaft fitted with surgical tubing to maximise the distance from which the robot can collect a ball.</p>
            <p>The hex shaft is driven by a motor through a chain connection. As the axle rotates, the surgical tubing spins and pulls the ball into the robot, guiding it into the transfer mechanism.</p>
            <p>Surgical tubing was selected because of its flexibility and high grip. The flexibility reduces the need for precise compression tolerances while still maintaining effective contact with the ball. At the same time, the silicone material provides strong traction, allowing the ball to be reliably pulled into the robot. Silicone also wears more slowly than many other materials, improving long-term reliability. In addition, the tubing produces a smooth and consistent pulling motion, which helps ensure dependable intake performance.</p>
            <p>Overall, this intake design maximises collection range, provides strong grip on the ball, and allows artefacts to be collected quickly and consistently once they make contact with the intake.</p>
        `,
        media: []
    },
    'v2-launch': {
        title: "Launch System",
        image: "",
        shortDesc: "Single flywheel hooded shooter for powerful scoring",
        category: "shooter",
        description: `
            <p>Our shooter design has evolved over time.</p>
            <p>Our preliminary idea was a double flywheel shooter, where we could change the separate speeds of the separate flywheels to allow for a range of horizontal motion in the trajectory, and tilting the ramp leading to the flywheels to allow for a range of vertical motion in the trajectory. However, we realized that moving the flywheels along with the ramp would either be too slow or require too much torque. Thus, we settled with a hooded shooter, with a single flywheel and a curved "hood" that would guide the ball from our transfer mechanism to the wanted trajectory.</p>
            <p>The next decision about the shooter was whether or not to have a rotating "turret" shooter for horizontal trajectory range, and also if we wanted an adjustable hood to allow for vertical trajectory range. Due to financial restrictions, we could only implement one.</p>
            <p>Some thought a turret would be better, as it is significantly quicker to rotate a lightweight hood, motor and flywheel setup than our whole robot, and vertical trajectory can be controlled by the speed of the flywheel (if it rotates faster, the arc of the ball will be steeper).</p>
            <p>However, we realized that precisely controlling the speed of the flywheel's motor, especially when the flywheel is at nearly 4000 RPM and thus has a huge amount of momentum, is extremely difficult.</p>
        `,
        media: []
    },
    'v2-aiming': {
        title: "Aiming",
        image: "",
        shortDesc: "Adjustable hood for precise trajectory control",
        category: "shooter",
        description: `
            <p>We settled with a hooded shooter — a single flywheel paired with a curved "hood" that guides the ball from our transfer mechanism to the desired trajectory.</p>
            <p>The hood controls the angle at which the ball exits the shooter. By adjusting the position of the hood, we can change the vertical trajectory of the ball, allowing us to score from different distances on the field.</p>
            <p>In our Version 2 design, we have included an adjustable hood, which can control the trajectory of the ball based on the proximity to the goal, resulting in a higher shot accuracy.</p>
        `,
        media: []
    },
    'v2-transfer': {
        title: "Transfer Mechanism",
        image: "",
        shortDesc: "Controlled game piece flow from intake to shooter",
        category: "transfer",
        description: `
            <p>The transfer mechanism moves game pieces from the intake ramp to the shooter while maintaining a consistent and controlled flow. Once a ball enters the robot through the intake ramp, it travels through a guided channel that constrains its lateral movement and keeps it aligned with the shooter.</p>
            <p>Within the centre of this channel, an agitator mechanism is used to prevent balls from becoming stuck. The agitator introduces a small disturbance that allows jammed balls to reorient themselves and continue moving along the transfer path.</p>
            <p>To actively move the balls forward, two rows of flap wheels are mounted on rotating shafts positioned above the channel. As these shafts rotate, the flap wheels apply a rotational force to the ball, propelling it smoothly towards the shooter. The use of flap wheels provides both traction and flexibility, allowing the mechanism to handle minor variations in ball position while maintaining reliable contact.</p>
            <p>Overall, this design enables a reliable and continuous transfer of balls from the intake to the shooter, improving scoring consistency during competition.</p>
        `,
        media: []
    }
};

// Default parts for admin dropdown
const defaultParts = [
    { id: 'drivetrain', name: 'Drivetrain', order: 1 },
    { id: 'intake', name: 'Intake System', order: 2 },
    { id: 'shooter', name: 'Shooter', order: 3 },
    { id: 'sorter', name: 'Sorter', order: 4 }
];

document.addEventListener('DOMContentLoaded', () => {
    initSubsystemModal();
    loadFirebaseData();
});

// Load data from Firebase to update subsystemData
async function loadFirebaseData() {
    // Save default parts to localStorage for admin dropdown
    localStorage.setItem('robotParts', JSON.stringify(defaultParts));

    if (typeof FirebaseDB === 'undefined') {
        console.log('Firebase not available');
        return;
    }

    try {
        // First, load subparts from Firebase so we have them available
        const subpartsData = await FirebaseDB.getCollection('robotSubparts');
        if (subpartsData) {
            // Update subsystemData with Firebase data (for modal content)
            Object.entries(subpartsData).forEach(([id, data]) => {
                window.subsystemData[id] = {
                    ...window.subsystemData[id],
                    title: data.title || window.subsystemData[id]?.title,
                    image: data.image || window.subsystemData[id]?.image,
                    shortDesc: data.shortDesc || window.subsystemData[id]?.shortDesc,
                    description: data.description || window.subsystemData[id]?.description,
                    media: data.media || window.subsystemData[id]?.media || [],
                    category: data.category || window.subsystemData[id]?.category
                };
            });

            // Update visible cards with Firebase data
            updateCardsFromFirebase(subpartsData);
        }

        // Then load parts from Firebase
        const partsData = await FirebaseDB.getCollection('robotParts');
        if (partsData && Object.keys(partsData).length > 0) {
            const parts = Object.values(partsData).sort((a, b) => (a.order || 0) - (b.order || 0));
            localStorage.setItem('robotParts', JSON.stringify(parts));

            // Render any dynamically added parts (AFTER subparts are loaded!)
            renderDynamicParts(parts);
        }

    } catch (error) {
        console.error('Error loading Firebase data:', error);
    }
}

// Render parts that were added dynamically (not in original HTML)
function renderDynamicParts(parts) {
    const container = document.getElementById('dynamic-parts-container');
    if (!container) return;

    const existingPartIds = ['drivetrain', 'intake', 'shooter', 'sorter'];
    const newParts = parts.filter(p => !existingPartIds.includes(p.id));

    if (newParts.length === 0) {
        container.innerHTML = '';
        return;
    }

    let html = '';
    newParts.forEach(part => {
        // Find subparts for this part from window.subsystemData
        const partSubparts = Object.entries(window.subsystemData)
            .filter(([id, data]) => data.category === part.id);

        const gridStyle = partSubparts.length <= 1 ? 'max-width: 500px; margin: 0 auto;' : '';

        html += `
            <div id="${part.id}" style="margin-bottom: 48px;">
                <h3 style="text-align: center; margin-bottom: 32px; color: white; font-size: 1.75rem;">${part.name}</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; ${gridStyle}">
                    ${partSubparts.length > 0
                ? partSubparts.map(([id, data]) => `
                            <div data-subsystem="${id}" style="background: #1a1a1a; border-radius: 12px; cursor: pointer; height: 250px; position: relative; overflow: hidden; border: 1px solid #333;">
                                ${data.image ? `<img src="${data.image}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0;">` : ''}
                                <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.5) 50%, transparent 100%); display: flex; flex-direction: column; justify-content: flex-end; padding: 24px;">
                                    <h4 style="font-size: 1.5rem; margin: 0 0 8px 0; color: #ffffff; font-weight: 600;">${data.title}</h4>
                                    <div class="text-scan-container">
                                        <p class="subsystem-desc text-scan-original" style="font-size: 0.875rem; color: #c5a059; margin: 0;">${data.shortDesc || ''}</p>
                                        <p class="subsystem-desc text-scan-hover" style="font-size: 0.875rem; margin: 0;">CLICK TO LEARN MORE</p>
                                    </div>
                                </div>
                            </div>
                        `).join('')
                : '<p style="text-align: center; color: #888; padding: 20px;">No components added yet. Use admin to add sub-parts to this section.</p>'
            }
                </div>
            </div>
        `;
    });

    container.innerHTML = html;

    // Re-init click handlers for newly created cards
    initDynamicCardClicks();
}

// Initialize click handlers for dynamically created cards
function initDynamicCardClicks() {
    document.querySelectorAll('#dynamic-parts-container .subsystem-card[data-subsystem]').forEach(card => {
        card.addEventListener('click', () => {
            // Don't open modal in admin mode
            const urlParams = new URLSearchParams(window.location.search);
            const isAdmin = urlParams.get('admin') === 'true' && sessionStorage.getItem('adminLoggedIn') === 'true';
            if (isAdmin) return;

            openSubsystemModal(card.dataset.subsystem);
        });
    });
}

// Update existing cards with Firebase data
function updateCardsFromFirebase(subpartsData) {
    Object.entries(subpartsData).forEach(([id, data]) => {
        const card = document.querySelector(`.subsystem-card[data-subsystem="${id}"]`);
        if (card) {
            // Update card content
            const titleEl = card.querySelector('.subsystem-title');
            const descEl = card.querySelector('.subsystem-desc');
            const imgEl = card.querySelector('img');

            if (titleEl && data.title) titleEl.textContent = data.title;
            if (descEl && data.shortDesc) descEl.textContent = data.shortDesc;
            if (imgEl && data.image && !data.image.startsWith('data:')) {
                imgEl.src = data.image;
            }
        }
    });
}

// Open subsystem modal
function openSubsystemModal(subsystemId) {
    const modal = document.getElementById('subsystem-modal');
    const modalImg = document.getElementById('subsystem-modal-img');
    const modalTitle = document.getElementById('subsystem-modal-title');
    const modalDescription = document.getElementById('subsystem-modal-description');
    const modalMedia = document.getElementById('subsystem-modal-media');

    const data = window.subsystemData[subsystemId];
    if (!data || !modal) return;

    if (data.image) {
        modalImg.src = data.image;
        modalImg.style.display = '';
    } else {
        modalImg.style.display = 'none';
    }
    modalTitle.textContent = data.title;

    if (data.description && data.description.trim()) {
        modalDescription.innerHTML = data.description;
    } else {
        modalDescription.innerHTML = '<p style="color: var(--color-gray); font-style: italic;">Description coming soon...</p>';
    }

    if (data.media && data.media.length > 0) {
        modalMedia.innerHTML = `
            <h4 style="margin-bottom: var(--space-4); color: var(--color-gold);">Media</h4>
            <div style="display: grid; gap: var(--space-4);">
                ${data.media.map(item => {
            if (item.type === 'video') {
                return `<video src="${item.src}" controls style="width: 100%; border-radius: var(--radius-md);"></video>`;
            } else {
                return `<img src="${item.src}" style="width: 100%; border-radius: var(--radius-md);">`;
            }
        }).join('')}
            </div>
        `;
        modalMedia.style.display = 'block';
    } else {
        modalMedia.innerHTML = '';
        modalMedia.style.display = 'none';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Initialize subsystem modal
function initSubsystemModal() {
    const modal = document.getElementById('subsystem-modal');
    const modalClose = document.getElementById('subsystem-modal-close');

    if (!modal) return;

    // Click handler for subsystem cards
    document.querySelectorAll('.subsystem-card[data-subsystem]').forEach(card => {
        card.addEventListener('click', () => {
            // Don't open modal in admin mode
            const urlParams = new URLSearchParams(window.location.search);
            const isAdmin = urlParams.get('admin') === 'true' && sessionStorage.getItem('adminLoggedIn') === 'true';
            if (isAdmin) return;

            openSubsystemModal(card.dataset.subsystem);
        });
    });

    // Close modal
    modalClose?.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}
