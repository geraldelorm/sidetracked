import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — SideTracked",
  description: "How SideTracked handles your data, cookies, and advertising.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm mb-10 transition-colors"
        style={{ color: "var(--text-muted)" }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Home
      </Link>

      <p
        className="text-xs font-semibold tracking-widest uppercase mb-4"
        style={{ color: "var(--accent)" }}
      >
        Legal
      </p>
      <h1 className="text-4xl font-bold mb-3" style={{ color: "var(--text)" }}>
        Privacy Policy
      </h1>
      <p className="text-sm mb-10" style={{ color: "var(--text-muted)" }}>
        Last updated: April 2026
      </p>

      <div className="prose">
        <h2>Overview</h2>
        <p>
          SideTracked is a personal blog. This page explains what data is collected when you
          visit, how it is used, and what choices you have.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We do not collect any personal information directly. There are no user accounts,
          mailing lists, or contact forms that store your data on this site.
        </p>
        <p>
          However, third-party services embedded on this site may collect data as described
          below.
        </p>

        <h2>Google Analytics</h2>
        <p>
          We use Google Analytics (GA4) to understand how visitors use the site. This includes
          pages visited, time on site, and approximate location (country/city level). No
          personally identifiable information is collected by us.
        </p>
        <p>
          Google Analytics uses cookies to track sessions. You can opt out using the{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Analytics Opt-out Browser Add-on
          </a>
          .
        </p>

        <h2>Google AdSense</h2>
        <p>
          We use Google AdSense to display advertisements. Google may use cookies to serve ads
          based on your prior visits to this site or other sites. This is known as
          interest-based or personalised advertising.
        </p>
        <p>
          You can opt out of personalised ads by visiting{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google's Ad Settings
          </a>{" "}
          or{" "}
          <a
            href="https://www.aboutads.info/choices/"
            target="_blank"
            rel="noopener noreferrer"
          >
            aboutads.info
          </a>
          .
        </p>
        <p>
          For more on how Google uses data from partner sites, see{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
          >
            How Google uses data when you use our partners' sites or apps
          </a>
          .
        </p>

        <h2>Cookies</h2>
        <p>
          This site uses cookies placed by Google Analytics and Google AdSense. These are small
          text files stored in your browser. You can disable cookies in your browser settings,
          though doing so may affect how the site functions.
        </p>

        <h2>Third-Party Links</h2>
        <p>
          Articles on SideTracked may contain links to third-party websites. We are not
          responsible for the privacy practices of those sites and encourage you to read their
          own privacy policies.
        </p>

        <h2>Your Rights</h2>
        <p>
          If you are in the UK or EU, you have rights under UK GDPR and the Data Protection Act
          2018, including the right to access, correct, or request deletion of personal data
          held about you. As we do not collect personal data directly, there is no data for us
          to provide or delete. For data held by Google, please use{" "}
          <a
            href="https://myaccount.google.com/data-and-privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google's privacy controls
          </a>
          .
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this policy from time to time. The date at the top of this page
          reflects the most recent revision. Continued use of the site after any changes
          constitutes acceptance of the updated policy.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this privacy policy? Reach out via the{" "}
          <Link href="/about">About page</Link>.
        </p>
      </div>
    </div>
  );
}
