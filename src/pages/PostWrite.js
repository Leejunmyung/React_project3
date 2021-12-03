import React from "react";
import { Grid, Text, Button, Image, Input } from "../elements";
import Upload from "../shared/Upload";


import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";

const PostWrite = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);
    const preview = useSelector((state) => state.image.preview)
    const post_list = useSelector((state) => state.post.list);

    const post_id = props.match.params.id;
    const is_edit = post_id? true: false;

    const {history} = props;

    let _post = is_edit? post_list.find((p) => p.id === post_id) : null;

    const [contents, setContents] = React.useState(_post? _post.contents : "");
    const [names, setNames] = React.useState("down")

    React.useEffect(() => {
        if(is_edit && !_post){
            window.alert('포스트 정보가 없어요!');
            history.goBack();

            return;
        }

        if(is_edit){
            dispatch(imageActions.setPreview(_post.image_url));
        }
    }, []);

    const changeContents = (e) => {
        setContents(e.target.value);
    }

    const addPost = () => {
        dispatch(postActions.addPostFB(contents,names));
    }

    const editPost = () => {
        dispatch(postActions.editPostFB(post_id, {contents: contents, names: names}))
    }

    const check_button = (e) =>{
        setNames(e.target.value);
    }
    console.log()

    if(!is_login){
        return (
            <Grid margin="100px 0px" padding="16px" center>
                <Text size="32px" bold>앗! 잠깐!</Text>
                <Text size="16px">로그인 후에만 글을 쓸 수 있어요!</Text>
                <Button _onClick={() => {history.replace("/login")}}>로그인 하러가기</Button>
            </Grid>
        )
    }
    return (
        <React.Fragment>
            <Grid padding="16px">
                <Text margin="0px" size="36px" bold>
                    {is_edit ? "게시글 수정" : "게시글 작성"}
                </Text>
                <Upload/>
            </Grid>
            <Grid padding="16px">
                <Text margin="0px" size="24px" bold>미리보기</Text>
                <Grid is_flex width="500px">
                    
                    <Grid is_flex width="100px">
                        <input type="radio" name="layout" value="left"
                        onChange={check_button}/><Text>좌측 이미지</Text>
                    </Grid>
                    <Grid is_flex width="100px">
                        <input type="radio" name="layout" value="right"
                        onChange={check_button}/><Text>우측 이미지</Text>
                    </Grid>
                    <Grid is_flex width="100px">
                        <input type="radio" name="layout" value="down"
                        onChange={check_button}/><Text>하단 이미지</Text>
                    </Grid>
                </Grid>
                {names === "left" && (<Grid is_flex>
                    <Image shape="rectangle" src={preview ? preview : "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg"}/>
                    <Text bold size="24px">%%%%%%예시문%%%%%%</Text></Grid>
                )}
                {names === "right" && (<Grid is_flex>
                    <Text bold size="24px">%%%%%%예시문%%%%%%</Text>
                    <Image shape="rectangle" src={preview ? preview : "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg"}/>
                    </Grid>
                )}
                {names === "down" && (<Grid>
                    <Text bold size="24px">%%%%%%예시문%%%%%%</Text>
                    <Image shape="rectangle" src={preview ? preview : "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg"}/>
                    </Grid>
                )}
                
                
            </Grid>
            <Grid padding="16px">
                <Input
                value = {contents} 
                _onChange={changeContents} 
                multiLine label="게시글 내용" 
                placeholder="게시글 작성"/>
            </Grid>
            <Grid padding="16px">
                {is_edit? (<Button text="게시글 수정" _onClick={editPost}></Button>) : 
                <Button text="게시글 작성" _onClick={addPost}></Button>}
            </Grid>
        </React.Fragment>
    );
};

export default PostWrite;