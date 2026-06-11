/* ═══════════════════════════════════════════════════════════════════════════
   WILSONIC BOOM - BLOG MODAL FUNCTIONALITY
   ═══════════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    initBlogModal();
});

// Blog post data - Updated with sponsor posts (Newest First)
const blogPosts = {
    1: {
        title: "Introducing Accu as Our Partner",
        date: "January 30, 2026",
        image: "images/sponsors/Accu-logo.png",
        content: `
            <p>We are thrilled to announce <strong>Accu Components</strong> as our newest sponsor!</p>
            
            <p>Accu Components are a fast growing company who help engineers and innovators bring their ideas to life. With their components impacting billions of people worldwide, Accu blend cutting-edge technology with passionate people to deliver an award-winning experience to customers all across the world.</p>
            
            <p>They sell a range of items, from precision screws to thread gauges and calipers—all essential for precision engineering work like ours!</p>
            
            <p>Their commitment to quality and precision aligns perfectly with our team's values. We're excited to have them on board and look forward to utilizing their exceptional components in our builds.</p>
            
            <p>Visit their website at <a href="https://accu.co.uk/" target="_blank" style="color: var(--color-gold);">accu.co.uk</a></p>
        `
    },
    2: {
        title: "Introducing GWR Fasteners as Our Partner",
        date: "January 16, 2026",
        image: "images/sponsors/GWR-fasteners.png",
        content: `
            <p>We're proud to welcome <strong>GWR Fasteners</strong> to our sponsor family!</p>
            
            <p>GWR Fasteners are a British company who serve the automotive and engineering markets by supplying precision components and special fasteners. They sell a range of products, from screws, bolts and nails to power tools and workwear.</p>
            
            <p>As a robotics team that relies heavily on quality fasteners and precision components, having GWR's support is invaluable. Their extensive product range means we always have access to exactly what we need for our builds.</p>
            
            <p>We're grateful for their belief in our mission and excited to represent them as we compete!</p>
            
            <p>Check out their offerings at <a href="https://www.gwr-fasteners.co.uk/" target="_blank" style="color: var(--color-gold);">gwr-fasteners.co.uk</a></p>
        `
    },
    3: {
        title: "Starting Version 2 of Our Robot",
        date: "January 5, 2026",
        image: "images/robot/slideshow/IMG20251211180748.jpg",
        content: `
            <p>After weeks of testing and refining our first robot design, we've officially kicked off development on V2! This next iteration takes everything we learned from our initial build and pushes it even further.</p>
            
            <p>The V2 design focuses on:</p>
            <ul style="list-style: disc; padding-left: 20px; margin: 16px 0; color: var(--color-gray);">
                <li>Improved structural rigidity for more consistent performance</li>
                <li>Enhanced cable management to prevent any mid-match issues</li>
                <li>Faster cycle times based on our scrimmage data analysis</li>
                <li>Better driver ergonomics and control responsiveness</li>
            </ul>
            
            <p>The lessons we learned from V1 have been invaluable. Every failure, every jam, every missed shot taught us something. Now we're applying all of that knowledge to create something truly competition-ready.</p>
            
            <p>We're excited about this new chapter and can't wait to show you what V2 can do. Stay tuned for more updates as we bring this design to life!</p>
        `
    },
    4: {
        title: "First Scrimmages & Testing",
        date: "December 5, 2025",
        image: "images/team/team-working.jpg",
        hasVideo: true,
        videoSrc: "videos/scrimmages/scrimmages-testing.mp4",
        content: `
            <p>We just completed our first scrimmage event and it was an incredible learning experience! Going from practice sessions to actual competition scenarios really showed us what our robot can do—and where we still need to improve.</p>
            
            <p>Key takeaways from the scrimmage:</p>
            <ul style="list-style: disc; padding-left: 20px; margin: 16px 0; color: var(--color-gray);">
                <li>We realised that our intake wasn't able to perform under pressure - leading us to make drastic design changes</li>
                <li>The drivetrain handled the competition field surface well</li>
                <li>We identified some timing optimizations needed in our autonomous routine</li>
                <li>Driver communication protocols need more practice</li>
            </ul>
            
            <p>Watching our robot perform alongside other teams gave us valuable perspective. We saw strategies we hadn't considered and identified areas where we excel.</p>
            
            <div style="margin: 24px 0;">
                <video controls style="width: 100%; border-radius: 8px; border: 1px solid var(--color-gold);">
                    <source src="videos/scrimmages/scrimmages-testing.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <p style="text-align: center; color: var(--color-gold); margin-top: 8px; font-size: 14px;">📹 Footage from our testing and scrimmage sessions</p>
            </div>
            
            <p>The experience was invaluable and the team morale is higher than ever. We're ready to take what we learned and come back even stronger!</p>
        `
    },
    5: {
        title: "Introducing East Loop Components as Our Partner",
        date: "October 26, 2025",
        image: "images/sponsors/east-loop-components.png",
        content: `
            <p>We're excited to announce <strong>East Loop Components</strong> as one of our valued sponsors!</p>
            
            <p>East Loop Components' mission is to offer innovative and competitive robotics components that provide teams and individuals with high-quality parts at affordable prices, making advanced robotics more accessible to everyone.</p>
            
            <p>They sell a range of encoders and odometry pods, essential to robotics. As a team that relies heavily on precise sensor feedback for our autonomous routines, having access to East Loop's quality components is a game-changer.</p>
            
            <p>Their commitment to making robotics more accessible perfectly aligns with our values of learning, innovation, and community. We're proud to have them supporting our journey!</p>
            
            <p>Explore their products at <a href="https://eastloopcomponents.com/" target="_blank" style="color: var(--color-gold);">eastloopcomponents.com</a></p>
        `
    },
    6: {
        title: "Introducing VeracIT as Our Partner",
        date: "October 12, 2025",
        image: "images/sponsors/veracit.png",
        content: `
            <p>We are delighted to welcome <strong>VeracIT</strong> as a sponsor of Wilsonic Boom!</p>
            
            <p>VeracIT are a company that harness generative AI to create scalable, efficient and intelligent solutions to allow businesses to thrive. They provide IT innovation to ensure collaborative success unique to each company, based on their specific challenges and systems, ensuring that they are future-ready.</p>
            
            <p>In the age of increasingly sophisticated technology, having a partner like VeracIT who understands the intersection of innovation and practical application is invaluable. Their expertise in AI and intelligent solutions resonates with our team's focus on smart, efficient robot design.</p>
            
            <p>We're grateful for their support and excited to have them as part of our sponsor family!</p>
            
            <p>Learn more about them at <a href="https://www.veracit.co.uk/" target="_blank" style="color: var(--color-gold);">veracit.co.uk</a></p>
        `
    },
    7: {
        title: "Meet the Team",
        date: "September 15, 2025",
        image: "images/team/team-photo.jpg",
        content: `
            <p>Welcome to Wilsonic Boom! We're thrilled to introduce our incredible team of passionate robotics enthusiasts.</p>
            
            <p>Our team is composed of 16 dedicated members, each bringing unique skills and perspectives to the table. From mechanical engineering to programming, CAD design to outreach, we've got all the bases covered.</p>
            
            <div style="margin: 24px 0;">
                <img src="images/team/team-photo.jpg" alt="Wilsonic Boom Team Photo" style="width: 100%; border-radius: 8px; border: 2px solid var(--color-gold);">
                <p style="text-align: center; color: var(--color-gold); margin-top: 8px; font-size: 14px;">📸 The Wilsonic Boom Team</p>
            </div>
            
            <p>Our team structure includes:</p>
            <ul style="list-style: disc; padding-left: 20px; margin: 16px 0; color: var(--color-gray);">
                <li><strong>Team Lead:</strong> Sudersen - coordinating all team activities</li>
                <li><strong>Design Lead:</strong> Liang - overseeing mechanical and CAD design</li>
                <li><strong>Outreach Lead:</strong> Vatsal - managing sponsorships and community engagement</li>
                <li><strong>Programming Lead:</strong> Razi - leading all software development</li>
            </ul>
            
            <p>Together with our amazing Design Team and Programming Team members, we're building something special. We're not just building a robot—we're building skills, friendships, and memories that will last a lifetime.</p>
            
            <p>Thank you for following our journey. We can't wait to show you what we can achieve together!</p>
        `
    }
};

function initBlogModal() {
    const modal = document.getElementById('blog-modal');
    const modalClose = document.getElementById('modal-close');
    const modalImage = document.getElementById('modal-image');
    const modalDate = document.getElementById('modal-date');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    if (!modal) return;

    // Open modal on blog card click
    document.querySelectorAll('.blog-card').forEach(card => {
        card.addEventListener('click', () => {
            const postId = card.getAttribute('data-post');
            const post = blogPosts[postId];

            if (post) {
                modalImage.src = post.image;
                modalImage.alt = post.title;
                modalDate.textContent = post.date;
                modalTitle.textContent = post.title;
                modalBody.innerHTML = post.content;

                // Toggle sponsor-logo class for sponsor posts
                if (post.image.includes('sponsors/')) {
                    modalImage.classList.add('sponsor-logo');
                } else {
                    modalImage.classList.remove('sponsor-logo');
                }

                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        // Pause any playing videos when modal closes
        const videos = modalBody.querySelectorAll('video');
        videos.forEach(video => video.pause());
    };

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}
