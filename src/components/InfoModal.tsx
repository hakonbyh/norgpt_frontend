import {
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const InfoModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="6xl">
      <ModalOverlay backdropFilter="blur(3px)" />
      <ModalContent margin={0} paddingBottom={3}>
        <ModalHeader>Informasjon</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={4}>
            NorGPT er en serie store generative språkmodeller utviklet av
            forskningsmiljøet i NorwAI, Norsk forskningssenter for
            AI-innovasjon. De trenes ved NTNU i tett samarbeid med NorwAIs
            partnere, som består av NTNU, Universitetet i Oslo, Universitetet i
            Stavanger, SINTEF, Norsk regnesentral, Schibsted, DNB, Telenor, DNV,
            Sparebank1 SMN, NRK, Statnett, Cognite, Aneo, Kongsberg og Digital
            Norway. Språkmodellene er grunnlagsmodeller for norsk språk og vil
            bli gjort allment tilgjengelige.
          </Text>
          <Text mb={4}>
            NorGPT-modellene kommer i ulike størrelser og med ulik grad av
            tuning og optimalisering. Antall parametre uttrykker hvor fine
            nyanser i språket som fanges opp og abstraheres i modellen. Gitt
            tilstrekkelig store og gode datasett vil flere parametre gi en mer
            finmasket og bedre tekstgenerering. NorGPT-modellene trenes
            foreløpig med tre og 23 milliarder parametre. Fin-tuning gir en
            tilpasning av modellen til bestemte formål eller domener, og
            optimalisering med menneskelige preferanser betyr at rangeringer fra
            mennesker har blitt brukt til å lære modellen hvordan mennesker
            foretrekker at tekstene skal se ut.
          </Text>
          <Text mb={4} fontWeight="bold">
            Treningen av NorGPT-modellene skjer i en firetrinnsprosess:
          </Text>
          <List mb={4} styleType="disc" pl={5}>
            <ListItem mb={2}>
              Først innhentes tekstdata. Disse kommer fra ulike kilder og må
              prosesseres for å sikre ønsket kvalitet. NorGPT trenes i all
              hovedsak på norsk tekst. Datasettet bak NorGPT kan inspiseres her
              [LENKE].
            </ListItem>
            <ListItem mb={2}>
              Basisversjon: Språkmodellen trenes i store datanettverk slik som
              NTNUs Idun-klynge. I treningen blir all tekst gjennomgått og
              vektet slik at modellen velger riktig ord ut fra konteksten.
            </ListItem>
            <ListItem mb={2}>
              Deretter blir modellen fin-tunet. Det gjør det mulig for modellen
              å utføre ønskede funksjoner som å forfatte prosatekst, skrive dikt
              eller lage sammendrag av lengre tekster.
            </ListItem>
            <ListItem mb={2}>
              Til slutt øves modellen ved å gi svaralternativer som mennesker
              bedømmer og rangerer. De menneskelige tilbakemeldingene sikrer at
              maskinen svarer på en ønsket måte.
            </ListItem>
          </List>
          Når modellene taes i bruk i praktiske applikasjoner, er det også
          vanlig å legge et sikkerhetslag på toppen som filtrerer ut uheldige
          tekstlige formuleringer.
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default InfoModal;
