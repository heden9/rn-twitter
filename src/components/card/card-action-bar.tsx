import React from 'react';
import { ActionBar } from "./action-bar";
import { BtnLike } from "../widget";
import { CardActionBarProps } from "./types";

export const CardActionBar: React.SFC<CardActionBarProps> = ({ buttonStyle = {}, iconSize, commentCount, forwardCount, likeCount, initialLike, onForward, onShare, onLike, onComment }) => {
  return (
    <ActionBar buttonStyle={buttonStyle}>
      <ActionBar.Icon
        iconName="comment"
        iconSize={iconSize}
        label={commentCount}
        onPress={onComment}
      />
      <ActionBar.Icon
        onPress={onForward}
        iconName="forward"
        iconSize={iconSize}
        label={forwardCount}
      />
      <BtnLike
        onPress={onLike}
        initialLike={initialLike}
        size={iconSize}
        count={likeCount}
      />
      <ActionBar.Icon
        onPress={onShare}
        iconName="upload"
        iconSize={iconSize}
      />
    </ActionBar>
  )
}
