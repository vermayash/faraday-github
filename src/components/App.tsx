import axios from "axios";
import { useState, useEffect } from "react";
import Header from "./Header";

interface Repositories {
  id: number;
  name: string;
  html_url: string;
  language: string;
  description: string;
}

const App: React.FC = () => {
  const [repositories, setRepositories] = useState<Repositories[]>();
  const [totalRepositories, setTotalRepositories] = useState(0);

  const fetchData = async () => {
    const { data } = await axios.get(
      "https://api.github.com/users/faradayio/repos"
    );

    setRepositories(data);
    setTotalRepositories(data.length);
  };

  const renderRepositories = repositories?.map((repo: Repositories) => {
    return (
      <div className="card" style={{ width: "18rem" }} key={repo.id}>
        <div className="card-body">
          <h5 className="card-title">{repo.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{repo.language}</h6>
          <p className="card-text">{repo.description}</p>
          <a href={repo.html_url} target="_blank" rel="noreferrer">
            Github Link
          </a>
        </div>
      </div>
    );
  });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div className="container pt-3">
        <p className="lead text-left">
          Total {totalRepositories} repositories found.
        </p>
        <div className="d-flex flex-wrap gap-3">{renderRepositories}</div>
      </div>
      <p className="lead text-center mt-4">Reached the end of the page.</p>
    </div>
  );
};

export default App;
