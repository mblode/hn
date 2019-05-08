import React, { Component } from 'react'

interface Props {
    item?: {
        user?: string;
        time_ago?: string;
        content?: string;
        type?: string;
    };
}

interface State {
}

export default class Comment extends Component<Props, State> {
    render() {
        const { user, time_ago, content, type } = this.props.item;

        return (
            <div>
                <div
                    style={{
                        marginLeft: `${type * 40}px`,
                    }}
                    className="comment-item"
                >
                    <span
                        style={{
                            textDecoration: 'underline',
                        }}
                    >
                        {user}
                    </span>
                    &nbsp;&nbsp;&nbsp;
                    <span
                        style={{
                            color: '#999999',
                        }}
                    >
                        {time_ago}
                    </span>
                    <div
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </div>
            </div>
        )
    }
}
