import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { RepositoryItem } from './RepositoryItem';
import '../styles/repositories.scss';

interface Repository {
  name: string;
  description: string;
  html_url: string;

  owner: {
    login: string;
    avatar_url: string;
  }
}

export function RepositoryList(){
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [inLoading, setInLoading] = useState(true);
  const [toggleUsername, setToggleUsername] = useState(false);
  const [username, setUsername] = useState('matthewsbrandan');

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => response.json())
      .then(data => {
        setRepositories(data);
        setInLoading(false);
    }).catch(err => setInLoading(false));
  },[username]);

  function handleToSetUsername(event: any){
    event.preventDefault();
    const name = document.getElementById('username') as HTMLInputElement;
    if(name?.value){
      toast.success('Successfully!');
      setUsername(name.value);
      setTimeout(() => setToggleUsername(false), 1000);
    }else{
      toast.error("This didn't work.")
    }
  }

  return (
    <>
      <Toaster/>
      <section className="repository-list">
        <header>
          <h1 className="text-light-gradient">
            List of Repositories
          </h1>
          <div>
            <i className="material-icons" onClick={() => setToggleUsername(true)}>shuffle</i>
            {repositories.length > 0 && (
              <img
                src={repositories[0].owner.avatar_url} 
                alt={repositories[0].owner.login}                
              />
            )}
          </div>
        </header>
        <ul>
          {inLoading ? (
            <span className="span-in-loading">Carregando...</span>
          ):(!repositories || repositories.length == 0) && (
            <span className="span-in-loading">Essa conta não possui repositórios...</span>
          )}
          {repositories.map(repository => { return (
            <RepositoryItem
              key={repository.name}
              repository={repository}
            />
          );})}
        </ul>
      </section>
      {toggleUsername && (  
        <div className="overlay">
          <div className="content">
            <form onSubmit={handleToSetUsername}>
              <div className="input-wrapper">
                <i className="material-icons">search</i>
                <input
                  type="text"
                  placeholder="Type the username"
                  id="username"
                  required
                />
                <button type="submit">
                  <i className="material-icons">send</i>
                </button>
              </div>
            </form>
            <button
              type="button"
              className="close"
              onClick={() => setToggleUsername(false)}
            >
              close x
            </button>
          </div>
        </div>
      )}
    </>
  );
}