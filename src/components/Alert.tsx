import * as React from 'react';

interface Props {
    type?: string;
    className?: string;
    children?: boolean;
}

interface State {
}

export default class Alert extends React.Component<Props, State> {
    render() {
        const { type, className, children } = this.props;

        let content = children;

        // var alertClass = classNames({
        //     alert: true,
        //     [`alert-${type}`]: type !== undefined,
        //     [className]: className !== undefined
        // });

        return (
            <div>
                {content}
            </div>
        );
    }
}
