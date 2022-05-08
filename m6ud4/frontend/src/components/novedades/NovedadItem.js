import React from 'react';

const NovedadItem = (props) => {
    const {title, link} = props;

    return (
              
        <div className = "novedades">
        <h2>{title}</h2>
        <h3>{link}</h3>
        <div dangerouslySetInnerHTML={{ __html: link}}/>
        <hr />
        </div>
    );
}

export default NovedadItem;