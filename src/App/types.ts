import { RepoItem } from "../store/GitHubStore/types";

export type ReposContext = {
  list: RepoItem[];
  isLoading: boolean;
  load: () => void;
};
