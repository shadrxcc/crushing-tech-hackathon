const notificationPopUp = document.getElementById("alert");
const desktopBellBtn = document.getElementById("notification");
const mobileBellBtn = document.querySelector(".notification-mobile");
const userDesktop = document.querySelector(".user");
const userMobile = document.querySelector(".initials-mobile");
const storePopup = document.querySelector(".store");
const trialCloseBtn = document.getElementById("trial-dismiss");
const trialCallout = document.getElementById("extend");
const setUp = document.querySelector(".setup");

let showNotification = false;
let showStore = false;

function toggleNotification() {
  showStore = false;
  storePopup.style.display = "none";
  showNotification = !showNotification;
  notificationPopUp.style.display = showNotification ? "inline-flex" : "none";
}

function toggleStore() {
  showNotification = false;
  notificationPopUp.style.display = "none";
  showStore = !showStore;
  storePopup.style.display = showStore ? "block" : "none";
}

desktopBellBtn.addEventListener("click", toggleNotification);
mobileBellBtn.addEventListener("click", toggleNotification);

userDesktop.addEventListener("click", toggleStore);
userMobile.addEventListener("click", toggleStore);

trialCloseBtn.addEventListener("click", () => {
  trialCallout.style.opacity = "0";
});

const openGuides = document.getElementById("open-guides");
const guides = document.querySelector(".guides");
const arrowIcon = document.getElementById("open-guides");

let guidesOpen = false;

function openGuidesDropdown() {
  guidesOpen = !guidesOpen;
  guides.style.display = guidesOpen ? "block" : "none";
  guides.style.transition = "transform 3s ease";
  arrowIcon.style.transform = guidesOpen ? "rotate(180deg)" : "rotate(0)";
}

openGuides.addEventListener("click", openGuidesDropdown);

let currentActiveTitle;
let accordionActiveBackground;

function toggleGuide(guidecontentId, guideTitleID, accordionId) {
  const allGuideContents = document.querySelectorAll(".content");
  const allContentTitles = document.querySelectorAll(".content-title");
  const allAccordionWrappers = document.querySelectorAll(".accordion-wrapper");

  allGuideContents.forEach((guideContent) => {
    if (guideContent !== guidecontentId) {
      guideContent.style.display = "none";
    }
  });

  allContentTitles.forEach((guideTitle) => {
    if (guideTitle !== guideTitleID) {
      guideTitle.style.fontWeight = "normal";
    }
    if (guideTitle === guideTitleID) {
      guideTitle.style.fontWeight = "600";
    }
  });

  allAccordionWrappers.forEach((accordion) => {
    if (accordion !== accordionId) {
      accordion.style.background = "none";
      accordion.style.borderRadius = "0";
    }
  });

  const currentDisplay = guidecontentId.style.display;
  if (currentDisplay === "none" || currentDisplay === "") {
    guidecontentId.style.display = "block";
    guideTitleID.style.fontWeight = "600";
    accordionId.style.background = "#F3F3F3";
    accordionId.style.borderRadius = "10px";
    currentActiveTitle = guideTitleID;
    accordionActiveBackground = accordionId;
  }
}

function removeBackground(event) {
  if (currentActiveTitle && accordionActiveBackground) {
    if (currentActiveTitle !== event.target) {
      currentActiveTitle.style.fontWeight = "normal";
      currentActiveTitle.style.borderRadius = "0";
      accordionActiveBackground.style.background = "none";
      accordionActiveBackground.style.borderRadius = "0";
    }
  }
}

for (let i = 1; i <= 5; i++) {
  const contentTitle = document.querySelector(`.content-title-${i}`);
  const guidecontent = document.querySelector(`#content-${i}`);
  const accordionID = document.querySelector(`.accordion-wrapper-${i}`);

  contentTitle.addEventListener("click", (event) => {
    removeBackground(event);
    toggleGuide(guidecontent, contentTitle, accordionID);
  });
}

const setupGuides = document.querySelectorAll(".setup-guide");
let completedGuides = 0;
const progressBar = document.querySelector(".progress-completed");

function updateProgressBar() {
  const progressText = `${completedGuides} / 5 completed`;
  document.querySelector(".progress p").textContent = progressText;
  const progressWidth = (completedGuides / 5) * 100;
  progressBar.style.transition = "width 0.3s ease"; 
  progressBar.style.width = `${progressWidth}%`;
}

function findNextIncompleteStep(currentStep) {
  const allSteps = document.querySelectorAll(".setup-guide");
  let foundCurrentStep = false;

  for (const step of allSteps) {
    if (foundCurrentStep && !step.classList.contains("completed")) {
      return step;
    }

    if (step === currentStep) {
      foundCurrentStep = true;
    }
  }

  return null;
}

function expandNextIncompleteStep(currentStep) {
  const nextIncompleteStep = findNextIncompleteStep(currentStep);

  if (nextIncompleteStep) {
    const nextIncompleteTitle =
      nextIncompleteStep.querySelector("#content-title");
    const nextIncompleteContent = nextIncompleteStep.querySelector(".content");
    const nextAccordion = nextIncompleteStep.closest("#accordion-wrapper");

    toggleGuide(nextIncompleteContent, nextIncompleteTitle, nextAccordion);
  }
}

setupGuides.forEach((guide) => {
  const incompleteIcon = guide.querySelector("#incomplete");
  const loaderIcon = guide.querySelector("#loading");
  const completeIcon = guide.querySelector("#complete");

  incompleteIcon.addEventListener("click", (event) => {
    incompleteIcon.style.display = "none";
    loaderIcon.style.display = "block";

    setTimeout(() => {
      completedGuides++;
      updateProgressBar();
      loaderIcon.style.display = "none";
      completeIcon.style.display = "block";

      removeBackground(event);

      expandNextIncompleteStep(guide);
    }, 2000);
  });

  completeIcon.addEventListener("click", () => {
    completeIcon.style.display = "none";
    incompleteIcon.style.display = "block";

    if (completedGuides > 0) {
      completedGuides--;
      updateProgressBar();
    }
  });
});
