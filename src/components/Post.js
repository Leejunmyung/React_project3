import React from "react";
import { Grid, Image, Text, Button } from "../elements/index";
import Heart from "./Heart";
import {history} from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as heartActions } from "../redux/modules/heart";

const Post = (props) => {
  const list = useSelector((state) => state.names);
  const { user_info,
    image_url,
    contents,
    like_cnt,
    insert_dt,
    id,
    names,
    comment_cnt,} = props;

  const dispatch = useDispatch();
  
    React.useEffect(() => {
      dispatch(heartActions.getHeartFB(id));
    }, []);
  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex>
          <Grid is_flex>
            <Image shape="circle" scr={props.src} />
            <Text bold>{props.user_info.user_name}</Text>
          </Grid>
          <Grid is_flex>
            <Text>{props.insert_dt}</Text>
            {props.is_me && 
            <Button margin="0px 0px 0px 10px" width="auto" padding="4px"
            _onClick={() => { history.push(`/write/${props.id}`)}}>수정</Button>}
          </Grid>
        </Grid>
        {names=="left" && <Grid is_flex>
          <Image shape="rectangle" src={props.image_url} />
          <Text>{props.contents}</Text>
        </Grid>}
        {names=="right" && <Grid is_flex>
          <Text>{props.contents}</Text>
          <Image shape="rectangle" src={props.image_url} />
        </Grid>}
        {names=="down" && <Grid>
          <Text>{props.contents}</Text>
          <Image shape="rectangle" src={props.image_url} />
        </Grid>}
        <Grid padding="16px">
          <Grid is_flex width="90px">
            <Heart post_id={id} />
            <Text margin="0px" bold>
            {props.heart_cnt}개
            </Text>
          </Grid>
          <Text margin="0px" bold>
          댓글 {props.comment_cnt}개
          </Text>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Post.defaultProps = {
  user_info: {
    user_name: "junmyung",
    user_profile: "https://i.ytimg.com/vi/9J67amvesFg/maxresdefault.jpg",
  },
  image_url: "https://i.ytimg.com/vi/9J67amvesFg/maxresdefault.jpg",
  contents: "아이언맨",
  comment_cnt: 10,
  heart_cnt: 10,
  insert_dt: "2021-11-29 17:00:00",
  is_me: false,
};
export default Post;
