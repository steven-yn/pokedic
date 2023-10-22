import Image from 'next/image';
import React, { PropsWithChildren } from 'react';
import getPokemonIdForUrl from '@/utils/getPokemonIdForUrl';

interface Props {
  className?: string;
}

const PokemonInfo = ({ children, className }: PropsWithChildren<Props>) => {
  return <main className={className}>{children}</main>;
};

const Title = ({ children }: PropsWithChildren) => {
  return <h1>{children}</h1>;
};

interface ImageProps {
  sprites: PokemonSprites;
}

const Profile = ({ sprites }: PropsWithChildren<ImageProps>) => {
  return (
    <>
      {sprites.front_default && (
        <Image
          src={sprites.front_default}
          width={128}
          height={128}
          alt={sprites.front_default}
        />
      )}
      {sprites.back_default && (
        <Image
          src={sprites.back_default}
          width={128}
          height={128}
          alt={sprites.back_default}
        />
      )}

      {sprites.front_shiny && (
        <Image
          src={sprites.front_shiny}
          width={128}
          height={128}
          alt={sprites.front_shiny}
        />
      )}
      {sprites.back_shiny && (
        <Image
          src={sprites.back_shiny}
          width={128}
          height={128}
          alt={sprites.back_shiny}
        />
      )}
    </>
  );
};

const Paragraph = ({ children }: PropsWithChildren) => {
  return <p>{children}</p>;
};

const Preformatted = ({ children }: PropsWithChildren) => {
  return <pre>{children}</pre>;
};

interface EvolutionProps {
  chainLink?: PokemonChainLink;
}

const Evolution = ({ chainLink }: EvolutionProps) => {
  if (!chainLink) return null;

  const id = getPokemonIdForUrl(chainLink.species.url);

  return (
    <>
      {id}.&nbsp;
      {chainLink.species.name}
      {chainLink.evolves_to.length > 0 && ', '}
      {chainLink.evolves_to.map((nextLink) => {
        return <Evolution key={nextLink.species.name} chainLink={nextLink} />;
      })}
    </>
  );
};

PokemonInfo.Title = Title;
PokemonInfo.Profile = Profile;
PokemonInfo.Paragraph = Paragraph;
PokemonInfo.Preformatted = Preformatted;
PokemonInfo.Evolution = Evolution;

export default PokemonInfo;
