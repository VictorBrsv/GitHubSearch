import React, { useState } from "react";
import { IRepo } from "../models/models";
import { useActions } from "../hooks/actions";
import { useSelector } from "react-redux";
import { useAppSelector } from "../hooks/redux";

const RepoCard = ({ repo }: { repo: IRepo }) => {
  const { addFavorites, removeFavorites } = useActions();
  const { favorites } = useAppSelector((state) => state.github);

  const [isFav, setIsFav] = useState(favorites.includes(repo.html_url));

  const toAddFavorites = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addFavorites(repo.html_url);
    setIsFav(true);
  };

  const removeFromFavorites = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeFavorites(repo.html_url);
    setIsFav(false);
  };

  return (
    <div className='border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all'>
      <a href={repo.html_url} target='_blank' rel='noreferrer'>
        <h1 className='text-lg font-bold'>{repo.full_name}</h1>
        <p className='text-sm'>
          Forks: <span className='font-bold mr-2'>{repo.forks}</span>
          Watchers: <span className='font-bold'>{repo.watchers}</span>
        </p>
        <p className='text-sm font-thin'>{repo?.description}</p>
        {!isFav && (
          <button
            className='py-2 px-4 bg-yellow-400 mr-2 rounded hover:shadow-md transition-all'
            onClick={toAddFavorites}
          >
            ADD
          </button>
        )}

        {isFav && (
          <button
            className='py-2 px-4 bg-red-400 rounded hover:shadow-md transition-all'
            onClick={removeFromFavorites}
          >
            REMOVE
          </button>
        )}
      </a>
    </div>
  );
};

export default RepoCard;
