import React from "react";
import { Grid, Text, Button } from "../elements";
import { getCookie, deleteCookie } from "../shared/Cookie";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import {history} from "../redux/configureStore";
import { apiKey } from "../shared/firebase";
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';


const Header = (props) => {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);
    
    const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;

    const is_session = sessionStorage.getItem(_session_key)? true: false;
    console.log(_session_key);
    console.log(sessionStorage.getItem(_session_key));
    console.log(is_session);
    if(is_login && is_session){
        return (
            <React.Fragment>
            <Grid is_flex padding="4px 16px">
                <Grid>
                <Text margin="0px" size="24px" bold>
                    <HomeIcon onClick={() => {
                        history.push("/")
                    }} color="primary"/>
                </Text>
                </Grid>
    
                <Grid is_flex>
                <Button margin="0px 10px 0px 0px" width="150px" text="내정보"></Button>
                <Button margin="0px 10px 0px 0px" text="알림"></Button>
                <Button text="로그아웃" _onClick={() => {
                    dispatch(userActions.logoutFB());
                }}></Button>
                </Grid>
            </Grid>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
        <Grid is_flex padding="4px 16px">
            <Grid>
            <Text margin="0px" size="24px" bold>
                헬로
            </Text>
            </Grid>

            <Grid is_flex width="200px">
            <Button text="회원가입" _onClick={() => {
                history.push("/signup");
            }}></Button>
            <Button text="로그인" _onClick={() => {
                history.push("/login");
            }}></Button>
            </Grid>
        </Grid>
        </React.Fragment>
    );
    };

Header.defaultProps = {};

export default Header;
