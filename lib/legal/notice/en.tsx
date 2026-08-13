import { H1, Meta, H2, P, Ul, Li, Strong, LegalLink } from "@/components/legal/LegalTypography";
import type { Locale } from "@/lib/context/TranslationContext";
import {
  CONTROLLER_NAME,
  CONTROLLER_ADDRESS,
  COMPANY_NUMBER,
  CONTACT_EMAIL,
  WHATSAPP_PHONE_DISPLAY,
  WHATSAPP_PHONE_HREF,
  HOSTING_PROVIDER_NAME,
  HOSTING_PROVIDER_ADDRESS,
  LEGAL_LAST_UPDATED,
} from "@/lib/legal/constants";

const LAST_UPDATED_DISPLAY = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "long",
}).format(new Date(LEGAL_LAST_UPDATED));

export function LegalNoticeEn({ locale }: { locale: Locale }) {
  return (
    <>
      <H1>Legal Notice</H1>
      <Meta>Last updated: {LAST_UPDATED_DISPLAY}</Meta>

      <P>
        Published in accordance with Article III.74 of the Belgian Code of
        Economic Law (Code de droit économique).
      </P>

      <H2>Publisher</H2>
      <Ul>
        <Li>
          <Strong>{CONTROLLER_NAME}</Strong>
        </Li>
        <Li>Registered address: {CONTROLLER_ADDRESS}</Li>
        <Li>Belgian enterprise number (BCE/KBO): {COMPANY_NUMBER}</Li>
      </Ul>

      <H2>Contact</H2>
      <Ul>
        <Li>
          Email:{" "}
          <LegalLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</LegalLink>
        </Li>
        <Li>
          WhatsApp / phone:{" "}
          <LegalLink href={`tel:${WHATSAPP_PHONE_HREF}`}>
            {WHATSAPP_PHONE_DISPLAY}
          </LegalLink>
        </Li>
      </Ul>

      <H2>Nature of activity</H2>
      <P>{CONTROLLER_NAME} produces brand films and websites for businesses.</P>

      <H2>Hosting</H2>
      <P>
        This site is hosted by {HOSTING_PROVIDER_NAME}, {HOSTING_PROVIDER_ADDRESS}.
      </P>

      <H2>Personal data</H2>
      <P>
        For information about how we handle personal data, see our{" "}
        <LegalLink href={`/${locale}/privacy`}>Privacy Notice</LegalLink>.
      </P>
    </>
  );
}
