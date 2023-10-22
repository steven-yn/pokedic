import React from 'react';
import { inter } from '@/pages/_app';
import usePokemonDetailData from '../../hooks/usePokemonDetailData';
import PokemonInfo from '../PokemonInfo/PokemonInfo';

const DetailSection = () => {
  const { data } = usePokemonDetailData();

  if (!data || !data.responseData.koNames) return null;

  return (
    <PokemonInfo className={inter.className}>
      <PokemonInfo.Title>
        {data.responseData.id}.&nbsp;
        {data.responseData.koNames[0].name || data.responseData.name || ''}
      </PokemonInfo.Title>
      <PokemonInfo.Profile
        sprites={data.responseData.sprites}
        name={data.responseData.koNames[0].name}
      />
      <PokemonInfo.Paragraph>
        {data.responseData.koDescription || ''}
      </PokemonInfo.Paragraph>
      <PokemonInfo.Paragraph>
        무게 : {data.responseData.weight}hg
      </PokemonInfo.Paragraph>
      <PokemonInfo.Paragraph>
        키 : {data.responseData.height}cm
      </PokemonInfo.Paragraph>
      <PokemonInfo.Paragraph>
        타입 :&nbsp;
        {data.responseData.types.map((type) => type.type.name).join(', ')}
      </PokemonInfo.Paragraph>
      <PokemonInfo.Paragraph>
        특성 :&nbsp;
        {data.responseData.abilities
          .map((ability) => ability.ability.name)
          .join(', ')}
      </PokemonInfo.Paragraph>
      <PokemonInfo.Paragraph>
        스텟 :&nbsp;
        {data.responseData.stats
          .map((stat) => `${stat.stat.name}(${stat.base_stat})`)
          .join(', ')}
      </PokemonInfo.Paragraph>
      <PokemonInfo.Paragraph>
        획득 가능 경험치 :&nbsp;
        {data.responseData.base_experience}
      </PokemonInfo.Paragraph>
      <PokemonInfo.Paragraph>
        기술 :&nbsp;
        {data.responseData.moves.map((move) => move.move.name).join(', ')}
      </PokemonInfo.Paragraph>
      <PokemonInfo.Paragraph>
        등장 시리즈 (포켓몬 게임) :&nbsp;
        {data.responseData.game_indices
          .map((game) => game.version.name)
          .join(', ')}
      </PokemonInfo.Paragraph>
      {data.responseData.evolutionChain &&
        data.responseData.evolutionChain.evolves_to.length > 0 && (
          <PokemonInfo.Paragraph>
            진화 단계 :&nbsp;
            <PokemonInfo.Evolution
              key={data.responseData.evolutionChain.species.name}
              chainLink={data.responseData.evolutionChain}
            />
          </PokemonInfo.Paragraph>
        )}
    </PokemonInfo>
  );
};

export default DetailSection;
