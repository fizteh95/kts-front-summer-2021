import * as React from "react";

import Button from "@components/Button";
import Input from "@components/Input";
import RepoTile from "@components/RepoTile";
import SearchIcon from "@components/SearchIcon";
import { useHistory } from "react-router-dom";
import "./ReposSearchPage.scss";

import GitHubStore from "../../../../../store/GitHubStore/GitHubStore";
import { RepoItem } from "../../../../../store/GitHubStore/types";
import { useReposContext } from "../../../../App";

const ReposSearchPage: React.FC = () => {
  const ReposContext = useReposContext();

  const history = useHistory();

  const gitHubStore = new GitHubStore();

  const [inputVal, setInputVal] = React.useState("");
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  const [repoAuthor, setRepoAuthor] = React.useState("octokit");
  const handleRepoAuthorNew = () => {
    if (inputVal !== repoAuthor) {
      ReposContext.setContext({
        list: ReposContext.context.list,
        isLoading: true,
        load: ReposContext.context.load,
      });
      setRepoAuthor(inputVal);
    }
  };

  const load_data = (response: any) => {
    ReposContext.setContext({
      list: response.data,
      isLoading: false,
      load: ReposContext.context.load,
    });
  };

  React.useEffect(() => {
    const fetchRepos = async () => {
      const response = await gitHubStore.getOrganizationReposList({
        organizationName: repoAuthor,
      });
      load_data(response);
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
          disabled={ReposContext.context.isLoading}
          onClick={handleRepoAuthorNew}
        />
      </div>
      {!ReposContext.context.isLoading && (
        <div className="main-list">
          {ReposContext.context.list.map((item: RepoItem) => (
            <RepoTile
              key={item.id}
              item={item}
              onClick={() => {
                history.push(`/repos/${item.id}`);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReposSearchPage;
