import React from "react";
import { Grid, Image, Text } from "../elements";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";
import post from "../redux/modules/post";

const CommentList = (props) => {
  const dispatch = useDispatch();
  const comment_list = useSelector((state) => state.comment.list);
  const {post_id} = props;

  React.useEffect(() => {
    if(!comment_list[post_id]){
      dispatch(commentActions.getCommentFB(post_id))
    }
  }, []);

  if(!comment_list[post_id] || !post_id){
    return null;
  }
  return (
    <React.Fragment>
      <Grid padding="16px">
        {comment_list[post_id].map(c => {
          return <CommentItem key={c.id} {...c} />;
        })}
      </Grid>
    </React.Fragment>
  );
};

CommentList.defaultProps = {
  post_id: null,
}

export default CommentList;

const CommentItem = (props) => {
  const { user_profile, user_name, user_id, post_id, contents, insert_dt } =
    props;
  return (
    <React.Fragment>
      <Grid is_flex>
        <Grid is_flex width="auto">
          <Image shape="circle" />
          <Text bold>{user_name}</Text>
        </Grid>
        <Grid>
          <Text margin="0px">{contents}</Text>
        </Grid>
        <Grid margin="0px 4px">
          <Text margin="0px">{insert_dt}</Text>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

CommentItem.defaultProps = {
  user_profile: "",
  user_name: "junmyung",
  user_id: "",
  post_id: 1,
  contents: "쭌이다",
  insert_dt: "2021-01-01 22:00:00",
};
