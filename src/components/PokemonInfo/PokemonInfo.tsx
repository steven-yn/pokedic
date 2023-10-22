import Image from 'next/image';
import React, { PropsWithChildren } from 'react';
import { IMAGE_SIZE } from '@/const';
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

interface ProfileProps {
  sprites: PokemonSprites;
  name: string;
}

const Profile = ({ sprites, name }: PropsWithChildren<ProfileProps>) => {
  return (
    <>
      {sprites.front_default && (
        <PokemonInfo.PokeImage url={sprites.front_default} name={name} />
      )}
      {sprites.back_default && (
        <PokemonInfo.PokeImage url={sprites.back_default} name={name} />
      )}
      {sprites.front_shiny && (
        <PokemonInfo.PokeImage url={sprites.front_shiny} name={name} />
      )}
      {sprites.back_shiny && (
        <PokemonInfo.PokeImage url={sprites.back_shiny} name={name} />
      )}
    </>
  );
};

interface PokeImageProps {
  url: string;
  name: string;
}

const PokeImage = ({ url, name }: PokeImageProps) => {
  return (
    <Image
      src={url}
      width={IMAGE_SIZE}
      height={IMAGE_SIZE}
      alt={name}
      priority
    />
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
PokemonInfo.PokeImage = PokeImage;

export default PokemonInfo;
