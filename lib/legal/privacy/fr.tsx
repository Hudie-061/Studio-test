// TODO: legal translation must be reviewed by a native speaker — a
// mistranslated legal term is worse than no translation. This French
// version was drafted by machine translation from lib/legal/privacy/en.tsx
// and has not been checked by a native French speaker or a lawyer.

import { H1, Meta, H2, P, Ul, Li, Strong, LegalLink, Table } from "@/components/legal/LegalTypography";
import {
  CONTROLLER_NAME,
  CONTROLLER_ADDRESS,
  CONTACT_EMAIL,
  APD_NAME_FR,
  APD_ADDRESS,
  APD_EMAIL,
  APD_PHONE,
  LEGAL_LAST_UPDATED,
} from "@/lib/legal/constants";

const LAST_UPDATED_DISPLAY = new Intl.DateTimeFormat("fr-BE", {
  dateStyle: "long",
}).format(new Date(LEGAL_LAST_UPDATED));

export function PrivacyFr() {
  return (
    <>
      <H1>Politique de confidentialité</H1>
      <Meta>Dernière mise à jour : {LAST_UPDATED_DISPLAY}</Meta>

      <H2>1. Qui est responsable de vos données</H2>
      <P>
        <Strong>{CONTROLLER_NAME}</Strong>, {CONTROLLER_ADDRESS}, est le
        responsable du traitement des données à caractère personnel décrites
        dans cette politique. Cela signifie que nous décidons pourquoi et
        comment vos données sont traitées, et que nous sommes l’interlocuteur
        à contacter pour toute question ou demande. Vous pouvez nous joindre
        à{" "}
        <LegalLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</LegalLink>.
      </P>

      <H2>2. Le formulaire de contact</H2>
      <P>
        Lorsque vous utilisez le formulaire de contact de ce site, nous
        recueillons le nom et l’adresse e-mail que vous indiquez, ainsi que
        le message que vous rédigez, si vous choisissez d’en écrire un. Le
        champ « message » est facultatif — vous pouvez envoyer le formulaire
        avec uniquement votre nom et votre adresse e-mail.
      </P>
      <P>
        Nous utilisons ces informations uniquement pour répondre à votre
        demande.
      </P>
      <P>
        Base légale : le traitement est nécessaire à l’exécution de mesures
        précontractuelles prises à votre demande (article 6, paragraphe 1,
        point b, du RGPD).
      </P>
      <P>
        Durée de conservation : nous conservons les messages envoyés via ce
        formulaire pendant 24 mois à compter de notre dernier échange avec
        vous, puis nous les supprimons.
      </P>

      <H2>3. Journaux du serveur</H2>
      <P>
        Notre hébergeur enregistre automatiquement l’adresse IP, l’agent
        utilisateur du navigateur et l’heure de chaque requête adressée à ce
        site — pour chaque visiteur, pas seulement pour les personnes qui
        utilisent le formulaire de contact. Il s’agit d’une conséquence
        automatique et normale de l’exploitation d’un site web ; nous ne
        collectons pas ces données séparément.
      </P>
      <P>
        Base légale : notre intérêt légitime à assurer la sécurité et le bon
        fonctionnement du site (article 6, paragraphe 1, point f, du RGPD).
      </P>
      <P>
        Durée de conservation : notre hébergeur, Vercel, conserve ces
        journaux pendant une durée fixée par notre formule d’hébergement —
        les durées publiées vont d’une heure à trois jours, voire jusqu’à 30
        jours sur les formules avec conservation étendue des journaux.{" "}
        {/* TODO: confirmer la formule Vercel active et la durée exacte de
            conservation des journaux. Source : vercel.com/docs/logs/runtime. */}
      </P>
      <P>
        Par ailleurs, lorsque vous envoyez le formulaire de contact, notre
        serveur mémorise temporairement, en mémoire vive, l’adresse IP des
        envois récents afin d’imposer un court délai entre deux messages et
        de limiter le nombre de messages pouvant être envoyés par heure.
        Cette information n’est pas enregistrée dans une base de données,
        n’est pas associée à votre nom ou à votre message, et disparaît dès
        l’arrêt du serveur. Même base légale que ci-dessus.
      </P>

      <H2>4. Qui d’autre traite ces données</H2>
      <P>
        Nous faisons appel à un petit nombre de prestataires externes pour
        faire fonctionner ce site et répondre à vos messages. Ils ne peuvent
        utiliser vos données que pour nous fournir ces services — jamais pour
        leurs propres besoins.
      </P>
      <Table
        columns={["Sous-traitant", "Ce qu’il fait", "Où il est établi"]}
        rows={[
          ["Vercel", "Hébergement et journaux du serveur", "États-Unis"],
          ["Resend", "Envoi des e-mails du formulaire de contact", "États-Unis"],
          ["Google Workspace", "Stockage des e-mails que nous recevons", "États-Unis"],
        ]}
      />
      <P>
        Ces trois sociétés sont établies aux États-Unis. Vercel et Resend
        déclarent toutes deux être certifiées dans le cadre du Data Privacy
        Framework UE-États-Unis (et de son extension britannique) ; Google
        déclare de même pour les services derrière Google Workspace. Lorsque
        ce cadre ne couvre pas un transfert, les conditions de traitement des
        données de chaque prestataire s’appuient sur les clauses
        contractuelles types de la Commission européenne.{" "}
        {/* TODO: vérifier — informations contrôlées sur les pages
            publiques de politique de confidentialité / DPA de chaque
            prestataire le 2026-08-13. À reconfirmer en cas de changement de
            prestataire, et à valider sur la base du contrat de
            sous-traitance réellement signé avec chacun d’eux. */}
      </P>

      <H2>5. Si nous avons contacté votre entreprise par e-mail</H2>
      <P>
        Nous contactons des entreprises par e-mail pour leur proposer nos
        services — films de marque et sites web. Si vous lisez cette section
        parce que vous avez reçu un e-mail de notre part, elle explique ce
        que nous détenons et comment y mettre fin.
      </P>
      <P>
        Catégories de données que nous pouvons détenir sur une entreprise que
        nous avons contactée :
      </P>
      <Ul>
        <Li>le nom de l’entreprise</Li>
        <Li>l’adresse e-mail de l’entreprise</Li>
        <Li>l’adresse postale ou siège social de l’entreprise</Li>
        <Li>les informations publiées sur le site web de l’entreprise</Li>
        <Li>les avis clients publiquement visibles concernant l’entreprise</Li>
      </Ul>
      <P>
        Nous obtenons ces informations à partir de trois sources, et
        uniquement celles-ci :
      </P>
      <Ul>
        <Li>le site web de l’entreprise elle-même</Li>
        <Li>les fiches publiques Google Maps</Li>
        <Li>
          lorsque cela est indiqué dans nos dossiers, le profil Instagram
          public de l’entreprise
        </Li>
      </Ul>
      <P>
        Nous n’achetons ni n’utilisons de listes de contacts provenant
        d’aucune autre source.
      </P>
      <P>
        Dans la mesure du possible, nous envoyons ces e-mails à une adresse
        générique de l’entreprise — info@, contact@, hello@ ou équivalent —
        plutôt qu’à une personne nommée.
      </P>
      <P>
        Base légale : notre intérêt légitime à proposer nos services aux
        entreprises susceptibles d’y être intéressées (article 6, paragraphe
        1, point f, du RGPD). Nous avons mis cet intérêt en balance avec
        celui des personnes qui dirigent ou travaillent au sein de
        l’entreprise : nous contactons des entreprises, pas des particuliers
        ; nous utilisons une adresse générique chaque fois qu’elle existe ;
        et nous arrêtons dès qu’on nous le demande.
      </P>
      <P>
        <Strong>Comment y mettre fin :</Strong> répondez « remove » (ou «
        désinscription ») à n’importe lequel de nos messages, ou écrivez à{" "}
        <LegalLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</LegalLink>
        . Nous supprimons alors les informations de l’entreprise de nos
        dossiers. Nous conservons uniquement l’adresse e-mail dans une liste
        de suppression, afin de savoir qu’il ne faut plus la recontacter —
        c’est la seule donnée que nous conservons, et uniquement dans ce but.
      </P>
      <P>
        Durée de conservation : en l’absence de réponse et d’intérêt
        manifesté, nous supprimons la fiche 12 mois après notre dernière
        tentative de contact.
      </P>

      <H2>6. Vos droits</H2>
      <P>En vertu du RGPD, vous disposez du droit :</P>
      <Ul>
        <Li>d’accéder aux données à caractère personnel que nous détenons sur vous</Li>
        <Li>de faire rectifier des données inexactes</Li>
        <Li>de faire effacer vos données</Li>
        <Li>de limiter la manière dont nous utilisons vos données</Li>
        <Li>de vous opposer à notre traitement</Li>
        <Li>de recevoir vos données dans un format portable</Li>
      </Ul>
      <P>
        Si vous vous opposez à être contacté à des fins de prospection, nous
        respectons cette opposition immédiatement et sans avoir à vous en
        demander la raison.
      </P>
      <P>
        Pour exercer l’un de ces droits, écrivez à{" "}
        <LegalLink href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</LegalLink>
        . Nous répondons dans un délai d’un mois.
      </P>

      <H2>7. Réclamations</H2>
      <P>
        Si vous estimez que nous avons mal traité vos données à caractère
        personnel, vous pouvez introduire une réclamation auprès de l’
        {APD_NAME_FR} :
      </P>
      <Ul>
        <Li>{APD_ADDRESS}</Li>
        <Li>
          <LegalLink href={`mailto:${APD_EMAIL}`}>{APD_EMAIL}</LegalLink>
        </Li>
        <Li>{APD_PHONE}</Li>
      </Ul>
      <P>
        Vous pouvez également vous adresser à l’autorité de protection des
        données de votre propre pays, si vous le préférez.
      </P>

      <H2>8. Cookies</H2>
      <P>
        Ce site ne dépose aucun cookie et n’utilise ni stockage local (local
        storage), ni stockage de session, ni outil d’analyse, de publicité ou
        de suivi. Rien ici ne nécessite votre consentement, nous ne le
        demandons donc pas.
      </P>
      <P>
        Les deux polices de caractères utilisées sur ce site sont intégrées
        au site au moment de sa mise en production et servies depuis notre
        propre domaine — votre navigateur ne contacte jamais un service de
        polices tiers lors de votre visite.
      </P>
      <P>
        Si cela devait changer — par exemple si nous ajoutions un outil
        d’analyse ou un lecteur vidéo tiers intégré — nous mettrions à jour
        cette section et ajouterions un mécanisme de consentement au
        préalable, et non après coup.
      </P>

      <H2>9. Modifications de la présente politique</H2>
      <P>
        Nous mettrons à jour cette politique chaque fois que ce que nous
        faisons réellement de vos données change, et nous actualiserons la
        date en haut de cette page.
      </P>
    </>
  );
}
