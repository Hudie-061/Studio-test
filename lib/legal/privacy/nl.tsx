// TODO: legal translation must be reviewed by a native speaker — a
// mistranslated legal term is worse than no translation. This Dutch
// version was drafted by machine translation from lib/legal/privacy/en.tsx
// and has not been checked by a native Dutch speaker or a lawyer.

import { H1, Meta, H2, P, Ul, Li, Strong, LegalLink, Table } from "@/components/legal/LegalTypography";
import {
  CONTROLLER_NAME,
  CONTROLLER_ADDRESS,
  CONTACT_EMAIL,
  APD_NAME_NL,
  APD_ADDRESS,
  APD_EMAIL,
  APD_PHONE,
  LEGAL_LAST_UPDATED,
} from "@/lib/legal/constants";

const LAST_UPDATED_DISPLAY = new Intl.DateTimeFormat("nl-BE", {
  dateStyle: "long",
}).format(new Date(LEGAL_LAST_UPDATED));

export function PrivacyNl() {
  return (
    <>
      <H1>Privacyverklaring</H1>
      <Meta>Laatst bijgewerkt: {LAST_UPDATED_DISPLAY}</Meta>

      <H2>1. Wie verantwoordelijk is voor uw gegevens</H2>
      <P>
        <Strong>{CONTROLLER_NAME}</Strong>, {CONTROLLER_ADDRESS}, is de
        verwerkingsverantwoordelijke voor de persoonsgegevens die in deze
        verklaring worden beschreven. Dat betekent dat wij beslissen waarom
        en hoe uw gegevens worden verwerkt, en dat u bij ons terechtkunt met
        vragen of verzoeken. U kunt ons bereiken via{" "}
        <LegalLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</LegalLink>.
      </P>

      <H2>2. Het contactformulier</H2>
      <P>
        Wanneer u het contactformulier op deze site gebruikt, verzamelen wij
        de naam en het e-mailadres die u opgeeft, en het bericht dat u
        schrijft, als u ervoor kiest er een te schrijven. Het veld “bericht”
        is optioneel — u kunt het formulier verzenden met enkel uw naam en
        e-mailadres.
      </P>
      <P>
        Wij gebruiken deze gegevens uitsluitend om uw vraag te beantwoorden.
      </P>
      <P>
        Rechtsgrond: de verwerking is noodzakelijk om op uw verzoek
        precontractuele maatregelen te nemen (artikel 6, lid 1, onder b, AVG).
      </P>
      <P>
        Bewaartermijn: wij bewaren berichten via dit formulier gedurende 24
        maanden na ons laatste contact met u, en verwijderen ze daarna.
      </P>

      <H2>3. Serverlogboeken</H2>
      <P>
        Onze hostingprovider registreert automatisch het IP-adres, de
        user-agent van de browser en het tijdstip van elk verzoek aan deze
        site — voor elke bezoeker, niet alleen voor wie het contactformulier
        gebruikt. Dit gebeurt als een automatisch, normaal onderdeel van het
        uitbaten van een website; wij verzamelen dit niet apart.
      </P>
      <P>
        Rechtsgrond: ons gerechtvaardigd belang om de site veilig en werkend
        te houden (artikel 6, lid 1, onder f, AVG).
      </P>
      <P>
        Bewaartermijn: onze hostingprovider, Vercel, bewaart deze logboeken
        gedurende een termijn die door ons hostingabonnement wordt bepaald —
        gepubliceerde termijnen lopen van één uur tot drie dagen, of tot 30
        dagen bij abonnementen met uitgebreide logboekbewaring.{" "}
        {/* TODO: bevestig welk Vercel-abonnement en welke exacte
            bewaartermijn van toepassing is. Bron: vercel.com/docs/logs/runtime. */}
      </P>
      <P>
        Daarnaast onthoudt onze server, wanneer u het contactformulier
        verzendt, tijdelijk het IP-adres van recente inzendingen in het
        geheugen, om een korte wachttijd tussen berichten af te dwingen en
        het aantal berichten per uur te beperken. Dit wordt niet in een
        database opgeslagen, niet gekoppeld aan uw naam of bericht, en
        verdwijnt zodra de server herstart. Dezelfde rechtsgrond als hierboven.
      </P>

      <H2>4. Wie nog meer deze gegevens verwerkt</H2>
      <P>
        Wij maken gebruik van een klein aantal externe bedrijven om deze site
        te laten draaien en uw berichten te beantwoorden. Zij mogen uw
        gegevens uitsluitend gebruiken om deze diensten aan ons te leveren —
        niet voor eigen doeleinden.
      </P>
      <Table
        columns={["Verwerker", "Wat ze doen", "Waar ze gevestigd zijn"]}
        rows={[
          ["Vercel", "Hosting en serverlogboeken", "Verenigde Staten"],
          ["Resend", "Verzending van e-mails via het contactformulier", "Verenigde Staten"],
          ["Google Workspace", "Opslag van e-mails die wij ontvangen", "Verenigde Staten"],
        ]}
      />
      <P>
        Dit zijn alle drie Amerikaanse bedrijven. Vercel en Resend geven beide
        aan gecertificeerd te zijn onder het EU-VS Data Privacy Framework (en
        de Britse uitbreiding ervan); Google geeft hetzelfde aan voor de
        diensten achter Google Workspace. Waar dit kader een doorgifte niet
        dekt, steunen de gegevensverwerkingsvoorwaarden van elke provider op
        de modelcontractbepalingen van de Europese Commissie.{" "}
        {/* TODO: geverifieerd op 2026-08-13 aan de hand van elk providers
            eigen openbare privacy-/DPA-pagina’s. Opnieuw bevestigen bij een
            wijziging van provider, en toetsen aan de daadwerkelijk
            ondertekende verwerkersovereenkomst zodra die er is. */}
      </P>

      <H2>5. Als wij uw bedrijf per e-mail hebben gecontacteerd</H2>
      <P>
        Wij benaderen bedrijven per e-mail om onze diensten aan te bieden —
        merkfilms en websites. Als u dit leest omdat u een e-mail van ons
        hebt ontvangen, legt dit gedeelte uit welke gegevens wij bijhouden en
        hoe u dit kunt stopzetten.
      </P>
      <P>
        Categorieën van gegevens die wij mogelijk bijhouden over een bedrijf
        dat wij hebben gecontacteerd:
      </P>
      <Ul>
        <Li>de bedrijfsnaam</Li>
        <Li>het e-mailadres van het bedrijf</Li>
        <Li>het post- of vestigingsadres van het bedrijf</Li>
        <Li>informatie die op de eigen website van het bedrijf is gepubliceerd</Li>
        <Li>publiek zichtbare klantbeoordelingen over het bedrijf</Li>
      </Ul>
      <P>Wij halen deze informatie uit drie bronnen, en alleen deze drie:</P>
      <Ul>
        <Li>de eigen website van het bedrijf</Li>
        <Li>openbare vermeldingen op Google Maps</Li>
        <Li>
          waar in onze gegevens vermeld, het openbare Instagram-profiel van
          het bedrijf
        </Li>
      </Ul>
      <P>
        Wij kopen of gebruiken geen contactlijsten uit enige andere bron.
      </P>
      <P>
        Waar mogelijk sturen wij deze e-mails naar een algemeen bedrijfsadres
        — info@, contact@, hello@ of vergelijkbaar — in plaats van naar een
        met naam genoemde persoon.
      </P>
      <P>
        Rechtsgrond: ons gerechtvaardigd belang om onze diensten aan te
        bieden aan bedrijven die daarin geïnteresseerd zouden kunnen zijn
        (artikel 6, lid 1, onder f, AVG). Wij hebben dit belang afgewogen
        tegen dat van de personen die het bedrijf leiden of er werken: wij
        contacteren bedrijven, geen privépersonen; wij gebruiken waar
        mogelijk een algemeen adres; en wij stoppen zodra hierom wordt
        gevraagd.
      </P>
      <P>
        <Strong>Hoe u dit stopzet:</Strong> antwoord met “remove” (of
        “uitschrijven”) op om het even welk bericht van ons, of schrijf naar{" "}
        <LegalLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</LegalLink>
        . Wij verwijderen dan de gegevens van het bedrijf uit onze
        administratie. Wij houden enkel het e-mailadres bij op een
        uitsluitingslijst, zodat wij weten het niet opnieuw te contacteren —
        dat adres is het enige dat wij bewaren, en uitsluitend voor dat doel.
      </P>
      <P>
        Bewaartermijn: bij uitblijven van een reactie of interesse
        verwijderen wij het dossier 12 maanden na onze laatste contactpoging.
      </P>

      <H2>6. Uw rechten</H2>
      <P>Onder de AVG hebt u het recht om:</P>
      <Ul>
        <Li>de persoonsgegevens die wij over u bijhouden in te zien</Li>
        <Li>onjuiste gegevens te laten corrigeren</Li>
        <Li>uw gegevens te laten verwijderen</Li>
        <Li>de verwerking van uw gegevens te laten beperken</Li>
        <Li>bezwaar te maken tegen onze verwerking</Li>
        <Li>uw gegevens in een overdraagbaar formaat te ontvangen</Li>
      </Ul>
      <P>
        Als u bezwaar maakt tegen het contacteren voor prospectiedoeleinden,
        respecteren wij dat onmiddellijk en zonder daarvoor een reden te
        vragen.
      </P>
      <P>
        Om een van deze rechten uit te oefenen, schrijft u naar{" "}
        <LegalLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</LegalLink>
        . Wij antwoorden binnen een maand.
      </P>

      <H2>7. Klachten</H2>
      <P>
        Als u van mening bent dat wij uw persoonsgegevens verkeerd hebben
        verwerkt, kunt u een klacht indienen bij de {APD_NAME_NL}:
      </P>
      <Ul>
        <Li>{APD_ADDRESS}</Li>
        <Li>
          <LegalLink href={`mailto:${APD_EMAIL}`}>{APD_EMAIL}</LegalLink>
        </Li>
        <Li>{APD_PHONE}</Li>
      </Ul>
      <P>
        U kunt zich ook wenden tot de gegevensbeschermingsautoriteit van uw
        eigen land, als u dat verkiest.
      </P>

      <H2>8. Cookies</H2>
      <P>
        Deze site plaatst geen cookies en gebruikt geen local storage,
        session storage, analytics, advertentie- of andere trackingtechnologie.
        Er is hier niets waarvoor uw toestemming nodig is, dus vragen wij die
        ook niet.
      </P>
      <P>
        De twee lettertypes die op deze site worden gebruikt, worden bij het
        uitrollen van de site ingebouwd en vanaf ons eigen domein geserveerd
        — uw browser neemt tijdens uw bezoek nooit contact op met een
        lettertypedienst van derden.
      </P>
      <P>
        Mocht dit ooit veranderen — bijvoorbeeld als wij analytics of een
        ingesloten videospeler van een derde partij toevoegen — dan werken
        wij dit gedeelte bij en voorzien wij vooraf, niet achteraf, in een
        toestemmingsmechanisme.
      </P>

      <H2>9. Wijzigingen aan deze verklaring</H2>
      <P>
        Wij werken deze verklaring bij telkens wanneer wat wij daadwerkelijk
        met uw gegevens doen verandert, en passen de datum bovenaan deze
        pagina aan.
      </P>
    </>
  );
}
