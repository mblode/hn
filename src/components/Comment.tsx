import * as React from 'react';

interface Props {
    user?: string;
    timeAgo?: string;
    content?: string;
    type?: number;
}

interface State {
}

export default class Comment extends React.Component<Props, State> {
    render() {
        const { user, timeAgo, content, type } = this.props;

        return (
            <div>
                <div
                    className="comment-item"
                >
                    <span>
                        {user}
                    </span>
                    &nbsp;&nbsp;&nbsp;
                    <span>
                        {timeAgo}
                    </span>
                    {/* <div
                        dangerouslySetInnerHTML={{ __html: content }}
                    /> */}
                </div>
            </div>
        )
    }
}
