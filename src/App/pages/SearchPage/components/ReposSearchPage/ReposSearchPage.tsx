import * as React from "react";

import Button from "@components/Button";
import Input from "@components/Input";
import RepoTile from "@components/RepoTile";
import SearchIcon from "@components/SearchIcon";

import "./ReposSearchPage.css";
//import { test_repos } from "../../../../../root/root";
import GitHubStore from "../../../../../store/GitHubStore/GitHubStore";
import { RepoItem } from "../../../../../store/GitHubStore/types";

// const gitHubStore = new GitHubStore();

// //const EXAMPLE_ORGANIZATION = "ktsstudio";

// function test_repos(org: string) {
//   return gitHubStore.getOrganizationReposList({
//     organizationName: org,
//   });
// }

const ReposSearchPage: React.FC = () => {
  const gitHubStore = new GitHubStore();

  const [inputVal, setInputVal] = React.useState("");
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  const [isLoading, setIsLoading] = React.useState(true);
  const handleLoading = () => {
    setIsLoading(false);
  };
  const handleLoadingOn = () => {
    setIsLoading(true);
  };

  const [loadedRepos, setLoadedRepos] = React.useState<RepoItem[]>([]);
  const handleRepos = (list_of_repos: RepoItem[]) => {
    setLoadedRepos(list_of_repos);
  };

  const [repoAuthor, setRepoAuthor] = React.useState("octokit");
  const handleRepoAuthorNew = () => {
    if (inputVal !== repoAuthor) {
      handleLoadingOn();
      setRepoAuthor(inputVal);
    }
  };
  // const handleRepoAuthorDone = () => {
  //   setRepoAuthor("");
  // };

  React.useEffect(() => {
    const fetchRepos = async () => {
      const response = await gitHubStore.getOrganizationReposList({
        organizationName: repoAuthor,
      });
      handleRepos(response.data);
      handleLoading();
    };

    fetchRepos();
  }, [repoAuthor]);

  return (
    <div className="component">
      <div className="search-box">
        <Input
          value={inputVal}
          placeholder="Введите название организации"
          onChange={handleInput}
        />
        <Button
          children={<SearchIcon />}
          disabled={isLoading}
          onClick={handleRepoAuthorNew}
        />
      </div>
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
