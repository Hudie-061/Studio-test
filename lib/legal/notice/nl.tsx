// TODO: legal translation must be reviewed by a native speaker — a
// mistranslated legal term is worse than no translation. This Dutch
// version was drafted by machine translation from lib/legal/notice/en.tsx
// and has not been checked by a native Dutch speaker or a lawyer.

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

const LAST_UPDATED_DISPLAY = new Intl.DateTimeFormat("nl-BE", {
  dateStyle: "long",
}).format(new Date(LEGAL_LAST_UPDATED));

export function LegalNoticeNl({ locale }: { locale: Locale }) {
  return (
    <>
      <H1>Wettelijke vermeldingen</H1>
      <Meta>Laatst bijgewerkt: {LAST_UPDATED_DISPLAY}</Meta>

      <P>
        Gepubliceerd overeenkomstig artikel III.74 van het Wetboek van
        economisch recht.
      </P>

      <H2>Uitgever</H2>
      <Ul>
        <Li>
          <Strong>{CONTROLLER_NAME}</Strong>
        </Li>
        <Li>Maatschappelijke zetel: {CONTROLLER_ADDRESS}</Li>
        <Li>Ondernemingsnummer (KBO): {COMPANY_NUMBER}</Li>
      </Ul>

      <H2>Contact</H2>
      <Ul>
        <Li>
          E-mail:{" "}
          <LegalLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</LegalLink>
        </Li>
        <Li>
          WhatsApp / telefoon:{" "}
          <LegalLink href={`tel:${WHATSAPP_PHONE_HREF}`}>
            {WHATSAPP_PHONE_DISPLAY}
          </LegalLink>
        </Li>
      </Ul>

      <H2>Aard van de activiteit</H2>
      <P>{CONTROLLER_NAME} produceert merkfilms en websites voor bedrijven.</P>

      <H2>Hosting</H2>
      <P>
        Deze site wordt gehost door {HOSTING_PROVIDER_NAME}, {HOSTING_PROVIDER_ADDRESS}.
      </P>

      <H2>Persoonsgegevens</H2>
      <P>
        Voor informatie over hoe wij persoonsgegevens verwerken, zie onze{" "}
        <LegalLink href={`/${locale}/privacy`}>privacyverklaring</LegalLink>.
      </P>
    </>
  );
}
