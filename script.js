/* ==========================================================================
   FindIt — Campus Lost & Found System
   Application Logic & State Management (script.js)
   Vanilla ES6+ JavaScript | Client-Side Demo using localStorage
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------------
     Constants & Storage Configuration
     ------------------------------------------------------------------------ */
  const STORAGE_KEY = "findit_campus_demo_v2";
  const MAX_PHOTO_DIMENSION = 900;
  const PHOTO_QUALITY = 0.78;

  const VIEW_TITLES = {
    home: "Home Dashboard",
    browse: "Browse Found Items",
    report: "Report Found Item",
    "item-detail": "Item Details",
    "review-claim": "Review Ownership Claim",
    handover: "Verified Handover",
    "my-reports": "My Reports",
    "my-claims": "My Claims",
    profile: "Profile & Demo Settings"
  };

  /* ------------------------------------------------------------------------
     Demonstration Personas & Seed Data
     ------------------------------------------------------------------------ */
  const DEMO_USERS = [
    {
      id: "USR-101",
      name: "Tanmay Gupta",
      shortName: "Tanmay",
      initials: "TG",
      studentId: "MAINS-43925",
      department: "B.Tech Computer Science",
      email: "tanmay.gupta@campus.edu"
    },
    {
      id: "USR-102",
      name: "Riya Sharma",
      shortName: "Riya",
      initials: "RS",
      studentId: "MAINS-44108",
      department: "B.Sc Physics",
      email: "riya.sharma@campus.edu"
    },
    {
      id: "USR-103",
      name: "Arjun Mehta",
      shortName: "Arjun",
      initials: "AM",
      studentId: "MAINS-43712",
      department: "B.Tech Mechanical Engineering",
      email: "arjun.mehta@campus.edu"
    }
  ];

  function createSeedState() {
    return {
      version: 2,
      currentUserId: "USR-101",
      items: [
        {
          id: "ITM-1001",
          title: "Black Charger",
          category: "Electronics",
          description:
            "Found plugged near a second-floor reading desk after evening study hours. Kept safely until the owner verifies a small identifying mark.",
          zone: "Library",
          locationDetail: "2nd Floor Reading Wing",
          dateFound: "2026-11-18",
          reportedAt: "2026-11-18T17:20:00.000Z",
          custodyStatus: "Held by Finder",
          status: "active",
          finderId: "USR-101",
          finderName: "Tanmay Gupta",
          secretQuestion: "What initials or text are written on the cable tape?",
          secretAnswer: "T: CS",
          handoverNote: "Meet at Main Gate Guard Booth around 4:00 PM.",
          privatePhoto: "",
          recoveredAt: null
        },
        {
          id: "ITM-1002",
          title: "Physics Notebook",
          category: "Notebooks & Books",
          description:
            "Handwritten lab notebook spotted near the corridor bench outside the practical lab. Turned in at the building security desk to keep it safe.",
          zone: "Science Block",
          locationDetail: "Science Block Guard Booth",
          dateFound: "2026-11-17",
          reportedAt: "2026-11-17T15:10:00.000Z",
          custodyStatus: "At Specific Guard Booth",
          status: "active",
          finderId: "USR-102",
          finderName: "Riya Sharma",
          secretQuestion: "What topic is written on the first page header?",
          secretAnswer: "Optics Lab Readings",
          handoverNote: "Collect from Science Block Guard Booth; mention Slip #14.",
          privatePhoto: "",
          recoveredAt: null
        },
        {
          id: "ITM-1003",
          title: "Water Bottle",
          category: "Water Bottles & Personal",
          description:
            "Insulated metal bottle left on the corner bench near the cafeteria exit. Left in place so the owner can pick it up quickly.",
          zone: "Cafeteria",
          locationDetail: "East Exit Wooden Bench",
          dateFound: "2026-11-19",
          reportedAt: "2026-11-19T12:40:00.000Z",
          custodyStatus: "Left on Bench",
          status: "active",
          finderId: "USR-102",
          finderName: "Riya Sharma",
          secretQuestion: "What colour sticker is placed near the base?",
          secretAnswer: "Yellow mountain sticker",
          handoverNote: "Left on the east exit wooden bench near the water cooler.",
          privatePhoto: "",
          recoveredAt: null
        },
        {
          id: "ITM-1004",
          title: "Bike Keys",
          category: "Keys & Cards",
          description:
            "Set of two-wheeler keys found along the walkway between the parking zone and lecture halls. Held safely for urgent pickup.",
          zone: "Main Gate",
          locationDetail: "Main Gate Parking Walkway",
          dateFound: "2026-11-19",
          reportedAt: "2026-11-19T16:05:00.000Z",
          custodyStatus: "Held by Finder",
          status: "active",
          finderId: "USR-101",
          finderName: "Tanmay Gupta",
          secretQuestion: "What shape or symbol is on the attached keyring?",
          secretAnswer: "Blue helmet tag",
          handoverNote: "Available near Main Gate Security Cabin after 5:00 PM.",
          privatePhoto: "",
          recoveredAt: null
        },
        {
          id: "ITM-1005",
          title: "Earbuds Case",
          category: "Audio & Accessories",
          description:
            "Wireless audio charging case found on the basketball court bleachers after practice. Handed to the Sports Complex cabin for safe storage.",
          zone: "Sports Complex",
          locationDetail: "Sports Complex Guard Cabin",
          dateFound: "2026-11-18",
          reportedAt: "2026-11-18T19:15:00.000Z",
          custodyStatus: "At Specific Guard Booth",
          status: "active",
          finderId: "USR-103",
          finderName: "Arjun Mehta",
          secretQuestion: "What small mark or scratch is on the inside of the lid?",
          secretAnswer: "Blue dot near hinge",
          handoverNote: "Collect from Sports Complex Guard Cabin with campus ID.",
          privatePhoto: "",
          recoveredAt: null
        },
        {
          id: "ITM-1006",
          title: "Student ID Card",
          category: "Keys & Cards",
          description:
            "First-year campus ID card spotted on a cafeteria table and submitted to the main admin reception desk.",
          zone: "Cafeteria",
          locationDetail: "Admin Block Reception Desk",
          dateFound: "2026-11-14",
          reportedAt: "2026-11-14T11:30:00.000Z",
          custodyStatus: "At Specific Guard Booth",
          status: "recovered",
          finderId: "USR-103",
          finderName: "Arjun Mehta",
          secretQuestion: "What are the last four digits of the enrollment ID?",
          secretAnswer: "4821",
          handoverNote: "Collected from Admin Block reception desk.",
          privatePhoto: "",
          recoveredAt: "2026-11-15T10:15:00.000Z"
        }
      ],
      claims: [
        {
          id: "CLM-2001",
          itemId: "ITM-1001",
          claimantId: "USR-102",
          claimantName: "Riya Sharma",
          answer: "T: CS",
          note: "I was sitting near the window sockets on the 2nd floor before my lab.",
          status: "pending",
          createdAt: "2026-11-19T09:30:00.000Z",
          reviewedAt: null,
          handover: null
        },
        {
          id: "CLM-2002",
          itemId: "ITM-1002",
          claimantId: "USR-101",
          claimantName: "Tanmay Gupta",
          answer: "Optics Lab Readings",
          note: "It also has a folded graph sheet inside the back cover.",
          status: "approved",
          createdAt: "2026-11-18T11:15:00.000Z",
          reviewedAt: "2026-11-18T13:00:00.000Z",
          handover: {
            pickupLocation: "Science Block Guard Booth",
            date: "2026-11-20",
            time: "4:00 PM",
            instructions: "Meet at Science Block Guard Booth and mention Desk Slip #14 with your student ID."
          }
        }
      ],
      notifications: [
        {
          id: "NTF-3001",
          type: "New Ownership Claim",
          message: "Riya Sharma submitted an ownership claim for Black Charger (ITM-1001). Ready for your review.",
          timestamp: "2026-11-19T09:30:00.000Z",
          read: false,
          targetView: "review-claim",
          targetId: "CLM-2001",
          audienceUserId: "USR-101"
        },
        {
          id: "NTF-3002",
          type: "Claim Approved",
          message: "Your claim for Physics Notebook (ITM-1002) was approved. Private handover details are unlocked.",
          timestamp: "2026-11-18T13:00:00.000Z",
          read: false,
          targetView: "handover",
          targetId: "CLM-2002",
          audienceUserId: "USR-101"
        },
        {
          id: "NTF-3003",
          type: "Item Recovered",
          message: "Student ID Card (ITM-1006) was verified and marked as recovered.",
          timestamp: "2026-11-15T10:15:00.000Z",
          read: true,
          targetView: "browse",
          targetId: null,
          audienceUserId: "ALL"
        }
      ]
    };
  }

  /* ------------------------------------------------------------------------
     Application State & Runtime UI Context
     ------------------------------------------------------------------------ */
  let state = loadState();

  const ui = {
    activeView: "home",
    previousView: "browse",
    selectedItemId: null,
    selectedClaimId: null,
    reportsTab: "all",
    claimsTab: "all",
    pendingPhotoDataUrl: "",
    confirmCallback: null
  };

  /* ------------------------------------------------------------------------
     Storage Persistence & Safe Recovery
     ------------------------------------------------------------------------ */
  function loadState() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        const seed = createSeedState();
        saveStateToStorage(seed);
        return seed;
      }
      const parsed = JSON.parse(raw);
      if (
        !parsed ||
        !Array.isArray(parsed.items) ||
        !Array.isArray(parsed.claims) ||
        !Array.isArray(parsed.notifications) ||
        typeof parsed.currentUserId !== "string"
      ) {
        throw new Error("Invalid state schema");
      }
      const validUser = DEMO_USERS.some((u) => u.id === parsed.currentUserId);
      if (!validUser) {
        parsed.currentUserId = DEMO_USERS[0].id;
      }
      return parsed;
    } catch (err) {
      const fallback = createSeedState();
      saveStateToStorage(fallback);
      return fallback;
    }
  }

  function saveStateToStorage(data) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (err) {
      showToast(
        "Browser storage is full or unavailable. Try removing large photos or resetting demo data.",
        "error"
      );
      return false;
    }
  }

  function persistState() {
    return saveStateToStorage(state);
  }

  /* ------------------------------------------------------------------------
     Utility Helpers
     ------------------------------------------------------------------------ */
  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getCurrentUser() {
    return DEMO_USERS.find((u) => u.id === state.currentUserId) || DEMO_USERS[0];
  }

  function generateUniqueId(prefix, existingList) {
    const existingIds = new Set(existingList.map((entry) => entry.id));
    let candidate = "";
    let counter = existingList.length + 1;
    do {
      const rand = Math.floor(1000 + Math.random() * 9000);
      candidate = `${prefix}-${rand + counter}`;
      counter += 1;
    } while (existingIds.has(candidate));
    return candidate;
  }

  function getTodayIsoDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function formatDisplayDate(dateStr) {
    if (!dateStr) return "—";
    const normalized = dateStr.includes("T") ? dateStr : `${dateStr}T00:00:00`;
    const date = new Date(normalized);
    if (Number.isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  }

  function formatRelativeTime(isoStr) {
    if (!isoStr) return "";
    const date = new Date(isoStr);
    if (Number.isNaN(date.getTime())) return "";
    const diffMs = Date.now() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return formatDisplayDate(isoStr);
  }

  function normalizeText(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function getCustodyBadgeClass(custodyStatus) {
    if (custodyStatus === "At Specific Guard Booth") return "badge-custody-guard";
    if (custodyStatus === "Left on Bench") return "badge-custody-bench";
    return "badge-custody-finder";
  }

  function getCustodyShortLabel(custodyStatus) {
    if (custodyStatus === "At Specific Guard Booth") return "At Guard Booth";
    return custodyStatus || "Held by Finder";
  }

  function getClaimBadgeClass(status) {
    if (status === "approved") return "badge-claim-approved";
    if (status === "rejected") return "badge-claim-rejected";
    return "badge-claim-pending";
  }

  function getClaimStatusLabel(status) {
    if (status === "approved") return "Approved";
    if (status === "rejected") return "Rejected";
    return "Pending Review";
  }

  function getCategoryIconSvg(category) {
    switch (category) {
      case "Electronics":
        return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22v-5"></path><path d="M9 8V2"></path><path d="M15 8V2"></path><path d="M18 8v5a6 6 0 0 1-12 0V8z"></path></svg>';
      case "Notebooks & Books":
        return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>';
      case "Water Bottles & Personal":
        return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2h4"></path><path d="M10 2v3l-2 3v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V8l-2-3V2"></path></svg>';
      case "Keys & Cards":
        return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="4.5"></circle><path d="M11 12l9-9"></path><path d="M16 7l3 3"></path><path d="M19 4l2 2"></path></svg>';
      case "Audio & Accessories":
        return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"></path><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>';
      default:
        return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>';
    }
  }

  function getItemById(itemId) {
    return state.items.find((item) => item.id === itemId) || null;
  }

  function getClaimById(claimId) {
    return state.claims.find((claim) => claim.id === claimId) || null;
  }

  function getClaimsForItem(itemId) {
    return state.claims
      .filter((claim) => claim.itemId === itemId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  function getVisibleNotifications() {
    const userId = getCurrentUser().id;
    return state.notifications
      .filter((n) => n.audienceUserId === "ALL" || n.audienceUserId === userId)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  /* ------------------------------------------------------------------------
     Notifications & Toast Feedback
     ------------------------------------------------------------------------ */
  function addNotification({ type, message, targetView = null, targetId = null, audienceUserId = "ALL" }) {
    const entry = {
      id: generateUniqueId("NTF", state.notifications),
      type,
      message,
      timestamp: new Date().toISOString(),
      read: false,
      targetView,
      targetId,
      audienceUserId
    };
    state.notifications.unshift(entry);
    if (state.notifications.length > 50) {
      state.notifications = state.notifications.slice(0, 50);
    }
    persistState();
    renderNotifications();
  }

  function showToast(message, variant = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${variant}`;
    toast.setAttribute("role", "status");

    const textSpan = document.createElement("span");
    textSpan.textContent = message;

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "toast-close";
    closeBtn.setAttribute("aria-label", "Dismiss message");
    closeBtn.innerHTML = "&times;";

    const dismiss = () => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    };

    closeBtn.addEventListener("click", dismiss);
    toast.appendChild(textSpan);
    toast.appendChild(closeBtn);
    container.appendChild(toast);

    window.setTimeout(dismiss, 4500);
  }

  /* ------------------------------------------------------------------------
     Confirmation Modal
     ------------------------------------------------------------------------ */
  function openConfirmModal({ title, message, confirmLabel = "Confirm", danger = false, onConfirm }) {
    const modal = document.getElementById("confirm-modal");
    const titleEl = document.getElementById("confirm-modal-title");
    const msgEl = document.getElementById("confirm-modal-message");
    const confirmBtn = document.getElementById("btn-modal-confirm");

    titleEl.textContent = title;
    msgEl.textContent = message;
    confirmBtn.textContent = confirmLabel;
    confirmBtn.className = danger ? "btn btn-danger" : "btn btn-primary";

    ui.confirmCallback = typeof onConfirm === "function" ? onConfirm : null;
    modal.hidden = false;
    confirmBtn.focus();
  }

  function closeConfirmModal() {
    const modal = document.getElementById("confirm-modal");
    modal.hidden = true;
    ui.confirmCallback = null;
  }

  /* ------------------------------------------------------------------------
     Sidebar & Notifications Drawer Controls
     ------------------------------------------------------------------------ */
  function openSidebar() {
    const sidebar = document.getElementById("app-sidebar");
    const overlay = document.getElementById("sidebar-overlay");
    const btnOpen = document.getElementById("btn-open-sidebar");
    sidebar.classList.add("is-open");
    overlay.hidden = false;
    btnOpen.setAttribute("aria-expanded", "true");
  }

  function closeSidebar() {
    const sidebar = document.getElementById("app-sidebar");
    const overlay = document.getElementById("sidebar-overlay");
    const btnOpen = document.getElementById("btn-open-sidebar");
    sidebar.classList.remove("is-open");
    overlay.hidden = true;
    btnOpen.setAttribute("aria-expanded", "false");
  }

  function openNotificationsPanel() {
    const panel = document.getElementById("notifications-panel");
    const overlay = document.getElementById("notif-overlay");
    const trigger = document.getElementById("btn-notifications");
    renderNotifications();
    panel.hidden = false;
    overlay.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
  }

  function closeNotificationsPanel() {
    const panel = document.getElementById("notifications-panel");
    const overlay = document.getElementById("notif-overlay");
    const trigger = document.getElementById("btn-notifications");
    panel.hidden = true;
    overlay.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
  }

  /* ------------------------------------------------------------------------
     Navigation Controller
     ------------------------------------------------------------------------ */
  function navigateTo(viewName, options = {}) {
    const targetViewEl = document.getElementById(`view-${viewName}`);
    if (!targetViewEl) return;

    const primaryViews = ["home", "browse", "report", "my-reports", "my-claims", "profile"];
    if (primaryViews.includes(ui.activeView) && ui.activeView !== viewName) {
      ui.previousView = ui.activeView;
    }
    if (options.returnTo) {
      ui.previousView = options.returnTo;
    }

    ui.activeView = viewName;
    if (options.itemId) ui.selectedItemId = options.itemId;
    if (options.claimId) ui.selectedClaimId = options.claimId;

    // Toggle visible section
    document.querySelectorAll(".view").forEach((section) => {
      const isMatch = section.dataset.view === viewName;
      section.hidden = !isMatch;
      section.classList.toggle("is-active", isMatch);
    });

    // Update topbar title
    const titleEl = document.getElementById("topbar-page-title");
    if (titleEl) {
      titleEl.textContent = VIEW_TITLES[viewName] || "FindIt";
    }

    // Highlight active nav items in sidebar & mobile bottom bar
    const navHighlightKey = resolveNavHighlight(viewName);
    document.querySelectorAll("[data-nav]").forEach((btn) => {
      if (btn.classList.contains("nav-item") || btn.classList.contains("bottom-nav-item")) {
        const isCurrent = btn.dataset.nav === navHighlightKey;
        btn.classList.toggle("is-active", isCurrent);
        if (isCurrent) {
          btn.setAttribute("aria-current", "page");
        } else {
          btn.removeAttribute("aria-current");
        }
      }
    });

    closeSidebar();
    closeNotificationsPanel();

    // Render view-specific data
    renderActiveView();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resolveNavHighlight(viewName) {
    if (viewName === "item-detail") return "browse";
    if (viewName === "review-claim") return "my-reports";
    if (viewName === "handover") return ui.previousView === "my-reports" ? "my-reports" : "my-claims";
    return viewName;
  }

  function renderActiveView() {
    renderGlobalChrome();
    switch (ui.activeView) {
      case "home":
        renderHomeDashboard();
        break;
      case "browse":
        renderBrowseItems();
        break;
      case "report":
        prepareReportFormDefaults();
        break;
      case "item-detail":
        renderItemDetailView();
        break;
      case "review-claim":
        renderReviewClaimView();
        break;
      case "handover":
        renderHandoverView();
        break;
      case "my-reports":
        renderMyReportsView();
        break;
      case "my-claims":
        renderMyClaimsView();
        break;
      case "profile":
        renderProfileView();
        break;
      default:
        renderHomeDashboard();
    }
  }

  /* ------------------------------------------------------------------------
     Global Chrome (User Labels, Nav Counters, Notification Badge)
     ------------------------------------------------------------------------ */
  function renderGlobalChrome() {
    const user = getCurrentUser();

    document.getElementById("sidebar-user-avatar").textContent = user.initials;
    document.getElementById("sidebar-user-name").textContent = user.name;
    document.getElementById("sidebar-user-id").textContent = `${user.studentId} · Demo`;

    document.getElementById("topbar-user-avatar").textContent = user.initials;
    document.getElementById("topbar-user-name").textContent = user.shortName;

    // Active listings count
    const activeCount = state.items.filter((i) => i.status === "active").length;
    const navActiveEl = document.getElementById("nav-active-count");
    navActiveEl.textContent = String(activeCount);

    // Pending claims needing review by current user (as finder)
    const myReportIds = new Set(
      state.items.filter((i) => i.finderId === user.id && i.status === "active").map((i) => i.id)
    );
    const pendingReviewsCount = state.claims.filter(
      (c) => c.status === "pending" && myReportIds.has(c.itemId)
    ).length;
    const pendingBadge = document.getElementById("nav-pending-reviews");
    pendingBadge.textContent = String(pendingReviewsCount);
    pendingBadge.hidden = pendingReviewsCount === 0;

    // Current user's claims count
    const myClaimsCount = state.claims.filter((c) => c.claimantId === user.id).length;
    const claimsBadge = document.getElementById("nav-claims-count");
    claimsBadge.textContent = String(myClaimsCount);
    claimsBadge.hidden = myClaimsCount === 0;

    renderNotifications();
  }

  function renderNotifications() {
    const visible = getVisibleNotifications();
    const unreadCount = visible.filter((n) => !n.read).length;

    const badge = document.getElementById("notif-badge");
    badge.textContent = unreadCount > 9 ? "9+" : String(unreadCount);
    badge.hidden = unreadCount === 0;

    const listEl = document.getElementById("notifications-list");
    const emptyEl = document.getElementById("notifications-empty");

    if (visible.length === 0) {
      listEl.innerHTML = "";
      emptyEl.hidden = false;
      return;
    }

    emptyEl.hidden = true;
    listEl.innerHTML = visible
      .map((notif) => {
        const hasAction = Boolean(notif.targetView);
        return `
          <article class="notif-item ${notif.read ? "" : "is-unread"}" data-notif-id="${escapeHtml(notif.id)}">
            <div class="notif-item-head">
              <span class="notif-item-type">${escapeHtml(notif.type)}</span>
              <span class="notif-item-time">${escapeHtml(formatRelativeTime(notif.timestamp))}</span>
            </div>
            <p class="notif-item-msg">${escapeHtml(notif.message)}</p>
            ${
              hasAction
                ? `<button type="button" class="btn-link notif-item-action" data-action="open-notification" data-notif-id="${escapeHtml(notif.id)}">View details &rarr;</button>`
                : ""
            }
          </article>
        `;
      })
      .join("");
  }

  /* ------------------------------------------------------------------------
     Shared Item Card Builder (Public Info Only — Never Exposes Private Data)
     ------------------------------------------------------------------------ */
  function buildItemCardHtml(item) {
    const isRecovered = item.status === "recovered";
    const custodyClass = getCustodyBadgeClass(item.custodyStatus);
    const custodyLabel = getCustodyShortLabel(item.custodyStatus);
    const locationLine = item.locationDetail
      ? `${item.zone} — ${item.locationDetail}`
      : item.zone;

    return `
      <article class="item-card ${isRecovered ? "is-recovered" : ""}">
        <div class="item-card-top">
          <div class="item-card-header">
            <div class="item-cat-icon" aria-hidden="true">${getCategoryIconSvg(item.category)}</div>
            <div>
              <h3 class="item-card-title">${escapeHtml(item.title)}</h3>
              <span class="item-card-id">${escapeHtml(item.id)} &middot; ${escapeHtml(item.category)}</span>
            </div>
          </div>
          ${
            isRecovered
              ? '<span class="badge badge-status-recovered">Recovered</span>'
              : '<span class="badge badge-status-active">Active</span>'
          }
        </div>

        <div class="item-card-badges">
          <span class="badge ${custodyClass}">${escapeHtml(custodyLabel)}</span>
        </div>

        <p class="item-card-desc">${escapeHtml(item.description)}</p>

        <div class="item-card-meta">
          <div class="meta-row">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>${escapeHtml(locationLine)}</span>
          </div>
          <div class="meta-row">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>Found ${escapeHtml(formatDisplayDate(item.dateFound))}</span>
          </div>
        </div>

        <div class="item-card-footer">
          <span class="item-date-label">Reported ${escapeHtml(formatDisplayDate(item.reportedAt))}</span>
          <button type="button" class="btn btn-secondary btn-sm" data-action="view-item" data-item-id="${escapeHtml(item.id)}">
            View Details
          </button>
        </div>
      </article>
    `;
  }

  /* ------------------------------------------------------------------------
     VIEW 1: Home Dashboard
     ------------------------------------------------------------------------ */
  function renderHomeDashboard() {
    const user = getCurrentUser();
    document.getElementById("home-welcome-name").textContent = user.name;

    const totalReports = state.items.length;
    const recoveredItems = state.items.filter((i) => i.status === "recovered").length;
    const activeListings = state.items.filter((i) => i.status === "active").length;

    document.getElementById("stat-total-reports").textContent = String(totalReports);
    document.getElementById("stat-active-listings").textContent = String(activeListings);
    document.getElementById("stat-recovered-items").textContent = String(recoveredItems);

    const recentActive = state.items
      .filter((i) => i.status === "active")
      .sort((a, b) => new Date(b.reportedAt) - new Date(a.reportedAt))
      .slice(0, 6);

    const gridEl = document.getElementById("home-recent-items");
    const emptyEl = document.getElementById("home-recent-empty");

    if (recentActive.length === 0) {
      gridEl.innerHTML = "";
      emptyEl.hidden = false;
      return;
    }

    emptyEl.hidden = true;
    gridEl.innerHTML = recentActive.map(buildItemCardHtml).join("");
  }

  /* ------------------------------------------------------------------------
     VIEW 2: Browse & Search Items
     ------------------------------------------------------------------------ */
  function renderBrowseItems() {
    const query = document.getElementById("browse-search").value.trim().toLowerCase();
    const category = document.getElementById("browse-category").value;
    const zone = document.getElementById("browse-zone").value;
    const custody = document.getElementById("browse-custody").value;
    const status = document.getElementById("browse-status").value;

    const filtered = state.items
      .filter((item) => {
        if (status !== "all" && item.status !== status) return false;
        if (category && item.category !== category) return false;
        if (zone && item.zone !== zone) return false;
        if (custody && item.custodyStatus !== custody) return false;

        if (query) {
          const haystack = [
            item.id,
            item.title,
            item.category,
            item.description,
            item.zone,
            item.locationDetail,
            item.custodyStatus
          ]
            .join(" ")
            .toLowerCase();
          if (!haystack.includes(query)) return false;
        }
        return true;
      })
      .sort((a, b) => new Date(b.reportedAt) - new Date(a.reportedAt));

    const countEl = document.getElementById("browse-results-count");
    countEl.textContent = `Showing ${filtered.length} ${filtered.length === 1 ? "item" : "items"}`;

    const gridEl = document.getElementById("browse-items-grid");
    const emptyEl = document.getElementById("browse-empty-state");

    if (filtered.length === 0) {
      gridEl.innerHTML = "";
      emptyEl.hidden = false;
      return;
    }

    emptyEl.hidden = true;
    gridEl.innerHTML = filtered.map(buildItemCardHtml).join("");
  }

  function clearBrowseFilters() {
    document.getElementById("browse-search").value = "";
    document.getElementById("browse-category").value = "";
    document.getElementById("browse-zone").value = "";
    document.getElementById("browse-custody").value = "";
    document.getElementById("browse-status").value = "active";
    renderBrowseItems();
  }

  /* ------------------------------------------------------------------------
     VIEW 3: Report Found Item
     ------------------------------------------------------------------------ */
  function prepareReportFormDefaults() {
    const dateInput = document.getElementById("report-date");
    if (dateInput && !dateInput.value) {
      dateInput.value = getTodayIsoDate();
    }
    dateInput.max = getTodayIsoDate();
  }

  function setFieldError(inputId, errorId, message) {
    const inputEl = inputId ? document.getElementById(inputId) : null;
    const errorEl = document.getElementById(errorId);
    if (errorEl) errorEl.textContent = message || "";
    if (inputEl) {
      inputEl.classList.toggle("is-invalid", Boolean(message));
    }
  }

  function clearReportFormErrors() {
    setFieldError("report-title", "err-report-title", "");
    setFieldError("report-category", "err-report-category", "");
    setFieldError("report-zone", "err-report-zone", "");
    setFieldError("report-description", "err-report-description", "");
    setFieldError("report-date", "err-report-date", "");
    setFieldError(null, "err-report-custody", "");
    setFieldError("report-secret-question", "err-report-question", "");
    setFieldError("report-secret-answer", "err-report-answer", "");
  }

  function resetReportForm() {
    const form = document.getElementById("report-form");
    form.reset();
    clearReportFormErrors();
    clearPendingPhoto();
    document.getElementById("report-date").value = getTodayIsoDate();
  }

  function clearPendingPhoto() {
    ui.pendingPhotoDataUrl = "";
    const fileInput = document.getElementById("report-photo");
    const wrap = document.getElementById("report-photo-preview-wrap");
    const preview = document.getElementById("report-photo-preview");
    if (fileInput) fileInput.value = "";
    if (preview) preview.src = "";
    if (wrap) wrap.hidden = true;
  }

  function handlePhotoSelection(file) {
    if (!file) {
      clearPendingPhoto();
      return;
    }
    if (!file.type || !file.type.startsWith("image/")) {
      showToast("Please select a valid image file (PNG, JPG, WebP).", "warning");
      clearPendingPhoto();
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          if (width > MAX_PHOTO_DIMENSION || height > MAX_PHOTO_DIMENSION) {
            const ratio = Math.min(MAX_PHOTO_DIMENSION / width, MAX_PHOTO_DIMENSION / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          const compressedDataUrl = canvas.toDataURL("image/jpeg", PHOTO_QUALITY);
          ui.pendingPhotoDataUrl = compressedDataUrl;

          const preview = document.getElementById("report-photo-preview");
          const wrap = document.getElementById("report-photo-preview-wrap");
          preview.src = compressedDataUrl;
          wrap.hidden = false;
        } catch (err) {
          showToast("Could not process image. You can still submit without a photo.", "warning");
          clearPendingPhoto();
        }
      };
      img.onerror = () => {
        showToast("Could not read the selected image file.", "warning");
        clearPendingPhoto();
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  function handleReportSubmit(event) {
    event.preventDefault();
    clearReportFormErrors();

    const title = document.getElementById("report-title").value.trim();
    const category = document.getElementById("report-category").value;
    const zone = document.getElementById("report-zone").value;
    const description = document.getElementById("report-description").value.trim();
    const dateFound = document.getElementById("report-date").value;
    const locationDetail = document.getElementById("report-location-detail").value.trim();
    const custodyRadio = document.querySelector('input[name="custodyStatus"]:checked');
    const custodyStatus = custodyRadio ? custodyRadio.value : "";
    const secretQuestion = document.getElementById("report-secret-question").value.trim();
    const secretAnswer = document.getElementById("report-secret-answer").value.trim();
    const handoverNote = document.getElementById("report-handover-note").value.trim();

    let firstInvalidId = null;

    if (title.length < 3) {
      setFieldError("report-title", "err-report-title", "Enter a public item title (at least 3 characters).");
      firstInvalidId = firstInvalidId || "report-title";
    }
    if (!category) {
      setFieldError("report-category", "err-report-category", "Please select a category.");
      firstInvalidId = firstInvalidId || "report-category";
    }
    if (!zone) {
      setFieldError("report-zone", "err-report-zone", "Please select the campus zone.");
      firstInvalidId = firstInvalidId || "report-zone";
    }
    if (description.length < 10) {
      setFieldError(
        "report-description",
        "err-report-description",
        "Provide a brief general description (at least 10 characters)."
      );
      firstInvalidId = firstInvalidId || "report-description";
    }
    if (!dateFound) {
      setFieldError("report-date", "err-report-date", "Select the date the item was found.");
      firstInvalidId = firstInvalidId || "report-date";
    } else if (dateFound > getTodayIsoDate()) {
      setFieldError("report-date", "err-report-date", "Date found cannot be in the future.");
      firstInvalidId = firstInvalidId || "report-date";
    }
    if (!custodyStatus) {
      setFieldError(null, "err-report-custody", "Select the item's current custody status.");
    }
    if (secretQuestion.length < 5) {
      setFieldError(
        "report-secret-question",
        "err-report-question",
        "Enter a verification question only the real owner can answer."
      );
      firstInvalidId = firstInvalidId || "report-secret-question";
    }
    if (secretAnswer.length < 1) {
      setFieldError(
        "report-secret-answer",
        "err-report-answer",
        "Enter the private expected answer for your review."
      );
      firstInvalidId = firstInvalidId || "report-secret-answer";
    }

    if (firstInvalidId || !custodyStatus) {
      if (firstInvalidId) {
        document.getElementById(firstInvalidId).focus();
      }
      showToast("Please complete all required fields before submitting.", "warning");
      return;
    }

    const user = getCurrentUser();
    const newItem = {
      id: generateUniqueId("ITM", state.items),
      title,
      category,
      description,
      zone,
      locationDetail,
      dateFound,
      reportedAt: new Date().toISOString(),
      custodyStatus,
      status: "active",
      finderId: user.id,
      finderName: user.name,
      secretQuestion,
      secretAnswer,
      handoverNote:
        handoverNote ||
        (custodyStatus === "At Specific Guard Booth"
          ? `Collect at ${locationDetail || `${zone} Guard Booth`} with campus ID.`
          : `Private meetup arranged in ${zone}.`),
      privatePhoto: ui.pendingPhotoDataUrl,
      recoveredAt: null
    };

    state.items.unshift(newItem);
    const saved = persistState();
    if (!saved) {
      state.items.shift();
      return;
    }

    addNotification({
      type: "Report Submitted",
      message: `Found item "${newItem.title}" (${newItem.id}) is now live on the campus noticeboard.`,
      targetView: "my-reports",
      targetId: newItem.id,
      audienceUserId: user.id
    });

    resetReportForm();
    showToast(`Report ${newItem.id} submitted! It is now visible in Browse Items and My Reports.`, "success");
    navigateTo("my-reports");
  }

  /* ------------------------------------------------------------------------
     VIEW 4: Item Details & Ownership Verification Gate (Public Only)
     ------------------------------------------------------------------------ */
  function renderItemDetailView() {
    const item = getItemById(ui.selectedItemId);
    if (!item) {
      showToast("Item could not be found.", "warning");
      navigateTo("browse");
      return;
    }

    const user = getCurrentUser();
    const isRecovered = item.status === "recovered";
    const isFinder = item.finderId === user.id;
    const itemClaims = getClaimsForItem(item.id);
    const userClaims = itemClaims.filter((c) => c.claimantId === user.id);
    const latestUserClaim = userClaims[0] || null;
    const approvedClaim = itemClaims.find((c) => c.status === "approved") || null;

    // Back link label
    const backBtn = document.getElementById("btn-detail-back");
    const backLabels = {
      home: "← Back to Home Dashboard",
      browse: "← Back to Browse Items",
      "my-reports": "← Back to My Reports",
      "my-claims": "← Back to My Claims"
    };
    backBtn.textContent = backLabels[ui.previousView] || "← Back to Browse Items";

    // Public item details (NEVER display secretAnswer or privatePhoto here)
    document.getElementById("detail-title").textContent = item.title;
    const statusBadge = document.getElementById("detail-status-badge");
    statusBadge.textContent = isRecovered ? "Recovered" : "Active";
    statusBadge.className = `badge ${isRecovered ? "badge-status-recovered" : "badge-status-active"}`;

    document.getElementById("detail-meta-line").textContent =
      `${item.id} · ${item.category} · Reported ${formatDisplayDate(item.reportedAt)}`;

    document.getElementById("detail-photo-indicator").textContent = item.privatePhoto
      ? "A private photo is attached and remains locked until the finder approves your claim."
      : "No public photo is displayed. Identifying marks stay hidden behind verification.";

    const custodyBadge = document.getElementById("detail-custody-badge");
    custodyBadge.textContent = item.custodyStatus;
    custodyBadge.className = `badge ${getCustodyBadgeClass(item.custodyStatus)}`;

    document.getElementById("detail-zone").textContent = item.locationDetail
      ? `${item.zone} (${item.locationDetail})`
      : item.zone;
    document.getElementById("detail-category").textContent = item.category;
    document.getElementById("detail-date").textContent = formatDisplayDate(item.dateFound);
    document.getElementById("detail-description").textContent = item.description;

    // Reset verification form state
    const claimIntro = document.getElementById("detail-claim-intro");
    const claimForm = document.getElementById("claim-form");
    const statusBox = document.getElementById("detail-claim-status-box");
    const calloutTitle = document.getElementById("detail-callout-title");
    const calloutText = document.getElementById("detail-callout-text");
    const calloutActions = document.getElementById("detail-callout-actions");

    claimForm.reset();
    setFieldError("claim-answer-input", "err-claim-answer", "");
    claimForm.hidden = true;
    claimIntro.hidden = true;
    statusBox.hidden = true;
    statusBox.className = "status-callout";
    calloutActions.innerHTML = "";

    document.getElementById("verify-question-text").textContent = item.secretQuestion;

    // Determine right-column state
    if (isRecovered) {
      statusBox.hidden = false;
      statusBox.classList.add("is-success");
      calloutTitle.textContent = "Item Already Recovered";
      calloutText.textContent = `This item was safely returned and closed on ${formatDisplayDate(
        item.recoveredAt || item.reportedAt
      )}.`;
      calloutActions.innerHTML =
        '<button type="button" class="btn btn-secondary btn-sm" data-nav="browse">Browse Active Listings</button>';
      return;
    }

    if (isFinder) {
      statusBox.hidden = false;
      statusBox.classList.add("is-info");
      calloutTitle.textContent = "You Reported This Item";
      const pendingCount = itemClaims.filter((c) => c.status === "pending").length;
      calloutText.textContent =
        pendingCount > 0
          ? `There ${pendingCount === 1 ? "is 1 pending claim" : `are ${pendingCount} pending claims`} waiting for your review.`
          : "You cannot claim your own found-item report. Switch to another demo student in Profile to test the claimant flow, or manage this report in My Reports.";

      const buttons = [];
      if (pendingCount > 0) {
        const firstPending = itemClaims.find((c) => c.status === "pending");
        buttons.push(
          `<button type="button" class="btn btn-primary btn-sm" data-action="review-claim" data-claim-id="${escapeHtml(firstPending.id)}">Review Pending Claim</button>`
        );
      }
      if (approvedClaim) {
        buttons.push(
          `<button type="button" class="btn btn-success btn-sm" data-action="open-handover" data-claim-id="${escapeHtml(approvedClaim.id)}">Open Verified Handover</button>`
        );
      }
      buttons.push('<button type="button" class="btn btn-secondary btn-sm" data-nav="my-reports">Go to My Reports</button>');
      buttons.push('<button type="button" class="btn btn-secondary btn-sm" data-nav="profile">Switch Demo Student</button>');
      calloutActions.innerHTML = buttons.join("");
      return;
    }

    if (latestUserClaim && latestUserClaim.status === "approved") {
      statusBox.hidden = false;
      statusBox.classList.add("is-success");
      calloutTitle.textContent = "Your Claim Is Approved";
      calloutText.textContent =
        "The finder verified your ownership answer. Open Verified Handover to view private pickup details and mark the item recovered.";
      calloutActions.innerHTML = `
        <button type="button" class="btn btn-success btn-sm" data-action="open-handover" data-claim-id="${escapeHtml(latestUserClaim.id)}">View Handover Details</button>
        <button type="button" class="btn btn-secondary btn-sm" data-nav="my-claims">Go to My Claims</button>
      `;
      return;
    }

    if (latestUserClaim && latestUserClaim.status === "pending") {
      statusBox.hidden = false;
      statusBox.classList.add("is-warning");
      calloutTitle.textContent = "Claim Submitted — Pending Finder Review";
      calloutText.textContent = `Claim ${latestUserClaim.id} is awaiting review by the finder. Pickup details will unlock once approved.`;
      calloutActions.innerHTML =
        '<button type="button" class="btn btn-secondary btn-sm" data-nav="my-claims">View in My Claims</button>';
      return;
    }

    if (approvedClaim && approvedClaim.claimantId !== user.id) {
      statusBox.hidden = false;
      statusBox.classList.add("is-info");
      calloutTitle.textContent = "Handover In Progress";
      calloutText.textContent =
        "Another student's ownership claim has already been approved for this item and is currently awaiting pickup.";
      calloutActions.innerHTML =
        '<button type="button" class="btn btn-secondary btn-sm" data-nav="browse">Back to Browse Items</button>';
      return;
    }

    // Eligible to claim (including if a previous claim by this user was rejected)
    claimIntro.hidden = false;
    if (latestUserClaim && latestUserClaim.status === "rejected") {
      statusBox.hidden = false;
      statusBox.classList.add("is-danger");
      calloutTitle.textContent = "Previous Claim Not Approved";
      calloutText.textContent =
        "Your earlier verification answer was not accepted. If you genuinely own this item, you may submit a clearer answer below.";
    }
  }

  function handleClaimSubmit(event) {
    event.preventDefault();
    setFieldError("claim-answer-input", "err-claim-answer", "");

    const item = getItemById(ui.selectedItemId);
    const user = getCurrentUser();

    if (!item || item.status !== "active") {
      showToast("This item is no longer available for claims.", "warning");
      renderItemDetailView();
      return;
    }
    if (item.finderId === user.id) {
      showToast("You cannot submit a claim on an item you reported.", "warning");
      return;
    }

    const existingPending = state.claims.find(
      (c) => c.itemId === item.id && c.claimantId === user.id && c.status === "pending"
    );
    if (existingPending) {
      showToast("You already have a pending claim on this item.", "warning");
      renderItemDetailView();
      return;
    }

    const answer = document.getElementById("claim-answer-input").value.trim();
    const note = document.getElementById("claim-note-input").value.trim();

    if (answer.length < 1) {
      setFieldError(
        "claim-answer-input",
        "err-claim-answer",
        "Please enter an answer to the finder's secret question."
      );
      document.getElementById("claim-answer-input").focus();
      return;
    }

    const newClaim = {
      id: generateUniqueId("CLM", state.claims),
      itemId: item.id,
      claimantId: user.id,
      claimantName: user.name,
      answer,
      note,
      status: "pending",
      createdAt: new Date().toISOString(),
      reviewedAt: null,
      handover: null
    };

    state.claims.unshift(newClaim);
    persistState();

    // Notify finder about incoming claim
    addNotification({
      type: "New Ownership Claim",
      message: `${user.name} submitted claim ${newClaim.id} for "${item.title}" (${item.id}).`,
      targetView: "review-claim",
      targetId: newClaim.id,
      audienceUserId: item.finderId
    });

    // Notify claimant as confirmation
    addNotification({
      type: "Claim Submitted",
      message: `Your claim ${newClaim.id} for "${item.title}" was sent to the finder for verification.`,
      targetView: "my-claims",
      targetId: newClaim.id,
      audienceUserId: user.id
    });

    showToast(`Claim ${newClaim.id} submitted! Track its status in My Claims.`, "success");
    navigateTo("my-claims");
  }

  /* ------------------------------------------------------------------------
     VIEW 5: Review Ownership Claim (Finder-Side)
     ------------------------------------------------------------------------ */
  function clearReviewFormErrors() {
    setFieldError("review-pickup-location", "err-review-pickup", "");
    setFieldError("review-handover-date", "err-review-date", "");
    setFieldError("review-handover-time", "err-review-time", "");
    setFieldError("review-handover-instructions", "err-review-instructions", "");
  }

  function renderReviewClaimView() {
    const claim = getClaimById(ui.selectedClaimId);
    const item = claim ? getItemById(claim.itemId) : null;
    const user = getCurrentUser();

    if (!claim || !item) {
      showToast("Claim record could not be found.", "warning");
      navigateTo("my-reports");
      return;
    }

    if (item.finderId !== user.id) {
      showToast("Only the finder who reported this item can review its ownership claims.", "warning");
      navigateTo("my-reports");
      return;
    }

    clearReviewFormErrors();

    const statusBadge = document.getElementById("review-claim-status-badge");
    statusBadge.textContent = getClaimStatusLabel(claim.status);
    statusBadge.className = `badge ${getClaimBadgeClass(claim.status)}`;

    document.getElementById("review-meta-line").textContent =
      `${claim.id} · Submitted ${formatDisplayDate(claim.createdAt)}`;

    document.getElementById("review-item-title").textContent = item.title;
    document.getElementById("review-item-meta").textContent =
      `${item.zone} · ${item.category} · ${item.id}`;

    const custodyBadge = document.getElementById("review-custody-badge");
    custodyBadge.textContent = getCustodyShortLabel(item.custodyStatus);
    custodyBadge.className = `badge ${getCustodyBadgeClass(item.custodyStatus)}`;

    document.getElementById("review-claimant-name").textContent = claim.claimantName;
    document.getElementById("review-claim-id").textContent = claim.id;
    document.getElementById("review-claim-date").textContent = formatDisplayDate(claim.createdAt);

    document.getElementById("review-secret-question").textContent = item.secretQuestion;
    document.getElementById("review-claimant-answer").textContent = `“${claim.answer}”`;

    const noteEl = document.getElementById("review-claimant-note");
    if (claim.note) {
      noteEl.textContent = `Claimant note: ${claim.note}`;
      noteEl.hidden = false;
    } else {
      noteEl.textContent = "";
      noteEl.hidden = true;
    }

    document.getElementById("review-private-answer").textContent = `“${item.secretAnswer}”`;

    // Helper comparison hint (case- & punctuation-insensitive)
    const matchEl = document.getElementById("review-match-indicator");
    const normClaim = normalizeText(claim.answer);
    const normSecret = normalizeText(item.secretAnswer);
    const isStrongMatch =
      normClaim.length > 0 &&
      normSecret.length > 0 &&
      (normClaim === normSecret || normClaim.includes(normSecret) || normSecret.includes(normClaim));

    matchEl.className = `match-hint ${isStrongMatch ? "is-match" : "is-mismatch"}`;
    matchEl.textContent = isStrongMatch
      ? "Demo check: Answer closely matches your stored private answer."
      : "Demo check: Text differs from your stored private answer — verify carefully.";

    // Pre-populate handover fields
    const pickupInput = document.getElementById("review-pickup-location");
    const dateInput = document.getElementById("review-handover-date");
    const timeInput = document.getElementById("review-handover-time");
    const instructionsInput = document.getElementById("review-handover-instructions");

    const defaultPickup =
      item.custodyStatus === "At Specific Guard Booth"
        ? item.locationDetail || `${item.zone} Guard Booth`
        : `${item.zone} — Main Gate Guard Booth / Campus Meetup`;

    pickupInput.value = claim.handover ? claim.handover.pickupLocation : defaultPickup;
    dateInput.value = claim.handover ? claim.handover.date : getTodayIsoDate();
    timeInput.value = claim.handover ? claim.handover.time : "4:00 PM";
    instructionsInput.value = claim.handover ? claim.handover.instructions : item.handoverNote || "";

    const actionBtns = document.getElementById("review-action-buttons");
    const resolvedBanner = document.getElementById("review-resolved-banner");
    const resolvedTitle = document.getElementById("review-resolved-title");
    const resolvedText = document.getElementById("review-resolved-text");
    const resolvedActions = document.getElementById("review-resolved-actions");

    const anotherApproved = state.claims.find(
      (c) => c.itemId === item.id && c.status === "approved" && c.id !== claim.id
    );

    const isPendingAndReviewable =
      claim.status === "pending" && item.status === "active" && !anotherApproved;

    [pickupInput, dateInput, timeInput, instructionsInput].forEach((el) => {
      el.disabled = !isPendingAndReviewable;
    });

    actionBtns.hidden = !isPendingAndReviewable;
    resolvedBanner.hidden = isPendingAndReviewable;
    resolvedBanner.className = "status-callout";
    resolvedActions.innerHTML = "";

    if (!isPendingAndReviewable) {
      if (claim.status === "approved") {
        resolvedBanner.classList.add("is-success");
        resolvedTitle.textContent = "Claim Approved";
        resolvedText.textContent =
          "Handover instructions have been unlocked for the claimant.";
        resolvedActions.innerHTML = `
          <button type="button" class="btn btn-success btn-sm" data-action="open-handover" data-claim-id="${escapeHtml(claim.id)}">Open Verified Handover</button>
          <button type="button" class="btn btn-secondary btn-sm" data-nav="my-reports">Back to My Reports</button>
        `;
      } else if (claim.status === "rejected") {
        resolvedBanner.classList.add("is-danger");
        resolvedTitle.textContent = "Claim Rejected";
        resolvedText.textContent =
          "This claim was declined. Pickup details stayed private and the item remains available for other claims.";
        resolvedActions.innerHTML =
          '<button type="button" class="btn btn-secondary btn-sm" data-nav="my-reports">Back to My Reports</button>';
      } else if (item.status === "recovered") {
        resolvedBanner.classList.add("is-info");
        resolvedTitle.textContent = "Item Already Recovered";
        resolvedText.textContent = "This listing is closed and cannot be modified.";
      } else if (anotherApproved) {
        resolvedBanner.classList.add("is-warning");
        resolvedTitle.textContent = "Another Claim Already Approved";
        resolvedText.textContent = `Claim ${anotherApproved.id} is already approved for this item.`;
        resolvedActions.innerHTML = `
          <button type="button" class="btn btn-primary btn-sm" data-action="open-handover" data-claim-id="${escapeHtml(anotherApproved.id)}">Open Approved Handover</button>
        `;
      }
    }
  }

  function handleApproveClaim() {
    clearReviewFormErrors();
    const claim = getClaimById(ui.selectedClaimId);
    const item = claim ? getItemById(claim.itemId) : null;
    const user = getCurrentUser();

    if (!claim || !item || item.finderId !== user.id || claim.status !== "pending") {
      showToast("This claim cannot be approved in its current state.", "warning");
      return;
    }

    const pickupLocation = document.getElementById("review-pickup-location").value.trim();
    const date = document.getElementById("review-handover-date").value;
    const time = document.getElementById("review-handover-time").value.trim();
    const instructions = document.getElementById("review-handover-instructions").value.trim();

    let firstInvalid = null;
    if (pickupLocation.length < 3) {
      setFieldError("review-pickup-location", "err-review-pickup", "Enter a pickup location.");
      firstInvalid = firstInvalid || "review-pickup-location";
    }
    if (!date) {
      setFieldError("review-handover-date", "err-review-date", "Select an agreed pickup date.");
      firstInvalid = firstInvalid || "review-handover-date";
    }
    if (time.length < 2) {
      setFieldError("review-handover-time", "err-review-time", "Enter an agreed pickup time.");
      firstInvalid = firstInvalid || "review-handover-time";
    }
    if (instructions.length < 5) {
      setFieldError(
        "review-handover-instructions",
        "err-review-instructions",
        "Provide clear private handover instructions."
      );
      firstInvalid = firstInvalid || "review-handover-instructions";
    }

    if (firstInvalid) {
      document.getElementById(firstInvalid).focus();
      showToast("Complete the handover details before approving the claim.", "warning");
      return;
    }

    claim.status = "approved";
    claim.reviewedAt = new Date().toISOString();
    claim.handover = {
      pickupLocation,
      date,
      time,
      instructions
    };

    persistState();

    // Notify claimant
    addNotification({
      type: "Claim Approved",
      message: `Your claim ${claim.id} for "${item.title}" was approved! View private handover details.`,
      targetView: "handover",
      targetId: claim.id,
      audienceUserId: claim.claimantId
    });

    // Notify finder confirmation
    addNotification({
      type: "Claim Approved",
      message: `You approved claim ${claim.id} by ${claim.claimantName} for "${item.title}".`,
      targetView: "handover",
      targetId: claim.id,
      audienceUserId: user.id
    });

    showToast("Claim approved! Verified handover details are now unlocked.", "success");
    navigateTo("handover", { claimId: claim.id, returnTo: "my-reports" });
  }

  function handleRejectClaim() {
    const claim = getClaimById(ui.selectedClaimId);
    const item = claim ? getItemById(claim.itemId) : null;
    const user = getCurrentUser();

    if (!claim || !item || item.finderId !== user.id || claim.status !== "pending") {
      showToast("This claim cannot be rejected in its current state.", "warning");
      return;
    }

    openConfirmModal({
      title: "Reject Ownership Claim?",
      message: `Reject claim ${claim.id} from ${claim.claimantName}? Pickup details will remain hidden and "${item.title}" will stay open for the legitimate owner.`,
      confirmLabel: "Reject Claim",
      danger: true,
      onConfirm: () => {
        claim.status = "rejected";
        claim.reviewedAt = new Date().toISOString();
        persistState();

        addNotification({
          type: "Claim Rejected",
          message: `Your claim ${claim.id} for "${item.title}" was not approved by the finder.`,
          targetView: "my-claims",
          targetId: claim.id,
          audienceUserId: claim.claimantId
        });

        addNotification({
          type: "Claim Rejected",
          message: `You rejected claim ${claim.id} for "${item.title}". Listing remains active.`,
          targetView: "my-reports",
          targetId: item.id,
          audienceUserId: user.id
        });

        showToast("Claim rejected. Item remains active for other legitimate claims.", "info");
        renderReviewClaimView();
        renderGlobalChrome();
      }
    });
  }

  /* ------------------------------------------------------------------------
     VIEW 6: Verified Handover
     ------------------------------------------------------------------------ */
  function renderHandoverView() {
    const claim = getClaimById(ui.selectedClaimId);
    const item = claim ? getItemById(claim.itemId) : null;
    const user = getCurrentUser();

    if (!claim || !item || claim.status !== "approved" || !claim.handover) {
      showToast("Approved handover details are not available for this claim.", "warning");
      navigateTo("my-claims");
      return;
    }

    const isParticipant = user.id === item.finderId || user.id === claim.claimantId;
    if (!isParticipant) {
      showToast("Private handover details are restricted to the finder and verified claimant.", "warning");
      navigateTo("browse");
      return;
    }

    const backBtn = document.getElementById("btn-handover-back");
    backBtn.textContent =
      ui.previousView === "my-reports" ? "← Back to My Reports" : "← Back to My Claims";

    const isRecovered = item.status === "recovered";
    const banner = document.getElementById("handover-status-banner");
    banner.className = `handover-status-banner ${isRecovered ? "is-recovered" : "is-approved"}`;

    document.getElementById("handover-status-pill").textContent = isRecovered
      ? "ITEM RECOVERED"
      : "CLAIM APPROVED";
    document.getElementById("handover-item-title").textContent = item.title;
    document.getElementById("handover-meta-line").textContent =
      `${claim.id} · ${item.id} · ${item.zone}`;

    document.getElementById("handover-pickup-location").textContent = claim.handover.pickupLocation;
    document.getElementById("handover-custody-note").textContent = `Custody Status: ${item.custodyStatus}`;
    document.getElementById("handover-date").textContent = formatDisplayDate(claim.handover.date);
    document.getElementById("handover-time").textContent = claim.handover.time;
    document.getElementById("handover-instructions").textContent = claim.handover.instructions;
    document.getElementById("handover-finder-name").textContent = item.finderName;
    document.getElementById("handover-claimant-name").textContent = claim.claimantName;

    // Show private uploaded photo only now that claim is approved
    const photoSection = document.getElementById("handover-photo-section");
    const photoImg = document.getElementById("handover-unlocked-photo");
    if (item.privatePhoto) {
      photoImg.src = item.privatePhoto;
      photoSection.hidden = false;
    } else {
      photoImg.src = "";
      photoSection.hidden = true;
    }

    const recoverBtn = document.getElementById("btn-mark-recovered");
    const recoveredBanner = document.getElementById("handover-recovered-banner");
    const recoveredDateEl = document.getElementById("handover-recovered-date");

    recoverBtn.hidden = isRecovered;
    recoveredBanner.hidden = !isRecovered;
    if (isRecovered) {
      recoveredDateEl.textContent = `Marked recovered on ${formatDisplayDate(
        item.recoveredAt
      )}. This item has been removed from active listings and recorded in Recovered Records.`;
    }
  }

  function handleMarkAsRecovered() {
    const claim = getClaimById(ui.selectedClaimId);
    const item = claim ? getItemById(claim.itemId) : null;
    if (!claim || !item || item.status === "recovered") return;

    openConfirmModal({
      title: "Mark Item as Recovered?",
      message: `Confirm that "${item.title}" (${item.id}) has been collected by its owner. This will remove it from active listings and update campus recovery statistics.`,
      confirmLabel: "Mark as Recovered",
      danger: false,
      onConfirm: () => {
        item.status = "recovered";
        item.recoveredAt = new Date().toISOString();
        persistState();

        addNotification({
          type: "Item Recovered",
          message: `"${item.title}" (${item.id}) has been recovered and closed. Dashboard stats updated.`,
          targetView: "handover",
          targetId: claim.id,
          audienceUserId: "ALL"
        });

        showToast(`"${item.title}" marked as recovered!`, "success");
        renderHandoverView();
        renderGlobalChrome();
      }
    });
  }

  /* ------------------------------------------------------------------------
     VIEW 7: My Reports
     ------------------------------------------------------------------------ */
  function renderMyReportsView() {
    const user = getCurrentUser();
    document.getElementById("my-reports-user-name").textContent = user.name;

    // Sync active tab button
    document.querySelectorAll("[data-reports-tab]").forEach((btn) => {
      const active = btn.dataset.reportsTab === ui.reportsTab;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });

    const myItems = state.items
      .filter((item) => item.finderId === user.id)
      .sort((a, b) => new Date(b.reportedAt) - new Date(a.reportedAt));

    const filtered = myItems.filter((item) => {
      const claims = getClaimsForItem(item.id);
      if (ui.reportsTab === "active") return item.status === "active";
      if (ui.reportsTab === "recovered") return item.status === "recovered";
      if (ui.reportsTab === "pending-claims") {
        return item.status === "active" && claims.some((c) => c.status === "pending");
      }
      return true;
    });

    const listEl = document.getElementById("my-reports-list");
    const emptyEl = document.getElementById("my-reports-empty");

    if (filtered.length === 0) {
      listEl.innerHTML = "";
      emptyEl.hidden = false;
      return;
    }

    emptyEl.hidden = true;
    listEl.innerHTML = filtered
      .map((item) => {
        const claims = getClaimsForItem(item.id);
        const pendingClaims = claims.filter((c) => c.status === "pending");
        const approvedClaim = claims.find((c) => c.status === "approved");
        const isRecovered = item.status === "recovered";

        const claimSummaryBadge = isRecovered
          ? '<span class="badge badge-status-recovered">Recovered</span>'
          : approvedClaim
            ? '<span class="badge badge-claim-approved">Handover Ready</span>'
            : pendingClaims.length > 0
              ? `<span class="badge badge-claim-pending">${pendingClaims.length} Pending ${
                  pendingClaims.length === 1 ? "Claim" : "Claims"
                }</span>`
              : '<span class="badge badge-neutral">No Claims Yet</span>';

        const claimsPanelHtml =
          claims.length > 0
            ? `
              <div class="record-claims-panel">
                <span class="record-claims-title">Incoming Ownership Claims (${claims.length})</span>
                ${claims
                  .map(
                    (claim) => `
                      <div class="mini-claim-row">
                        <div class="mini-claim-info">
                          <strong>${escapeHtml(claim.claimantName)} &middot; ${escapeHtml(claim.id)}</strong>
                          <small>Submitted answer: &ldquo;${escapeHtml(claim.answer)}&rdquo; &middot; ${escapeHtml(
                            formatDisplayDate(claim.createdAt)
                          )}</small>
                        </div>
                        <div class="mini-claim-actions">
                          <span class="badge ${getClaimBadgeClass(claim.status)}">${escapeHtml(
                            getClaimStatusLabel(claim.status)
                          )}</span>
                          ${
                            claim.status === "pending" && !isRecovered && !approvedClaim
                              ? `<button type="button" class="btn btn-primary btn-sm" data-action="review-claim" data-claim-id="${escapeHtml(claim.id)}">Review Claim</button>`
                              : ""
                          }
                          ${
                            claim.status === "approved"
                              ? `<button type="button" class="btn btn-success btn-sm" data-action="open-handover" data-claim-id="${escapeHtml(claim.id)}">View Handover</button>`
                              : ""
                          }
                          ${
                            claim.status === "rejected"
                              ? `<button type="button" class="btn btn-secondary btn-sm" data-action="review-claim" data-claim-id="${escapeHtml(claim.id)}">View Decision</button>`
                              : ""
                          }
                        </div>
                      </div>
                    `
                  )
                  .join("")}
              </div>
            `
            : "";

        return `
          <article class="record-card">
            <div class="record-card-header">
              <div class="record-card-title-group">
                <h3>${escapeHtml(item.title)}</h3>
                <p class="record-card-meta">
                  ${escapeHtml(item.id)} &middot; ${escapeHtml(item.category)} &middot; ${escapeHtml(
                    item.zone
                  )} &middot; Found ${escapeHtml(formatDisplayDate(item.dateFound))}
                </p>
              </div>
              <div class="item-card-badges">
                <span class="badge ${getCustodyBadgeClass(item.custodyStatus)}">${escapeHtml(
                  getCustodyShortLabel(item.custodyStatus)
                )}</span>
                ${claimSummaryBadge}
              </div>
            </div>

            <p class="record-card-body">${escapeHtml(item.description)}</p>

            ${claimsPanelHtml}

            <div class="record-card-actions">
              <button type="button" class="btn btn-secondary btn-sm" data-action="view-item" data-item-id="${escapeHtml(item.id)}">
                View Public Listing
              </button>
              ${
                approvedClaim && !isRecovered
                  ? `<button type="button" class="btn btn-primary btn-sm" data-action="open-handover" data-claim-id="${escapeHtml(approvedClaim.id)}">Open Verified Handover</button>`
                  : ""
              }
            </div>
          </article>
        `;
      })
      .join("");
  }

  /* ------------------------------------------------------------------------
     VIEW 8: My Claims
     ------------------------------------------------------------------------ */
  function renderMyClaimsView() {
    const user = getCurrentUser();
    document.getElementById("my-claims-user-name").textContent = user.name;

    document.querySelectorAll("[data-claims-tab]").forEach((btn) => {
      const active = btn.dataset.claimsTab === ui.claimsTab;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });

    const myClaims = state.claims
      .filter((claim) => claim.claimantId === user.id)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const filtered = myClaims.filter((claim) => {
      if (ui.claimsTab === "all") return true;
      return claim.status === ui.claimsTab;
    });

    const listEl = document.getElementById("my-claims-list");
    const emptyEl = document.getElementById("my-claims-empty");

    if (filtered.length === 0) {
      listEl.innerHTML = "";
      emptyEl.hidden = false;
      return;
    }

    emptyEl.hidden = true;
    listEl.innerHTML = filtered
      .map((claim) => {
        const item = getItemById(claim.itemId);
        if (!item) return "";

        const isRecovered = item.status === "recovered";
        const handoverPreviewHtml =
          claim.status === "approved" && claim.handover
            ? `
              <div class="claim-handover-preview">
                <strong>Unlocked Handover Details</strong>
                <span><strong>Pickup:</strong> ${escapeHtml(claim.handover.pickupLocation)}</span>
                <span><strong>When:</strong> ${escapeHtml(formatDisplayDate(claim.handover.date))} at ${escapeHtml(
                  claim.handover.time
                )}</span>
                <span><strong>Instructions:</strong> ${escapeHtml(claim.handover.instructions)}</span>
              </div>
            `
            : "";

        return `
          <article class="record-card">
            <div class="record-card-header">
              <div class="record-card-title-group">
                <h3>${escapeHtml(item.title)}</h3>
                <p class="record-card-meta">
                  ${escapeHtml(claim.id)} &middot; Item ${escapeHtml(item.id)} &middot; ${escapeHtml(
                    item.zone
                  )} &middot; Submitted ${escapeHtml(formatDisplayDate(claim.createdAt))}
                </p>
              </div>
              <div class="item-card-badges">
                <span class="badge ${getClaimBadgeClass(claim.status)}">${escapeHtml(
                  getClaimStatusLabel(claim.status)
                )}</span>
                ${
                  isRecovered
                    ? '<span class="badge badge-status-recovered">Recovered</span>'
                    : `<span class="badge ${getCustodyBadgeClass(item.custodyStatus)}">${escapeHtml(
                        getCustodyShortLabel(item.custodyStatus)
                      )}</span>`
                }
              </div>
            </div>

            <div class="claim-answer-preview">
              <div><strong>Finder&rsquo;s Question:</strong> ${escapeHtml(item.secretQuestion)}</div>
              <div><strong>Your Submitted Answer:</strong> &ldquo;${escapeHtml(claim.answer)}&rdquo;</div>
            </div>

            ${handoverPreviewHtml}

            <div class="record-card-actions">
              <button type="button" class="btn btn-secondary btn-sm" data-action="view-item" data-item-id="${escapeHtml(item.id)}">
                View Item
              </button>
              ${
                claim.status === "approved"
                  ? `<button type="button" class="btn btn-success btn-sm" data-action="open-handover" data-claim-id="${escapeHtml(claim.id)}">${
                      isRecovered ? "View Recovery Record" : "Open Handover & Mark Recovered"
                    }</button>`
                  : ""
              }
            </div>
          </article>
        `;
      })
      .join("");
  }

  /* ------------------------------------------------------------------------
     VIEW 9: Profile & Demo Settings
     ------------------------------------------------------------------------ */
  function renderProfileView() {
    const user = getCurrentUser();

    document.getElementById("profile-avatar-lg").textContent = user.initials;
    document.getElementById("profile-display-name").textContent = user.name;
    document.getElementById("profile-display-meta").textContent = `${user.studentId} · ${user.department}`;
    document.getElementById("profile-display-email").textContent = user.email;

    const myReports = state.items.filter((i) => i.finderId === user.id);
    const myClaims = state.claims.filter((c) => c.claimantId === user.id);
    const myRecovered = state.items.filter((i) => {
      if (i.status !== "recovered") return false;
      if (i.finderId === user.id) return true;
      return state.claims.some(
        (c) => c.itemId === i.id && c.claimantId === user.id && c.status === "approved"
      );
    });

    document.getElementById("profile-stat-reports").textContent = String(myReports.length);
    document.getElementById("profile-stat-claims").textContent = String(myClaims.length);
    document.getElementById("profile-stat-recovered").textContent = String(myRecovered.length);

    const switcherEl = document.getElementById("demo-user-switcher");
    switcherEl.innerHTML = DEMO_USERS.map((persona) => {
      const isCurrent = persona.id === user.id;
      return `
        <div class="persona-card ${isCurrent ? "is-current" : ""}">
          <div class="persona-info">
            <span class="avatar-circle avatar-sm" aria-hidden="true">${escapeHtml(persona.initials)}</span>
            <div>
              <strong>${escapeHtml(persona.name)}</strong>
              <small>${escapeHtml(persona.studentId)} &middot; ${escapeHtml(persona.department)}</small>
            </div>
          </div>
          ${
            isCurrent
              ? '<span class="badge badge-status-active">Active Student</span>'
              : `<button type="button" class="btn btn-secondary btn-sm" data-action="switch-user" data-user-id="${escapeHtml(persona.id)}">Switch to ${escapeHtml(persona.shortName)}</button>`
          }
        </div>
      `;
    }).join("");
  }

  function switchDemoUser(userId) {
    const target = DEMO_USERS.find((u) => u.id === userId);
    if (!target || target.id === state.currentUserId) return;

    state.currentUserId = target.id;
    persistState();
    showToast(`Switched demo student to ${target.name} (${target.studentId}).`, "info");
    renderActiveView();
  }

  function handleResetDemoData() {
    openConfirmModal({
      title: "Reset Demonstration Data?",
      message:
        "This will erase any reports, claims, and notifications you created in this browser and restore the original sample campus items.",
      confirmLabel: "Reset Demo Data",
      danger: true,
      onConfirm: () => {
        state = createSeedState();
        persistState();
        ui.reportsTab = "all";
        ui.claimsTab = "all";
        resetReportForm();
        clearBrowseFilters();
        showToast("Demonstration data restored to default sample records.", "success");
        navigateTo("home");
      }
    });
  }

  /* ------------------------------------------------------------------------
     Event Binding (Event Delegation + Dedicated Form Listeners)
     ------------------------------------------------------------------------ */
  function bindEvents() {
    // Global click delegation for navigation and dynamic action buttons
    document.addEventListener("click", (event) => {
      const navTrigger = event.target.closest("[data-nav]");
      if (navTrigger) {
        const destination = navTrigger.dataset.nav;
        navigateTo(destination);
        return;
      }

      const reportsTab = event.target.closest("[data-reports-tab]");
      if (reportsTab) {
        ui.reportsTab = reportsTab.dataset.reportsTab;
        renderMyReportsView();
        return;
      }

      const claimsTab = event.target.closest("[data-claims-tab]");
      if (claimsTab) {
        ui.claimsTab = claimsTab.dataset.claimsTab;
        renderMyClaimsView();
        return;
      }

      const actionBtn = event.target.closest("[data-action]");
      if (!actionBtn) return;

      const action = actionBtn.dataset.action;
      if (action === "view-item") {
        navigateTo("item-detail", { itemId: actionBtn.dataset.itemId, returnTo: ui.activeView });
      } else if (action === "review-claim") {
        navigateTo("review-claim", { claimId: actionBtn.dataset.claimId, returnTo: "my-reports" });
      } else if (action === "open-handover") {
        navigateTo("handover", { claimId: actionBtn.dataset.claimId, returnTo: ui.activeView });
      } else if (action === "switch-user") {
        switchDemoUser(actionBtn.dataset.userId);
      } else if (action === "open-notification") {
        const notif = state.notifications.find((n) => n.id === actionBtn.dataset.notifId);
        if (notif) {
          notif.read = true;
          persistState();
          renderNotifications();
          if (notif.targetView === "review-claim" && notif.targetId) {
            navigateTo("review-claim", { claimId: notif.targetId, returnTo: "my-reports" });
          } else if (notif.targetView === "handover" && notif.targetId) {
            navigateTo("handover", { claimId: notif.targetId, returnTo: "my-claims" });
          } else if (notif.targetView) {
            navigateTo(notif.targetView);
          }
        }
      }
    });

    // Sidebar mobile drawer
    document.getElementById("btn-open-sidebar").addEventListener("click", openSidebar);
    document.getElementById("btn-close-sidebar").addEventListener("click", closeSidebar);
    document.getElementById("sidebar-overlay").addEventListener("click", closeSidebar);

    // Notifications drawer
    document.getElementById("btn-notifications").addEventListener("click", () => {
      const panel = document.getElementById("notifications-panel");
      if (panel.hidden) {
        openNotificationsPanel();
      } else {
        closeNotificationsPanel();
      }
    });
    document.getElementById("btn-close-notifications").addEventListener("click", closeNotificationsPanel);
    document.getElementById("notif-overlay").addEventListener("click", closeNotificationsPanel);
    document.getElementById("btn-mark-all-read").addEventListener("click", () => {
      const userId = getCurrentUser().id;
      let changed = false;
      state.notifications.forEach((n) => {
        if ((n.audienceUserId === "ALL" || n.audienceUserId === userId) && !n.read) {
          n.read = true;
          changed = true;
        }
      });
      if (changed) {
        persistState();
        renderNotifications();
        showToast("All notifications marked as read.", "info");
      }
    });

    // Home quick search -> transfers values to Browse Items
    document.getElementById("home-search-form").addEventListener("submit", (event) => {
      event.preventDefault();
      document.getElementById("browse-search").value =
        document.getElementById("home-search-input").value.trim();
      document.getElementById("browse-category").value =
        document.getElementById("home-category-filter").value;
      document.getElementById("browse-zone").value =
        document.getElementById("home-zone-filter").value;
      document.getElementById("browse-custody").value = "";
      document.getElementById("browse-status").value = "active";
      navigateTo("browse");
    });

    // Browse live filters
    document.getElementById("browse-search").addEventListener("input", renderBrowseItems);
    document.getElementById("browse-category").addEventListener("change", renderBrowseItems);
    document.getElementById("browse-zone").addEventListener("change", renderBrowseItems);
    document.getElementById("browse-custody").addEventListener("change", renderBrowseItems);
    document.getElementById("browse-status").addEventListener("change", renderBrowseItems);
    document.getElementById("btn-clear-filters").addEventListener("click", clearBrowseFilters);
    document.getElementById("btn-empty-clear-filters").addEventListener("click", clearBrowseFilters);

    // Report Found Item form
    document.getElementById("report-form").addEventListener("submit", handleReportSubmit);
    document.getElementById("btn-reset-report-form").addEventListener("click", () => {
      resetReportForm();
      showToast("Form cleared.", "info");
    });
    document.getElementById("report-photo").addEventListener("change", (event) => {
      const file = event.target.files && event.target.files[0];
      handlePhotoSelection(file);
    });
    document.getElementById("btn-remove-photo").addEventListener("click", clearPendingPhoto);

    // Clear individual validation errors on input
    [
      ["report-title", "err-report-title"],
      ["report-category", "err-report-category"],
      ["report-zone", "err-report-zone"],
      ["report-description", "err-report-description"],
      ["report-date", "err-report-date"],
      ["report-secret-question", "err-report-question"],
      ["report-secret-answer", "err-report-answer"],
      ["claim-answer-input", "err-claim-answer"],
      ["review-pickup-location", "err-review-pickup"],
      ["review-handover-date", "err-review-date"],
      ["review-handover-time", "err-review-time"],
      ["review-handover-instructions", "err-review-instructions"]
    ].forEach(([inputId, errorId]) => {
      const el = document.getElementById(inputId);
      if (el) {
        el.addEventListener("input", () => setFieldError(inputId, errorId, ""));
        el.addEventListener("change", () => setFieldError(inputId, errorId, ""));
      }
    });

    // Item Details & Claim Form
    document.getElementById("btn-detail-back").addEventListener("click", () => {
      navigateTo(ui.previousView || "browse");
    });
    document.getElementById("btn-open-claim-form").addEventListener("click", () => {
      document.getElementById("detail-claim-intro").hidden = true;
      document.getElementById("claim-form").hidden = false;
      document.getElementById("claim-answer-input").focus();
    });
    document.getElementById("btn-cancel-claim-form").addEventListener("click", () => {
      document.getElementById("claim-form").hidden = true;
      document.getElementById("detail-claim-intro").hidden = false;
      setFieldError("claim-answer-input", "err-claim-answer", "");
    });
    document.getElementById("claim-form").addEventListener("submit", handleClaimSubmit);

    // Review Claim Actions
    document.getElementById("btn-approve-claim").addEventListener("click", handleApproveClaim);
    document.getElementById("btn-reject-claim").addEventListener("click", handleRejectClaim);
    document.getElementById("review-decision-form").addEventListener("submit", (event) => {
      event.preventDefault();
      handleApproveClaim();
    });

    // Verified Handover Actions
    document.getElementById("btn-handover-back").addEventListener("click", () => {
      navigateTo(ui.previousView === "my-reports" ? "my-reports" : "my-claims");
    });
    document.getElementById("btn-mark-recovered").addEventListener("click", handleMarkAsRecovered);

    // Profile Reset Demo Data
    document.getElementById("btn-reset-demo").addEventListener("click", handleResetDemoData);

    // Confirmation Modal
    document.getElementById("btn-modal-cancel").addEventListener("click", closeConfirmModal);
    document.getElementById("btn-modal-confirm").addEventListener("click", () => {
      const callback = ui.confirmCallback;
      closeConfirmModal();
      if (callback) callback();
    });
    document.getElementById("confirm-modal").addEventListener("click", (event) => {
      if (event.target.id === "confirm-modal") {
        closeConfirmModal();
      }
    });

    // Escape key closes overlays/modals
    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      if (!document.getElementById("confirm-modal").hidden) {
        closeConfirmModal();
      } else if (!document.getElementById("notifications-panel").hidden) {
        closeNotificationsPanel();
      } else if (document.getElementById("app-sidebar").classList.contains("is-open")) {
        closeSidebar();
      }
    });
  }

  /* ------------------------------------------------------------------------
     Bootstrap Application
     ------------------------------------------------------------------------ */
  function init() {
    bindEvents();
    prepareReportFormDefaults();
    renderGlobalChrome();
    renderHomeDashboard();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
