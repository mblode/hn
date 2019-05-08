import React, { Component } from 'react'

export default class Comment extends Component {
    render() {
        const { user, timeAgo, content, type } = this.props.item;

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
                        {timeAgo}
                    </span>
                    <div
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </div>
            </div>
        )
    }
}
