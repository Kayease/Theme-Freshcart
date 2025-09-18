// -------------------------
// Expanded & cleaned lists + strict validators
// -------------------------

// Allowed (large list of popular consumer and business email providers)
// - include major global, regional, ISP, business-friendly, and privacy-focused providers
const allowedDomains = [
    "aol.com", "aim.com", "att.net", "bellsouth.net", "btinternet.com", "comcast.net",
    "cox.net", "earthlink.net", "embarqmail.com", "frontiernet.net", "icloud.com",
    "icloud.net", "inbox.com", "mail.com", "mail.ru", "msn.com", "outlook.com", "outlook.in",
    "hotmail.com", "hotmail.co.uk", "live.com", "live.co.uk", "live.in", "yahoo.com",
    "yahoo.co.uk", "yahoo.in", "ymail.com", "googlemail.com", "gmail.com", "gmx.com",
    "gmx.co.uk", "protonmail.com", "proton.me", "zoho.com", "zoho.in", "fastmail.com",
    "tutanota.com", "hush.com", "hushmail.com", "runbox.com", "posteo.de", "mailbox.org",
    "pm.me", "seznam.cz", "naver.com", "hanmail.net", "daum.net", "qq.com", "163.com",
    "126.com", "sina.com", "rediffmail.com", "indeed.com", "office365.com", "company.com",
    "companyname.com", "business.com", "example.com", "school.edu", "edu.in",
    "institution.edu", "yandex.com", "yandex.ru", "mail.kz", "web.de", "laposte.net",
    "orange.fr", "ntlworld.com", "virginmedia.com", "btopenworld.com", "telstra.com",
    "shaw.ca", "rogers.com", "sympatico.ca", "ntl.com", "cox.com",
    // ecommerce / transactional / marketing-friendly - useful if you want to allow shop/email by provider
    "shopifyemail.com", "sendgrid.net", "amazonses.com", "mailgun.org", "mailchimpapp.net"
];

// Large list of disposable / throwaway / tempmail domains
// - This is a wider catch-all. Keep in mind new services pop up frequently.
const disposableDomains = [
    // widely-known throwaways
    "0-mail.com", "0wnd.net", "10minutemail.com", "20minutemail.com", "33mail.com", "3d-painting.com",
    "4mail.xyz", "5ymail.com", "6paq.com", "anonbox.net", "anonymbox.com", "antichef.com",
    "binkmail.com", "bobmail.info", "brokenmail.de", "cool.fr.nf", "courriel.fr.nf", "crapmail.org",
    "discard.email", "discardmail.com", "disposable-email.org", "disposablemail.com", "djinn.email",
    "dropmail.me", "dropmailbox.com", "dump-email.info", "email-fake.com", "emailgo.de", "emailsensei.com",
    "emailtemporanea.com", "emailtemporanee.com", "emailtemporario.com", "fakeinbox.com", "fakeMailGenerator.com",
    "guerrillamail.com", "getnada.com", "getairmail.com", "getmailspring.com", "ghostmail.com", "guerillamail.biz",
    "harakirimail.com", "hidemail.me", "hidemail.de", "hulapla.de", "inboxbear.com", "inboxclean.com",
    "inboxkitten.com", "incognitomail.org", "jetable.org", "jetable.fr.nf", "kpnmail.nl", "lifeknot.com",
    "mail-temporaire.fr", "mailcatch.com", "maildrop.cc", "maildrop.xyz", "mailinator.com", "mailnesia.com",
    "mailsac.com", "mailslurp.com", "mega.zik.dj", "mintemail.com", "monemail.fr.nf", "mytrashmail.com",
    "nullbox.info", "nwldx.com", "oneoffemail.com", "owlpic.com", "protempmail.com", "rcpt.at",
    "sharklasers.com", "slopsbox.com", "smashmail.de", "spamavert.com", "spambox.us", "spamdecoy.net",
    "spamex.com", "spamgourmet.com", "spamhereplease.com", "temp-mail.org", "temp-mail.io", "temp-mail.pro",
    "tempmail.de", "tempmail.eu", "tempmail.net", "tempmailplus.com", "tempmailo.com", "tempmailaddress.com",
    "temporarymail.com", "temporarymail.net", "trashmail.com", "trash-mail.com", "trashmail.io", "trashmail.de",
    "trashmail.net", "trashmailer.com", "trashymail.com", "throwawaymail.com", "tymily.com", "10minutemail.net",
    "yopmail.com", "yourmail.net", "zippymail.info", "zoemail.com", "spam4.me", "spamhole.com",
    // some service-specific hostnames / variants
    "mailinator2.com", "mailinator.org", "mailinator.net", "mailinator.co", "mailinator.com.br",
    "mailinator.us", "mailinator.xyz", "mailinator.io", "mailinator.ddns.net", "guerrillamail.org"
];

// Separate temp mail / alias services (some overlap exists with disposableDomains)
const tempMailDomains = [
    "temp-mail.org", "mailinator.com", "mailinator.net", "mailinator.org", "getnada.com",
    "nada.email", "dispostable.com", "disposableemailaddresses.com", "trashmail.com",
    "10minutemail.com", "tempinbox.net", "tempail.com", "temporary.email", "tempemail.co",
    "throwawaymail.com", "mytemp.email", "one-time.email", "mail-temporaire.fr"
];

// -------------------------
// Extras: wishlist TLDs/domains + registrars
// -------------------------

// Wishlist: TLDs and domain patterns you might want to register (common/startup-friendly)
const wishlistTLDs = [
    ".com", ".in", ".co", ".io", ".app", ".dev", ".tech", ".ai", ".me", ".net",
    ".org", ".biz", ".online", ".store", ".shop", ".site", ".xyz", ".cloud", ".space"
];

// Example "domains to consider" (replace with your real brand ideas)
const wishlistDomains = [
    "yourbrand.com", "yourbrand.in", "yourbrand.co", "yourproduct.app", "yourstartup.io"
];

// Popular registrars (useful if user asked "register domains all")
const registrarDomains = [
    "godaddy.com", "namecheap.com", "googledomains.com", "hover.com", "bluehost.com",
    "gandi.net", "dynadot.com", "namesilo.com", "networksolutions.com", "ovh.com",
    "hostinger.in", "bigrock.in", "enom.com"
];

// -------------------------
// Helpful utility: quick check function
// -------------------------
function isDisposable(email) {
    if (!email || typeof email !== "string") return false;
    const domain = email.trim().toLowerCase().split("@").pop();
    return disposableDomains.includes(domain) || tempMailDomains.includes(domain);
}

function isAllowed(email) {
    if (!email || typeof email !== "string") return false;
    const domain = email.trim().toLowerCase().split("@").pop();
    return allowedDomains.includes(domain);
}

// Strict email regex (no spaces, no consecutive dots, valid domain labels, TLD length 2-24)
const strictEmailRegex = /^[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,24}$/;

// Whitelisted TLDs (extend as needed)
const allowedTlds = [
    'com', 'net', 'org', 'edu', 'gov', 'mil', 'io', 'co', 'info', 'biz', 'dev', 'app', 'ai', 'in', 'us', 'uk', 'ca', 'au', 'de', 'fr', 'es', 'it', 'nl', 'se', 'no', 'fi', 'ch', 'jp', 'kr', 'br', 'mx', 'ru', 'za', 'cn', 'sg', 'hk', 'tw', 'pl', 'ro', 'gr', 'pt', 'tr', 'sa', 'ae', 'nz', 'be', 'dk', 'ie', 'cz', 'sk', 'hu', 'at', 'ar', 'cl', 'pe', 'id', 'ph', 'my', 'th', 'vn', 'me', 'tv', 'pro', 'tech', 'store', 'shop', 'online', 'cloud', 'studio', 'solutions', 'digital'
];

function validateEmailStrict(email) {
    if (!email || typeof email !== 'string') return false;
    const trimmed = email.trim();
    if (trimmed.includes(' ') || /\.+\./.test(trimmed)) return false;
    if (!strictEmailRegex.test(trimmed)) return false;
    const tld = trimmed.toLowerCase().split('.').pop();
    if (!allowedTlds.includes(tld)) return false;
    if (isDisposable(trimmed)) return false;
    // Domain whitelist is optional; allow any domain whose TLD is allowed and not disposable
    // Still expose isAllowed() for projects that want to strictly whitelist
    return true;
}

export default {
    allowedDomains,
    disposableDomains,
    tempMailDomains,
    wishlistTLDs,
    wishlistDomains,
    registrarDomains,
    strictEmailRegex,
    allowedTlds,
    validateEmailStrict,
    isDisposable,
    isAllowed
};
