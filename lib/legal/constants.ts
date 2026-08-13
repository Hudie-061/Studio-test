// Shared facts referenced by /privacy and /legal, in every locale.
// Update a value here once and it propagates everywhere it's used —
// do not hardcode these facts again inside the page content files.
//
// [CONTROLLER_NAME] [CONTROLLER_ADDRESS] [COMPANY_NUMBER] — grep for these
// bracketed tokens or for the constant names below to find every place the
// controller's identity is asserted.

export const CONTROLLER_NAME = "VANTIR Studio"; // [CONTROLLER_NAME]
export const CONTROLLER_ADDRESS = "TBC"; // [CONTROLLER_ADDRESS] — Belgian registered business address, not yet finalised
export const COMPANY_NUMBER = "TBC"; // [COMPANY_NUMBER] — Belgian enterprise number (BCE/KBO), not yet registered

export const CONTACT_EMAIL = "contact@vantir.studio";
export const WHATSAPP_PHONE_DISPLAY = "+32 477 04 50 71";
export const WHATSAPP_PHONE_HREF = "+32477045071";

// Belgian Data Protection Authority — official bilingual name and contact
// details, as published at https://www.autoriteprotectiondonnees.be /
// https://www.gegevensbeschermingsautoriteit.be. Do not machine-translate
// the authority's own name.
export const APD_NAME_EN = "Belgian Data Protection Authority";
export const APD_NAME_FR = "Autorité de protection des données (APD)";
export const APD_NAME_NL = "Gegevensbeschermingsautoriteit (GBA)";
// TODO: verify this address still resolves in both official language forms
// (it was supplied as-is; the Dutch-language form, "Drukpersstraat 35",
// was not independently confirmed here).
export const APD_ADDRESS = "Rue de la Presse 35, 1000 Brussels";
export const APD_EMAIL = "contact@apd-gba.be";
export const APD_PHONE = "+32 2 274 48 00";

// Verified 2026-08-13 directly against vercel.com/legal/privacy-notice.
export const HOSTING_PROVIDER_NAME = "Vercel Inc.";
export const HOSTING_PROVIDER_ADDRESS =
  "440 N Barranca Avenue #4133, Covina, CA 91723, United States";

// Bump whenever the content of either page changes.
export const LEGAL_LAST_UPDATED = "2026-08-13";
