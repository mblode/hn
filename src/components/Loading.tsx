import * as React from 'react';

type Props = {
    active?: boolean;
    style?: string;
  };

export const Loading: React.FC<Props> = props => {
    const { active, style } = props;

    if (!active) return null;

    return (
        <div className="loading">
            <div className="loading-col" />
            <div className="loading-col" />
            <div className="loading-col" />
        </div>
    );
}

export default Loading;
