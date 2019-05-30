import React from 'react'
import { FeedCard } from '../../components/card';
import { connect } from "../../utils/dva";
import { Store, Uid, Aid } from "../../types";
import { CommentsProps } from './type';
import { View } from 'react-native';

class Comments extends React.PureComponent<CommentsProps> {
  componentDidMount() {
    this.props.onFetch();
  }

  render() {
    const { comments } = this.props;
    console.log(comments);
    return (
      <View>
        {
          comments.map(cm => (
            <FeedCard
              key={cm.cid}
              timeline={{
                ...cm,
                brief: cm.content,
              }}
              userInfo={cm as any}
              onLike={() => {}}
            />
          ))
        }
      </View>
    );
  }
}

export default connect(({ comment }: Store, props: { uid: Uid, aid: Aid }) => {
  const { uid, aid } = props;
  return {
    comments: comment.commentMap[aid] || [],
    uid,
  };
}, (dispatch, props: { uid: Uid, aid: Aid }) => {
  const { aid } = props;
  return {
    onLike(isLike: boolean) {
      dispatch({ type: "feed/changeLikes", payload: { dId: aid, isLike } });
    },
    onFetch() {
      dispatch({ type: "comment/fetchComments", payload: { aid } });
    },
  };
})(Comments);
