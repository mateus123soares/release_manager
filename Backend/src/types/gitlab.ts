export interface GitLabTag {
  name: string;
  commit: {
    id: string;
    short_id: string;
    created_at: string;
    title: string;
    message: string;
    author_name: string;
  };
  protected: boolean;
}

export interface GitLabCommit {
    id: string;
    short_id: string;
    created_at: string;
    title: string;
    message: string;
    author_name: string;
    author_email: string;
}

export interface GitLabCommitParsed {
    id: string;
    title: string;
    message: string;
    author_email: string;
    created_at: string;
}