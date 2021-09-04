import * as React from "react";

import Button from "@components/Button";
import Input from "@components/Input";
import RepoTile from "@components/RepoTile";
import SearchIcon from "@components/SearchIcon";

import "./ReposSearchPage.css";
import { test_repos } from "../../../../../root/root";
import { RepoItem } from "../../../../../store/GitHubStore/types";

const ReposSearchPage: React.FC = () => {
  const [inputVal, setInputVal] = React.useState("");
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  const [isLoading, setIsLoading] = React.useState(true);
  const handleLoading = () => {
    setIsLoading(false);
  };

  const [loadedRepos, setLoadedRepos] = React.useState<RepoItem[]>([]);
  const handleRepos = (list_of_repos: RepoItem[]) => {
    setLoadedRepos(list_of_repos);
  };

  React.useEffect(() => {
    const fetchRepos = async () => {
      const response = await test_repos();
      handleRepos(response.data);
      handleLoading();
    };

    fetchRepos();
  }, []);

  return (
    <div className="component">
      <form className="search-box">
        <Input
          value={inputVal}
          placeholder="Введите название организации"
          onChange={handleInput}
        />
        <Button children={<SearchIcon />} disabled={isLoading} />
      </form>
      {!isLoading && (
        <div className="main-list">
          {loadedRepos.map((item: RepoItem) => (
            <RepoTile key={item.id} item={item} onClick={() => {}} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReposSearchPage;
