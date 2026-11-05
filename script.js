// ==========================================================================
// Local Blood Donor Directory - Complete Vanilla JavaScript Engine
// Client-side state management with browser localStorage
// College Practical Test / Student Demonstration Project
// ==========================================================================

// --- Storage Keys ---
const STORAGE_KEYS = {
  DONORS: "lbdd_donors_data",
  REQUESTS: "lbdd_requests_data",
  CURRENT_USER: "lbdd_active_session",
  HISTORY: "lbdd_donation_history"
};

// --- Blood Compatibility Mapping ---
// Key: Patient Blood Group -> Value: Compatible Donor Blood Groups
const COMPATIBILITY_MAP = {
  'O-': ['O-'],
  'O+': ['O+', 'O-'],
  'A-': ['A-', 'O-'],
  'A+': ['A+', 'A-', 'O+', 'O-'],
  'B-': ['B-', 'O-'],
  'B+': ['B+', 'B-', 'O+', 'O-'],
  'AB-': ['AB-', 'A-', 'B-', 'O-'],
  'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
};

// Check if donor blood can be given to patient blood
function canDonateTo(donorBlood, patientBlood) {
  const compatibleDonors = COMPATIBILITY_MAP[patientBlood] || [];
  return compatibleDonors.includes(donorBlood);
}

// ==========================================================================
// Database & Mock Data Initialization (localStorage)
// ==========================================================================
const DB = {
  getDonors: function() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.DONORS)) || [];
  },
  saveDonors: function(donors) {
    localStorage.setItem(STORAGE_KEYS.DONORS, JSON.stringify(donors));
  },

  getRequests: function() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.REQUESTS)) || [];
  },
  saveRequests: function(requests) {
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
  },

  getHistory: function() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORY)) || [];
  },
  saveHistory: function(history) {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
  },

  getSession: function() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) || null;
  },
  saveSession: function(session) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(session));
  },
  clearSession: function() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  // Seed default demo data if localStorage is empty
  init: function() {
    if (!localStorage.getItem(STORAGE_KEYS.DONORS)) {
      const initialDonors = [
        {
          id: 1,
          name: "Rahul Sharma",
          age: 28,
          gender: "Male",
          phone: "9876543210",
          email: "rahul@gmail.com",
          password: "donor123",
          bloodGroup: "O+",
          state: "Delhi",
          city: "Delhi",
          area: "Connaught Place",
          lastDonation: "2026-08-15",
          status: "Approved",
          availability: "Available"
        },
        {
          id: 2,
          name: "Priya Patel",
          age: 25,
          gender: "Female",
          phone: "9876543211",
          email: "priya@gmail.com",
          password: "donor123",
          bloodGroup: "A+",
          state: "Maharashtra",
          city: "Mumbai",
          area: "Andheri West",
          lastDonation: "2026-09-01",
          status: "Approved",
          availability: "Available"
        },
        {
          id: 3,
          name: "Amit Kumar",
          age: 32,
          gender: "Male",
          phone: "9876543212",
          email: "amit@gmail.com",
          password: "donor123",
          bloodGroup: "B+",
          state: "Delhi",
          city: "Delhi",
          area: "Karol Bagh",
          lastDonation: "",
          status: "Pending Approval",
          availability: "Available"
        },
        {
          id: 4,
          name: "Sneha Reddy",
          age: 24,
          gender: "Female",
          phone: "9876543213",
          email: "sneha@gmail.com",
          password: "donor123",
          bloodGroup: "AB+",
          state: "Karnataka",
          city: "Bengaluru",
          area: "Indiranagar",
          lastDonation: "2026-07-20",
          status: "Approved",
          availability: "Temporarily Unavailable"
        },
        {
          id: 5,
          name: "Vikram Singh",
          age: 35,
          gender: "Male",
          phone: "9876543214",
          email: "vikram@gmail.com",
          password: "donor123",
          bloodGroup: "O-",
          state: "Rajasthan",
          city: "Jaipur",
          area: "Malviya Nagar",
          lastDonation: "2026-06-10",
          status: "Approved",
          availability: "Available"
        }
      ];
      this.saveDonors(initialDonors);
    }

    if (!localStorage.getItem(STORAGE_KEYS.REQUESTS)) {
      const initialRequests = [
        {
          id: "REQ-1001",
          patientName: "Ramesh Verma",
          patientAge: 45,
          bloodGroup: "O+",
          units: 2,
          hospitalName: "AIIMS Hospital",
          hospitalAddress: "Ansari Nagar, Ward 3B",
          city: "Delhi",
          contactName: "Sunil Verma",
          contactPhone: "9812345678",
          requiredDate: "2026-11-08",
          emergency: "Urgent",
          notes: "Cardiac surgery planned",
          status: "Approved",
          createdAt: "2026-11-04",
          acceptedDonors: []
        },
        {
          id: "REQ-1002",
          patientName: "Kavita Rao",
          patientAge: 29,
          bloodGroup: "A+",
          units: 1,
          hospitalName: "Lilavati Hospital",
          hospitalAddress: "Bandra West, Room 102",
          city: "Mumbai",
          contactName: "Rajesh Rao",
          contactPhone: "9823456789",
          requiredDate: "2026-11-06",
          emergency: "Critical",
          notes: "Emergency maternity requirement",
          status: "Donor Found",
          createdAt: "2026-11-03",
          acceptedDonors: [2] // Priya Patel accepted
        },
        {
          id: "REQ-1003",
          patientName: "Sanjay Gupta",
          patientAge: 51,
          bloodGroup: "B+",
          units: 2,
          hospitalName: "Fortis Hospital",
          hospitalAddress: "Vasant Kunj",
          city: "Delhi",
          contactName: "Meena Gupta",
          contactPhone: "9834567890",
          requiredDate: "2026-11-02",
          emergency: "Normal",
          notes: "Orthopedic surgery recovery",
          status: "Fulfilled",
          createdAt: "2026-11-01",
          acceptedDonors: [3]
        },
        {
          id: "REQ-1004",
          patientName: "Deepak Mehta",
          patientAge: 38,
          bloodGroup: "O-",
          units: 1,
          hospitalName: "Apollo Hospital",
          hospitalAddress: "Sarita Vihar",
          city: "Delhi",
          contactName: "Pooja Mehta",
          contactPhone: "9845678901",
          requiredDate: "2026-11-07",
          emergency: "Critical",
          notes: "Accidental trauma emergency",
          status: "Pending",
          createdAt: "2026-11-05",
          acceptedDonors: []
        }
      ];
      this.saveRequests(initialRequests);
    }

    if (!localStorage.getItem(STORAGE_KEYS.HISTORY)) {
      const initialHistory = [
        {
          id: 1,
          donorId: 1,
          donorName: "Rahul Sharma",
          requestId: "REQ-1003",
          patientName: "Sanjay Gupta",
          hospital: "Fortis Hospital",
          city: "Delhi",
          date: "2026-11-02",
          status: "Completed"
        }
      ];
      this.saveHistory(initialHistory);
    }
  }
};

// ==========================================================================
// Toast Notification Utility
// ==========================================================================
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  
  let icon = "&#128712;";
  if (type === "success") icon = "&#10004;";
  if (type === "error") icon = "&#9888;";

  toast.innerHTML = `<span>${icon}</span> <span>${escapeHTML(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Helper: Escape HTML strings to protect against XSS
function escapeHTML(str) {
  if (!str && str !== 0) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ==========================================================================
// SPA Navigation & Routing System
// ==========================================================================
function navigateTo(viewId) {
  // Hide all views
  const views = document.querySelectorAll(".page-view");
  views.forEach(v => v.classList.remove("active"));

  // Show target view
  const targetView = document.getElementById(viewId);
  if (targetView) {
    targetView.classList.add("active");
  }

  // Update navbar links active styling
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    if (link.getAttribute("data-view") === viewId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Close mobile navigation drawer if open
  const navMenu = document.getElementById("nav-menu");
  if (navMenu) navMenu.classList.remove("open");

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Refresh target view specific data
  if (viewId === "view-home") {
    renderHomeView();
  } else if (viewId === "view-find-donors") {
    renderPublicDonors();
  } else if (viewId === "view-admin-dashboard") {
    // Check permission
    const session = DB.getSession();
    if (!session || session.role !== "admin") {
      showToast("Access Denied: Please log in as Administrator", "error");
      navigateTo("view-login");
      return;
    }
    renderAdminDashboard();
  } else if (viewId === "view-donor-dashboard") {
    // Check permission
    const session = DB.getSession();
    if (!session || session.role !== "donor") {
      showToast("Access Denied: Please log in as Donor", "error");
      navigateTo("view-login");
      return;
    }
    renderDonorDashboard();
  }
}

// ==========================================================================
// Authentication & Session Management
// ==========================================================================
function updateNavState() {
  const session = DB.getSession();
  const navRegister = document.getElementById("nav-link-register");
  const navLogin = document.getElementById("nav-link-login");
  const navAdminDash = document.getElementById("nav-admin-dash");
  const navDonorDash = document.getElementById("nav-donor-dash");
  const navLogoutItem = document.getElementById("nav-logout-item");

  if (!session) {
    if (navRegister) navRegister.style.display = "block";
    if (navLogin) navLogin.style.display = "block";
    if (navAdminDash) navAdminDash.style.display = "none";
    if (navDonorDash) navDonorDash.style.display = "none";
    if (navLogoutItem) navLogoutItem.style.display = "none";
  } else if (session.role === "admin") {
    if (navRegister) navRegister.style.display = "none";
    if (navLogin) navLogin.style.display = "none";
    if (navAdminDash) navAdminDash.style.display = "block";
    if (navDonorDash) navDonorDash.style.display = "none";
    if (navLogoutItem) navLogoutItem.style.display = "block";
  } else if (session.role === "donor") {
    if (navRegister) navRegister.style.display = "none";
    if (navLogin) navLogin.style.display = "none";
    if (navAdminDash) navAdminDash.style.display = "none";
    if (navDonorDash) navDonorDash.style.display = "block";
    if (navLogoutItem) navLogoutItem.style.display = "block";
  }
}

function switchLoginTab(tab) {
  const adminTab = document.getElementById("tab-admin-login");
  const donorTab = document.getElementById("tab-donor-login");
  const adminPane = document.getElementById("login-admin-pane");
  const donorPane = document.getElementById("login-donor-pane");

  if (tab === "admin") {
    adminTab.classList.add("active");
    donorTab.classList.remove("active");
    adminPane.classList.add("active");
    donorPane.classList.remove("active");
  } else {
    donorTab.classList.add("active");
    adminTab.classList.remove("active");
    donorPane.classList.add("active");
    adminPane.classList.remove("active");
  }
}

function handleAdminLogin(e) {
  e.preventDefault();
  const user = document.getElementById("admin-username").value.trim();
  const pass = document.getElementById("admin-password").value.trim();

  // Demonstration Admin Credentials
  if (user === "admin" && pass === "admin123") {
    const session = { role: "admin", username: "admin", loggedAt: new Date().toISOString() };
    DB.saveSession(session);
    updateNavState();
    showToast("Welcome Administrator! Logged in successfully.", "success");
    navigateTo("view-admin-dashboard");
  } else {
    showToast("Invalid Admin username or password (Use: admin / admin123)", "error");
  }
}

function handleDonorLogin(e) {
  e.preventDefault();
  const email = document.getElementById("donor-email").value.trim().toLowerCase();
  const pass = document.getElementById("donor-password").value;

  const donors = DB.getDonors();
  const donor = donors.find(d => d.email.toLowerCase() === email && d.password === pass);

  if (!donor) {
    showToast("Invalid email or password. Please try again.", "error");
    return;
  }

  // Check Approval Status
  if (donor.status === "Pending Approval") {
    showToast("Your account is pending Admin approval. Please wait for the admin to approve your registration.", "error");
    return;
  }

  if (donor.status === "Rejected") {
    showToast("Your registration was rejected by the administrator. Contact support.", "error");
    return;
  }

  // Successful Donor Login
  const session = {
    role: "donor",
    donorId: donor.id,
    name: donor.name,
    email: donor.email,
    bloodGroup: donor.bloodGroup,
    city: donor.city
  };
  DB.saveSession(session);
  updateNavState();
  showToast(`Welcome back, ${donor.name}!`, "success");
  navigateTo("view-donor-dashboard");
}

function logout() {
  DB.clearSession();
  updateNavState();
  showToast("Logged out successfully.", "info");
  navigateTo("view-home");
}

// ==========================================================================
// 1. HOME VIEW
// ==========================================================================
function renderHomeView() {
  const donors = DB.getDonors();
  const requests = DB.getRequests();

  // Counters
  const approvedDonors = donors.filter(d => d.status === "Approved");
  const fulfilledRequests = requests.filter(r => r.status === "Fulfilled");
  const activeRequests = requests.filter(r => r.status === "Approved" || r.status === "Pending" || r.status === "Donor Found");

  const totalDonorsEl = document.getElementById("home-total-donors");
  const fulfilledEl = document.getElementById("home-fulfilled-requests");
  const activeEl = document.getElementById("home-active-requests");

  if (totalDonorsEl) totalDonorsEl.textContent = approvedDonors.length;
  if (fulfilledEl) fulfilledEl.textContent = fulfilledRequests.length;
  if (activeEl) activeEl.textContent = activeRequests.length;

  // Render 8 Blood Group cards
  const bgGrid = document.getElementById("blood-groups-grid");
  if (bgGrid) {
    const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    bgGrid.innerHTML = bloodTypes.map(bg => {
      const count = approvedDonors.filter(d => d.bloodGroup === bg && d.availability === "Available").length;
      return `
        <div class="blood-group-card" onclick="filterByBloodGroupAndSearch('${bg}')">
          <div class="blood-group-tag">${bg}</div>
          <div class="blood-group-count">${count} Available</div>
        </div>
      `;
    }).join("");
  }
}

function filterByBloodGroupAndSearch(bg) {
  navigateTo("view-find-donors");
  const select = document.getElementById("filter-blood-group");
  if (select) {
    select.value = bg;
    renderPublicDonors();
  }
}

// ==========================================================================
// 2. PUBLIC FIND DONORS VIEW
// ==========================================================================
function renderPublicDonors() {
  const container = document.getElementById("public-donors-container");
  const countHeader = document.getElementById("donor-results-count");
  if (!container) return;

  const bloodGroupFilter = (document.getElementById("filter-blood-group")?.value || "").trim();
  const stateFilter = (document.getElementById("filter-state")?.value || "").trim().toLowerCase();
  const cityFilter = (document.getElementById("filter-city")?.value || "").trim().toLowerCase();
  const availFilter = (document.getElementById("filter-availability")?.value || "Available").trim();

  const donors = DB.getDonors();

  // ONLY Show Admin-Approved Donors publicly
  let filtered = donors.filter(d => d.status === "Approved");

  if (availFilter === "Available") {
    filtered = filtered.filter(d => d.availability === "Available");
  }

  if (bloodGroupFilter) {
    filtered = filtered.filter(d => d.bloodGroup === bloodGroupFilter);
  }

  if (stateFilter) {
    filtered = filtered.filter(d => (d.state || "").toLowerCase().includes(stateFilter));
  }

  if (cityFilter) {
    filtered = filtered.filter(d => (d.city || "").toLowerCase().includes(cityFilter));
  }

  if (countHeader) {
    countHeader.textContent = `Showing ${filtered.length} verified donor${filtered.length === 1 ? '' : 's'}`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1;" class="alert-box alert-warning text-center">
        <h4>No matching donors found</h4>
        <p>Try broadening your search criteria or submit an emergency <a href="#" onclick="navigateTo('view-request-blood'); return false;">Blood Request</a>.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(d => {
    let availClass = "status-available";
    if (d.availability === "Unavailable") availClass = "status-unavailable";
    if (d.availability === "Temporarily Unavailable") availClass = "status-temporarily-unavailable";

    return `
      <div class="donor-card-public">
        <div class="card-top">
          <div class="donor-name-title">&#128100; ${escapeHTML(d.name)}</div>
          <span class="blood-badge">${escapeHTML(d.bloodGroup)}</span>
        </div>
        <div class="donor-details-list">
          <div class="donor-detail-item">
            <strong>Location:</strong>
            <span>${escapeHTML(d.city)}, ${escapeHTML(d.state)}</span>
          </div>
          <div class="donor-detail-item">
            <strong>Area:</strong>
            <span>${escapeHTML(d.area || 'City Area')}</span>
          </div>
          <div class="donor-detail-item">
            <strong>Status:</strong>
            <span class="badge-status ${availClass}">${escapeHTML(d.availability)}</span>
          </div>
        </div>
        <div>
          <button class="btn btn-outline btn-block btn-sm" onclick="navigateTo('view-request-blood')">
            &#127973; Request Blood
          </button>
        </div>
      </div>
    `;
  }).join("");
}

// ==========================================================================
// 3. REQUEST BLOOD (PATIENTS / FAMILIES - NO LOGIN REQUIRED)
// ==========================================================================
function handleBloodRequestSubmit(e) {
  e.preventDefault();

  const patientName = document.getElementById("req-patient-name").value.trim();
  const patientAge = document.getElementById("req-patient-age").value.trim();
  const bloodGroup = document.getElementById("req-blood-group").value;
  const units = document.getElementById("req-units").value.trim();
  const emergency = document.getElementById("req-emergency").value;
  const hospitalName = document.getElementById("req-hospital-name").value.trim();
  const hospitalAddress = document.getElementById("req-hospital-address").value.trim();
  const city = document.getElementById("req-city").value.trim();
  const contactName = document.getElementById("req-contact-name").value.trim();
  const contactPhone = document.getElementById("req-contact-phone").value.trim();
  const requiredDate = document.getElementById("req-date").value;
  const notes = document.getElementById("req-notes").value.trim();

  if (!patientName || !bloodGroup || !units || !hospitalName || !city || !contactName || !contactPhone) {
    showToast("Please fill in all mandatory fields.", "error");
    return;
  }

  // Generate unique Request ID: REQ-XXXX
  const uniqueId = "REQ-" + Math.floor(1000 + Math.random() * 9000);

  const newRequest = {
    id: uniqueId,
    patientName,
    patientAge: parseInt(patientAge, 10),
    bloodGroup,
    units: parseInt(units, 10),
    emergency,
    hospitalName,
    hospitalAddress,
    city,
    contactName,
    contactPhone,
    requiredDate,
    notes,
    status: "Pending", // Step 2: Request appears in admin dashboard with Pending status
    createdAt: new Date().toISOString().split("T")[0],
    acceptedDonors: []
  };

  const requests = DB.getRequests();
  requests.unshift(newRequest);
  DB.saveRequests(requests);

  // Clear form
  document.getElementById("patient-blood-request-form").reset();

  // Show detailed confirmation and redirect to Track view
  showToast(`Blood Request submitted successfully! Your Request ID is: ${uniqueId}`, "success");

  // Populate tracking view and navigate to it
  navigateTo("view-track-request");
  const trackInput = document.getElementById("track-id-input");
  if (trackInput) {
    trackInput.value = uniqueId;
    trackRequestById(uniqueId);
  }
}

// ==========================================================================
// 4. REQUEST TRACKING SYSTEM
// ==========================================================================
function handleTrackRequestSubmit(e) {
  e.preventDefault();
  const id = document.getElementById("track-id-input").value.trim();
  if (!id) {
    showToast("Please enter a valid Blood Request ID", "error");
    return;
  }
  trackRequestById(id);
}

function trackRequestById(reqId) {
  const resultContainer = document.getElementById("track-result-container");
  if (!resultContainer) return;

  const requests = DB.getRequests();
  const req = requests.find(r => r.id.toUpperCase() === reqId.toUpperCase());

  if (!req) {
    resultContainer.style.display = "block";
    resultContainer.innerHTML = `
      <div class="alert-box alert-warning text-center">
        <h4>No Blood Request Found</h4>
        <p>Could not find any request with ID: <strong>${escapeHTML(reqId)}</strong>. Please verify the ID and try again.</p>
      </div>
    `;
    return;
  }

  // Calculate matching approved donors in same city & compatible blood group
  const donors = DB.getDonors();
  const matchingDonors = donors.filter(d => 
    d.status === "Approved" && 
    d.availability === "Available" &&
    canDonateTo(d.bloodGroup, req.bloodGroup) &&
    d.city.toLowerCase() === req.city.toLowerCase()
  );

  let statusBadgeClass = "status-pending";
  if (req.status === "Approved") statusBadgeClass = "status-approved";
  if (req.status === "Donor Found") statusBadgeClass = "status-donor-found";
  if (req.status === "Fulfilled") statusBadgeClass = "status-fulfilled";
  if (req.status === "Rejected") statusBadgeClass = "status-rejected";

  resultContainer.style.display = "block";
  resultContainer.innerHTML = `
    <div class="track-result-card">
      <div class="track-header">
        <div>
          <h2>Request: ${escapeHTML(req.id)}</h2>
          <span class="text-muted">Submitted on: ${escapeHTML(req.createdAt)}</span>
        </div>
        <span class="badge-status ${statusBadgeClass}" style="font-size: 0.95rem; padding: 6px 14px;">
          ${escapeHTML(req.status)}
        </span>
      </div>

      <div class="track-details-grid">
        <div class="track-stat-pill">
          <div class="num">${escapeHTML(req.bloodGroup)}</div>
          <div class="lbl">Required Blood Group (${escapeHTML(req.units)} Unit${req.units > 1 ? 's' : ''})</div>
        </div>
        <div class="track-stat-pill">
          <div class="num">${escapeHTML(req.emergency)}</div>
          <div class="lbl">Emergency Level</div>
        </div>
        <div class="track-stat-pill">
          <div class="num">${matchingDonors.length}</div>
          <div class="lbl">Matching Compatible Donors Nearby</div>
        </div>
        <div class="track-stat-pill">
          <div class="num">${(req.acceptedDonors || []).length}</div>
          <div class="lbl">Donors Who Accepted Request</div>
        </div>
      </div>

      <div class="donor-details-list">
        <div class="donor-detail-item"><strong>Patient:</strong> <span>${escapeHTML(req.patientName)} (Age ${escapeHTML(req.patientAge)})</span></div>
        <div class="donor-detail-item"><strong>Hospital:</strong> <span>${escapeHTML(req.hospitalName)}, ${escapeHTML(req.hospitalAddress)}</span></div>
        <div class="donor-detail-item"><strong>City:</strong> <span>${escapeHTML(req.city)}</span></div>
        <div class="donor-detail-item"><strong>Required Date:</strong> <span>${escapeHTML(req.requiredDate)}</span></div>
        <div class="donor-detail-item"><strong>Attender:</strong> <span>${escapeHTML(req.contactName)} (${escapeHTML(req.contactPhone)})</span></div>
        ${req.notes ? `<div class="donor-detail-item"><strong>Medical Notes:</strong> <span>${escapeHTML(req.notes)}</span></div>` : ''}
      </div>

      <div class="alert-box alert-info mt-3">
        <strong>Status Workflow Info:</strong>
        ${req.status === 'Pending' ? 'Your request has been submitted and is currently being verified by an administrator.' : ''}
        ${req.status === 'Approved' ? 'Your request has been approved by the admin and sent to matching compatible blood donors.' : ''}
        ${req.status === 'Donor Found' ? 'Lifesaving donor(s) have accepted your request! Hospital coordinator will be notified.' : ''}
        ${req.status === 'Fulfilled' ? 'Donation confirmed completed! Thank you for using Local Blood Donor Directory.' : ''}
        ${req.status === 'Rejected' ? 'This request could not be processed. Please call our 24/7 hotline 1800-BLOOD-HELP.' : ''}
      </div>
    </div>
  `;
}

// ==========================================================================
// 5. DONOR REGISTRATION SYSTEM
// ==========================================================================
function handleDonorRegistrationSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("reg-fullname").value.trim();
  const age = parseInt(document.getElementById("reg-age").value.trim(), 10);
  const gender = document.getElementById("reg-gender").value;
  const bloodGroup = document.getElementById("reg-blood-group").value;
  const lastDonation = document.getElementById("reg-last-donation").value;
  const mobile = document.getElementById("reg-mobile").value.trim();
  const email = document.getElementById("reg-email").value.trim().toLowerCase();
  const password = document.getElementById("reg-password").value;
  const state = document.getElementById("reg-state").value.trim();
  const city = document.getElementById("reg-city").value.trim();
  const area = document.getElementById("reg-area").value.trim();

  if (!name || !age || !gender || !bloodGroup || !mobile || !email || !password || !state || !city || !area) {
    showToast("Please fill in all mandatory fields.", "error");
    return;
  }

  // Prevent duplicate email registrations
  const donors = DB.getDonors();
  const existing = donors.find(d => d.email.toLowerCase() === email);
  if (existing) {
    showToast("A donor with this email address is already registered. Please login.", "error");
    return;
  }

  const newDonor = {
    id: Date.now(),
    name,
    age,
    gender,
    bloodGroup,
    lastDonation,
    phone: mobile,
    email,
    password,
    state,
    city,
    area,
    status: "Pending Approval", // New registrations must be approved by admin before login
    availability: "Available"
  };

  donors.unshift(newDonor);
  DB.saveDonors(donors);

  document.getElementById("donor-registration-form").reset();

  showToast("Registration submitted successfully! Please wait for Admin approval before logging in.", "success");
  
  // Navigate to login page
  navigateTo("view-login");
  switchLoginTab("donor");
}

// ==========================================================================
// 6. ADMIN DASHBOARD & WORKFLOW
// ==========================================================================
function switchAdminTab(subtab) {
  const tabs = document.querySelectorAll(".sidebar-link[data-sub]");
  tabs.forEach(t => {
    if (t.getAttribute("data-sub") === `admin-${subtab}`) {
      t.classList.add("active");
    } else {
      t.classList.remove("active");
    }
  });

  const views = document.querySelectorAll(".admin-subview");
  views.forEach(v => v.classList.remove("active"));

  const target = document.getElementById(`sub-admin-${subtab}`);
  if (target) target.classList.add("active");

  if (subtab === "donors") {
    renderAdminDonorsTable();
  } else if (subtab === "requests") {
    renderAdminRequestsTable();
  } else {
    renderAdminDashboard();
  }
}

function renderAdminDashboard() {
  const donors = DB.getDonors();
  const requests = DB.getRequests();

  const totalDonors = donors.length;
  const approvedDonors = donors.filter(d => d.status === "Approved").length;
  const pendingDonors = donors.filter(d => d.status === "Pending Approval").length;

  const totalRequests = requests.length;
  const pendingRequests = requests.filter(r => r.status === "Pending").length;
  const fulfilledRequests = requests.filter(r => r.status === "Fulfilled").length;

  // Overview stats
  document.getElementById("stat-total-donors").textContent = totalDonors;
  document.getElementById("stat-approved-donors").textContent = approvedDonors;
  document.getElementById("stat-pending-donors").textContent = pendingDonors;
  document.getElementById("stat-total-requests").textContent = totalRequests;
  document.getElementById("stat-pending-requests").textContent = pendingRequests;
  document.getElementById("stat-fulfilled-requests").textContent = fulfilledRequests;

  // Sidebar badges
  const badgeDonors = document.getElementById("admin-badge-pending-donors");
  const badgeReqs = document.getElementById("admin-badge-pending-requests");
  if (badgeDonors) badgeDonors.textContent = pendingDonors;
  if (badgeReqs) badgeReqs.textContent = pendingRequests;
}

// Admin Donor Management Table
function renderAdminDonorsTable() {
  const tbody = document.getElementById("admin-donors-tbody");
  if (!tbody) return;

  const searchQuery = (document.getElementById("admin-search-donor")?.value || "").toLowerCase().trim();
  const bloodFilter = (document.getElementById("admin-filter-donor-group")?.value || "").trim();
  const statusFilter = (document.getElementById("admin-filter-donor-status")?.value || "").trim();

  let donors = DB.getDonors();

  if (searchQuery) {
    donors = donors.filter(d => 
      d.name.toLowerCase().includes(searchQuery) ||
      d.email.toLowerCase().includes(searchQuery) ||
      d.city.toLowerCase().includes(searchQuery) ||
      (d.phone || "").includes(searchQuery)
    );
  }

  if (bloodFilter) {
    donors = donors.filter(d => d.bloodGroup === bloodFilter);
  }

  if (statusFilter) {
    donors = donors.filter(d => d.status === statusFilter);
  }

  if (donors.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center p-3 text-muted">No donor records found matching filters.</td></tr>`;
    return;
  }

  tbody.innerHTML = donors.map(d => {
    let statusClass = "status-pending-approval";
    if (d.status === "Approved") statusClass = "status-approved";
    if (d.status === "Rejected") statusClass = "status-rejected";

    let availClass = "status-available";
    if (d.availability === "Unavailable") availClass = "status-unavailable";
    if (d.availability === "Temporarily Unavailable") availClass = "status-temporarily-unavailable";

    return `
      <tr>
        <td>
          <strong>${escapeHTML(d.name)}</strong><br>
          <small class="text-muted">Age: ${escapeHTML(d.age)} | ${escapeHTML(d.gender)}</small>
        </td>
        <td><span class="blood-badge">${escapeHTML(d.bloodGroup)}</span></td>
        <td>
          <span>&#128222; ${escapeHTML(d.phone)}</span><br>
          <small class="text-muted">&#128231; ${escapeHTML(d.email)}</small>
        </td>
        <td>${escapeHTML(d.city)}, ${escapeHTML(d.state)}</td>
        <td><span class="badge-status ${statusClass}">${escapeHTML(d.status)}</span></td>
        <td>
          <select class="btn btn-sm" onchange="adminUpdateDonorAvailability(${d.id}, this.value)">
            <option value="Available" ${d.availability === 'Available' ? 'selected' : ''}>Available</option>
            <option value="Unavailable" ${d.availability === 'Unavailable' ? 'selected' : ''}>Unavailable</option>
            <option value="Temporarily Unavailable" ${d.availability === 'Temporarily Unavailable' ? 'selected' : ''}>Temp Unavailable</option>
          </select>
        </td>
        <td>
          <div class="action-buttons">
            ${d.status !== 'Approved' ? `<button class="btn btn-sm btn-success" title="Approve Donor" onclick="adminApproveDonor(${d.id})">&#10004; Approve</button>` : ''}
            ${d.status !== 'Rejected' ? `<button class="btn btn-sm btn-outline" title="Reject Donor" onclick="adminRejectDonor(${d.id})">&#10539; Reject</button>` : ''}
            <button class="btn btn-sm btn-secondary" title="Edit Donor" onclick="adminOpenEditDonorModal(${d.id})">&#9998; Edit</button>
            <button class="btn btn-sm btn-danger" title="Delete Donor" onclick="adminDeleteDonor(${d.id})">&#128465;</button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

function adminApproveDonor(donorId) {
  const donors = DB.getDonors();
  const donor = donors.find(d => d.id === donorId);
  if (donor) {
    donor.status = "Approved";
    DB.saveDonors(donors);
    showToast(`Donor "${donor.name}" has been Approved! They can now log in.`, "success");
    renderAdminDonorsTable();
    renderAdminDashboard();
  }
}

function adminRejectDonor(donorId) {
  const donors = DB.getDonors();
  const donor = donors.find(d => d.id === donorId);
  if (donor) {
    donor.status = "Rejected";
    DB.saveDonors(donors);
    showToast(`Donor "${donor.name}" registration was marked Rejected.`, "info");
    renderAdminDonorsTable();
    renderAdminDashboard();
  }
}

function adminUpdateDonorAvailability(donorId, newAvail) {
  const donors = DB.getDonors();
  const donor = donors.find(d => d.id === donorId);
  if (donor) {
    donor.availability = newAvail;
    DB.saveDonors(donors);
    showToast(`Availability for "${donor.name}" updated to ${newAvail}`, "success");
    renderAdminDonorsTable();
  }
}

function adminDeleteDonor(donorId) {
  if (!confirm("Are you sure you want to permanently delete this donor account?")) return;
  let donors = DB.getDonors();
  const target = donors.find(d => d.id === donorId);
  donors = donors.filter(d => d.id !== donorId);
  DB.saveDonors(donors);
  showToast(`Donor "${target?.name || ''}" account deleted.`, "info");
  renderAdminDonorsTable();
  renderAdminDashboard();
}

function adminOpenEditDonorModal(donorId) {
  const donors = DB.getDonors();
  const donor = donors.find(d => d.id === donorId);
  if (!donor) return;

  document.getElementById("modal-donor-id").value = donor.id;
  document.getElementById("modal-donor-name").value = donor.name;
  document.getElementById("modal-donor-blood").value = donor.bloodGroup;
  document.getElementById("modal-donor-age").value = donor.age;
  document.getElementById("modal-donor-phone").value = donor.phone;
  document.getElementById("modal-donor-city").value = donor.city;
  document.getElementById("modal-donor-status").value = donor.status;
  document.getElementById("modal-donor-avail").value = donor.availability;

  openModal("modal-edit-donor");
}

function handleAdminEditDonorSubmit(e) {
  e.preventDefault();
  const donorId = parseInt(document.getElementById("modal-donor-id").value, 10);
  const donors = DB.getDonors();
  const donor = donors.find(d => d.id === donorId);
  if (!donor) return;

  donor.name = document.getElementById("modal-donor-name").value.trim();
  donor.bloodGroup = document.getElementById("modal-donor-blood").value;
  donor.age = parseInt(document.getElementById("modal-donor-age").value, 10);
  donor.phone = document.getElementById("modal-donor-phone").value.trim();
  donor.city = document.getElementById("modal-donor-city").value.trim();
  donor.status = document.getElementById("modal-donor-status").value;
  donor.availability = document.getElementById("modal-donor-avail").value;

  DB.saveDonors(donors);
  closeModal("modal-edit-donor");
  showToast("Donor details updated successfully.", "success");
  renderAdminDonorsTable();
  renderAdminDashboard();
}

// Admin Blood Requests Management Table
function renderAdminRequestsTable() {
  const tbody = document.getElementById("admin-requests-tbody");
  if (!tbody) return;

  const searchQuery = (document.getElementById("admin-search-request")?.value || "").toLowerCase().trim();
  const statusFilter = (document.getElementById("admin-filter-request-status")?.value || "").trim();

  let requests = DB.getRequests();

  if (searchQuery) {
    requests = requests.filter(r => 
      r.id.toLowerCase().includes(searchQuery) ||
      r.patientName.toLowerCase().includes(searchQuery) ||
      r.hospitalName.toLowerCase().includes(searchQuery) ||
      r.city.toLowerCase().includes(searchQuery)
    );
  }

  if (statusFilter) {
    requests = requests.filter(r => r.status === statusFilter);
  }

  if (requests.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="text-center p-3 text-muted">No blood requests found.</td></tr>`;
    return;
  }

  tbody.innerHTML = requests.map(r => {
    let statusClass = "status-pending";
    if (r.status === "Approved") statusClass = "status-approved";
    if (r.status === "Donor Found") statusClass = "status-donor-found";
    if (r.status === "Fulfilled") statusClass = "status-fulfilled";
    if (r.status === "Rejected") statusClass = "status-rejected";

    let emClass = "status-normal";
    if (r.emergency === "Urgent") emClass = "status-urgent";
    if (r.emergency === "Critical") emClass = "status-critical";

    const acceptedCount = (r.acceptedDonors || []).length;

    return `
      <tr>
        <td><strong>${escapeHTML(r.id)}</strong></td>
        <td>
          <strong>${escapeHTML(r.patientName)}</strong> (Age ${escapeHTML(r.patientAge)})<br>
          <small class="text-muted">&#128222; ${escapeHTML(r.contactName)}: ${escapeHTML(r.contactPhone)}</small>
        </td>
        <td>
          <span class="blood-badge">${escapeHTML(r.bloodGroup)}</span>
          <small>(${escapeHTML(r.units)} Unit${r.units > 1 ? 's' : ''})</small>
        </td>
        <td>
          <strong>${escapeHTML(r.hospitalName)}</strong><br>
          <small class="text-muted">${escapeHTML(r.city)} (${escapeHTML(r.requiredDate)})</small>
        </td>
        <td><span class="badge-status ${emClass}">${escapeHTML(r.emergency)}</span></td>
        <td><span class="badge-status ${statusClass}">${escapeHTML(r.status)}</span></td>
        <td>
          <span class="badge-status ${acceptedCount > 0 ? 'status-approved' : 'status-pending'}">
            ${acceptedCount} Donor${acceptedCount === 1 ? '' : 's'}
          </span>
        </td>
        <td>
          <div class="action-buttons">
            ${r.status === 'Pending' ? `
              <button class="btn btn-sm btn-success" title="Approve Request" onclick="adminApproveRequest('${r.id}')">&#10004; Approve</button>
              <button class="btn btn-sm btn-danger" title="Reject Request" onclick="adminRejectRequest('${r.id}')">&#10539; Reject</button>
            ` : ''}
            <button class="btn btn-sm btn-primary" title="Find Matching Donors" onclick="adminFindMatchingDonors('${r.id}')">&#128269; Match Donors</button>
            ${(r.status === 'Approved' || r.status === 'Donor Found') ? `
              <button class="btn btn-sm btn-success" title="Mark Fulfilled" onclick="adminMarkRequestFulfilled('${r.id}')">&#127942; Mark Fulfilled</button>
            ` : ''}
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

// Step 3: Admin checks and approves blood request
function adminApproveRequest(reqId) {
  const requests = DB.getRequests();
  const req = requests.find(r => r.id === reqId);
  if (req) {
    req.status = "Approved"; // Step 4: After approval, system searches for matching donors
    DB.saveRequests(requests);
    showToast(`Blood Request ${req.id} Approved! Compatible donors can now view and accept it.`, "success");
    renderAdminRequestsTable();
    renderAdminDashboard();
  }
}

function adminRejectRequest(reqId) {
  const requests = DB.getRequests();
  const req = requests.find(r => r.id === reqId);
  if (req) {
    req.status = "Rejected";
    DB.saveRequests(requests);
    showToast(`Blood Request ${req.id} marked as Rejected.`, "info");
    renderAdminRequestsTable();
    renderAdminDashboard();
  }
}

// Step 4 & 7: Admin finds matching donors and sees who accepted
function adminFindMatchingDonors(reqId) {
  const requests = DB.getRequests();
  const req = requests.find(r => r.id === reqId);
  if (!req) return;

  const donors = DB.getDonors();
  // Matching criteria:
  // 1. Blood compatibility
  // 2. City
  // 3. Admin-approved account
  // 4. Available status
  const matchingDonors = donors.filter(d => 
    d.status === "Approved" &&
    canDonateTo(d.bloodGroup, req.bloodGroup) &&
    d.city.toLowerCase() === req.city.toLowerCase()
  );

  const titleEl = document.getElementById("modal-match-title");
  const summaryEl = document.getElementById("modal-match-summary");
  const tbodyEl = document.getElementById("modal-match-tbody");

  if (titleEl) titleEl.textContent = `Matching Donors for Request ${req.id} (${req.patientName})`;
  if (summaryEl) {
    summaryEl.innerHTML = `
      <strong>Requirement:</strong> Patient needs <strong>${req.bloodGroup}</strong> in <strong>${req.city}</strong> at <strong>${req.hospitalName}</strong>.<br>
      <strong>Compatible Blood Groups:</strong> ${COMPATIBILITY_MAP[req.bloodGroup].join(", ")} | <strong>Found:</strong> ${matchingDonors.length} compatible donor(s) in this city.
    `;
  }

  if (tbodyEl) {
    if (matchingDonors.length === 0) {
      tbodyEl.innerHTML = `<tr><td colspan="6" class="text-center p-3 text-muted">No approved donors found matching ${req.bloodGroup} in ${req.city}.</td></tr>`;
    } else {
      tbodyEl.innerHTML = matchingDonors.map(d => {
        const hasAccepted = (req.acceptedDonors || []).includes(d.id);
        return `
          <tr>
            <td><strong>${escapeHTML(d.name)}</strong></td>
            <td><span class="blood-badge">${escapeHTML(d.bloodGroup)}</span></td>
            <td>${escapeHTML(d.city)}</td>
            <td>${escapeHTML(d.phone)}</td>
            <td><span class="badge-status ${d.availability === 'Available' ? 'status-available' : 'status-unavailable'}">${escapeHTML(d.availability)}</span></td>
            <td>
              <span class="badge-status ${hasAccepted ? 'status-approved' : 'status-pending'}">
                ${hasAccepted ? '&#10004; Accepted' : 'Pending Response'}
              </span>
            </td>
          </tr>
        `;
      }).join("");
    }
  }

  openModal("modal-match-donors");
}

// Step 8: Admin marks request as Fulfilled
function adminMarkRequestFulfilled(reqId) {
  if (!confirm(`Mark Blood Request ${reqId} as Fulfilled? This confirms the donation was successfully completed.`)) return;

  const requests = DB.getRequests();
  const req = requests.find(r => r.id === reqId);
  if (!req) return;

  req.status = "Fulfilled";
  DB.saveRequests(requests);

  // Add to donation history
  const history = DB.getHistory();
  const donors = DB.getDonors();

  (req.acceptedDonors || []).forEach(donorId => {
    const d = donors.find(item => item.id === donorId);
    history.push({
      id: Date.now() + Math.random(),
      donorId: donorId,
      donorName: d ? d.name : "Volunteer Donor",
      requestId: req.id,
      patientName: req.patientName,
      hospital: req.hospitalName,
      city: req.city,
      date: new Date().toISOString().split("T")[0],
      status: "Completed"
    });
  });
  DB.saveHistory(history);

  showToast(`Blood Request ${reqId} marked as Fulfilled! Statistics updated.`, "success");
  renderAdminRequestsTable();
  renderAdminDashboard();
}

// ==========================================================================
// 7. DONOR DASHBOARD & WORKFLOW
// ==========================================================================
function switchDonorTab(subtab) {
  const tabs = document.querySelectorAll(".sidebar-link[data-sub]");
  tabs.forEach(t => {
    if (t.getAttribute("data-sub") === `donor-${subtab}`) {
      t.classList.add("active");
    } else {
      t.classList.remove("active");
    }
  });

  const views = document.querySelectorAll(".donor-subview");
  views.forEach(v => v.classList.remove("active"));

  const target = document.getElementById(`sub-donor-${subtab}`);
  if (target) target.classList.add("active");

  if (subtab === "matching") {
    renderDonorMatchingRequests();
  } else if (subtab === "accepted") {
    renderDonorAcceptedRequests();
  } else if (subtab === "history") {
    renderDonorDonationHistory();
  } else {
    renderDonorDashboard();
  }
}

function renderDonorDashboard() {
  const session = DB.getSession();
  if (!session || session.role !== "donor") return;

  const donors = DB.getDonors();
  const donor = donors.find(d => d.id === session.donorId);
  if (!donor) return;

  // Header & sidebar labels
  document.getElementById("donor-dash-sidebar-name").textContent = donor.name;
  document.getElementById("donor-dash-sidebar-group").textContent = `Blood Group: ${donor.bloodGroup}`;
  document.getElementById("donor-welcome-name").textContent = donor.name;

  // Summary cards
  document.getElementById("donor-card-blood-group").textContent = donor.bloodGroup;
  document.getElementById("donor-card-city").textContent = donor.city;

  const approvalBadge = document.getElementById("donor-card-approval-badge");
  if (approvalBadge) {
    approvalBadge.className = `badge-status ${donor.status === 'Approved' ? 'status-approved' : 'status-pending-approval'}`;
    approvalBadge.textContent = donor.status;
  }

  const availBadge = document.getElementById("donor-card-avail-badge");
  if (availBadge) {
    let cls = "status-available";
    if (donor.availability === "Unavailable") cls = "status-unavailable";
    if (donor.availability === "Temporarily Unavailable") cls = "status-temporarily-unavailable";
    availBadge.className = `badge-status ${cls}`;
    availBadge.textContent = donor.availability;
  }

  // Quick availability select
  const quickSelect = document.getElementById("donor-quick-avail-select");
  if (quickSelect) quickSelect.value = donor.availability;

  // Edit profile form pre-fill
  document.getElementById("edit-donor-name").value = donor.name || "";
  document.getElementById("edit-donor-phone").value = donor.phone || "";
  document.getElementById("edit-donor-state").value = donor.state || "";
  document.getElementById("edit-donor-city").value = donor.city || "";
  document.getElementById("edit-donor-area").value = donor.area || "";
  document.getElementById("edit-donor-last-date").value = donor.lastDonation || "";

  // Badge count for matching requests
  const requests = DB.getRequests();
  const matchingCount = requests.filter(r => 
    (r.status === "Approved" || r.status === "Donor Found") &&
    canDonateTo(donor.bloodGroup, r.bloodGroup) &&
    !(r.acceptedDonors || []).includes(donor.id)
  ).length;

  const badgeMatching = document.getElementById("donor-badge-matching");
  if (badgeMatching) badgeMatching.textContent = matchingCount;
}

function saveDonorAvailability() {
  const session = DB.getSession();
  if (!session || session.role !== "donor") return;

  const newAvail = document.getElementById("donor-quick-avail-select").value;
  const donors = DB.getDonors();
  const donor = donors.find(d => d.id === session.donorId);
  if (!donor) return;

  donor.availability = newAvail;
  DB.saveDonors(donors);

  showToast(`Availability status updated to "${newAvail}"`, "success");
  renderDonorDashboard();
}

function handleDonorEditProfileSubmit(e) {
  e.preventDefault();
  const session = DB.getSession();
  if (!session || session.role !== "donor") return;

  const donors = DB.getDonors();
  const donor = donors.find(d => d.id === session.donorId);
  if (!donor) return;

  donor.name = document.getElementById("edit-donor-name").value.trim();
  donor.phone = document.getElementById("edit-donor-phone").value.trim();
  donor.state = document.getElementById("edit-donor-state").value.trim();
  donor.city = document.getElementById("edit-donor-city").value.trim();
  donor.area = document.getElementById("edit-donor-area").value.trim();
  donor.lastDonation = document.getElementById("edit-donor-last-date").value;

  const newPass = document.getElementById("edit-donor-password").value.trim();
  if (newPass) {
    if (newPass.length < 6) {
      showToast("Password must be at least 6 characters long.", "error");
      return;
    }
    donor.password = newPass;
  }

  DB.saveDonors(donors);
  session.name = donor.name;
  session.city = donor.city;
  DB.saveSession(session);

  showToast("Profile details updated successfully!", "success");
  renderDonorDashboard();
}

// Step 5: Matching donors see approved requests in their dashboard
function renderDonorMatchingRequests() {
  const container = document.getElementById("donor-matching-requests-container");
  if (!container) return;

  const session = DB.getSession();
  const donors = DB.getDonors();
  const donor = donors.find(d => d.id === session.donorId);
  if (!donor) return;

  const requests = DB.getRequests();

  // Show requests that are Approved or Donor Found, matching compatibility, and not yet accepted by this donor
  const matching = requests.filter(r => 
    (r.status === "Approved" || r.status === "Donor Found") &&
    canDonateTo(donor.bloodGroup, r.bloodGroup) &&
    !(r.acceptedDonors || []).includes(donor.id)
  );

  if (matching.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1;" class="alert-box alert-info text-center">
        <h4>No Pending Matching Requests</h4>
        <p>There are no emergency requests requiring your compatible blood type (<strong>${escapeHTML(donor.bloodGroup)}</strong>) right now. Thank you for staying ready!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = matching.map(r => {
    let emBadge = "status-normal";
    if (r.emergency === "Urgent") emBadge = "status-urgent";
    if (r.emergency === "Critical") emBadge = "status-critical";

    return `
      <div class="request-card urgent-border">
        <div class="request-card-header">
          <div>
            <h4>${escapeHTML(r.patientName)}</h4>
            <small class="text-muted">Request ID: ${escapeHTML(r.id)}</small>
          </div>
          <span class="blood-badge">${escapeHTML(r.bloodGroup)}</span>
        </div>
        <ul class="request-details-list">
          <li><strong>Emergency:</strong> <span class="badge-status ${emBadge}">${escapeHTML(r.emergency)}</span></li>
          <li><strong>Units Needed:</strong> ${escapeHTML(r.units)} Unit(s)</li>
          <li><strong>Hospital:</strong> ${escapeHTML(r.hospitalName)}, ${escapeHTML(r.hospitalAddress)}</li>
          <li><strong>City:</strong> ${escapeHTML(r.city)}</li>
          <li><strong>Required Date:</strong> ${escapeHTML(r.requiredDate)}</li>
          <li><strong>Attender:</strong> ${escapeHTML(r.contactName)} (${escapeHTML(r.contactPhone)})</li>
          ${r.notes ? `<li><strong>Notes:</strong> ${escapeHTML(r.notes)}</li>` : ''}
        </ul>
        <div class="hero-buttons">
          <button class="btn btn-success btn-block" onclick="donorAcceptRequest('${r.id}')">
            &#10004; Accept Blood Request
          </button>
          <button class="btn btn-outline btn-block btn-sm" onclick="donorDeclineRequest('${r.id}')">
            Decline
          </button>
        </div>
      </div>
    `;
  }).join("");
}

// Step 6: Donor accepts blood request
function donorAcceptRequest(reqId) {
  const session = DB.getSession();
  const requests = DB.getRequests();
  const req = requests.find(r => r.id === reqId);
  if (!req) return;

  if (!req.acceptedDonors) req.acceptedDonors = [];
  if (!req.acceptedDonors.includes(session.donorId)) {
    req.acceptedDonors.push(session.donorId);
  }

  // Update request status to 'Donor Found' if it was 'Approved'
  if (req.status === "Approved") {
    req.status = "Donor Found";
  }

  DB.saveRequests(requests);
  showToast(`Thank you! You have accepted request ${req.id}. Hospital coordinators have been informed.`, "success");
  
  // Refresh matching & accepted views
  renderDonorDashboard();
  renderDonorMatchingRequests();
}

function donorDeclineRequest(reqId) {
  showToast(`Request ${reqId} declined. It will remain available for other donors.`, "info");
  // Simply hide by re-rendering or user discretion
}

function renderDonorAcceptedRequests() {
  const container = document.getElementById("donor-accepted-requests-container");
  if (!container) return;

  const session = DB.getSession();
  const requests = DB.getRequests();

  const accepted = requests.filter(r => (r.acceptedDonors || []).includes(session.donorId));

  if (accepted.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1;" class="alert-box alert-warning text-center">
        <h4>No Accepted Requests Yet</h4>
        <p>You have not accepted any emergency requests yet. Check the <strong>Matching Requests</strong> tab to help patients in need.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = accepted.map(r => {
    let statusClass = "status-approved";
    if (r.status === "Fulfilled") statusClass = "status-fulfilled";

    return `
      <div class="request-card">
        <div class="request-card-header">
          <div>
            <h4>${escapeHTML(r.patientName)}</h4>
            <small class="text-muted">Request ID: ${escapeHTML(r.id)}</small>
          </div>
          <span class="blood-badge">${escapeHTML(r.bloodGroup)}</span>
        </div>
        <ul class="request-details-list">
          <li><strong>Current Status:</strong> <span class="badge-status ${statusClass}">${escapeHTML(r.status)}</span></li>
          <li><strong>Hospital:</strong> ${escapeHTML(r.hospitalName)}, ${escapeHTML(r.hospitalAddress)}</li>
          <li><strong>City:</strong> ${escapeHTML(r.city)}</li>
          <li><strong>Contact:</strong> ${escapeHTML(r.contactName)} (${escapeHTML(r.contactPhone)})</li>
          <li><strong>Required Date:</strong> ${escapeHTML(r.requiredDate)}</li>
        </ul>
        <div class="alert-box alert-success" style="font-size: 0.82rem; padding: 8px 12px;">
          &#10004; You accepted this request. Please coordinate with the hospital attender for donation.
        </div>
      </div>
    `;
  }).join("");
}

function renderDonorDonationHistory() {
  const tbody = document.getElementById("donor-history-tbody");
  if (!tbody) return;

  const session = DB.getSession();
  const history = DB.getHistory();

  const myHistory = history.filter(h => h.donorId === session.donorId);

  if (myHistory.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center p-3 text-muted">No completed donation records yet. Once a request is marked fulfilled, it will be recorded here.</td></tr>`;
    return;
  }

  tbody.innerHTML = myHistory.map(h => `
    <tr>
      <td>${escapeHTML(h.date)}</td>
      <td><strong>${escapeHTML(h.patientName)}</strong></td>
      <td>${escapeHTML(h.hospital)}</td>
      <td>${escapeHTML(h.city)}</td>
      <td><span class="badge-status status-fulfilled">&#10004; ${escapeHTML(h.status)}</span></td>
    </tr>
  `).join("");
}

// ==========================================================================
// Modal Utilities
// ==========================================================================
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add("active");
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove("active");
}

// Close modal when clicking on backdrop
window.addEventListener("click", function(e) {
  if (e.target.classList.contains("modal")) {
    e.target.classList.remove("active");
  }
});

// ==========================================================================
// Initialization & Event Listeners
// ==========================================================================
document.addEventListener("DOMContentLoaded", function() {
  // 1. Initialize Database with sample data
  DB.init();

  // 2. Setup Navbar links routing
  document.querySelectorAll(".nav-link[data-view]").forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const viewId = this.getAttribute("data-view");
      navigateTo(viewId);
    });
  });

  // Mobile navbar toggle
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });
  }

  // 3. Form submissions
  const reqForm = document.getElementById("patient-blood-request-form");
  if (reqForm) reqForm.addEventListener("submit", handleBloodRequestSubmit);

  const trackForm = document.getElementById("track-request-form");
  if (trackForm) trackForm.addEventListener("submit", handleTrackRequestSubmit);

  const regForm = document.getElementById("donor-registration-form");
  if (regForm) regForm.addEventListener("submit", handleDonorRegistrationSubmit);

  const adminLoginForm = document.getElementById("admin-login-form");
  if (adminLoginForm) adminLoginForm.addEventListener("submit", handleAdminLogin);

  const donorLoginForm = document.getElementById("donor-login-form");
  if (donorLoginForm) donorLoginForm.addEventListener("submit", handleDonorLogin);

  const editProfileForm = document.getElementById("donor-edit-profile-form");
  if (editProfileForm) editProfileForm.addEventListener("submit", handleDonorEditProfileSubmit);

  const adminEditDonorForm = document.getElementById("admin-modal-edit-donor-form");
  if (adminEditDonorForm) adminEditDonorForm.addEventListener("submit", handleAdminEditDonorSubmit);

  const publicSearchForm = document.getElementById("public-donor-search-form");
  if (publicSearchForm) {
    publicSearchForm.addEventListener("submit", function(e) {
      e.preventDefault();
      renderPublicDonors();
    });
  }

  const resetSearchBtn = document.getElementById("btn-reset-donor-search");
  if (resetSearchBtn) {
    resetSearchBtn.addEventListener("click", function() {
      document.getElementById("filter-blood-group").value = "";
      document.getElementById("filter-state").value = "";
      document.getElementById("filter-city").value = "";
      document.getElementById("filter-availability").value = "Available";
      renderPublicDonors();
    });
  }

  const logoutBtn = document.getElementById("btn-logout");
  if (logoutBtn) logoutBtn.addEventListener("click", logout);

  // 4. Check active session and configure navbar
  updateNavState();

  // 5. Initial render of Home View
  renderHomeView();
});
