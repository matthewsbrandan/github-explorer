interface RepositoryItemProps {
  repository: {
    name: string;
    description: string;
    html_url: string;
  };
}
export function RepositoryItem({ repository }: RepositoryItemProps){
  return (
    <li>
      <div className="header">
        <strong>{repository.name}</strong>
        <p>{repository.description}</p>
      </div>
      <div className="footer">
        <a href={repository.html_url} target="_blank">Access the repository</a>
      </div>
    </li>   
  );
}