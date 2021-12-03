import React from "react";
import HeartOut from "@material-ui/icons/Favorite"
import IconButton from '@material-ui/core/IconButton';
import { Text } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as heartActions } from "../redux/modules/heart";

const Heart = (props) => {
    const heart_list = useSelector((state) => state.heart.list);
    const user_info = useSelector((state) => state.user.user);
    const post_id = props.post_id;
    const dispatch = useDispatch();
    const [toggle, setToggle] = React.useState(false);
    console.log(toggle)

    React.useEffect(() => {
        if(heart_list[post_id]?.includes(user_info?.uid)){
            setToggle(true);
        }else {
            setToggle(false);
        }
    });
    const updateHeart = () => {
        if(!user_info){
            window.alert("로그인을 해주세요!")
        }else if(!heart_list[post_id]?.includes(user_info?.uid)) {
            dispatch(heartActions.addHeartFB(post_id))
        }else if(heart_list[post_id]?.includes(user_info?.uid)){
            dispatch(heartActions.cancelHeartFB(post_id))
        }
        
    };
    
    return (
        <React.Fragment>
            <IconButton onClick={updateHeart} >
                <HeartOut style={toggle ? {color:"red" } : {color:"grey"}} fontSize="large"></HeartOut>
            </IconButton>
        </React.Fragment>
    );
};

export default Heart;