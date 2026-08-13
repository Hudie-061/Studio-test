// TODO: legal translation must be reviewed by a native speaker — a
// mistranslated legal term is worse than no translation. This French
// version was drafted by machine translation from lib/legal/notice/en.tsx
// and has not been checked by a native French speaker or a lawyer.

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

const LAST_UPDATED_DISPLAY = new Intl.DateTimeFormat("fr-BE", {
  dateStyle: "long",
}).format(new Date(LEGAL_LAST_UPDATED));

export function LegalNoticeFr({ locale }: { locale: Locale }) {
  return (
    <>
      <H1>Mentions légales</H1>
      <Meta>Dernière mise à jour : {LAST_UPDATED_DISPLAY}</Meta>

      <P>
        Publiées conformément à l’article III.74 du Code de droit économique.
      </P>

      <H2>Éditeur</H2>
      <Ul>
        <Li>
          <Strong>{CONTROLLER_NAME}</Strong>
        </Li>
        <Li>Siège social : {CONTROLLER_ADDRESS}</Li>
        <Li>Numéro d’entreprise (BCE) : {COMPANY_NUMBER}</Li>
      </Ul>

      <H2>Contact</H2>
      <Ul>
        <Li>
          E-mail :{" "}
          <LegalLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</LegalLink>
        </Li>
        <Li>
          WhatsApp / téléphone :{" "}
          <LegalLink href={`tel:${WHATSAPP_PHONE_HREF}`}>
            {WHATSAPP_PHONE_DISPLAY}
          </LegalLink>
        </Li>
      </Ul>

      <H2>Nature de l’activité</H2>
      <P>{CONTROLLER_NAME} produit des films de marque et des sites web pour des entreprises.</P>

      <H2>Hébergement</H2>
      <P>
        Ce site est hébergé par {HOSTING_PROVIDER_NAME}, {HOSTING_PROVIDER_ADDRESS}.
      </P>

      <H2>Données à caractère personnel</H2>
      <P>
        Pour savoir comment nous traitons les données à caractère personnel,
        consultez notre{" "}
        <LegalLink href={`/${locale}/privacy`}>politique de confidentialité</LegalLink>.
      </P>
    </>
  );
}
