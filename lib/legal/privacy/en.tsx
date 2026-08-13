import { H1, Meta, H2, P, Ul, Li, Strong, LegalLink, Table } from "@/components/legal/LegalTypography";
import {
  CONTROLLER_NAME,
  CONTROLLER_ADDRESS,
  CONTACT_EMAIL,
  APD_NAME_EN,
  APD_ADDRESS,
  APD_EMAIL,
  APD_PHONE,
  LEGAL_LAST_UPDATED,
} from "@/lib/legal/constants";

const LAST_UPDATED_DISPLAY = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "long",
}).format(new Date(LEGAL_LAST_UPDATED));

export function PrivacyEn() {
  return (
    <>
      <H1>Privacy Notice</H1>
      <Meta>Last updated: {LAST_UPDATED_DISPLAY}</Meta>

      <H2>1. Who is responsible for your data</H2>
      <P>
        <Strong>{CONTROLLER_NAME}</Strong>, {CONTROLLER_ADDRESS}, is the controller
        responsible for the personal data described in this notice. That means we
        decide why and how your data is processed, and we are who you should
        contact with questions or requests. You can reach us at{" "}
        <LegalLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</LegalLink>.
      </P>

      <H2>2. The contact form</H2>
      <P>
        When you use the contact form on this site, we collect the name and
        email address you provide, and the message you write, if you choose to
        write one. The message field is optional — you can submit the form with
        only your name and email address.
      </P>
      <P>We use this information to answer your enquiry, and for nothing else.</P>
      <P>
        Legal basis: processing is necessary to take steps, at your request,
        before entering into a contract (Article 6(1)(b) GDPR).
      </P>
      <P>
        Retention: we keep contact-form submissions for 24 months from your
        last contact with us, then delete them.
      </P>

      <H2>3. Server logs</H2>
      <P>
        Our hosting provider automatically records the IP address, browser
        user-agent, and time of every request made to this site — for every
        visitor, not only people who use the contact form. This happens as a
        normal, automatic part of operating a website; we do not choose to
        collect it separately.
      </P>
      <P>
        Legal basis: our legitimate interest in keeping the site secure and
        operational (Article 6(1)(f) GDPR).
      </P>
      <P>
        Retention: our hosting provider, Vercel, retains these logs for a
        period set by our hosting plan — published figures range from one
        hour up to three days, or up to 30 days on plans with extended log
        retention.{" "}
        {/* TODO: confirm which Vercel plan / log-retention tier is active
            for this project and replace the range above with the exact
            figure. Source: vercel.com/docs/logs/runtime. */}
      </P>
      <P>
        Separately, when you submit the contact form, our server temporarily
        remembers the IP address of recent submissions in memory, to enforce a
        short waiting period between messages and limit how many messages can
        be sent per hour. This is not written to a database, is not linked to
        your name or message, and does not persist beyond the running server
        process. Same legal basis as above.
      </P>

      <H2>4. Who else processes this data</H2>
      <P>
        We use a small number of outside companies to run this site and
        respond to your messages. They may only use your data to provide
        these services to us — not for their own purposes.
      </P>
      <Table
        columns={["Processor", "What they do", "Where they’re based"]}
        rows={[
          ["Vercel", "Hosting and server logs", "United States"],
          ["Resend", "Delivers contact-form email", "United States"],
          ["Google Workspace", "Stores email we receive", "United States"],
        ]}
      />
      <P>
        These are all United States companies. Vercel and Resend both state
        that they are certified under the EU-US Data Privacy Framework (and
        its UK extension); Google states the same for the services behind
        Google Workspace. Where the Framework doesn’t cover a transfer, each
        provider’s data processing terms rely on the European Commission’s
        Standard Contractual Clauses.{" "}
        {/* TODO: verify — checked against each provider’s own published
            privacy/DPA pages on 2026-08-13. Re-confirm if a provider changes,
            and confirm against the actual signed DPA with each processor
            once in place, rather than relying on their public policy pages
            alone. */}
      </P>

      <H2>5. If we contacted your business by email</H2>
      <P>
        We contact businesses by email to offer our services — brand films
        and websites. If you’re reading this because you received an email
        from us, this section explains what we hold and how to stop it.
      </P>
      <P>Categories of data we may hold about a business we’ve contacted:</P>
      <Ul>
        <Li>the business name</Li>
        <Li>the business’s email address</Li>
        <Li>the business’s postal or registered address</Li>
        <Li>information published on the business’s own website</Li>
        <Li>customer reviews that are publicly visible about the business</Li>
      </Ul>
      <P>We get this information from three places, and only these three:</P>
      <Ul>
        <Li>the business’s own website</Li>
        <Li>public listings on Google Maps</Li>
        <Li>
          where noted in our records, the business’s public Instagram profile
        </Li>
      </Ul>
      <P>We do not buy or use contact lists from any other source.</P>
      <P>
        Wherever possible, we send these emails to a generic business address
        — info@, contact@, hello@, or similar — rather than to a named
        individual.
      </P>
      <P>
        Legal basis: our legitimate interest in offering our services to
        businesses that may want them (Article 6(1)(f) GDPR). We’ve weighed
        this against the interests of the people who run or work at the
        business: we contact businesses, not private individuals; we use
        generic addresses wherever one exists; and we stop as soon as asked.
      </P>
      <P>
        <Strong>How to stop it:</Strong> reply “remove” to any message from
        us, or write to{" "}
        <LegalLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</LegalLink>
        . We then delete the business’s details from our records. We keep the
        email address itself on a suppression list, so that we know not to
        contact it again — that address is the only thing we retain, and only
        for that purpose.
      </P>
      <P>
        Retention: if there is no reply and no interest, we delete the record
        12 months after our last contact attempt.
      </P>

      <H2>6. Your rights</H2>
      <P>Under the GDPR, you have the right to:</P>
      <Ul>
        <Li>access the personal data we hold about you</Li>
        <Li>have inaccurate data corrected (rectification)</Li>
        <Li>have your data deleted (erasure)</Li>
        <Li>restrict how we use your data</Li>
        <Li>object to our processing</Li>
        <Li>receive your data in a portable format</Li>
      </Ul>
      <P>
        If you object to being contacted for outreach, we honour that
        immediately and without asking why.
      </P>
      <P>
        To exercise any of these rights, write to{" "}
        <LegalLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</LegalLink>
        . We respond within one month.
      </P>

      <H2>7. Complaints</H2>
      <P>
        If you believe we have mishandled your personal data, you can lodge a
        complaint with the {APD_NAME_EN}:
      </P>
      <Ul>
        <Li>{APD_ADDRESS}</Li>
        <Li>
          <LegalLink href={`mailto:${APD_EMAIL}`}>{APD_EMAIL}</LegalLink>
        </Li>
        <Li>{APD_PHONE}</Li>
      </Ul>
      <P>
        You may also complain to the data protection authority in your own
        country, if you prefer.
      </P>

      <H2>8. Cookies</H2>
      <P>
        This site does not set cookies and does not use local storage,
        session storage, analytics, advertising, or any other tracking
        technology. There is nothing here that needs your consent, so we
        don’t ask for it.
      </P>
      <P>
        The two fonts used on this site are built into the site at deploy
        time and served from our own domain — your browser never contacts a
        third-party font service when you visit.
      </P>
      <P>
        If this ever changes — for example, if we add analytics or an
        embedded third-party video player — we will update this section and
        add a consent mechanism before we do, not after.
      </P>

      <H2>9. Changes to this notice</H2>
      <P>
        We’ll update this notice whenever what we actually do with your data
        changes, and update the date at the top of this page.
      </P>
    </>
  );
}
