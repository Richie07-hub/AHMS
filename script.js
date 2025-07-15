// ====================================================================
// JAVASCRIPT FOR GRADUATION WEBSITE INTERACTIVITY
// This script handles interactive elements like graduand search/filter,
// FAQ accordion, and mobile menu toggling.
// ====================================================================

// Array containing sample data for graduands.
// Each object includes an ID, name, department, and a placeholder photo URL.
// You should replace these placeholder URLs with actual image paths.
const graduandsData = [
    { id: 1, name: "ADEPITAN Olamide David", department: "Grade 5", photo: "1.jpg" },
    { id: 2, name: "ABDULQUADRI Mujeeb Aremu", department: "Grade 5", photo: "images/DSC_0368.jpg" },
    { id: 3, name: "ABDULQUADRI Ibrahim Ishola", department: "Grade 5", photo: "images/DSC_0369.jpg" },
    { id: 4, name: "ADEMEFU Precious Oluwaseun", department: "Grade 5", photo: "images/DSC_0398.jpg" },
    { id: 5, name: "AGBODO Racheal Esenan", department: "Grade 5", photo: "images/DSC_0375.jpg" },
    { id: 6, name: "ANIMASHAUN Mubarak Abiola", department: "Grade 5", photo: "images/DSC_" },
    { id: 7, name: "AUDU Josephine Ashai", department: "Grade 5", photo: "images/DSC_0372.jpg" },
    { id: 8, name: "CHUKWENIWE Wisdom Ebubechukwu", department: "Grade 5", photo: "images/DSC_0381.JPG" },
    { id: 9, name: "DELE Mary Odunayo", department: "Grade 5", photo: "images/DSC_0367.jpg" },
    { id: 10, name: "KAREEM Jamal Princewill", department: "Grade 5", photo: "images/DSC_" },
    { id: 11, name: "NWEKE Uchenna Joseph", department: "Grade 5", photo: "images/DSC_0393.jpg" },
    { id: 12, name: "OKOLO Peter Ekojoka", department: "Grade 5", photo: "images/DSC_0389.jpg" },
    { id: 13, name: "OKOLO Paul Ojotule", department: "Grade 5", photo: "images/DSC_0391.jpg" },
    { id: 14, name: "RONIK Precious Enifoma", department: "Grade 5", photo: "images/DSC_0378.jpg" },
    { id: 15, name: "SAMUEL Bukola Mercy", department: "Grade 5", photo: "images/DSC_0383.jpg" },
    { id: 16, name: "ADEDAPO Adeoluwa Samuel", department: "Nursery 2 ", photo: "images/DSC_" },
    { id: 17, name: "ADEMEFUN Famous Oluwaseyi", department: "Nursery 2", photo: "images/DSC_" },
    { id: 18, name: "AGBODO Etonam Oluwataramidara", department: "Nursery 2", photo: "images/DSC_" },
    { id: 19, name: "AKOSILE Hamat", department: "Nursery 2", photo: "images/DSC_" },
    { id: 20, name: "BAMIDELE Taiwo Hannah", department: "Nursery 2", photo: "images/DSC_" },
    { id: 21, name: "BAMIDELE Kehinde Elizabeth", department: "Nursery 2", photo: "images/DSC_" },
    { id: 22, name: "GREG-IYOHA Othniel Aigbode", department: "Nursery 2", photo: "images/DSC_" },
    { id: 23, name: "ISHAKA Amida", department: "Nursery 2", photo: "images/DSC_" },
    { id: 24, name: "OGUNNIRAN Toluwalase Joshep", department: "Nursery 2", photo: "images/DSC_" },
    { id: 25, name: "RONIK Dominion", department: "Nursery 2", photo: "images/DSC_" },
    { id: 25, name: "ADAH David Okeogen", department: "KG 2", photo: "images/DSC_" },
    { id: 26, name: "ADEDAPO Adedayo Abraham", department: "KG 2", photo: "images/DSC_" },
    { id: 27, name: "ADEPOJU Adams Ayomide", department: "KG 2", photo: "images/DSC_" },
    { id: 28, name: "ADEYEMI Daniel Ronaldo", department: "KG 2", photo: "images/DSC_" },
    { id: 29, name: "ALAKE Oluwajomiloju Olalekan", department: "KG 2", photo: "images/DSC_" },
    { id: 30, name: "ALAMU Bethel Oreofejesu", department: "KG 2", photo: "images/DSC_" },
    { id: 31, name: "EHINMISAN Morenikeji Christa", department: "KG 2", photo: "images/DSC_" },
    { id: 32, name: "GODWIN Chukwuemeka King", department: "KG 2", photo: "images/DSC_" },
    { id: 33, name: "GREG-IYOHA Daniel Ehizokhae", department: "KG 2", photo: "images/DSC_" },
    { id: 34, name: "JESSE Divine Sunday", department: "KG 2", photo: "images/DSC_" },
    { id: 35, name: "MADUEKE Chrstabel Amanda", department: "KG 2", photo: "images/DSC_" },
];

// Get references to DOM elements used in JavaScript interactions
const graduandsList = document.getElementById('graduands-list'); // Container for graduand cards
const graduandSearch = document.getElementById('graduand-search'); // Input field for searching by name
const graduandFilter = document.getElementById('graduand-filter'); // Dropdown for filtering by department
const noGraduandsFound = document.getElementById('no-graduands-found'); // Message for no matching graduands
const mobileMenuButton = document.getElementById('mobile-menu-button'); // Hamburger icon for mobile menu
const mobileMenu = document.getElementById('mobile-menu'); // The mobile menu overlay itself
// Add reference for mobile menu overlay (assuming it has id="mobile-menu-overlay")
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay'); // Added this line
const mobileMenuCloseButton = document.getElementById('mobile-menu-close-button'); // Added this line
const mobileNavLinks = document.querySelectorAll('.nav-link-mobile'); // Added this line


/**
 * Renders the list of graduand cards into the DOM.
 * It clears any existing cards and then creates new cards for each graduand in the provided array.
 * Handles displaying a "no results" message if the array is empty.
 * @param {Array} graduands - An array of graduand objects to be displayed.
 */
function renderGraduands(graduands) {
    graduandsList.innerHTML = ''; // Clear previous content to avoid duplicates
    if (graduands.length === 0) {
        // If no graduands match, show the 'no graduands found' message
        noGraduandsFound.classList.remove('hidden');
        return; // Exit the function as there's nothing to render
    }
    // If there are graduands, ensure the 'no graduands found' message is hidden
    noGraduandsFound.classList.add('hidden');

    // Iterate over each graduand object and create an HTML card for it
    graduands.forEach(graduand => {
        const card = document.createElement('div');
        // Assign a class for CSS styling
        card.className = 'graduand-card';
        card.innerHTML = `
            <img src="${graduand.photo}" alt="${graduand.name}" class="graduand-photo" onerror="this.onerror=null; this.src='https://placehold.co/120x120/cccccc/333333?text=N/A';">
            <h3 class="graduand-name">${graduand.name}</h3>
            <p class="graduand-department">${graduand.department}</p>
        `;
        graduandsList.appendChild(card); // Add the newly created card to the graduands list container
    });
}

/**
 * Filters and searches the `graduandsData` array based on the current values
 * in the search input and department filter dropdown.
 * It then calls `renderGraduands` with the filtered results.
 */
function filterAndSearchGraduands() {
    const searchTerm = graduandSearch.value.toLowerCase(); // Get search term and convert to lowercase for case-insensitive search
    const filterDepartment = graduandFilter.value; // Get the selected department from the filter dropdown

    // Filter the original graduands data
    const filteredGraduands = graduandsData.filter(graduand => {
        // Check if the graduand's name includes the search term
        const matchesSearch = graduand.name.toLowerCase().includes(searchTerm);
        // Check if the department filter is empty (show all) or matches the graduand's department
        const matchesFilter = filterDepartment === '' || graduand.department === filterDepartment;
        // A graduand is included if both search and filter conditions are met
        return matchesSearch && matchesFilter;
    });

    renderGraduands(filteredGraduands); // Render the filtered list of graduands
}

// Add event listeners to trigger filtering and searching whenever input changes
graduandSearch.addEventListener('keyup', filterAndSearchGraduands); // 'keyup' for real-time search as user types
graduandFilter.addEventListener('change', filterAndSearchGraduands); // 'change' for when a new department is selected

// --- NEW: SPEECH DROPDOWN FUNCTIONALITY ---
/**
 * Initializes the speech dropdown toggles.
 * Attaches click listeners to all buttons with the 'speech-toggle-button' class.
 */
function setupSpeechDropdowns() {
    const toggleButtons = document.querySelectorAll('.speech-toggle-button');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('aria-controls');
            const targetContent = document.getElementById(targetId);

            if (!targetContent) {
                console.error(`Speech content with ID '${targetId}' not found.`);
                return;
            }

            // Check if content is currently hidden
            const isHidden = targetContent.classList.contains('hidden');

            if (isHidden) {
                // Show the content
                targetContent.classList.remove('hidden');
                // Set max-height to its scrollHeight for smooth expansion
                targetContent.style.maxHeight = targetContent.scrollHeight + "px";
                button.setAttribute('aria-expanded', 'true');
                targetContent.setAttribute('aria-hidden', 'false');
            } else {
                // Hide the content
                // Set max-height to current scrollHeight before setting to 0, for smooth collapse
                targetContent.style.maxHeight = targetContent.scrollHeight + "px";
                // Use requestAnimationFrame to ensure the browser registers the max-height before changing it
                requestAnimationFrame(() => {
                    targetContent.style.maxHeight = '0';
                    button.setAttribute('aria-expanded', 'false');
                    targetContent.setAttribute('aria-hidden', 'true');
                    // Add 'hidden' class after the transition completes
                    targetContent.addEventListener('transitionend', function handler() {
                        targetContent.classList.add('hidden');
                        targetContent.removeEventListener('transitionend', handler);
                    }, { once: true });
                });
            }

            // Optional: Scroll to the button if content expands below viewport
            if (isHidden) { // Only scroll if it's becoming visible
                setTimeout(() => {
                    button.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 500); // Wait for the animation to start
            }
        });
    });
}


/**
 * Toggles the visibility of the mobile navigation menu.
 * This function is called when the hamburger icon or the close button in the mobile menu is clicked.
 */
function toggleMobileMenu() {
    // Original logic remains, ensure mobileMenuOverlay and other elements are correctly referenced
    if (mobileMenuOverlay) { // Ensure mobileMenuOverlay is found
        mobileMenuOverlay.classList.toggle('hidden');
        if (!mobileMenuOverlay.classList.contains('hidden')) {
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        } else {
            document.body.style.overflow = ''; // Restore scrolling
        }
    } else {
        console.warn("Mobile menu overlay not found. Check HTML ID.");
    }
}

// Add event listener for the mobile menu button (hamburger icon)
if (mobileMenuButton) { // Check if the button exists before adding listener
    mobileMenuButton.addEventListener('click', toggleMobileMenu);
}


// --- Original Mobile Menu Close Logic (extracted from your previous code) ---
// This part was likely handled in your HTML with inline onclick or missing.
// I'm adding it back explicitly here for completeness based on your provided HTML structure.
if (mobileMenuCloseButton) {
    mobileMenuCloseButton.addEventListener('click', () => {
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.add('hidden');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
}

if (mobileNavLinks) {
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });
    });
}


// Initial render of all graduands when the entire HTML document has been loaded and parsed.
document.addEventListener('DOMContentLoaded', () => {
    renderGraduands(graduandsData); // Display all graduands on page load

    // NEW: Initialize the speech dropdowns when the DOM is ready
    setupSpeechDropdowns();

    // The `toggleMobileMenu` function is already attached to `mobileMenuButton`
    // and its close/link clicks are handled above.
    // The previous `toggleAccordion` function remains commented out as it's not used by the new speech dropdowns.
});

/**
 * Toggles the visibility of the content within an FAQ accordion item.
 * Changes the '+' icon to '-' when expanded, and vice-versa.
 * @param {HTMLElement} element - The clicked `<h4>` header element of the FAQ accordion.
 */
// NOTE: This function is commented out because the new speech dropdowns
// use a different mechanism. If you still have an FAQ section using this,
// you will need to re-evaluate its implementation.
/*
function toggleAccordion(element) {
    // Get the content paragraph which is the immediate sibling of the clicked header
    const content = element.nextElementSibling;
    // Get the icon element (the last span within the header)
    const icon = element.querySelector('.faq-icon');

    // Check if the content is currently hidden (based on the 'hidden' class)
    if (content.classList.contains('hidden')) {
        // Show the content
        content.classList.remove('hidden');
        content.classList.add('expanded'); // Add 'expanded' class to trigger CSS transition
        icon.textContent = '-'; // Change icon from '+' to '-'
        icon.classList.add('rotated'); // Add 'rotated' class for visual feedback
    } else {
        // Hide the content
        content.classList.remove('expanded'); // Remove 'expanded' to trigger CSS collapse
        content.classList.add('hidden'); // Add 'hidden' after transition (or immediately)
        icon.textContent = '+'; // Change icon from '-' to '+'
        icon.classList.remove('rotated'); // Remove rotation
    }
}
*/
